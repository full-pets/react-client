import React, { useCallback, useEffect, useState } from 'react';
import http from "../http";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function Videos(props) {
    const [videos, setVideos] = useState([]);
    const id = sessionStorage.getItem('id')
    const history = useHistory()
    const dispatch = useDispatch()

    const viewVideo = ({ id, name }) => {
        history.push(`/video/${name}`, { id })
    }
    const getVideos = useCallback(() => {
        http().get('/videos')
            .then((a) => a.json())
            .then((videos) => {
                if (!Array.isArray(videos)) throw new Error(videos.message)
                setVideos(videos)
            })
            .catch(e => dispatch({ type: 'error', payload: e.message }))
    }, []);

    useEffect(() => getVideos(), [getVideos])

    return (
        <div>
            {videos.length && (
                <>
                    <table className="mt-5">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Duration</th>
                            <th>Quality</th>
                            <th>Created</th>
                            <th>Owner</th>
                        </tr>
                        </thead>
                        <tbody>
                        {videos.map((video, i) => (
                            <tr onClick={() => viewVideo(video)} key={i}>
                                <td>{video.name}</td>
                                <td><a href={video.link}>{video.link}</a></td>
                                <td>{video.duration}</td>
                                <td>{video.quality}</td>
                                <td>{(new Date(video.created)).toLocaleString()}</td>
                                <td>{video.owner}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className='container'>
                        <button onClick={getVideos} className='btn btn-success'>
                            CLICK
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Videos;

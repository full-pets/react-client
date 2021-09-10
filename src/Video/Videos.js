import React, { useCallback, useEffect, useState } from 'react';
import http from "../http";
import { useHistory } from "react-router-dom";

function Videos(props) {
    const [videos, setVideos] = useState([]);
    const id = sessionStorage.getItem('id')
    const history = useHistory()

    const viewVideo = ({id, name}) => {
        history.push(`/video/${name}`, {id})
    }
    const getVideos = useCallback(() => {
        http().get('/videos')
            .then((a) => a.json())
            .then((videos) => setVideos(videos))
    }, []);

    useEffect(() => getVideos(), [getVideos])

    return (
        <div>
            {videos.length && (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Owner</th>
                            <th>Duration</th>
                            <th>Quality</th>
                            <th>Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {videos.map((video, i) => (
                            <tr onClick={() => viewVideo(video)} key={i}>
                                <td>{video.id}</td>
                                <td>{video.name}</td>
                                <td><a href={video.link}>{video.link}</a></td>
                                <td>{video.owner}</td>
                                <td>{video.duration}</td>
                                <td>{video.quality}</td>
                                <td>{video.created}</td>
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

import React, { useCallback, useEffect, useState } from 'react';
import http from "./http";

function Videos(props) {
    const [videos, setVideos] = useState([]);
    const id = sessionStorage.getItem('id')
    const video = {
        Name: "First Video",
        Link: "https://youtube.com",
        Owner: id,
        Duration: "01.22",
        Quality: "360*640",
    }
    const getVideos = useCallback(() => {
        http().get('/videos')
            .then((a) => a.json())
            .then((videos) => setVideos(videos))
    }, []);

    const createVideo = () => {
        http().post('/videos', video)
            .then((a) => a.json())
            .then((videos) => setVideos(videos))
    }

    useEffect(() => getVideos(), [getVideos])
    return (
        <div>
            <button onClick={createVideo} className="btn btn-blue">CLICK</button>
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
                            <tr key={i}>
                                <td>{video.id}</td>
                                <td>{video.name}</td>
                                <td>{video.link}</td>
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

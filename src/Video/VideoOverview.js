import React, { useCallback, useEffect, useState } from 'react';
import http from "../http";

function VideoOverview(props) {
    const { id } = props.location.state
    console.log(id)
    const [video, setVideo] = useState(null);
    const getVideo = useCallback(() => {
        http().get(`/videos/${id}`)
            .then((a) => a.json())
            .then((video) => setVideo(video))
    }, []);

    useEffect(() => getVideo(), [getVideo])
    return (
        <div>

            {video &&
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
                <tr>
                    <td>{video.id}</td>
                    <td>{video.name}</td>
                    <td><a href={video.link}>{video.link}</a></td>
                    <td>{video.owner}</td>
                    <td>{video.duration}</td>
                    <td>{video.quality}</td>
                    <td>{video.created}</td>
                </tr>
                </tbody>
            </table>}
        </div>
    );
}

export default VideoOverview;

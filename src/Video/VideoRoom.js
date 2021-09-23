import React, { useEffect, useRef } from 'react';

function VideoRoom(props) {
    let video = useRef(null),
        canvas = useRef(null),
        localMediaStream = null,
        onCameraFail = function (e) {
            console.log('Camera did not work.', e);
        };

    useEffect(() => {
        console.log(1)
        let ctx = canvas.current.getContext('2d')

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia({ video: true }, function (stream) {
            video.current.srcObject = stream
            localMediaStream = stream;
        }, onCameraFail);
        if (localMediaStream) {
            ctx.drawImage(video.current, 0, 0);
        }
    }, [])

    return (
        <div>
            <video ref={video} autoPlay id="vid"/>
            <canvas ref={canvas} id="canvas" width="0" height="0"/>

        </div>
    );
}

export default VideoRoom;

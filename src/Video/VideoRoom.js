import React, { useEffect, useRef, useState } from 'react';
import RecordRTC, { invokeSaveAsDialog } from 'recordrtc'//https://recordrtc.org/Тут читать АПИ

function VideoRoom(props) {
    const [recorder, setRecorder] = useState(null)

    //Делаем реф HTMLVideo, чтоб потом направлять туда стрим с вебки
    let video = useRef(null),
        onCameraFail = function (e) {
            console.log('Camera did not work.', e)
        };

    const saver = () => {
        let blob = recorder.getBlob()
        // invokeSaveAsDialog(blob)
        const file = new File([blob], 'filename.webm', { type: 'video/webm' });
        const form = new FormData()
        form.append('file', file, file.name)
        fetch('http://localhost:5000/api/video', {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') },
            method: 'POST',
            body: form
        })
            .then(console.log)
            .catch(console.log)
    }
    useEffect(() => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia({ video: true, audio: true }, function (stream) {
            video.current.srcObject = stream
            setRecorder(RecordRTC(stream, { type: 'video', mimeType: 'video/mpeg' }))
        }, onCameraFail)
    }, [])

    return (
        <div>
            <video ref={video} autoPlay id="vid"/>
            <button onClick={() => recorder.startRecording()}>Start</button>
            <button onClick={() => recorder.stopRecording(saver)}>Stop</button>
        </div>
    )
}

export default VideoRoom

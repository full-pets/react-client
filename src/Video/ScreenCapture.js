import React from 'react';
import useMediaRecorder from '@wmik/use-media-recorder';

function Player({ srcBlob, audio }, liveStream) {
  if (!srcBlob) {
    return null;
  }

  if(liveStream) {
      console.log(liveStream)
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      controls
    />
  );
}

function ScreenRecorderApp() {
  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    liveStream
  } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio: false, video: true }
  });

  return (
    <article>
      <h1>Screen recorder</h1>
      {error ? `${status} ${error.message}` : status}
      <section>
        <button
          type="button"
          onClick={getMediaStream}
          disabled={status === 'ready'}
        >
          Share screen
        </button>
        <button
          type="button"
          onClick={startRecording}
          disabled={status === 'recording'}
        >
          Start recording
        </button>
        <button
          type="button"
          onClick={stopRecording}
          disabled={status !== 'recording'}
        >
          Stop recording
        </button>
      </section>
      <Player srcBlob={mediaBlob} liveStream={liveStream} />
    </article>
  );
}

export default ScreenRecorderApp;
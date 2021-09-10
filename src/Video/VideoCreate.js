import React from 'react';
import http from "../http";

function VideoCreate(props) {
    const video = {
        name: "First VideoOverview",
        link: "https://youtube.com",
        owner: id,
        duration: "01.22",
        quality: "360*640",
    }
    const createVideo = () => {
        http().post('/videos', video)
            .then((a) => a.json())
            .then((videos) => setVideos(videos))
    }
    return (
        <div>
            <form className='col-3'>
                <h2>Login</h2>
                <div className='mb-3'>
                    <label htmlFor='InputEmail1' className='form-label'>
                        Email address
                    </label>
                    <input onInput={(e) => setUser({ ...user, email: e.target.value })} type='email'
                           className='form-control' id='InputEmail1' aria-describedby='emailHelp'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='exampleInputPassword1' className='form-label'>
                        Password
                    </label>
                    <input onInput={(e) => setUser({ ...user, password: e.target.value })} type='password'
                           className='form-control' id='exampleInputPassword1'/>
                </div>
                <div className='mb-3 form-check'>
                    <input type='checkbox' className='form-check-input' id='Check1'/>
                    <label className='form-check-label' htmlFor='Check1'>
                        Agree something
                    </label>
                </div>
                <button className='btn btn-primary' onClick={}>
                    Signin
                </button>
            </form>
        </div>
    );
}

export default VideoCreate;

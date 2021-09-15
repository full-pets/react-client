import React, { useCallback, useEffect, useState } from 'react';
import http from "../http";
import { useDispatch } from "react-redux";

function SingleUser(props) {
    const dispatch = useDispatch()
    const { id } = props.match.params
    const initialUser = {
        login: "",
        email: "",
        avatar: "",
        role: ""
    }
    const [file, setFile] = useState(new Blob())
    const [user, setUser] = useState(initialUser)

    const setAvatar = () => {
        const form = new FormData()
        form.append('file', file, file.name)
        fetch('http://localhost:5000/api/file', {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') },
            method: 'POST',
            body: form
        })
            .then(() => getUser())
            .catch(console.log)
    }
    const getUser = useCallback(() => {
        http().get(`/users/${id}`)
            .then((a) => a.json())
            .then(user => setUser(user))
            .catch(e => dispatch({ type: 'error', payload: e.message }))
    }, [])
    const updateUser = () => http().patch(`/users/${id}`, user)
            .then((a) => a.json())
            .then(user => setUser(user))
            .catch(e => dispatch({ type: 'error', payload: e.message }))

    useEffect(() => getUser(), [getUser])
    return (
        <div>
            <div className="card col-3 m-5">
                <label className="card-img-top">
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" name="file" id="file"/>
                    <img className="card-img-top" src={user.avatar || ''} alt="Card image cap"/>
                </label>
                <div className="card-body">
                    <h5 className="card-title">{user.login}</h5>
                    <p className="card-title">{user.email}</p>
                    <button onClick={updateUser} className="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    );
}

export default SingleUser;

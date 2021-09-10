import React, { useCallback, useEffect, useState } from 'react';
import http from "../http";

function Users(props) {
    const [users, setUsers] = useState([]);
    const getUsers = useCallback(() => {
        http().get('/users')
            .then((a) => a.json())
            .then((users) => setUsers(users));
    }, []);

    useEffect(() => getUsers(), [getUsers])
    return (
        <div>
            {users.length && (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Login</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, i) => (
                            <tr key={i}>
                                <td>{user.id}</td>
                                <td>{user.login}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className='container'>
                        <button onClick={getUsers} className='btn btn-success'>
                            CLICK
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Users;

import React from 'react';
import { useDispatch } from "react-redux";

function Error({message}) {
    const clearError = useDispatch()
    return (
        <div onClick={() => clearError({type: 'error', payload: ''})} className="error">
            <h2>{message}</h2>
        </div>
    );
}

export default Error;

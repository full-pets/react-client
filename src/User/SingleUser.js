import React, { useState } from 'react';
import http from "../http";

function SingleUser(props) {
    const [file, setFile] = useState(new Blob())
    const image = () => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = function () {
            var longInt8View = reader.result

            for (var i=0; i< longInt8View.length; i++) {
                longInt8View[i] = i % 255;
            }
            http().post('/file', longInt8View)
            // console.log(reader.result)
        }
    }
    return (
        <div>
            <input onChange={(e) => setFile(e.target.files[0])} type="file" name="file" id="file"/>
            <button onClick={image}>Submit</button>
        </div>
    );
}

export default SingleUser;

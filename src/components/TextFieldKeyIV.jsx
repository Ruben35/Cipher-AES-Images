import React from "react";

const TextFieldKeyIV = (props) => {

    return(
        <div>
            <input type="text" value={props.value} onChange={(e) => props.onChange(e.target.value)} placeholder="16 caracteres" maxLength={16}></input>
        </div>
    );
}

export default TextFieldKeyIV;
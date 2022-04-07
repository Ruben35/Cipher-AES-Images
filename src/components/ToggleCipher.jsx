import React from 'react';
import { useState } from 'react';

const ToggleCipher = (props) => {

    const [active, setActive] = useState("encrypt");

    const toggle = (type) => {
        setActive(type);
        props.onChange(type);
    }

    return ( 
        <div className='toggleCipherButtons'>
            <button className={active==="encrypt"?"active":""} onClick={() => toggle("encrypt")} >Cifrado</button>
            <button className={active==="decrypt"?"active":""} onClick={() => toggle("decrypt")} >Descifrado</button>
        </div>
    );
}

export default ToggleCipher;
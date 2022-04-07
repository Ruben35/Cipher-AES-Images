import React from 'react';
import { useState } from 'react';

const ToggleModeOperation = (props) => {

    const [active, setActive] = useState("ECB");

    const toggle = (type) => {
        setActive(type);
        props.onChange(type);
    }

    return ( 
        <div className='toggleModeOperationButtons'>
            <button className={active==="ECB"?"active":""} onClick={() => toggle("ECB")} >ECB</button>
            <button className={active==="CBC"?"active":""} onClick={() => toggle("CBC")} >CBC</button>
            <button className={active==="CFB"?"active":""} onClick={() => toggle("CFB")} >CFB</button>
            <button className={active==="OFB"?"active":""} onClick={() => toggle("OFB")} >OFB</button>
        </div>
    );
}

export default ToggleModeOperation;
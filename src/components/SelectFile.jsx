import React from 'react';
import { useState } from 'react';

const SelectFile = (props) => {

    const [filePath, setFilePath] = useState(null);

    const getFile = async () => {
        var image = await window.api.getImageFile();
        if(image!=null)
            setFilePath(image.name)
        else
            setFilePath(null)

        props.onChange(image);
    }


    return (
        <div className='selectionFile'>
            {filePath!=null?"Archivo: "+filePath:""}
            <button className={filePath!=null?"small":""} onClick={getFile}>{filePath==null?"Seleccionar Archivo...":"Cambiar..."}</button>
        </div>
    );
}

export default SelectFile;
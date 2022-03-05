import { useState } from 'react';
import { FaSave } from "react-icons/fa";

function ProjectControls( {children} ){

    return (
        <div>
            {children}
            <button className={'btn btn-primary'}><FaSave color={'white'} /></button>
            <button className={'btn btn-primary'}>Save As...</button>
        </div>
    );
}

export default ProjectControls;
import { useState } from 'react';
import { FaSave } from "react-icons/fa";
import AddCellButton from '../cells/AddCellButton';
import MoveCellDownButton from '../cells/MoveCellDownButton';
import MoveCellUpButton from '../cells/MoveCellUpButton';
import ProjectContext from '../context/ProjectContext';


function ProjectControls( {children} )
{
    const { projectFilename } = useState(ProjectContext)
    //////
    const btnSaveClickHandler=(e)=>{
        console.log("btnSaveClickHandler")
        if(projectFilename===null){
            return btnSaveAsClickHandler(e);
        }
        // the user has already set the filename
        // saveProject();
    }

    const btnSaveAsClickHandler=(e)=>{
        console.log("btnSaveAsClickHandler");
        // setProjectFilename("helloworld.txt");
        // saveProject();
    }    
    
    return (
        <div>
            {children}
            <AddCellButton />
            <MoveCellUpButton />
            <MoveCellDownButton />
            <button className={'btn btn-primary'} onClick={btnSaveClickHandler}>
                    <FaSave color={'white'} />
            </button>
            <button className={'btn btn-primary'} onClick={btnSaveAsClickHandler}>
                Save As...
            </button>
        </div>
    );
}

export default ProjectControls;
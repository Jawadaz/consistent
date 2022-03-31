import { useContext, useState } from 'react';
import { Redirect} from 'react-router-dom'
import Files from "react-files";
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';

function LoadFile( {children} ){

    const [loadedProject, setLoadedProject] = useState();
    
    const { loadProject } = useContext(ProjectContext);
    const { clearFilterQuery } = useContext(FilterContext);

    const fileReader = new FileReader();

    fileReader.onload = event => {
        setLoadedProject(null);
        const project = JSON.parse(event.target.result);
        loadProject(project);
        setLoadedProject(project.id);
        clearFilterQuery();
    };

    return (
        <>
            {loadedProject && <Redirect to={{pathname:`/projects/${loadedProject}`}} ></Redirect>}
            {loadedProject === null && <Redirect to="/" ></Redirect>}
            <div className="files">
                <Files
                    className='files-dropzone'
                    onChange={
                        file => {
                            fileReader.readAsText(file[0]);
                        }
                    }
                    onError={err => console.log(err)}
                    accepts={[".json"]}
                    multiple
                    maxFiles={1}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                >
                    {children}
                </Files>
            </div>
        </>
    );
}

export default LoadFile;
import { useContext, useState } from 'react';
import { Navigate} from 'react-router-dom'
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
            {loadedProject && <Navigate to={{pathname:`/projects/${loadedProject}`}} />}
            {loadedProject === null && <Navigate to="/" />}
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
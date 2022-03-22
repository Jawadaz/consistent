import { useContext, useState } from 'react';
import { Link, Redirect} from 'react-router-dom'
import Files from "react-files";
import ProjectContext from '../context/ProjectContext';

function Navigation() {

    const [loadedProject, setLoadedProject] = useState()
    const {loadProject} = useContext(ProjectContext)    
    const fileReader = new FileReader()
    fileReader.onload = event => {
        setLoadedProject(null);
        const project = JSON.parse(event.target.result);
        loadProject(project);
        setLoadedProject(project.id);
      };
    return (
        
        <>
        {loadedProject && <Redirect to={{pathname:`/projects/${loadedProject}`}} ></Redirect>}
        {loadedProject === null && <Redirect to="/" ></Redirect>}
        <header className={'header'}>
            <div className={'logo'}> 
                <Link to='/'>
                    CONSISTENT
                </Link>
                
            </div>
           
            <nav>
            
                <ul>

                    <li>
                        <a >
                    <Files
                        className="files-dropzone"
                        onChange={file => {
                            fileReader.readAsText(file[0]);
                        }}
                        onError={err => console.log(err)}
                        accepts={[".json"]}
                        multiple
                        maxFiles={3}
                        maxFileSize={10000000}
                        minFileSize={0}
                        
                        clickable
                        >
                        Load Project
                        </Files>
                        </a>
                        
                    </li>
                     <li>
                        <Link to='/projects/_new'>New Project</Link>
                    </li>                    
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                  
                </ul>
            </nav>
        </header>
        </>
    );
}

export default Navigation;
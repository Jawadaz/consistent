import classes from './ProjectsList.module.css';
import ProjectItem from './ProjectItem.js';
import { Link } from 'react-router-dom';

function ProjectsList({ projects }){
    if (!projects || projects.length===0){
        return (
            <>
                <p>You did not create any projects yet.</p>
                <p>Do you want to create a <Link to='/projects/new'>New Projcet</Link></p>
            </>
        );
    }
    return (
        <ul className={classes.list}    >
            {projects.map(project => <ProjectItem 
                key={project.id} 
                id={project.id} 
                title={project.title} 
                content={project.content}/>
            )}
        </ul>
    );
}

export default ProjectsList;    
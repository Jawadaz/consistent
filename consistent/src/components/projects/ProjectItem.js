import classes from './ProjectItem.module.css'
import Card from '../ui/Card.js';
import { Link } from 'react-router-dom';

function ProjectItem(props){
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <Link to={`/projects/${props.id}`}>
                        <h3>{props.title}</h3>
                    </Link>
                    <p>{props.description}</p>
                </div>
            </Card>
        </li>
    );
}

export default ProjectItem;
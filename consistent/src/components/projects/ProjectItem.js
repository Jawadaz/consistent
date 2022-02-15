import classes from './ProjectItem.module.css'
import Card from '../ui/Card.js';

function ProjectItem(props){
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <p>{props.content.description}</p>
                </div>
            </Card>
        </li>
    );
}

export default ProjectItem;
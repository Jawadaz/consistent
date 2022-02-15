import { Link } from 'react-router-dom'

import classes from "./Navigation.module.css"

function Navigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}> 
                <Link to='/'></Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'><h1></h1>Home</Link>
                    </li>
                    <li>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li>
                        <Link to='/projects/new'>New Project</Link>
                    </li>
                </ul>
            </nav>  
        </header>
    );
}

export default Navigation;
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <header className={'header'}>
            <div className={'logo'}> 
                <Link to='/'>
                    CONSISTENT
                </Link>
            </div>
            {/* <nav>
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
            </nav>   */}
        </header>
    );
}

export default Navigation;
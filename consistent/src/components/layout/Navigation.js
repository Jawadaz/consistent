import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <header className={'header'}>
            <div className={'logo'}> 
                <Link to='/'>
                    CONSISTENT
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to='/projects/_load'>Load Project</Link>
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
    );
}

export default Navigation;
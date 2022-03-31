import { Link } from 'react-router-dom'
import LoadFile from '../ui/LoadFile';

function Navigation() {
    
    return (<>
        <header className={'header'}>
            <div className={'logo'}> 
                <Link to='/'>
                    CONSISTENT
                </Link>
            </div>
           
            <nav>
            
                <ul>
                    <li>
                        <Link to='/projects/_example'>Example</Link>
                    </li>
                    <li>
                        <button className={'NavButton'}>
                            <LoadFile>
                                Load Project
                            </LoadFile>
                        </button>
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
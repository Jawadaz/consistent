import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

import { useNavigate } from 'react-router-dom';
import LoadFile from '../ui/LoadFile';

function Navigation() {

    const pages = [
        {
            'name': 'Example',
            'path': '/projects/_example'
        },
        {
            'name': 'New',
            'path': '/projects/_new'
        },
        {   
            'name': 'Load',
            'path': '/projects/_load'
        },
        {   
            'name': 'About',
            'path': '/about'
        }
    ];
    // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const navigate = useNavigate();

    return (
        <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex'  }} }
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' } }}
                        onClick={()=>navigate('/')}
                    >
                        CONSISTENT
                    </Typography>

                    <Box 
                        sx= {{ flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'flex', lg:'flex' } }}
                    >
                        {pages.map((page) => (
                        <Button
                            key={page.name}
                            onClick={()=>navigate(page.path)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page.name}
                        </Button>
                        ))}         
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
    // return (<>
    //     <header className={'header'}>
    //         <div className={'logo'}> 
    //             <Link to='/'>
    //                 CONSISTENT
    //             </Link>
    //         </div>
           
    //         <nav>
            
    //             <ul>
    //                 <li>
    //                     <Link to='/projects/_example'>Example</Link>
    //                 </li>
    //                 <li>
    //                     <button className={'NavButton'}>
    //                         <LoadFile>
    //                             Load Project
    //                         </LoadFile>
    //                     </button>
    //                 </li>
    //                  <li>
    //                     <Link to='/projects/_new'>New Project</Link>
    //                 </li>                    
    //                 <li>
    //                     <Link to='/about'>About</Link>
    //                 </li>
    //             </ul>
    //         </nav>
    //     </header>
    //     </>
    // );
}

export default Navigation;
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import LoadFile from '../ui/LoadFile';
import ProjectToolbar from "./ProjectToolbar";


function NavigationBar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        console.log('what');
        setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        console.log('what');
        setAnchorElNav(null);
    };
    
    const pages = [
        {
            'name': 'Demo',
            'path': '/projects/_demo'
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

    return (
        <>
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={(e)=>handleOpenNavMenu(e)}
                        sx={{ mr: 2, display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none'  }} }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        // open={true}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', sm:'none', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem 
                                key={page.name} 
                                onClick={(e)=>{handleCloseNavMenu(e); navigate(page.path); }}
                            >
                                <Typography textAlign="center">{page.name}</Typography>     
                            </MenuItem>
                        ))}
                    </Menu>


                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' } }}
                        onClick={()=>navigate('/')}
                    >
                        CONSISTENT
                    </Typography>
                    <Box
                        sx= {{ flexGrow: 3, display: {xs: 'none', sm:'flex', md:'flex', lg:'flex'} }}
                    >
                    </Box>
                    <Box 
                        sx= {{ flexGrow: 1, display: { xs: 'none', sm: 'flex', md: 'flex', lg:'flex' } }}
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

export default NavigationBar;
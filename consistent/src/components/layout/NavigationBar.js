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

function NavigationBar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const pages = [
        {
            'name': 'New',
            'path': '/projects/_new'
        },
        {   
            'name': 'Load',
            'path': '/projects/_load'
        },
        {
            'name': 'Demo',
            'path': '/projects/_demo'
        },
        {   
            'name': 'About',
            'path': '/about'
        }
    ];

    return (
        <>
                <Toolbar disableGutters>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={(e)=>handleOpenNavMenu(e)}
                            sx={{ mr: 2, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex'  }} }
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <Menu
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
                        </Menu> */}
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ flexGrow: 1 }}
                            onClick={()=>navigate('/')}
                        >
                            CONSISTENT
                        </Typography>
                        {pages.map((page) => (
                        <Button
                            key={page.name}
                            onClick={()=>navigate(page.path)}
                            sx={{ 
                                my: 2, color: 'white', 
                                // display: 'block' 
                                display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex'  }
                            }}
                        >
                            {page.name}
                        </Button>
                        ))}         
                </Toolbar>
        </>
    );
}

export default NavigationBar;
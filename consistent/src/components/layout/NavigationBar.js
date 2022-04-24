import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Divider from "@mui/material/Divider"
import MenuItem from "@mui/material/MenuItem"
import Drawer from '@mui/material/Drawer';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function NavigationBar() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsDrawerOpen(open);
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
    ];

    return (
        <>
                <Toolbar disableGutters>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer(!isDrawerOpen)}
                            sx={{ mr: 2, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex'  }} }
                        >
                            <MenuIcon />
                            <Drawer
                                anchor="left"
                                open={isDrawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                <Box
                                    // sx={{ width: 250 }}
                                    role="presentation"
                                    onClick={toggleDrawer(false)}
                                    onKeyDown={toggleDrawer(false)}
                                >
                                    <MenuItem 
                                        key="home"
                                        onClick={(e)=>{
                                            navigate("/"); 
                                        }}
                                    >
                                        <Typography textAlign="center">Home</Typography>
                                    </MenuItem>

                                    <MenuItem 
                                        key="about"
                                        onClick={(e)=>{
                                            navigate("/about"); 
                                        }}
                                    >
                                        <Typography textAlign="center">About</Typography>
                                    </MenuItem>
                                    
                                <Divider />
                                { pages.map((page) => (                                    
                                    <MenuItem 
                                        key={page.name} 
                                        onClick={(e)=>{
                                            navigate(page.path); 
                                            }}
                                    >
                                        <Typography textAlign="center">{page.name}</Typography>     
                                    </MenuItem>
                                ))}
                                </Box>
                            </Drawer>
                        </IconButton>
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
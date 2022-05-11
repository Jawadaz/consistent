import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from '@mui/material/Drawer';

import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";

const Input = styled('input')({
  display: 'none',
});

function NavigationBar() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

    const { loadProject } = useContext(ProjectContext);
    const { clearFilterQuery } = useContext(FilterContext);

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
            'path': ''
        },
        {
            'name': 'Demo',
            'path': '/projects/_demo'
        },
        {
            'name': 'About',
            'path': '/about'
        },        
    ];

    const fileReader = new FileReader();

    const handleInputOnChange=(event)=>{
        console.log(event);
        if(event.target.files.length===0){
            setIsFilePicked(false);
            return;
        }
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        fileReader.readAsText(event.target.files[0]);
    }

    fileReader.onload=(event) => {
        console.log(event);
        const project = JSON.parse(event.target.result);
        loadProject(project);
        clearFilterQuery();
        navigate("/projects/"+project.id);
    };

    return (
        <>
                <Toolbar disableGutters>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer(!isDrawerOpen)}
                            sx={{ 
                                mr: 2, 
                                display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' }} 
                            }
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
                                { pages.map((page) => page.name==="Load"? 
                                    <label
                                        key={page.name}
                                        htmlFor="contained-button-file"
                                    >
                                        <Input
                                            id="contained-button-file" 
                                            accept="application/json" 
                                            type="file"
                                            onChange={handleInputOnChange}
                                        />
                                        <MenuItem>
                                            <Typography textAlign="center">{page.name}</Typography>     
                                        </MenuItem>
                                    </label>  
                                    :
                                    <MenuItem 
                                        key={page.name} 
                                        onClick={(e)=>{
                                            navigate(page.path); 
                                            }}
                                    >
                                        <Typography textAlign="center">{page.name}</Typography>     
                                    </MenuItem>
                                )}
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
                        { pages.map((page) =>
                            page.name==="Load" ? 
                             <label 
                             key={page.name}
                             htmlFor="contained-button-file">
                                <Input
                                    id="contained-button-file" 
                                    accept="application/json" 
                                    type="file"
                                    onChange={handleInputOnChange}
                                / >
                                <Button
                                    // variant="contained" 
                                    component="span"
                                    sx={{ 
                                        my: 2, color: 'white', 
                                        display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }
                                    }}
                                >  
                                    {page.name}
                                </Button>
                                </label>
                            :
                                <Button
                                    key={page.name}
                                    onClick={()=>navigate(page.path)}
                                    sx={{ 
                                        my: 2, color: 'white', 
                                        // display: 'block' 
                                        display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }
                                    }}
                                >
                                    {page.name}
                                </Button>
                        )}
                </Toolbar>
        </>
    );
}

export default NavigationBar;
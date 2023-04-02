import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Chip } from '@mui/material';
import Box from "@mui/material/Box";

import ProjectContext from '../context/ProjectContext';
import { useContext } from 'react';

export function ProjectSingleTag({tag, handleTagClick, handleTagDelete}){    
    const { tagColorMapping } = useContext(ProjectContext);

    return  (<Box
        sx={{
            marginLeft:'2px',
            marginBottom: '2px',
        }}
        key={tag.id}                            
    >
    <Chip 
        sx= {{
                "& .MuiChip-deleteIcon": {
                    display: "none"
                  },
                  "&:hover": {
                    "& .MuiChip-deleteIcon": {
                      display: "block"
                    }
                  }
        }}
        size="small"
        style={{backgroundColor:tagColorMapping[tag.id]?tagColorMapping[tag.id]:"primary"}} 
        key={tag.id} 
        label={tag.text}
        clickable={true}
        onClick={(e)=>{
            e.stopPropagation();
            handleTagClick(e);
            }
        }
        deleteIcon={<KeyboardArrowDownIcon/>}
        onDelete={(e)=>handleTagDelete(tag)}
    />
    </Box>);
}
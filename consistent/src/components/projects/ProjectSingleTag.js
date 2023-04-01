import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Chip } from '@mui/material';
import Box from "@mui/material/Box";

export function ProjectSingleTag({tag, handleTagClick, handleTagDelete}){

    return  (<Box
        sx={{
            marginLeft:'2px',
            marginBottom: '2px',
        }}
        key={tag.id}                            
    >
    <Chip 
        size="small" 
        style={{backgroundColor:tag.color?tag.color:"primary"}} 
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
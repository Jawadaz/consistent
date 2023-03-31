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
        key={tag.id} 
        label={tag.text}
        color={tag.color?tag.color:"primary"}
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
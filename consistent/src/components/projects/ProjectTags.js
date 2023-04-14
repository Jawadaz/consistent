import { useContext, useState, useRef} from 'react'
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import { ProjectSingleTag } from './ProjectSingleTag';
import { CirclePicker } from 'react-color';

import Box from "@mui/material/Box";

//obtaining these values dynamically would allow easier configurability of the color picker
//default values obtained from https://casesandberg.github.io/react-color/
const circlePickerWidth = 252;
const circlePickerHeight = 124;

function ProjectTags( props ){
    const [colorPickerTag, setColorPickerTag] = useState(null);
    const [colorPickerPosition, setColorPickerPosition] = useState({x:0, y:0});
    const { projectTags, setProjectTagColor } = useContext(ProjectContext);
    const { addTagsToFilterQuery } = useContext(FilterContext);

    const handleTagClick = (e) => {
        const tag = e.target.innerText;
        addTagsToFilterQuery([{id:tag, text:tag}]);
    };

    const handleTagDelete = (e, tag) => {
        const targetX = (window.innerWidth > e.clientX + circlePickerWidth)
            ?e.clientX:e.clientX - circlePickerWidth;
        const targetY = (window.innerHeight > e.clientY + circlePickerHeight)
            ?e.clientY:e.clientY - circlePickerHeight;
        setColorPickerPosition({x:targetX,y:targetY});
        setColorPickerTag(tag);
    }
    
    const handleColorChange = (color) => {
        setProjectTagColor(colorPickerTag, color.hex);
        setColorPickerTag(null);
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
        top: colorPickerPosition.y, 
        left: colorPickerPosition.x,
        backgroundColor: 'gray',
        padding: '5px',
      }
      const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >
            {
                projectTags.sort((a,b)=>{
                    if(a.id.toUpperCase()>b.id.toUpperCase()){
                        return 1;
                    }
                    return -1;
                }).map(tag => {
                    return (
                        <ProjectSingleTag
                            key={tag.id} 
                            tag={tag}
                            handleTagClick={handleTagClick}
                            handleTagDelete={handleTagDelete}
                            />
                        );
                    }
                )
            }
            {colorPickerTag &&
                    (<div style={ popover}>
                    <div style={ cover } onClick={()=>setColorPickerTag(null)}/>
                    <CirclePicker  
                        color={colorPickerTag.color}
                        onChangeComplete={handleColorChange }/>
                    </div>)}
        </Box>
    );
}

export default ProjectTags;
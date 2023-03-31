import { useContext, useState} from 'react'
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import { ProjectSingleTag } from './ProjectSingleTag';
import { SwatchesPicker} from 'react-color';

import Box from "@mui/material/Box";

function ProjectTags( props ){
    const [colorPickerTag, setColorPickerTag] = useState(null);
    const { projectTags, setProjectTagColor } = useContext(ProjectContext);
    const { addTagsToFilterQuery } = useContext(FilterContext);

    const handleTagClick = (e) => {
        const tag = e.target.innerText;
        addTagsToFilterQuery([{id:tag, text:tag}]);
    };

    const handleTagDelete = (e) => {
        setColorPickerTag(e);
    }

    const handleClosePicker = ()=> {
        console.log("Handle Close Picker");
        setColorPickerTag(null);
    }

    const handleColorChange = (color) => {
        console.log(color);
        setProjectTagColor(colorPickerTag, color.hex);
        setColorPickerTag(null);
        console.log("Handle Color Change");
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
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
                    (<div style={ popover }>
                    <div style={ cover } onClick={handleClosePicker}/>
                    <SwatchesPicker  
                        color={colorPickerTag.color}
                        onChangeComplete={handleColorChange }/>
                    </div>)}
        </Box>
    );
}

export default ProjectTags;
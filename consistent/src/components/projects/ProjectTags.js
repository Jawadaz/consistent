import { useContext} from 'react'
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import Chip from "@mui/material/Chip";

import Box from "@mui/material/Box";

function ProjectTags( props ){
    
    const { projectTags } = useContext(ProjectContext);
    const { addTagsToFilterQuery } = useContext(FilterContext);
    
    const handleTagClick = (e) => {
        const tag = e.target.innerText;
        addTagsToFilterQuery([{id:tag, text:tag}]);
    };

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
                        <Box
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
                            />
                        </Box>
                        );
                    }
                )
            }
        </Box>
    );
}

export default ProjectTags;
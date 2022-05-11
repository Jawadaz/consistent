import { useContext} from 'react'
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import Chip from "@mui/material/Chip";

import Box from "@mui/material/Box";

function ProjectTags(){
    
    const { projectTags } = useContext(ProjectContext);
    const { addTagsToFilterQuery } = useContext(FilterContext);
    
    const handleTagClick = (event) => {
        // console.log('The tag at index ' + index + ' was clicked');
        // console.log(projectTags[index]);
        //if tag is not in tags push
        const tag = event.target.innerText;
        addTagsToFilterQuery([{id:tag, text:tag}]);
    };

    // const sortedProjectTags = [...projectTags];
    // sortedProjectTags.sort((a,b)=>{
    //     if(a.id.toUpperCase()>b.id.toUpperCase()){
    //         return 1;
    //     }
    //     return -1;
    // });
    
    // console.log([projectTags]);
    return (
        // <div>
        //     <ul className={"ReactTags__tags ReactTags__selected"}>
        //         {projectTags.map((tag)=>
        //                 <Tag 
        //                     tag={tag} 
        //                     key={tag.id}
        //                 />
        //             )
        //         }
        //     </ul>
        // </div>
        // <div className={"ProjectTags"}>
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
                                onClick={handleTagClick}
                            />
                        </Box>
                        );
                    }
                )
            }        
            {/* <ReactTags
                tags={ sortedProjectTags }
                
                autofocus={false}
                allowDeleteFromEmptyInput={false}
                
                handleTagClick={handleTagClick}
               
                readOnly={true}
                allowUnique={true}
            />             */}
        </Box>
    );
}

export default ProjectTags;
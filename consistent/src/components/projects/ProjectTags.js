import { WithContext as ReactTags } from 'react-tag-input';
import { useContext} from 'react'
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';

function ProjectTags(){
    
    const { projectTags } = useContext(ProjectContext);
    const { addTagsToFilterQuery } = useContext(FilterContext);
    
    const handleTagClick = index => {
        // console.log('The tag at index ' + index + ' was clicked');
        // console.log(projectTags[index]);
        //if tag is not in tags push
        addTagsToFilterQuery([projectTags[index]]);
    };

    const sortedProjectTags = [...projectTags];
    sortedProjectTags.sort((a,b)=>{
        if(a.id.toUpperCase()>b.id.toUpperCase()){
            return 1;
        }
        return -1;
    });
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
        <div className={"ProjectTags"}>
            <ReactTags
                tags={ sortedProjectTags }
                
                autofocus={false}
                allowDeleteFromEmptyInput={false}
                
                handleTagClick={handleTagClick}
               
                readOnly={true}
                allowUnique={true}
            />            
        </div>
    );
}

export default ProjectTags;
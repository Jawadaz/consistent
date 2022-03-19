import { WithContext as ReactTags } from 'react-tag-input';
import { useContext} from 'react'
import ProjectContext from '../context/ProjectContext';
import Tag from "../tags/Tag";

function ProjectTags(){
    
    const { projectTags } = useContext(ProjectContext);
    
    
    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
        console.log(projectTags);
    };
    
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
                tags={projectTags}
                
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
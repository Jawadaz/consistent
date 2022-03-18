import { WithContext as ReactTags } from 'react-tag-input';
import { useContext} from 'react'
import ProjectContext from '../context/ProjectContext';

function ProjectTags(){
    
    const { projectTags } = useContext(ProjectContext);
    
    
    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };
    
    return (
        <div>
            <h3>
                Project Tags
            </h3>
            <ReactTags
                tags={projectTags}
                // placeholder={"Add tag..."}
                // suggestions={suggestions}
                // minQueryLength={2}
                autofocus={false}
                allowDeleteFromEmptyInput={false}
                // delimiters={delimiters}
                // handleDelete={handleDelete}
                // handleAddition={handleAddition}
                // handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                // inputFieldPosition="bottom"
                // autocomplete={true}
                readOnly={true}
                allowUnique={true}
                // allowDragDrop={true}
                // inline={true}
                // allowAdditionFromPaste={true}
                // editable={false}
            />            
        </div>
    );
}

export default ProjectTags;
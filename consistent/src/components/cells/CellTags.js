import { WithContext as ReactTags } from 'react-tag-input';
import ProjectContext from '../context/ProjectContext';
import { useContext, useState, useEffect} from 'react'

const CellTags = ( {cell, isActive} ) => {

    const { updateCellTags, projectTags } = useContext(ProjectContext);

    const [tags, setTags] = useState(cell.tags);
    const [suggestions, setSuggestions] = useState(projectTags)

    const handleDelete = i => {
        const newTags = tags.filter((tag, index) => index !== i);
        setTags(newTags);
        // update project
        updateCellTags(cell.id, newTags);
    };

    const handleAddition = tag => {
        const newTags = [...tags, tag];
        setTags(newTags);
        // update project
        updateCellTags(cell.id, newTags);      
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
        // update project
        updateCellTags(cell.id, newTags);        
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const KeyCodes = {
        comma: 188,
        enter: 13
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];
  
    useEffect(()=>{
      console.log('CellTags.useEffect()');
      setSuggestions(projectTags);
    }, [projectTags]);
  
    return ( isActive?
        <div>
            <ReactTags
                tags={tags}
                placeholder={"Add tag..."}
                suggestions={suggestions}
                minQueryLength={2}
                autofocus={false}
                allowDeleteFromEmptyInput={false}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="inline"
                autocomplete={true}
                readOnly={false}
                allowUnique={true}
                allowDragDrop={false}
                inline={true}
                allowAdditionFromPaste={true}
                editable={false}
            />
        </div>
        :
        <div>
            <ReactTags
                tags={tags}
                autofocus={false}
                allowDeleteFromEmptyInput={false}
                readOnly={true}
                allowUnique={true}
                allowDragDrop={false}
            />
        </div>
    );
}

export default CellTags
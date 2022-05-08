import ProjectContext from '../context/ProjectContext';
import { useContext, useState, useEffect} from 'react'


import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const CellTagsMU = ( {cell, isActive, updateCellTags } ) => {

    const { projectTags, isProjectLocked } = useContext(ProjectContext);

    const [tags, setTags] = useState(cell.tags);
    const [suggestions, setSuggestions] = useState(projectTags)

    const handleDelete = (tagToDelete) => {
        console.log(tagToDelete);
        const newTags = tags.filter((tag) => tag.id !== tagToDelete.id);
        setTags(newTags);
        // update project
        updateCellTags(cell.id, newTags);
    };

    const handleAddition = (tag) => {
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
        // console.log('The tag at index ' + index + ' was clicked');
    };

    const KeyCodes = {
        enter: 13
    };

    const delimiters = [KeyCodes.enter];
  
    useEffect(()=>{
    //   console.log('CellTags.useEffect() projectTags');
      setSuggestions(projectTags);
    }, [projectTags]);

    useEffect(()=>{
        // console.log('CellTags.useEffect() cell.tags');
        setTags(cell.tags);
    },[cell.tags]);
  
    return ( isActive?
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}        
        >
            {/* <ReactTags
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
                readOnly={isProjectLocked}
                allowUnique={true}
                allowDragDrop={false}
                inline={true}
                allowAdditionFromPaste={true}
                editable={false}
            /> */}
            {
                tags.map(tag => {
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
                                onDelete={ ()=>handleDelete(tag) }
                            />
                        </Box>
                    )
                })
            }
        </Box>
        :
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >
            {
                tags.map(tag => {
                    return (
                        <Box
                            sx={{
                                marginLeft:'2px',
                                marginBottom: '2px',
                            }}
                            key={tag.id}                            
                        >
                            <Chip size="small" key={tag.id} label={tag.text} color={tag.color?tag.color:"primary"}/>
                        </Box>
                        );
                    }
                )
            }
        </Box>
    );
}

export default CellTagsMU
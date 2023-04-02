import ProjectContext from '../context/ProjectContext';
import { useContext, useState, useEffect} from 'react'


import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";


const CellTagsMU = ( {cell, isActive, updateCellTags } ) => {

    const { projectTags, tagColorMapping } = useContext(ProjectContext);
    const [tags, setTags] = useState(cell.tags);
    const [suggestions, setSuggestions] = useState(
        projectTags.filter(
            tag=>!cell.tags.map(tag=>tag.id).includes(tag.id)
    ));


    const handleDelete = (tagToDelete) => {
        // console.log(tagToDelete);
        const newTags = tags.filter((tag) => tag.id !== tagToDelete.id);
        setTags(newTags);
        // update project
        updateCellTags(cell.id, newTags);
    };


    const handleAddition = (tagToAdd) => {
        // console.log('handleAddition');
        if(tagToAdd===null || tagToAdd.id===null || tagToAdd.text===null){
            console.warn('value error: tag contains id:null or text:null');
            return;
        }
        // Look for the tag in the list
        let i = tags.findIndex(tag => {
            return (tag.id === tagToAdd.id);
        });
        if(i<=-1){ //if not found
            // add new tag and update cell state            
            const newTags = [...tags, tagToAdd];
            // sort tags
            newTags.sort((a,b)=>{
                    if(a.id.toUpperCase()>b.id.toUpperCase()){
                        return 1;
                    }
                    return -1;
                });            
            setTags(newTags);
            // update project
            updateCellTags(cell.id, newTags);                  
        }
    };
    // const handleDrag = (tag, currPos, newPos) => {
    //     const newTags = tags.slice();
    //     newTags.splice(currPos, 1);
    //     newTags.splice(newPos, 0, tag);
    //     // re-render
    //     setTags(newTags);
    //     // update project
    //     updateCellTags(cell.id, newTags);        
    // };

    // const KeyCodes = {
    //     enter: 13
    // };

    // const delimiters = [KeyCodes.enter];
  
    useEffect(()=>{
        if(!isActive){
            return;
        }
        // Fconsole.log('CellTags.useEffect() cell.tags or projectTags');
        //remove cell tags from the project Tags to keep the suggestions clean
        const newSuggestions = projectTags.filter(
        tag=>{
            return !cell.tags.map(tag=>tag.id).includes(tag.id);
        });
        setSuggestions(newSuggestions);
        setTags(cell.tags);
    },[cell.tags, projectTags]);
  

    return ( isActive?
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}        
        >
            {
                tags.sort((a,b)=>{
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
                                style={{backgroundColor:tagColorMapping[tag.id]?tagColorMapping[tag.id]:"primary"}} 
                                onDelete={ ()=>handleDelete(tag) }
                            />
                        </Box>
                    )
                })
            }
            <Autocomplete
                //https://mui.com/material-ui/api/autocomplete
                autoHighlight
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={suggestions.map(tag=>tag.id)}
                freeSolo={true}
                // value={autocompleteValue}
                size="small"
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }

                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        // console.log('Add "xxx" option created dynamically');
                        return option.inputValue;
                    }
                    // Regular option
                    return option.text;
                }}
                renderInput={(params) => (
                    <TextField 
                        variant='standard'
                        hiddenLabel
                        margin="none"
                        sx={{
                            height: '24px',
                        }}
                        size="small"
                        {...params}
                    />
                )}
                // renderOption={(props, option) => 
                //     <li {...props}>{option.text}</li>
                // }
                sx={{ 
                    marginLeft: '4px',
                    width: '120px',
                    height: '24px',
                    //https://mui.com/material-ui/customization/how-to-customize/ 
                    '& .MuiAutocomplete-inputRoot': {
                        padding: 0,
                        fontSize: '13px',
                    },
                    '& .MuiAutocomplete-listbox': {
                        fontSize: '13px',
                    },
                }}
                onChange={(e, value, reason, details)=> {
                    // console.log('onChange');
                    handleAddition({id: value, text: value});
                }}
            />
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
                tags.sort((a,b)=>{
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
                            <Chip size="small" key={tag.id} label={tag.text} 
                                style={{backgroundColor:tagColorMapping[tag.id]?tagColorMapping[tag.id]:"primary"}} />
                        </Box>
                        );
                    }
                )
            }
        </Box>
    );
}

export default CellTagsMU
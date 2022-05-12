// import { WithContext as ReactTags } from 'react-tag-input';
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import { useContext, useState, useEffect} from 'react'
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ProjectTags from "../projects/ProjectTags.js"
import { FaLess } from 'react-icons/fa';


function ProjectFiltersTags( {showTagsButton} ){
    const { projectTags } = useContext(ProjectContext);
    const { filterQuery, 
            // addTagsToFilterQuery, 
            // removeTagsFromFilterQuery, 
            updateTagsInFilterQuery } = useContext(FilterContext);

    const [tags, setTags] = useState(filterQuery.tags.map(tag=>tag.id));    
    const [ showProjectTags, setShowProjectTags ] = useState(false);
    const [suggestions, setSuggestions] = useState(projectTags.map(tag=>tag.id))

    const handleOnChange=(tags)=>{
        const filterTags = tags.map((tag) => {return {id: tag, value: tag};});
        updateTagsInFilterQuery(filterTags);
    }


    useEffect(()=>{
        // console.log('CellTags.useEffect()');
        setSuggestions(projectTags.map(tag=>tag.id));
    }, [projectTags]);

    useEffect(()=>{
        // console.log('CellTags.useEffect()');
        setTags(filterQuery.tags.map(tag=>tag.id));
      }, [filterQuery]);

          return (
        <>
            <Autocomplete
                multiple
                id="tags-standard"
                options={suggestions}
                // The following lines are important because we add custom endAdornment to TextField
                // see 
                disableClearable
                forcePopupIcon={false}                
                // getOptionLabel={
                //     (option) => {
                //         console.log('getOptionLabel')
                //         console.log(option);
                //         return option.title;
                //     }
                // }
                // defaultValue={tags.map(tag=>tag.id)}
                value={tags.map(tag=>
                    {
                        return tag;
                    }
                )}
                freeSolo
                openOnFocus
                renderTags={
                    (value, getTagProps) => value.map((option, index) => {
                        // handleAddition({id: option});
                        return  (
                            <Chip 
                                // variant="outlined" 
                                label={option} 
                                size="small"  
                                color="primary"
                                {...getTagProps({ index })} 
                            />
                        );
                    })
                }

                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        // placeholder="Filter by tag..."
                        // hiddenLabel
                        label="Filter by tag..."
                        onClick={(e)=>{e.stopPropagation();}}
                        InputProps={
                            showTagsButton ?
                            {
                            ...params.InputProps,
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            setShowProjectTags(!showProjectTags);
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            p: 0,
                                            left: 'calc(100% - 24px)',
                                            // top: 'calc(50% - 12px)', // Center vertically
                                        }}
                                    >
                                    {showProjectTags ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }:{
                                ...params.InputProps
                            }
                        }
                    />                
                )}
                onChange={(e, value, reason, details)=> {
                    handleOnChange(value, details, reason);
                }}
            />
            {
                showProjectTags?
                <Box 
                    paddingTop="16px"
                >
                    <ProjectTags />
                </Box>
                :
                <></>
            }            
        </>
    )
}

export default ProjectFiltersTags;

// Specifies the default values for props:
ProjectFiltersTags.defaultProps = {
  showTags: false
};
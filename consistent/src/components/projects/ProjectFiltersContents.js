import { useContext, useState, useEffect} from 'react'
import FilterContext from '../context/FilterContext';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

function ProjectFiltersContent(){
    const { filterQuery, updateTokensInFilterQuery } = useContext(FilterContext);

    const [tokens, setTokens] = useState(filterQuery.tokens);

    const handleOnChange = ( tokens, change, reason ) => {      
        const filterTokens = tokens.map((token) => {return {id: token, value: token};});
        updateTokensInFilterQuery(filterTokens);   
    }
  
    useEffect(()=>{
        setTokens(filterQuery.tokens.map(token=>token.id));
    }, [filterQuery]);

    return (
        <>
            <Autocomplete
                multiple
                id="tags-standard"
                options={tokens}
                // getOptionLabel={
                //     (option) => {
                //         console.log('getOptionLabel')
                //         console.log(option);
                //         return option.title;
                //     }
                // }
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
                        onClick={(e)=>{e.stopPropagation();}}
                        // placeholder="Filter by content..."
                        // hiddenLabel
                        label="Filter by content..."
                    />                
                )}
                onChange={(e, value, reason, details)=> {
                    // console.log('onChange');
                    // console.log(details);
                    // console.log(value);
                    // console.log(e, value, reason, details);
                    handleOnChange(value, details, reason);
                }}
                // onClose={(e)=>{
                //     console.log('onClose');
                // }}
            />
        </>
    );
}

export default ProjectFiltersContent;
// import { WithContext as ReactTags } from 'react-tag-input';
import { useContext, useState, useEffect} from 'react'
import FilterContext from '../context/FilterContext';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

function ProjectFiltersContent(){
    const { filterQuery, updateTokensInFilterQuery } = useContext(FilterContext);

    const [tokens, setTokens] = useState(filterQuery.tokens);

    const handleOnChange = ( tokens, change, reason ) => {
        // setTokens(tokens);        
        const filterTokens = tokens.map((token) => {return {id: token, value: token};});
        updateTokensInFilterQuery(filterTokens);   
    }
  
    useEffect(()=>{
        // console.log('CellTokens.useEffect() filterQuery');
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
                        // placeholder="Filter by content..."
                        // hiddenLabel
                        label="Filter by content..."
                    />                
                )}
                onChange={(event, value, reason, details)=> {
                    // console.log('onChange');
                    console.log(details);
                    console.log(value);
                    console.log(event, value, reason, details);
                    handleOnChange(value, details, reason);
                }}
                // onClose={(event)=>{
                //     console.log('onClose');
                // }}
            />
        </>
    );
}

export default ProjectFiltersContent;


// import { WithContext as ReactTags } from 'react-tag-input';
// import { useContext, useState, useEffect} from 'react'
// import FilterContext from '../context/FilterContext';

// function ProjectFiltersContent(){
//     // const { projectContents } = useContext(ProjectContext);
//     const { filterQuery, addTokensToFilterQuery, removeTokensFromFilterQuery } = useContext(FilterContext);

//     const [tokens, setTokens] = useState(filterQuery.tokens);
    
//     const KeyCodes = {
//         enter: 13
//     };

//     const delimiters = [KeyCodes.enter];
  
//     const handleAddition = (token) => {
//         // console.log(token)
//         // if(projectTags.some((projectTag)=>projectTag.id===tag.id)){
//             const newTokens = [...tokens, token];
//             setTokens(newTokens);
//             addTokensToFilterQuery(newTokens);
//         // }
//     };
    
//     const handleDelete = i => {
//         const newTokens = tokens.filter((token, index) => index !== i);
//         setTokens(newTokens);
//         removeTokensFromFilterQuery([tokens[i]]);
//     };

//     // useEffect(()=>{
//     //     console.log('CellTags.useEffect()');
//     //     setSuggestions(projectTags);
//     //   }, [projectTags]);
  
//     useEffect(()=>{
//         console.log('CellTokens.useEffect() filterQuery');
//         setTokens(filterQuery.tokens);
//     }, [filterQuery]);    

//     return (
//         <div>            
//             <ReactTags
//                 tags={tokens}
//                 placeholder={"Filter by tag..."}
//                 suggestions={[]}
//                 minQueryLength={2}
//                 autofocus={false}
//                 allowDeleteFromEmptyInput={true}
//                 delimiters={delimiters}
//                 handleDelete={handleDelete}
//                 handleAddition={handleAddition}
//                 inputFieldPosition="inline"
//                 autocomplete={true}
//                 readOnly={false}
//                 allowUnique={true}
//                 allowDragDrop={false}
//                 inline={true}
//                 allowAdditionFromPaste={true}
//                 editable={false}
//             />
//         </div>
//     );
// }

// export default ProjectFiltersContent;
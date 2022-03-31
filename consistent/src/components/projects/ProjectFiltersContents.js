import { WithContext as ReactTags } from 'react-tag-input';
import { useContext, useState, useEffect} from 'react'
import FilterContext from '../context/FilterContext';

function ProjectFiltersContent(){
    // const { projectContents } = useContext(ProjectContext);
    const { filterQuery, addTokensToFilterQuery, removeTokensFromFilterQuery } = useContext(FilterContext);

    const [tokens, setTokens] = useState(filterQuery.tokens);
    
    const KeyCodes = {
        enter: 13
    };

    const delimiters = [KeyCodes.enter];
  
    const handleAddition = (token) => {
        console.log(token)
        // if(projectTags.some((projectTag)=>projectTag.id===tag.id)){
            const newTokens = [...tokens, token];
            setTokens(newTokens);
            addTokensToFilterQuery(newTokens);
        // }
    };
    
    const handleDelete = i => {
        const newTokens = tokens.filter((token, index) => index !== i);
        setTokens(newTokens);
        removeTokensFromFilterQuery([tokens[i]]);
    };

    // useEffect(()=>{
    //     console.log('CellTags.useEffect()');
    //     setSuggestions(projectTags);
    //   }, [projectTags]);
  
    useEffect(()=>{
        console.log('CellTokens.useEffect() filterQuery');
        setTokens(filterQuery.tokens);
    }, [filterQuery]);    

    return (
        <div>            
            <ReactTags
                tags={tokens}
                placeholder={"Filter by tag..."}
                suggestions={[]}
                minQueryLength={2}
                autofocus={false}
                allowDeleteFromEmptyInput={true}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
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
    );
}

export default ProjectFiltersContent;
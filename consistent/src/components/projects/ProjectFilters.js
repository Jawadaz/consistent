import { WithContext as ReactTags } from 'react-tag-input';
import ProjectContext from '../context/ProjectContext';
import { useContext, useState, useEffect} from 'react'

function ProjectFilters(){
    const { projectTags, filterProjectCells } = useContext(ProjectContext);
    
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState(projectTags)
    const [query, setQuery] = useState({
        'tags': [],
        'operation': "and"
    });
    
    const KeyCodes = {
        comma: 188,
        enter: 13
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];
  
    const handleAddition = (tag) => {
        if(projectTags.some((projectTag)=>{if(projectTag.id===tag.id){return true;}})){
            const newTags = [...tags, tag];
            setTags(newTags);
            const newQuery = {
                'tags': newTags,
                'operation': query.operation
            }
            setQuery(newQuery);            
        }
    };
    
    const handleDelete = i => {
        const newTags = tags.filter((tag, index) => index !== i);
        setTags(newTags);
        const newQuery = {
            'tags': newTags,
            'operation': query.operation
        }
        setQuery(newQuery);
    };

    useEffect(()=>{
      console.log('CellTags.useEffect()');
      setSuggestions(projectTags);
    }, [projectTags]);

    useEffect(()=>{
        filterProjectCells(query);
    }, [query]);

    return (
        <div>
            <ReactTags
                tags={tags}
                placeholder={"Filter by tag..."}
                suggestions={suggestions}
                minQueryLength={2}
                autofocus={false}
                allowDeleteFromEmptyInput={false}
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

export default ProjectFilters;
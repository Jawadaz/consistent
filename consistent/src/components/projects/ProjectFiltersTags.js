import { WithContext as ReactTags } from 'react-tag-input';
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import { useContext, useState, useEffect} from 'react'

function ProjectFiltersTags(){
    const { projectTags } = useContext(ProjectContext);
    const { filterQuery, addTagsToFilterQuery, removeTagsFromFilterQuery } = useContext(FilterContext);
    
    const [suggestions, setSuggestions] = useState(projectTags)
    const [tags, setTags] = useState(filterQuery.tags);

    const KeyCodes = {
        enter: 13
    };

    const delimiters = [KeyCodes.enter];
  
    const handleAddition = (tag) => {
        if(projectTags.some((projectTag)=>projectTag.id===tag.id)){
            const newTags = [...tags, tag];
            setTags(newTags);
            // const newQuery = {
            //     'tags': newTags,
            //     'operator': query.operator,
            //     'text': ''
            // }
            // setQuery(newQuery);
            addTagsToFilterQuery(newTags);
            // setFilterQuery(newQuery);
        }
    };
    
    const handleDelete = i => {
        const newTags = tags.filter((tag, index) => index !== i);
        setTags(newTags);
        removeTagsFromFilterQuery([tags[i]]);
    };

    useEffect(()=>{
    //   console.log('CellTags.useEffect()');
      setSuggestions(projectTags);
    }, [projectTags]);

    useEffect(()=>{
        // console.log('CellTags.useEffect()');
        setTags(filterQuery.tags);
      }, [filterQuery]);

    return (
        <div>            
            <ReactTags
                tags={tags}
                placeholder={"Filter by tag..."}
                suggestions={suggestions}
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

export default ProjectFiltersTags;
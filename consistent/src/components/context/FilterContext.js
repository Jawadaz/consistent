import { createContext, useState, useEffect, useContext } from "react";
import ProjectContext from "./ProjectContext"

const FilterContext = createContext();

export const FilterContextProvider=( {children} )=> {
    const emptyFilterQuery = {
        tags: [],
        text: [],
        operator: 'or'
    };
    const { projectCells } = useContext(ProjectContext);    
    const [ filterQuery, setFilterQuery ] = useState({...emptyFilterQuery});
    const [ filteredProjectCells, setFilteredProjectCells ] = useState([...projectCells]);
    const [ isFiltered, setIsFiltered ] = useState(false)

    const resetFilterQuery=()=>{
        setFilterQuery(emptyFilterQuery);
    }


    const addTagsToFilterQuery=(tags)=>{
        const newQuery = {...filterQuery};
        console.log(tags);
        // newQuery.tags.push(tags.flat());
        //some js magic

        tags.forEach(tag=>{
            var i = newQuery.tags.findIndex(x => x.id === tag.id);
            if(i<=-1){
                newQuery.tags.push(tag);
            }
        });

        setFilterQuery(newQuery);
        return;
    }

    const removeTagsFromFilterQuery=(tags)=>{
        const newQuery = {...filterQuery};
        console.log(tags);
        newQuery.tags = newQuery.tags.filter(tag=>{
            return !tags.map(tag=>tag.id).includes(tag.id);
        });
        setFilterQuery(newQuery);
        return;
    }

    useEffect(()=>{
        const filterProjectCells = (query) => {
            const tagsIds = query.tags.map(tag=>tag.id);
            const text = query.text;
            const operation = query.operation;
            
            if(tagsIds.length===0 && text.length===0){
                setFilteredProjectCells(projectCells);
                setIsFiltered(false);
                return;
            }
            // FilterTags:
            let cells = [];
            if (operation==='or'){
                cells= projectCells.filter(
                    cell=>cell.tags
                        .map(tag => tag.id)
                        .some(tag => tagsIds.includes(tag))
                );
            } else {
                //TODO: Change the behavior to and
                cells = projectCells.filter(
                    cell=>cell.tags
                        .map(tag => tag.id)
                        .some(tag => tagsIds.includes(tag))
                );
            }
            // FilterText:
            // cells = cells.filter(
            //      cell=>cell.content 
            // );
            setFilteredProjectCells(cells);
            setIsFiltered(!cells||(projectCells.length!==cells.length));
            return;
        }
        
        console.log("filterQuery");
        console.log(filterQuery);
        filterProjectCells(filterQuery);
    }, [filterQuery, projectCells]);

    return (
        <FilterContext.Provider value={{
            addTagsToFilterQuery,
            removeTagsFromFilterQuery,

            resetFilterQuery,

            filterQuery,
            filteredProjectCells,
            isFiltered
        }}
    >
        {children}
        </FilterContext.Provider>
    );
}

export default FilterContext;
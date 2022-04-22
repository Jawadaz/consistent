import { createContext, useState, useEffect, useContext } from "react";
import ProjectContext from "./ProjectContext"

const FilterContext = createContext();

export const FilterContextProvider=( {children} )=> {
    const emptyFilterQuery = {
        tags: [],
        tokens: [],
        operator: 'or'
    };
    const { projectCells } = useContext(ProjectContext);    
    const [ filterQuery, setFilterQuery ] = useState({...emptyFilterQuery});
    const [ filteredProjectCells, setFilteredProjectCells ] = useState([...projectCells]);
    const [ isFiltered, setIsFiltered ] = useState(false)

    const clearFilterQuery=()=>{
        setFilterQuery(emptyFilterQuery);
    }


    const addTagsToFilterQuery=(tags)=>{
        const newQuery = {...filterQuery};
        // console.log(tags);
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
        // console.log(tags);
        newQuery.tags = newQuery.tags.filter(tag=>{
            return !tags.map(tag=>tag.id).includes(tag.id);
        });
        setFilterQuery(newQuery);
        return;
    }

    const addTokensToFilterQuery=(tokens)=>{
        const newQuery = {...filterQuery};
        // console.log(tokens);

        tokens.forEach(token=>{
            var i = newQuery.tokens.findIndex(x => x.id === token.id);
            if(i<=-1){
                newQuery.tokens.push(token);
            }
        });

        setFilterQuery(newQuery);
        return;
    }    

    const removeTokensFromFilterQuery=(tokens)=>{
        const newQuery = {...filterQuery};
        // console.log(tokens);
        newQuery.tokens = newQuery.tokens.filter(token=>{
            return !tokens.map(token=>token.id).includes(token.id);
        });
        setFilterQuery(newQuery);
        return;
    }    

    useEffect(()=>{
        const filterProjectCells = (query) => {
            const tagsIds = query.tags.map(tag=>tag.id);
            const tokens = query.tokens;
            const operator = query.operator;
            
            if(tagsIds.length===0 && tokens.length===0){
                setFilteredProjectCells(projectCells);
                setIsFiltered(false);
                return;
            }
            let cells = [];
            // let cellsAfterTagsFilter = [];
            // let cellsAfterTokensFilter = [];
            if (operator==='or'){
                projectCells.forEach(cell=>{
                    if(tagsIds.length>0){
                        if(cell.tags
                            .map(tag => tag.id)
                            .some(tag => tagsIds.includes(tag))
                        ){
                            cells.push(cell);
                            return;
                        }
                    }
                    if(tokens.length>0){
                        if(tokens.some(token=>
                                cell.content.toLowerCase().includes(token.id.toLowerCase()))
                        ){
                            cells.push(cell);
                            return;
                        }
                    }
                })
                // // FilterTags:
                // if(tagsIds.length>0){
                //     cellsAfterTagsFilter = cells.filter(
                //         cell=>cell.tags
                //             .map(tag => tag.id)
                //             .some(tag => tagsIds.includes(tag))
                //     );
                // }
                // // FilterContent:                
                // if(tokens.length>0){
                //     cellsAfterTokensFilter = cells.filter(
                //         cell=>tokens.some(token=>
                //             cell.content.toLowerCase().includes(token.id.toLowerCase())
                //             )
                //     );
                // }

                // cells = [...cellsAfterTagsFilter, ...cellsAfterTokensFilter];
                //filter the cells to keep only unique items
                //
                //
                //
                
            } else{
                if (operator==='and'){
                    cells = [...projectCells];
                    // FilterTags:
                    if(tagsIds.length>0){
                        cells = cells.filter(
                            cell=>cell.tags
                                .map(tag => tag.id)
                                .some(tag => tagsIds.includes(tag))
                        );
                    }
                    // FilterContent:
                    if(tokens.length>0){
                        cells = cells.filter(
                            cell=>tokens.every(token=>
                                cell.content.toLowerCase().includes(token.id.toLowerCase())
                            )
                        );
                    }
                }
            }

            setFilteredProjectCells(cells);
            setIsFiltered(!cells||(projectCells.length!==cells.length));
            return;
        }
        
        // console.log("filterQuery");
        // console.log(filterQuery);
        filterProjectCells(filterQuery);
    }, [filterQuery, projectCells]);

    return (
        <FilterContext.Provider value={{
            addTagsToFilterQuery,
            removeTagsFromFilterQuery,
            addTokensToFilterQuery,
            removeTokensFromFilterQuery,
            clearFilterQuery,

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
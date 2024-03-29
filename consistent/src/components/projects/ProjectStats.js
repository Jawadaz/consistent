import { useContext } from 'react'
import FilterContext from '../context/FilterContext';
import ProjectContext from '../context/ProjectContext';
import Box from "@mui/material/Box";

function ProjectStats( ){
    //calculate average number of tags/cell
    const { projectTags, projectCells } = useContext(ProjectContext);
    const { isFiltered, filteredProjectCells } = useContext(FilterContext);

    
    const averageTagsPerCell = (cells) => {
        let result = cells.map(cell=>cell.tags.length).reduce((acc, cur) => {
            return acc + cur;
        }, 0)/cells.length;
        result = result.toFixed(1).replace("/[.,]0$", '');
        result = isNaN(result)?0:result;
        return result
    }

    const countOfCellsWithoutTags = (cells) => {
        let result = cells.filter((cell) => cell.tags.length === 0 ).length;
        result=isNaN(result)?0:result;
        return result
    }

    const countUniqueTags = (cells)=> {
        return Array.from(new Set(cells.map(cell=>cell.tags).flat().map(tag=>tag.id))).length;
    }

    // const countOfOrphanCells = (cells) => {
    //     let result = cells.filter(cell => 
    //         cell.tags.every(tag => 
    //             cells.filter(x=>x.id !== cell.id)
    //                  .filter(x=>x.tags.find(x=>x===tag)
    //             ).length === 0
    //         )
    //     ).length;
    //     result = isNaN(result)?0:result;
    //     return result
    // }

    let projectCellsAverageTagsPerCell = averageTagsPerCell(projectCells);
    let filteredProjectCellsAverageTagsPerCell = averageTagsPerCell(filteredProjectCells);

    let projectCellsCountOfCellsWithoutTags = countOfCellsWithoutTags(projectCells);
    let filteredProjectCellsCountOfCellsWithoutTags = countOfCellsWithoutTags(filteredProjectCells);

    

    // let countOfOrphanProjectCells = countOfOrphanCells(projectCells);
    // let countOfOrphanFilteredProjectCells = countOfOrphanCells(filteredProjectCells);

    return (<Box>
        {isFiltered
            ?
            <>
            <p>Paragraphs count: {filteredProjectCells.length}/{projectCells.length}</p>
            <p>Paragraphs without any tags: {filteredProjectCellsCountOfCellsWithoutTags}/{projectCellsCountOfCellsWithoutTags}</p>
            <p>Average Tags per Paragraph: {filteredProjectCellsAverageTagsPerCell}/{projectCellsAverageTagsPerCell}</p>
            <p>Tags Count: {countUniqueTags(filteredProjectCells)}/{projectTags.length}</p>
            </>
            :
            <>
            <p>Paragraphs count: {projectCells.length}</p>
            <p>Paragraphs without any tags: {projectCellsCountOfCellsWithoutTags}</p>
            <p>Average Tags per Paragraph: {projectCellsAverageTagsPerCell}</p>
            <p>Tags Count: {projectTags.length}</p>
            </>
        }
    </Box>); 
}






export default ProjectStats;
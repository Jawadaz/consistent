import { useContext } from 'react'
import FilterContext from '../context/FilterContext';
import ProjectContext from '../context/ProjectContext';

function ProjectStats( ){
    //calculate average number of tags/cell
    //
    const { projectCells } = useContext(ProjectContext);
    const { isFiltered, filteredProjectCells } = useContext(FilterContext);
    //

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

    return (<div className='classes.stats'>
        {isFiltered
            ?
            <>
            <p>Cells count: {filteredProjectCells.length}/{projectCells.length}</p>
            <p>Cells without any tags: {filteredProjectCellsCountOfCellsWithoutTags}/{projectCellsCountOfCellsWithoutTags}</p>
            <p>Average Tags per Cell: {filteredProjectCellsAverageTagsPerCell}/{projectCellsAverageTagsPerCell}</p>
            </>
            :
            <>
            <p>Cells count: {projectCells.length}</p>
            <p>Cells without any tags: {projectCellsCountOfCellsWithoutTags}</p>
            <p>Average Tags per Cell: {projectCellsAverageTagsPerCell}</p>
            </>
        }
    </div>); 
}






export default ProjectStats;
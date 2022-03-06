import { useContext } from 'react'
import ProjectContext from '../context/ProjectContext';

function ProjectStats( ){
    //calculate average number of tags/cell
    //
    const { projectCells } = useContext(ProjectContext)
    //
    let averageTagsPerCell = projectCells.map(cell=>cell.tags.length).reduce((acc, cur) => {
        return acc + cur;
    }, 0)/projectCells.length;
    averageTagsPerCell = averageTagsPerCell.toFixed(1).replace("/[.,]0$", '');

    let countOfCellsWithoutTags = projectCells.filter((cell) => cell.tags.length === 0 ).length;

    let countOfOrphanCells = projectCells.filter(cell => 
        cell.tags.every(tag => 
            projectCells.filter(x=>x.id !== cell.id)
                 .filter(x=>x.tags.find(x=>x===tag)
            ).length === 0
        )
    ).length

    return (<div className='classes.stats'>
        <h4>Cells count: {projectCells.length}</h4>
        <h4>Cells without any tags: {isNaN(countOfCellsWithoutTags)?0:countOfCellsWithoutTags}</h4>
        <h4>Average Tags per Cell: {isNaN(averageTagsPerCell)?0:averageTagsPerCell}</h4>
        <h4>Orphan Cells: {isNaN(countOfOrphanCells)?0:countOfOrphanCells}</h4>
    </div>); 
}

export default ProjectStats;
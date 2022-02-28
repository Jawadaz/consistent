import classes from './ProjectStats.module.css';

function ProjectStats( {cells} ){

    //calculate average number of tags/cell
    //
    let averageTagsPerCell = cells.map(cell=>cell.tags.length).reduce((acc, cur) => {
        return acc + cur;
    }, 0)/cells.length;
    averageTagsPerCell = averageTagsPerCell.toFixed(1).replace("/[.,]0$", '');

    let countOfCellsWithoutTags = cells.filter((cell) => cell.tags.length === 0 ).length;

    let countOfOrphanCells = cells.filter(cell => 
        cell.tags.every(tag => 
            cells.filter(x=>x.id !== cell.id)
                 .filter(x=>x.tags.find(x=>x===tag)
            ).length === 0
        )
    ).length

    return (<div className='classes.stats'>
        <h4>Cells count: {cells.length}</h4>
        <h4>Cells without any tags: {isNaN(countOfCellsWithoutTags)?0:countOfCellsWithoutTags}</h4>
        <h4>Average Tags per Cell: {isNaN(averageTagsPerCell)?0:averageTagsPerCell}</h4>
        <h4>Orphan Cells: {isNaN(countOfOrphanCells)?0:countOfOrphanCells}</h4>
    </div>); 
}

export default ProjectStats;
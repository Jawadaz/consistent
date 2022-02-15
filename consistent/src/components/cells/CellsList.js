// Should the list of cells be stored somewhere and created cell after cell?
import classes from './CellsList.module.css';
import Cell from './Cell';

function CellsList( {cells} ){
    if (!cells || cells.length===0){
        return (
            <div className='CellsList'>
                <Cell />
            </div>
        );
    }
    return (
        <div className='CellsList'>
            <ul className={classes.list}    >
                {cells.map(cell => <Cell 
                    key={cell.id} 
                    id={cell.id} 
                    content={cell.content} 
                    tags={cell.tags}/>
                )}
            </ul>
        </div>
    );
}

export default CellsList;
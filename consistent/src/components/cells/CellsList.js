import PropTypes from 'prop-types';
import classes from './CellsList.module.css';
import Cell from './Cell';

function CellsList( {cells, deleteCell, updateCellContent} ){
    if (!cells || cells.length===0){
        // show an empty cell
        // this should not happen because a default value is defined 
        return (
            <div className='CellsList'>
                <Cell />
            </div>
        );
    }
    return (
        <div className='CellsList'>
            <ul className={classes.list}>
                {cells.map(item => <Cell 
                    key={item.id}
                    cell={item}
                    deleteCell={deleteCell}
                    updateCellContent={updateCellContent}
                    />
                )}
            </ul>
        </div>
    );
}

CellsList.propTypes = {
    cells: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(
                PropTypes.string)
        })
    ),
}


export default CellsList;
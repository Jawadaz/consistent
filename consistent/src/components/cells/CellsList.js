import PropTypes from 'prop-types';
import Cell from './Cell';
import {motion, AnimatePresence} from "framer-motion"

function CellsList( {cells, deleteCell, updateCellContent} ){
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    return (            
        <div className={'CellsList'}>            
            <ul className={'list'}>
            <AnimatePresence>               
                {cells.map(item => 
                <motion.div
                    key={item.id}
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    exit="hidden"
                > 
                    <Cell 
                        key={item.id}
                        cell={item}
                        deleteCell={deleteCell}
                        updateCellContent={updateCellContent}
                        />
                </motion.div>
                )}
            </AnimatePresence>                                                                  
            </ul>            
        </div>
    );
}

CellsList.propTypes = {
    cells: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(
                PropTypes.string)
        })
    ),
}


export default CellsList;
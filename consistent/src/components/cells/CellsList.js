// import PropTypes from 'prop-types';
import Cell from './Cell';
import { motion, AnimatePresence } from "framer-motion"
import { useContext } from 'react'
import ProjectContext from '../context/ProjectContext';


function CellsList( props ){

    const { projectCells } = useContext(ProjectContext);
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (            
        <div className={'CellsList'}>
            <ul className={'list'}>
            <AnimatePresence>               
                {projectCells.map(item => 
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
                        />
                </motion.div>
                )}
            </AnimatePresence>                                                                  
            </ul>            
        </div>
    );
}

export default CellsList;
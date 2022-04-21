
import Grid from "@mui/material/Grid"

// import PropTypes from 'prop-types';
import Cell from './Cell';
import { motion, AnimatePresence } from "framer-motion"
import { useContext } from 'react'
// import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import Stack from "@mui/material/Stack";

function CellsList( props ){

    const { filteredProjectCells } = useContext(FilterContext);
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (     
        <>
        {/* <div className={'CellsList'}> */}
            <Stack spacing={2}>
            <AnimatePresence>               
                {filteredProjectCells.map(item => 
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
            </Stack>
        {/* </div> */}
        </>
    );
}

export default CellsList;
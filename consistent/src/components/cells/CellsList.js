import Cell from './Cell';
import { useContext } from 'react'
import FilterContext from '../context/FilterContext';
import Stack from "@mui/material/Stack";

function CellsList( props ){

    const { filteredProjectCells } = useContext(FilterContext);

    return (     
        <>
            <Stack spacing={2}>
                {filteredProjectCells.map( (item, index) => 
                <Cell 
                    key={item.id}
                    cell={item}
                    index={index}
                    />
                )}
            </Stack>
        </>
    );
}

export default CellsList;
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useContext, useState, useEffect } from 'react';

import ProjectContext from '../context/ProjectContext';
import CellTagsMU from './CellTagsMU';
import CellControlsRight from './CellControlsRight';
import CellControlsLeft from './CellControlsLeft';

import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";

import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";

const CustomizedTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    padding: 6px 6px 16px 6px;
    background-color: white;
  }
`;

function Cell( {cell, index} ){
    const { activeCellId, activateCell, updateCellContent, 
            updateCellTags, isProjectLocked, isProjectLTR } = useContext(ProjectContext);

    const [ cellContent, setCellContent ] = useState(cell.content);
    const [ isActive, setIsActive ] = useState(false);
    const [ isCellContentFocused, setIsCellContentFocused] = useState(false)
    const [ cellTags, setCellTags ] = useState(cell.tags);

    const handleCellClick=(e)=>{
        if(isProjectLocked){
            return;
        }
        activateCell(cell.id);
    }

    const handelUpdateCellContent=(e) => {
        console.log('handelUpdateCellContent');
        const content = e.target.value; 
        setCellContent(content);
    }

    const handleUpdateCell=(e) =>{
        console.log('handleUpdateCell');
        const content = e.target.value; 
        if(content===cell.content){
            return;
        }
        //TODO: Consider tags as in issue #17        
        // console.log(cellTags);
        updateCellContent(cell.id, content);
    }

    useEffect(()=>{
        // console.log('Cell.useEffect()');
        setIsActive(activeCellId===cell.id ? true: false);
      }, [activeCellId, cell.id]
    );

    useEffect(()=>{
        //  console.log('Cell.useEffect() cell.content');
        setCellContent(cell.content);
    }, [cell.content]);

    useEffect(()=>{
        // console.log('Cell.useEffect() cell.content');
        setCellTags(cell.tags);
    }, [cell.tags]);

    return (
        <div className={"Cell"} onClick={handleCellClick}>
            <Fade 
                in={true}
                timeout={500}
            >  
            <Stack 
                direction="row" 
                spacing={0}
                alignItems="stretch"
            >
                <Box>
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        {index+1}
                    </Typography>
                </Box>
                <Box 
                    sx={{ 
                        // width: '4%', 
                        maxWidth: '36px',
                        minWidth: '36px'
                    }}
                >
                    {isActive && !isProjectLocked && <CellControlsLeft cell={cell}/>}
                </Box>
                {/* WE NEED A COULUMN HERE */}
                <Box 
                    sx={ isActive && !isProjectLocked?
                        { 
                            borderWidth:'3px',
                            borderStyle: 'solid',
                            borderRadius: '6px'
                        }
                        :
                        {
                            // width: '92%',
                            borderWidth:'1px',
                            borderStyle: 'solid',
                            borderRadius: '6px'
                        }
                    } 
                    autocomplete="off"
                    borderColor="primary.main"
                    width="92%"
                    marginBottom="3px"
                >
                    <Box>
                        <CustomizedTextField
                            onChange={handelUpdateCellContent}
                            onFocus={() => setIsCellContentFocused(true)}
                            onBlur={(e) => {
                                setIsCellContentFocused(true);
                                handleUpdateCell(e);
                            }}
                            dir={isProjectLTR?"ltr":"rtl"}
                            multiline
                            placeholder="Add paragraph text here..."
                            value={cellContent}
                            disabled={isProjectLocked}
                            variant="outlined"
                            type="text"
                            margin="dense"
                            fullWidth
                            sx = {{ paddingLeft: "6px", paddingRight: "6px" }}
                        />
                        <Box 
                        sx={{ 
                            paddingRight: "8px",
                            paddingLeft: '8px',
                            marginTop: '4px',
                            marginBottom: '8px',
                        }} 
                        >
                            <CellTagsMU cell={cell} isActive={isActive && !isProjectLocked} updateCellTags={updateCellTags} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ 
                        maxWidth: '36px',
                        minWidth: '36px',
                    }}
                 >
                    {isActive && !isProjectLocked && <CellControlsRight cell={cell} />}
                </Box>
            </Stack>
            </Fade>
        </div>
    );
}

export default Cell
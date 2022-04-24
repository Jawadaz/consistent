import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import  ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { useContext, useEffect, useState} from 'react';
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
// import InputIcon from "@mui/icons-material/Input";
import ContentPasteGoOutlinedIcon from '@mui/icons-material/ContentPasteGoOutlined';
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard'

function ProjectToolbar( props ){

    const { projectFilename, activeCellId, projectCells, 
        addEmptyCell, moveActiveCellDown, moveActiveCellUp, 
        toggleLockProject, isProjectLocked, undo, redo,
        isUndoDisabled, isRedoDisabled, saveAsClick,
        getCellsContentAsText, createCellsFromText } = useContext(ProjectContext)
    const { isFiltered, filteredProjectCells } = useContext(FilterContext);


    const [ isMoveCellUpButtonDisabled, setIsMoveCellUpButtonDisabled ] = useState(false);
    const [ isMoveCellDownButtonDisabled, setIsMoveCellDownButtonDisabled ] = useState(false);

    const [ isUndoButtonDisabled, setIsUndoButtonDisabled] = useState(true);
    const [ isRedoButtonDisabled, setIsRedoButtonDisabled] = useState(true);

    const btnSaveClickHandler=(e)=>{
        // console.log("btnSaveClickHandler")
        if(projectFilename===null){
            return btnSaveAsClickHandler(e);
        }
        // the user has already set the filename
        // saveProject();
    }

    const btnSaveAsClickHandler=(e)=>{
        // console.log("btnSaveAsClickHandler");
        // console.log(projectCells);
        saveAsClick();
        
        // setProjectFilename("helloworld.txt");
        // saveProject();
    }    

    const btnLockClickHandler=(e)=>{
        // console.log("btnLockClickHandler");
        toggleLockProject();
    }

    const btnUndoClickHandler=(e)=>{
        // console.log("btnUndoClickHandler");
        undo();
    }

    const btnRedoClickHandler=(e)=>{
        // console.log("btnRedoClickHandler");
        redo();
    }

    // const btnExportClickHandler=(e)=>{
    //     console.log('btnExportClickHandler():');
    //     return;
    // }

    const btnImportClickHandler=(e)=>{
        // console.log('btnImportClickHandler():');
        navigator.clipboard.readText().then(clipboardText=>{
            createCellsFromText(clipboardText);
        });
        return;
    }
    
    useEffect(()=>{
        if(isProjectLocked){
            setIsMoveCellUpButtonDisabled(true);
            setIsMoveCellDownButtonDisabled(true);
            setIsUndoButtonDisabled(true);
            setIsRedoButtonDisabled(true);
            return;
        }

        if(projectCells.length===1){
            setIsMoveCellUpButtonDisabled(true);
            setIsMoveCellDownButtonDisabled(true);
        }
        if(isFiltered){
            setIsMoveCellUpButtonDisabled(true);
            setIsMoveCellDownButtonDisabled(true);
        }

        const firstCellId = projectCells[0].id;
        const lastCellId = projectCells[projectCells.length-1].id;
        if(activeCellId===firstCellId){
            setIsMoveCellUpButtonDisabled(true);
        }else{
            setIsMoveCellUpButtonDisabled(false);
        }
        if(activeCellId===lastCellId){
            setIsMoveCellDownButtonDisabled(true);
        }else{
            setIsMoveCellDownButtonDisabled(false);
        }

        setIsUndoButtonDisabled(isUndoDisabled);
        setIsRedoButtonDisabled(isRedoDisabled);

    }, [ projectCells, activeCellId, isFiltered, isProjectLocked, isUndoDisabled, isRedoDisabled ])


    return <>
            {/* <Box sx={{ flexGrow: 1 }} > */}
            <Paper elevation={0}>
                <Toolbar 
                    disableGutters
                    variant="dense"
                >
                    <Box>
                    <IconButton
                        // size="large"
                        // edge="start"
                        color="primary"
                        size="small"
                        aria-label="Add Paragraph"
                        // sx={{ mr: 2, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex'  }} }
                        onClick={(e)=>addEmptyCell()} 
                        disabled={isFiltered||isProjectLocked}
                    >
                        <AddOutlinedIcon />
                    </IconButton>
                    <IconButton
                        // size="large"
                        // edge="start"
                        size= "small"
                        color="primary" 
                        aria-label="Move Paragraph Down"
                        // sx={{ mr: 2, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex'  }} }
                        onClick={(e)=>moveActiveCellDown()} 
                        disabled={isMoveCellDownButtonDisabled}
                    >
                        <ArrowDownwardOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        // size="large"
                        // edge="start"
                        size="small"
                        color="primary"
                        aria-label="Move Paragraph Up"
                        // sx={{ mr: 2, display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex'  }} }
                        onClick={(e)=>moveActiveCellUp()} 
                        disabled={isMoveCellUpButtonDisabled}
                    >
                        <ArrowUpwardOutlinedIcon fontSize="small" />
                    </IconButton>
                    </Box>
                    <Box>
                    <IconButton
                        size="small"
                        color="primary"
                        aria-label="Undo"
                        disabled={isUndoButtonDisabled}
                        onClick={(e)=>btnUndoClickHandler()}
                    >
                        <UndoOutlinedIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="primary"
                        aria-label="Redo"
                        disabled={isRedoButtonDisabled}
                        onClick={(e)=>btnRedoClickHandler()}
                    >
                        <RedoOutlinedIcon />
                    </IconButton>
                    </Box>

                    <Box>
                    <IconButton
                        size="small"
                        color="primary"
                        aria-label="Import Paragraphs"
                        onClick={(e)=>btnImportClickHandler(e)}
                        disabled={isProjectLocked}
                    >
                        <ContentPasteGoOutlinedIcon />
                    </IconButton>
                    <CopyToClipboard text={ getCellsContentAsText( isFiltered? filteredProjectCells: projectCells ) }
                        onCopy={() => {console.log('copied');} }>
                        <IconButton
                            size="small"
                            color="primary"
                            aria-label="Export in 'newline' separated .txt format"
                            onClick={(e) => {} }
                            disabled={projectCells.length===1&&projectCells[0].content===""?true:false}
                        >
                            <CopyAllOutlinedIcon />
                        </IconButton>
                    </CopyToClipboard>    
                    </Box>
                    <Box>
                    <IconButton
                        size="small"
                        color="primary"
                        aria-label="Save Project"
                        onClick={(e)=>btnSaveClickHandler(e)}
                        disabled={isProjectLocked}
                    >
                        <SaveIcon />
                    </IconButton>   
                    <IconButton
                        size="small"
                        color="primary"
                        aria-label="Save Project As..."
                        onClick={(e)=>btnSaveAsClickHandler(e)}
                        disabled={isProjectLocked}
                    >
                        <SaveAsIcon />
                    </IconButton>      
                    </Box>
                    <Box>
                    <IconButton 
                        size="small"
                        color="primary"
                        aria-label="Lock/Unlock Toggle" 
                        onClick={(e)=>btnLockClickHandler()}
                        disabled={false}
                    >
                        {isProjectLocked ?
                            <LockOutlinedIcon />
                        :
                            <LockOpenOutlinedIcon />                    
                        }                 
                    </IconButton>
                    </Box>
                </Toolbar>
            </Paper>                
        {/* </Box> */}
    </>;
}        

export default ProjectToolbar;
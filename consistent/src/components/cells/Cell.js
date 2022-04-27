import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useContext, useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import ProjectContext from '../context/ProjectContext';
import CellTags from './CellTags';
import CellControlsRight from './CellControlsRight';
import CellControlsLeft from './CellControlsLeft';

import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";

import { styled } from '@mui/material/styles';

// import InputUnstyled from '@mui/base/InputUnstyled';


const CustomizedTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    padding: 6px 6px 16px 6px;
    background-color: white;
  }
`;

function Cell( {cell} ){
    const { activeCellId, activateCell, updateCellContent, 
            updateCellTags, isProjectLocked, isProjectLTR } = useContext(ProjectContext);

    // const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ cellContent, setCellContent ] = useState(cell.content);
    const [ isActive, setIsActive ] = useState(false);
    const [ isCellContentFocused, setIsCellContentFocused] = useState(false)
    const [ cellTags, setCellTags ] = useState(cell.tags);

    // const handelDeleteCellButtonClick = () => {
    //     console.log('handelDelete()');
    //     setModalIsOpen(true);
    // };

    // const handelCloseModal = () => {
    //     console.log('handelCloseModal()');
    //     setModalIsOpen(false);
    // }

    // const handelConfirm = () => {
    //     console.log('handelDeleteCell()');
    //     handelCloseModal();
    //     deleteCell(cell.id); 
    // };
    const handleCellClick=(event)=>{
        if(isProjectLocked){
            return;
        }
        activateCell(cell.id);
    }

    const handelUpdateCellContent=(event) => {
        console.log('handelUpdateCellContent');
        const content = event.target.value; 
        setCellContent(content);
    }

    const handleUpdateCell=(event) =>{
        console.log('handleUpdateCell');
        const content = event.target.value; 
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
        console.log('Cell.useEffect() cell.content');
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
                    <div>
                        {/* <CopyToClipboard text={"asdadsads"}
                            onCopy={() => {console.log('hi');} }> */}
                        {/* </CopyToClipboard>                 */}

                        {/* <div className={'CellContent'}> */}
                            {/* https://www.npmjs.com/package/react-textarea-autosize */}
                            {/* <TextareaAutosize        
                                onChange={handelUpdateCellContent}
                                onFocus={() => setIsCellContentFocused(true)}
                                onBlur={(e) => {setIsCellContentFocused(false);handleUpdateCell(e)}}
                                type="text" 
                                placeholdre=""
                                value={cellContent}
                                disabled={isProjectLocked}
                            />
                        </div>*/}
                        <CustomizedTextField
                        // <TextField
                        // <InputUnstyled
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
                            // notched={true}
                            // label="Paragraph..."
                            // classes={
                            //  
                            // }
                        />
                        <Box 
                        sx={{ 
                            paddingLeft: "4px",
                            paddingRight: "4px"
                        }} 
                        >
                            <CellTags cell={cell} isActive={isActive} updateCellTags={updateCellTags}/>
                        </Box>
                    </div>
                </Box>
                <Box sx={{ 
                        maxWidth: '36px',
                        minWidth: '36px'
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
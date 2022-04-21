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
// TODO: implement cool modal yes/no at some point
// import ConfirmModal from '../ui/ConfirmModal';
// import Backdrop from '../ui/Backdrop';


function Cell( {cell} ){
    const { activeCellId, activateCell, updateCellContent, updateCellTags, isProjectLocked } = useContext(ProjectContext);

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
        const content = event.target.value; 
        setCellContent(content);
    }

    const handleUpdateCell=(event) =>{
        const content = event.target.value; 
        if(content===cell.content){
            return;
        }
        //TODO: Consider tags as in issue #17        
        console.log(cellTags);
        updateCellContent(cell.id, content);
    }

    useEffect(()=>{
        console.log('Cell.useEffect()');
        setIsActive(activeCellId===cell.id ? true: false);
      }, [activeCellId, cell.id]
    );

    useEffect(()=>{
        console.log('Cell.useEffect() cell.content');
        setCellContent(cell.content);
    }, [cell.content]);

    useEffect(()=>{
        console.log('Cell.useEffect() cell.content');
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
                {/* WE NEED A COULUMN HERE */}
                {/* {isActive && <CellControlsLeft cell={cell}/>} */}
                <Box 
                    sx={{ 
                        // width: '4%', 
                        maxWidth: '36px',
                        minWidth: '36px'
                    }}
                >
                    {isActive && <CellControlsLeft cell={cell}/>}
                </Box>
                {/* WE NEED A COULUMN HERE */}
                <Box 
                    sx={{ 
                        width: '92%',
                    }} 
                    className={'CellInner'}
                >
                    <div>
                        {/* <CopyToClipboard text={"asdadsads"}
                            onCopy={() => {console.log('hi');} }> */}
                        {/* </CopyToClipboard>                 */}
                        <div className={'CellContent'}>
                            {/* https://www.npmjs.com/package/react-textarea-autosize */}
                            <TextareaAutosize        
                                onChange={handelUpdateCellContent}
                                onFocus={() => setIsCellContentFocused(true)}
                                onBlur={(e) => {setIsCellContentFocused(false);handleUpdateCell(e)}}
                                type="text" 
                                placeholdre=""
                                value={cellContent}
                                disabled={isProjectLocked}
                            />
                        </div>
                        <CellTags cell={cell} isActive={isActive} updateCellTags={updateCellTags}/>
                    </div>
                </Box>
                <Box sx={{ 
                        maxWidth: '36px',
                        minWidth: '36px'
                    }}
                 >
                    {isActive && <CellControlsRight cell={cell} />}
                </Box>
            </Stack>
            </Fade>
        </div>
    );
}

export default Cell
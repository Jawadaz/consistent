import { useState, useContext } from "react";
import ViewportContext from "../context/ViewportContext";

//MaterialUI Components
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
// import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { styled, alpha } from '@mui/material/styles';

//MaterialUI Icons
import SkipNextIcon from '@mui/icons-material/SkipNext';


const StyledInput = styled(Input)(({theme})=>({
    '& .MuiInputBase-input': {
        padding: '0px'
    }
}));

// const Goto = styled('div')(({theme})=>({
//     width: '100%',
//     display: 'flex',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     // transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '4ch',
//       '&:focus': {
//         width: '4ch',
//       },
//     },
//   },
// }));

function GotoCellBarItem( { gotoCell } ){
    
    // 

    const [ cellToGoTo, setCellToGoTo ] = useState("");

    const handleSubmit=()=>{
        gotoCell(parseInt(cellToGoTo)-1);
        setCellToGoTo("");
    }

    const btnGotoCellClickHandler=(e)=>{
        handleSubmit();
    }

    const inputChangeHandler = (e) => {
        setCellToGoTo(e.target.value);
    };

    const inputKeyDownHandler=(e)=>{
        if(e.keyCode == 13){
            handleSubmit();
        }
    }
    return (<>
        <FormControl 
            variant="standard" 
            sx={{ 
                width: '8ch',
                // ml: 1,
            }}
        >
            <StyledInput
                endAdornment={
                    <InputAdornment 
                        position="end"
                        sx={{
                            marginLeft: '0px'
                        }}
                    >
                        <IconButton
                            // size="small"
                            aria-label="Go"
                            edge="end"
                            color='primary'
                            onClick={btnGotoCellClickHandler}
                            sx={{
                                paddingLeft: '0px'
                            }}
                        >
                            <SkipNextIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label="Goto paragraph #"
                value={cellToGoTo}
                // aria-describedby="goto-paragraph-helper-text"
                inputProps={{
                'aria-label': 'goto paragraph #',
                }}
                onChange={inputChangeHandler}
                onKeyDown={inputKeyDownHandler}
                sx={{
                    paddingBottom: '0px'
                }}
            />
        {/* <FormHelperText id="goto-paragraph-helper-text">Goto paragraph #</FormHelperText>           */}
        </FormControl>        
    </>);
};

export default GotoCellBarItem;
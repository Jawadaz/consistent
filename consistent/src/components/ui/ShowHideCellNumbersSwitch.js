import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState, useContext } from "react";
import ViewportContext from "../context/ViewportContext";

function ShowHideCellNumbersSwitch(props){
    const { showCellNumbers, setShowCellNumbers } = useContext(ViewportContext);
    const [ showCellNumbersSwitch, setShowCellNumbersSwitch ] = useState(showCellNumbers);    
    
    const handleShowCellNumbersSwitchChange = (e) => {
       setShowCellNumbersSwitch(e.target.checked);
       setShowCellNumbers(e.target.checked);
    };

    return (<>
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch 
                        checked={showCellNumbersSwitch}
                        onChange={(e)=>{e.stopPropagation();handleShowCellNumbersSwitchChange(e);}}
                        onClick={(e)=>{e.stopPropagation();}}
                    />
                } 
                label="Show Paragraph Numbers"
            />
        </FormGroup>
    </>);
}

export default ShowHideCellNumbersSwitch;
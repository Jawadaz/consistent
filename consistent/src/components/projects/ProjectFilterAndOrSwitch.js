import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState, useContext } from "react";
import FilterContext from "../context/FilterContext.js";
import { FaEnvelope } from 'react-icons/fa';

function ProjectFilterAndOrSwitch(props){
    const { filterQuery, setOperatorInFilterQuery } = useContext(FilterContext);
    const [ filterOrSwitch, setFilterOrSwitch ] = useState(filterQuery.operator==='or'?true:false);    
    console.log(filterQuery.operator);
    const handleFilterAndOrSwitchChange = (e) => {
       setFilterOrSwitch(e.target.checked);
       setOperatorInFilterQuery(e.target.checked?'or':'and');
    };

    return (<>
        <FormGroup>
            <FormControlLabel 
                control={
                    <Switch 
                        checked={filterOrSwitch}
                        onChange={(e)=>{e.stopPropagation();handleFilterAndOrSwitchChange(e);}}
                        onClick={(e)=>{e.stopPropagation();}}
                    />
                } 
                label="Match any of the filters"
            />
        </FormGroup>
    </>);
}

export default ProjectFilterAndOrSwitch;
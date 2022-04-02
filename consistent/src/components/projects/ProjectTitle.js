import PropTypes from "prop-types";
import Editable from "react-editable-title";
import { useContext, useState } from "react";
import ProjectContext from '../context/ProjectContext';
function ProjectTitle() {
 
  const {setProjectTitle,projectData} = useContext(ProjectContext)
  const [text, setText] = useState(projectData.title);

  const handleTextUpdate = (current) => {
    setText(current);
    setProjectTitle(current) 
  };

  return (
<h2>
    <Editable
      text= {text}
      editButton
      editControls
      placeholder="Type your title here"
      cb={handleTextUpdate}
    />
</h2>    
  );
}

export default ProjectTitle;

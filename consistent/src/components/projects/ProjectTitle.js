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
{text}
</h2>    
  );
}


export default ProjectTitle;


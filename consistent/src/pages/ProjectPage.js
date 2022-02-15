import ProjectTitle from "../components/projects/ProjectTitle.js";
import CellsList from "../components/cells/CellsList.js";
import AddCellButton from "../components/ui/AddCellButton.js";

function ProjectPage(){
    return (
        <div>
            <ProjectTitle />
            <CellsList />
            <AddCellButton />
        </div>
    );
}
    
export default ProjectPage;
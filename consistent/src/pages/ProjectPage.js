import ProjectTitle from "../components/projects/ProjectTitle.js";
import CellsList from "../components/cells/CellsList.js";
import AddCellButton from "../components/ui/AddCellButton.js";

function ProjectPage({data}){
    var cells = [];
    if (data){
        cells = data.cells;
    }
    console.log(cells)
    return (
        <div>
            <ProjectTitle />
            <CellsList cells={cells}/>
            <AddCellButton />
        </div>
    );
}
    
export default ProjectPage;
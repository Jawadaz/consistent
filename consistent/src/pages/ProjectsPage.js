import ProjectsList from "../components/projects/ProjcetsList";
import projectData from "../fixtures/dummy_projects.json"
projectData = [];
function ProjectPage() {
    return (
        <section>
            <h1>
                Your Projects
            </h1>
            <ProjectsList projects={projectData}/>
        </section>
    );
}

export default ProjectPage;
import ProjectsList from "../components/projects/ProjcetsList";
import projectsData from "../fixtures/dummy_projects.json"

projectsData = [];

function ProjectPage() {
    return (
        <section>
            <h1>
                Your Projects
            </h1>
            <ProjectsList projects={projectsData}/>
        </section>
    );
}

export default ProjectPage;
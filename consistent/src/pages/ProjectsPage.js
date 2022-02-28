import ProjectsList from "../components/projects/ProjectsList";

function ProjectPage({projects}) {

    return (
        <section>
            <h1>
                Your Projects
            </h1>
            <ProjectsList projects={projects}/>
        </section>
    );
}



export default ProjectPage;
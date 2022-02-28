import Tag from "../ui/Tag"

function ProjectTags( {tags, deleteTag} ){
    return (
        <div>
            <ul>
                {tags.map(item => <Tag 
                    tag={item}
                    deleteTag={deleteTag}
                />)}
            </ul>            
        </div>
    );
}

export default ProjectTags;
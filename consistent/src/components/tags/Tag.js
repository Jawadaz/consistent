

function Tag( {tag} ){
    return (
        // <div className={" "}>
            <span className={"ReactTags__tag"}>
                {tag.text}
            </span>
        // </div>
    );
}

export default Tag;
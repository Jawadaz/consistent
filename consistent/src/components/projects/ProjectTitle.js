import PropTypes from 'prop-types';

function ProjectTitle( {text} ){
    return (
        <h1>{text}</h1>
    );
}

ProjectTitle.defaultProps = {
    text: 'New Project',
}

ProjectTitle.propTypes = {
    text: PropTypes.string
}

export default ProjectTitle
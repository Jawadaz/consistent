import PropTypes from 'prop-types';

function ProjectTitle( {title} ){
    return (
        <h1>{title}</h1>
    );
}

ProjectTitle.defaultProps = {
    title: 'New Project',
}

ProjectTitle.propTypes = {
    title: PropTypes.string
}

export default ProjectTitle
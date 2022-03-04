import PropTypes from 'prop-types';

function Button({ children, version, type, tabIndex, isDisabled}){
    return (
        <button type={type} tabIndex={tabIndex} disabled={isDisabled} className={`btn btn-${version}`}>
            {children}
        </button>
    );
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false,
    tabIndex: 0
}
Button.propTypes = {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    tabIndex: PropTypes.number,
    isDisabled: PropTypes.bool
}

export default Button;
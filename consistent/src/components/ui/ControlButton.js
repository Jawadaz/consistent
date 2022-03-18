function ControlButton ( {disabled, onClick, className, children} ){
    return (
        <button onClick={onClick} className={className} disabled={disabled}>
            {children}
        </button>
    );
}

export default ControlButton;
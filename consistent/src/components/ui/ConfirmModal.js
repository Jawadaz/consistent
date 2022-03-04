function ConfirmModal (props){
    function btnCancelHandler(){
        props.onCancel();
    };
    
    function btnConfirmHandler(){
        props.onConfirm();
    };

    return (
        <div className="Modal">
            <p>Are you sure?</p>
            <button className={'btn btn-primary'} onClick={btnCancelHandler}>Cancel</button>
            <button className={'btn btn-primary'} onClick={btnConfirmHandler}>Confirm</button>
        </div>
    );
};

export default ConfirmModal
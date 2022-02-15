function AddCellButton(props){

    function btnAddCellHandler () {
        console.log("AddCellButton.btnAddCellHandler() clicked");
        // addCell();
        console.log(props);
    }

    return (
        <div>
            <button className="btn" onClick={btnAddCellHandler}>
                +
            </button>
        </div>
    );
}

export default AddCellButton
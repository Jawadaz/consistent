import classes from "./CellContent.module.css"

function CellContent() {
    return (
        <div className={classes.CellContent}>
            <form>
                <input className={classes.input} />
            </form>
        </div>
    )
}

export default CellContent
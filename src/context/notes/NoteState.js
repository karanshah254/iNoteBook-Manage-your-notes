
import noteContex from "./noteContext";

const NoteState = (props) => {
    return (
        <noteContex.Provider value={{}}>
            {props.children}
        </noteContex.Provider>
    );
}


export default NoteState;
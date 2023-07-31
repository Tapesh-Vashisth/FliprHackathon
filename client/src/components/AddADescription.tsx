import React, {useState} from 'react'


function AddADescription() {
    const [desc, setDesc] = useState("");

    const submitHandler = () => {

    }

    return (
        <form onSubmit={submitHandler} style = {{zIndex: 1006, position: "absolute", top: "50%", left: "50%", backgroundColor: "lightgreen", padding: "15px", transform: "translate(-50%, -50%)", width: "270px", borderRadius: "10px"}}>
            <div>
                <p style = {{fontSize: "16px", marginBottom: "10px"}}>Add A Small Description</p>
                <textarea style = {{padding: "5px", maxWidth: "100%", width: "100%"}} rows={5} value={desc} onChange = {(e: any) => setDesc(e.target.value)}>

                </textarea>
            </div>
            <div style = {{textAlign: "center", marginTop: "10px"}}>
                <button style = {{padding: "5px"}}>
                    Add to Favorites
                </button>
            </div>
        </form>
    )
}

export default AddADescription
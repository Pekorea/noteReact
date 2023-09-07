import { useState } from "react"
import Navbar from "../components/navbar"

const Notesform = () => {
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")

    const bodyText=(e)=>{setBody(e.target.value)}
    const titleText=(e)=>{setTitle(e.target.value)}
    const clearThem=()=>{setBody("")}
    return (
    <div >
        <Navbar/>
        <div className="noteform">
        <form className="notesform">
        <h1>Create Note</h1>
        <hr></hr>
        <input minLength={3} 
        value={title} 
        type="text" 
        placeholder="Title..."
        onChange={titleText}
        required
        className="titlebox"
        maxLength={15}
        />
        <input 
        minLength={2}
        value={body} 
        type="text" 
        maxLength={250}
        placeholder="Enter your text here"
        onChange={bodyText}
        className="textbox"
        required
        />
        <button type="submit">Save</button>
        <button type="reset" onClick={clearThem}>Clear</button>
        </form>
        </div>
        
    </div>
  )
}

export default Notesform
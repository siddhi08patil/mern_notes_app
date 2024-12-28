import React,{useState} from 'react'
import {createNote} from '../api'

const NoteForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newNote={title,content};
        const {data}=await createNote(newNote);
        onAdd(data);
        setTitle('');
        setContent('');
    }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <input className="form-control" type="text"
                placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        <textarea className="form-control" placeholder="conent" value={content} onChange={(e) => setContent(e.target.value)} required/>
        <button className="btn btn-primary" type="submit">Add note</button>
        
        <hr/>
        </div>
      </form>
    </div>
  )
}

export default NoteForm

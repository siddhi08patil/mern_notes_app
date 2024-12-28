import React ,{useState,useEffect} from 'react'
import { fetchNote,deleteNote,updateNote } from '../api'

const NoteList = () => {
    const [notes, setNotes] = useState([])
    const [editNote, seteditNote] = useState(null)
    const [newData, setnewData] = useState({ title: '', content: '' });

    useEffect(() => {
      const getNotes=async()=>{
        const {data} = await fetchNote();
        setNotes(data);
      };
      getNotes();
    }, [])
    
    const handleDelete = async (id) => {
        try {
            await deleteNote(id);  // This will make the DELETE request
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleEdit=(note)=>{
        seteditNote(note._id);
        setnewData({ title: note.title, content: note.content });
    }
    const handleUpdate = async () => {
        console.log('Updating note with:', editNote, newData); // Debug the note ID and data
        try {
            const updatedNote = await updateNote(editNote, newData);
            setNotes(notes.map(note => (note._id === editNote ? updatedNote.data : note)));
            seteditNote(null); // Exit editing mode
        } catch (error) {
            console.error('Update error:', error); // Log errors
        }
    };
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column', 
        gap: '1rem', 
        flexWrap: 'wrap', 
        width: '18rem'
    };
    

  return (
    <div>
            <h2>Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        {editNote === note._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={newData.title}
                                    onChange={(e) => setnewData({ ...newData, title: e.target.value })}
                                />
                                <textarea
                                    value={newData.content}
                                    onChange={(e) => setnewData({ ...newData, content: e.target.value })}
                                />
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => seteditNote(null)}>Cancel</button>
                            </div>
                        ) : (
                            
                            <div  className="card" style={containerStyle}>
                                <div className="card-body" >
                                <h5 className="card-title">{note.title}</h5>
                                <p className="card-text">{note.content}</p>
                                <button className="btn btn-primary" onClick={() => handleEdit(note)}>Edit</button>
                                <p></p>
                                <button className="btn btn-primary" onClick={() => handleDelete(note._id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        
  )
}

export default NoteList

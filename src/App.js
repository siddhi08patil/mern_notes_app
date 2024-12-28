import React,{useState} from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const App = () => {
    const [notes, setnotes] = useState([]);
    const addNote=(newNote)=>{
        setnotes([...notes,newNote]);
    };
  return (
    <div>
      <h1>Notes app</h1>
      <NoteForm onAdd={addNote} />
      <NoteList />
    </div>
  )
}

export default App

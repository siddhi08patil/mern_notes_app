import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5000/api'});

export const fetchNote = ()=> API.get('/notes')
export const createNote= (note)=> API.post('/notes',note)
export const updateNote = (id, updatedData) => API.put(`/notes/${id}`, updatedData);
export const deleteNote= (id)=> API.delete(`/notes/${id}`)



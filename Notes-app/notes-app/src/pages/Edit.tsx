import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';



function Edit() {
 const { id } = useParams();
 const [note, setNote] = useState({});
 const [loading, setLoading] = useState(true);
 const history = useNavigate();


 useEffect(() => {
   const fetchNote = async () => {
     try {
       const res = await axios.get(`http://localhost:8008/notes/${id}`);

       setNote(res.data);
       setLoading(false); 
     } catch (err) {
       console.log(err);
     }
   };

   fetchNote();
 }, [id]);

 const updateNote = async (updatedNote) => {
   try {


     await axios.put(`http://localhost:8008/notes/${id}` , updatedNote);
     history(`/`);
     
   } catch (err) {
     console.log(err);
   }
 };

 return (
   <div className="container mx-auto mt-8">
     <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
     { !loading && <NoteInput initialNote={note[0]} onNoteSubmit={updateNote} /> }
     
   </div>
 );
}

export default Edit
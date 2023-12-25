
import React, { useState, useEffect } from 'react';
import axios from "axios";
import NoteInput from "../components/NoteInput"
import { useNavigate } from 'react-router-dom';

function Main() {

  const [Note, setNote] = useState()
  const [Print,setPrint] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false);
  
  const history = useNavigate();

  const editNote = (id) => {
    // Navigate to the "Edit" page with the note ID
      history(`/edit/${id}`);
  };
  const remove = async (id) => {
    try{
      await axios.delete(`http://localhost:8008/notes/${id}`)
      setShouldFetch(true);
        }catch(err){
      console.log(err)
    }

  }

  const addNote = async (noteData) => {
    try {
      // Send a POST request to add the new note to the server
      await axios.post('http://localhost:8008/notes', noteData);
      // After adding the note, setPrint to trigger the useEffect
      setShouldFetch(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("useEffect was called");
    const Fetch = async () => {
      try{
        const res = await axios.get("http://localhost:8008/notes")
        setNote(res.data)
        setShouldFetch(false);
      }catch(err){
        console.log(err)
    }
    }
    Fetch()

  },[shouldFetch])



  return (

    <div className="container mx-auto mt-8" >
      <h1 className='text-4xl font-bold text-center mb-4'>
        Notes app
      </h1>
      <NoteInput initialNote={{}} onNoteSubmit={addNote}  />
      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"   onClick={() => (Print ? setPrint(false) : setPrint(true))}>
          {Print? "Hide notes": "Show notes"}
        </button>
        <div className="text-center max-w-xl mx-auto">
        {Print ? (
          // Map over the 'note' array and render each note
          Note.map((item) => (
            <div key={item.nid} className="bg-gray-200 p-4 my-4 rounded-md m-6 max-w-xl text-center ">
              <p className="text-lg font-bold"> {item.notehead}</p>
              <p className="text-gray-700"> {item.notecontent}</p>
              <div className="flex justify-end mt-2">
                <button className="mr-2 bg-blue-500  hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => editNote(item.nid)} >
                  Edit
                </button>
                <button className="bg-red-500  hover:bg-red-700 text-white px-4 py-2 rounded" onClick={()=> remove((item.nid))}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          null
        )}
        </div>
      </div>
    </div>

  )
}

export default Main

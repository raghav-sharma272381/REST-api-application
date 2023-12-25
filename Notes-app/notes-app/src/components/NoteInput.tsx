import React, { useState } from 'react';
import axios from 'axios';


const NoteInput = ({initialNote,onNoteSubmit}) => {
    const [noteData, setNoteData] = useState({
        heading: initialNote.notehead || '',
        content: initialNote.notecontent || '',
      });

      const handleChangeh = (e) => {
        const { name, value } = e.target;
        setNoteData((prevData) => ({ ...prevData, [name]: value }));
      };


    const handleSubmit = (e) => {
        e.preventDefault();
  
        onNoteSubmit(noteData);

      };


    return (
        <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="mb-4">
                <label htmlFor="noteHeading" className="block text-gray-700 text-sm font-bold mb-2">
                    Note Heading
                </label>
                <input
                    type="text"
                    name="heading"
                    value={noteData.heading || ""}
                    onChange={(e) => handleChangeh(e)}
                    placeholder="Enter note heading"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="noteContent" className="block text-gray-700 text-sm font-bold mb-2">
                    Note Content
                </label>
                <textarea
                    name="content"
                    value={noteData.content  || ""}
                    onChange={(e) => handleChangeh(e)}
                    placeholder="Enter note content"                    
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>

    );
};

export default NoteInput;

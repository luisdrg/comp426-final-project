import { useState, useEffect } from 'react';

const useNotes = (initialNotes) => {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    // If initialNotes are loaded asynchronously, handle that logic here or in the parent component.
    const sortedNotes = [...initialNotes].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    setNotes(sortedNotes);
  }, [initialNotes]);

  const addNote = (newNoteData) => {
    setNotes(prevNotes => [{...newNoteData, dateCreated: new Date().toLocaleString()}, ...prevNotes]);
  };


  const deleteNote = (id) => {
    setNotes(currentNotes => currentNotes.filter(note => note.id !== id));
    console.log('In deleteNote useNotes hook', id)
  };

  const updateNote = (id, updatedDetails) => {
    setNotes(currentNotes => currentNotes.map(note => note.id === id ? { ...note, ...updatedDetails } : note));
  };

  return { notes, addNote, deleteNote, updateNote };
};

export default useNotes;

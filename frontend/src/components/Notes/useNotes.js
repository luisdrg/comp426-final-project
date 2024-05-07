import { useState, useEffect } from 'react';

const useNotes = (initialNotes) => {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    // If initialNotes are loaded asynchronously, handle that logic here or in the parent component.
    setNotes(initialNotes);
  }, [initialNotes]);

  const addNote = (newNote) => {
    setNotes(currentNotes => [...currentNotes, { ...newNote, id: Math.random() }]);
  };

  const deleteNote = (id) => {
    setNotes(currentNotes => currentNotes.filter(note => note.id !== id));
  };

  const updateNote = (id, updatedDetails) => {
    setNotes(currentNotes => currentNotes.map(note => note.id === id ? { ...note, ...updatedDetails } : note));
  };

  return { notes, addNote, deleteNote, updateNote };
};

export default useNotes;

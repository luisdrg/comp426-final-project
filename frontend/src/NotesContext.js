import React, { createContext, useContext } from 'react';
import useNotes from './components/Notes/useNotes';

const NotesContext = createContext(null);

export const NotesProvider = ({ children, initialData }) => {
  const { notes, addNote, deleteNote, updateNote } = useNotes(initialData);

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (context === null) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
};

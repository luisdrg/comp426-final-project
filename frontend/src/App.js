import './App.css';
import NavBar from './components/NavBar';
import SignIn from './components/Authentication/SignIn';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './config/firebase';
import { useEffect, useState } from 'react';
import SignUp from './components/Authentication/SignUp';
import Notes from './components/Notes/Notes';
import EditProfile from './components/Profile/EditProfile';
import CreateProfile from './components/Profile/CreateProfile';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import { NotesProvider } from './NotesContext'; // Ensure you have the correct path

function App() {
  const [user, setUser] = useState(null);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData(currentUser);
      } else {
        console.log("User not authenticated");
        setInitialData([]); // Clear any previously loaded data
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

const fetchData = async (currentUser) => {
  try {
    const userId = currentUser.uid;
    const response = await axios.get(`http://localhost:4000/api/users/${userId}/notes`);
    console.log("Fetched data:", response.data);
    setInitialData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  return (
    <div className="App">
      <Router>
        {user && <NavBar />}
        {user ? (
          <div style={{ paddingTop: '120px' }}>
            <NotesProvider initialData={initialData}>
              <Routes>
                <Route path="/profile" element={<EditProfile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateProfile />} />
                <Route path="/" element={<Notes />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </NotesProvider>
          </div>
        ) : (
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;

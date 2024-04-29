import './App.css';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './config/firebase';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import Notes from './components/Notes';
import EditProfile from './components/EditProfile';
import CreateProfile from './components/CreateProfile';
function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Router>
        {user && <NavBar />}
        {user ? (
          <div style={{ paddingTop: '120px' }}>
          <Routes>
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/create" element={<CreateProfile />} />
            <Route path="/" element={<Notes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
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

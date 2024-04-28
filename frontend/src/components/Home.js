import * as React from 'react';
import { auth } from '../config/firebase';
function Home() {


  return (
    <div className="Home">
        <h1>Hello {auth.currentUser.email}</h1>
    </div>
  );
}

export default Home;

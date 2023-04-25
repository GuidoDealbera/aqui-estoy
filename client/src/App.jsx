//App.jsx

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import Landing from './Views/LandingPage/Landing';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div>
      <NavBar/> 
    <Routes>
      <Route exact path='/' element={<Landing/>}/>
      <Route path='/profile/:name' element={<Profile/>}/>
    </Routes>
    </div>
  );
}

export default App;


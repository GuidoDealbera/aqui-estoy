//App.jsx

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import Landing from './Views/LandingPage/Landing';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Landing/>}/>
      <Route path='/profile/:name' element={<Profile/>}/>
    </Routes>
  );
}

export default App;


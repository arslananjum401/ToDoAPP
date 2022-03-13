import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register'
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login'
const Context = createContext();
function App() {
  const credentialSTate = useState([{
    
  }])
  return (
    <>
      <Context.Provider value={credentialSTate}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
export { Context }

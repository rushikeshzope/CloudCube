import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/signup';
import AboutUs from './Components/AboutUs';
import Dashboard from './Components/Dashboard';
import Test from './Components/Test';
import SignIn from './Components/signin'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        

      </Routes>
    </Router>
  );
}

export default App;

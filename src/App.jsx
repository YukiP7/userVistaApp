import React from 'react';
import { BrowserRouter , Route, Routes, Outlet } from 'react-router-dom';
import Login from "./login/Login"
import Signup from "./signup/Signup"
import Dashboard from './Dashboard';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
  <Route path = "/" element = {<Login/>}/>
  <Route path = "/Signup" element = {<Signup/>}/>
  {/* <Route path = "/Forgot" element = {<Forgot/>}/> */}
  <Route path = "/dashboard" element = {<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
  );
};

export default App;

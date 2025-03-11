import React from 'react'
import Login from '../Shared/Utils/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Signup from '../Shared/Utils/Signup/Signup'
import Trends from '../Pages/Trends/Trends'
import Settings from '../Pages/Settings/Settings'
import Gallery from '../Pages/Gallery/Gallery'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.scss';
import Home from '../Pages/Home/Home'
import Diseases from '../Pages/Diseases/Diseases';
import About from '../Pages/About/About';
import Configuration from '../Pages/Configurations/Configuration';
import Public from '../Public/Public';
import Loader from '../Shared/Utils/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Loader />
      <ToastContainer />
      <BrowserRouter></BrowserRouter>
      <div className="App" data-test="app-container">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/Public" />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Public' element={<Public />} />
            <Route path='/SignUp' element={<Signup />} />
            <Route path="/Home" element={<Home />}>
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="About" element={<About />} />
              <Route path="Trends" element={<Trends />} />
              <Route path="Settings" element={<Settings />} />
              <Route path="Gallery" element={<Gallery />} />
              <Route path="Diseases" element={<Diseases />} />
              <Route path="Configurations" element={<Configuration />} />
              {/* <Route path="Configurations/:id" element={<Configuration />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

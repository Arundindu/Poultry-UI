import React from 'react'
import Login from '../Shared/Utils/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Signup from '../Shared/Utils/Signup/Signup'
import Trends from '../Pages/Trends/Trends'
import Settings from '../Pages/Settings/Settings'
import Gallery from '../Pages/Gallery/Gallery'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.scss';
import Home from '../Pages/Home/Home'
import Diseases from '../Pages/Diseases/Diseases';
import About from '../Pages/About/About';
import Configuration from '../Pages/Configurations/Configuration';
import Public from '../Public/Public';
import Loader from '../Shared/Utils/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '../Shared/Utils/AuthGuard';
import PageNotFound from '../Shared/Utils/PageNotFound/PageNotFound';
import UserRoleSetup from '../Pages/UserRoleSetup/UserRoleSetup';

function App() {
  return (
    <>
      <Loader />
      <ToastContainer />
      <HashRouter></HashRouter>
      <div className="App" data-test="app-container">
        <HashRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/Public" />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Public' element={<Public />} />
            <Route path='/SignUp' element={<Signup />} />
            <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>}>
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="About" element={<About />} />
              <Route path="Trends" element={<Trends />} />
              <Route path="Settings" element={<Settings />} />
              <Route path="Gallery" element={<Gallery />} />
              <Route path="Diseases" element={<Diseases />} />
              <Route path="Configurations" element={<Configuration />} />
              <Route path="UserRoleSetup" element={<UserRoleSetup />} />
              {/* <Route path="Configurations/:id" element={<Configuration />} /> */}
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;

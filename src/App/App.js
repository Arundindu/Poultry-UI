import React from 'react'
// import Select from 'react-select';
import Login from '../Shared/Utils/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Signup from '../Shared/Utils/Signup/Signup'
import Trends from '../Pages/Trends/Trends'
import Settings from '../Pages/Settings/Settings'
import Gallery from '../Pages/Gallery/Gallery'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.scss';
import Home from '../Pages/Home/Home'

function App() {
  // const [options, setData] = useState([
  //   { value: 'option1', label: 'Option 1' },
  //   { value: 'option2', label: 'Option 2' },
  // ])
  // const [selectedOption, setSelectedOption] = useState(null);

  // const handleSelectChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  //   console.log(`Option selected:`, selectedOption);
  // };
  return (
    <>
      <div className="App" data-test="app-container">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<Signup />} />
            <Route path="/home" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="trends" element={<Trends />} />
              <Route path="settings" element={<Settings />} />
              <Route path="gallery" element={<Gallery />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <div className='row col-12'>
    //       <h3>Inputs</h3>
    //       <div className='col-4'>Tesing</div>
    //       <div className='col-4'>Tesing Purpose</div>
    //     </div>
    //     <div className='row col-12'>
    //       <Select className='col-3'
    //         options={options}
    //         value={selectedOption}
    //         onChange={handleSelectChange}
    //       />
    //     </div>
    //   </header>
    // </div>
  );
}

export default App;

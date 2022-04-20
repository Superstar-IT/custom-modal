import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ReportModal from './components/ReportModal';
import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button className="btn" onClick={() => setOpen(true)}>Show Modal</button>
          <ReportModal open={open} onClose={() => setOpen(false)} />
        </header>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

// ...existing code...
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SelectionPage from './SelectionPage';
import FileFIR from './FireForm';
// import ViewFIR from './ViewFIR';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select" element={<SelectionPage />} />
        <Route path="/file-fir" element={<FileFIR />} />
        {/* <Route path="/view-fir" element={<ViewFIR />} /> */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
// ...existing code...
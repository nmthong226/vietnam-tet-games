import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts';
import Home from './pages/home';
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App
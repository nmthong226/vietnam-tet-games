import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts';
import Home from './pages/home';
import React from 'react';
import Modal from 'react-modal';
import PlayerBauCua from './pages/baucua/player';
import HomeBauCua from './pages/baucua/home';
import HostBauCua from './pages/baucua/gameplay';

Modal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/baucua">
            <Route path="home" element={<HomeBauCua />} />
            <Route path="host" element={<HostBauCua />} />
            <Route path="play" element={<PlayerBauCua />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App
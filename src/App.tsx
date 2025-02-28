import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts';
import Home from './pages/home';
import React from 'react';
import Modal from 'react-modal';
import BauCuaHome from './pages/baucua/home';
import HostGameBoard from './pages/baucua/gameplay/HostGameBoard';
import PlayerGameBoard from './pages/baucua/player/PlayerGameBoard';
import HostSetup from './pages/baucua/host/HostSetup';
import JoinGame from './pages/baucua/player/JoinGame.tsx';

Modal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/baucua">
            <Route path="" element={<BauCuaHome />} />
            <Route path="host" element={<HostSetup />} />
            <Route path="join" element={<JoinGame />} />
            <Route path="host/:id" element={<HostGameBoard />} />
            <Route path="join/:id" element={<PlayerGameBoard />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App
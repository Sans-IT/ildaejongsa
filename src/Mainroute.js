import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Profile from './components/Profile';
import ContractList from './components/ContractList';
import RenewContract from './components/Renewcontract';
import WallOfFame from './components/WallOfFame';
import Program from './components/Program';

function MainRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contract-list" element={<ContractList />} />
        <Route path="/renew-contract" element={<RenewContract />} />
        <Route path="/wall-of-fame" element={<WallOfFame />} />
        <Route path="/program" element={<Program />} />
      </Routes>
    </Router>
  );
}

export default MainRoute;

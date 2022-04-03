import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

import { Outlet, Link } from 'react-router-dom'

import Nav from './components/Nav'
import List from './components/List'

const App = () => {
  return (
    <div className="container">
      <Nav/>
      <Outlet/>
    </div>
  );
}

export default App;

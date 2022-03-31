import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

import Nav from './components/Nav'
import List from './components/List'

const App = () => {
  return (
    <div className="container">
      <Nav/>
      <List/>
    </div>
  );
}

export default App;

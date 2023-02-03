import './App.css';

import { Outlet } from 'react-router-dom'

import Nav from './components/Nav'

const App = () => {
  return (
    <div className="container">
      <Nav/>
      <Outlet/>
    </div>
  );
}

export default App;

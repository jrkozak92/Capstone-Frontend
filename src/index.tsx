import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './app/store'
import List from './components/List'
import Hobby from './components/Hobby'
import About from './components/About'
import Add from './components/Add'
import Edit from './components/Edit'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<List />}/>
            <Route path="hobbies" element={<List />}/>
            <Route path="hobbies/:hobbyId" element={<Hobby />}/>
            <Route path="add" element={<Add />} />
            <Route path="edit/:hobbyId" element={<Edit />} />
            <Route path="about" element={<About />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'


import { useAppDispatch, useAppSelector } from './app/hooks'
import { getHobbies, Hobby, hobbySelectors } from './features/hobby/hobbySlice'
import { RootState } from './app/store'

import Nav from './components/Nav'

const App = () => {
  const dispatch = useAppDispatch()
  const hobbies = useAppSelector(hobbySelectors.selectAll)


  useEffect(()=>{
    dispatch(getHobbies())
  }, [])

  return (
    <>
      <Nav/>
      <h1>Welcome to HobbbyHelper!</h1>
      <p>Feel free to scroll through our list of hobbies, or take our quiz to be shown a personalized list of hobbies you might enjoy!</p>
      <h3>Hobbies</h3>
      <ul>
        { hobbies.map((hobby: Hobby) => {
          return <li key={hobby.id}>
              <h5>{hobby.name}</h5>
              <p>{hobby.description}</p>
            </li>
        })}
      </ul>
    </>
  );
}

export default App;

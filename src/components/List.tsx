import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios'


import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getHobbies, deleteHobby, Hobby, hobbySelectors } from '../features/hobby/hobbySlice'
import { RootState } from '../app/store'

import Nav from '../components/Nav'
import Edit from '../components/Edit'


const List = () => {

  const dispatch = useAppDispatch()
  const hobbies = useAppSelector(hobbySelectors.selectAll)

  const handleDelete = (id: number) => {
    dispatch(deleteHobby(id))
  }
  useEffect(()=>{
    dispatch(getHobbies())
  }, [])

  return (
    <>
      <h1 className="title">Welcome to HobbbyHelper!</h1>
      <div className="hobbies">
        <p>Feel free to scroll through our list of hobbies, or take our quiz to be shown a personalized list of hobbies you might enjoy!</p>
        <h3>All Hobbies</h3>
        <ul className="hobbies-list">
          { hobbies.map((hobby: Hobby) => {
            return <li key={hobby.id} className="hobby">
              <div>
                <h5>{hobby.name}</h5>
                <p>{hobby.description}</p>
              </div>
              <Edit hobby={hobby}/>
              <button className="button" onClick={() => {handleDelete(hobby.id)}}>Delete</button>
            </li>
          })}
        </ul>
      </div>
    </>
  )
}

export default List;

import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios'


import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getHobbies, deleteHobby, Hobby, hobbySelectors } from '../features/hobby/hobbySlice'
import { RootState } from '../app/store'
import { Link, Outlet } from 'react-router-dom'

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
      <div className="content">
        <div className="hobbies">
          <h1 className="title">Welcome to HobbyHelper!</h1>
          <div className="hobbies-info">
            <p>Feel free to scroll through our list of hobbies, or take our quiz to be shown a personalized list of hobbies you might enjoy!</p>
            <h3 className="section-title">All Hobbies</h3>
          </div>
          <div className="hobbies-list">
            { hobbies.map((hobby: Hobby) => {
              return <Link to={`/hobbies/${hobby.id}`} key={hobby.id} className="hobby">
                <div>
                  <h5>{hobby.name}</h5>
                  <p>{hobby.description}</p>
                </div>
                <Edit hobby={hobby}/>
                <button className="button" onClick={() => {handleDelete(hobby.id)}}>Delete</button>
              </Link>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default List;

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const App = () => {
  const [hobbies, setHobbies] = useState<{id: number, name: string, description: string}[]>([])

  const getHobbies = () => {
    axios
      .get('https://ancient-cliffs-31790.herokuapp.com/hobbies')
      .then((response) => {
        console.log(response);
        setHobbies(response.data)
      }
    )
  }

  useEffect(()=>{
    getHobbies()
  }, [])

  return (
    <>
      <h1>Welcome to HobbbyHelper!</h1>
      <p>Feel free to scroll through our list of hobbies, or take our quiz to be shown a personalized list of hobbies you might enjoy!</p>
      <h3>Hobbies</h3>
      <ul>
        { hobbies.map((hobby) => {
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

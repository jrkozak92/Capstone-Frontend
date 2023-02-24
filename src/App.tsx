import './App.css';
<<<<<<< Updated upstream

import { Outlet } from 'react-router-dom'

import Nav from './components/Nav'

const App = () => {
=======
import axios from 'axios'
import Nav from './components/Nav'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { hobbyAdded, hobbyRemoved, getHobbies } from './features/hobby/hobbySlice'

const App = () => {
  interface Hobby {
    id: number,
    name: string,
    description: string
  }


  const hobbies: Hobby[] = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()



  useEffect(()=>{
    dispatch(getHobbies())
  }, [])

>>>>>>> Stashed changes
  return (
    <div className="container">
      <Nav/>
<<<<<<< Updated upstream
      <Outlet/>
    </div>
=======
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
>>>>>>> Stashed changes
  );
}

export default App;

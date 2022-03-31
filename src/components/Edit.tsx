import { useState, useEffect } from 'react'
import axios from 'axios'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Hobby, updateHobby } from '../features/hobby/hobbySlice'
import { RootState } from '../app/store'

const Edit = ( props:any ) => {
  const [hobby, setHobby] = useState<Hobby>(props.hobby)
  const [showForm, setShowForm] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleChange = (event: any) => {
    setHobby({...hobby, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event: any, updatedHobby: Hobby) => {
    event.preventDefault()
    dispatch(updateHobby(updatedHobby))
  }

  const toggleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <>
      { showForm ?
        <>
          <div>
            <form className="edit-form menu-dropdown" onSubmit={(event)=>{handleSubmit(event, hobby)}}>
              <input className="input edit-input" type="text" name="name" placeholder="What do you call it?" value={hobby.name} onChange={(event)=> {handleChange(event)}} />
              <textarea className="input edit-input" name="description" placeholder="What is it about?" value={hobby.description} onChange={(event)=>{handleChange(event)}}></textarea>
              <input className="button edit-submit" type="submit" value="Edit Hobby" />
            </form>
            <button className="button edit-cancel" onClick={toggleShowForm}>Cancel</button>
          </div>
        </>
          :
        <button className="button edit-toggle" onClick={toggleShowForm}>Edit</button>
      }

    </>
  )
}

export default Edit

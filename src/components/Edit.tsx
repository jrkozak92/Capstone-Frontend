import { useState, useEffect } from 'react'
import axios from 'axios'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Hobby, updateHobby } from '../features/hobby/hobbySlice'
import { RootState } from '../app/store'

const Edit = ( props:any ) => {
  const [hobby, setHobby] = useState<Hobby>(props.hobby)
  const dispatch = useAppDispatch()

  const handleChange = (event: any) => {
    setHobby({...hobby, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event: any, updatedHobby: Hobby) => {
    event.preventDefault()
    dispatch(updateHobby(updatedHobby))
  }

  return (
    <>
      <br/>
      <br/>
      <form onSubmit={(event)=>{handleSubmit(event, hobby)}}>
        <input type="text" name="name" placeholder="What do you call it?" value={hobby.name} onChange={(event)=> {handleChange(event)}} />
        <input type="text-area" name="description" placeholder="What is it about?" value={hobby.description} onChange={(event)=>{handleChange(event)}} />
        <input type="submit" value="Edit Hobby" />
      </form>
    </>
  )
}

export default Edit

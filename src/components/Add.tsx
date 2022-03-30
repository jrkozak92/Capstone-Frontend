import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addHobby } from '../features/hobby/hobbySlice'
import axios from 'axios'

const Add = () => {
  const [hobby, setHobby] = useState<{ name: string, description: string }>({name: '', description: ''})

  const dispatch = useAppDispatch()

  const handleChange = (event: any) => {
    setHobby({...hobby, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    dispatch(addHobby(hobby))
    setHobby({name: '', description: ''})
  }

  return (
    <>
      <br/>
      <br/>
      <p>{hobby.name} : {hobby.description}</p>
      <form onSubmit={(event)=>{handleSubmit(event)}}>
        <input type="text" name="name" placeholder="What do you call it?" value={hobby.name} onChange={(event)=> {handleChange(event)}} />
        <input type="text-area" name="description" placeholder="What is it about?" value={hobby.description} onChange={(event)=>{handleChange(event)}} />
        <input type="submit" value="Add New Hobby" />
      </form>
    </>
  )
}

export default Add

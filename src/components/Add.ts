import { useState, useEffect } from 'react'

const Add = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    console.log('Submit clicked')
  }

  const handleNameChange = (event: any) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" { (name === '') ? { placeholder="What is it called?" } : { value={name} } } onChange={(event) => {handleNameChange(event)}/>
      <input type="text" name="description" { description === '' ? placeholder="How does it work?" : value={description} } onChange={(event) => {handleDescriptionChange(event)}/>
      <input type="submit" value="Add New Hobby"/>
    </form>
  )
}

export default Add

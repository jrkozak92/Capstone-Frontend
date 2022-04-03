import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addHobby, IdlessHobby } from '../features/hobby/hobbySlice'
import axios from 'axios'
import '../App.css'

const Add = () => {
  const [hobby, setHobby] = useState<IdlessHobby>(
    {
      name: '',
      description: '',
      specs: {
          graphPath: '',
          initialInvestment: {
            amount: '',
            equipment: ''
          },
          timePerSession: '',
          pickUpAndPlayAbility: '',
      },
      aspectscores: {
          intellectualChallenge: -1,
          physicalChallenge: -1,
          creativeFocus: -1,
          technicalFocus: -1,
          financialRequirement: -1,
          soloVsGroup: -1,
          problemSolvingVsExpression: -1,
          desiredTimeInvestment: -1,
          technicalBarrierToEntry: -1,
      },
      keywords: [],
      resources: []
    }
  )

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
    <div className="add-menu menu-dropdown">
    <h4 className="form-title">Add a Hobby</h4>
      <form className="add-form" onSubmit={(event)=>{handleSubmit(event)}}>
        <input className="input add-input" type="text" name="name" placeholder="What do you call it?" value={hobby.name} onChange={(event)=> {handleChange(event)}} />
        <textarea className="input add-input" name="description" placeholder="What is it about?" value={hobby.description} onChange={(event)=>{handleChange(event)}}></textarea>
        <input className="button add-submit" type="submit" value="Add New Hobby" />
      </form>
    </div>
  )
}

export default Add

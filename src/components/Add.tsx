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
  // This is how I found the nested object handling solution: https://stackoverflow.com/questions/47103028/how-to-use-object-spread-with-nested-properties
  const handleChange = (event: any) => {
    if (event.target.name.includes('initialInvestment')){
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      console.log(`sliceIndex: ${sliceIndex}, keyName: ${keyName}`)
      setHobby({...hobby, specs: {...hobby.specs, initialInvestment: {...hobby.specs.initialInvestment, [keyName]: event.target.value}}})
    } else if (event.target.name.includes('specs')) {
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      console.log(`sliceIndex: ${sliceIndex}, keyName: ${keyName}`)
      setHobby({...hobby, specs: {...hobby.specs, [keyName]: event.target.value}})
    } else if (event.target.name.includes('aspectscores')) {
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      console.log(`sliceIndex: ${sliceIndex}, keyName: ${keyName}`)
      setHobby({...hobby, aspectscores: {...hobby.aspectscores, [keyName]: event.target.value}})
    } else {
      setHobby({...hobby, [event.target.name]: event.target.value})
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    dispatch(addHobby(hobby))
    setHobby({
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
          intellectualChallenge: "",
          physicalChallenge: "",
          creativeFocus: "",
          technicalFocus: "",
          financialRequirement: "",
          soloVsGroup: "",
          problemSolvingVsExpression: "",
          desiredTimeInvestment: "",
          technicalBarrierToEntry: "",
      },
      keywords: [],
      resources: []
    })
  }

  return (
    <div className="content">
      <h4 className="form-title">Add a Hobby</h4>
      <form className="add-form" onSubmit={(event)=>{handleSubmit(event)}}>
        <input id="name" className="input add-input" type="text" name="name" placeholder="What do you call it?" value={hobby.name} onChange={(event)=> {handleChange(event)}} />
        <textarea id="description" className="input add-input" name="description" placeholder="What is it about?" value={hobby.description} onChange={(event)=>{handleChange(event)}}></textarea>
        <fieldset>
        <legend>Experience Curves</legend>

          <input id="graph-path" className="input add-input" type="radio" name="specs.graphPath" />
        </fieldset>
        <input id="ii-amount" className="input add-input" type="text" name="specs.initialInvestment.amount" placeholder="How much do you need to spend to start?" value={hobby.specs.initialInvestment.amount} onChange={(event)=> {handleChange(event)}} />
        <input id="ii-equpiment" className="input add-input" type="text" name="specs.initialInvestment.equipment" placeholder="What do you need to do it?" value={hobby.specs.initialInvestment.equipment} onChange={(event)=> {handleChange(event)}} />
        <input id="time-per-session" className="input add-input" type="text" name="specs.timePerSession" placeholder="How long does it take?" value={hobby.specs.timePerSession} onChange={(event)=> {handleChange(event)}} />
        <input id="pick-up-ability" className="input add-input" type="text" name="specs.pickUpAndPlayAbility" placeholder="How much preparation is involved?" value={hobby.specs.pickUpAndPlayAbility} onChange={(event)=> {handleChange(event)}} />
        <input id="intellectual-score" className="input add-input" type="number" min="1" max="10" name="aspectscores.intellectualChallenge" placeholder="Intellectual Challenge Rating" value={hobby.aspectscores.intellectualChallenge === -1 ? "" : hobby.aspectscores.intellectualChallenge} onChange={(event)=> {handleChange(event)}} />
        <input id="physical-score" className="input add-input" type="number" min="1" max="10" name="aspectscores.physicalChallenge" placeholder="Physical Challenge Rating" value={hobby.aspectscores.physicalChallenge === -1 ? "" : hobby.aspectscores.physicalChallenge} onChange={(event)=> {handleChange(event)}} />
        <input id="creative-focus" className="input add-input" type="number" min="1" max="10" name="aspectscores.creativeFocus" placeholder="Creative Focus Rating" value={hobby.aspectscores.creativeFocus === -1 ? "" : hobby.aspectscores.creativeFocus} onChange={(event)=> {handleChange(event)}} />
        <input id="technical-focus" className="input add-input" type="number" min="1" max="10" name="aspectscores.technicalFocus" placeholder="Technical Focus Rating" value={hobby.aspectscores.technicalFocus === -1 ? "" : hobby.aspectscores.technicalFocus} onChange={(event)=> {handleChange(event)}} />
        <input id="financial-requirement" className="input add-input" type="number" min="1" max="10" name="aspectscores.financialRequirement" placeholder="Wallet Friendliness Rating" value={hobby.aspectscores.financialRequirement === -1 ? "" : hobby.aspectscores.financialRequirement} onChange={(event)=> {handleChange(event)}} />
        <input id="solo-vs-group" className="input add-input" type="number" min="1" max="10" name="aspectscores.soloVsGroup" placeholder="Solo vs Group Rating" value={hobby.aspectscores.soloVsGroup === -1 ? "" : hobby.aspectscores.soloVsGroup} onChange={(event)=> {handleChange(event)}} />
        <input id="problem-solving-vs-expression" className="input add-input" type="number" min="1" max="10" name="aspectscores.problemSolvingVsExpression" placeholder="Problem Solving vs Expression Rating" value={hobby.aspectscores.problemSolvingVsExpression === -1 ? "" : hobby.aspectscores.problemSolvingVsExpression} onChange={(event)=> {handleChange(event)}} />
        <input id="desired-time-investment" className="input add-input" type="number" min="1" max="10" name="aspectscores.desiredTimeInvestment" placeholder="How much will it take over your life?" value={hobby.aspectscores.desiredTimeInvestment === -1 ? "" : hobby.aspectscores.desiredTimeInvestment} onChange={(event)=> {handleChange(event)}} />
        <input id="technical-barrier-to-entry" className="input add-input" type="number" min="1" max="10" name="aspectscores.technicalBarrierToEntry" placeholder="Technical Barrier to Entry Rating" value={hobby.aspectscores.technicalBarrierToEntry === -1 ? "" : hobby.aspectscores.technicalBarrierToEntry} onChange={(event)=> {handleChange(event)}} />
        <input id="keywords" className="input add-input" type="text" name="keywords" placeholder="Add some keywords!" value={hobby.keywords} onChange={(event)=> {handleChange(event)}}/>
        <input className="button add-submit" type="submit" value="Add New Hobby" />
      </form>
    </div>
  )
}

export default Add

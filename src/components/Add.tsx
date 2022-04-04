import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addHobby, IdlessHobby } from '../features/hobby/hobbySlice'
import axios from 'axios'
import '../App.css'
import { useNavigate } from 'react-router-dom'

import inverseLog from "../assets/SVTInverseLog.png"
import exponential from "../assets/SVTExponential.png"
import linear from "../assets/SVTLinear.png"
import plateus from "../assets/SVTPlateus.png"

const Add = () => {
  const navigate = useNavigate()
  const [graphPath, setGraphPath] = useState('inverseLog')
  const [hobby, setHobby] = useState<IdlessHobby>(
    {
      name: '',
      description: '',
      specs: {
          graphPath: graphPath,
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
      keywords: "",
      resources: ""
    }
  )


  const dispatch = useAppDispatch()
  // This is how I found the nested object handling solution: https://stackoverflow.com/questions/47103028/how-to-use-object-spread-with-nested-properties
  const handleChange = (event: any) => {
    if (event.target.value.includes('<' || '>')){
      event.target.value.replaceAll('<', '&lt;')
      event.target.value.replaceAll('>', '&gt;')
    }
    if (event.target.name.includes('initialInvestment')){
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      setHobby({...hobby, specs: {...hobby.specs, initialInvestment: {...hobby.specs.initialInvestment, [keyName]: event.target.value}}})
    } else if (event.target.name.includes('specs')) {
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      setHobby({...hobby, specs: {...hobby.specs, [keyName]: event.target.value}})
    } else if (event.target.name.includes('aspectscores')) {
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      setHobby({...hobby, aspectscores: {...hobby.aspectscores, [keyName]: event.target.value}})
    } else {
      setHobby({...hobby, [event.target.name]: event.target.value})
    }
  }

  const handleRadioChange = (event: any) => {
    if (graphPath !== event.target.value) {
      setGraphPath(event.target.value)
      setHobby({...hobby, specs: {...hobby.specs, graphPath: event.target.value}})
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    hobby.keywords = (`'${hobby.keywords}'`)
    hobby.resources = (`'${hobby.resources}'`)
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
      keywords: "",
      resources: ""
    })
    navigate("/hobbies")
  }

  return (
    <div className="content">
      <h4 className="form-title">Add a Hobby</h4>
      <form className="add-form" onSubmit={(event)=>{handleSubmit(event)}}>
        <input id="name" className="input add-input" type="text" name="name" placeholder="What's it called?" value={hobby.name} onChange={(event)=> {handleChange(event)}} required/>
        <textarea id="description" className="input add-input" name="description" placeholder="What is it?" value={hobby.description} onChange={(event)=>{handleChange(event)}} required></textarea>
        <fieldset className="radio-graphs">
          <legend>Experience Curves</legend>
          <label className="graph-path-box" htmlFor="graph-path-inverseLog">
            <h4 className="graph-title">Inverse Log</h4>
            <p className="graph-description">Easy to learn the basics, but marginal gains after a certain point.</p>
            <input id="graph-path-inverseLog" className="input add-input graph-img" type="radio" name="specs.graphPath" value="inverseLog" onChange={(event)=>{handleRadioChange(event)}}  checked={graphPath === 'inverseLog'} required/>
            <img className="graph" src={inverseLog}/>
          </label>
          <label className="graph-path-box" htmlFor="graph-path-linear">
            <h4 className="graph-title">Linear</h4>
            <p className="graph-description">You get out what you put in.</p>
            <input id="graph-path-linear" className="input add-input graph-img" type="radio" name="specs.graphPath" value="linear" onChange={(event)=>{handleRadioChange(event)}} checked={graphPath === 'linear'} required/>
            <img className="graph" src={linear}/>
          </label>
          <label className="graph-path-box" htmlFor="graph-path-exponential">
            <h4 className="graph-title">Exponential</h4>
            <p className="graph-description">Tough to pick up, but quick to master once you get it.</p>
            <input id="graph-path-exponential" className="input add-input graph-img" type="radio" name="specs.graphPath" value="exponential" onChange={(event)=>{handleRadioChange(event)}} checked={graphPath === 'exponential'} required/>
            <img className="graph" src={exponential}/>
          </label>
          <label className="graph-path-box" htmlFor="graph-path-plateus">
            <h4 className="graph-title">Plateus</h4>
            <p className="graph-description">Definite distinction between experience levels, and climbing the ladder takes time and effort.</p>
            <input id="graph-path-plateus" className="input add-input graph-img" type="radio" name="specs.graphPath" value="plateus" onChange={(event)=>{handleRadioChange(event)}} checked={graphPath === 'plateus'} required/>
            <img className="graph" src={plateus}/>
          </label>
        </fieldset>
        <input id="ii-amount" className="input add-input" type="text" name="specs.initialInvestment.amount" placeholder="How much do you need to spend to start?" value={hobby.specs.initialInvestment.amount} onChange={(event)=> {handleChange(event)}} required/>
        <input id="ii-equpiment" className="input add-input" type="text" name="specs.initialInvestment.equipment" placeholder="What do you need on hand to do it?" value={hobby.specs.initialInvestment.equipment} onChange={(event)=> {handleChange(event)}} required/>
        <input id="time-per-session" className="input add-input" type="text" name="specs.timePerSession" placeholder="How long does it take to complete? (As long as you want is a fine answer here)" value={hobby.specs.timePerSession} onChange={(event)=> {handleChange(event)}} required/>
        <input id="pick-up-ability" className="input add-input" type="text" name="specs.pickUpAndPlayAbility" placeholder="How much do you have to prepare each time?" value={hobby.specs.pickUpAndPlayAbility} onChange={(event)=> {handleChange(event)}} required/>
        <fieldset className="scores-fields">
          <legend>Descriptive Scores</legend>
          <h4>Rate this hobby in each of the following fields with a number 1 - 10</h4>
          <label htmlFor="intellectual-score">Intellectual Challenge Rating</label>
          <input id="intellectual-score" className="input add-input" type="number" min="1" max="10" name="aspectscores.intellectualChallenge" placeholder="(1 = Kid-friendly) - (10 = Must be a Genius)" value={hobby.aspectscores.intellectualChallenge === -1 ? "" : hobby.aspectscores.intellectualChallenge} onChange={(event)=> {handleChange(event)}} required/>
          <label htmlFor="physical-score">Physical Challenge Rating</label>
          <input id="physical-score" className="input add-input" type="number" min="1" max="10" name="aspectscores.physicalChallenge" placeholder="(1 = Kid-friendly) - (10 = Professional Athletes Only)" value={hobby.aspectscores.physicalChallenge === -1 ? "" : hobby.aspectscores.physicalChallenge} onChange={(event)=> {handleChange(event)}} required/>
          <label htmlFor="creative-focus">Creative Focus Rating</label>
          <input id="creative-focus" className="input add-input" type="number" min="1" max="10" name="aspectscores.creativeFocus" placeholder="(1 = Must Follow the Instructions Exactly) - (10 = There are No Rules!)" value={hobby.aspectscores.creativeFocus === -1 ? "" : hobby.aspectscores.creativeFocus} onChange={(event)=> {handleChange(event)}} required/>
          <label htmlFor="technical-focus">Technical Focus Rating</label>
          <input id="technical-focus" className="input add-input" type="number" min="1" max="10" name="aspectscores.technicalFocus" placeholder="(1 = There are No Rules...) - (10 = Technique is Everything)" value={hobby.aspectscores.technicalFocus === -1 ? "" : hobby.aspectscores.technicalFocus} onChange={(event)=> {handleChange(event)}} required/>
          <label htmlFor="financial-requirement">Finanical Requirement Rating</label>
          <input id="financial-requirement" className="input add-input" type="number" min="1" max="10" name="aspectscores.financialRequirement" placeholder="(1 = Free Forever!) - (10 = Requires $1000s Before You Can Start)" value={hobby.aspectscores.financialRequirement === -1 ? "" : hobby.aspectscores.financialRequirement} onChange={(event)=> {handleChange(event)}} required/>
          <label htmlFor="solo-vs-group">Solo vs Group Rating</label>
          <input id="solo-vs-group" className="input add-input" type="number" min="1" max="10" name="aspectscores.soloVsGroup" placeholder="(1 = Best Done Solo) - (10 = Requires a Large Group)" value={hobby.aspectscores.soloVsGroup === -1 ? "" : hobby.aspectscores.soloVsGroup} onChange={(event)=> {handleChange(event)}} required/>
          <label htmlFor="problem-solving-vs-expression">Problem Solving vs Expression Rating</label>
          <input id="problem-solving-vs-expression" className="input add-input" type="number" min="1" max="10" name="aspectscores.problemSolvingVsExpression" placeholder="(1 = The Point is to Solve a Problem) - (10 = The Point is to Express Yourself)" value={hobby.aspectscores.problemSolvingVsExpression === -1 ? "" : hobby.aspectscores.problemSolvingVsExpression} onChange={(event)=> {handleChange(event)}} required/>
          <label htmlFor="desired-time-investment">How much will it take over your life?</label>
          <input id="desired-time-investment" className="input add-input" type="number" min="1" max="10" name="aspectscores.desiredTimeInvestment" placeholder="(1 = 5 Minutes Here and There) - (10 = There is No Life Outside of This...)" value={hobby.aspectscores.desiredTimeInvestment === -1 ? "" : hobby.aspectscores.desiredTimeInvestment} onChange={(event)=> {handleChange(event)}} required/>
          <label htmlFor="technical-barrier-to-entry">How difficult is it to get started?</label>
          <input id="technical-barrier-to-entry" className="input add-input" type="number" min="1" max="10" name="aspectscores.technicalBarrierToEntry" placeholder="(1 = Anyone Can Do It!) - (10 = Requires Years of Study to Understand the Basics)" value={hobby.aspectscores.technicalBarrierToEntry === -1 ? "" : hobby.aspectscores.technicalBarrierToEntry} onChange={(event)=> {handleChange(event)}} required/>
      </fieldset>
      <div className="keyword-layout">
        <input id="keywords" className="input add-input" type="text" name="keywords" placeholder="Add some keywords! ('keyword, keyword'), Max = 3" value={hobby.keywords} onChange={(event)=> {handleChange(event)}} required/>
        <div className="keyword-container">
        {hobby.keywords ? hobby.keywords.split(', ', 3).map((keyword, i)=> {
          return <div className="individual-keyword" key={i}>{keyword}</div>
        }) : null}
        </div>
      </div>
      <input id="resources" className="input add-input" type="text" name="resources" placeholder="Have any good resources? ('resource, resource, ...')" value={hobby.resources} onChange={(event)=> {handleChange(event)}} required/>
      <input className="button add-submit" type="submit" value="Add New Hobby" />
    </form>
  </div>
  )
}

export default Add

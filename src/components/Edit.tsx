import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Hobby, deleteHobby, updateHobby, hobbySelectors, getHobbies } from '../features/hobby/hobbySlice'

import inverseLog from "../assets/SVTInverseLog.png"
import exponential from "../assets/SVTExponential.png"
import linear from "../assets/SVTLinear.png"
import plateus from "../assets/SVTPlateus.png"

const Edit = ():any => {
  type Mutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
  };

  type MutableHobby = Mutable<Hobby>;

  let params = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let hobbyId: any = Number(params.hobbyId)
  const hobby: any = useAppSelector((state) => hobbySelectors.selectById(state, hobbyId))
  const [updatedHobby, setUpdatedHobby] = useState<MutableHobby>(hobby)
  const [showRadio, setShowRadio] = useState(false)
  const [changeStatus, setChangeStatus] = useState(false)

  const handleChange = (event: any) => {
    setChangeStatus(true)
    if (event.target.value.includes('<') || event.target.value.includes('>')){
      event.target.value.replaceAll('<', '&lt;')
      event.target.value.replaceAll('>', '&gt;')
    }
    if (event.target.name.includes('initialInvestment')){
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      setUpdatedHobby({...updatedHobby, specs: {...updatedHobby.specs, initialInvestment: {...updatedHobby.specs.initialInvestment, [keyName]: event.target.value}}})
    } else if (event.target.name.includes('specs')) {
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      setUpdatedHobby({...updatedHobby, specs: {...updatedHobby.specs, [keyName]: event.target.value}})
    } else if (event.target.name.includes('aspectscores')) {
      const sliceIndex: number = event.target.name.lastIndexOf('.') + 1
      const keyName: string = event.target.name.slice(sliceIndex)
      setUpdatedHobby({...updatedHobby, aspectscores: {...updatedHobby.aspectscores, [keyName]: event.target.value}})
    } else {
      setUpdatedHobby({...updatedHobby, [event.target.name]: event.target.value})
    }
  }

  const handleRadioChange = (event: any) => {
    if (updatedHobby.specs.graphPath !== event.target.value) {
      setUpdatedHobby({...updatedHobby, specs: {...updatedHobby.specs, graphPath: event.target.value}})
    }
  }

  const handleSubmit = (event: any, updatedHobbyObj: Mutable<Hobby>) => {
    event.preventDefault()
    if (changeStatus){
      if (typeof updatedHobbyObj.keywords !== 'string'){
        updatedHobbyObj.keywords = updatedHobbyObj.keywords.join(', ')
      }
      if (typeof updatedHobbyObj.resources !== 'string'){
        updatedHobbyObj.resources = updatedHobbyObj.resources.join(', ')
      }
      dispatch(updateHobby(updatedHobbyObj))
    }
    navigate(`/hobbies/${hobbyId}`)
  }

  const handleDelete = (id: number) => {
    dispatch(deleteHobby(id))
    navigate('/hobbies')
  }


  useEffect(()=>{
    dispatch(getHobbies())
  // eslint-disable-next-line react-hooks/exhaustive-deps   
  }, [])

  useEffect(()=>{
    setUpdatedHobby(hobby)
  }, [hobby])

  // useEffect(()=> {
  //   if (typeof updatedHobby.keywords !== 'string' ){
  //     setUpdatedHobby({...updatedHobby, keywords: updatedHobby.keywords.join(', ')})
  //   }
  //   if (typeof updatedHobby.resources !== 'string' ){
  //     setUpdatedHobby({...updatedHobby, resources: updatedHobby.resources.join(', ')})
  //   }
  // }, [updatedHobby])

  return (
    <>
    <div className="content">
      <div className="nav-controls">
        <Link to="/hobbies" className="button">&lt; Back to All Hobbies</Link>
        <button className="button delete-button" onClick={() => {handleDelete(hobbyId)}}>Delete This Hobby</button>
        <div>
          <Link to={`/hobbies/${hobbyId}`} className="button edit-save" onClick={(event)=>{handleSubmit(event, updatedHobby)}}>Save</Link>
          <Link to={`/hobbies/${hobbyId}`} className="button edit-cancel">Cancel</Link>
        </div>
      </div>
      { updatedHobby === undefined ?
        <div className="loading">
          <h2>Loading...</h2>
        </div>
          :
        <div className="hobby-detail">
          <div className="hobby-name-keywords">
            <input id="name" className="hobby-name add-input" type="text" name="name" placeholder="What's it called?" value={updatedHobby.name} onChange={(event)=> {handleChange(event)}} required/>
            <div className="keyword-edit-display">
            <input type="text" name="keywords" className="display-keyword input edit-keyword" value={updatedHobby.keywords} onChange={(event)=> {handleChange(event)}}/>
            </div>
          </div>
          <textarea id="edit-description" className="add-input" name="description" placeholder="What is it?" value={updatedHobby.description} onChange={(event)=>{handleChange(event)}} required></textarea>
          <div className="hobby-specs">
            <h3>Specs</h3>
            <section className="spec-section">
              <h4>Expertise VS Time Invested</h4>
              {updatedHobby.specs.graphPath === 'inverseLog' ?
                <img alt="" className="edit-graph" src={inverseLog} onClick={()=>{setShowRadio(!showRadio)}}/>
                :
                updatedHobby.specs.graphPath === 'linear' ?
                  <img alt="" className="edit-graph" src={linear} onClick={()=>{setShowRadio(!showRadio)}}/>
                  :
                  updatedHobby.specs.graphPath === 'exponential' ?
                    <img alt="" className="edit-graph" src={exponential} onClick={()=>{setShowRadio(!showRadio)}}/>
                    :
                    updatedHobby.specs.graphPath === 'plateus' ?
                      <img alt="" className="edit-graph" src={plateus} onClick={()=>{setShowRadio(!showRadio)}}/>
                      :
                      undefined
              }
              {showRadio ?
              <fieldset className="edit-radio-graphs">
                <legend>Experience Curves</legend>
                <label className="graph-path-box" htmlFor="graph-path-inverseLog">
                  <h4 className="graph-title">Inverse Log</h4>
                  <p className="graph-description">Easy to learn the basics, but marginal gains after a certain point.</p>
                  <input id="graph-path-inverseLog" className="input add-input graph-img" type="radio" name="specs.graphPath" value="inverseLog" onChange={(event)=>{handleRadioChange(event)}}  checked={updatedHobby.specs.graphPath === 'inverseLog'} required/>
                  <img alt="" className="graph" src={inverseLog}/>
                </label>
                <label className="graph-path-box" htmlFor="graph-path-linear">
                  <h4 className="graph-title">Linear</h4>
                  <p className="graph-description">You get out what you put in.</p>
                  <input id="graph-path-linear" className="input add-input graph-img" type="radio" name="specs.graphPath" value="linear" onChange={(event)=>{handleRadioChange(event)}} checked={updatedHobby.specs.graphPath === 'linear'} required/>
                  <img alt="" className="graph" src={linear}/>
                </label>
                <label className="graph-path-box" htmlFor="graph-path-exponential">
                  <h4 className="graph-title">Exponential</h4>
                  <p className="graph-description">Tough to pick up, but quick to master once you get it.</p>
                  <input id="graph-path-exponential" className="input add-input graph-img" type="radio" name="specs.graphPath" value="exponential" onChange={(event)=>{handleRadioChange(event)}} checked={updatedHobby.specs.graphPath === 'exponential'} required/>
                  <img alt="" className="graph" src={exponential}/>
                </label>
                <label className="graph-path-box" htmlFor="graph-path-plateus">
                  <h4 className="graph-title">Plateus</h4>
                  <p className="graph-description">Definite distinction between experience levels, and climbing the ladder takes time and effort.</p>
                  <input id="graph-path-plateus" className="input add-input graph-img" type="radio" name="specs.graphPath" value="plateus" onChange={(event)=>{handleRadioChange(event)}} checked={updatedHobby.specs.graphPath === 'plateus'} required/>
                  <img alt="" className="graph" src={plateus}/>
                </label>
              </fieldset>
               :
              null
            }
            </section>
            <section className="spec-section">
              <h4>Initial Investment</h4>
              <h5>Cost:</h5>
              <input id="ii-amount" className="input add-input" type="text" name="specs.initialInvestment.amount" placeholder="How much do you need to spend to start?" value={updatedHobby.specs.initialInvestment.amount} onChange={(event)=> {handleChange(event)}} required/>
              <h5>Equipment:</h5>
              <input id="ii-equpiment" className="input add-input" type="text" name="specs.initialInvestment.equipment" placeholder="What do you need on hand to do it?" value={updatedHobby.specs.initialInvestment.equipment} onChange={(event)=> {handleChange(event)}} required/>
            </section>
            <section className="spec-section">
              <h4>Time Per Session</h4>
              <input id="time-per-session" className="input add-input" type="text" name="specs.timePerSession" placeholder="How long does it take to complete? (As long as you want is a fine answer here)" value={updatedHobby.specs.timePerSession} onChange={(event)=> {handleChange(event)}} required/>
            </section>
            <section className="spec-section">
              <h4>Prep</h4>
              <input id="pick-up-ability" className="input add-input" type="text" name="specs.pickUpAndPlayAbility" placeholder="How much do you have to prepare each time?" value={updatedHobby.specs.pickUpAndPlayAbility} onChange={(event)=> {handleChange(event)}} required/>
            </section>
          </div>
          <div className="hobby-resources">
            <h3>Resources</h3>
            <input id="resources" className="input add-input" type="text" name="resources" placeholder="Have any good resources? ('resource, resource, ...')" value={updatedHobby.resources} onChange={(event)=> {handleChange(event)}} required/>
          </div>
          <fieldset className="scores-fields">
            <legend>Descriptive Scores</legend>
            <h4>Rate this hobby in each of the following fields with a number 1 - 10</h4>
            <label htmlFor="intellectual-score">Intellectual Challenge Rating</label>
            <input id="intellectual-score" className="input add-input" type="number" min="1" max="10" name="aspectscores.intellectualChallenge" placeholder="(1 = Kid-friendly) - (10 = Must be a Genius)" value={updatedHobby.aspectscores.intellectualChallenge === -1 ? "" : updatedHobby.aspectscores.intellectualChallenge} onChange={(event)=> {handleChange(event)}} required/>
            <label htmlFor="physical-score">Physical Challenge Rating</label>
            <input id="physical-score" className="input add-input" type="number" min="1" max="10" name="aspectscores.physicalChallenge" placeholder="(1 = Kid-friendly) - (10 = Professional Athletes Only)" value={updatedHobby.aspectscores.physicalChallenge === -1 ? "" : updatedHobby.aspectscores.physicalChallenge} onChange={(event)=> {handleChange(event)}} required/>
            <label htmlFor="creative-focus">Creative Focus Rating</label>
            <input id="creative-focus" className="input add-input" type="number" min="1" max="10" name="aspectscores.creativeFocus" placeholder="(1 = Must Follow the Instructions Exactly) - (10 = There are No Rules!)" value={updatedHobby.aspectscores.creativeFocus === -1 ? "" : updatedHobby.aspectscores.creativeFocus} onChange={(event)=> {handleChange(event)}} required/>
            <label htmlFor="technical-focus">Technical Focus Rating</label>
            <input id="technical-focus" className="input add-input" type="number" min="1" max="10" name="aspectscores.technicalFocus" placeholder="(1 = There are No Rules...) - (10 = Technique is Everything)" value={updatedHobby.aspectscores.technicalFocus === -1 ? "" : updatedHobby.aspectscores.technicalFocus} onChange={(event)=> {handleChange(event)}} required/>
            <label htmlFor="financial-requirement">Finanical Requirement Rating</label>
            <input id="financial-requirement" className="input add-input" type="number" min="1" max="10" name="aspectscores.financialRequirement" placeholder="(1 = Free Forever!) - (10 = Requires $1000s Before You Can Start)" value={updatedHobby.aspectscores.financialRequirement === -1 ? "" : updatedHobby.aspectscores.financialRequirement} onChange={(event)=> {handleChange(event)}} required/>
            <label htmlFor="solo-vs-group">Solo vs Group Rating</label>
            <input id="solo-vs-group" className="input add-input" type="number" min="1" max="10" name="aspectscores.soloVsGroup" placeholder="(1 = Best Done Solo) - (10 = Requires a Large Group)" value={updatedHobby.aspectscores.soloVsGroup === -1 ? "" : updatedHobby.aspectscores.soloVsGroup} onChange={(event)=> {handleChange(event)}} required/>
            <label htmlFor="problem-solving-vs-expression">Problem Solving vs Expression Rating</label>
            <input id="problem-solving-vs-expression" className="input add-input" type="number" min="1" max="10" name="aspectscores.problemSolvingVsExpression" placeholder="(1 = The Point is to Solve a Problem) - (10 = The Point is to Express Yourself)" value={updatedHobby.aspectscores.problemSolvingVsExpression === -1 ? "" : updatedHobby.aspectscores.problemSolvingVsExpression} onChange={(event)=> {handleChange(event)}} required/>
            <label htmlFor="desired-time-investment">How much will it take over your life?</label>
            <input id="desired-time-investment" className="input add-input" type="number" min="1" max="10" name="aspectscores.desiredTimeInvestment" placeholder="(1 = 5 Minutes Here and There) - (10 = There is No Life Outside of This...)" value={updatedHobby.aspectscores.desiredTimeInvestment === -1 ? "" : updatedHobby.aspectscores.desiredTimeInvestment} onChange={(event)=> {handleChange(event)}} required/>
            <label htmlFor="technical-barrier-to-entry">How difficult is it to get started?</label>
            <input id="technical-barrier-to-entry" className="input add-input" type="number" min="1" max="10" name="aspectscores.technicalBarrierToEntry" placeholder="(1 = Anyone Can Do It!) - (10 = Requires Years of Study to Understand the Basics)" value={updatedHobby.aspectscores.technicalBarrierToEntry === -1 ? "" : updatedHobby.aspectscores.technicalBarrierToEntry} onChange={(event)=> {handleChange(event)}} required/>
        </fieldset>
        </div>
      }
    </div>
    </>
  )
}

export default Edit

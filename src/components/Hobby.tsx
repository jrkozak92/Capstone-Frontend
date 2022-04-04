import { useState, useEffect } from 'react'
import '../App.css'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getHobbies, deleteHobby, Hobby, hobbySelectors } from '../features/hobby/hobbySlice'
import store from '../app/store'
import inverseLog from "../assets/SVTInverseLog.png"
import exponential from "../assets/SVTExponential.png"
import linear from "../assets/SVTLinear.png"
import plateus from "../assets/SVTPlateus.png"

const HobbyDetail = ():any => {
  let params = useParams();
  const dispatch = useAppDispatch()
  let hobbyId: any = Number(params.hobbyId)
  const hobby: any = useAppSelector((state) => hobbySelectors.selectById(state, hobbyId))

  useEffect(()=>{
    dispatch(getHobbies())
  }, [])

  return (
    <div className="content">
      <Link to="/hobbies" className="back-button">&lt; Back</Link>
      { hobby === undefined ?
        <div className="loading">
          <h2>Loading...</h2>
        </div>
          :
        <div className="hobby-detail">
          <h2 className="hobby-name">{hobby.name}</h2>
          <p className="hobby-description">{hobby.description}</p>
          <div className="hobby-specs">
            <h3>Specs</h3>
            <section className="spec-section">
              <h4>Expertise VS Time Invested</h4>
              <img className="graph" src={hobby.specs.graphPath}/>
            </section>
            <section className="spec-section">
              <h4>Initial Investment</h4>
              <div>{hobby.specs.initialInvestment.amount}</div> <div>{hobby.specs.initialInvestment.equipment}</div>
            </section>
            <section className="spec-section">
              <h4>Time Per Session</h4>
              <p>{hobby.specs.timePerSession}</p>
            </section>
            <section className="spec-section">
              <h4>Prep</h4>
              <p>{hobby.specs.pickUpAndPlayAbility}</p>
            </section>
          </div>
          <div className="hobby-resources">
            <h3>Resources</h3>
            <div>{hobby.resources[0].split(", ").map((resource: string, i: number) => {
              return <div className="individual-resource" key={i}>
                {resource}
              </div>
            })}
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default HobbyDetail

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
              <img className="graph" src={inverseLog}/>
            </section>
            <section className="spec-section">
              <h4>Initial Investment</h4>
              <p>$100, equipment</p>
            </section>
            <section className="spec-section">
              <h4>Time Per Session</h4>
              <p>&lt;1min - 1hr</p>
            </section>
            <section className="spec-section">
              <h4>Pick-up-and-Play Friendly?</h4>
              <p>Very!</p>
            </section>
          </div>
          <div className="hobby-resources">
            <h3>Resources</h3>
            Placeholder information
          </div>
        </div>
      }

    </div>
  )
}

export default HobbyDetail

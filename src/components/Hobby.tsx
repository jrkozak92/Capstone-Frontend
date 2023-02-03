import { useEffect } from 'react'
import '../App.css'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getHobbies, hobbySelectors } from '../features/hobby/hobbySlice'
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="content">
      <div className="nav-controls">
        <Link to="/hobbies" className="button">&lt; Back</Link>
        <Link to={`/edit/${hobbyId}`} className="button">Edit This Hobby</Link>
      </div>
      { hobby === undefined ?
        <div className="loading">
          <h2>Loading...</h2>
        </div>
          :
        <div className="hobby-detail">
          <div className="hobby-name-keywords">
            <h2 className="hobby-name">{hobby.name}</h2>
            <div className="keyword-display">
            {hobby.keywords ? hobby.keywords[0].split(', ').map((keyword: string, i: number)=> {
              return <div className="display-keyword" key={i}>{keyword}</div>
            }) : null}
            </div>
          </div>
          <p className="hobby-description">{hobby.description}</p>
          <div className="hobby-specs">
            <h3>Specs</h3>
            <section className="spec-section">
              <h4>Expertise VS Time Invested</h4>
              {hobby.specs.graphPath === 'inverseLog' ?
                <img alt="" className="graph" src={inverseLog}/>
                :
                hobby.specs.graphPath === 'linear' ?
                  <img alt="" className="graph" src={linear}/>
                  :
                  hobby.specs.graphPath === 'exponential' ?
                    <img alt="" className="graph" src={exponential}/>
                    :
                    hobby.specs.graphPath === 'plateus' ?
                      <img alt="" className="graph" src={plateus}/>
                      :
                      undefined
              }

            </section>
            <section className="spec-section">
              <h4>Initial Investment</h4>
              <h5>Cost:</h5>
              <div>{hobby.specs.initialInvestment.amount}</div>
              <h5>Equipment:</h5>
              <div>{hobby.specs.initialInvestment.equipment}</div>
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

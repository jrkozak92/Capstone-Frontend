import { useState, useEffect } from 'react'
import '../App.css'
import { useParams} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getHobbies, deleteHobby, Hobby, hobbySelectors } from '../features/hobby/hobbySlice'
import store from '../app/store'

const HobbyDetail = ():any => {
  let params = useParams();
  const dispatch = useAppDispatch()
  let hobbyId: any = Number(params.hobbyId)
  const hobby: any = useAppSelector((state) => hobbySelectors.selectById(state, hobbyId))

  // const getHobby = (): any => {
  //   const hobArr = hobbies.filter(hobby => hobby.id === hobbyId)
  //
  // }

  useEffect(()=>{
    dispatch(getHobbies())
  }, [])

  return (
    <div className="content">
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
            Placeholder information
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

import { useState, useEffect } from 'react';
import '../App.css';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getHobbies, Hobby, hobbySelectors } from '../features/hobby/hobbySlice'
import { Link } from 'react-router-dom'


const List = () => {

  const dispatch = useAppDispatch()
  const hobbies = useAppSelector(hobbySelectors.selectAll)
  const [searchFilter, setSearchFilter] = useState('')

  const handleChange = (event: any) => {
    setSearchFilter(event.target.value.toLowerCase())
  }


  useEffect(()=>{
    dispatch(getHobbies())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="content">
        <div className="hobbies">
          <h1 className="title">Welcome to HobbyHelper!</h1>
          <div className="hobbies-info">
            <p className="blurb">Feel free to scroll through our list of hobbies, or take our quiz to be shown a personalized list of hobbies you might enjoy!</p>
            <h3 className="section-title">All Hobbies</h3>
            <input className="search" type="text" name="searchFilter" placeholder="Search..." value={searchFilter} onChange={(event)=>{handleChange(event)}}/>
          </div>
          { hobbies.length > 0 ?
          <div className="hobbies-list">
            { hobbies.filter((hobby) => hobby.name.toLowerCase().includes(searchFilter) || hobby.description.toLowerCase().includes(searchFilter)).map((hobby: Hobby) => {
              return <div key={hobby.id} className="hobby">
                <Link to={`/hobbies/${hobby.id}`} className="body-link">
                  <h5>{hobby.name}</h5>
                  <p>{hobby.description}</p>
                </Link>
              </div>
            })}
          </div>
            :
          <div>
            <h3>Loading...</h3>
          </div>

          }
        </div>
      </div>
    </>
  )
}

export default List;

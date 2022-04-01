import { useParams} from 'react-router-dom'


const Hobby = ():any => {
  let params = useParams();

  return (
    <div className="content">
      <h2>{params.hobbyId}</h2>
    </div>
  )
}

export default Hobby

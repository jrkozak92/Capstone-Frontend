import { useParams} from 'react-router-dom'


const Hobby = ():any => {
  let params = useParams();

  return (
    <h2>{params.hobbyId}</h2>
  )
}

export default Hobby

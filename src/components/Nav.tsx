import { useState, useEffect } from 'react'
import Add from './Add'

const Nav = () => {
  const [dropdown, setDropdown] = useState('')



  return (
    <div>
    { dropdown === 'add' ?
      <Add/>
        :
      Add
    }
    </div>
  )
}

export default Nav

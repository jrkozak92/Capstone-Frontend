import { useState, useEffect } from 'react'
import Add from './Add'
import '../App.css';

const Nav = () => {
  const [dropdown, setDropdown] = useState<string>('')

  const showMenu = (selection: string) => {
    if (selection === dropdown){
      setDropdown('')
    } else {
      setDropdown(selection)
    }
  }

  return (
    <nav className="nav-bar">
      <div>
        <h3 className="menu-item" onClick={()=>{showMenu('add')}}>Add</h3>
        { dropdown === 'add' ?
          <Add/>
            :
          null
        }
      </div>
    </nav>
  )
}

export default Nav

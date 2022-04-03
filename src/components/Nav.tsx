import { useState, useEffect } from 'react'
import Add from './Add'
import '../App.css';
import { Routes, Route, NavLink } from 'react-router-dom'

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
      <div>
        <NavLink className="menu-item" to="/hobbies" onClick={()=>{showMenu('')}}>Hobbies</NavLink>
      </div>
      <div>
        <NavLink className="menu-item about" to="/about" onClick={()=>{showMenu('')}}>About</NavLink>
      </div>
    </nav>
  )
}

export default Nav

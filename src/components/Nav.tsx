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
        <NavLink className="menu-item" to="/add">Add</NavLink>
      </div>
      <div>
        <NavLink className="menu-item" to="/hobbies">Hobbies</NavLink>
      </div>
      <div>
        <NavLink className="menu-item about" to="/about">About</NavLink>
      </div>
    </nav>
  )
}

export default Nav

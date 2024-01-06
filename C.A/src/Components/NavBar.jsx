import React from "react"
import { Link } from "react-router-dom"
import "../App.css"
//Imports
const NavBar = (props) => {
  //Setting the search value to the input
  const SettingInput = (e) => {
    props.setSubmit.setInput(e.target.value)
  }

  return (
    <div className='Navbar'>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <a href="https://kalvium.community/" target="_blank">
          <img src="https://kalvium.community/images/sidebar-3d-logo.svg" alt="" />
        </a>
        <h2>Kalvium Books</h2>
      </div>
      <div className="search">
        <input type="text" placeholder='Search books' onChange={(e) => { SettingInput(e) }} />
      </div>
      <Link to={"/Form"}>
        {props.setSubmit.Submit ? <button>Login</button> : <button>Sign-Up</button>}
      </Link>
    </div>
  )
}

export default NavBar

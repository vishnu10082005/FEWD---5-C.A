import React, { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Form from './Components/Form'
import Main from './Components/Main'
import NavBar from './Components/NavBar'

function App() {
 const[Submit,setSubmit]=useState(false)
 const[search,setInput]=useState("")
  return (
    <>
 
    <NavBar setSubmit={{Submit,setSubmit,search,setInput}}/>
    {/* <Main/> */}
      <Routes>
      <Route path={"/Form"} element={<Form setSubmit={{Submit,setSubmit,search,setInput}} />}/>
      <Route path={"/"} element={<Main setSubmit={{Submit,search,setInput}} />}/>
      </Routes>
    </>
  )
}

export default App

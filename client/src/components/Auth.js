import React, { useState, useContext } from "react";
import AuthForm from "./Forms/AuthForm";

import { AppContext } from "../Context/AppProvider";

export default function Auth(){
  const {login, signUp, errMsg, resetAuthErrMsg} = useContext(AppContext)
  const initState = {username: "", password: ""}
  const [toggle, setToggle] = useState(false)
  const [authInputs, setAuthInputs] = useState(initState)

  function handleChange(e) {
    const { name, value } = e.target
    setAuthInputs(prevState => ({
      ...prevState, [name]:value
    }))
  }
  function logIn(e){
    e.preventDefault()
    login(authInputs)
  }
  function signup(e){
    e.preventDefault()
    signUp(authInputs)
  }
  function toggleForm(e){
    e.preventDefault()
    setToggle(prevState => !prevState)
    resetAuthErrMsg()
  }
  return (
    <div>
      {!toggle ?
        <> 
          <AuthForm 
          formtitle = "Sign In"
          formbtn = "Sign In"
          handlechange={handleChange}
          toggleform={toggleForm}
          submit={logIn}
          inputs={authInputs}
          errmsg={errMsg}
          />
        </>  
        :
        <>
          <AuthForm 
          formtitle = "Sign Up"
          formbtn = "Sign Up"
          handlechange={handleChange}
          toggleform={toggleForm}
          submit={signup}
          inputs={authInputs}
          errmsg={errMsg}
          />
        </>
      }  
    </div>
  )
}
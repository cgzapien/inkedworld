import React, { useState } from "react";
import axios from "axios"

export const AppContext = React.createContext()

const userAxios = axios.create()
  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

export default function AppProvider(props){
  const initState = {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
    errMsg: "",
    userThreads: JSON.parse(localStorage.getItem("userthreads")) || [],
    allThreads: JSON.parse(localStorage.getItem("allthreads")) || []
  }
  const [userState, setUserState] = useState(initState)

  //---LOGIN---//
  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        console.log(res)
        const { token, user } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserThreads()
        getAllThreads()
        setUserState(prevUserState => ({...prevUserState, user, token}))
      })
      .catch(err => handleAuthErrMsg(err.response.data.errMsg))
  }

  //---SIGNUP---//
  function signUp(credentials){
    axios.post("/auth/signup", credentials)
      .then(res => {
        console.log(res)
        const { token, user } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getAllThreads()
        getUserThreads()
        setUserState(prevUserState => ({...prevUserState, user, token}))
      })
      .catch(err => handleAuthErrMsg(err.response.data.errMsg))
  }
  //---LOGOUT---//
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userthreads")
    localStorage.removeItem("allthreads")
    setUserState({
      token: "",
      user: {},
      errMsg: ""
    })
  }
  //---HANDLE AUTH ERR---//
  function handleAuthErrMsg(errMsg){
    setUserState(prevState => ({...prevState, errMsg}))
  }
  //---RESET AUTH ERR---//
  function resetAuthErrMsg(){
    setUserState(prevState => ({...prevState, errMsg: ""}))
  }
//----THREADS----//

//---GET USER THREADS---//
  function getUserThreads(){
    userAxios.get("/api/thread/user")
      .then(res => {
        localStorage.setItem("userthreads", JSON.stringify(res.data))
        setUserState(prevState => ({
          ...prevState,
          userThreads: res.data
        }))
      })
      .catch(err => console.log(err))
  }
//---GET ALL THREADS---//
function getAllThreads(){
  userAxios.get("/api/thread")
    .then(res => {
      localStorage.setItem("allthreads", JSON.stringify(res.data))
      setUserState(prevState => ({
        ...prevState, 
        allThreads: res.data
      }))
    })
    .catch(err => console.log(err))
}
//---ADD A THREAD---//
function addThread(newThread){
  console.log('newThread: ', newThread);
  userAxios.post("/api/thread/", newThread)
    .then(res => {
      console.log(res)
      setUserState(prevState => {console.log(prevState.userThreads) 
        return ({
        ...prevState,
        userThreads: [...prevState.userThreads, res.data],
        allThreads: [...prevState.allThreads, res.data]
      })})
    })
    .catch(err => console.log(err))
}
//---DELETE THREAD BY ID---//
function deleteThread(id){
  console.log('id: ', id);
  userAxios.delete(`/api/thread/${id}`)
    .then(res => {
      setUserState(prevState => ({
        ...prevState,
        userThreads: prevState.userThreads.filter(thread => thread._id !== id),
        allThreads: prevState.allThreads.filter(thread => thread._id !== id)
      }))
    })
    .catch(err => console.log(err))
}
//---COMMENTS---//

  return (
    <AppContext.Provider
    value={{
      ...userState,
      login,
      signUp,
      resetAuthErrMsg,
      logout,
      addThread,
      deleteThread
    }}>
      { props.children }
    </AppContext.Provider>
  )
}
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";

import Auth from "./components/Auth";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import Threads from "./components/Threads";
import ThreadDetails from "./components/ThreadDetails";
import { AppContext } from "./Context/AppProvider";
import "./style.css"


export default function App(){
  const { token } = useContext(AppContext)
  return (
    <div>
      {token && <Navbar />}
      <Switch>
        <Route 
          exact path="/" 
          render={() => token ? <Redirect to="/home" /> : <Auth />}
        />
        <ProtectedRoute
        path="/home"
        component={Home}
        redirectTo="/"
        token={token}
        />
        <ProtectedRoute
        path="/threads"
        component={Threads}
        redirectTo="/"
        token={token}
        />
        <ProtectedRoute
        path="/profile"
        component={Profile}
        redirectTo="/"
        token={token}
        />
        <ProtectedRoute
        path="/thread/:threadId"
        component={ThreadDetails}
        redirectTo="/"
        token={token}
        />
      </Switch>
    </div>
  )
}
import React from "react"
import ReactDOM from "react-dom"


import { BrowserRouter } from "react-router-dom"
import App from "./App"
import AppProvider from "./Context/AppProvider"

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById("root")
)
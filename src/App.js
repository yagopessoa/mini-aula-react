import React, { Component } from 'react'
import './App.css'
import 'typeface-roboto'
import LoginCard from './Components/LoginCard'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginCard />
        </header>
      </div>
    )
  }
}

export default App

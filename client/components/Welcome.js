import React from 'react'
import {Signup} from '../components'

const Welcome = props => {
  return (
    <div className="welcome-container">
      <div>
        <h1>Welcome to</h1>
        <img className="welcome-logo" src="/images/logoLetters.png" />
        <p align="center">
          The best place to catalogue your vinyl collection online
        </p>
      </div>
      <div>
        <h1 className="create-account">Create a New Account:</h1>
        <h2>It's free!</h2>
        <Signup />
      </div>
    </div>
  )
}

export default Welcome

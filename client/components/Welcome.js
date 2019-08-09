import React from 'react'
import {Signup} from '../components'
import Container from 'react-bootstrap/Container'

const Welcome = () => {
  return (
    <div className="welcome-container">
      <Container>
        <h1>Welcome to</h1>
        <img className="welcome-logo" src="/images/logoLetters.png" />
        <p align="center">
          The best place to catalogue your vinyl collection online
        </p>
      </Container>
      <div>
        <h1 className="create-account">Create a New Account:</h1>
        <h2>It's free!</h2>
        <Signup />
      </div>
    </div>
  )
}

export default Welcome

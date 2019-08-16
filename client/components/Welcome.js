import React from 'react'
import {Signup} from '../components'
import Container from 'react-bootstrap/Container'

const Welcome = () => {
  return (
    <Container className="welcome-container">
      <div>
        <br />
        <h1>Welcome to</h1>
        <img className="welcome-logo" src="/images/logoLetters.png" />
        <p align="center">Vinyl Collecting for the Internet Age</p>
      </div>
      <div>
        <br />
        <h1 className="create-account">Create a New Account:</h1>
        <h2>It's free!</h2>
        <Signup />
      </div>
    </Container>
  )
}

export default Welcome

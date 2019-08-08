import React from 'react'
import Container from 'react-bootstrap/Container'

export const LoadingScreen = () => {
  return (
    <Container>
      <img src="/images/logo.png" className="loading-image" />
    </Container>
  )
}

export default LoadingScreen

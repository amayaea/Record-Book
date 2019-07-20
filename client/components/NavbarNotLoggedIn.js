import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavbarNotLoggedIn = props => {
  return (
    <Navbar bg="warning" variant="primary" fixed="top">
      <Navbar.Brand>
        <img
          alt=""
          src="/images/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {' Record Book'}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Nav.Link to="/login">Login</Nav.Link>
      <Nav.Link to="/signup">Sign Up</Nav.Link>
    </Navbar>
  )
}

export default NavbarNotLoggedIn

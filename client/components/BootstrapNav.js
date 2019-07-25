import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {searchAlbums} from '../store'
import {NavLink as Link} from 'react-router-dom'

export class BootstrapNav extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange() {
    this.setState({
      search: event.target.value
    })
  }

  // FIX ME
  handleSubmit() {
    console.log('submit')
    this.props.handleSearch(this.state.search)
  }

  render() {
    const loggedIn = this.props.loggedIn
    return (
      <Navbar bg="yellow" variant="primary">
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
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
          <Link to={`/search/${this.state.search}`}>
            <Button
              type="submit"
              variant="dark"
              onClick={() => this.props.handleSearch(this.state.search)}
            >
              Search
            </Button>
          </Link>
        </Form>
        {loggedIn ? (
          <>
            <Nav.Link to="/user">Profile</Nav.Link>
            <Nav.Link to="/settings">Settings</Nav.Link>
          </>
        ) : (
          <Nav.Link className="nav-link-right" to="/login">
            Login
          </Nav.Link>
        )}
        {/* <Nav.Link to="/signup">Sign Up</Nav.Link> */}
      </Navbar>
    )
  }
}

const mapDispatch = dispatch => ({
  handleSearch: search => dispatch(searchAlbums(search))
})

export default connect(null, mapDispatch)(BootstrapNav)

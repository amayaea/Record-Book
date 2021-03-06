import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {searchAlbums, logout} from '../store'
import {NavLink as Link} from 'react-router-dom'

export class BootstrapNav extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.redirect = this.redirect.bind(this)
  }

  handleChange() {
    this.setState({
      search: event.target.value
    })
  }

  handleSubmit() {
    this.props.handleSearch(this.state.search)
  }

  redirect() {
    if (this.props.loggedIn) return '/discover/for-you'
    else return '/'
  }

  render() {
    const loggedIn = this.props.loggedIn
    return (
      <>
        <Navbar bg="yellow" variant="primary">
          <Navbar.Brand href={this.redirect()}>
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

          <Navbar.Collapse className="justify-content-end">
            {loggedIn ? (
              <>
                <Nav.Item>
                  <Nav.Link href="/discover/for-you">Discover</Nav.Link>
                </Nav.Item>
                <Nav.Link href={`/user/${this.props.user.id}`}>
                  Profile
                </Nav.Link>
                {/* <Nav.Link href="/settings">Settings</Nav.Link> */}
                <Nav.Link href="#" onClick={this.props.handleClick}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
        {/* <Nav.Link to="/signup">Sign Up</Nav.Link> */}
      </>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  handleSearch: search => dispatch(searchAlbums(search)),
  handleClick() {
    dispatch(logout())
  }
})

export default connect(mapState, mapDispatch)(BootstrapNav)

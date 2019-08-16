import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AlbumViewList, AlbumViewCard, LoadingScreen} from '../components'
import {withRouter} from 'react-router'
import {getRecs, sortAlbums, getBest} from '../store'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import history from '../history'

export class Discover extends Component {
  constructor() {
    super()
    this.state = {
      display: 'grid',
      isLoading: true
    }
    this.setDisplay = this.setDisplay.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  async componentDidMount() {
    const page = this.props.match.params.page
    if (page === 'for-you') await this.props.getRecs()
    else await this.props.getBest(page)
    this.setState({
      isLoading: false
    })
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      const page = this.props.match.params.page
      if (page === 'for-you') await this.props.getRecs()
      else await this.props.getBest(page)
    }
    if (this.state.isLoading) {
      this.setState({
        isLoading: false
      })
    }
  }

  setDisplay(display) {
    this.setState({
      display: display
    })
  }

  handleSort(sortKey) {
    this.props.sortAlbums(sortKey)
  }

  handleSelect(eventKey) {
    history.push(`/discover/${eventKey}`)
  }

  render() {
    const page = this.props.match.params.page
    if (this.state.isLoading) {
      return <LoadingScreen />
    } else
      return (
        <div>
          <br />
          <Container>
            <h2>Discover</h2>
            <Tabs
              activeKey={page}
              id="uncontrolled-tab-example"
              onSelect={this.handleSelect}
            >
              <Tab eventKey="for-you" title="For You" />
              <Tab eventKey="best-rated" title="Best Rated" />
              <Tab eventKey="most-popular" title="Most Popular" />
            </Tabs>
          </Container>
          {this.props.albums.length === 0 ? (
            <Container>
              <br />
              <h1>There are no recommendations</h1>
            </Container>
          ) : (
            <>
              <Container>
                <br />
                <Nav>
                  <NavDropdown
                    className="view-dropdown"
                    title="View"
                    id="nav-dropdown-view"
                    onSelect={this.setDisplay}
                  >
                    <NavDropdown.Item eventKey="list">List</NavDropdown.Item>
                    <NavDropdown.Item eventKey="grid">Grid</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    className="sort-dropdown"
                    title="Sort"
                    id="nav-dropdown-sort"
                    onSelect={this.handleSort}
                  >
                    <NavDropdown.Item eventKey="artist">
                      Artist Name
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="name">
                      Album Name
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <br />
              </Container>

              {this.state.display === 'list' ? (
                <Container>
                  <AlbumViewList discover={true} />
                </Container>
              ) : (
                <Container>
                  <AlbumViewCard discover={true} />
                </Container>
              )}
            </>
          )}
        </div>
      )
  }
}

const mapState = state => {
  return {
    albums: state.albums
  }
}

const mapDispatch = dispatch => ({
  getRecs: () => dispatch(getRecs()),
  sortAlbums: sortKey => dispatch(sortAlbums(sortKey)),
  getBest: pageKey => dispatch(getBest(pageKey))
})

export default withRouter(connect(mapState, mapDispatch)(Discover))

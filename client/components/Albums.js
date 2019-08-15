import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AlbumViewList, AlbumViewCard, LoadingScreen} from '../components'
import {withRouter} from 'react-router'
import {searchAlbums, sortAlbums} from '../store'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'

export class Albums extends Component {
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
    const search = this.props.match.params.input
    if (this.props.albums.length === 0) await this.props.getAlbums(search)
    this.setState({
      isLoading: false
    })
  }

  componentDidUpdate() {
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

  render() {
    const search = this.props.match.params.input
    if (this.state.isLoading) {
      return <LoadingScreen />
    } else
      return (
        <div>
          <br />
          {this.props.albums.length === 0 ? (
            <Container>
              <h1>No results for: {search}</h1>
            </Container>
          ) : (
            <>
              <Container>
                <h1>Results For: {search}</h1>
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
                <AlbumViewList />
              ) : (
                <AlbumViewCard />
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
  getAlbums: search => dispatch(searchAlbums(search)),
  sortAlbums: sortKey => dispatch(sortAlbums(sortKey))
})

export default withRouter(connect(mapState, mapDispatch)(Albums))

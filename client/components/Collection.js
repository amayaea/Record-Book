import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CollectionViewList, CollectionViewCard} from '.'
import {withRouter} from 'react-router'
import {sortAlbums} from '../store'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'

export class Collection extends Component {
  constructor() {
    super()
    this.state = {
      display: 'grid'
    }
    this.setDisplay = this.setDisplay.bind(this)
    this.handleSort = this.handleSort.bind(this)
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
    return (
      <div>
        <br />
        <Container>
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
              <NavDropdown.Item eventKey="artist">Artist Name</NavDropdown.Item>
              <NavDropdown.Item eventKey="name">Album Name</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <br />
        </Container>

        {this.state.display === 'list' ? (
          <CollectionViewList
            type={this.props.type}
            collection={this.props.collection}
          />
        ) : (
          <CollectionViewCard
            type={this.props.type}
            collection={this.props.collection}
          />
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  sortAlbums: sortKey => dispatch(sortAlbums(sortKey))
})

export default withRouter(connect(null, mapDispatch)(Collection))

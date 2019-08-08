import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {getSingleAlbum} from '../store'
import {AddToDropdown, Tracklist} from '../components'
import Container from 'react-bootstrap/Container'
import Media from 'react-bootstrap/Media'

const _ = require('lodash/lang')

class SingleAlbum extends Component {
  componentDidMount() {
    const albumId = this.props.match.params.id
    if (_.isEmpty(this.props.singleAlbum)) this.props.getAlbum(albumId)
    console.log(this.props.singleAlbum)
  }
  render() {
    const album = this.props.singleAlbum
    return (
      <Container>
        <br />
        <Media>
          <img
            width={384}
            height={384}
            src={album.imageUrl}
            alt="album image"
          />
          <Media.Body bsPrefix="single-album-body">
            <h1>{album.name}</h1>
            <h4>Artist: {album.artist}</h4>
            <h4>Genre: {album.genre}</h4>
            <h4>
              Labels:{' '}
              {album.labels &&
                album.labels.map((label, index) => {
                  if (index === album.labels.length - 1) return `${label.name}`
                  else return `${label.name}, `
                })}
            </h4>
            <h4>
              Styles:{' '}
              {album.styles &&
                album.styles.map((style, index) => {
                  if (index === album.styles.length - 1) return `${style}`
                  else return `${style}, `
                })}
            </h4>
            <h4>Country: {album.country}</h4>
            <h4>Year: {album.year}</h4>
            <br />
            <AddToDropdown />
          </Media.Body>
        </Media>
        <br />
        <Tracklist tracklist={album.tracklist} />
      </Container>
    )
  }
}

const mapState = state => {
  return {
    singleAlbum: state.singleAlbum
  }
}

const mapDispatch = dispatch => ({
  getAlbum: album => dispatch(getSingleAlbum(album))
})

export default connect(mapState, mapDispatch)(SingleAlbum)

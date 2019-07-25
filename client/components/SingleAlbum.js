require('../../secrets')
import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {getSingleAlbum} from '../store'
import axios from 'axios'
import Media from 'react-bootstrap/Media'

const apiKey = process.env.LASTFM_API_KEY
const rootUrl = 'http://ws.audioscrobbler.com/2.0/'

class SingleAlbum extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      show: null,
      selectedAlbum: null
    }
  }

  async componentDidUpdate() {
    console.log('update')
    if (this.state.selectedAlbum === null) {
      const album = this.props.album
      let query = `${rootUrl}?method=album.getinfo&api_key=${apiKey}`
      if (album.mbid !== '' || null)
        query = `${query}&mbid=${album.mbid}&format=json`
      else
        query = `${query}&artist=${album.artist}&album=${
          album.name
        }&format=json`
      const searchResult = await axios.get(query)
      const albumInfo = searchResult.data.album
      console.log(albumInfo)
      const newAlbum = {
        name: albumInfo.name,
        artist: albumInfo.artist,
        mbid: albumInfo.mbid,
        imageUrl: albumInfo.image[3]['#text'],
        summary: albumInfo.wiki.summary.substring(
          0,
          albumInfo.wiki.summary.indexOf('<')
        ),
        release: albumInfo.wiki.published.substring(
          0,
          albumInfo.wiki.published.indexOf(',')
        )
      }
      console.log(newAlbum)
      this.setState({
        selectedAlbum: newAlbum
      })
      console.log(this.state)
    }
  }

  handleClose() {
    this.setState({show: null})
  }

  handleShow(id) {
    this.setState({show: id})
  }

  render() {
    return (
      <>
        <Button variant="link" onClick={() => this.handleShow(this.props.id)}>
          {this.props.album.name}
        </Button>

        <Modal
          show={this.state.show === this.props.id}
          onHide={this.handleClose}
          id={this.props.id}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.album.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Media>
              <img
                width={256}
                height={256}
                className="mr-3"
                src={this.props.album.imageUrl}
                alt="Album Art"
              />
              <Media.Body>
                <h5>Artist: {this.props.album.artist}</h5>
                <h5>
                  Released:{' '}
                  {this.state.selectedAlbum && this.state.selectedAlbum.release}
                </h5>
                <h5>Summary:</h5>
                <p>
                  {this.state.selectedAlbum && this.state.selectedAlbum.summary}
                </p>
              </Media.Body>
            </Media>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
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

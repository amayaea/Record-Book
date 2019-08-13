import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleAlbum} from '../store'
import {AddToDropdown, Tracklist, LoadingScreen} from '../components'
import Container from 'react-bootstrap/Container'
import Media from 'react-bootstrap/Media'
import history from '../history'

const _ = require('lodash/lang')

class SingleAlbum extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    const albumId = this.props.match.params.id
    if (_.isEmpty(this.props.singleAlbum)) {
      if (this.props.match.path.includes('master'))
        this.props.getAlbum(albumId, true)
      this.props.getAlbum(albumId)
    }
    console.log(this.props)
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      this.setState({
        isLoading: false
      })
    }
  }

  handleClick() {
    const master = this.props.getAlbum(this.props.singleAlbum.masterId, true)
    history.push(`/album/${master.id}`)
  }

  // eslint-disable-next-line complexity
  render() {
    const album = this.props.singleAlbum
    if (this.state.isLoading) {
      return <LoadingScreen />
    } else {
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
              <h4>Format: {album.format && album.format.join(', ')}</h4>
              <h4>Genre: {album.genre && album.genre.join(', ')}</h4>
              <h4>Styles: {album.styles && album.styles.join(', ')}</h4>
              <h4>Labels: {album.label && album.label.join(', ')}</h4>
              <h4>Country: {album.country}</h4>
              <h4>
                Released: {album.year}{' '}
                {/* For some reason Discogs won't let me get info on master releases bc of CORS policy? */}
                {/* <Button variant="link" href={`/album/master/${album.masterId}`}>
                See Master Release
              </Button> */}
              </h4>
              <br />
              <AddToDropdown album={album} />
            </Media.Body>
          </Media>
          <br />
          <Tracklist tracklist={album.tracklist} />
          <br />
          <Container>
            {album.identifiers && <h3>Identifiers </h3>}
            {album.identifiers &&
              album.identifiers.map((iden, index) => {
                return (
                  <div key={index}>
                    <span>
                      {iden.type}: {iden.value}
                    </span>
                    <br />
                  </div>
                )
              })}
            <br />
            <h3>{album.notes !== undefined && 'About'}</h3>
            <p>{album.notes}</p>
          </Container>
        </Container>
      )
    }
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

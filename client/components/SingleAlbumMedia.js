import React, {Component} from 'react'
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button'
import {AddToDropdown} from '../components'
import {connect} from 'react-redux'

export class SingleAlbumMedias extends Component {
  render() {
    const album = this.props.singleAlbum
    return (
      <Media>
        <img width={384} height={384} src={album.imageUrl} alt="album image" />
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
          {this.props.noDrop ? '' : <AddToDropdown album={album} />}
        </Media.Body>
      </Media>
    )
  }
}

const mapState = state => {
  return {
    singleAlbum: state.singleAlbum
  }
}

export default connect(mapState)(SingleAlbumMedias)

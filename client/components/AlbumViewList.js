import React from 'react'
import {connect} from 'react-redux'
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button'
import {SingleAlbum} from '../components'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export const AlbumViewList = props => {
  const albums = props.albums
  return albums.map((album, index) => (
    <div key={index}>
      <Media>
        <img
          width={128}
          height={128}
          className="mr-3"
          src={album.imageUrl}
          alt="Album Art"
        />
        <Media.Body>
          <h5>
            <SingleAlbum album={album} id={index} />
          </h5>
          <h6>{album.artist}</h6>
        </Media.Body>
      </Media>
      <br />
    </div>
  ))
}

const mapState = state => {
  return {
    albums: state.albums
  }
}

export default connect(mapState)(AlbumViewList)

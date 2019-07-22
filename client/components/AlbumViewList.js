import React from 'react'
import {connect} from 'react-redux'
import Media from 'react-bootstrap/Media'

export const AlbumViewList = props => {
  const albums = props.albums
  return albums.map(album => {
    return (
      <>
        <Media>
          <img
            width={128}
            height={128}
            className="mr-3"
            src={album.image[3]['#text']}
            alt="Album Art"
          />
          <Media.Body>
            <h5>{album.name}</h5>
            <h6>{album.artist}</h6>
          </Media.Body>
        </Media>
        <br />
      </>
    )
  })
}

const mapState = state => {
  return {
    albums: state.albums
  }
}

export default connect(mapState)(AlbumViewList)

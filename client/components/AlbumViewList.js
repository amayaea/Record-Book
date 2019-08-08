import React from 'react'
import {connect} from 'react-redux'
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button'
import {AddToDropdown} from '../components'

export const AlbumViewList = props => {
  const albums = props.albums
  return albums.map(album => (
    <div key={album.id}>
      <Media>
        <img
          width={128}
          height={128}
          className="mr-3"
          src={album.imageUrl}
          alt="Album Art"
        />
        <Media.Body>
          <h4>
            <Button variant="link" href={`/album/${album.id}`}>
              {album.name}
            </Button>
          </h4>
          <h6>{album.artist}</h6>
          <AddToDropdown />
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

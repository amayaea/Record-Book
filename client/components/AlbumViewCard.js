import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {AddToDropdown} from '../components'

export const AlbumViewCard = props => {
  const albums = props.albums
  return (
    <div className="albumsContainer">
      {albums.map(album => (
        <Card style={{width: '14rem'}} key={album.id}>
          <Card.Img variant="top" src={album.imageUrl} />
          <Card.Body>
            <Card.Title>
              <Button variant="link" href={`/album/${album.id}`}>
                {album.name}
              </Button>
            </Card.Title>
            <Card.Text>
              <b>{album.artist}</b>
              <br />
              {!props.discover &&
                `Format: ${album.format && album.format.join(', ')}`}
            </Card.Text>
            <AddToDropdown album={album} />
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

const mapState = state => {
  return {
    albums: state.albums
  }
}

export default connect(mapState)(AlbumViewCard)

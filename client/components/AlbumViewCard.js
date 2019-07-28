import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {SingleAlbum, AddToDropdown} from '../components'

export const AlbumViewCard = props => {
  const albums = props.albums
  return (
    <div className="albumsContainer">
      {albums.map((album, index) => (
        <Card style={{width: '14rem'}} key={index}>
          <Card.Img variant="top" src={album.imageUrl} />
          <Card.Body>
            <Card.Title>
              <Button variant="link">{album.name}</Button>
            </Card.Title>
            <Card.Text>{album.artist}</Card.Text>
            <AddToDropdown />
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

import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const AlbumViewCard = props => {
  const albums = props.albums
  return (
    <div className="albumsContainer">
      {albums.map(album => (
        <Card style={{width: '14rem'}}>
          <Card.Img variant="top" src={album.image[3]['#text']} />
          <Card.Body>
            <Card.Title>{album.name}</Card.Title>
            <Card.Text>{album.artist}</Card.Text>
            <Button variant="dark">Go somewhere</Button>
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

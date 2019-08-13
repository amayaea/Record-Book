import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {AddToDropdown} from '../components'

export const CollectionViewCard = props => {
  console.log(props)

  const findCollection = collections => {
    collections.forEach(collection => {
      console.log(collection.type, props.type)
      if (collection.type === props.type) {
        console.log('match')
        return collection
      }
    })
    return undefined
  }

  const collection = findCollection(props.collection)
  console.log(collection)

  return (
    <div className="albumsContainer">
      {/* {collection.records.map(album => (
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
              Format: {album.format && album.format.join(', ')}
            </Card.Text>
            <AddToDropdown album={album} />
          </Card.Body>
        </Card>
      ))} */}
    </div>
  )
}

export default CollectionViewCard

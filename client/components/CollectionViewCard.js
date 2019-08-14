import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {AddToDropdown} from '../components'

export const CollectionViewCard = props => {
  let collection
  // Collection is stored in the 0 index of collection store while wantlist is stored in 1 index of collection store
  if (props.type === 'collection') collection = props.collection[0]
  else collection = props.collection[1]

  return (
    <div className="albumsContainer">
      {collection.records.map(record => (
        <Card style={{width: '14rem'}} key={record.id}>
          <Card.Img variant="top" src={record.album.imageUrl} />
          <Card.Body>
            <Card.Title>
              <Button variant="link" href={`/album/${record.album.id}`}>
                {record.album.name}
              </Button>
            </Card.Title>
            <Card.Text>
              <b>{record.album.artist}</b>
              <br />
              Format:{' '}
              {record.album.formats &&
                record.album.formats.map((format, index) => {
                  if (index === record.album.formats.length - 1)
                    return format.name
                  else return `${format.name}, `
                })}
            </Card.Text>
            <AddToDropdown album={record.album} />
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default CollectionViewCard

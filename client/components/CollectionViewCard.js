import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import history from '../history'
import {deleteFromCollection} from '../store'

export const CollectionViewCard = props => {
  let collection
  // Collection is stored in the 0 index of collection store while wantlist is stored in 1 index of collection store
  if (props.type === 'collection') collection = props.collection[0]
  else collection = props.collection[1]

  return (
    <div className="albumsContainer">
      {collection.records &&
        collection.records.map(record => (
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
              {collection.type === 'wantlist' ? (
                <>
                  <Button
                    variant="dark"
                    onClick={() => {
                      history.push(`/add-to-collection/${record.album.id}`)
                    }}
                  >
                    Add to Collection
                  </Button>
                </>
              ) : (
                <div>
                  {record.sleeveCondition && (
                    <span>
                      Sleeve Condition:{' '}
                      <strong>{record.sleeveCondition}</strong>{' '}
                    </span>
                  )}
                  {record.mediaCondition && (
                    <span>
                      Media Condition: <strong>{record.mediaCondition}</strong>{' '}
                    </span>
                  )}
                  Rating: <strong>{record.like ? 'Like' : 'Dislike'}</strong>
                </div>
              )}
              <br />
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => props.deleteRecord(record.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  )
}

const mapState = state => {
  return {
    collections: state.collections
  }
}

const mapDispatch = dispatch => ({
  deleteRecord: recordId => dispatch(deleteFromCollection(recordId))
})

export default connect(mapState, mapDispatch)(CollectionViewCard)

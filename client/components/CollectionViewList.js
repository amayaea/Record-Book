import React from 'react'
import {connect} from 'react-redux'
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {deleteFromCollection} from '../store'

export const CollectionViewList = props => {
  let collection
  // Collection is stored in the 0 index of collection store while wantlist is stored in 1 index of collection store
  if (props.type === 'collection') collection = props.collection[0]
  else collection = props.collection[1]

  return collection.records.map(record => (
    <div key={record.id}>
      <Media>
        <img
          width={128}
          height={128}
          className="mr-3"
          src={record.album.imageUrl}
          alt="Album Art"
        />
        <Media.Body>
          <Row>
            <Col>
              <h4>
                <Button variant="link" href={`/album/${record.album.id}`}>
                  {record.album.name}
                </Button>
              </h4>
              <h5>{record.album.artist}</h5>
              <h6>
                Format:{' '}
                {record.album.formats &&
                  record.album.formats.map((format, index) => {
                    if (index === record.album.formats.length - 1)
                      return format.name
                    else return `${format.name}, `
                  })}
              </h6>
            </Col>
            {collection.type === 'wantlist' ? (
              <div>
                <br />
                <Button
                  variant="dark"
                  className="collection"
                  block={false}
                  onClick={() => {
                    history.push(`/add-to-collection/${record.album.id}`)
                  }}
                >
                  Add to Collection
                </Button>
              </div>
            ) : (
              <div>
                <br />
                {record.sleeveCondition && (
                  <span>
                    Sleeve Condition: <strong>{record.sleeveCondition}</strong>{' '}
                  </span>
                )}
                <br />
                {record.mediaCondition && (
                  <span>
                    Media Condition: <strong>{record.mediaCondition}</strong>{' '}
                  </span>
                )}
                <br />
                Rating: <strong>{record.like ? 'Like' : 'Dislike'}</strong>
              </div>
            )}

            <br />
            <br />

            <Button
              block={false}
              variant="outline-dark"
              className="collection-list"
              size="sm"
              onClick={() => props.deleteRecord(record.id)}
            >
              Delete
            </Button>
          </Row>
        </Media.Body>
      </Media>
      <br />
    </div>
  ))
}

const mapState = state => {
  return {
    collections: state.collections
  }
}

const mapDispatch = dispatch => ({
  deleteRecord: recordId => dispatch(deleteFromCollection(recordId))
})

export default connect(mapState, mapDispatch)(CollectionViewList)

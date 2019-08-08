import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const TrackList = props => {
  const tracklist = props.tracklist
  return (
    <Container>
      <h2>Tracklist </h2>
      {tracklist &&
        tracklist.map((track, index) => {
          return (
            <Row key={index} className="justify-content-md-center">
              <Col>
                {track.position}. {track.title}
              </Col>
              <Col />
              <Col>{track.duration}</Col>
            </Row>
          )
        })}
    </Container>
  )
}

export default TrackList

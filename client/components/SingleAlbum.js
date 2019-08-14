import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleAlbum} from '../store'
import {Tracklist, LoadingScreen, SingleAlbumMedia} from '../components'
import Container from 'react-bootstrap/Container'

import history from '../history'

const _ = require('lodash/lang')

class SingleAlbum extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    const albumId = this.props.match.params.id
    if (_.isEmpty(this.props.singleAlbum)) {
      if (this.props.match.path.includes('master'))
        await this.props.getAlbum(albumId, true)
      else await this.props.getAlbum(albumId)
    }
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      this.setState({
        isLoading: false
      })
    }
  }

  // To get master release
  handleClick() {
    const master = this.props.getAlbum(this.props.singleAlbum.masterId, true)
    history.push(`/album/${master.id}`)
  }

  // eslint-disable-next-line complexity
  render() {
    const album = this.props.singleAlbum
    if (this.state.isLoading) {
      return <LoadingScreen />
    } else {
      return (
        <Container>
          <br />
          <SingleAlbumMedia />
          <br />
          <Tracklist tracklist={album.tracklist} />
          <br />
          <Container>
            {album.identifiers && <h3>Identifiers </h3>}
            {album.identifiers &&
              album.identifiers.map((iden, index) => {
                return (
                  <div key={index}>
                    <span>
                      {iden.type}: {iden.value}
                    </span>
                    <br />
                  </div>
                )
              })}
            <br />
            <h3>{album.notes !== undefined && 'About'}</h3>
            <p>{album.notes}</p>
          </Container>
        </Container>
      )
    }
  }
}

const mapState = state => {
  return {
    singleAlbum: state.singleAlbum
  }
}

const mapDispatch = dispatch => ({
  getAlbum: album => dispatch(getSingleAlbum(album))
})

export default connect(mapState, mapDispatch)(SingleAlbum)

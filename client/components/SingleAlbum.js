import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {getSingleAlbum} from '../store'
import {Container} from 'react-bootstrap/Container'
import Media from 'react-bootstrap/Media'

const _ = require('lodash/lang')

class SingleAlbum extends Component {
  componentDidMount() {
    const albumId = this.props.match.params.id
    if (_.isEmpty(this.props.singleAlbum)) this.props.getAlbum(albumId)
    console.log(this.props.singleAlbum)
  }
  render() {
    const album = this.props.singleAlbum
    return <Container>{/* <h1>{album.name}</h1> */}</Container>
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

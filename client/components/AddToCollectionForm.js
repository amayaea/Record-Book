import React, {Component} from 'react'
import {SingleAlbumMedia} from '../components'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import {getSingleAlbum, addTo} from '../store'
import {connect} from 'react-redux'
import history from '../history'

const _ = require('lodash/lang')

export class AddToCollectionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sleeveCondition: undefined,
      mediaCondition: undefined,
      like: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLike = this.handleLike.bind(this)
  }

  async componentDidMount() {
    console.log(this.props)
    const albumId = this.props.match.params.id
    if (_.isEmpty(this.props.singleAlbum)) {
      if (this.props.match.path.includes('master'))
        await this.props.getAlbum(albumId, true)
      else await this.props.getAlbum(albumId)
    }
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  async handleLike(event) {
    await this.setState({
      like: event
    })
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('prevent')
    addTo(this.props.singleAlbum, 'collection', this.state)
    history.push(`/user/${this.props.user.id}`)
  }

  render() {
    return (
      <Container>
        <br />
        <h1>Add to Collection</h1>
        <SingleAlbumMedia noDrop={true} />
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group controlId="formGridState">
              <Form.Label>Sleeve Condition</Form.Label>
              <Form.Control
                as="select"
                name="sleeveCondition"
                onChange={this.handleChange}
              >
                <option />
                <option>M</option>
                <option>NM</option>
                <option>VG+</option>
                <option>VG</option>
                <option>G+</option>
                <option>G</option>
                <option>P</option>
                <option>F</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridState">
              <Form.Label>Media Condition</Form.Label>
              <Form.Control
                as="select"
                name="mediaCondition"
                onChange={this.handleChange}
              >
                <option />
                <option>M</option>
                <option>NM</option>
                <option>VG+</option>
                <option>VG</option>
                <option>G+</option>
                <option>G</option>
                <option>P</option>
                <option>F</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <ToggleButtonGroup
                type="radio"
                name="like"
                defaultValue={true}
                variant="dark"
                onChange={this.handleLike}
              >
                <ToggleButton variant="dark" value={true}>
                  Like
                </ToggleButton>
                <ToggleButton variant="dark" value={false}>
                  Dislike
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
          </Form.Row>
          <Button type="submit" variant="dark">
            Add
          </Button>
        </Form>
        <br />
      </Container>
    )
  }
}

const mapState = state => {
  return {
    singleAlbum: state.singleAlbum,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  getAlbum: album => dispatch(getSingleAlbum(album))
})

export default connect(mapState, mapDispatch)(AddToCollectionForm)

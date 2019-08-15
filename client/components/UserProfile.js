import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {CollectionTabs, LoadingScreen} from '../components'
import {getCollections} from '../store/collection'
import Container from 'react-bootstrap/Container'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'

export class UserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    if (this.props.collection.length === 0) await this.props.getCollections()
    this.setState({isLoading: false})
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen />
    } else {
      return (
        <Container>
          <br />
          <Media>
            <Image src="/images/logo.png" roundedCircle />
            <Media.Body>
              <h3>{this.props.email}'s Profile</h3>
              <p>What are you listening to?</p>
            </Media.Body>
          </Media>
          <br />
          <CollectionTabs collection={this.props.collection} />
        </Container>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    collection: state.collection
  }
}

const mapDispatch = dispatch => {
  return {
    getCollections: () => dispatch(getCollections())
  }
}

export default connect(mapState, mapDispatch)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  email: PropTypes.string
}

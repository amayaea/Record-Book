import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const UserProfile = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email} userprofile</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  email: PropTypes.string
}

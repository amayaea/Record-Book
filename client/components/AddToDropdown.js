import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {addTo} from '../store'

export const AddToDropdown = props => {
  const handleClick = (album, collectionName) => {
    if (props.isLoggedIn) {
      if (collectionName === 'wantlilst') addTo(album, collectionName)
      else history.push(`/add-to-collection/${album.id}`)
    } else history.push('/login')
  }

  return (
    <DropdownButton id="dropdown-item-button" variant="dark" title="Add to">
      <Dropdown.Item
        as="button"
        onClick={() => handleClick(props.album, 'collection')}
      >
        Collection
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        onClick={() => handleClick(props.album, 'wantlist')}
      >
        Wantlist
      </Dropdown.Item>
    </DropdownButton>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(AddToDropdown)

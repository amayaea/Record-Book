import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export const AddToDropdown = () => {
  return (
    <DropdownButton id="dropdown-item-button" variant="dark" title="Add to">
      <Dropdown.Item as="button">Record Collection</Dropdown.Item>
      <Dropdown.Item as="button">Wantlist</Dropdown.Item>
      <Dropdown.Item as="button">Something else</Dropdown.Item>
    </DropdownButton>
  )
}

export default AddToDropdown

import React, {useState} from 'react'
import Toast from 'react-bootstrap/Toast'

function AddToWantlistToast() {
  const [setShow, show] = useState(false)
  console.log('add to ')

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <img src="/images/logo.png" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Record Book</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>Added to your Wantlist</Toast.Body>
    </Toast>
  )
}

export default AddToWantlistToast

import React from 'react'
import {Col, Row} from 'react-bootstrap'

/**
 * COMPONENT
 */
export default function NotiFriendRequest(props){
  return (
		<div className='notification'>
      {
        <h5>User # {props.info.senderId} has sent you a friend request.</h5>
      }
    </div>
  )
}
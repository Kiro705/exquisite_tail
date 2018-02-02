import React from 'react'
import {Button} from 'react-bootstrap'

/**
 * COMPONENT
 */
export default function NotiFriendRequest(props){
  return (
		<div className='notification'>
        <h5 className='inlineBlock'>User # {props.info.senderId} has sent you a friend request.</h5>
        <div className='friendReqButtons'>
        	<Button id="confirm" className='button'>confrim</Button>
        	<Button id="deny" className='button marginLeft10'>deny</Button>
        </div> 
    </div>
  )
}

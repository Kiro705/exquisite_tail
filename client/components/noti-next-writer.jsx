import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import history from '../history'
import {confirmFriendRequest, rejectFriendRequest} from '../store'

/**
 * COMPONENT
 */
export default function NotiFriendRequest(props){
	const {info} = props
  return (
		<div className='notification'>
        <h5 className='inlineBlock'>You have been choosen to write Chapter {info.currentChapter} of the <i>tail</i> {info.title}.</h5>
        <div className='friendReqButtons'>
        	<Button 
        		id="confirm"
        		className='button'
        		onClick={() => {history.push(`/story/${info.id}`)}}
        	>Start Writing</Button>
        </div> 
    </div>
  )
}

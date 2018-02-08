import React from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col} from 'react-bootstrap'
import history from '../history'
import {confirmFriendRequest, rejectFriendRequest} from '../store'

/**
 * COMPONENT
 */
export default function NotiFriendRequest(props){
	const {info} = props
  return (
	<div className='notification'>
        <Row className='notiMessageRow'>
            <h5 className='inline'>You have been chosen to write Chapter {info.currentChapter} of the <i>tail</i> {info.title}.</h5>
        </Row>
        <Row className='notiRow'>
            <div className='notiButtons'>
            	<Button 
            		id="confirm"
            		className='button'
            		onClick={() => {history.push(`/story/${info.id}`)}}
            	>Start Writing</Button>
            </div> 
        </Row>
    </div>
  )
}

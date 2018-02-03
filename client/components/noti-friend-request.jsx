import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {confirmFriendRequest, rejectFriendRequest} from '../store'

/**
 * COMPONENT
 */
function NotiFriendRequest(props){
	const {handleConfirm, handleReject, info, user} = props
	const sender = info.sender
  return (
		<div className='notification'>
        <h5 className='inlineBlock'>{sender.email} has sent you a friend request.</h5>
        <div className='friendReqButtons'>
        	<Button 
        		id="confirm"
        		className='button'
        		onClick={() => {
        			handleConfirm(user.id, sender.id)
        		}}
        	>confrim</Button>
        	<Button 
        		id="deny"
        		className='button marginLeft10'
        		onClick={() => {
              handleReject(user.id, sender.id)
            }}
        	>deny</Button>
        </div> 
    </div>
  )
}

function mapStateToProps (state){
	return {
		user: state.user,
	}
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    handleConfirm: function(userId, senderId){
      dispatch(confirmFriendRequest(userId, senderId))
    },
    handleReject: function(userId, senderId){
      dispatch(rejectFriendRequest(userId, senderId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotiFriendRequest)
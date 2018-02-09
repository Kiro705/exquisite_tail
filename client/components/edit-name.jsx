import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {updateUser} from '../store'
import history from '../history'

const mapStateToProps = function(state) {
  return {
    user: state.user
  }
}

function EditName(props){
	const {user, handleSubmit} = props
  return (
    <div>
    	<h2>{!!user.nickname ? 'Edit your nickname' : 'Add a nickname'}</h2>
      <form id="nicknameForm" onSubmit={(evt) => {props.handleSubmit(evt, props.user)}}>
        <div>
          <input
            className = 'storyInput'
            autoComplete= "off"
            type="text"
            name="nickname"
          />
        </div>
        <Button type="submit" id="submit" className='button'>Confirm Changes</Button>
      </form>
    </div>
  )
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    handleSubmit: function(evt, user){
      evt.preventDefault();
      const nickname = evt.target.nickname.value
      if(nickname.length > 0){
        dispatch(updateUser({nickname}, user.id))
      }
      history.push('/home')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditName)

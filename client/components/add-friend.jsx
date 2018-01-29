import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {makeFriendRequest} from '../store'

/**
 * COMPONENT
 */
const AddFriend = (props) => {
  const {user, requestResult} = props

  return (
    <div>
      <form onSubmit={(evt) => {props.handleSubmit(evt, user.id)}} >
        <div>
          <label htmlFor='email'><small>Friend's Email</small></label>
          <input name='email' type='text' />
        </div>
        <div>
          <button type='submit'>Request Friend</button>
        </div>
        {requestResult &&  <div> {requestResult} </div>}
      </form>
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    requestResult: state.friendRequests.result
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt, userId) {
      evt.preventDefault()
      const email = evt.target.email.value
      dispatch(makeFriendRequest(email, userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(AddFriend)

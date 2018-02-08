import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import {makeFriendRequest, resetFriendMessage} from '../store'
import FriendsList from './friends-list.jsx'

/**
 * COMPONENT
 */

class AddFriend extends Component {
  componentDidMount () {
    this.props.handleReset()
  }

  render () {
    const {user, requestResult, handleSubmit} = this.props

    return (
      <div>
        <form onSubmit={(evt) => {handleSubmit(evt, user.id)}} >
          <div>
            <label htmlFor='email'>Add a Friend</label>
            <input className='friendInput' name='email' type='text' placeholder="friend's email" />
            <div />
            <Button type='submit' className='button'>Request Friend</Button>
          </div>
          {requestResult &&  <div> {requestResult} </div>}
        </form>
        <FriendsList />
      </div>
    )
  }
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
    },
    handleReset (){
      dispatch(resetFriendMessage())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(AddFriend)

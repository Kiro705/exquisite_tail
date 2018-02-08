import React, {Component} from 'react'
import {connect} from 'react-redux'
import {confirmFriendRequest, rejectFriendRequest, getFriends} from '../store'

/**
 * COMPONENT
 */

class FriendsList extends Component {
  componentDidMount () {
    this.props.loadFriends(this.props.user.id)
  }

  render () {
    const {friends} = this.props
    return (
      <div className='friendsList'>
          <h3>Friends</h3>
          <ul>
           {
            friends.map((friend, index) => {
              if(friend.nickname){
                return(<h5 key={index}>> {friend.nickname} ({friend.email})</h5>)
              } else {
                return(<h5 key={index}>> {friend.email}</h5>)
              }
            })
           }
          </ul>
          <h6 className='secretText'><i>No unfriending, these are forever...</i></h6>
      </div>
    )
  }
}

function mapStateToProps (state){
	return {
    user: state.user,
		friends: state.friends,
	}
}

function mapDispatchToProps (dispatch){
  return{
    loadFriends (id) {
      dispatch(getFriends(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)

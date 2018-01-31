import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, updateUser} from '../store'
import socket from '../socket.js'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, handleNotifications, handleSocketUpdate, isLoggedIn, notifications, user} = props

  if(isLoggedIn){
    if(user.socketId !== socket.id){
      handleSocketUpdate(socket.id, user.id)
    }
  }

  return (
    <div>
      <nav className='main-color-light'>
        <div>
          <img className='title-logo' src='Exquisite_tail_logo.png' alt='Exquisite Tail Logo'/>
          <h1 className='title'>Exquisite Tail</h1>
        </div>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to='/home'>Home</Link>
              <Link to='/beginTheStory'>New Story</Link>
              <Link to='/friends'>Friends</Link>
              <Link to='/friends'>Notifications {notifications.length}</Link>
              <a href='#' onClick={() => {handleClick(user.id)}}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    notifications: state.notifications,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick (userId) {
      dispatch(logout(userId))
    },
    handleSocketUpdate (socketId, userId){
      dispatch(updateUser({socketId}, userId))
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

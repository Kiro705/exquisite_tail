import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {getNotifications} from '../store'
import NotiFriendRequest from './noti-friend-request.jsx'
import NotiNextWriter from './noti-next-writer.jsx'

/**
 * COMPONENT
 */
class Notifications extends Component {
	componentDidMount () {
    this.props.loadNotifications(this.props.user.id)
  }

  render () {
    return (
    <Row className='home-component'>
      <Col xs={12}>
        <h3>Notifications</h3>
      </Col>
      <Col xs={12}> 
        {
        	this.props.notifications.map((notification, index) => {
        		if(notification.hasOwnProperty('senderId')){
        			return(
        				<NotiFriendRequest key={index} info={notification} />
        			)
        		} else if(notification.hasOwnProperty('chapterAmount')) {
              return(
                <NotiNextWriter key={index} info={notification} />
              )
            } else {
        			console.log('UNKNOWN NOTIFICATION error')
        		}
        	})
        }
      </Col>
    </Row>
  )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    notifications: state.notifications,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadNotifications(id) {
      dispatch(getNotifications(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Notifications)

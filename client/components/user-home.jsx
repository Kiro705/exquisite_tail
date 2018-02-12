import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {fetchMyStories, getNotifications} from '../store'
import StoryContainer from './story-container.jsx'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount () {
    this.props.loadUserData(this.props.user.id)
  }

  render () {
    let username = this.props.user.email
    if(this.props.user.nickname) {
      username = this.props.user.nickname
    }
    return (
    <Row className='home-component'>
      <Col xs={12}>
        <h3 className='inlineBlock'>Welcome, {username}</h3>
        <Link to='/edit-name' className='inlineBlock padding-left-15 font-color-light'>{!!this.props.user.nickname ? 'edit' : 'add nickname'}</Link>
      </Col>
      <Col id='finishedStories' sm={6} xs={12}> 
        <StoryContainer title='Finished Stories' stories={this.props.stories.completed} />
      </Col>
      <Col id='storiesInProgress' sm={6} xs={12}> 
        <StoryContainer title='Stories in Progress' stories={this.props.stories.inProgress} />
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
    stories: state.stories
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserData(id) {
      dispatch(fetchMyStories(id))
      dispatch(getNotifications(id))
    }
  }
}
export {UserHome}
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

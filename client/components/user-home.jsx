import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {getUsersStories, getNotifications} from '../store'
import StoryContainer from './story-container.jsx'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount () {
    this.props.loadUserData(this.props.user.id)
  }

  render () {
    return (
    <Row className='home-component'>
      <Col xs={12}>
        <h3>Welcome, {this.props.user.email}</h3>
      </Col>
      <Col sm={6} xs={12}> 
        <StoryContainer title='Authored Stories' stories={this.props.authoredStories} />
      </Col>
      <Col sm={6} xs={12}> 
        <StoryContainer title='Contributed Stories' stories={[]} />
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
    authoredStories: state.stories.authoredStories,
    contribStories: state.stories.contribStories
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUserData(id) {
      dispatch(getUsersStories(id))
      dispatch(getNotifications(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

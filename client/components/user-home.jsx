import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {getUsersStories} from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount () {
    this.props.loadUserStories(this.props.user.id)
  }

  render () {
    return (
    <Row className='home-component'>
      <Col xs={12}>
        <h3>Welcome, {this.props.user.email}</h3>
      </Col>
      <Col className='authoredStories' sm={6} xs={12}> 
      </Col>
      <Col className='contribStories' sm={6} xs={12}></Col>
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
    loadUserStories (id) {
      dispatch(getUsersStories(id))
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

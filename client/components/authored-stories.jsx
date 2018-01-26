import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'

/**
 * COMPONENT
 */
export const AuthoredStories = (props) => {

  return (
    <div>
      <Col xs={12}>
        <h3>Welcome, {email}</h3>
      </Col>
      <Col className='authoredStories' sm={6} xs={12}> 
      </Col>
      <Col className='contribStories' sm={6} xs={12}></Col>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AuthoredStories)


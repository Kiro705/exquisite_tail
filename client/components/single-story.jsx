import {connect} from 'react-redux'
import React, {Component} from 'react'
import { withRouter } from 'react-router';
import {Col, Row} from 'react-bootstrap'
import {fetchStory} from '../store'

class SingleTrip extends Component {

	componentDidMount () {
		this.props.loadStory(+this.props.match.params.storyId)
	}

	render () {
		const {user, story} = this.props
		console.log('STORY', story)
		return(<div>something</div>)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		user: state.user,
		story: state.currentStory
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadStory (storyId) {
			dispatch(fetchStory(storyId))
		}
	}
}

export default withRouter(connect(mapState, mapDispatch)(SingleTrip))

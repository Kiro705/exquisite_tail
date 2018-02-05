import {connect} from 'react-redux'
import React, {Component} from 'react'
import { withRouter } from 'react-router';
import {Col, Row} from 'react-bootstrap'
import {fetchStory, getFriends} from '../store'
import NewChapter from './new-chapter.jsx'

class SingleTrip extends Component {

	componentDidMount () {
		if(this.props.user.id){
			this.props.loadStory(+this.props.match.params.storyId, this.props.user.id)
		}
	}

	render () {
		const {user, story, friends} = this.props
		if(story.id === 0){
			return(<h1 className='marginLeft10'>LOADING...</h1>)
		} else {
			if(story.title === null){
				return(<h3 className='marginLeft10'>No story matching ID {story.id} was found.</h3>)
			} else {
				if(story.writerId === user.id){
					return(<div>
						<NewChapter story={story} friends={friends} />
					</div>)
				} else {
					return(<div>something</div>)
				}
			}
		}
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		user: state.user,
		story: state.currentStory,
		friends: state.friends,
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadStory (storyId, userId) {
			dispatch(fetchStory(storyId))
			dispatch(getFriends(userId))
		}
	}
}

export default (connect(mapState, mapDispatch)(SingleTrip))

import {connect} from 'react-redux'
import React, {Component} from 'react'
import { withRouter } from 'react-router';
import {Col, Row} from 'react-bootstrap'
import {fetchStory, getFriends} from '../store'
import NewChapter from './new-chapter.jsx'
import StoryCompleted from './story-completed.jsx'
import StoryInProgress from './story-in-progress.jsx'

class SingleStory extends Component {

	componentDidMount () {
		if(this.props.user.id){
			this.props.loadStory(+this.props.match.params.storyId, this.props.user.id)
		}
	}

	render () {
		const {user, story, friends} = this.props

		if(story.id === 0){
			return(<h1 className='marginLeft10'>LOADING...</h1>)
		} else if(story.title === null){
			return(<h3 className='marginLeft10'>No story matching ID {story.id} was found.</h3>)
		} else if(story.status === 'story-is-hidden'){
			return(<h3 className='marginLeft10'>This story is hidden from you.</h3>)
		} else if(story.writerId === user.id) {
			return(<NewChapter story={story} friends={friends} />)
		} else if(story.status === 'story-finished') {
			return(<StoryCompleted story={story} />)
		} else {
			return(<StoryInProgress story={story} />)
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
			dispatch(fetchStory(storyId, userId))
			dispatch(getFriends(userId))
		}
	}
}

export {SingleStory}
export default (connect(mapState, mapDispatch)(SingleStory))

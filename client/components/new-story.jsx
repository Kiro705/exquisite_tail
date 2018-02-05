import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {writeTitle, writeChapterLength, writeChapterAmount, postStory} from '../store'

const mapStateToProps = function(state) {
  return {
    newStory: state.newStory,
    user: state.user
  }
}

function NewStory(props){
  return (
    <div>
      <h2>Starting the <i>tail</i>: {props.newStory.title}</h2>
      <form id="newStoryForm" onSubmit={(evt) => {props.handleSubmit(evt, props.user)}}>
        <div>
          <span>
            <h5>Title</h5>
          </span>
          <input
            className = 'storyInput'
            autoComplete= "off"
            type="text"
            name="title"
            onChange={props.handleTitle}
          />
        </div>
        <div>
          <span>
            <h5>Number of Chapters</h5>
          </span>
          <input
            className = 'storyInput'
            autoComplete= "off"
            type="number"
            name="chapterAmount"
            defaultValue = {props.newStory.chapterAmount}
            onChange={props.handleChapterAmount}
          />
        </div>
        <div>
          <span>
            <h5>Length of Chapters</h5>
          </span>
          <input
            className = 'storyInput'
            autoComplete= "off"
            type="number"
            name="chapterLength"
            defaultValue = {props.newStory.chapterLength}
            onChange={props.handleChapterLength}
          />
        </div>
        <Button type="submit" id="submit" className='button'>Click to Begin</Button>
      </form>
    </div>
  )
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    handleTitle: function(evt){
      dispatch(writeTitle(evt.target.value))
    },
    handleChapterLength: function(evt){
      dispatch(writeChapterLength(evt.target.value))
    },
    handleChapterAmount: function(evt){
      dispatch(writeChapterAmount(evt.target.value))
    },
    handleSubmit: function(evt, user){
      evt.preventDefault();
      const title = evt.target.title.value
      const chapterLength = evt.target.chapterLength.value
      const chapterAmount = evt.target.chapterAmount.value
      const currentWriter = user.email
      const writerId = user.id
      dispatch(postStory({title, chapterLength, chapterAmount, currentWriter, writerId}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStory)

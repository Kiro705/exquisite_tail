import React from 'react'
import {connect} from 'react-redux'
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
      <form id="newStoryForm" onSubmit={(evt) => {props.handleSubmit(evt, props.user.id)}}>
        <div>
          <span>
            <h5>Title</h5>
          </span>
          <input
            className = "chapterInput"
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
            autoComplete= "off"
            type="number"
            name="chapterLength"
            defaultValue = {props.newStory.chapterLength}
            onChange={props.handleChapterLength}
          />
        </div>
        <button type="submit" id="submit">Click to Begin</button>
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
    handleSubmit: function(evt, userId){
      evt.preventDefault();
      const title = evt.target.title.value
      const chapterLength = evt.target.chapterLength.value
      const chapterAmount = evt.target.chapterAmount.value
      dispatch(postStory({title, chapterLength, chapterAmount}, userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStory)

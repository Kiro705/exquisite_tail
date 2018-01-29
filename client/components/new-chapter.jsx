import React from 'react'
import {connect} from 'react-redux'
import {writeContent, postChapter} from '../store'

const mapStateToProps = function(state) {
  return {
    newChapter: state.newChapter,
    user: state.user
  }
}

function NewChapter(props){
  return (
    <div>
      <h2>Starting the <i>tail</i>: {props.newStory.title}</h2>
      <form id="newStoryForm" onSubmit={(evt) => {props.handleSubmit(evt, props.user.id)}}>
        <div>
          <span>
            <h5>Continue the <i>tail</i>...</h5>
          </span>
          <input
            autoComplete= "off"
            className= "chapterInput"
            type="text"
            name="title"
            onChange={props.handelContent}
          />
        </div>
        <button type="submit" id="submit">Click to Post</button>
      </form>
    </div>
  )
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    handelContent: function(evt){
      dispatch(writeContent(evt.target.value))
    },
    handleSubmit: function(evt, userId, storyId){
      evt.preventDefault();
      const title = evt.target.title.value
      const chapterLength = evt.target.chapterLength.value
      const chapterAmount = evt.target.chapterAmount.value
      dispatch(postStory({title, chapterLength, chapterAmount}, userId, storyId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewChapter)

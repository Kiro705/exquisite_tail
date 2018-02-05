import React from 'react'
import {connect} from 'react-redux'
import {writeContent, postChapter} from '../store'

const mapStateToProps = function(state) {
  return {
    story: state.story
    newChapter: state.newChapter,
    user: state.user
  }
}

function NewChapter(props){
  return (
    <div>
      <h2>Starting the <i>tail</i>: {props.newStory.title}</h2>
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

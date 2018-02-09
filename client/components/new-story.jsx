import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {writeTitle, writeChapterLength, writeChapterAmount, postStory, storySuccessAction, noTitleAction, tooFewChaptersAction, tooFewCharactersAction, resetChapterMessage} from '../store'

const mapStateToProps = function(state) {
  return {
    newStory: state.newStory,
    user: state.user,
    storyMessage: state.storySubmit,
  }
}

function NewStory(props){
  const {user, newStory, storyMessage, handleTitle, handleChapterAmount, handleChapterLength, handleSubmit} = props

  let formStatus = 'invalidForm'
  if(newStory.title.length > 0 && newStory.chapterAmount > 1 && newStory.chapterLength > 9){
    formStatus = 'validForm'
  }

  return (
    <div>
      <h2>Starting the <i>tail</i>: {newStory.title}</h2>
      <form id="newStoryForm" onSubmit={(evt) => {handleSubmit(evt, user)}}>
        <div>
          <span>
            <h5>Title</h5>
          </span>
          <input
            className = 'storyInput'
            autoComplete= "off"
            type="text"
            name="title"
            onChange={handleTitle}
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
            defaultValue = {newStory.chapterAmount}
            onChange={handleChapterAmount}
          />
        </div>
        <div>
          <span>
            <h5>Chapter Character Length</h5>
          </span>
          <input
            className = 'storyInput'
            autoComplete= "off"
            type="number"
            name="chapterLength"
            defaultValue = {newStory.chapterLength}
            onChange={handleChapterLength}
          />
        </div>
        <Button type="submit" id="submit" className={`button ${formStatus}`}>Click to Begin</Button>
      </form>
      <p className='marginLeft14 font-color-light'>{storyMessage.result}</p>
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
      if (title.length < 1){
        dispatch(noTitleAction())
      } else if(chapterAmount < 2){
        dispatch(tooFewChaptersAction())
      } else if(chapterLength < 10){
        dispatch(tooFewCharactersAction())
      } else {
        dispatch(storySuccessAction())
        dispatch(postStory({title, chapterLength, chapterAmount, currentWriter, writerId}))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStory)

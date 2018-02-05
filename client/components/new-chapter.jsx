import React from 'react'
import {connect} from 'react-redux'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {writeContent, tagNextFriend, postChapter} from '../store'

const mapStateToProps = function(state) {
  return {
    newChapter: state.newChapter,
    user: state.user,
    friends: state.friends,

  }
}

function NewChapter(props){
  const {story, newChapter, friends, handelContent, handleTagNext} = props
  let textMessage = 'Continue the story...'
  if(story.currentChapter === story.chapterAmount){
    textMessage = 'Conclude the story...'
  } else if(story.currentChapter === 1){
    textMessage = 'Begin the story...'
  }
  return (
    <div>
      <h2>The <i>tail</i>: {story.title}</h2>
      <h3 className='marginLeft10 chapterName'>Chapter {story.currentChapter}</h3>
      {story.currentChapter > 1 ? <div>Previous chapter...</div> : <div />}
      <form className='chapterForm'>
        <FormGroup className='chapterInput' controlId="formControlsTextarea">
          <FormControl 
            componentClass="textarea"
            placeholder={textMessage} 
            defaultValue={newChapter.content}
            onChange={handelContent}/>
        </FormGroup>
        <p className='lightFont'><i>Character Limit: {newChapter.content.length}/{story.chapterLength}</i></p>
        {
          story.currentChapter === story.chapterAmount ?
          <div /> :
          <FormGroup className='margin0' controlId="formControlsSelect">
            <ControlLabel>Tag who is next!</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={handleTagNext}>
              {friends.length ? 
                <option value={0}>--------Who's Next?--------</option> :
                <option value={0}>Add some friends first!</option>
              }
              {friends.map((friend, index) => {
                return( <option key={index} value={friend.id}>{friend.email}</option> )
              })}
            </FormControl>
          </FormGroup>
        }
      </form>
    </div>
  )
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    handelContent: function(evt){
      dispatch(writeContent(evt.target.value))
    },
    handleTagNext: function(evt){
      dispatch(tagNextFriend(+evt.target.value))
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

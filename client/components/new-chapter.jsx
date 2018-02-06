import React from 'react'
import {connect} from 'react-redux'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {writeContent, tagNextFriend, postChapter, chapterSuccessAction, noContentAction, noNextAction} from '../store'

const mapStateToProps = function(state) {
  return {
    newChapter: state.newChapter,
    user: state.user,
    friends: state.friends,
    chapterMessage: state.chapterSubmit
  }
}

function NewChapter(props){
  const {user, story, newChapter, friends, chapterMessage, handelContent, handleTagNext, handleSubmit} = props
  let textMessage = 'Continue the story...'
  if(story.currentChapter === story.chapterAmount){
    textMessage = 'Conclude the story...'
  } else if(story.currentChapter === 1){
    textMessage = 'Begin the story...'
  }

  let formStatus = 'invalidForm'
  let nextFriendIdString = newChapter.nextFriendInfo[0]
  if(newChapter.content.length > 0 && nextFriendIdString > 0){
    formStatus = 'validForm'
  }


  return (
    <div>
      <h2>The <i>tail</i>: {story.title}</h2>
      <h3 className='marginLeft10 chapterName'>Chapter {story.currentChapter}</h3>
      {story.currentChapter > 1 ? <div>Previous chapter...</div> : <div />}
      <form className='chapterForm' onSubmit={(evt) => {handleSubmit(evt, user.id, story)}}>
        <FormGroup className='chapterInput' controlId="formControlsTextarea">
          <FormControl
            name="content" 
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
            <FormControl
              name="nextUser"  
              componentClass="select"
              placeholder="select"
              onChange={handleTagNext}>
              {friends.length ? 
                <option value={[0,'']}>--------Who's Next?--------</option> :
                <option value={[0,'']}>Add some friends first!</option>
              }
              {friends.map((friend, index) => {
                return( <option key={index} value={[friend.id, friend.email]}>{friend.email}</option> )
              })}
            </FormControl>
          </FormGroup>
        }
        <Button type='submit' className={`button marginLeft10 ${formStatus}`}>Publish Chapter</Button>
      </form>
      <p className='marginLeft10 font-color-light'>{chapterMessage.result}</p>
    </div>
  )
}

function mapDispatchToProps (dispatch, ownProps){
  return {
    handelContent: function(evt){
      dispatch(writeContent(evt.target.value))
    },
    handleTagNext: function(evt){
      dispatch(tagNextFriend(evt.target.value.split(',')))
    },
    handleSubmit: function(evt, userId, story){
      evt.preventDefault();
      const content = evt.target.content.value
      const nextArr = evt.target.nextUser.value.split(',')
      if(content.length < 1){
        dispatch(noContentAction())
      } else {
        if(nextArr[0] < 1){
          dispatch(noNextAction())
        } else {
          dispatch(chapterSuccessAction())
          dispatch(postChapter(content, nextArr, story, userId))
        }
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewChapter)

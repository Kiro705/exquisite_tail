import React from 'react'

/**
 * COMPONENT
 */
export default function StoryInProgress(props){
	const {story} = props
  return (
		<div className='storyView'>
        <h3 className='inlineBlock'>The <i>tail</i> of {story.title} ({story.currentChapter}/{story.chapterAmount})</h3>
        <h5>It's currently {story.currentWriter}'s turn to write.</h5> 
    </div>
  )
}

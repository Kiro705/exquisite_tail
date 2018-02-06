import React from 'react'

/**
 * COMPONENT
 */
export default function StoryInProgress(props){
	const {story} = props
  return (
		<div className='notification'>
        <h3 className='inlineBlock'>The <i>tail</i> {story.title} is currently on chapter {story.currentChapter}/{story.chapterAmount}</h3>
        <h5>It's {story.currentWriter}'s turn to write.</h5> 
    </div>
  )
}

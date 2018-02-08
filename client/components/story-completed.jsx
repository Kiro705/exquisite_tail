import React from 'react'
import SingleChapter from './single-chapter.jsx'

/**
 * COMPONENT
 */
export default function StoryCompleted(props){
	const {story} = props
  return (
	<div>
        <h2 className='storyTitle inlineBlock'>The <i>tail</i> of <u>{story.title}</u></h2>
        {
        	story.content.map(chapter => {
        		return(
        			<div key={chapter.id} className='chapterContainer'>
        				<h4 className='font-color-light'>Chapter {chapter.place}</h4>
        				<h5 className='padding-left-15'>{chapter.content}</h5>
        			</div>
        		)
        	})
        }
    </div>
  )
}

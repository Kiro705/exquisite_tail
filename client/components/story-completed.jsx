import React from 'react'
import SingleChapter from './single-chapter.jsx'

/**
 * COMPONENT
 */
export default function StoryCompleted(props){
	const {story} = props
  return (
		<div className='notification'>
        <h2 className='inlineBlock'>The <i>tail</i> of {story.title}</h2>
        {
        	story.content.map(chapter => {
        		return(
        			<div key={chapter.id}>
        				<h4>Chapter {chapter.place}</h4>
        				<h6>{chapter.content}</h6>
        			</div>
        		)
        	})
        }
    </div>
  )
}

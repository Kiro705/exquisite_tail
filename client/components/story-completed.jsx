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
        				<h3 className='font-color-light inlineBlock margin0'>Chapter {chapter.place}</h3>
                        <p className='inlineBlock padding-left-15'><i>{chapter.user.nickname ? `by: ${chapter.user.nickname}` : `by: ${chapter.user.email}`}</i></p>
        				<h4 className='padding-left-15'>{chapter.content}</h4>
        			</div>
        		)
        	})
        }
    </div>
  )
}

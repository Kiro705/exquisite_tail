import React from 'react'

/**
 * COMPONENT
 */
export default function SingleChapter(props){
	const {info} = props
  return (
		<div className='notification'>
        <h3 className='inlineBlock'>Chapter {info.place}</h3>
        <p>{info.content}</p>
        <p>Author info here</p>
    </div>
  )
}

import React from 'react'

/**
 * COMPONENT
 */
export default function SingleChapter(props){
	const {info} = props
  return (
		<div className='notification'>
        <h3 className='inlineBlock'>Chapter {info.place}    </h3>
        <p className='inlineBlock padding-left-15'><i>{info.user.nickname ? `by: ${info.user.nickname}` : `by: ${info.user.email}`}</i></p>
        <p className='padding-left-15'>{info.content}</p>
    </div>
  )
}

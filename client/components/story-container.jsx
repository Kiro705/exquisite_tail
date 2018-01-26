import React from 'react'
import {Col, Row} from 'react-bootstrap'

/**
 * COMPONENT
 */
export default function ContributedStories(props){
  return (
		<Row className='storyList'>
      <h4>{props.title}</h4>
      {
        props.stories.map(story => {
          return (
            <Col key={story.id} className='storyThumb' xs={12} >
              <h5>{story.title}</h5>
              <Row>
                <Col xs={6} >
                  <h6>Chapter Amount: {story.chapterAmount}</h6>
                </Col>
                <Col xs={6} >
                  <h6>Chapter Length: {story.chapterLength}</h6>
                </Col>
              </Row>
            </Col>
          )
        })
      } 
    </Row>
  )
}

import React from 'react'
import {Col, Row, Button} from 'react-bootstrap'
import history from '../history'

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
              <Button 
                id="confirm"
                className='button'
                onClick={() => {history.push(`/story/${story.id}`)}}
              >View</Button>
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

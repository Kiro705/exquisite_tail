/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {SingleStory} from './../single-story.jsx'
import store from './../../store'



describe('SingleStory', () => {
  let singleStory

  it('renders LOADING... while no story is loaded', () => {
  	const story = {id: 0}
  	singleStory = shallow(<SingleStory story={story}/>)
    expect(singleStory.find('h1').text()).to.be.equal('LOADING...')
  })
  it('renders an error message when no story matching ID is found', () => {
  	const story = {id: 10, title: null}
  	singleStory = shallow(<SingleStory story={story}/>)
    expect(singleStory.find('h3').text()).to.be.equal('No story matching ID ' + story.id + ' was found.')
  })
  it('renders the hidden message if the story should be hidden from you', () => {
  	const story = {id: 1, status: 'story-is-hidden'}
  	singleStory = shallow(<SingleStory story={story}/>)
    expect(singleStory.find('h3').text()).to.be.equal('This story is hidden from you.')
  })
  it('renders a completed story if the story is finished', () => {
  	const story = {id: 1, title: 'All done', status: 'story-finished', content: []}
  	const user = {id: 1, email: 'james@email.com'}
  	singleStory = shallow(<SingleStory story={story} user={user}/>)
    expect(singleStory.find('StoryCompleted').props().story.title).to.be.equal(story.title)
  })
})

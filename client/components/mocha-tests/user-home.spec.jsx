/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {UserHome} from './../user-home.jsx'
import store from './../../store'



describe('UserHome', () => {
  let userHome
  const user = {email: 'james@email.com', nickname: 'James'}
  const stories = {completed: [], inProgress: []}

  beforeEach(() => {
    userHome = shallow(<UserHome user={user} stories={stories}/>)
  })

  it('renders the nickname over the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, James')
  })
})

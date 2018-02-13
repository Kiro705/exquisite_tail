/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db/index.js')
const app = require('../../index')
const User = db.model('user')
const Chapter = db.model('chapter')
const Story = db.model('story')

describe('Story routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/stories/', () => {
    const testEmail = 'test@gmail.com'
    let storyId1, storyId2, userId1, userId2
    const story1 = {
      title: 'finishedStory',
      chapterAmount: 1, 
      chapterLength: 280, 
      currentChapter: 2, 
      currentWriter: null,
      writerId: -1,
      status: 'story-finished',
      public: true,
    }
    const story2 = {
      title: 'Still working on it',
      chapterAmount: 4, 
      chapterLength: 280, 
      currentChapter: 2, 
      currentWriter: 'otherEmail@gmail.com',
      writerId: 3,
      status: 'in-progress',
      public: true,
    }

    const chapter1 = {
      content: 'the story is now...over.',
      place: 1,
    }

    const chapter2 = {
      content: 'the story is just starting.',
      place: 1,
    }

    beforeEach(() => {
      const userProm = User.create({
        email: testEmail
      })
      const story1Prom = Story.create(story1)
      const story2Prom = Story.create(story2)
      const chap1Prom = Chapter.create(chapter1)
      const chap2Prom = Chapter.create(chapter2)
      const otherUserProm = User.create({
        email: 'fake@fake.net'
      })
      return Promise.all([userProm, story1Prom, story2Prom, chap1Prom, chap2Prom, otherUserProm])
      .then(promArr => {
        userId1 = promArr[0].id
        userId2 = promArr[5].id
        storyId1 = promArr[1].id
        storyId2 = promArr[2].id
        const prom1 = promArr[1].setUser(promArr[0])
        const prom2 = promArr[2].setUser(promArr[0])
        const prom3 = promArr[3].setUser(promArr[0])
        const prom4 = promArr[4].setUser(promArr[0])
        const prom5 = promArr[3].setStory(promArr[1])
        const prom6 = promArr[4].setStory(promArr[2])
        return Promise.all([prom1, prom2, prom3, prom4, prom5, prom6])
      })
    })

    it('GET /api/stories/myStories/:userId', () => {
      return request(app)
        .get(`/api/stories/myStories/${userId1}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.completed).to.be.an('array')
          expect(res.body.completed.length).to.be.equal(1)
          expect(res.body.inProgress).to.be.an('array')
          expect(res.body.inProgress.length).to.be.equal(1)
          expect(res.body.inProgress[0].title).to.be.equal(story2.title)
        })
    })

    it('GET /api/stories/:storyId/:userId with a finished story', () => {
      return request(app)
        .get(`/api/stories/${storyId1}/${userId1}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.content).to.be.an('array')
          expect(res.body.content.length).to.be.equal(1)
          expect(res.body.content[0].content).to.be.equal(chapter1.content)
          expect(res.body.title).to.be.equal(story1.title) 
        })
    })

    it('GET /api/stories/:storyId/:userId with an unfinished story', () => {
      return request(app)
        .get(`/api/stories/${storyId2}/${userId1}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.content).to.be.equal(null)
          expect(res.body.title).to.be.equal(story2.title) 
        })
    })

    it('GET /api/stories/:storyId/:userId with an unauthorized user', () => {
      return request(app)
        .get(`/api/stories/${storyId1}/${userId2}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(-1)
          expect(res.body.status).to.be.equal('story-is-hidden') 
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const api = supertest(app)


describe('btest', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('lmao', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'arul00',
        name: 'AK',
        password: 'hello1234',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test ('invalid username test', async () => {
  
      const invalidUser = {
        name: 'John',
        password:'hello'
      }  
      await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
    
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(1)
    })

    test ('same username test', async () => {
      const sameUser = {
        username: 'root',
        name: 'LOL',
        password: '803840344'
      }
      await api
      .post('/api/users')
      .send(sameUser)
      .expect(400)
  
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(1)
    })

  })



  


  afterAll(() => {
    mongoose.connection.close()
  })
  
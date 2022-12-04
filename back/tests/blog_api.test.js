const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')


const api = supertest(app)



const newBlogObject2 = [
  {
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  }
]
const newBlogObject3 = [
  {
  author: "Robert C. Martin",
  likes: 100
  }
]



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

// GET Test, check for 3 blogs
test('test1', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})

// Check if each blog has ID property
test ('test2', async () => {
  const blogs = await Blog.find({})
  expect(blogs[0].id).toBeDefined
})


// Check if POST works
test ('test3', async () => {
  const test3Obj = [
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes:7
      }
  ]

  await api
  .post('/api/blogs')
  .send(test3Obj)
  .expect(201)
  .expect('Content-Type', /application\/json/)  

const response = await api.get('/api/blogs')
expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

// Check if likes defaults to 0 if likes isn't defined
test ('test4', async () => {
  
  await api
  .post('/api/blogs')
  .send(newBlogObject2)
  .expect(201)
  .expect('Content-Type', /application\/json/)  

const blogs = await Blog.find({})
expect(blogs[3].likes).toBe(0)
})

// Checks if there's 400 error when url or title aren't defined
test ('test5', async () => {
  

  await api
  .post('/api/blogs')
  .send(newBlogObject3)
  .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// Check DELETE
test('test6', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )


  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})


// Check PUT
test('test7', async () => {
  const newBlogObject4 =  [{
    title: "LOL",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes:100,
  
  }]
  const blogsAtStart = await Blog.find({})
  const blogToUpdate = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlogObject4)
    .expect(200)
    .expect('Content-Type', /application\/json/) 

  const blogsAtEnd = await Blog.find({})

  expect(blogsAtEnd[0].title).toBe('LOL')
  expect(blogsAtEnd[0].likes).toBe(100)

})

afterAll(() => {
  mongoose.connection.close()
})

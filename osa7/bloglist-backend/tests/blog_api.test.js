const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const blog = require('../models/blog')

describe('when there are initially some blogs in db', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const testUsers = await helper.generateTwoUsers()

    let user1 = await testUsers[0].save()
    let user2 = await testUsers[1].save()

    let blogsForUser1 = []
    await helper.user1Blogs.forEach((blog) => {
      const newBlog = { ...blog, user: user1 }
      blogsForUser1 = blogsForUser1.concat(newBlog)
    })
    let blogsForUser2 = []
    await helper.user2Blogs.forEach((blog) => {
      const newBlog = { ...blog, user: user1 }
      blogsForUser2 = blogsForUser2.concat(newBlog)
    })

    await Blog.insertMany(blogsForUser1)
    await Blog.insertMany(blogsForUser2)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialLength)
  })

  test('blog has variable named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('when logging in is required', () => {
    let tokenBearer = ''
    beforeEach(async () => {
      const credentials = {
        username: 'testuser1',
        password: 'secret',
      }

      const result = await api.post('/api/login').send(credentials)

      tokenBearer = `Bearer ${result.body.token}`
    })

    describe('adding a new blog', () => {
      test('a valid blog can be added', async () => {
        const newBlog = {
          title: 'Test Blog',
          author: 'Mikki Hiirulainen',
          url: 'https://reactpatterns.com/',
          likes: 6,
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', tokenBearer)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialLength + 1)

        const titles = blogsAtEnd.map((blog) => blog.title)
        expect(titles).toContain('Test Blog')
      })

      test('if likes are not defined they are set to 0', async () => {
        const newBlog = {
          title: 'Likes not defined',
          author: 'Mikki Hiirulainen',
          url: 'https://reactpatterns.com/',
        }

        const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', tokenBearer)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const createdBlog = response.body
        expect(createdBlog.likes).toBe(0)
      })

      test('if blog title not define status code 400 returned', async () => {
        newBlog = {
          author: 'Mikki Hiirulainen',
          url: 'https://reactpattens.com/',
          likes: 6,
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', tokenBearer)
          .expect(400)
      })

      test('if blog url not define status code 400 returned', async () => {
        newBlog = {
          title: 'Url not defined',
          author: 'Mikki Hiirulainen',
          likes: 6,
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', tokenBearer)
          .expect(400)
      })

      test('return status code 401 if token is missing', async () => {
        newBlog = {
          title: 'Token missing',
          author: 'Mikki Hiirulainen',
          url: 'https://reactpattens.com/',
          likes: 0,
        }

        await api.post('/api/blogs').send(newBlog).expect(401)
      })
    })

    describe('deletion of a blog', () => {
      test('a blog can be deleted with valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set('Authorization', tokenBearer)
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialLength - 1)

        const titles = blogsAtEnd.map((blog) => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
      })

      test('returns status code 401 if id invalid', async () => {
        const invalidId = 'foo'

        await api.delete(`/api/blogs/${invalidId}`).expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialLength)
      })
    })

    describe('updating blog', () => {
      test('likes can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = { ...blogToUpdate, likes: 100 }

        const response = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(updatedBlog)
          .expect(200)

        expect(response.body.likes).toBe(100)
      })
    })
  })
})

describe('users', () => {
  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('secret', 10)
      const user = new User({
        username: 'root',
        name: 'Superuser',
        passwordHash,
      })

      await user.save()
    })

    test('new user with unique username can be added', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'minnihiiri',
        name: 'Minni Hiirulainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map((u) => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation with existing username fails with proper statuscode and message', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'User',
        password: 'password',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation with too short username fails with proper statuscode and message', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'me',
        name: 'Name',
        password: 'password',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(
        'is shorter than the minimum allowed length'
      )

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation with too short password fails with proper statuscode and message', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'minnihiiri',
        name: 'Minni Hiirulainen',
        password: 'pa',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password missing or too short')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation without username defined fails with proper statuscode and message', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Minni Hiirulainen',
        password: 'password',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation without password defined fails with proper statuscode and message', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'minniemouse',
        name: 'Minni Hiirulainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password missing or too short')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})

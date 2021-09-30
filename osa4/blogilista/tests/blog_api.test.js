const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there are initially some blogs in db', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    
    test('blogs are returned as json', async () => {
        await api.get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    
    test('correct number of blogs is returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('blog has variable named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
    
    describe('adding a new blog', () => {
      test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Test Blog",
            author: "Mikki Hiirulainen",
            url: "https://reactpatterns.com/",
            likes: 6
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain('Test Blog')
      })  

        test('if likes are not defined they are set to 0', async () => {
            const newBlog = {
                title: 'Likes not defined',
                author: 'Mikki Hiirulainen',
                url: 'https://reactpatterns.com/'
            }
        
            const response = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        
            const createdBlog = response.body
            expect(createdBlog.likes).toBe(0)
        
        })

        test('if blog title not define status code 400 returned', async () => {
            newBlog = {
                author: 'Mikki Hiirulainen',
                url: 'https://reactpattens.com/',
                likes: 6
            }
        
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        })
        
        test('if blog url not define status code 400 returned', async () => {
            newBlog = {
                title: 'Url not defined',
                author: 'Mikki Hiirulainen',
                likes: 6
            }
        
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        })
    })

    describe('deletion of a blog', () => {
        test('a blog can be deleted with valid id', async () => {
            const blogsAtStart =  await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

            const titles = blogsAtEnd.map(blog => blog.title)
            expect(titles).not.toContain(blogToDelete.title)
        })

        test('returns status code 400 if id invalid', async () => {
            const invalidId = 'foo'

            await api
                .delete(`/api/blogs/${invalidId}`)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })
})


afterAll(() => {
    mongoose.connection.close()
})
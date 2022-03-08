const bcrypt = require('bcrypt')
const { config } = require('dotenv')
const Blog = require('../models/blog')
const User = require('../models/user')

const user1 = {
  username: 'testuser1',
  name: 'Test User',
  password: 'secret',
}

const user2 = {
  username: 'testuser2',
  nama: 'Test User',
  password: 'salainen',
}

const user1Blogs = [
  {
    title: 'Blog 1',
    author: 'Marshmallow',
    url: 'www.url.url',
    likes: 9,
  },
  {
    title: 'Blog 2',
    author: 'Lilypad',
    url: 'www.url.url',
    likes: 2,
  }
]

const user2Blogs = [{
  title: 'Blog 3',
  author: 'Marshmallow',
  url: 'www.url.url',
  likes: 0
}]

const initialLength = user1Blogs.length + user2Blogs.length

const generateTwoUsers = async () => {
  let userArray = []
  const passwordHash1 = await bcrypt.hash(user1.password, 10)
  const result1 = await new User({ username: user1.username, name: user1.name, passwordHash: passwordHash1, blogs: []})
  userArray = userArray.concat(result1)
  const passwordHash2 = await bcrypt.hash(user2.password, 10)
  const result2 = await new User({ username: user2.username, name: user2.name, passwordHash: passwordHash2, blogs: []})
  userArray = userArray.concat(result2)
  return userArray
}

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
      }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    user1Blogs,
    user2Blogs,
    initialLength,
    generateTwoUsers,
    blogsInDb,
    usersInDb
}
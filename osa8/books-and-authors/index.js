const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Connection failed:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
      ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let allBooks = await Book.find({}).populate('author')
      if(!args.author && !args.genre) return allBooks
      
      if(args.author) {
        allBooks = allBooks.filter(b => b.author.name === args.author)
      }
      if(args.genre) {
        allBooks = allBooks.filter(b => b.genres.includes(args.genre))
      }
      return allBooks
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      let allAuthors = []

      await authors.forEach(a => {
        const booksByAuthor = books.filter(b => b.author.toString() === a._id.toString())
        const bookCount = booksByAuthor.length
        allAuthors = allAuthors.concat({ id: a._id.toString() , name: a.name, born: a.born, bookCount })
      })
      return allAuthors
    },
    me: (root, args, context) => {
      return context.currentUser
    } 
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if(!args.author) {
        throw new UserInputError('Author required')
      }

      const authors = await Author.find({})
      const authorNames = authors.map(a => a.name)
      let author
      if(!authorNames.includes(args.author)) {
        author = new Author({ name: args.author })
        await author.save()
      } else {
        author = await Author.findOne({ name: args.author })
      }
      const book = new Book({ ...args, author })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
        return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if(!args.name) {
        throw new UserInputError('Author name required')
      }
      const author = await Author.findOne({ name: args.name })
      
      if(!author) return null

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})

      if(!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }

  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
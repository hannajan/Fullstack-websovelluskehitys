const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')


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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
      ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
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
        allAuthors = allAuthors.concat({ id: a._id.toString() , name: a.name, bookCount })
      })
      return allAuthors
    }
  },
  Mutation: {
    addBook: async (root, args) => {

      if(!args.author) {
        throw new UserInputError('Author required')
      }

      const authors = await Author.find({})
      const authorNames = authors.map(a => a.name)
      let author
      if(!authorNames.includes(args.author)) {
        author = new Author({ name: args.author })
        author.save()
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
    editAuthor: async (root, args) => {
      if(!args.name) {
        throw new UserInputError('Author name required')
      }
      let author = await Author.findOne({ name: args.name })
      
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
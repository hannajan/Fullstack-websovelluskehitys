const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => {
    return blog.likes + sum
  }, 0)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = blogs[0]
  blogs.reduce((max, blog) => {
    if (blog.likes > max) {
      favoriteBlog = blog
      return blog.likes
    }
    return max
  }, 0)
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  const countBlogsForAuthor = _.countBy(blogs, 'author')
  let authorWithMostBlogs = {}
  _.reduce(
    countBlogsForAuthor,
    (max, numOfBlogs, author) => {
      if (numOfBlogs > max) {
        authorWithMostBlogs = { author: author, blogs: numOfBlogs }
        return numOfBlogs
      }
      return max
    },
    0
  )

  return _.size(authorWithMostBlogs) > 0 ? authorWithMostBlogs : undefined
}

const mostLikes = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, 'author')
  let countByLikes = []
  _.map(groupByAuthor, (author) => {
    let likes = 0
    author.forEach((v) => (likes += v.likes))
    countByLikes = _.concat(countByLikes, {
      author: author[0].author,
      likes: likes,
    })
  })
  let mostLikes = {}
  _.reduce(
    countByLikes,
    (maxLikes, auth) => {
      if (auth.likes > maxLikes) {
        mostLikes = {
          author: auth.author,
          likes: auth.likes,
        }
        return auth.likes
      }
      return maxLikes
    },
    0
  )
  return _.size(mostLikes) > 0 ? mostLikes : undefined
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

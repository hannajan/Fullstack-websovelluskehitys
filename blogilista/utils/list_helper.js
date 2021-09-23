const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((sum, blog) => {
        return blog.likes + sum
    }, 0)
    return totalLikes
}

module.exports = {
    dummy,
    totalLikes
}
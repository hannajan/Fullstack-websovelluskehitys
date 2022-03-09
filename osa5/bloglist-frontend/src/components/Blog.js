import { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleRemove }) => {


  const [showFullView, setShowFullView] = useState(false)
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 2,
      borderRadius: 5,
      marginBottom: 5
    }

    const hideFullView = { display: showFullView ? 'none' : ''}
    const showFull = { display: showFullView ? '' : 'none'}

  const toggleView = () => {
    setShowFullView(!showFullView)
  }

  const removeBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove({id: blog.id})
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideFullView}>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
      </div>
      <div style={showFull}>
        {blog.title} {blog.author} <></>
        <button onClick={toggleView}>hide</button> <br/>
        {blog.url} <br/>
        likes <></> {blog.likes} <button onClick={() => handleLike(blog)}>like</button> <br/>
        {blog.user.name}
        {blog.user.name === user.name ? 
        <div>
         <button onClick={removeBlog}>remove</button>
        </div> : <></>}
      </div>
    </div>
  ) 
}

export default Blog
import { useState } from 'react'

const Blog = ({blog}) => {


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
        likes <></> {blog.likes} <button>like</button> <br/>
        {blog.user.name}
      </div>
    </div>
  ) 
}

export default Blog
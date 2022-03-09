const BlogForm = ({
    onSubmit, 
    title, 
    handleTitleChange, 
    author, 
    handleAuthorChange, 
    url, 
    handleUrlChange
}) => {
    return (
    <form onSubmit={onSubmit}>
      <div>
        title:     
          <input 
          value={title}
          onChange={handleTitleChange}
          />
      </div>
      <div>
        author:
        <input 
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
    )
}

export default BlogForm
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const user = {
  username: 'root',
  name: 'Superuser',
  password: 'secret'
}

const mockHandler = jest.fn()

test('renders blog initially only showing title and author', () => {
  const blog = {
    title: 'Blog for jest testing',
    author: 'Test Mickey',
    url: 'www.react.fi',
    likes: 3,
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user} handleLike={mockHandler} handleRemove={mockHandler}/>)

  const div = container.querySelector('.blogView')
  expect(div).toHaveTextContent('Test Mickey')
  expect(div).toHaveTextContent('Blog for jest testing')
  expect(div).not.toHaveTextContent('www.react.fi')
  expect(div).not.toHaveTextContent('likes')
})
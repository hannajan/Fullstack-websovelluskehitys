const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote  
      )
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'SET_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data: { anecdotes }
  }
} 

export default reducer
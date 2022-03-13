import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

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
      return state.concat(action.data.anecdote)
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

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: { anecdote }
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data: { anecdotes }
  }
} 

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default reducer
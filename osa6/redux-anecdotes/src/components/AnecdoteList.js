import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  )
}

const voteAnecdote = (anecdote, dispatch) => {
  dispatch(voteForAnecdote(anecdote.id))
  dispatch(setNotification(`You voted for '${anecdote.content}'`))
  setTimeout(() => {
    dispatch(resetNotification())
  }, 5000)
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const orderedAnecdoteList = anecdotes.map(anecdote =>
    <Anecdote 
      key={anecdote.id}
      anecdote={anecdote} 
      handleClick={() => voteAnecdote(anecdote, dispatch)}
    />   
  ).sort((a,b) => b.props.anecdote.votes - a.props.anecdote.votes)

  return (
    <div>
      {orderedAnecdoteList}
    </div>
  )
}

export default AnecdoteList
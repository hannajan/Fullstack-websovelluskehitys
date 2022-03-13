import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

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

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const orderedAnecdoteList = anecdotes.map(anecdote =>
    <Anecdote 
      key={anecdote.id}
      anecdote={anecdote} 
      handleClick={() => 
        dispatch(voteForAnecdote(anecdote.id))
      }
    />   
  ).sort((a,b) => b.props.anecdote.votes - a.props.anecdote.votes)

  return (
    <div>
      {orderedAnecdoteList}
    </div>
  )
}

export default AnecdoteList
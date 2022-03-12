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

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
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
      <h2>Anecdotes</h2>
      {orderedAnecdoteList}
    </div>
  )
}

export default Anecdotes
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
  const filter = useSelector(state => state.filter)
  const orderedAnecdoteList = anecdotes.map(anecdote =>
    <Anecdote 
      key={anecdote.id}
      anecdote={anecdote} 
      handleClick={() => voteAnecdote(anecdote, dispatch)}
    />   
  )
  .sort((a,b) => b.props.anecdote.votes - a.props.anecdote.votes)

  const filteredAnecdoteList = orderedAnecdoteList.filter(a => 
      a.props.anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      {filteredAnecdoteList}
    </div>
  )
}

export default AnecdoteList
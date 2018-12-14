import anecdoteService from '../services/anecdotes'

// Sync action creators
export const anecdoteVoting = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}
export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

// Async action creators
export const initializeAnecdotes = () => {
  return async(dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createNewAnecdote = (content) => {
  return async(dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (updatedAnecdote) => {
  return async(dispatch) => {
    const votedAnecdote = await anecdoteService.update(updatedAnecdote.id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: votedAnecdote.id }
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    const old = state.filter(a => a.id !== action.data.id)
    const voted = state.find(a => a.id === action.data.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    return [...state, action.data ]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return state
}

export default anecdoteReducer
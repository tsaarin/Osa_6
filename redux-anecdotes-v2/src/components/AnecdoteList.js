import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={async () => {
                this.props.voteAnecdote(anecdote)
                this.props.notify(`you voted '${anecdote.content}'`, 5000)
              }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filteredAnecdotes = (anecdotes, filters) => {
  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filters))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: filteredAnecdotes(state.anecdotes, state.filters)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voteAnecdote, notify }
)(AnecdoteList)

export default ConnectedAnecdoteList

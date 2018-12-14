import React from 'react'
import { connect } from 'react-redux'
import { filterWith } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.filterWith(event.target.value, this.props.anecdotes)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const ConnectedFilter = connect(
  mapStateToProps,
  { filterWith }
)(Filter)

export default ConnectedFilter
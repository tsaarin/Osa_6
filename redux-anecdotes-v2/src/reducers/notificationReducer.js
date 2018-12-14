export const setNotification = (content, actiontype) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      content,
      actiontype
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: {
      content: ''
    }
  }
}

export const notify = (content, duration) => {
  return async(dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: {
          content: ''
        }
      })
    }, duration)
  }
}

const notificationReducer = (store = '', action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.data.content

    // Format for sync setNotification
    // const verb = action.data.actiontype
    // return 'you ' + verb + ' \'' + action.data.content + '\''
  }

  if (action.type === 'CLEAR_NOTIFICATION') {
    return action.data.content
  }

  return store
}

export default notificationReducer
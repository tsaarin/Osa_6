export const filterWith = (content) => {
  return {
    type: 'FILTER',
    data: {
      filterContent: content
    }
  }
}

const filterReducer = (store = '', action) => {
  if (action.type === 'FILTER') {
    return action.data.filterContent.toLowerCase()
  }

  return store
}

export default filterReducer
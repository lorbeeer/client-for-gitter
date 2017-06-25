import { REQUEST_DATA, RECEIVE_USER, RECEIVE_GROUPS, RECEIVE_ROOMS, RECEIVE_MSGS } from '../actions'

export default (state={}, action) => {
  switch (action.type) {

    case REQUEST_DATA:
    return Object.assign({}, state, {
      isFetching: true
    })

    case RECEIVE_USER: 
      return Object.assign({}, state, {
        user: action.user,
        isFetching: false
    })

    case RECEIVE_GROUPS: 
      return Object.assign({}, state, {
        groups: action.groups,
        isFetching: false
      })

    case RECEIVE_ROOMS: 
      return Object.assign({}, state, {
        rooms: action.rooms,
        isFetching: false
    })
    
     case RECEIVE_MSGS: 
      return Object.assign({}, state, {
        messages: action.messages
    })
    default: return state
  }
}

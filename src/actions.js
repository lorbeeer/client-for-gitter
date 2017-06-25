import fetch from 'isomorphic-fetch'

export const REQUEST_DATA = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS'
export const RECEIVE_ROOMS= 'RECEIVE_ROOMS'
export const RECEIVE_MSGS= 'RECEIVE_MSGS'


export function requestData(token) {
  return {
    type: REQUEST_DATA,
    token
  }
}

function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user: user[0]
  }
}

function receiveGroups(groups) {
  return {
    type: RECEIVE_GROUPS,
    groups
  }
}

function receiveRooms(rooms) {
  return {
    type: RECEIVE_ROOMS,
    rooms
  }
}
/*
function receiveRoomsUnderGroup(roomsInGroup) {
  return {
    type: RECEIVE_ROOMS,
    roomsInGroup
  }
}
*/
function receiveMsgs(messages) {
  return {
    type: RECEIVE_MSGS,
    messages
  }
}


export function fetchUser(token) {
  return fetchData(token, `https://api.gitter.im/v1/user`, receiveUser)  
}

export function fetchGroups(token) {
    return fetchData(token, `https://api.gitter.im/v1/groups`, receiveGroups) 
}

export function fetchRooms(token) {
    return fetchData(token, `https://api.gitter.im/v1/rooms`, receiveRooms) 
}

export function fetchMsgs(token, id) {
    return fetchData(token, ('https://api.gitter.im/v1/rooms/'+id+'/chatMessages'), receiveMsgs) 
}
/*
export function fetchRoomsUnderGroup(token) {
    return fetchData(token, `https://api.gitter.im/v1/groups/:groupId/rooms`, receiveRoomsUnderGroup) 
}*/

function fetchData(token, path, actionFunc){
    return dispatch => {
        dispatch(requestData(token))
        const myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Accept', 'application/json');
        myHeaders.set('Authorization', 'Bearer '+ token);
        return fetch(path, {headers: myHeaders})
            .then(response => response.json())
            .then(data => dispatch(actionFunc(data)))
    }
}

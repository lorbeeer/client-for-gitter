import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ListRooms from '../components/listRooms'
import ListMessages from '../components/listMessages'


import { fetchUser, fetchGroups, fetchRooms, fetchMsgs } from '../actions'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.handleGroups = this.handleGroups.bind(this),
    this.handleRooms = this.handleRooms.bind(this),
    this.handeMeassages = this.handeMeassages.bind(this)
  }

  componentDidMount() {
    const { dispatch, token } = this.props
    dispatch(fetchUser(token))
  }
  handleGroups(e) {
    e.preventDefault()
    const { dispatch, token } = this.props
    dispatch(fetchGroups(token))
  }

  handleRooms(e) {
    e.preventDefault()
    const { dispatch, token } = this.props
    dispatch(fetchRooms(token))
  }

  handeMeassages(id) {
    const { dispatch, token } = this.props
    dispatch(fetchMsgs(token, id))
  }

  handeMeassageDel(id) {
    const { dispatch, token } = this.props
    dispatch(fetchMsgs(token, id))
  }

  render() {
    const { isFetching, user, groups, rooms, messages } = this.props
    return (
      <div>
          <h1>
            Hello, {user.displayName}!
          </h1>
          {groups.length > 0 &&
            <div>
                <h2>These are your groups: </h2>
                <ul>
                    {groups.map(group =>
                    <li key={group.id}>
                      {group.name} id: {group.id} 
                    </li>
                    )}
                </ul>
            </div>
          } 

          {!isFetching &&
                <a href='#'
                  onClick={this.handleGroups}>
                  Show my groups
                </a>
          } 

          {!isFetching &&
                <a href='#'
                  onClick={this.handleRooms}>
                  Show my rooms
                </a>
          }

          {isFetching && user.length === 0 &&
              <h2>Loading user...</h2>
          }

          {isFetching && groups.length === 0 &&
              <h2>Loading groups...</h2>
          }

          {rooms.length > 0 &&
            <div>
                <h3>These are your rooms: </h3>
                <ListRooms rooms={rooms} onClick={this.handeMeassages} />
            </div>
          } 
           {messages.length > 0 &&
            <div>
                <h3> Chats in this room:</h3>
                <ListMessages messages={messages}/>
            </div>
          } 
          
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token, 
    user: state.user || {},
    groups: state.groups || [],
    rooms: state.rooms || [],
    messages: state.messages || [],
    isFetching: false,

  }
}

Counter.propTypes = {
  rooms: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
 
  
}

export default connect(mapStateToProps)(Counter)

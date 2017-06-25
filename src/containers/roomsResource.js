import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchRoomsUnderGroup, joinRoom } from '../actions'

class RoomsResource extends Component {
  constructor(props) {
    super(props)
    this.handleRoomsUnderGroup = this.handleRoomsUnderGroup.bind(this)
  }

  handleRoomsUnderGroup(e) {
    e.preventDefault()
    const { dispatch, token } = this.props
    dispatch(fetchRoomsUnderGroup(token))
  }

  render() {
    const { roomsInGroup } = this.props
    return (
      <div>
          {roomsInGroup.length === 0 &&
                <a href='#'
                  onClick={this.handleRoomsUnderGroup}>
                  Show available rooms for this project
                </a>
          } 
          {!roomsInGroup.length === 0 &&
          <h2>These are available rooms (to join click on desired room): </h2>
          }
          <ul>
            {roomsInGroup.map(room =>
            <li onClick={this.joinRoom(room.id, token)} key={room.id}>
              {room.name} 
            </li>
            )}
          </ul>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token, 
    user: state.user || {},
    roomsInGroup: state.roomsInGroup || []
  }
}

RoomsResource.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  roomsInGroup: PropTypes.array.isRequired
  
}

export default connect(mapStateToProps)(RoomsResource)
import React from 'react'
import PropTypes from 'prop-types'
import RoomItem from './roomItem'

const ListRooms = ({rooms, onClick}) => (
      <div>
          <ul>
            {rooms.map(room =>
            <RoomItem onClick={()=>onClick(room.id)} key={room.id}
              name={room.name} 
            />)}
          </ul>
      </div>
    
)

ListRooms.propTypes = {
  rooms: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired

}

export default ListRooms



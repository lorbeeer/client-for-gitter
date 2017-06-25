import React from 'react'
import PropTypes from 'prop-types'

const RoomItem = ({name, onClick}) => (
    <li onClick={onClick}>
        {name} 
    </li>
)

RoomItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired

}

export default RoomItem

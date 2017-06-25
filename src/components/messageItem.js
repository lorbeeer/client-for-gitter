import React from 'react'
import PropTypes from 'prop-types'

const MessageItem = ({text, fromUser, onClickDelete, onClickEdit}) => (
    <li>
        from {fromUser} : {text} 
        <button onClick={onClickDelete}>Delete</button>
    </li>
)

MessageItem.propTypes = {
  text: PropTypes.string.isRequired,
  fromUser: PropTypes.string.isRequired

}

export default MessageItem
import React from 'react'
import PropTypes from 'prop-types'
import MessageItem from './messageItem'

const ListMessages = ({messages, onClickDelete}) => (
      <div>
          <ul>
            {messages.map(msg =>
            <MessageItem key={msg.id}
              text={msg.text} fromUser={msg.fromUser.username}
              onClickDelete={()=>onClickDelete(msg.id)}
            />)}
          </ul>
      </div>
    
)

ListMessages.propTypes = {
  messages: PropTypes.array.isRequired
}

export default ListMessages

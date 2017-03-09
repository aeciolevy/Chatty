import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
  super(props);
}

  render() {
    console.log('Rendering <MessageList/>');
    return (
        <main className="messages">
         {this.props.message.map((message) =>{
            return <Message type={message.type} key={message.id}
            username={message.username} content={message.content} color={message.color}/>;
         }) }
        </main>

    );
  }
}
export default MessageList;
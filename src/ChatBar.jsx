import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.KeyPress = this.KeyPress.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }

  changeUserName(event) {
    this.props.handleUserName(event);
  }

  KeyPress(e){
    this.props.handleKeyPress(e);
    ReactDOM.findDOMNode(this.refs.msg).value='';
  }

  render() {
    console.log('Rendering <Chatbar/>');
    return (
      <footer className="chatbar">
        <input className="chatbar-username"  placeholder="Someone" onKeyPress={this.changeUserName}/>
        <input className="chatbar-message" ref="msg" placeholder="Type a message and hit ENTER" onKeyPress={this.KeyPress} />
      </footer>
    );
  }
}

ChatBar.defaultProps = {name: 'Anonymous'};

export default ChatBar;
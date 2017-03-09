import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
  super(props);
    this.state = {
    user: 0,
    data: {
      messages: [],
      currentUser: {name: 'Anonymous'}}
    }
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
  }


componentDidMount() {
  this.socket = new WebSocket('ws://localhost:3001');
  this.socket.onopen = (event) => {
    console.log('Connected to server')
  }

  this.socket.onmessage = (event) => {
    console.log('Inside Component DidMount Function',JSON.parse(event.data));
    let message = JSON.parse(event.data)



    if (message.type === 'userNew'){
      this.setState({user: message.user})
    } else {
      this.setState({data: {messages: this.state.data.messages.concat(JSON.parse(event.data)),
      currentUser: {name: this.state.data.currentUser.name} }})
    }
  }
}

_handleKeyPress(e){
  if (e.key === 'Enter') {
    const  newMessage = { type: 'chatty', username:this.state.data.currentUser.name, content:e.target.value }
    this.socket.send(JSON.stringify(newMessage))
    e.target.value = ''
  }
}

handleUserName(e){
  if(e.key === 'Enter'){
    const oldUsername = this.state.data.currentUser.name;
    const newMessage = { type: 'system', username:'', content:  `Chattybot: ${oldUsername} changed username to ${e.target.value}` }
    this.setState({data: {messages: this.state.data.messages, currentUser: {name: e.target.value}}})
    this.socket.send(JSON.stringify(newMessage))
  }
}

render() {
  console.log('Rendering <App/>');
  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-text"> {this.state.user}  </span>
      </nav>
      <MessageList message = {this.state.data.messages}/>
      <ChatBar name={this.state.data.currentUser.name} handleKeyPress={this._handleKeyPress} handleUserName={this.handleUserName} />
    </div>
  );
}
}
export default App;

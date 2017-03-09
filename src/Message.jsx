import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log('Rendering <Message/>');
    let content = this.props.content;
    console.log(typeof this.props.content)
    const regex = /([a-z]+\:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)/ig
    let match = regex.exec(content);
    // let url = match[0];
    let text = content.replace(regex, '');
    if(match === null){
      return (
          <div className={'message ' + this.props.type} >
            <span className="message-username" style={{color: this.props.color}}> {this.props.username} </span>
            <span className="message-content">{this.props.content}</span>
          </div>
      );
    } else {
      return(
      <div className={'message ' + this.props.type} >
          <span className="message-username" style={{color: this.props.color}}> {this.props.username} </span>
          <span className="message-content">{text}</span>
          <img className="message-img" src={match[0]}/>
        </div>
    );
    }

  }
}
export default Message;
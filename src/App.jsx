import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" class="navbar-brand">Chatty</a>
        <main class="messages">
          <div class="message">
            <span class="message-username">Anonymous</span>
            <span class="message-content">I won't be impressed with technology until I can download food.</span>
          </div>
          <div class="message system">
            Anonymous changed their name to nomnom.
          </div>
        </main>
        <footer class="chatbar">
          <input class="chatbar-username" placeholder="Your Name (Optional)" />
          <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      </nav>
      </div>
    );
  }
}
export default App;

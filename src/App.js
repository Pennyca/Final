import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";
import background from "../src/paw-print-seamless-pattern.png";

function userName() {
  const names = ["Batman", "Superman", "Deckard Cain", "Misty", "Little mermaid", "Jura", "Spiderman", "Harry Potter", "Sherlock Holmes", "Moby Dick", "Wolfman", "Dracula", "Frankenstein", "D'Artagnan", "Alan Ford", "Don Quijote", "The godfather", "Ahil", "Diablo", "Tesla"];
    
  const name = names[Math.floor(Math.random() * names.length)];
    return name;
}

  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  } 

class App extends Component {
  state = {
    messages: [],
    member: {
      username: userName() + ", " + new Date().toLocaleTimeString(),
      color: randomColor(), 
    }
  }

  render() {
    return (
      <div className="App1" >
        <div className="App-header"  style={{ backgroundImage: `url(${background})` }} >
          <h1>Moja brbljaona</h1> 
        </div>
        <Messages messages={this.state.messages} currentMember={this.state.member}/> 
        <Input onSendMessage={this.onSendMessage} />
        
      </div>
    );
  }
  componentDidMount() {
    this.drone = new window.Scaledrone("bpcfo8ocHTbeVTNa", {
        data: this.state.member
    });
    this.drone.on('open', error => {
        if (error) {
            return console.error(error);
        }
        const member = { ...this.state.member };
        member.id = this.drone.clientId;
        this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
        const messages = this.state.messages;
        messages.push({ member, text: data });
        this.setState({ messages });
    });
}

/*šalje poruku svim ostalim userima */
onSendMessage = (message) => {
    this.drone.publish({
        room: "observable-room",
        message
    });
}
}

export default App;
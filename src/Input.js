import {Component} from "react";
import React from "react";

class Input extends Component {
  state = {
    text: "",
    greskaPredaja: ""
    }

    onChange(e) {

        this.setState({ text: e.target.value });
        this.setState({ greskaPredaja: "" });
  }

  onSubmit(e) {
    e.preventDefault();
    var text = this.state.text;
    console.log(text);

    if(this.state.text !== ""){
       // nakon što se stisne gumbić Send, poruka iz inputa se 'briše'
      this.props.onSendMessage(this.state.text);
      this.setState({text: ""});
    }

    else {
      this.setState({ greskaPredaja: "Enter your message." });
    }
 
  }

  onClick(e) {
    this.setState({text: ""})
  } 

  render() {
    return (
      <div className="Input" >
        <form onSubmit={e => this.onSubmit(e)} >
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Type here"
            autoFocus
          />
          <button >Send</button>
          <button type="button" onClick={e => this.onClick(e)}>Delete</button>      
        </form>
        <p><strong>{this.state.greskaPredaja}</strong></p>
      </div>
    );
  }
}
export default Input;
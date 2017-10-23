import React, { Component } from 'react';
import './App.css';
import Chatwindow from './chat-window/chat-window.js'
class App extends Component {
  constructor() {
    super();
    this.state = { display: { jodi: "hide", joni: "show" } }

  }
    //  why does this next function not work? ask TAs 

  // switchWindow = (evt, showName, hideName) => {
  //   evt.preventDefault();
    
  //   this.setState({ display: { showName: "show", hideName: "hide" } }, ()=>console.log(`nice we're switching windows here we go ${showName} is showing ${hideName} is hiding`)
  //   this.setState({ display: { showName: "show", hideName: "hide" } }, 
  //   ()=>console.log(`nice we're switching windows here we go ${showName} is showing ${hideName} is hiding`)

  // )
  // }
  switchWindow = (evt, showName,hideName) => {
    evt.preventDefault();
    if (showName==="jodi"){
    this.setState({ display: { jodi: "show", joni: "hide" } }, 
    ()=>console.log(`nice we're switching windows here we go ${showName} is showing ${hideName} is hiding`)
    )}
    else if (showName ==="joni"){
    this.setState({ display: { joni: "show", jodi: "hide" } }, 
    ()=>console.log(`nice we're switching windows here we go ${showName} is showing ${hideName} is hiding`)
    )}
  }
ComponentDidUpdate(){
  console.log("the Chatwindow component updated!")
console.log(this.state)
}

  render() {
    console.log(this.state.display)
    return (<div className="container">
      <div className="sidebar">
        <ul>
          <li><a onClick={(evt) => this.switchWindow(evt, "joni", "jodi")}>Joni</a></li>
          <li><a onClick={(evt) => this.switchWindow(evt, "jodi", "joni")}>Jodi</a></li>
        </ul>
      </div>
      {/* the classnames of the Chatwindow elements get assigned to
   the top-level container divs which are rendered by those elements */}
      <Chatwindow ref={this.joni} className={`bongo ${this.state.display.joni}`} bot="Joni" />
      <Chatwindow ref={this.jodi} className={`dongo ${this.state.display.jodi}`} bot="Jodi" />
    </div>)
  }
}

export default App;

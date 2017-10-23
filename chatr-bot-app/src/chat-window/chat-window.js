import React from "react";

class Chatwindow extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.className)
    //how to make the bot responses
    this.state = {
      items: [],
      userName: "boggo",
      bot: {
        name: this.props.bot,
        responses: [`Boggo is a dumb name. sorry. #honesty`,
          `I like the cut of your jib`,
          `I am not a bot`]
      }
    }

  }
  componentDidMount() {
    //sets the botname to the bot that was passed in when Chatwindow was made
    //but I have to specify each of the this.state.bot object properties when
    //I really just want to update one. So how do I do this with setState without
    //making the entire object over again? Is this what a shallow merge means? ask TAs

    // var botResponses = this.state.bot.responses 
    // botResponses = {}
    // this.setState({bot:{name:this.props.bot,responses:["1","2,","3"]}})
  }

  botResponse = (msgObj) => {
    //puts together an object and passes it to addLine
    var i = Math.floor(Math.random() * 3)
    // console.log(`i is equal to ${i}`)
    var responseText = this.state.bot.responses[i]
    var botMsgObj = { name: this.state.bot.name, msg: responseText, type: "bot" }
    console.log("bot is responding...")
    this.addLine(botMsgObj);
    this.fredResponse(botMsgObj);
  }
  fredResponse(msgObj) {
    var i = Math.floor(Math.random() * 3)
    if (i===1) { var favouritePerson = msgObj.name
    var fredMsgObj = { name: "freddo", msg: `I agree with ${favouritePerson}`, type: "freddo" }
    this.addLine(fredMsgObj)}
  }

  addLine = (msgObj) => {
    this.setState(
      st => (
        { items: st.items.concat(msgObj) }),
      () => {
        console.log("just added a message to the array. the items state is:");
        console.log(this.state.items)
      })


  }
  sendMsg = (event) => {
    //prevents the form submission from refreshing the page
    event.preventDefault();
    if (this.chatInput.value) {
      console.log("user sent a message...")
      var messageText = this.chatInput.value;
      //puts together an object and passes it to addLine
      var userMsgObj = { name: this.state.userName, msg: messageText, type: "human" }
      this.addLine(userMsgObj);
      this.fredResponse(userMsgObj);

      //clears the chat entry box
      this.chatInput.value = ""
      //tells the bot to respond after a second of consideration
      setTimeout(this.botResponse, 300, userMsgObj)
    }
  }

  changeUserName = (event) => {
    event.preventDefault();
    if (this.nameInput.value) {
      console.log("user is changing name...")
      var userNameText = this.nameInput.value;
      //clears the name entry box
      this.nameInput.value = ""
      //these lines set the bot responses to reflect the new username. turns out you can do that with this.props
      //but only if you pass props to the super() in the Constructor. Then you can use thos props right away
      //in the constructor!
      var changeNameObj={name:"Channel",msg:`${this.state.userName} changed their name to ${userNameText}`}
      this.addLine(changeNameObj);
      var updatedBot = this.state.bot
      updatedBot.responses[0]=`${userNameText} is a dumb name. sorry. #honesty`
      this.setState({userName:userNameText, bot:updatedBot})}
   
      // this.setState({userName:userNameText})
    
  }


  displayLine = messageObject =>
    //sets the class of the <li> element based on whether it's a human- or bot- sent message
    //changes color of messages this way
    <li className={`${messageObject.type}-msg`}>
      {messageObject.name} : {messageObject.msg}
    </li>


  render() {
    return (
      <div className={this.props.className}>
        <div className="talking-area" ref={this.talkingArea}>
        <header><h2>{this.state.bot.name}</h2></header>
          <ul>
            {/* this next line starts the "scrolling"; if there's 12 or more messages, it just displays the 
        last 12 using a slice method on the items array that starts from the 12th last message up to
        the last message*/}
            {this.state.items.length >= 12 ? this.state.items.slice(this.state.items.length - 12, this.state.items.length).map(this.displayLine)
              : this.state.items.map(this.displayLine)}
          </ul>
        </div>
        <div className="buttons-field">
          <form className="chat-form" onSubmit={this.sendMsg}>
            <input ref={r => this.chatInput = r} placeholder="chat with the bot" />
            <button ref={this.sendMsgButton} type="submit" >Send</button>

          </form>
          <form className="username-form" onSubmit={this.changeUserName}>
            <input ref={r => this.nameInput = r} placeholder="change yr username" />

            <button type="submit" ref={this.userNameChangeButton}>Change</button>
          </form>
          <div className="username-change"></div>
        </div>
      </div>
    )
  }
}

export default Chatwindow;

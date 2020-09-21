import React, { Component } from "react";
import { Send } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import firebase from "../services/Firebase";
import "./ChatBox.css";

class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      sentMessage: "",
      platform: "Web",
    };
  }

  componentDidMount = () => {
    this.subscriber = firebase
      .firestore()
      .collection("Chats")
      .onSnapshot((res) => {
        let docs = res.size ? res.docs : [];
        this.setState({ chats: docs, loaded: true });
      });
  };

  componentWillUnmount() {
    if (this.subscriber) this.subscriber();
  }

  onMessageUpdate = (val) => {
    this.setState({
      sentMessage: val,
    });
  };

  onSendMessage = () => {
    firebase.firestore().collection("Chats").add({
      message: this.state.sentMessage,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      platform: this.state.platform,
    });
    this.setState({
      sentMessage: "",
    });
  };

  render() {
    return this.state.chats ? (
      <div className="container">
        <div className="chat-area">
          {this.state.chats
            .sort((a, b) =>
              a.data().timeStamp.toMillis() > b.data().timeStamp.toMillis()
                ? 1
                : -1
            )
            .map((item, index) => (
              <div
                className={
                  this.state.platform === item.data().platform
                    ? "reciever"
                    : "sender"
                }
              >
                {item.data().message}
              </div>
            ))}
        </div>
        <div className="chat-input">
          <input
            className="input"
            placeholder="Type here..."
            value={this.state.sentMessage}
            onChange={(event) =>
              this.setState({ sentMessage: event.target.value })
            }
          />
          <IconButton onClick={() => this.onSendMessage()}>
            <Send />
          </IconButton>
        </div>
      </div>
    ) : null;
  }
}

export default componentName;

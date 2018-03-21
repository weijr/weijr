import React, { Component } from "react";
import "./App.css";
import App from "./App";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db } from "../fire/firestore";
import { connect } from "react-redux";
import { postMssage, writeMessage } from "../store";
import MessageList from "./GeneralChat/messageList";
import GeneralChat from "./GeneralChat/index";
import WagerComponent from "./WagerComponent";
import { Header, Icon, Image, Segment, Grid, Button } from 'semantic-ui-react'
// const firebase = require("firebase");
// require("firebase/firestore");

// var config = {
//   apiKey: "AIzaSyD-SRNhQPjUTiCCFjb8miJPkvaNwaEIvxA",
//   authDomain: "mafia-blockchain.firebaseapp.com",
//   databaseURL: "https://mafia-blockchain.firebaseio.com",
//   projectId: "mafia-blockchain",
//   storageBucket: "mafia-blockchain.appspot.com",
//   messagingSenderId: "291156435310"
// };

// firebase.initializeApp(config);

// var db = firebase.firestore();

class InitialGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      wager: this.props.match.params.id
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick= (event) => {
    event.preventDefault();
    this.props.history.push('/')
  }



  render() {
    const wagerA = this.state.wager.split('vs')[0];
    const wagerB = this.state.wager.split('vs')[1];
    console.log()
    return (
      <div className="App">
        <Segment inverted>
          <Header inverted as="h2" icon textAlign="center">
            <Grid columns={3}>
              <Grid.Column>
                <Button circular onClick={this.onClick}>
                  <Icon name="home" circular />
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Icon name="yen" circular />
              </Grid.Column>
            </Grid>
            <Header.Content>
              {wagerA} vs. {wagerB}
            </Header.Content>
          </Header>
        </Segment>
        <Grid>
          <Grid.Column width={8}>
            <GeneralChat wager={this.state.wager} />
          </Grid.Column>
          <Grid.Column width={8}>
            <WagerComponent wager={this.state.wager} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// const mapStateToProps = function (state, ownProps) {
//   return {
//     newMessageEntry: state.newMessageEntry,
//     name: state.name
//   };
// };

// const mapDispatchToProps = function (dispatch, ownProps) {
//   return {
//     handleChange (evt) {
//       dispatch(writeMessage(evt.target.value));
//     },
//     handleSubmit (name, content, evt) {
//       evt.preventDefault();

//       // const { channelId } = ownProps;

//       dispatch(postMessage({ name, content, evt }));
//       // dispatch(writeMessage(''));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(InitialGameView);

export default withRouter(InitialGameView);

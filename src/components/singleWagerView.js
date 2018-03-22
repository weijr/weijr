import React, { Component } from "react";
import "./app.css";
import App from "./app";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userName } from "../fire/firestore";
import { connect } from "react-redux";
import { postMssage, writeMessage } from "../store";
import MessageList from "./generalChat/messageList";
import GeneralChat from "./generalChat/index";
import WagerComponent from "./wagerComponent";
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

class SingleWagerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      wager: this.props.match.params.address,
      currentUser: ""
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    var email;

    auth.onAuthStateChanged(function(user) {
      if (user) { 
        email = user.email;
        }
      })

    this.setState({
      currentUser: email
    })
  }

  onClick= (event) => {
    event.preventDefault();
    this.props.history.push('/')
  }



  render() {
    let email
    // auth.onAuthStateChanged(function(user) {
    //   if (user) { 
    //     // User is signed in.
    //     email = user.email;
    //   }}
    // )
    const wagerA = this.state.wager.split('vs')[0];
    const wagerB = this.state.wager.split('vs')[1];
    console.log("auth: ", auth.currentUser)
    console.log("state: ", this.state.currentUser)
    if (!this.state.currentUser) {
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
                  <Icon name="users" circular />
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
      )
    } else {
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
                  <Icon name="users" circular />
                </Grid.Column>
              </Grid>
              <Header.Content>
                Pleaes Sign In To See Wager Details
              </Header.Content>
            </Header>
          </Segment>
          </div>
      )
    }
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

export default withRouter(SingleWagerView);

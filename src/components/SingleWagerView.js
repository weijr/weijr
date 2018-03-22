import React, { Component } from "react";
import "./App.css";
import App from "./App";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userName } from "../fire/firestore";
import { connect } from "react-redux";
import { postMssage, writeMessage } from "../store";
import MessageList from "./GeneralChat/MessageList";
import GeneralChat from "./GeneralChat/";
import WagerComponent from "./WagerComponent";
import { Header, Icon, Image, Segment, Grid, Button } from 'semantic-ui-react'


class SingleWagerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      wager: this.props.match.params.address,
      currentUser: this.props.currentUser
    };
    this.onClick = this.onClick.bind(this);
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
    if (this.state.currentUser) {
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
      this.props.history.push('/')
      return null
    }
    // } else {
    //   return (
    //     <div className="App">
    //       <Segment inverted>
    //         <Header inverted as="h2" icon textAlign="center">
    //           <Grid columns={3}>
    //             <Grid.Column>
    //               <Button circular onClick={this.onClick}>
    //                 <Icon name="home" circular />
    //               </Button>
    //             </Grid.Column>
    //             <Grid.Column>
    //               <Icon name="users" circular />
    //             </Grid.Column>
    //           </Grid>
    //           <Header.Content>
    //             Pleaes Sign In To See Wager Details
    //           </Header.Content>
    //         </Header>
    //       </Segment>
    //       </div>
    //   )
    // }
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    currentUser: state.user
  };
};

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

export default withRouter(connect(mapStateToProps, null)(SingleWagerView));

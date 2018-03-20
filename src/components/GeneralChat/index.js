import React, { Component } from "react";
// import '../App.css';
// import App from '../App'
import { Switch, Route, Link } from "react-router-dom";
import { db } from "../../fire/firestore";
import { connect } from "react-redux";
import MessageList from "./messageList";
import NewMessageEntry from "./newMessageEntry";
import logo from "../../logo.svg";
import { Header, Icon, Image, Segment, Grid } from 'semantic-ui-react'

class GeneralChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      wager: this.props.wager
    };
  }

  render() {
    const wagerA = this.state.wager.split('vs')[0];
    const wagerB = this.state.wager.split('vs')[1];
    return (
      <div>
        <Segment inverted >
        <Header inverted as="h2" icon textAlign="center">
        <Grid columns={3}>
        <Grid.Column>
          <Icon name="home" circular/>
          </Grid.Column>
          <Grid.Column>
          <Icon name="yen" circular/>
          </Grid.Column>
          </Grid>
          <Header.Content>{wagerA} vs. {wagerB}</Header.Content>
        </Header>
        </Segment>
        <MessageList wager={this.state.wager} />
        <NewMessageEntry wager={this.state.wager} />
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    // newMessageEntry: state.newMessageEntry,
    // name: state.name
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    // handleChange (evt) {
    //   dispatch(writeMessage(evt.target.value));
    // },
    // handleSubmit (name, content, evt) {
    //   evt.preventDefault();
    //   // const { channelId } = ownProps;
    //   dispatch(postMessage({ name, content, evt }));
    //   // dispatch(writeMessage(''));
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralChat);


import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../ether/factory';
import web3 from '../ether/web3';
import { Router } from './routes';
import { withRouter } from 'react-router-dom';
import { db, auth, userById } from "../fire/firestore";

class CreateWager extends Component {
  state = {
    minimumBet: '',
    errorMessage: '',
    loading: false,
    title: ''
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createWager(this.state.minimumBet)
        .send({
          from: accounts[0]
        });
        const address = await factory.methods.getDeployedwagers().call()[-1]
        var data = {
          wager: this.state.title
        }

        var setDoc = db
          .collection("wagers")
          .doc(address)
          .set(data)
        this.props.history.push('/');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

      this.setState({ loading: false});
  }

  render() {
    return (
      <div>
      <h3>Create Your Wager!</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
          <label>What's The Name Of Your Wager</label>
          <Input
          value={this.state.title}
          onChange={event => this.setState({title: event.target.value})}
          label={"title"}
          labelPosition="right"
          />
          </Form.Field>
          <Form.Field>
          <label>How much do you want the buy in to be?</label>
          <Input
          value={this.state.minimumBet}
          onChange={event => this.setState({ minimumBet: event.target.value})}
          label="ether"
          labelPosition="right"
          />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreateWager);


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
    leftSide: '',
    rightSide: ''
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createWager(this.state.minimumBet, (this.state.leftSide + " vs. " + this.state.rightSide))
        .send({
          from: accounts[0]
        });
        const address = await factory.methods.getDeployedwagers().call()[-1]

        this.props.history.push('/wagers');
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
          value={this.state.leftSide}
          onChange={event => this.setState({leftSide: event.target.value})}
          label={"title"}
          labelPosition="right"
          />
          <label>Vs.</label>
          <Input
          value={this.state.rightSide}
          onChange={event => this.setState({rightSide: event.target.value})}
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

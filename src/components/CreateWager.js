
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
    rightSide: '',
    description: ''
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createWager(this.state.minimumBet, (this.state.leftSide + " vs. " + this.state.rightSide), this.state.description)
        .send({
          from: accounts[0]
        });
      const createdContract = await factory.methods.getDeployedwagers().call()

      await db
        .collection('userAddresses')
        .doc(accounts[0])
        .collection('contracts')
        .doc(createdContract.slice(-1)[0])
        .set({
          active: true
        })
      console.log("new-new: ", createdContract.slice(-1))
      this.props.history.push('/wagers');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <h3>Create Your Wagr!</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>What's The Name Of Your Wagr</label>
            <Input
              value={this.state.leftSide}
              onChange={event => this.setState({ leftSide: event.target.value })}
              label="Side One"
              labelPosition="right"
            />
            <label>Vs.</label>
            <Input
              value={this.state.rightSide}
              onChange={event => this.setState({ rightSide: event.target.value })}
              label="Side Two"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label>How much do you want the buy in to be?</label>
            <Input
              value={this.state.minimumBet}
              onChange={event => this.setState({ minimumBet: event.target.value })}
              label="ether"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label>Describe What Your Wagr Is Going To Be Below!</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
              label="description"
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

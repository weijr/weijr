
import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from './Layout';
import factory from '../ether/factory';
import web3 from '../ether/web3';
import { Router } from './routes';
import { withRouter } from 'react-router-dom';

class CreateWager extends Component {
  state = {
    minimumBet: '',
    errorMessage: '',
    loading: false
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
        this.props.history.push('/');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

      this.setState({ loading: false});
  }

  render() {
    return (
      <Layout>
      <h3>Create Your Wager!</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
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
      </Layout>
    )
  }
}

export default withRouter(CreateWager);

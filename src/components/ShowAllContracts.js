
import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Wager from '../ether/wagers';
import web3 from '../ether/web3';
import { Link } from 'react-router-dom';

class ShowAllContracts extends Component {
  static async getInitialProps(props) {
    const wager = Wager(props.query.address)

    const summary = await wager.methods.getWagerSummary().call();

    return {
      address:props.query.address,
      minimumBet: summary[0],
      pot: summary[1],
      totalUsers: summary[2],
      sideOne: summary[3],
      sideTwo: summary[4],
      manager: summary[5]
    };
  }

  renderCards() {
    const {
      pot,
      manager,
      minimumBet,
      totalUsers,
      sideOne,
      sideTwo
    } = this.props;
    console.log(this.props)

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The Manager Wants To Make Sure Your Contract Is Executed Correctly',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumBet,
        meta: 'Put Down This Much Ether',
        description:
          'You Must Put Down Exactly This Amount To Participate'
      },
      {
        header: totalUsers,
        meta: 'Number of People Involved With This Contract',
        description:
          'This Many People Are Participating'
      },
      {
        header: sideOne,
        meta: 'Number Of People Rooting For Left Side',
        description:
          'Number Of People Support The Left Side Of The Outcomes'
      },
      {
        header: sideTwo,
        meta: 'Number Of People Rooting For Right Side',
        description:
          'Number Of People Support The Right Side Of The Outcomes'
      },
      {
        header: pot,
        meta: 'Wager Pot (ether)',
        description:
          'This Is How Much Money You Might Win! (split amongst your team of course)'
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <h3>Current Active Wagers</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column>
            <Link to={`/game`}>
              <a>
                <Button primary>View Wager</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default ShowAllContracts;

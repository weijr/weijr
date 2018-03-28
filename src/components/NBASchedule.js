import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userById, email } from "../fire/firestore";
import history from "../history";
import store from "../store";
import { browserHistory } from "react-router";
import GeneralChat from "./GeneralChat/";
import basketball from "./basketball.png";
import NavBar from './NavBar'
import HeaderButtons from './HeaderButtons'
import {
  Header,
  Icon,
  Image,
  Segment,
  Grid,
  Button,
  Card,
  Dropdown
} from "semantic-ui-react";
import factory from "../ether/factory";
import { connect } from "react-redux";
import App from "./App";
import { writeMessage } from "../store";
import axios from "axios";

class NBASchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://data.nba.net/data/10s/prod/v1/2017/schedule.json"
      )
      .then(obj => {
        let arr = [];
        for (let i = 1196; i < obj.data.league.standard.length; i++) {
          arr.push({
            home: obj.data.league.standard[i].gameUrlCode.slice(9, 12),
            away: obj.data.league.standard[i].gameUrlCode.slice(12),
            date: obj.data.league.standard[i].startDateEastern,
            time: obj.data.league.standard[i].startTimeEastern
          });
        }
        this.setState({
          games: arr
        });
      });
  }

  onClick = (evt, away, home, date, time) => {
    evt.preventDefault();
    this.props.history.push({
      pathname: "/new-wager",
      state: {
        away,
        home,
        date,
        time
      }
    });
  };

  createContract = event => {
    event.preventDefault();
    this.props.history.push("/new-wager");
  };

  profilePage = event => {
    event.preventDefault();
    this.props.history.push("/your-profile");
  };

  signUp = event => {
    event.preventDefault();
    this.props.history.push("/wagers/signup");
  };

  render() {
    if (this.state.games) {
      return (
        <div>
          <Segment inverted>
            <NavBar />
            <HeaderButtons
              logout={this.logout}
              createContract={this.createContract}
              profilePage={this.profilePage}
            />
          </Segment>
          <div className="borderFix">
            <Grid columns={2}>
              <Grid.Column width="6">
                <GeneralChat chatType="general" />
              </Grid.Column>
              <Grid columns={4}>
                {this.state.games.map(game => (
                  <Grid.Column width="4">
                    <Card
                      key={game.id}
                      className="ui segment centered"
                      onClick={evt =>
                        this.onClick(
                          evt,
                          game.away,
                          game.home,
                          game.date,
                          game.time
                        )
                      }
                    >
                      <Image src={basketball} />
                      <Card.Header />
                      {game.away} vs. {game.home}
                      <br />
                      {game.date}
                      <br />
                      {game.time}
                      <br />
                    </Card>
                  </Grid.Column>
                ))}
              </Grid>
            </Grid>
          </div>
        </div>
      );
    } else if (this.state.currentUser) {
      return <div>Loading...</div>;
    }
  }
}

export default withRouter(NBASchedule);

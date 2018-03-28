import React, { Component } from "react";
import logo from "../logo.svg";
import "./App.css";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userById, email } from "../fire/firestore";
import history from "../history";
import store from "../store";
import { browserHistory } from "react-router";
import GeneralChat from "./GeneralChat/";
import soccer from "./soccer.png";
import NavBar from "./NavBar";
import HeaderButtons from "./HeaderButtons";
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
import HomeButton from "./HomeButton";

class PremierLeagueSchedule extends Component {
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
        "https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/openfootball/football.json/master/2017-18/en.1.json"
      )
      .then(obj => {
        let arr = [];
        for (let i = 32; i < 38; i++) {
          obj.data.rounds[i].matches.forEach(match => {
            arr.push({
              home: match.team1.name,
              away: match.team2.name,
              date: match.date
            });
          });
        }
        return arr;
      })
      .then(arr =>
        this.setState({
          games: arr
        })
      );
  }

  onClick = (evt, away, home, date) => {
    evt.preventDefault();
    this.props.history.push({
      pathname: "/new-wager",
      state: {
        away,
        home,
        date,
        logo: 'soccer'
      }
    });
  };

  goHome = event => {
    this.props.history.push("/wagers");
  };

  render() {
    if (this.state.games) {
      return (
        <div>
          <Segment inverted textAlign='center'>
            <NavBar />
            <HomeButton goHome={this.goHome} />
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
                        this.onClick(evt, game.away, game.home, game.date)
                      }
                    >
                      <Image src={soccer} />
                      <Card.Header />
                      {game.away} vs. {game.home}
                      <br />
                      {game.date}
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

export default withRouter(PremierLeagueSchedule);

import React, { Component } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import GeneralChat from "./GeneralChat/";
import basketball from "./basketball.png";
import NavBar from "./NavBar";
import { Image, Segment, Grid, Card } from "semantic-ui-react";
import axios from "axios";
import HomeButton from "./HomeButton";

class NBASchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    console.log(basketball);
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://data.nba.net/data/10s/prod/v1/2017/schedule.json"
      )
      .then(obj => {
        let arr = [];
        for (let i = 1196; i < obj.data.league.standard.length; i++) {
          let dateArr = [];
          const dateCode = obj.data.league.standard[i].startDateEastern;
          dateArr.push(dateCode.slice(0, 4));
          dateArr.push(dateCode.slice(4, 6));
          dateArr.push(dateCode.slice(6));
          const dateStr = dateArr.join("-");
          console.log(dateStr);
          arr.push({
            home: obj.data.league.standard[i].gameUrlCode.slice(9, 12),
            away: obj.data.league.standard[i].gameUrlCode.slice(12),
            date: dateStr,
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
        time,
        logo:
          "http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/512/Sport-basketball-icon.png"
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
          <Segment inverted textAlign="center">
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

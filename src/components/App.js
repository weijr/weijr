import React, { Component } from "react";
import logo from "../logo.svg";
import "./app.css";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { db, auth, userById, email } from "../fire/firestore";
import history from "../history";
import store from "../store";
import { browserHistory } from "react-router";
import web3 from "../web3";
import mafiaContract from "../mafiaContract";
import GeneralChat from "./generalChat/index";
import { definedRole, randomNameGenerator } from "../utils";
import InitialGameView from "./initialGameView";
import basketball from "./basketball.png";
import { Header, Icon, Image, Segment, Grid, Button, Card } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wager: "",
      listOfWagers: [],
      currentUser: ""
    };

    this.enterGame = this.enterGame.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    // var email;
    // auth.onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     email = user.email
    // }})
    // let email = await auth.currentUser.email


    db.collection("wagers").onSnapshot(snapshot => {
      this.setState({
        listOfWagers: snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.ref.id
          };
        }),
        currentUser: auth.currentUser.email
      });
    });
  }

  enterGame = event => {
    event.preventDefault();

    if (!this.state.currentUser) {
      alert("Please sign in to see wager detail")
    } else {
      
      let wager = event.target.value;
      
      var data = {
        wager: wager
      };
  
      var setDoc = db
        .collection("wagers")
        .doc(wager)
        .set(data);
      this.setState({
        wager: event.target.value
      });
      this.props.history.push(`/game/${wager}`);
    }

    // userById(auth.currentUser.uid).set({ id: auth.currentUser.uid });

    
  };

  signUp = event => {
    event.preventDefault();
    this.props.history.push('/game/signup');
  }

  logout = () => {
    auth.signOut()
    .then(() => {
      this.setState({
        currentUser: ""
      })
    })
   
  }

  render() {
    // console.log("list: ", this.state.listOfWagers);
    // console.log(auth);

    var user = auth.currentUser;

    if (user) {
      console.log("user: ", user)
    } else {
      console.log("else: ", user)
    }

    console.log("state: ", this.state.currentUser)
    const wagerList = this.state.listOfWagers;
    console.log("wagerlist: ", wagerList)
    if (this.state.currentUser) {
      return (
        <div>
        <Segment inverted>
          <Header inverted as="h2" icon textAlign="center">
            <Icon name="ethereum" circular />
            <Header.Content>
              <h2 className="ui red header">
                Welcome 2 Wagr
            </h2>
            </Header.Content>
            <Header.Content>
              <h2 className="ui red header">
                See a wager that you like? Sign in to see more!
              </h2>
            </Header.Content>
            <Header.Content>
              <Button onClick={this.logout}>
                Logout
              </Button>
            </Header.Content>
          </Header>
        </Segment>
        <Grid columns={5}>
          {wagerList.map(wager => (
            <Grid.Column>
              <Card key={wager.id} className="ui segment centered">
                <Image src={basketball} />
                <Card.Header />
                <Button key={wager.id} value={wager.id} onClick={this.enterGame}>
                  Click here to bet on {wager.id.split("vs").join(" vs. ")}
                </Button>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
        </div>
      )
    } else {
      return (
        <div>
        <Segment inverted>
          <Header inverted as="h2" icon textAlign="center">
            <Icon name="ethereum" circular />
            <Header.Content>
              <h2 className="ui red header">
                Welcome 2 Wagr
            </h2>
            </Header.Content>
            <Header.Content>
              <h2 className="ui red header">
                See a wager that you like? Click on it to ante up!
              </h2>
            </Header.Content>
            <Header.Content>
              <Button onClick={this.signUp}>
                Sign up/Sign in
              </Button>
            </Header.Content>
          </Header>
        </Segment>
        <Grid columns={5}>
          {wagerList.map(wager => (
            <Grid.Column>
              <Card key={wager.id} className="ui segment centered">
                <Image src={basketball} />
                <Card.Header />
                <Button key={wager.id} value={wager.id} onClick={this.enterGame}>
                  Click here to bet on {wager.id.split("vs").join(" vs. ")}
                </Button>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
        </div>
        )
      }
    }
  }

export default withRouter(App);

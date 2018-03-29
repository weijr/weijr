import React, { Component } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import { db, auth } from "../fire/firestore";
import { getAllWagers, getSortedWagers } from "../store";
import GeneralChat from "./GeneralChat/";
import basketball from "./basketball.png";
import { Segment, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import HeaderButtons from "./HeaderButtons";
import DropDownSort from "./Utils/DropDownSort";
import RenderWagers from "./RenderWagers";

class AllWagers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wager: "",
      listOfWagers: [],
      wagerURLs: [],
      currentUser: this.props.currentUser
    };
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
    this.onClickSort = this.onClickSort.bind(this);
    this.getImageFromFB = this.getImageFromFB.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllWagers();
  }

  signUp = event => {
    event.preventDefault();
    this.props.history.push("/wagers/signup");
  };

  logout = () => {
    auth
      .signOut()
      .then(() => {
        this.setState({
          currentUser: ""
        });
      })
      .then(() => {
        this.props.history.push("/");
      });
  };

  createContract = event => {
    event.preventDefault();
    this.props.history.push("/new-wager");
  };

  onClickSort = (event, data) => {
    event.preventDefault();
    let listOfWagersSorted = this.props.listOfWagers.slice();
    let type = data.value.split("-")[0];
    let order = data.value.split("-")[1] + "-" + data.value.split("-")[2];
    if (order === "low-high") {
      var sortedList = listOfWagersSorted.sort(function(a, b) {
        return parseInt(a[type]) - parseFloat(b[type]);
      });
    } else {
      var sortedList = listOfWagersSorted.sort(function(a, b) {
        return parseInt(b[type]) - parseFloat(a[type]);
      });
    }
    this.props.fetchSortedWagers(sortedList);
  };

  profilePage = event => {
    event.preventDefault();
    this.props.history.push("/your-profile");
  };

  getImageFromFB = async name => {
    await db
      .collection("wagers")
      .doc(name)
      .collection("image")
      .onSnapshot(snapshot => {
        if (snapshot.docs.length) {
<<<<<<< HEAD
          console.log(snapshot.docs[0].data().imageURL);
=======
>>>>>>> 806332caf30eabd62a3f23768460eac044650d43
          return snapshot.docs[0].data().imageURL;
        } else return basketball;
      });
  };

  render() {
    const wagerList = this.props.listOfWagers;
<<<<<<< HEAD
    console.log(wagerList);
=======
>>>>>>> 806332caf30eabd62a3f23768460eac044650d43
    if (this.state.currentUser && this.props.listOfWagers) {
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
            <DropDownSort onClickSort={this.onClickSort} />
            <Grid columns={2} centered>
              <Grid.Column width="6">
                <GeneralChat chatType="general" />
              </Grid.Column>
              <Grid.Column width="10">
                <RenderWagers wagerList={wagerList} columns={4} />
              </Grid.Column>
            </Grid>
          </div>
        </div>
      );
    } else if (this.state.currentUser) {
      return <div>Loading...</div>;
    } else {
      this.props.history.push("/");
      return null;
    }
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    currentUser: state.user,
    listOfWagers: state.wagers
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    fetchAllWagers() {
      dispatch(getAllWagers());
    },
    fetchSortedWagers(listOfWagers) {
      dispatch(getSortedWagers(listOfWagers));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllWagers)
);

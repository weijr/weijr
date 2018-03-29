import React, { Component } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import { auth } from "../fire/firestore";
import { connect } from "react-redux";
import { setUser } from "../store";
import { withAlert } from "react-alert";
import NavBar from "./NavBar";
import SignUpForm from "./SignUpForm";
import { Segment } from "semantic-ui-react";

class SignUp extends Component {
  signUp = async event => {
    event.preventDefault();
    try {
      const username = event.target.username.value;
      const email = event.target.email.value;
      const password = event.target.password.value;

      const user = await auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: username });
      this.props.setUser(user);
      this.props.history.push("/wagers");
    } catch (error) {
      this.props.alert.show(error.message);
    }
  };

  render() {
    return (
      <div>
        <Segment inverted>
          <NavBar message={"Sign up for an account!"} />
        </Segment>
        <SignUpForm onSubmit={this.signUp} />
      </div>
    );
  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    setUser(user) {
      dispatch(setUser(user));
    }
  };
};

export default withRouter(withAlert(connect(null, mapDispatchToProps)(SignUp)));

import "./App.css";
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Button, Dropdown } from "semantic-ui-react";

const HeaderButtons = props => {
  return (
    <Grid columns={4} textAlign="center">
      <Grid.Column>
        <Header.Content>
          <Button className="primary button" circular onClick={props.logout}>
            Logout
          </Button>
        </Header.Content>
      </Grid.Column>
      <Grid.Column>
        <Header.Content>
          <Button
            className="primary button"
            circular
            onClick={props.createContract}
          >
            Create a new Contract
          </Button>
        </Header.Content>
      </Grid.Column>
      <Grid.Column>
        <Header.Content>
          <Button
            className="primary button"
            circular
            onClick={props.profilePage}
          >
            Profile Page
          </Button>
        </Header.Content>
      </Grid.Column>
      <Grid.Column>
        <Button className="primary button" circular>
          <Dropdown text="Game Schedules" pointing className="link item">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={"/nbaSchedule"}>NBA Games</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/eplSchedule"}>Premier League Games</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default HeaderButtons;

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Nav extends Component {
  render() {
    const { authUser } = this.props;

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <NavLink to="/" activeClassName="active">
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
        </List>
        {authUser === null ? (
          <List component="nav">
            <Divider />
            <NavLink to="/createuser" activeClassName="active">
              <ListItem button>
                <ListItemText primary="New User" />
              </ListItem>
            </NavLink>
          </List>
        ) : (
          <List component="nav">
            <Divider />
            <NavLink to="/add" activeClassName="active">
              <ListItem button>
                <ListItemText primary="New Question" />
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to="/leaderboard" activeClassName="active">
              <ListItem button>
                <ListItemText primary="Leaderboard" />
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to="/logout">
              <ListItem button>
                <ListItemText primary="Logout" />
              </ListItem>
            </NavLink>
          </List>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}
export default connect(mapStateToProps)(withStyles(styles)(Nav));

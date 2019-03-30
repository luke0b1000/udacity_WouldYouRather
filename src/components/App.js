import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { handleSetAuthUser } from "../actions/authUser";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import CreateUser from "./CreateUser";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import ProgressBar from "./ProgressBar";

const drawerWidth = 200;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    toolbarCN: {
        display: "flex",
        justifyContent: "space-between"
    }
});

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }
    render() {
        const { goToLogin, handleSetAuthUser, authUser } = this.props;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar className={classes.toolbarCN}>
                        <Typography variant="title" color="inherit" noWrap>
                            Would You Rather ?
                        </Typography>
                        {!goToLogin && (
                            <Typography
                                align="right"
                                variant="title"
                                color="inherit"
                                noWrap
                            >
                                {`Hello ${authUser}`}
                            </Typography>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>{<Nav />}</List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <ProgressBar color="secondary" />
                    {goToLogin === true ? (
                        <Switch>
                            <Route
                                exact
                                path="/createuser"
                                component={CreateUser}
                            />
                            <Route path="/" component={Login} />
                        </Switch>
                    ) : (
                        <Dashboard />
                    )}
                    <Route
                        exact
                        path="/logout"
                        render={() => {
                            handleSetAuthUser(null);
                            return <Redirect to="/" />;
                        }}
                    />
                </main>
            </div>
        );
    }
}

function mapStateToProps({ authUser, users }) {
    return {
        goToLogin: authUser === null,
        users,
        authUser
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { handleInitialData, handleSetAuthUser },
        dispatch
    );
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(App))
);

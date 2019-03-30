import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleAddUser } from "../actions/users";
import { Redirect, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        width: 300
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    }
});

class CreateUser extends Component {
    state = {
        redirect: false,
        username: "",
        name: "",
        avatarURL: ""
    };
    handleTextChange = (e, inputField) => {
        console.log(inputField);
        this.setState(prevState => ({
            inputField: e.target.value
        }));
    };
    handleSubmit = e => {
        e.preventDefault();
        if (this._username.value === "" || this._name.value === "") {
            return;
        }
        const userObj = {
            id: this._username.value,
            name: this._name.value,
            avatarURL: this._avatarUrl.value,
            answers: {},
            questions: []
        };
        this.props.handleAddUser(userObj);
        this.setState({
            redirect: true
        });
    };

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/" />;
        }
        const { classes } = this.props;
        return (
            <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={this.handleSubmit}
            >
                <TextField
                    key="username"
                    id="username"
                    label="username"
                    placeholder="username"
                    className={classes.textField}
                    margin="normal"
                    inputProps={{
                        ref: inputValue => (this._username = inputValue)
                    }}
                />
                <TextField
                    key="name"
                    id="name"
                    label="name"
                    placeholder="name"
                    className={classes.textField}
                    margin="normal"
                    inputProps={{
                        ref: inputValue => (this._name = inputValue)
                    }}
                />
                <TextField
                    key="avatarURL"
                    id="avatarURL"
                    label="avatarURL"
                    placeholder="avatarURL"
                    className={classes.textField}
                    margin="normal"
                    inputProps={{
                        ref: inputValue => (this._avatarUrl = inputValue)
                    }}
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                >
                    Submit
                </Button>
            </form>
        );
    }
}

function mapDispatchToState(dispatch) {
    return bindActionCreators({ handleAddUser }, dispatch);
}

export default withRouter(
    connect(
        null,
        mapDispatchToState
    )(withStyles(styles)(CreateUser))
);

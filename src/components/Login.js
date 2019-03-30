import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleSetAuthUser } from "../actions/authUser";

import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    buttonWidth: {
        width: 30
    }
});

class Login extends Component {
    state = {
        formSelect: ""
    };
    handleChange = e => {
        this.setState({
            formSelect: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.formSelect !== "") {
            this.props.handleSetAuthUser(this.state.formSelect);
        }
    };
    render() {
        const { loading, usersArray } = this.props;
        const { classes } = this.props;
        return (
            <div>
                {loading === true ? null : (
                    <form className={classes.root} onSubmit={this.handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="user-helper">
                                Select User
                            </InputLabel>
                            <Select
                                value={this.state.formSelect}
                                onChange={this.handleChange}
                                input={<Input name="user" id="user-helper" />}
                            >
                                <MenuItem value="">
                                    <em>Select User</em>
                                </MenuItem>
                                {usersArray.map(user => {
                                    return (
                                        <MenuItem key={user} value={user}>
                                            {user}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>Select the user</FormHelperText>
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.buttonWidth}
                                onClick={this.handleSubmit}
                                disabled={this.state.formSelect === ""}
                            >
                                Submit
                            </Button>
                        </FormControl>
                    </form>
                )}
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        loading: Object.keys(users).length === 0,
        usersArray: Object.keys(users)
    };
}
function mapStateToDispatch(dispatch) {
    return bindActionCreators({ handleSetAuthUser }, dispatch);
}

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(withStyles(styles)(Login));

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleNewQuestion } from "../actions/shared";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    bootstrapRoot: {
        padding: 0,
        "label + &": {
            marginTop: theme.spacing.unit * 3
        }
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 12px",
        width: "calc(100% - 24px)",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:focus": {
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
    },
    bootstrapFormLabel: {
        fontSize: 18
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
});

class AddQuestion extends Component {
    state = {
        optionOne: "",
        optionTwo: "",
        toHome: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.handleNewQuestion(
            this.state.optionOne,
            this.state.optionTwo
        );
        this.setState({ toHome: true });
    };
    handleChangeText = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        if (this.state.toHome === true) {
            return <Redirect to="/" />;
        }
        const { classes } = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="headline" component="h3">
                            Would you Rather ...
                        </Typography>
                        <TextField
                            placeholder="Option One"
                            id="bootstrap-input"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.bootstrapFormLabel
                            }}
                            name="optionOne"
                            onChange={this.handleChangeText}
                        />
                        <br />
                        <Typography component="h5">
                            OR
                        </Typography>
                        <br />
                        <TextField
                            placeholder="Option Two"
                            id="bootstrap-input"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.bootstrapFormLabel
                            }}
                            name="optionTwo"
                            onChange={this.handleChangeText}
                        />
                        <br />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                    </Paper>
                </form>
            </div>
        );
    }
}

function mapStateToDispatch(dispatch) {
    return bindActionCreators({ handleNewQuestion }, dispatch);
}

export default connect(
    null,
    mapStateToDispatch
)(withStyles(styles)(AddQuestion));

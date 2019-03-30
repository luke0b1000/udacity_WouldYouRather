import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { handleSaveAnswer } from "../actions/shared";
import CommentPage from "./CommentPage";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = theme => ({
    card: {
        display: "flex"
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0"
    },
    cover: {
        width: 151,
        height: 151
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 3}px`
    }
});

class QuestionPage extends Component {
    state = {
        selectedOption: "optionOne"
    };
    handleRadioChange = e => {
        this.setState({ selectedOption: e.target.value });
    };
    handleSubmit = (e, id) => {
        e.preventDefault();
        this.props.handleSaveAnswer({
            qid: id,
            answer: this.state.selectedOption
        });
    };
    render() {
        if (this.props.authUser === null) {
            return <Redirect to="/" />;
        }
        if (this.props.question === null) {
            return <div>This question doesn't exist</div>;
        }
        const { user, question, users } = this.props;
        const userAnswer = Object.keys(user.answers).includes(question.id);
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const totalVotes = optionOneVotes + optionTwoVotes;
        const optionOneVotesPercentage = (
            (optionOneVotes / totalVotes) *
            100
        ).toFixed(0);
        const optionTwoVotesPercentage = (
            (optionTwoVotes / totalVotes) *
            100
        ).toFixed(0);

        const { classes } = this.props;
        return (
            <div>
                {userAnswer === true ? (
                    <div>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cover}
                                image={users[question.author].avatarURL}
                                title="Live from space album cover"
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                    >
                                        {question.author} ask Would you rather
                                    </Typography>
                                    <Typography
                                        className={classes.padding}
                                        color="primary"
                                    >
                                        {question.optionOne.text}{" "}
                                        <span style={{ paddingLeft: 50 }}>
                                            {optionOneVotesPercentage}% -{" "}
                                            {optionOneVotes} votes
                                        </span>
                                    </Typography>
                                    <Typography
                                        className={classes.padding}
                                        color="primary"
                                    >
                                        {question.optionTwo.text}{" "}
                                        <span style={{ paddingLeft: 50 }}>
                                            {optionTwoVotesPercentage}% -{" "}
                                            {optionTwoVotes} votes
                                        </span>
                                    </Typography>
                                    <Typography>
                                        You selected {user.answers[question.id]}
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={e => this.handleSubmit(e, question.id)}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cover}
                                    image={users[question.author].avatarURL}
                                    title="Live from space album cover"
                                />
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <FormControl
                                            component="fieldset"
                                            required
                                            error
                                            className={classes.formControl}
                                        >
                                            <FormLabel>
                                                Would you Rather...
                                            </FormLabel>
                                            <RadioGroup
                                                className={classes.group}
                                                value={
                                                    this.state.selectedOption
                                                }
                                                onChange={
                                                    this.handleRadioChange
                                                }
                                            >
                                                <FormControlLabel
                                                    value="optionOne"
                                                    control={
                                                        <Radio color="primary" />
                                                    }
                                                    label={
                                                        question.optionOne.text
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="optionTwo"
                                                    control={
                                                        <Radio color="primary" />
                                                    }
                                                    label={
                                                        question.optionTwo.text
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        <br />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={e =>
                                                this.handleSubmit(
                                                    e,
                                                    question.id
                                                )
                                            }
                                        >
                                            Submit
                                        </Button>
                                    </CardContent>
                                </div>
                            </Card>
                        </form>
                    </div>
                )}

                <CommentPage qid={question.id} />
            </div>
        );
    }
}

function mapStateToProps({ questions, users, authUser }, props) {
    const { question_id } = props.match.params;
    const question = questions[question_id];
    const user = users[authUser];
    return {
        question: question ? question : null,
        user,
        authUser,
        users
    };
}

function mapStateToDispatch(dispatch) {
    return bindActionCreators({ handleSaveAnswer }, dispatch);
}
export default withRouter(
    connect(
        mapStateToProps,
        mapStateToDispatch
    )(withStyles(styles)(QuestionPage))
);

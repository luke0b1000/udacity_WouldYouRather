import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const styles = {
    card: {
        display: "flex"
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: 151,
        height: 151
    }
};

class Question extends Component {
    render() {
        const { question, users } = this.props;

        if (question === null) {
            return <div>Question doesn't exist</div>;
        }
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={users[question.author].avatarURL}
                        title="Live from space album cover"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography>Would you rather ...</Typography>
                            <Typography
                                variant="subheading"
                                color="textSecondary"
                            >
                                {`By ${question.author}`}
                            </Typography>
                            <Typography
                                variant="headline"
                                color="textSecondary"
                            >
                                {question.optionOne.text}
                            </Typography>
                            <Typography color="textSecondary" align="center">
                                ...
                            </Typography>
                            <Typography
                                variant="headline"
                                color="textSecondary"
                            >
                                {question.optionTwo.text}
                            </Typography>
                        </CardContent>
                        <div className={classes.controls} />
                    </div>
                </Card>
            </div>
        );
    }
}

Question.propTypes = {
    question_id: PropTypes.string.isRequired
};

function mapStateToProps({ questions, authUser, users }, { question_id }) {
    const question = questions[question_id];
    return {
        question: question ? questions[question_id] : null,
        authUser,
        users
    };
}
export default withRouter(
    connect(mapStateToProps)(withStyles(styles)(Question))
);

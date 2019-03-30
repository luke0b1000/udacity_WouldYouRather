import React, { Component } from "react";
import { connect } from "react-redux";

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

class LeaderBoardUser extends Component {
    render() {
        const { users, userId } = this.props;
        const userAnswers = Object.keys(users[userId].answers).length;
        const userQuestions = users[userId].questions.length;

        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={users[userId].avatarURL}
                        title="Live from space album cover"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography
                                variant="subheading"
                                color="textSecondary"
                            >
                                {`${users[userId].name} - ${userId}`}
                            </Typography>
                            <Typography
                                variant="headline"
                                color="textSecondary"
                            >
                                Answered Questions: {userAnswers}
                            </Typography>
                            <Typography
                                variant="headline"
                                color="textSecondary"
                            >
                                Created Questions: {userQuestions}
                            </Typography>
                            <Typography
                                variant="headline"
                                color="textSecondary"
                            >
                                Score: {userAnswers + userQuestions}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users
    };
}

export default connect(mapStateToProps)(withStyles(styles)(LeaderBoardUser));

import React, { Component } from "react";
import { connect } from "react-redux";
import LeaderBoardUser from "./LeaderBoardUser";

class LeaderBoard extends Component {
    render() {
        return (
            <div>
                {this.props.userArray.map(user => {
                    return <LeaderBoardUser key={user} userId={user} />;
                })}
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        userArray: Object.keys(users).sort((a, b) => {
            return (
                Object.keys(users[b].answers).length +
                users[b].questions.length -
                (Object.keys(users[a].answers).length +
                    users[a].questions.length)
            );
        })
    };
}

export default connect(mapStateToProps)(LeaderBoard);

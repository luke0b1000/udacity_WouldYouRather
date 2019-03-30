import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import Leaderboard from "./LeaderBoard";
import AddQuestion from "./AddQuestion";
import QuestionList from "./QuestionList";
import QuestionPage from "./QuestionPage";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={QuestionList} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route path="/add" component={AddQuestion} />
                    <Route
                        path="/question/:question_id"
                        component={QuestionPage}
                    />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect()(Dashboard));

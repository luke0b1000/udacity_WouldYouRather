import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveComment } from "../actions/shared";
import { bindActionCreators } from "redux";

class NewComment extends Component {
    state = {
        text: ""
    };
    handleTextChange = e => {
        this.setState({
            text: e.target.value
        });
    };
    handleCommentSubmit = e => {
        e.preventDefault();
        const { qid, handleSaveComment } = this.props;
        const { text } = this.state;
        handleSaveComment({ qid, text });
        this.setState({
            text: ""
        });
    };
    render() {
        const { text } = this.state;
        const commentLength = 100 - text.length;
        return (
            <div>
                <form onSubmit={this.handleCommentSubmit}>
                    <textarea
                        maxLength="100"
                        rows="5"
                        placeholder="Write your Comments here"
                        onChange={this.handleTextChange}
                        value={text}
                    />
                    {commentLength < 100 && `${commentLength} Characters left`}
                    <br />
                    <button type="submit" disabled={text === ""}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleSaveComment }, dispatch);
}

export default connect(
    null,
    mapDispatchToProps
)(NewComment);

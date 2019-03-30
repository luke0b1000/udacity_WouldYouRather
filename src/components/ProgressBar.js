import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
    root: {
        flexGrow: 1
    }
};

class ProgressBar extends Component {
    render() {
        const { classes, progressBar } = this.props;
        if (progressBar) {
            return (
                <div className={classes.root}>
                    <LinearProgress color="secondary" />
                </div>
            );
        } else {
            return <Fragment />;
        }
    }
}

ProgressBar.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps({ progressBar }) {
    return {
        progressBar
    };
}

export default connect(mapStateToProps)(withStyles(styles)(ProgressBar));

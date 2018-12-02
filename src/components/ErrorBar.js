import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";

import { getErrors } from "../actions/errorActions";

class ErrorBar extends Component {
  handleSnackClose = () => {
    this.props.getErrors("");
  };
  render() {
    const { isErrorbarOpen, errorMessage } = this.props;
    return (
      <div>
        <Snackbar open={isErrorbarOpen} message={<span>{errorMessage}</span>} />
      </div>
    );
  }
}

ErrorBar.propTypes = {
  isErrorbarOpen: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isErrorbarOpen: state.errorReducer.isErrorbarOpen,
  errorMessage: state.errorReducer.errorText
});

export default connect(
  mapStateToProps,
  { getErrors }
)(ErrorBar);

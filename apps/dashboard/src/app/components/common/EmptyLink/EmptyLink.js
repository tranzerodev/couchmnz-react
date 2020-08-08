import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class EmptyLink extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    const valid = this.props.submitForm();
    if (valid === true) {
      this.props.history.push(this.props.next);
    }
  }
  render() {
    return (
      <a className="general_btn" onClick={this.handleNext}>{this.props.buttonName}</a>
    );
  }
}

EmptyLink.propTypes = {
  // P: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  submitForm: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  history: PropTypes.object.isRequired
};

EmptyLink.defaultProps = {
  buttonName: 'Next'
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(withRouter(EmptyLink)));

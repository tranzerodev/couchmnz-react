import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import {} from '../../../../../actions';
import {PENDING, FULFILLED} from '../../../../../constants/ActionTypes';

class Link extends Component {
  constructor() {
    super();
    this.handleNav = this.handleNav.bind(this);
  }
  handleNav() {
    const valid = this.props.submitForm();
    if (valid === true) {
      const updateType = this.props.saveType;
      this.props.saveData(this.props.data, updateType);
      // This.props.history.push(next);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {saveStatus} = this.props;
    const nextSaveStatus = nextProps.saveStatus;
    if (saveStatus.status === PENDING) {
      if (nextSaveStatus.status === FULFILLED) {
        const {next} = this.props;
        this.props.history.push(next);
      }
    }
  }
  render() {
    return (
      <a onClick={this.handleNav} className="general_btn">{this.props.buttonText}</a>
    );
  }
  static get propTypes() {
    return {
      saveType: PropTypes.string.isRequired,
      saveStatus: PropTypes.object.isRequired,
      saveData: PropTypes.func.isRequired,
      submitForm: PropTypes.func.isRequired,
      data: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      next: PropTypes.string.isRequired,
      buttonText: PropTypes.string.isRequired
    };
  }
}

Link.defaultProps = {};

const mapStateToProps = state => {
  const {athlete} = state;
  const {saveStatus} = athlete;
  return {
    saveStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const NextLink = connect(mapStateToProps, mapDispatchToProps)(Link);
export default translate(NextLink);

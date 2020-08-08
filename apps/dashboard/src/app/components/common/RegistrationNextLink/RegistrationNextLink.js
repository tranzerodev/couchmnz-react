import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  clearSaveDataOnNextStatus
} from '../../../actions';
import {FULFILLED, PENDING} from '../../../constants/ActionTypes';

class RegistrationNextLink extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    const valid = this.props.submitForm();
    if (valid === true) {
      const updateType = this.props.saveType;
      this.props.saveData(this.props.data, updateType);
    }
  }
  componentWillReceiveProps(nextProps) {
    const prevSaveDataOnNextStatus = this.props.saveDataOnNextStatus;
    const newSaveDataOnNextStatus = nextProps.saveDataOnNextStatus;
    if (prevSaveDataOnNextStatus === PENDING) {
      if (newSaveDataOnNextStatus === FULFILLED) {
        this.props.clearSaveDataOnNextStatus();
        this.props.history.push(this.props.next);
      }
    }
  }
  render() {
    return (
      <a className="general_btn" onClick={this.handleNext}>{this.props.p.t('RegistrationNextLink.next')}</a>
    );
  }
}

RegistrationNextLink.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  saveType: PropTypes.string.isRequired,
  clearSaveDataOnNextStatus: PropTypes.func.isRequired,
  saveDataOnNextStatus: PropTypes.string,
  submitForm: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  next: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

RegistrationNextLink.defaultProps = {
  saveDataOnNextStatus: null
};

const mapStateToProps = state => {
  const {saveDataOnNext} = state;
  return {
    saveDataOnNextStatus: saveDataOnNext.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSaveDataOnNextStatus: () => dispatch(clearSaveDataOnNextStatus())
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationNextLink)));

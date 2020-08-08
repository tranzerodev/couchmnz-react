import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  clearSaveDataOnNextStatus
} from '../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';

class PricingLink extends Component {
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
        // If (nextProps.submitted && nextProps.isNewSports === false) {
        nextProps.onNext();
        // }
        // This.props.history.push(this.props.next);
      }
    }
  }
  render() {
    const {buttonName} = this.props;
    return (
      <a className="general_btn" onClick={this.handleNext}>{buttonName}</a>
    );
  }
}

PricingLink.propTypes = {
  buttonName: PropTypes.string.isRequired,
  saveType: PropTypes.string.isRequired,
  clearSaveDataOnNextStatus: PropTypes.func.isRequired,
  saveDataOnNextStatus: PropTypes.string,
  submitForm: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  submitted: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  isNewSports: PropTypes.bool
};

PricingLink.defaultProps = {
  saveDataOnNextStatus: null,
  isNewSports: false
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

export default translate(connect(mapStateToProps, mapDispatchToProps)(withRouter(PricingLink)));

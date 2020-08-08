import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {clearSaveDataOnNextStatus} from '../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';

class DashboardSaveLink extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prevSaveDataOnNextStatus = this.props.saveDataOnNextStatus;
    const newSaveDataOnNextStatus = nextProps.saveDataOnNextStatus;
    if (prevSaveDataOnNextStatus === PENDING) {
      if (newSaveDataOnNextStatus === FULFILLED) {
        this.props.clearSaveDataOnNextStatus();
        if (this.props.isNewSports === false) {
          if ( this.props.next.startsWith('http') ) {
            window.location.replace(this.props.next)
          } else {
            this.props.history.push(this.props.next);
          }
        }
      }
    }
  }

  handleNext() {
    const valid = this.props.submitForm();
    console.log('next', this.props.next)
    if (valid === true) {
      const updateType = this.props.saveType;
      this.props.saveData(this.props.data, updateType);
    }
  }

  render() {
    const {buttonName} = this.props;
    return (
      <a className="general_btn" onClick={this.handleNext}>{buttonName}</a>
    );
  }
}

DashboardSaveLink.propTypes = {
  saveType: PropTypes.string.isRequired,
  clearSaveDataOnNextStatus: PropTypes.func.isRequired,
  saveDataOnNextStatus: PropTypes.string,
  submitForm: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  buttonName: PropTypes.string.isRequired,
  next: PropTypes.string,
  history: PropTypes.object.isRequired,
  isNewSports: PropTypes.bool
};

DashboardSaveLink.defaultProps = {
  saveDataOnNextStatus: null,
  isNewSports: false,
  next: '/'
};

const mapStateToProps = state => {
  const {saveDataOnNext} = state;
  return {
    saveDataOnNextStatus: saveDataOnNext.status
  };
};

const mapDispatchToProps = dispatch => ({
  clearSaveDataOnNextStatus: () => dispatch(clearSaveDataOnNextStatus())
});

export default translate(connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardSaveLink)));

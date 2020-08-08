import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {sspBankPayoutDetailsSubmit} from '../../../../../actions';
import DashboardBankPayoutDetails from './DashboardBankPayoutDetails';
import appConstants from '../../../../../constants/appConstants';
import DashboardSaveLink from '../DashboardSaveLink';

class DashboardAccountBankPayoutDetails extends Component {
  render() {
    return (
      <div>
        <DashboardBankPayoutDetails/>
        <div className="uk-grid">
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1">
            <DashboardSaveLink saveType={appConstants.saveType.onlyProfile} valid={this.props.sspValidation.bankPayoutDetails.valid} submitForm={this.props.sspBankPayoutDetailsSubmit}/>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      sspValidation: PropTypes.object.isRequired,
      sspBankPayoutDetailsSubmit: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {sspValidation} = state;
  return {
    sspValidation
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sspBankPayoutDetailsSubmit: data => dispatch(sspBankPayoutDetailsSubmit(data))
  };
};
const DashboardAccountBankPayoutDetailsPage = translate(connect(mapStateToProps, mapDispatchToProps)(DashboardAccountBankPayoutDetails));
export default DashboardAccountBankPayoutDetailsPage;

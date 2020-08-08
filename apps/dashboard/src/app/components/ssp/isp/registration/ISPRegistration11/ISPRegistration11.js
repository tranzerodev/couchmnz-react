import React, {Component} from 'react';
import {connect} from 'react-redux';
import AccountDetails from '../AccountDetails';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import {sspPayoutAccountSubmit} from '../../../../../actions';
// Import {PropTypes} from 'prop-types';
import {REGISTRATION_ISP_BOOKING_PREFERENCES} from '../../../../../constants/pathConstants';

class ISPRegistration11Class extends Component {
  render() {
    return (
      <div>
        <TopContent step={11}/>
        <BackButton back={REGISTRATION_ISP_BOOKING_PREFERENCES} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <AccountDetails {...this.props}/>
        </section>
      </div>);
  }
  static get propTypes() {
    return {};
  }
}

const mapStateToProps = state => {
  const {payoutOption} = state;
  return {
    payoutOption
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sspPayoutAccountSubmit: data => dispatch(sspPayoutAccountSubmit(data))
  };
};

const Registration11 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration11Class);
export default Registration11;


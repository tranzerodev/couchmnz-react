import React, {Component} from 'react';
import PaypalSettings from '../PaypalSettings';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import {REGISTRATION_ISP_PAYOUT_DETAILS} from '../../../../../constants/pathConstants';

class ISPRegistration14Class extends Component {
  render() {
    return (
      <div className>
        <TopContent step={14}/>
        <BackButton back={REGISTRATION_ISP_PAYOUT_DETAILS} {...this.props}/>
        <PaypalSettings/>
      </div>
    );
  }
}

export default ISPRegistration14Class;

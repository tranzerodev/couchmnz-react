import React, {Component} from 'react';
import BackButton from '../BackButton';

import TopContent from '../ISPRegFlowTopContent';
import BankPayoutDetails from '../BankPayoutDetails';
import {REGISTRATION_ISP_PAYOUT_DETAILS} from '../../../../../constants/pathConstants';

export default class ISPRegistration15Class extends Component {
  render() {
    return (
      <div className>
        <TopContent step={15}/>
        <BackButton back={REGISTRATION_ISP_PAYOUT_DETAILS} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <BankPayoutDetails/>
        </section>
      </div>
    );
  }
}


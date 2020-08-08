import React, {Component} from 'react';
import PayoutDetails from '../PayoutDetails';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import translate from 'redux-polyglot/translate';
import {REGISTRATION_ISP_PROFILE_READY_MESSAGE} from '../../../../../constants/pathConstants';
class ISPRegistration13Class extends Component {
  render() {
    return (
      <div className>
        <TopContent step={13}/>
        <BackButton back={REGISTRATION_ISP_PROFILE_READY_MESSAGE} {...this.props}/>
        <PayoutDetails/>
      </div>
    );
  }
}
export default translate(ISPRegistration13Class);

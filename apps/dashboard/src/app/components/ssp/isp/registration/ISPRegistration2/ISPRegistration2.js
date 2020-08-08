import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import TopContent from '../ISPRegFlowTopContent';
import TrainingPreferences from '../TrainingPreferences';
import BackButton from '../BackButton';

import {REGISTRATION_ISP_BIOGRAPHY} from '../../../../../constants/pathConstants';
class ISPRegistration2 extends Component {
  render() {
    return (
      <div>
        <TopContent step={2}/>
        <BackButton back={REGISTRATION_ISP_BIOGRAPHY} {...this.props}/>
        <TrainingPreferences {...this.props}/>
      </div>
    );
  }
  static get propTypes() {
    return {
    };
  }
}
export default translate(ISPRegistration2);

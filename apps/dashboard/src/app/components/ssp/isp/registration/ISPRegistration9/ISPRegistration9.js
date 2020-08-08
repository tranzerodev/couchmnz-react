import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';

import BusinessModel from '../BusinessModel';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import {REGISTRATION_ISP_SCHEDULE} from '../../../../../constants/pathConstants';

class ISPRegistration9Class extends Component {
  render() {
    return (
      <div className>
        <TopContent step={9}/>
        <BackButton back={REGISTRATION_ISP_SCHEDULE} {...this.props}/>
        <BusinessModel {...this.props}/>
      </div>
    );
  }
}
export default translate(ISPRegistration9Class);


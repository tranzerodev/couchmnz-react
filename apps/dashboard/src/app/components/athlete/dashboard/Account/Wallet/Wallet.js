import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import SideNav from '../common/SideNav';
import WalletSummary from '../../../../common/Wallet/WalletSummary';

class Wallet extends Component {
  render() {
    return (
      <div className="booking-wrapper">
        <div className="dashboardSection">
          <div className="uk-grid">
            <SideNav/>
            <WalletSummary/>
          </div>
        </div>
      </div>);
  }
}

export default (withRouter(translate(Wallet)));

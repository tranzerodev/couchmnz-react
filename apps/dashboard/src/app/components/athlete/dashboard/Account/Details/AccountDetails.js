import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import SideNav from '../common/SideNav';
import AccountInfo from './AccountInfo';
import ChangePassword from './ChangePassword';
// Import AccountDeactivate from './AccountDeactivate';
// import SocialConnect from './SocialMedia';

class AthleteAccount extends Component {
  render() {
    return (
      <div className="booking-wrapper">
        <div className="dashboardSection">
          <div className="uk-grid">
            <SideNav/>
            <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
              <AccountInfo/>
              <ChangePassword/>
              {/* <SocialConnect/>
              <AccountDeactivate/> */}
            </div>

          </div>
        </div>
      </div>);
  }
}

export default (withRouter(translate(AthleteAccount)));

import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {DASHBOARD_PROFILE_LISTING_DETAILS, DASHBOARD_PROFILE_BUILD_PROFILE, DASHBOARD_PROFILE_TRAINING_PREFERENCE, DASHBOARD_PROFILE_PHOTOS_AND_VIDEOS, DASHBOARD_PROFILE_BIOGRAPHY} from '../../../../../constants/pathConstants';
import SportsSwitcher from '../SportsSwitcher';

class DashboardProfileSideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (

      <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="leftPanel">
          <div className="profileMenu">
            <SportsSwitcher/>
            <ul>
              <li>
                <NavLink to={DASHBOARD_PROFILE_BUILD_PROFILE}>{this.props.p.t('DashboardProfileSideNav.sports_and_certificate')}</NavLink>
              </li>
              <li>
                <NavLink to={DASHBOARD_PROFILE_BIOGRAPHY}>{this.props.p.t('DashboardProfileSideNav.biography')}</NavLink>
              </li>
              <li>
                <NavLink to={DASHBOARD_PROFILE_LISTING_DETAILS}>{this.props.p.t('DashboardProfileSideNav.listing_details')}</NavLink>
              </li>
              <li>
                <NavLink to={DASHBOARD_PROFILE_TRAINING_PREFERENCE}>{this.props.p.t('DashboardProfileSideNav.training_preference')}</NavLink>
              </li>
              <li >
                <NavLink to={DASHBOARD_PROFILE_PHOTOS_AND_VIDEOS}>{this.props.p.t('DashboardProfileSideNav.photos_and_videos')}</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

export default withRouter(translate(DashboardProfileSideNav));

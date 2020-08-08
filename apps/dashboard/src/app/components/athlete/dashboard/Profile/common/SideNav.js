import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {DASHBOARD_ATHLETE_PROFILE_DETAILS, DASHBOARD_ATHLETE_ACCOUNT_SKILLS} from '../../../../../constants/pathConstants';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="uk-width-xlarge-2-10 uk-width-large-3-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="leftPanel">
          <div className="profileMenu">
            <ul>
              <li>
                <NavLink to={DASHBOARD_ATHLETE_PROFILE_DETAILS}>{this.props.p.t('AthleteProfileSideNav.profile')}</NavLink>
                <NavLink to={DASHBOARD_ATHLETE_ACCOUNT_SKILLS}>{this.props.p.t('AthleteProfileSideNav.skills')}</NavLink>
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
export default withRouter(translate(SideNav));

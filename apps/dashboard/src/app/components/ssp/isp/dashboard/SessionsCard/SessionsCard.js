import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {DASHBOARD_SESSION_DEFINE_SESSION, DASHBOARD_MANAGE_SPORT_SESSIONS} from '../../../../../constants/pathConstants';

class SessionsCard extends Component {
  render() {
    return (
      <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="dashboardContent dashboardContent1">
          <h4>{this.props.p.t('SessionsCard.sessions')}</h4>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
              <h3>{this.props.session.booked ? this.props.session.booked : 0}</h3>
              <p>{this.props.p.t('SessionsCard.booked')}</p>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
              <h3>{this.props.session.canceled ? this.props.session.canceled : 0}</h3>
              <p>{this.props.p.t('SessionsCard.cancelled')}</p>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
              <h3>{this.props.session.pending ? this.props.session.pending : 0}</h3>
              <p>{this.props.p.t('SessionsCard.pending')}</p>
            </div>
          </div>
          <div className="uk-grid mt15">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <NavLink to={DASHBOARD_MANAGE_SPORT_SESSIONS}>{this.props.p.t('SessionsCard.manage')}</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      session: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
SessionsCard.defaultProps = {
  session: {}
};

export default translate(SessionsCard);

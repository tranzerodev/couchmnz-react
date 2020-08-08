import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import pathToRegExp from 'path-to-regexp';

import {
  DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED,
  DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED,
  DASHBOARD_ATHLETE_SCHEDULER_CHANGES,
  DASHBOARD
} from '../../../../constants/pathConstants';
import {athleteFetchSessionsCount} from '../../../../actions/index';
import {getProfileId} from '../../../../middlewares/athlete/schedulerUtils';

class AthleteScheduleTabs extends Component {
  constructor(props) {
    super(props);
    this.getParsedUrl = this.getParsedUrl.bind(this);
  }

  componentDidMount() {
    const {selectedProfile} = this.props;
    const profileId = getProfileId(selectedProfile);
    if (profileId) {
      this.props.athleteFetchSessionsCount({profileId, profileType: selectedProfile.type});
    }
  }

  getParsedUrl(url) {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(url);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }

  render() {
    const {sessionsCount} = this.props;
    const {noOfScheduledSessions, noOfUnScheduledSessions, noOfChangesToManage} = sessionsCount.data;
    const getColor = (number) => {
      return number > 0 ? '#F15E23' : '#999999'
    }
    return (
      <div className="scheduler-headerTabs">
        <ul>
          <li>
            <NavLink to={this.getParsedUrl(DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED)} >{this.props.p.t('AthleteScheduleTabs.scheduled_sessions')} {noOfScheduledSessions > 0 ? '(' + noOfScheduledSessions + ')' : ''}</NavLink>
          </li>
          <li>
            <NavLink to={this.getParsedUrl(DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED)} style={{
              color: getColor(noOfChangesToManage)
            }}>{this.props.p.t('AthleteScheduleTabs.unscheduled_sessions')} {noOfUnScheduledSessions > 0 ? '(' + noOfUnScheduledSessions + ')' : ''}</NavLink>
          </li>
          <li>
            <NavLink to={this.getParsedUrl(DASHBOARD_ATHLETE_SCHEDULER_CHANGES)} style={{
              color: getColor(noOfChangesToManage)
            }}>
              {this.props.p.t('AthleteScheduleTabs.changes')} {noOfChangesToManage > 0 ? '(' + noOfChangesToManage + ')' : ''}
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      athleteFetchSessionsCount: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      sessionsCount: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    athleteFetchSessionsCount: params => dispatch(athleteFetchSessionsCount(params))
  };
};

const mapStateToProps = state => {
  const {athlete, userProfiles} = state;
  const {sessionsCount} = athlete;
  return {
    sessionsCount,
    selectedProfile: userProfiles.selectedProfile
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(AthleteScheduleTabs)));

import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import {
  DASHBOARD_ACCOUNT_BUSINESS_MODEL,
  DASHBOARD_ACCOUNT_BOOKING_PREFERENCE,
  DASHBOARD_ACCOUNT_DETAILS,
  DASHBOARD_ACCOUNT_PAYOUT_DETAILS,
  DASHBOARD_ACCOUNT_SCHEDULER_SETTINGS,
  DASHBOARD_MANAGE_SPORT
} from '../../../../../constants/pathConstants';
import appConstants from '../../../../../constants/appConstants';
import {getProfileStatus} from '../../../../../validators/ssp/isp/registration/registrationPageStatus';
import {ispFetchWorkingDays} from '../../../../../actions/index';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';

class DashboardAccountSideNav extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    const intermediate = appConstants.RegistrationFlowPageStatusFlags.intermediate;
    this.state = {
      status: {
        businessModel: intermediate,
        bookingPreference: intermediate,
        accountDetails: intermediate,
        payoutDetails: intermediate,
        schedulerWorkingDays: intermediate
      }
    };
  }

  componentDidMount() {
    const {workingDays, profile} = this.props;
    this.setState({status: getProfileStatus(profile, workingDays.data)});
    if (workingDays.status !== FULFILLED && workingDays.status !== PENDING && workingDays.status !== REJECTED) {
      this.props.ispFetchWorkingDays({profileId: this.props.profile.data.profile.id});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {workingDays, profile} = nextProps;
    this.setState({status: getProfileStatus(profile, workingDays.data)});
  }

  renderItem(name, link, type) {
    const complete = appConstants.RegistrationFlowPageStatusFlags.complete;
    const disable = appConstants.RegistrationFlowPageStatusFlags.disabled;
    const intermediate = appConstants.RegistrationFlowPageStatusFlags.intermediate;
    const red = appConstants.sportsDataStatusColorCodes.red;
    const green = appConstants.sportsDataStatusColorCodes.green;
    const gray = appConstants.sportsDataStatusColorCodes.gray;
    return (
      type === disable ?
        <li className="disable">
          <span className="disable-link"><span className="gray"/>{name}</span>
        </li> :
        <li>
          <NavLink to={link}><span className={type === complete ? green : type === intermediate ? red : gray}/> {name}</NavLink>
        </li>
    );
  }

  renderList(status) {
    const {p, sportName} = this.props;
    const {t} = p;
    return (
      <ul>
        {/*  {
          this.renderItem(t('DashboardAccountSideNav.sport_profile', {sportName}), DASHBOARD_MANAGE_SPORT, appConstants.RegistrationFlowPageStatusFlags.complete)
        } */}
        {
          this.renderItem(t('DashboardAccountSideNav.business_model'), DASHBOARD_ACCOUNT_BUSINESS_MODEL, status.businessModel)
        }
        {
          this.renderItem(t('DashboardAccountSideNav.booking_preferences'), DASHBOARD_ACCOUNT_BOOKING_PREFERENCE, status.bookingPreference)
        }
        {
          this.renderItem(t('DashboardAccountSideNav.account_details'), DASHBOARD_ACCOUNT_DETAILS, status.accountDetails)
        }
        {
          this.renderItem(t('DashboardAccountSideNav.payout_details'), DASHBOARD_ACCOUNT_PAYOUT_DETAILS, status.payoutDetails)
        }
        {
          this.renderItem(t('DashboardAccountSideNav.scheduler'), DASHBOARD_ACCOUNT_SCHEDULER_SETTINGS, status.schedulerWorkingDays)
        }
      </ul>
    );
  }

  render() {
    const {status} = this.state;
    return (
      <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="leftPanel">
          <div className="profileMenu profileMenuSec">
            {this.renderList(status)}
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      profile: PropTypes.object.isRequired,
      sportName: PropTypes.string.isRequired,
      workingDays: PropTypes.object.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ispFetchWorkingDays: params => dispatch(ispFetchWorkingDays(params))
  };
};

const mapStateToProps = state => {
  const {profile, currentSport, workingDays} = state;
  return {
    profile,
    sportName: currentSport.data.name ? currentSport.data.name : '',
    workingDays
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(DashboardAccountSideNav)));

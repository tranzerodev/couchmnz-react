import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {withRouter} from 'react-router-dom';

import PageStatus from './PageStatus';
import appConstants from '../../../../../constants/appConstants';
import {changeCurrentSport, fetchCurrentSport} from '../../../../../actions/index';
import {DASHBOARD_MANAGE_SPORT, DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES, DASHBOARD_MANAGE_SPORT_PRICING, DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS, DASHBOARD_MANAGE_SPORT_SESSIONS, DASHBOARD_MANAGE_SPORT_BIOGRAPHY, DASHBOARD_MANAGE_SPORT_LISTING, DASHBOARD_MANAGE_SPORT_MEDIA} from '../../../../../constants/pathConstants';
import getSportDataFilledStatus from '../../../../../validators/ssp/isp/common/getCurrentSportStatus';
import Manage from './Manage';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import {notNull} from '../../../../../validators/common/util';

class SportCard extends Component {
  constructor(props) {
    super(props);
    this.handleManage = this.handleManage.bind(this);
    this.getCoverImage = this.getCoverImage.bind(this);
    this.handleManageStatus = this.handleManageStatus.bind(this);
    this.state = {
      requestedFetch: false
    };
  }

  handleManage() {
    const {sport, selectedProfile} = this.props;
    this.setState({requestedFetch: true});
    this.props.fetchCurrentSport({profileID: selectedProfile.id, sportID: sport.sportId});
  }

  componentWillReceiveProps(nextProps) {
    const {requestedFetch} = this.state;
    if (requestedFetch && this.props.currentSport.status === PENDING && nextProps.currentSport.status === FULFILLED) {
      const {currentSport, sessions} = nextProps;
      this.handleManageStatus(currentSport, sessions);
    }
  }

  handleManageStatus(currentSport, sessions) {
    const {history} = this.props;
    this.setState({requestedFetch: false});
    const status = getSportDataFilledStatus(currentSport, sessions);
    if (notNull(status)) {
      const {FALSE} = appConstants.apiBooleanFlags;
      if (status.sport === FALSE) {
        history.push(DASHBOARD_MANAGE_SPORT);
      } else if (status.trainingPreference === FALSE) {
        history.push(DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES);
      } else if (status.pricing === FALSE) {
        history.push(DASHBOARD_MANAGE_SPORT_PRICING);
      } else if (status.trainingLocation === FALSE) {
        history.push(DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS);
      } else if (status.session === FALSE) {
        history.push(DASHBOARD_MANAGE_SPORT_SESSIONS);
      } else if (status.biography === FALSE) {
        history.push(DASHBOARD_MANAGE_SPORT_BIOGRAPHY);
      } else if (status.listing === FALSE) {
        history.push(DASHBOARD_MANAGE_SPORT_LISTING);
      } else if (status.media === FALSE) {
        history.push(DASHBOARD_MANAGE_SPORT_MEDIA);
      } else {
        history.push(DASHBOARD_MANAGE_SPORT);
      }
    }
  }

  getCoverImage(background) {
    if (background) {
      return {
        background: `url(${background})  no-repeat top left`,
        backgroundSize: 'cover'
      };
    }
    return {};
  }

  render() {
    const {sport, isProfileCompletd} = this.props;
    const isActive = sport.isActive === appConstants.profileActiveFlages.active;
    const background = sport.sportBgImage;
    const coverImage = this.getCoverImage(background);

    return (
      <div className="cl-servicebox">
        <a className="cl-serviceSampleBox" onClick={this.handleManage}>
          <span className="cl-imageHolder" style={coverImage}>
            <span className="cl-layer-black"/>
            <span className={'cl-sd-stageDot' + (isActive ? ' green' : ' red')}/>
            <span className="cl-sampleHeading">{sport.sportName}</span>
            <span className="cl-smallText">{this.props.p.t('SportCard.edit_profile')}</span>
          </span>
          <PageStatus sport={sport}/>
        </a>
        <Manage sport={sport} isProfileCompletd={isProfileCompletd}/>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sport: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      sessions: PropTypes.object.isRequired,
      fetchCurrentSport: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      isProfileCompletd: PropTypes.bool.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentSport: sportID => dispatch(changeCurrentSport(sportID)),
    fetchCurrentSport: params => dispatch(fetchCurrentSport(params))
  };
};

const mapStateToProps = state => {
  const {userProfiles, sessions, currentSport} = state;
  return {
    selectedProfile: userProfiles.selectedProfile,
    currentSport,
    sessions
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(SportCard)));
/* eslint react/no-deprecated: 0 */

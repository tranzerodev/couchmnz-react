import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

import {
  updateProfile,
  postProfile,
  changeUpdateProfileStatus,
  changeUpdateSportStatus,
  postCurrentSport
} from '../../../../../actions';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';

/* eslint react/no-array-index-key: 0 */
class SaveButton extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      profileSubmit: false,
      postSubmitted: false,
      isCurrentSportUpdated: false
    };
  }
  handleNext() {
    this.props.submitForm({status: true});
    console.log('this.props.valid', this.props.valid);
    if (this.props.valid === true) {
      if (this.props.submit === appConstants.submitTypes.sport) {
        // This.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
        this.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userProfiles.selectedProfile.id, sportID: this.props.sport.id});
      } else if (this.props.submit === appConstants.submitTypes.profile) {
        // This.props.postProfile(this.props.profile.data, {profileID: this.props.userIDs.data.coachIDs[0]});
        this.props.postProfile(this.props.profile.data, {profileID: this.props.userProfiles.selectedProfile.id});
        this.setState({isCurrentSportUpdated: true});
      } else if (this.props.submit === appConstants.submitTypes.createSport) {
        this.props.postProfile(this.props.profile.data, {profileID: this.props.userProfiles.selectedProfile.id});
        // This.props.postProfile(this.props.profile.data, {profileID: this.props.userIDs.data.coachIDs[0]});
        this.setState({profileSubmit: true});
      } else {
        this.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userProfiles.selectedProfile.id, sportID: this.props.sport.id});
        this.props.postProfile(this.props.profile.data, {profileID: this.props.userProfiles.selectedProfile.id});
        // This.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
        // this.props.postProfile(this.props.profile.data, {profileID: this.props.userIDs.data.coachIDs[0]});
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    // If (nextProps.submit === 'sport') {
    //   if (nextProps.sportUpdateStatus.status === FULFILLED) {
    //     // this.props.changeUpdateSportStatus(null);
    //     this.props.history.push(this.props.next);
    //   }
    // } else if (this.props.submit === 'profile') {

    // } else if (nextProps.sportUpdateStatus.status === FULFILLED && nextProps.profileUpdateStatus.status === FULFILLED) {
    //   // this.props.changeUpdateSportStatus(null);
    //   // this.props.changeUpdateProfileStatus(null);
    //   this.props.history.push(this.props.next);
    // } else {
    //   if (nextProps.profileUpdateStatus.status === FULFILLED) {
    //     this.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
    //     this.props.history.push(this.props.next);
    //   }
    // }

    // if (nextProps.submit === appConstants.submitTypes.createSport && nextProps.profile.status === FULFILLED && this.state.profileSubmit) {
    //   this.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
    //   this.setState({profileSubmit: false, postSubmitted: true});
    // } else if (nextProps.submit === appConstants.submitTypes.createSport && this.props.sportUpdateStatus.status === FULFILLED && this.state.postSubmitted) {
    //   this.setState({postSubmitted: false});
    //   this.props.history.push(this.props.next);
    // }
    // if (this.props.submit === appConstants.submitTypes.profile) {
    //   if (nextProps.profile.status === FULFILLED && this.state.isCurrentSportUpdated) {
    //     this.setState({
    //       isCurrentSportUpdated: false
    //     });
    //     this.props.history.push(this.props.next);
    //   }
    // }

    if (nextProps.submit === appConstants.submitTypes.createSport && nextProps.profile.status === FULFILLED && this.state.profileSubmit) {
      this.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userProfiles.selectedProfile.id, sportID: this.props.sport.id});
      this.setState({profileSubmit: false, postSubmitted: true});
    } else if (nextProps.submit === appConstants.submitTypes.createSport && this.props.sportUpdateStatus.status === FULFILLED && this.state.postSubmitted) {
      this.setState({postSubmitted: false});
      this.props.history.push(this.props.next);
    }
    if (this.props.submit === appConstants.submitTypes.profile) {
      if (nextProps.profile.status === FULFILLED && this.state.isCurrentSportUpdated) {
        this.setState({
          isCurrentSportUpdated: false
        });
        this.props.history.push(this.props.next);
      }
    }
  }
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-2"/>
        {this.props.size > 1 && <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-2"/> }
        <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-2 uk-text-right">
          <a className="general_btn" onClick={this.handleNext}>{this.props.p.t('NextButton.next')}</a>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      valid: PropTypes.bool,
      profile: PropTypes.object,
      history: PropTypes.object,
      next: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      submitForm: PropTypes.func.isRequired,
      postProfile: PropTypes.func.isRequired,
      // UserIDs: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      sportUpdateStatus: PropTypes.object,
      sport: PropTypes.object,
      currentSport: PropTypes.object.isRequired,
      postCurrentSport: PropTypes.func.isRequired,
      submit: PropTypes.string,
      size: PropTypes.number
    };
  }
}

SaveButton.defaultProps = {
  valid: true,
  sport: {},
  profile: {},
  history: {},
  next: '',
  submit: '',
  sportUpdateStatus: {
    status: null
  },
  size: 1
};

const mapStateToProps = state => {
  const {profile, userIDs, userProfiles, profileUpdateStatus, sport, currentSport, sportUpdateStatus} = state;
  return {
    profile,
    userIDs,
    userProfiles,
    profileUpdateStatus,
    sport,
    currentSport,
    sportUpdateStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: profile => dispatch(updateProfile(profile)),
    postProfile: (data, params) => dispatch(postProfile(data, params)),
    changeUpdateProfileStatus: status => dispatch(changeUpdateProfileStatus(status)),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params)),
    changeUpdateSportStatus: status => dispatch(changeUpdateSportStatus(status))
  };
};

const Button = connect(mapStateToProps, mapDispatchToProps)(SaveButton);
export default translate(Button);

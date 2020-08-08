import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

import {
  updateProfile,
  postProfile,
  changeUpdateProfileStatus,
  changeUpdateSportStatus,
  postCurrentSport,
  activateNewProfile,
  changeProfileActivationStatus
} from '../../../../../actions';
import {FULFILLED} from '../../constants/ActionTypes';
import CongratulationsModal from '../CongratulationsModal/CongratulationsModal';

/* eslint react/no-array-index-key: 0 */
class SaveButton extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.state = {
      profileSubmit: false,
      postSubmitted: false,
      modal: <CongratulationsModal handleNext={this.handleFinish}/>
    };
  }
  handleNext() {
    this.props.submitForm({status: true});
    if (this.props.submit === 'profile' && this.props.valid) {
      this.props.postProfile(this.props.profile.data, {profileID: this.props.userProfiles.selectedProfile.id});
      // This.props.postProfile(this.props.profile.data, {profileID: this.props.userIDs.data.coachIDs[0]});
      this.setState({profileSubmit: true});
    }
  }
  handleFinish() {
    const {profile, profileActivationStatus} = this.props;
    if (profileActivationStatus.status === FULFILLED && profile && profile.data && profile.data.profile && profile.data.profile.isActive === 'Y') {
      this.props.history.push(this.props.next);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submit === 'profile' && nextProps.profile.status === FULFILLED && this.state.profileSubmit) {
      // This.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
      console.log('componentWillReceiveProps', nextProps.userIDs);
      this.props.activateNewProfile({profileID: nextProps.userProfiles.selectedProfile.id});
      // This.props.activateNewProfile({profileID: nextProps.userIDs.data.coachIDs[0]});
      this.setState({profileSubmit: false, postSubmitted: true});
    } else if (nextProps.submit === 'profile' && nextProps.profileActivationStatus.status === FULFILLED && this.state.postSubmitted) {
      this.setState({postSubmitted: false});
      // This.props.history.push(this.props.next);
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
        {this.props.profileActivationStatus.status === FULFILLED && this.state.modal}
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
      userProfiles: PropTypes.object.isRequired,
      profileActivationStatus: PropTypes.object.isRequired,
      submit: PropTypes.string.isRequired,
      submitForm: PropTypes.func.isRequired,
      postProfile: PropTypes.func.isRequired,
      activateNewProfile: PropTypes.func.isRequired,
      userIDs: PropTypes.object.isRequired,
      size: PropTypes.number
    };
  }
}
SaveButton.defaultProps = {
  valid: true,
  size: 1
};

SaveButton.defaultProps = {
  valid: true,
  profile: {},
  history: {},
  next: ''
};

const mapStateToProps = state => {
  const {profile, userIDs, userProfiles, profileUpdateStatus, sport, currentSport, sportUpdateStatus, profileActivationStatus} = state;
  return {
    profile,
    userIDs,
    userProfiles,
    profileUpdateStatus,
    sport,
    currentSport,
    sportUpdateStatus,
    profileActivationStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: profile => dispatch(updateProfile(profile)),
    postProfile: (data, params) => dispatch(postProfile(data, params)),
    changeUpdateProfileStatus: status => dispatch(changeUpdateProfileStatus(status)),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params)),
    changeUpdateSportStatus: status => dispatch(changeUpdateSportStatus(status)),
    activateNewProfile: (data, params) => dispatch(activateNewProfile(data, params)),
    changeProfileActivationStatus: (data, params) => dispatch(changeProfileActivationStatus(data, params))
  };
};

const Button = connect(mapStateToProps, mapDispatchToProps)(SaveButton);
export default translate(Button);

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

/* eslint react/no-array-index-key: 0 */
class SaveButton extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      profileSubmit: false
    };
  }
  handleNext() {
    const {userProfiles, currentSport} = this.props;
    const profileID = userProfiles.selectedProfile.id;
    const sportID = currentSport.data.id;
    this.props.postProfile(this.props.profile.data, {profileID})
    .then(response => {
      response.payload.responseCode === 0 ? this.props.postCurrentSport(this.props.currentSport.data, {profileID, sportID})
      .then(r => {
        this.props.history.push(this.props.history.push(this.props.next));
      })
    });
  }
  componentWillReceiveProps(nextProps) {}
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
      sports: PropTypes.array,
      updateProfile: PropTypes.func,
      history: PropTypes.object,
      next: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      submitForm: PropTypes.func.isRequired,
      postProfile: PropTypes.func.isRequired,
      userIDs: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      profileUpdateStatus: PropTypes.object,
      sportUpdateStatus: PropTypes.object,
      changeUpdateProfileStatus: PropTypes.func.isRequired,
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
  sports: [],
  updateProfile: () => {},
  history: {},
  next: '',
  profileUpdateStatus: {
    status: null
  },
  sportUpdateStatus: {
    status: null
  }
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

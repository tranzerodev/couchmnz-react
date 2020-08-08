import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Modal from './Modal';
import {
  postProfile,
  changeUpdateProfileStatus,
  changeUpdateSportStatus,
  postCurrentSport
} from '../../../../../actions';
import {FULFILLED} from '../../../../../constants/ActionTypes';
/* eslint react/no-array-index-key: 0 */
class ISPRegFlowStepFooter extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handleFinishLater = this.handleFinishLater.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      modal: <div/>
    };
  }
  handleFinishLater() {
    this.setState({modal: <Modal handleCloseModal={this.handleCloseModal} valid={this.props.modal} handleNext={this.handleNext} submitForm={this.props.submitForm}/>});
  }
  handleCloseModal() {
    this.setState({modal: <div/>});
  }
  handleNext() {
    this.props.submitForm({status: true});
    if (this.props.submit === 'dontpost') {
      this.props.history.push(this.props.next);
      return;
    }
    if (this.props.valid) {
      const {userProfiles, currentSport} = this.props;
      const profileID = userProfiles.selectedProfile.id;
      const sportID = currentSport.data.id;
      if (this.props.submit === 'sport') {
        this.props.postCurrentSport(this.props.currentSport.data, {profileID, sportID});
        this.setState({
          isCurrentSportUpdated: true
        });
      } else if (this.props.submit === 'profile') {
        this.props.postProfile(this.props.profile.data, {profileID});
        this.setState({
          isCurrentSportUpdated: true
        });
      } else if (this.props.submit === 'all') {
        this.props.postProfile(this.props.profile.data, {profileID});
        this.props.postCurrentSport(this.props.currentSport.data, {profileID, sportID});
        this.setState({
          isCurrentSportUpdated: true
        });
      }
      this.props.postProfile(this.props.profile.data, {profileID});
      // This.props.postCurrentSport(this.props.currentSport.data, {profileID, sportID});
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.submit === 'all') {
      if (nextProps.sportUpdateStatus.status === FULFILLED && nextProps.profileUpdateStatus.status === FULFILLED && this.state.isCurrentSportUpdated) {
        this.setState({
          isCurrentSportUpdated: false
        });
        this.props.history.push(this.props.next);
      }
    }
    if (this.props.submit === 'sport') {
      if (nextProps.sportUpdateStatus.status === FULFILLED && this.state.isCurrentSportUpdated) {
        this.setState({
          isCurrentSportUpdated: false
        });
        this.props.history.push(this.props.next);
      }
    }
    if (this.props.submit === 'profile') {
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
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      valid: PropTypes.bool,
      submitForm: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      next: PropTypes.string,
      postProfile: PropTypes.func.isRequired,
      // UserIDs: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      postCurrentSport: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired,
      submit: PropTypes.string.isRequired,
      profileUpdateStatus: PropTypes.object,
      sportUpdateStatus: PropTypes.objetc,
      profile: PropTypes.object
    };
  }
}

ISPRegFlowStepFooter.defaultProps = {
  valid: false,
  next: '/',
  profileUpdateStatus: {
    status: null
  },
  sportUpdateStatus: {
    status: null
  },
  profile: {}
};
const mapStateToProps = state => {
  const {profile, userIDs, userProfiles, profileUpdateStatus, sportUpdateStatus, sport, currentSport} = state;
  return {
    profile,
    userIDs,
    userProfiles,
    profileUpdateStatus,
    sportUpdateStatus,
    sport,
    currentSport
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postProfile: (data, params) => dispatch(postProfile(data, params)),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params)),
    changeUpdateProfileStatus: status => dispatch(changeUpdateProfileStatus(status)),
    changeUpdateSportStatus: status => dispatch(changeUpdateSportStatus(status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(ISPRegFlowStepFooter));

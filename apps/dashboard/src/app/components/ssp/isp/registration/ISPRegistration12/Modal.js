import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {PropTypes} from 'prop-types';
import {logout} from '../../../../../../auth/auth';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {
  postProfile,
  postCurrentSport
} from '../../../../../actions';

class DashboardContentTopModal extends Component {
  constructor() {
    super();
    this.handleFinishLater = this.handleFinishLater.bind(this);
    this.state = {};
  }
  handleFinishLater() {
    console.log('handleFinishLater');
    this.props.submitForm({status: true});
    if (this.props.valid) {
      this.props.postProfile(this.props.profile.data, {profileID: this.props.userProfiles.selectedProfile.id});
      // This.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
    }
    logout();
  }
  render() {
    return (
      <ReactModal
        isOpen
        onRequestClose={this.props.handleCloseModal}
        contentLabel=""
        ariaHideApp={false}
      >
        <div id="newSessionModal">
          <div className="">
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">{this.props.p.t('FinishLaterModal.title')}</h2>
            </div>
            <div className="uk-modal-body">
              <p>{this.props.p.t('FinishLaterModal.message')}</p>
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a onClick={this.handleFinishLater} className="general_btn">{this.props.p.t('FinishLaterModal.yes')}</a>
                </div>
                <div className="rCol">
                  <a onClick={this.props.handleCloseModal} className="back">{this.props.p.t('FinishLaterModal.no')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      postProfile: PropTypes.func.isRequired,
      submitForm: PropTypes.func.isRequired,
      valid: PropTypes.bool.isRequired,
      profile: PropTypes.object.isRequired,
      // UserIDs: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      handleCloseModal: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, userIDs, userProfiles, profileUpdateStatus, sport} = state;
  return {
    profile,
    userIDs,
    userProfiles,
    profileUpdateStatus,
    sport
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postProfile: (data, params) => dispatch(postProfile(data, params)),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(translate(DashboardContentTopModal));

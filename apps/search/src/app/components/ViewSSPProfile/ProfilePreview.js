import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import Modal from './Modal';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {activateNewProfile, activateSport, activateSportAndProfile} from '../../actions';
import PropTypes from 'prop-types';
import appConstants from '../../constants/appConstants';
import {FULFILLED, PENDING} from '../../constants/ActionTypes';
import {DASHBOARD_SPORTS} from '../../constants/WebConstants';
import CongratulationsModal from './congratulationsModal';
class ProfilePreview extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleIsActiveSport = this.handleIsActiveSport.bind(this);
    this.handleActiveSport = this.handleActiveSport.bind(this);
    this.state = {
      isModalOpen: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if ((this.props.sportAndProfileActivationStatus.status === PENDING && nextProps.sportAndProfileActivationStatus.status === FULFILLED) ||
          (this.props.sportActivationStatus.status === PENDING && nextProps.sportActivationStatus.status === FULFILLED)) {
      this.setState({isModalOpen: true});
    }
  }
  handleEdit() {
    location.href = DASHBOARD_SPORTS;
  }
  handlePublish() {
    const {data} = this.props;
    const {isActive, sspID, presentSportID} = data;
    if (isActive === appConstants.profileActiveFlages.inactive) {
      this.props.activateSportAndProfile(sspID, presentSportID);
    } else {
      this.props.activateSport(sspID, presentSportID);
    }
  }
  handleCloseModal() {
    this.setState({isModalOpen: false});
    location.href = DASHBOARD_SPORTS;
  }
  handleActiveSport(sportID) {
    const {data} = this.props;
    const {sports} = data;
    if (data && data.sports && data.sports.length && sportID) {
      const sport = sports.find(e => e.sportID === sportID);
      return sport.isActive === appConstants.profileActiveFlages.active;
    }
    return false;
  }
  handleIsActiveSport() {
    const {data, match} = this.props;
    const {presentSportID} = data;
    if (match.params.sportID) {
      const {sportID} = match.params;
      return this.handleActiveSport(sportID);
    } else if (presentSportID) {
      return this.handleActiveSport(presentSportID);
    }
    return false;
  }
  render() {
    const {p, profile, data, router} = this.props;
    const {t} = p;
    const isProfileLoaded = profile.status === FULFILLED;
    const profileID = isProfileLoaded ? profile.data.profile.id : null;
    const {query} = router ? router : {query: null};
    const param = query ? query.p : null;
    const isActiveSport = this.handleIsActiveSport();
    const isActiveProfile = (data) && (data.isActive === appConstants.profileActiveFlages.active);
    const showPreview = profileID === data.sspID
    return (
      showPreview ?
        (
          <section className="cl-sd-publishProfile-Header">
            <div className="uk-grid uk-grid-collapse">
              <div className="uk-width-xlarge-7-10 uk-width-large-6-10 uk-width-medium-7-10 uk-width-small-1-1">
                <div className="cl-sd-previewprofileOuter">
                  <div className="cl-sd-previewprofileIcon">
                    <svg className="cl-icon-eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 41.738">
                      <path className="cl-icon-eye-1" d="M33.5,16.5c-17.214,0-30,15.98-30,20.87s12.786,20.87,30,20.87,30-15.98,30-20.87S50.714,16.5,33.5,16.5Zm0,39.13C17.113,55.63,6.109,40.513,6.109,37.37s11-18.261,27.391-18.261S60.891,34.226,60.891,37.37,49.886,55.63,33.5,55.63Zm0-28.7A10.435,10.435,0,1,0,43.935,37.37,10.447,10.447,0,0,0,33.5,26.935Zm0,18.261a7.826,7.826,0,1,1,7.826-7.826A7.835,7.835,0,0,1,33.5,45.2Z" transform="translate(-3.5 -16.5)"/>
                    </svg>
                  </div>
                  <div className="cl-sd-previewprofileContent">
                    <h4>{t('ProfilePreview.title')}</h4>
                    <p>{t('ProfilePreview.p1')}<br/> {t('ProfilePreview.p2')}</p>
                  </div>
                </div>
              </div>
              <div className="uk-width-xlarge-3-10 uk-width-large-4-10 uk-width-medium-3-10 uk-width-small-1-1">
                <div className="cl-sd-previewprofileBtn">
                  <a onClick={this.handleEdit}>{t('ProfilePreview.editProfile')}</a>
                  {
                    (isActiveSport === false || isActiveProfile === false) && (
                      <a onClick={this.handlePublish}>{t('ProfilePreview.publishProfile')}</a>
                    )
                  }
                </div>
              </div>
              <Modal isModalOpen={this.state.isModalOpen}>
                <CongratulationsModal onClose={this.handleCloseModal}/>
              </Modal>
            </div>
          </section>
        ) : null
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profile: PropTypes.object.isRequired,
      // ProfileActivationStatus: PropTypes.object.isRequired,
      sportActivationStatus: PropTypes.object.isRequired,
      sportAndProfileActivationStatus: PropTypes.object.isRequired,
      // ActivateNewProfile: PropTypes.func.isRequired,
      activateSport: PropTypes.func.isRequired,
      activateSportAndProfile: PropTypes.func.isRequired,
      data: PropTypes.object.isRequired,
      // SspID: PropTypes.string.isRequired,
      router: PropTypes.object.isRequired,
      // Sports: PropTypes.array.isRequired,
      match: PropTypes.object.isRequired
      // History: PropTypes.object.isRequired,
      // isActive: PropTypes.string.isRequired
    };
  }
}

const mapStateToProps = state => {
  return {
    data: state.viewssp.sspData.data,
    status: state.viewssp.sspData.status,
    // IsActive: state.viewssp.sspData.data.isActive,
    // sspID: state.viewssp.sspData.data.sspID,
    // ssptypeID: state.viewssp.sspData.data.ssptypeID,
    // sports: state.viewssp.sspData.data.sports,
    profile: state.profile,
    profileActivationStatus: state.profileActivationStatus,
    sportActivationStatus: state.sportActivationStatus,
    sportAndProfileActivationStatus: state.sportAndProfileActivationStatus,
    router: state.router,
    sessionFilteredList: state.viewssp.sspSessions.sessionFilteredList,
    sessionStatus: state.viewssp.sspSessions.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    activateNewProfile: profileID => dispatch(activateNewProfile(profileID)),
    activateSport: (profileID, sportID) => dispatch(activateSport(profileID, sportID)),
    activateSportAndProfile: (profileID, sportID) => dispatch(activateSportAndProfile(profileID, sportID))
  };
};

export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(ProfilePreview)));
/* eslint react/no-deprecated: 0 */

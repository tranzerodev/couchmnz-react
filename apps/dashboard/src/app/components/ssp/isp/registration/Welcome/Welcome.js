import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {
  fetchSessions,
  fetchEvents,
  activateNewProfile,
  changeProfile
} from '../../../../../actions';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import TopContent from '../ISPRegFlowTopContent';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import {
  REGISTRATION_ISP_SPORTS,
  REGISTRATION_ISP_TRAINING_PREFERENCE,
  REGISTRATION_ISP_LISTING,
  REGISTRATION_ISP_MEDIA,
  REGISTRATION_ISP_PRICING,
  REGISTRATION_ISP_TRAINING_LOCATIONS,
  REGISTRATION_ISP_SESSIONS,
  REGISTRATION_ISP_SCHEDULE,
  REGISTRATION_ISP_ACCOUNT_DETAILS,
  REGISTRATION_ISP_PAYOUT_DETAILS,
  REGISTRATION_ISP_BIOGRAPHY,
  REGISTRATION_ISP_BUSINESS_MODAL,
  REGISTRATION_ISP_BOOKING_PREFERENCES,
  DASHBOARD_LINK
} from '../../../../../constants/pathConstants';
import {
  TRAINING_PREFERENCES_SCREESHOT, BUILD_YOUR_PROFILE_SCREESHOT, PRICING_SCREESHOT, LOCATION_SCREESHOT, DEFINE_SESSION_SCREESHOT, SCHEDULER_SCREESHOT
} from '../../../../../constants/assetsPaths';
import validateTrainingPreferences from '../../../../../validators/ssp/isp/common/trainingPrefrences';
import validateListing from '../../../../../validators/ssp/isp/dashboard/listing';
import validateMedia from '../../../../../validators/ssp/isp/common/media';
import validateBookingPreferences from '../../../../../validators/ssp/isp/common/bookingPreferences';
import {validateAccountDetails} from '../../../../../validators/ssp/isp/registration/accountDetails';
import {validateBankPayoutDetails} from '../../../../../validators/ssp/isp/registration/bankDetails';
import sessionPreValidation from '../../../../../validators/ssp/isp/common/sessionPreValidation';
import appConstants from '../../../../../constants/appConstants';
import {notNull} from '../../../../../validators/common/util';
import CommonModal from '../../../../common/Modal';
import RegCompleteModal from '../RegCompleteModal';

function validateBuildProfile(currentSport) {
  const validation = {
    sports: false,
    offerTerminology: false,
    playingExperience: false,
    coachingExperience: false
  };
  if (currentSport.data) {
    validation.sport = notNull(currentSport.data.id);
    validation.offerTerminology = notNull(currentSport.data.offerTerminology.singular);
    validation.playingExperience = true;
    validation.coachingExperience = true;
    validation.valid = validation.sport && validation.offerTerminology && validation.playingExperience && validation.coachingExperience;
  }
  return validation;
}

function isAllBiographyDataFilled({currentSport, degrees, sportsDegrees, certifications, genCertifications, genAwards, sportsAwards, genTools, sportsTools, genAffiliations, sportsAffiliation}) {
  let filled = false;

  if (currentSport.data.playingExperience.numberOfYears && currentSport.data.coachingExperience.numberOfYears) {
    filled = true;
  }
  if (degrees.length > 0 || sportsDegrees.length > 0) {
    filled = true;
  }
  if (certifications.length > 0 || genCertifications.length > 0) {
    filled = true;
  }
  if (genAwards.length > 0 || sportsAwards.length > 0) {
    filled = true;
  }
  if (genTools.length > 0 || sportsTools.length > 0) {
    filled = true;
  }
  if (genAffiliations.length > 0 || sportsAffiliation.length > 0) {
    filled = true;
  }
  return filled;
}

function validateBiography(currentSport) {
  const validation = {
    playingExperience: false,
    coachingExperience: false
  };
  if (currentSport.data) {
    validation.coachingExperience = notNull(currentSport.data.coachingExperience.numberOfYears);
    validation.valid = validation.coachingExperience;
  }
  return validation;
}

class Welcome extends Component {
  constructor() {
    super();
    this.handleLetsGo = this.handleLetsGo.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
    this.renderBuildProfile = this.renderBuildProfile.bind(this);
    this.renderSessions = this.renderSessions.bind(this);
    this.renderAcconts = this.renderAcconts.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getPayoutDeatilStatus = this.getPayoutDeatilStatus.bind(this);
    this.getPricingStatus = this.getPricingStatus.bind(this);
    this.getTrainingLocation = this.getTrainingLocation.bind(this);
    this.getSessionStatus = this.getSessionStatus.bind(this);
    this.getNearestPageWithIntermediateState = this.getNearestPageWithIntermediateState.bind(this);
    this.onCongratulationModalOk = this.onCongratulationModalOk.bind(this);
    const intermediate = appConstants.RegistrationFlowPageStatusFlags.intermediate;
    const disabled = appConstants.RegistrationFlowPageStatusFlags.disabled;
    this.state = {
      regStage: 0,
      regStages: [],
      notFilled: 0,
      trainingPreference: disabled,
      sport: intermediate,
      listing: disabled,
      media: disabled,
      biography: disabled,
      businessModel: intermediate,
      bookingPreference: intermediate,
      accountDetails: intermediate,
      payoutDetails: intermediate,
      pricing: disabled,
      trainingLocation: disabled,
      session: disabled,
      event: disabled,
      isProfileComplete: true,
      isOpenCongratsModal: false
    };
  }
  componentDidMount() {
    this.setPageStatus(this.props);
  }
  setPageStatus(props) {
    const {userProfiles} = props;
    if (userProfiles.selectedProfile && userProfiles.selectedProfile.type === appConstants.userProfileTypes.ISP &&
        userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active) {
      this.setState({isOpenCongratsModal: true});
    }
    const intermediate = appConstants.RegistrationFlowPageStatusFlags.intermediate;
    const disabled = appConstants.RegistrationFlowPageStatusFlags.disabled;
    let isProfileComplete = true;
    const {profile, currentSport} = props;
    if (currentSport.status === FULFILLED) {
      // Build Profile
      const validatedSports = validateBuildProfile(currentSport);
      if (validatedSports.valid) {
        this.setState({sport: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({sport: appConstants.RegistrationFlowPageStatusFlags.intermediate});
        isProfileComplete = false;
        this.props.history.push(REGISTRATION_ISP_SPORTS);
      }

      // Biography
      const isBiographyFilled = isAllBiographyDataFilled(props);
      const validatedBio = validateBiography(currentSport);
      if (isBiographyFilled) {
        this.setState({biography: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({biography: appConstants.RegistrationFlowPageStatusFlags.intermediate});
      }
      if (validatedBio.valid) {
        this.setState({sport: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({sport: appConstants.RegistrationFlowPageStatusFlags.intermediate});
        isProfileComplete = false;
        this.props.history.push(REGISTRATION_ISP_BIOGRAPHY);
      }

      // Training Preferences
      const {ages, gender, skillLevels} = currentSport.data.prerequisites;
      const training = currentSport.data.subSSPTypes;
      const trainingPreference = validateTrainingPreferences({ages, gender, skillLevels, training});
      if (trainingPreference.valid) {
        this.setState({trainingPreference: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({trainingPreference: appConstants.RegistrationFlowPageStatusFlags.intermediate});
        isProfileComplete = false;
      }

      // Listing
      const validatedListing = validateListing({headline: currentSport.data.headline});
      if (validatedListing.valid) {
        this.setState({listing: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({listing: appConstants.RegistrationFlowPageStatusFlags.intermediate});
        isProfileComplete = false;
      }

      // Media
      const {displayPicture} = props;
      const actionPictures = currentSport.data.media.images;
      const validatedMedia = validateMedia({actionPictures, displayPicture});
      if (validatedMedia.valid) {
        this.setState({media: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({media: appConstants.RegistrationFlowPageStatusFlags.intermediate});
        isProfileComplete = false;
      }

      // Pricing
      const pricing = this.getPricingStatus(currentSport.data);
      this.setState({pricing});

      // Training Locations
      const trainingLocation = this.getTrainingLocation(currentSport.data);
      isProfileComplete = (trainingLocation === intermediate || trainingLocation === disabled) ? false : isProfileComplete;
      this.setState({trainingLocation});

      // Sessions
      const {sessions} = props;
      const session = this.getSessionStatus(sessions, currentSport.data);
      isProfileComplete = (session === intermediate || session === disabled) ? false : isProfileComplete;
      this.setState({session});
    }

    if (profile.status === FULFILLED) {
      // Business Model
      const {businessModel} = profile.data;
      if (notNull(businessModel)) {
        this.setState({businessModel: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({businessModel: appConstants.RegistrationFlowPageStatusFlags.intermediate});
        isProfileComplete = false;
      }

      // Booking Prefernces
      const {bookingPreference, cancellationPolicy, bookingCutOffTime} = profile.data;
      const validatedBookingPrefences = validateBookingPreferences({bookingPreference, cancellationPolicy, bookingCutOffTime});
      if (validatedBookingPrefences.valid) {
        this.setState({bookingPreference: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({bookingPreference: appConstants.RegistrationFlowPageStatusFlags.intermediate});
        isProfileComplete = false;
      }

      // Account Details
      const {presentNickName, contact} = props;
      const nickname = presentNickName.nickname;
      const validatedAccountDetails = validateAccountDetails({...contact, nickname});
      if (validatedAccountDetails.required) {
        this.setState({accountDetails: appConstants.RegistrationFlowPageStatusFlags.complete});
      } else {
        this.setState({accountDetails: appConstants.RegistrationFlowPageStatusFlags.intermediate});
        isProfileComplete = false;
      }

      // Payout Details
      const payoutDetails = this.getPayoutDeatilStatus(profile.data);
      isProfileComplete = (payoutDetails === intermediate || payoutDetails === disabled) ? false : isProfileComplete;
      this.setState({payoutDetails});
    }

    // Events
    const {events, sessions} = props;
    const event = this.getEventsStatus(sessions, events);
    isProfileComplete = (event === intermediate || event === disabled) ? false : isProfileComplete;
    this.setState({event, isProfileComplete});
  }

  getPayoutDeatilStatus(data) {
    const {payoutOption, bankDetails} = data;
    if (notNull(payoutOption)) {
      if (payoutOption === appConstants.payoutOption.payPal) {
        const {paypalDetails} = data;
        if (notNull(paypalDetails.email)) {
          return appConstants.RegistrationFlowPageStatusFlags.complete;
        }
      } else if (payoutOption === appConstants.payoutOption.bank) {
        const validatedBankDetails = validateBankPayoutDetails(bankDetails);
        if (validatedBankDetails.required) {
          return appConstants.RegistrationFlowPageStatusFlags.complete;
        }
      }
    }
    return appConstants.RegistrationFlowPageStatusFlags.intermediate;
  }

  getPricingStatus(data) {
    const {ages, gender, skillLevels} = data.prerequisites;
    const training = data.subSSPTypes;
    const validation = validateTrainingPreferences({ages, gender, skillLevels, training});
    const preValidationStatus = validation.skillLevels && validation.training && validation.ages;
    if (preValidationStatus) {
      const {subSSPTypes} = data.pricePerSession;
      for (let i = 0; i < subSSPTypes.length; i++) {
        if (subSSPTypes[i].prices.length < 1) {
          return appConstants.RegistrationFlowPageStatusFlags.intermediate;
        }
      }
      return appConstants.RegistrationFlowPageStatusFlags.complete;
    }
    return appConstants.RegistrationFlowPageStatusFlags.disabled;
  }

  getTrainingLocation(data) {
    const {trainingLocations, travelPreferences} = data;
    if (trainingLocations.length > 0 && notNull(travelPreferences.willingToTravel)) {
      return appConstants.RegistrationFlowPageStatusFlags.complete;
    }
    return appConstants.RegistrationFlowPageStatusFlags.intermediate;
  }

  getSessionStatus(sessions, data) {
    const status = sessionPreValidation(data);
    if (status) {
      if (sessions.status === FULFILLED && sessions.data.length > 0) {
        return appConstants.RegistrationFlowPageStatusFlags.complete;
      }
      return appConstants.RegistrationFlowPageStatusFlags.intermediate;
    }
    return appConstants.RegistrationFlowPageStatusFlags.disabled;
  }

  getEventsStatus(sessions, events) {
    if (sessions.data.length > 0) {
      if (events.data.length > 0) {
        return appConstants.RegistrationFlowPageStatusFlags.complete;
      }
      return appConstants.RegistrationFlowPageStatusFlags.intermediate;
    }
    return appConstants.RegistrationFlowPageStatusFlags.disabled;
  }

  componentWillReceiveProps(nextProps) {
    this.setPageStatus(nextProps);
    if (this.props.sessions.status !== FULFILLED && this.props.sessions.status !== PENDING && this.props.profile.status === FULFILLED && this.props.currentSport.status === FULFILLED) {
      this.props.fetchSessions({profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
    }
    if (this.props.events.status !== FULFILLED && this.props.events.status !== PENDING) {
      this.props.fetchEvents();
    }
    if (this.props.userProfiles.status !== FULFILLED && nextProps.userProfiles.status === FULFILLED) {
      const profile = nextProps.userProfiles.data.find(profile => profile.type === appConstants.userProfileTypes.ISP);
      this.props.changeProfile(profile);
    }
  }

  handleLetsGo() {
    const route = this.getNearestPageWithIntermediateState();
    const {isProfileComplete} = this.state;
    if (isProfileComplete) {
      const {profile} = this.props;
      if (profile.data.profile.isActive === appConstants.profileActiveFlages.inactive) {
        this.props.activateNewProfile({profileID: profile.data.profile.id});
      }
    } else {
      this.props.history.push(route);
    }
  }
  getNearestPageWithIntermediateState() {
    const {
      trainingPreference,
      sport,
      listing,
      media,
      biography,
      businessModel,
      bookingPreference,
      accountDetails,
      payoutDetails,
      pricing,
      trainingLocation,
      session,
      event
    } = this.state;
    const intermediate = appConstants.RegistrationFlowPageStatusFlags.intermediate;
    if (sport === intermediate) {
      return REGISTRATION_ISP_SPORTS;
    } else if (biography === intermediate) {
      return REGISTRATION_ISP_BIOGRAPHY;
    } else if (trainingPreference === intermediate) {
      return REGISTRATION_ISP_TRAINING_PREFERENCE;
    } else if (listing === intermediate) {
      return REGISTRATION_ISP_LISTING;
    } else if (media === intermediate) {
      return REGISTRATION_ISP_MEDIA;
    } else if (pricing === intermediate) {
      return REGISTRATION_ISP_PRICING;
    } else if (trainingLocation === intermediate) {
      return REGISTRATION_ISP_TRAINING_LOCATIONS;
    } else if (session === intermediate) {
      return REGISTRATION_ISP_SESSIONS;
    } else if (event === intermediate) {
      return REGISTRATION_ISP_SCHEDULE;
    } else if (businessModel === intermediate) {
      return REGISTRATION_ISP_BUSINESS_MODAL;
    } else if (bookingPreference === intermediate) {
      return REGISTRATION_ISP_BOOKING_PREFERENCES;
    } else if (accountDetails === intermediate) {
      return REGISTRATION_ISP_ACCOUNT_DETAILS;
    } else if (payoutDetails === intermediate) {
      return REGISTRATION_ISP_PAYOUT_DETAILS;
    }
    return REGISTRATION_ISP_SPORTS;
  }
  onCongratulationModalOk() {
    this.setState({isOpenCongratsModal: false});
    this.props.history.push(DASHBOARD_LINK);
  }

  renderBuildProfile() {
    const {trainingPreference, sport, listing, media, biography} = this.state;
    return (
      <ul className="category-lisiting">
        {
          this.renderItem(
            'sports_and_experince', BUILD_YOUR_PROFILE_SCREESHOT, REGISTRATION_ISP_SPORTS, {type: sport, tooltip: true})
        }
        {
          this.renderItem('degrees_and_certifications', '', REGISTRATION_ISP_BIOGRAPHY, {type: biography, tooltip: false})
        }
        {
          this.renderItem('training_preferences', TRAINING_PREFERENCES_SCREESHOT, REGISTRATION_ISP_TRAINING_PREFERENCE,
            {type: trainingPreference, tooltip: true})
        }
        {
          this.renderItem('listing_details', '', REGISTRATION_ISP_LISTING, {type: listing, tooltip: false})
        }
        {
          this.renderItem('media', '', REGISTRATION_ISP_MEDIA, {type: media, tooltip: false})
        }
      </ul>
    );
  }

  renderSessions() {
    const {pricing, trainingLocation, session, event} = this.state;
    return (
      <ul className="category-lisiting">
        {
          this.renderItem('set_pricinig', PRICING_SCREESHOT, REGISTRATION_ISP_PRICING, {type: pricing, tooltip: true})
        }
        {
          this.renderItem('define_training_locations', LOCATION_SCREESHOT, REGISTRATION_ISP_TRAINING_LOCATIONS,
            {type: trainingLocation, tooltip: true})
        }
        {
          this.renderItem('define_sessions', DEFINE_SESSION_SCREESHOT, REGISTRATION_ISP_SESSIONS, {type: session, tooltip: true})
        }
        {
          this.renderItem('schedule_sessions', SCHEDULER_SCREESHOT, REGISTRATION_ISP_SCHEDULE, {type: event, tooltip: true})
        }
      </ul>
    );
  }

  renderAcconts() {
    const {businessModel, bookingPreference, accountDetails, payoutDetails} = this.state;
    return (
      <ul className="category-lisiting">
        {
          this.renderItem('product_options', '', REGISTRATION_ISP_BUSINESS_MODAL, {type: businessModel, tooltip: false})
        }
        {
          this.renderItem('booking_preferences', '', REGISTRATION_ISP_BOOKING_PREFERENCES, {type: bookingPreference, tooltip: false})
        }
        {
          this.renderItem('account_details', '', REGISTRATION_ISP_ACCOUNT_DETAILS, {type: accountDetails, tooltip: false})
        }
        {
          this.renderItem('payout_details', '', REGISTRATION_ISP_PAYOUT_DETAILS, {type: payoutDetails, tooltip: false})
        }
      </ul>
    );
  }

  renderItem(textKey, imgUrl, link, {type, tooltip}) {
    return (
      <li className={type === appConstants.RegistrationFlowPageStatusFlags.complete ? 'visit' : type === appConstants.RegistrationFlowPageStatusFlags.disabled ? 'disabled' : ''}>
        <NavLink to={link}>{this.props.p.t('Welcome.' + textKey + '.a')}</NavLink>
        {tooltip &&
          <a className="noti">
            <svg className="cl-sm-notification" xmlns="http://www.w3.org/2000/svg" viewBox="-15386 -6243 18 18">
              <g data-name="Group 3631" transform="translate(-16152 -6927)">
                <path data-name="Path 240" className="cl-sm-notification-1" d="M47.595,29.7a.847.847,0,0,0-.895.867.863.863,0,0,0,.867.895h.027a.869.869,0,0,0,.895-.895A.88.88,0,0,0,47.595,29.7Z" transform="translate(727.406 657.797)"/>
                <rect data-name="Rectangle 2592" className="cl-sm-notification-1" width="1.383" height="7.563" transform="translate(774.323 690.669)"/>
                <path data-name="Path 241" className="cl-sm-notification-1" d="M25.8,16.8a9,9,0,1,0,9,9A9.012,9.012,0,0,0,25.8,16.8Zm0,16.645A7.645,7.645,0,1,1,33.445,25.8,7.653,7.653,0,0,1,25.8,33.445Z" transform="translate(749.2 667.2)"/>
              </g>
            </svg>
            <div className="noti_tooltip">
              <div className="noti_tooltip_img">
                <img src={imgUrl}/>
              </div>
              <div className="noti_tooltip_content">
                <p>{this.props.p.t('Welcome.' + textKey + '.p')}</p>
              </div>
            </div>
          </a>
        }
      </li>
    );
  }

  render() {
    const buildProfile = this.renderBuildProfile();
    const Sessions = this.renderSessions();
    const Account = this.renderAcconts();
    const {isProfileComplete} = this.state;
    return (
      <div>
        <TopContent step={1}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className="welcome">
                  <h1 className="uk-padding-remove">{this.props.p.t('Welcome.title')} {this.props.profile && this.props.profile.data && this.props.profile.data.profile && this.props.profile.data.profile.firstName ? this.props.profile.data.profile.firstName : ''}!</h1>
                  <p className>{this.props.p.t('Welcome.message')}</p>
                  <p>{this.props.p.t('Welcome.message2')}</p>
                  <ul className="title-listing">
                    <li>
                      <h3>{this.props.p.t('Welcome.build_your_profile')}</h3>
                      {buildProfile}
                    </li>
                    <li>
                      <h3>{this.props.p.t('Welcome.define_training_sessions')}</h3>
                      {Sessions}
                    </li>
                    <li>
                      <h3>{this.props.p.t('Welcome.complete_your_account')}</h3>
                      {Account}
                    </li>
                  </ul>
                  <p>{this.props.p.t('Welcome.message3')}</p>
                </div>
              </div>
            </div>
            <div className="uk-grid pt20">
              <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2  uk-width-small-1-2"/>
              <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2  uk-width-small-1-2 ">
                <div className="nxtAlign">
                  <a onClick={this.handleLetsGo} className="general_btn">{isProfileComplete ? this.props.p.t('Welcome.activate_profile') : this.props.p.t('Welcome.letsGo')}</a>
                </div>
              </div>
            </div>
          </div>
          <CommonModal isModalOpen={this.state.isOpenCongratsModal} >
            <RegCompleteModal handleClose={this.onCongratulationModalOk}/>
          </CommonModal>
        </section>
      </div>
    );
  }

  static get propTypes() {
    return {
      profile: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      currentSport: PropTypes.object.isRequired,
      sessions: PropTypes.object.isRequired,
      fetchSessions: PropTypes.func.isRequired,
      fetchEvents: PropTypes.func.isRequired,
      events: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      changeProfile: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      activateNewProfile: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {sports, sspValidation, profile, displayPicture, actionPictures, sessions, events,
    sportsDegrees,
    genCertifications,
    genAwards,
    sportsAwards,
    sportsAffiliation,
    genAffiliations,
    sportsTools,
    genTools,
    degrees,
    certifications,
    currentSport,
    presentNickName,
    contact,
    userProfiles
  } = state;
  return {
    sports,
    sspValidation,
    profile,
    displayPicture,
    actionPictures,
    sessions,
    events,
    sportsDegrees,
    genCertifications,
    genAwards,
    sportsAwards,
    sportsAffiliation,
    genAffiliations,
    sportsTools,
    genTools,
    degrees,
    certifications,
    currentSport,
    presentNickName,
    contact,
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSessions: params => dispatch(fetchSessions(params)),
    fetchEvents: () => dispatch(fetchEvents()),
    activateNewProfile: (data, params) => dispatch(activateNewProfile(data, params)),
    changeProfile: profile => dispatch(changeProfile(profile))
  };
};

const WelcomeScreen = connect(mapStateToProps, mapDispatchToProps)(Welcome);
export default translate(WelcomeScreen);
/* eslint complexity: 0 */

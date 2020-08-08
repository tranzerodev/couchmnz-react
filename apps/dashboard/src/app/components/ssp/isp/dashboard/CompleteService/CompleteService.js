import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {
  DASHBOARD_ACCOUNT_BUSINESS_MODEL,
  DASHBOARD_SPORTS,
  DASHBOARD_MANAGE_COMPLETE_BOOKING_PREFERENCE,
  DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS,
  DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS,
  DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS
} from '../../../../../constants/pathConstants';
import {getProfileStatus} from '../../../../../validators/ssp/isp/registration/registrationPageStatus';
import appConstants from '../../../../../constants/appConstants';
import {FULFILLED, REJECTED, PENDING} from '../../../../../constants/ActionTypes';
import {ispFetchWorkingDays} from '../../../../../actions/index';
import getCompletedServiceProfile from '../../../../../validators/ssp/isp/common/completedServiceProfile';

const complete = appConstants.RegistrationFlowPageStatusFlags.complete;

class CompleteService extends Component {
  constructor(props) {
    super(props);

    this.renderBusinessModal = this.renderBusinessModal.bind(this);
    this.renderBookingPreference = this.renderBookingPreference.bind(this);
    this.renderAccountDetails = this.renderAccountDetails.bind(this);
    this.renderPayoutDetails = this.renderPayoutDetails.bind(this);
    this.renderSchedulerSettings = this.renderSchedulerSettings.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleAddAnother = this.handleAddAnother.bind(this);
    this.getNumberOfSteps = this.getNumberOfSteps.bind(this);

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
    window.scrollTo(0, 0);
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

  handleAddAnother() {
    this.props.history.push(DASHBOARD_SPORTS);
  }

  handleContinue() {
    this.props.history.push(DASHBOARD_MANAGE_COMPLETE_BOOKING_PREFERENCE);
  }

  getNumberOfSteps(statusList) {
    let step = 0;
    Object.keys(statusList).forEach(key => {
      if (statusList[key] !== complete) {
        step += 1;
      }
    });
    return step;
  }

  renderBusinessModal(status) {
    const {p} = this.props;
    if (status !== complete) {
      return (
        <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2  uk-width-small-1-1">
          <div className="cl-sd-completedStep">
            <div className="cl-sd-completedStep-upper">
              <svg className="cl-icon-preference-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.237 50.667">
                <g transform="translate(0.5 0.5)">
                  <g data-name="Group 4061" transform="translate(0 0)">
                    <g data-name="Group 4060" transform="translate(0 0)">
                      <path data-name="Path 265" className="cl-icon-preference-gray-1" d="M8.565,10A5.72,5.72,0,0,1,8.94,7.972H2.325a2.029,2.029,0,0,0,0,4.058H8.94A5.718,5.718,0,0,1,8.565,10" transform="translate(-0.297 -2.226)"/>
                      <path data-name="Path 266" className="cl-icon-preference-gray-2" d="M55.074,7.972H25.251a5.668,5.668,0,0,1,0,4.058H55.074a2.029,2.029,0,1,0,0-4.058" transform="translate(-5.866 -2.226)"/>
                      <path data-name="Path 267" className="cl-icon-preference-gray-3" d="M16.1,16.125A7.775,7.775,0,1,1,23.879,8.35,7.783,7.783,0,0,1,16.1,16.125Zm0-11.492A3.717,3.717,0,1,0,19.821,8.35,3.722,3.722,0,0,0,16.1,4.633Z" transform="translate(-2.089 -0.575)"/>
                      <path data-name="Path 268" className="cl-icon-preference-gray-1" d="M30.319,31.961a5.719,5.719,0,0,1,.376-2.029H2.325a2.029,2.029,0,0,0,0,4.058H30.694a5.726,5.726,0,0,1-.375-2.028" transform="translate(-0.297 -7.127)"/>
                      <path data-name="Path 269" className="cl-icon-preference-gray-2" d="M61.324,29.931h-8.07a5.671,5.671,0,0,1,0,4.058h8.069a2.029,2.029,0,1,0,0-4.058" transform="translate(-12.116 -7.127)"/>
                      <path data-name="Path 270" className="cl-icon-preference-gray-3" d="M44.107,38.084a7.775,7.775,0,1,1,7.775-7.775,7.784,7.784,0,0,1-7.775,7.775Zm0-11.492a3.717,3.717,0,1,0,3.718,3.717,3.721,3.721,0,0,0-3.718-3.717Z" transform="translate(-8.339 -5.476)"/>
                      <path data-name="Path 271" className="cl-icon-preference-gray-1" d="M8.565,53.92a5.72,5.72,0,0,1,.376-2.029H2.325a2.029,2.029,0,1,0,0,4.057H8.94a5.718,5.718,0,0,1-.376-2.029" transform="translate(-0.297 -12.028)"/>
                      <path data-name="Path 272" className="cl-icon-preference-gray-2" d="M55.074,51.891H25.251a5.668,5.668,0,0,1,0,4.057H55.074a2.029,2.029,0,1,0,0-4.057" transform="translate(-5.866 -12.028)"/>
                      <path data-name="Path 273" className="cl-icon-preference-gray-3" d="M16.1,60.044a7.775,7.775,0,1,1,7.775-7.775A7.783,7.783,0,0,1,16.1,60.044Zm0-11.492a3.717,3.717,0,1,0,3.717,3.717A3.721,3.721,0,0,0,16.1,48.552Z" transform="translate(-2.089 -10.377)"/>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className="cl-sd-completedStep-lower">
              <NavLink to={DASHBOARD_ACCOUNT_BUSINESS_MODEL}>{p.t('CompleteService.business')}<br/>{p.t('CompleteService.model')}</NavLink>
              <p>{p.t('CompleteService.business_model_desc')}</p>
            </div>
          </div>
        </div>
      );
    }
  }

  renderBookingPreference(status) {
    const {p} = this.props;
    if (status !== complete) {
      return (
        <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
          <div className="cl-sd-completedStep">
            <div className="cl-sd-completedStep-upper">
              <svg className="cl-icon-preference-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.237 50.667">
                <g transform="translate(0.5 0.5)">
                  <g data-name="Group 4061" transform="translate(0 0)">
                    <g data-name="Group 4060" transform="translate(0 0)">
                      <path data-name="Path 265" className="cl-icon-preference-gray-1" d="M8.565,10A5.72,5.72,0,0,1,8.94,7.972H2.325a2.029,2.029,0,0,0,0,4.058H8.94A5.718,5.718,0,0,1,8.565,10" transform="translate(-0.297 -2.226)"/>
                      <path data-name="Path 266" className="cl-icon-preference-gray-2" d="M55.074,7.972H25.251a5.668,5.668,0,0,1,0,4.058H55.074a2.029,2.029,0,1,0,0-4.058" transform="translate(-5.866 -2.226)"/>
                      <path data-name="Path 267" className="cl-icon-preference-gray-3" d="M16.1,16.125A7.775,7.775,0,1,1,23.879,8.35,7.783,7.783,0,0,1,16.1,16.125Zm0-11.492A3.717,3.717,0,1,0,19.821,8.35,3.722,3.722,0,0,0,16.1,4.633Z" transform="translate(-2.089 -0.575)"/>
                      <path data-name="Path 268" className="cl-icon-preference-gray-1" d="M30.319,31.961a5.719,5.719,0,0,1,.376-2.029H2.325a2.029,2.029,0,0,0,0,4.058H30.694a5.726,5.726,0,0,1-.375-2.028" transform="translate(-0.297 -7.127)"/>
                      <path data-name="Path 269" className="cl-icon-preference-gray-2" d="M61.324,29.931h-8.07a5.671,5.671,0,0,1,0,4.058h8.069a2.029,2.029,0,1,0,0-4.058" transform="translate(-12.116 -7.127)"/>
                      <path data-name="Path 270" className="cl-icon-preference-gray-3" d="M44.107,38.084a7.775,7.775,0,1,1,7.775-7.775,7.784,7.784,0,0,1-7.775,7.775Zm0-11.492a3.717,3.717,0,1,0,3.718,3.717,3.721,3.721,0,0,0-3.718-3.717Z" transform="translate(-8.339 -5.476)"/>
                      <path data-name="Path 271" className="cl-icon-preference-gray-1" d="M8.565,53.92a5.72,5.72,0,0,1,.376-2.029H2.325a2.029,2.029,0,1,0,0,4.057H8.94a5.718,5.718,0,0,1-.376-2.029" transform="translate(-0.297 -12.028)"/>
                      <path data-name="Path 272" className="cl-icon-preference-gray-2" d="M55.074,51.891H25.251a5.668,5.668,0,0,1,0,4.057H55.074a2.029,2.029,0,1,0,0-4.057" transform="translate(-5.866 -12.028)"/>
                      <path data-name="Path 273" className="cl-icon-preference-gray-3" d="M16.1,60.044a7.775,7.775,0,1,1,7.775-7.775A7.783,7.783,0,0,1,16.1,60.044Zm0-11.492a3.717,3.717,0,1,0,3.717,3.717A3.721,3.721,0,0,0,16.1,48.552Z" transform="translate(-2.089 -10.377)"/>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className="cl-sd-completedStep-lower">
              <NavLink to={DASHBOARD_MANAGE_COMPLETE_BOOKING_PREFERENCE}>{p.t('CompleteService.booking')}<br/>{p.t('CompleteService.preference')}</NavLink>
              <p>{p.t('CompleteService.booking_preference_p1')}</p>
              <p>{p.t('CompleteService.booking_preference_p2')}</p>
            </div>
          </div>
        </div>
      );
    }
  }

  renderAccountDetails(status) {
    const {p} = this.props;
    if (status !== complete) {
      return (
        <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
          <div className="cl-sd-completedStep">
            <div className="cl-sd-completedStep-upper">
              <svg className="cl-icon-account" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82">
                <g data-name="Group 4378" transform="translate(-728 -489)">
                  <circle data-name="Ellipse 32" className="cl-icon-account-1" cx="40" cy="40" r="40" transform="translate(729 490)"/>
                  <g data-name="Group 111" transform="translate(741.889 506.619)">
                    <path data-name="Intersection 1" className="cl-icon-account-2" d="M0,52.669C.578,49.439,1.6,46,3.386,44.181c3.318-3.366,11.14-5.533,17.85-6.353a20.5,20.5,0,0,0,.612-3.074,16.379,16.379,0,0,0-.5-2.628c-5.4-2.349-10.9-8.366-10.9-15.438A15.535,15.535,0,0,1,10.8,13.4c.166-4.422,2.471-6.467,4.976-9.466.094-.128.119.065.149.258a.625.625,0,0,0,.084.288q.206-.19.418-.37c.234-.233.475-.454.72-.671.062-.054.119-.111.182-.162.309-.265.629-.51.956-.746.055-.041.11-.084.166-.122.341-.238.689-.456,1.044-.661l.139-.082q.556-.31,1.135-.565c.034-.015.07-.031.1-.045A12.15,12.15,0,0,1,22.1.6,12.486,12.486,0,0,1,23.466.254,12.728,12.728,0,0,1,24.872.061C25.2.034,25.523,0,25.854,0c6.774,0,13.454,4.1,15.4,11.134a15.7,15.7,0,0,1,1.022,5.554c0,7.074-5.509,13.1-10.912,15.443a15.065,15.065,0,0,0-.535,2.622,16.929,16.929,0,0,0,.6,2.873c6.923.59,16.506,2.718,19.562,6.554,1.571,1.972,2.569,5.482,3.193,8.767A40,40,0,0,1,0,52.669Z" transform="translate(0 0)"/>
                    <path className="cl-icon-account-3" d="M31.013,1.163c-.058,4.661-2.416,6.734-4.985,9.81-.185.253-.1-.754-.321-.524-.06.062-.116.131-.177.194-.28.29-.573.561-.872.826-.061.053-.119.111-.182.162-.309.265-.629.51-.956.746-.055.041-.11.083-.166.123-.34.238-.688.455-1.044.66l-.139.082q-.555.309-1.135.565l-.1.045a12.341,12.341,0,0,1-1.221.455,12.4,12.4,0,0,1-1.369.349,12.505,12.505,0,0,1-1.406.193c-.328.027-.652.061-.982.061C8.043,14.91.264,9.318,0,0L8.3,8.342Z" transform="translate(42.124 14.91) rotate(180)"/>
                    <path className="cl-icon-account-4" d="M19.811,44.054s-3.049,8.783,9.18,8.783,9.916-8.783,9.916-8.783" transform="translate(-2.584 -5.514)"/>
                  </g>
                </g>
              </svg>
            </div>
            <div className="cl-sd-completedStep-lower">
              <NavLink to={DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS}>{p.t('CompleteService.account')} <br/> {p.t('CompleteService.details')}</NavLink>
              <p> {p.t('CompleteService.account_details_p1')}</p>
              <p> {p.t('CompleteService.account_details_p2')}</p>
            </div>
          </div>
        </div>
      );
    }
  }

  renderPayoutDetails(status) {
    const {p} = this.props;
    if (status !== complete) {
      return (
        <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
          <div className="cl-sd-completedStep">
            <div className="cl-sd-completedStep-upper">
              <svg className="cl-icon-revenue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 81.998">
                <g data-name="Group 4376" transform="translate(-368 -510)">
                  <g data-name="Ellipse 170" className="cl-icon-revenue-1" transform="translate(384.768 526.768)">
                    <circle className="cl-icon-revenue-4" cx="23.938" cy="23.938" r="23.938"/>
                    <circle className="cl-icon-revenue-5" cx="23.938" cy="23.938" r="22.938"/>
                  </g>
                  <g data-name="Group 1879" transform="translate(369 511)">
                    <path data-name="Path 164" className="cl-icon-revenue-2" d="M76.817,96.989A40.007,40.007,0,0,1,34.758,33.251" transform="translate(-25.751 -18.542)"/>
                    <path data-name="Path 165" className="cl-icon-revenue-2" d="M34.535,33.3A40,40,0,1,1,77.158,100.58" transform="translate(-19.034 -24.916)"/>
                  </g>
                  <path data-name="Path 166" className="cl-icon-revenue-3" d="M52.178,40.22a1.355,1.355,0,0,1,1.368,1.366v.7a11.563,11.563,0,0,1,4.925,1.747,1.7,1.7,0,0,1,.951,1.525,1.75,1.75,0,0,1-1.779,1.749,1.833,1.833,0,0,1-.951-.286,11.591,11.591,0,0,0-3.274-1.4v6.1c4.828,1.207,6.893,3.146,6.893,6.545,0,3.494-2.73,5.815-6.766,6.2V66.37a1.355,1.355,0,0,1-1.368,1.366,1.381,1.381,0,0,1-1.4-1.366V64.4a13.743,13.743,0,0,1-6.514-2.478,1.742,1.742,0,0,1-.858-1.525,1.747,1.747,0,0,1,2.8-1.4,11.332,11.332,0,0,0,4.7,2.128V54.869c-4.639-1.209-6.8-2.956-6.8-6.545,0-3.4,2.7-5.751,6.672-6.069v-.667A1.382,1.382,0,0,1,52.178,40.22ZM50.909,51.055V45.431c-2.033.191-3.051,1.271-3.051,2.668C47.86,49.434,48.462,50.261,50.909,51.055Zm2.509,4.415v5.783c2.033-.222,3.146-1.239,3.146-2.764C56.565,57.092,55.866,56.235,53.419,55.471Z" transform="translate(357.357 497.251)"/>
                </g>
              </svg>
            </div>
            <div className="cl-sd-completedStep-lower">
              <NavLink to={DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS}>{p.t('CompleteService.how_do_we')} <br/> {p.t('CompleteService.pay_you')}</NavLink>
              <p>{p.t('CompleteService.payout_details_desc')}</p>
            </div>
          </div>
        </div>
      );
    }
  }

  renderSchedulerSettings(status) {
    const {p} = this.props;
    if (status !== complete) {
      return (
        <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
          <div className="cl-sd-completedStep">
            <div className="cl-sd-completedStep-upper">
              <svg className="cl-icon-scheduler-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81 69.492">
                <g data-name="Group 4377" transform="translate(-1417 -206)">
                  <g transform="translate(1417 211.662)">
                    <rect data-name="Rectangle 496" className="cl-icon-scheduler-gray-1" width="63.273" height="54.769" rx="2"/>
                    <rect data-name="Rectangle 497" className="cl-icon-scheduler-gray-2" width="61.091" height="52.587" rx="2" transform="translate(1.091 1.091)"/>
                  </g>
                  <path className="cl-icon-scheduler-gray-3" d="M7.622.876v9.971" transform="translate(1421.645 206.124)"/>
                  <path data-name="Path-9" className="cl-icon-scheduler-gray-3" d="M26,.876v9.971" transform="translate(1443.364 206.124)"/>
                  <path data-name="Path-9" className="cl-icon-scheduler-gray-3" d="M20,.876v9.971" transform="translate(1436.273 206.124)"/>
                  <path data-name="Path-9" className="cl-icon-scheduler-gray-3" d="M14,.876v9.971" transform="translate(1429.182 206.124)"/>
                  <g data-name="Group 2777" transform="translate(1459.182 236.52)">
                    <ellipse className="cl-icon-scheduler-gray-4" cx="18.909" cy="18.987" rx="18.909" ry="18.987"/>
                    <path className="cl-icon-scheduler-gray-3" d="M29.211,24.472V36.4l8.182,4.336" transform="translate(-9.906 -15.325)"/>
                  </g>
                  <path className="cl-icon-scheduler-gray-5" d="M2.191,9.522H63.745" transform="translate(1415.225 216.343)"/>
                </g>
              </svg>
            </div>
            <div className="cl-sd-completedStep-lower">
              <NavLink to={DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS(this.props.currentSport.data.name)}>{p.t('CompleteService.setup_your')}<br/> {p.t('CompleteService.availaibility_calendar')}</NavLink>
              <p>{p.t('CompleteService.scheduler_desc')} <strong>{p.t('CompleteService.schedule')}</strong> {p.t('CompleteService.scheduler_desc2')}</p>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const {p, serviceProfiles} = this.props;
    const {t} = p;
    const {status} = this.state;
    const {bookingPreference, accountDetails, schedulerWorkingDays, payoutDetails} = status;
    const numberOfSteps = this.getNumberOfSteps(status);
    const completedSport = getCompletedServiceProfile(serviceProfiles.data);
    const sportName = completedSport && completedSport.sportName ? completedSport.sportName : '';
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-completeService-profile">
          <h1 className="uk-padding-remove">{t('CompleteService.h1')}</h1>
          <p className="pb20">{t('CompleteService.p', {sportName})}</p>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <h4>{t('CompleteService.h4')} <span>{t('CompleteService.steps', {numberOfSteps})}</span> {t('CompleteService.below')}</h4>
            </div>
          </div>
          <div className="uk-grid">
            {
              this.renderBookingPreference(bookingPreference)
            }
            {
              this.renderAccountDetails(accountDetails)
            }
            {
              this.renderPayoutDetails(payoutDetails)
            }
            {
              this.renderSchedulerSettings(schedulerWorkingDays)
            }
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
            <a className="general_btn" onClick={this.handleContinue}>{t('CompleteService.save')}</a>
            {/*    <a className="link cl-sd-anotherservice-btn" onClick={this.handleAddAnother}>{t('CompleteService.add')}<br/>{t('CompleteService.another_service')}</a>  */}
          </div>
        </div>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      history: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      workingDays: PropTypes.object.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired,
      serviceProfiles: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ispFetchWorkingDays: params => dispatch(ispFetchWorkingDays(params))
  };
};

const mapStateToProps = state => {
  const {profile, workingDays, serviceProfiles, userProfiles, currentSport} = state;
  return {
    profile,
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active,
    workingDays,
    serviceProfiles,
    currentSport
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(CompleteService)));
/* eslint react/no-deprecated: 0 */

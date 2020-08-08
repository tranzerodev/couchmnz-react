import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {
  setPaypalVerificationStatus, updatePaypalDetails, verifyPaypalEmail
} from '../../../../../actions';
import appConstants from '../../../../../constants/appConstants';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import {isDefined, isValidEmail, notNull} from '../../../../../validators/common/util';
import DashboardSaveLink from '../DashboardSaveLink';
import CommonModal from '../../../../common/Modal';
import VerifyEmailModal from '../../common/VerifyEmailModal';
import {DASHBOARD_ACCOUNT_SCHEDULER_SETTINGS, DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS} from '../../../../../constants/pathConstants';

class DashboardPaypalSettings extends Component {
  constructor(props) {
    super(props);
    this.handlePayout = this.handlePayout.bind(this);
    this.renderPaypalVerifySuccess = this.renderPaypalVerifySuccess.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onCloseVerifyModal = this.onCloseVerifyModal.bind(this);
    const {paypalDetails} = props;
    const {email} = paypalDetails;
    this.state = {
      email,
      validEmail: Boolean(email),
      submitted: false,
      isOpenVerifyModal: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    let {email} = this.state;
    if (!notNull(email)) {
      email = this.props.profile.data.profile.email;
    }
    this.setState({email});
    const validEmail = isDefined(email) ? Boolean(isValidEmail(email)) : true;
    this.setState({validEmail});
    this.props.setPaypalVerificationStatus({
      data: {
        email
      },
      status: FULFILLED,
      displaySuccess: false
    });
  }
  handlePayout(e) {
    this.setState({
      email: e.target.value
    });
    const validEmail = isDefined(e.target.value) ? Boolean(isValidEmail(e.target.value)) : true;
    this.setState({validEmail});
    if (this.props.paypalVerification.displaySuccess === true) {
      this.props.setPaypalVerificationStatus({
        data: {
          email: ''
        },
        status: null,
        displaySuccess: false
      });
    }
  }
  onSubmitForm() {
    this.setState({submitted: true});
    if (this.state.validEmail) {
      if (this.state.email === this.props.paypalVerification.data.email) {
        return true;
      }
      this.props.verifyPaypalEmail({profileID: this.props.profile.data.profile.id}, {email: this.state.email});
      this.setState({isOpenVerifyModal: true});
    }
    return false;
  }
  onCloseVerifyModal() {
    this.setState({isOpenVerifyModal: false});
  }
  renderPaypalVerifySuccess() {
    const {paypalVerification, p} = this.props;
    const {email} = this.state;
    if (paypalVerification.displaySuccess) {
      return (
        <div className="uk-width-xlarge-4-10 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
          <div className="thankyou">
            <div className="tableDiv">
              <div className="lCol">
                <svg className="cl-icon-check-circle" xmlns="http://www.w3.org/2000/svg" viewBox="7329 2611 57 57">
                  <g transform="translate(7329 2611)">
                    <circle className="cl-icon-check-circle-1" cx="27.5" cy="27.5" r="27.5" transform="translate(1 1)"/>
                    <path className="cl-icon-check-circle-2" d="M14.193,23.567,19.7,30.118,32.869,14.193" transform="translate(5.902 5.902)"/>
                  </g>
                </svg>
              </div>
              <div className="rCol">
                <h1>{p.t('PaypalSettings.thank_you')}</h1>
                <p>{p.t('PaypalSettings.verifySuccessMessage', {paypalEmail: email})}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    const {p, profileActivationStatus} = this.props;
    const {email, validEmail, submitted} = this.state;
    const buttonName = profileActivationStatus ? p.t('DashboardSaveLink.save') : p.t('DashboardSaveLink.save_and_continue');
    const next = profileActivationStatus ? DASHBOARD_ACCOUNT_SCHEDULER_SETTINGS : DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS(this.props.currentSport.data.name);

    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-7-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-trainingLocationInner">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <h1 className="uk-padding-remove">{p.t('PaypalSettings.recievePaymentThroughtPaypal')}</h1>
              <p>{p.t('PaypalSettings.header')}</p>
              <a href={appConstants.paypalLearnMoreLink} target="_blank" className="gen_link">{p.t('PaypalSettings.learn')}</a>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="accDetails">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-4-10 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
                    <div className={validEmail === false && submitted ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('PaypalSettings.email')}</label>
                      <input type="text" name className="uk-from-control" placeholder={this.props.p.t('PaypalSettings.emailExample')} value={email} onChange={this.handlePayout}/>
                      <span className="error-text">{validEmail === false && submitted ? this.props.p.t('PaypalSettings.validation_messages.email.required') : ''}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-2-10 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
                    <label>{p.t('PaypalSettings.dontHaveOne')}</label>
                    <a className="gen_link" href={appConstants.paypalLearnMoreLink} target="_blank">{this.props.p.t('PaypalSettings.setUpPaypal')}</a>
                  </div>
                  {
                    this.renderPaypalVerifySuccess()
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1">
            <DashboardSaveLink
              submitForm={this.onSubmitForm}
              saveData={this.props.updatePaypalDetails}
              data={{email}}
              saveType={appConstants.saveType.onlyProfile}
              buttonName={buttonName}
              isNewSports={profileActivationStatus}
              next={next}
            />
          </div>
        </div>
        <CommonModal isModalOpen={this.state.isOpenVerifyModal}>
          <VerifyEmailModal handleClose={this.onCloseVerifyModal} email={email ? email : ''}/>
        </CommonModal>
      </div>
    );
  }
  static get propTypes() {
    return {
      paypalDetails: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profile: PropTypes.object.isRequired,
      verifyPaypalEmail: PropTypes.func.isRequired,
      setPaypalVerificationStatus: PropTypes.func.isRequired,
      paypalVerification: PropTypes.object,
      updatePaypalDetails: PropTypes.func.isRequired,
      profileActivationStatus: PropTypes.bool.isRequired
    };
  }
}

DashboardPaypalSettings.defaultProps = {
  paypalDetails: {email: ''},
  paypalVerification: {}
};

const mapStateToProps = state => {
  const {paypalDetails, profile, paypalVerification, userProfiles, currentSport} = state;
  return {
    paypalDetails,
    profile,
    paypalVerification,
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active,
    currentSport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePaypalDetails: (data, updateType) => dispatch(updatePaypalDetails(data, updateType)),
    setPaypalVerificationStatus: data => dispatch(setPaypalVerificationStatus(data)),
    verifyPaypalEmail: (params, data) => dispatch(verifyPaypalEmail(params, data))
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(DashboardPaypalSettings));


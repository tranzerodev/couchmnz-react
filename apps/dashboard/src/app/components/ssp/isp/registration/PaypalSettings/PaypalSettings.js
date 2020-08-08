import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {
  updatePaypalDetails,
  setPaypalVerificationStatus,
  verifyPaypalEmail
} from '../../../../../actions';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import PaypalHeader from './PaypalHeader';
import NextLink from '../../../../common/RegistrationNextLink';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import appConstants from '../../../../../constants/appConstants';
import {WELCOME} from '../../../../../constants/pathConstants';
import {isValidEmail, isDefined, notNull} from '../../../../../validators/common/util';
import CommonModal from '../../../../common/Modal';
import VerifyEmailModal from '../../common/VerifyEmailModal';

class ISPRegistration14Class extends Component {
  constructor(props) {
    super(props);
    this.handlePayout = this.handlePayout.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onCloseVerifyModal = this.onCloseVerifyModal.bind(this);
    this.state = {
      email: this.props.paypalDetails.email,
      validEmail: Boolean(this.props.paypalDetails.email),
      submitted: false,
      isOpenVerifyModal: false
    };
  }
  componentDidMount() {
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
    window.scrollTo(0, 0);
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
  render() {
    const {email, validEmail, submitted} = this.state;
    return (
      <section className="stepSection stepSectionNxt ssp-regflow-1o">
        <div className="uk-container uk-container-center">
          <PaypalHeader/>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="accDetails">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
                    <div className={submitted && validEmail === false ? 'field-holder error' : 'field-holder'}>
                      <label>{this.props.p.t('PaypalSettings.email')}</label>
                      <input type="text" name className="uk-from-control" placeholder={this.props.p.t('PaypalSettings.emailExample')} value={email ? email : ''} onChange={this.handlePayout}/>
                      <span className="error-text">{this.props.p.t('PaypalSettings.validation_messages.email.email')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="accDetails">
                <p>{this.props.p.t('PaypalSettings.dontHaveOne')}</p>
                <a className="gen_link" href={appConstants.paypalLearnMoreLink} target="_blank">{this.props.p.t('PaypalSettings.setUpPaypal')}</a>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1"/>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2"/>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
              <div className="nxtAlign">
                <NextLink
                  submitForm={this.onSubmitForm}
                  saveData={this.props.updatePaypalDetails}
                  data={{email}}
                  saveType={appConstants.saveType.onlyProfile}
                  next={WELCOME}
                />
              </div>
            </div>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-1">
              <div className="finishDiv">
                <FinishLaterLink/>
              </div>
            </div>
          </div>
        </div>
        <CommonModal isModalOpen={this.state.isOpenVerifyModal}>
          <VerifyEmailModal handleClose={this.onCloseVerifyModal} email={email ? email : ''}/>
        </CommonModal>
      </section>
    );
  }
  static get propTypes() {
    return {
      paypalDetails: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profile: PropTypes.object.isRequired,
      updatePaypalDetails: PropTypes.func.isRequired,
      setPaypalVerificationStatus: PropTypes.func.isRequired,
      paypalVerification: PropTypes.object.isRequired,
      verifyPaypalEmail: PropTypes.func.isRequired
    };
  }
}

ISPRegistration14Class.defaultProps = {
  paypalDetails: {email: ''}
};

const mapStateToProps = state => {
  const {paypalDetails, profile, paypalVerification} = state;
  return {
    paypalDetails,
    profile,
    paypalVerification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePaypalDetails: (data, updateType) => dispatch(updatePaypalDetails(data, updateType)),
    setPaypalVerificationStatus: data => dispatch(setPaypalVerificationStatus(data)),
    verifyPaypalEmail: (params, data) => dispatch(verifyPaypalEmail(params, data))
  };
};

const Registration14 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration14Class);
export default translate(Registration14);

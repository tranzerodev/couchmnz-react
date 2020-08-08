import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import BookingPreferences from '../BookingPreferences';
import CancellationPolicies from '../CancellationPolicies';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import {saveBookingPreference} from '../../../../../actions';
import SubmitHandler from '../SubmitHandler';
import Modal from '../CancellationPolicies/Modal';
import NextLink from '../../../../common/RegistrationNextLink';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import appConstants from '../../../../../constants/appConstants';
import {REGISTRATION_ISP_ACCOUNT_DETAILS, REGISTRATION_ISP_BUSINESS_MODAL} from '../../../../../constants/pathConstants';
import RequiredNotFilledModal from '../RequiredNotFilledModal';
import validateBookingPreference from '../../../../../validators/ssp/isp/common/bookingPreferences';

const DROP_DOWN_OPTION_SELECT = 'DROP_DOWN_OPTION_SELECT';

class ISPRegistration10Class extends Component {
  constructor(props) {
    super(props);

    const {bookingPreferences, cancellationPolicy, bookingCutOffTime} = props;
    let initialBookingCutOffTime = appConstants.bookingPreference.initalBookingCutOffTime.autoAccept;
    if (bookingPreferences === appConstants.bookingPreference.mode.manualAccept) {
      initialBookingCutOffTime = appConstants.bookingPreference.initalBookingCutOffTime.manualAccept;
    }

    this.state = {
      isCancellationPolicyModalOpen: false,
      e: 'L',
      bookingPreferences,
      cancellationPolicy,
      bookingCutOffTime: (bookingCutOffTime) ? bookingCutOffTime : initialBookingCutOffTime,
      notFilled: [],
      isNotFilledModalOpen: false
    };

    this.onLearnMore = this.onLearnMore.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleBookingPreference = this.handleBookingPreference.bind(this);
    this.handleCancellationPolicy = this.handleCancellationPolicy.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.handleBookingCutOffTimeChange = this.handleBookingCutOffTimeChange.bind(this);
  }
  onLearnMore(e) {
    this.setState({
      isCancellationPolicyModalOpen: true,
      e
    });
  }
  onCloseModal() {
    this.setState({
      isCancellationPolicyModalOpen: false
    });
  }
  handleBookingPreference(e) {
    const {value} = e.target;
    const bookingPreferenceConstant = appConstants.bookingPreference;
    let bookingCutOffTime = this.state.bookingCutOffTime;
    if (this.props.bookingCutOffTime === null) {
      const {initalBookingCutOffTime} = bookingPreferenceConstant;
      bookingCutOffTime = (value === bookingPreferenceConstant.mode.autoAccept) ? initalBookingCutOffTime.autoAccept : initalBookingCutOffTime.manualAccept;
    }
    this.setState({
      bookingPreferences: value,
      bookingCutOffTime
    });
  }
  handleCancellationPolicy(e) {
    this.setState({cancellationPolicy: e.target.value});
  }
  onSubmitForm() {
    const {bookingPreferences, cancellationPolicy, bookingCutOffTime} = this.state;
    const notFilled = this.getNotFilled({bookingPreferences, cancellationPolicy, bookingCutOffTime});
    if (notFilled.length > 0) {
      this.setState({isNotFilledModalOpen: true, notFilled});
      return false;
    }
    return true;
  }

  handleBookingCutOffTimeChange(event) {
    const {value} = event.target;
    this.setState({
      bookingCutOffTime: (value === DROP_DOWN_OPTION_SELECT) ? null : parseInt(value, 10)
    });
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }
  getNotFilled({bookingPreferences, cancellationPolicy, bookingCutOffTime}) {
    const notFilled = [];
    const validated = validateBookingPreference({bookingPreference: bookingPreferences, cancellationPolicy, bookingCutOffTime});
    if (validated.bookingPreference === false) {
      notFilled.push(this.props.p.t('BookingPreferences.title'));
    }
    if (validated.cancellationPolicy === false) {
      notFilled.push(this.props.p.t('BookingPreferences.cancellationPolicy'));
    }
    if (validated.bookingCutOffTime === false) {
      notFilled.push(this.props.p.t('BookingPreferences.bookingCutOffTime'));
    }
    return notFilled;
  }

  renderBookingCutOffHour() {
    const {min, max} = appConstants.bookingPreference.bookingCutOffTime;
    const optionsArray = [];
    for (let index = min; index <= max; index++) {
      optionsArray.push(<option key={index} value={index}>{index}</option>);
    }
    return optionsArray;
  }

  render() {
    const {bookingPreferences, cancellationPolicy, bookingCutOffTime} = this.state;
    return (
      <div>
        <TopContent step={10}/>
        <BackButton back={REGISTRATION_ISP_BUSINESS_MODAL} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <h1 className="uk-padding-remove">{this.props.p.t('BookingPreferences.title')}</h1>
                <p>{this.props.p.t('BookingPreferences.message')}</p>
              </div>
            </div>
            <BookingPreferences bookingPreferences={bookingPreferences ? bookingPreferences : ''} onBookingfPreferenceChange={this.handleBookingPreference}/>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className="cl-sd-hour">
                  <h1 className="uk-padding-remove">{this.props.p.t('BookingPreferences.closeAthleteBookingBefore')}</h1>
                  <p>{this.props.p.t('BookingPreferences.closeAthleteBookingBeforeDesc')}</p>
                  <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <div className="field-holder">
                      <span className="addon field-required">{this.props.p.t('BookingPreferences.hours')}</span>
                      <select className="" value={bookingCutOffTime ? bookingCutOffTime : DROP_DOWN_OPTION_SELECT} onChange={this.handleBookingCutOffTimeChange}>
                        <option value={DROP_DOWN_OPTION_SELECT}>{this.props.p.t('BookingPreferences.selectHour')}</option>
                        {
                          this.renderBookingCutOffHour()
                        }
                      </select>
                      <span className="error-text">{this.props.p.t('BookingPreferences.validation_messages.bookingCutOffTime')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <h1 className="uk-padding-remove">{this.props.p.t('BookingPreferences.cancellationPolicy')}</h1>
                <p>{this.props.p.t('BookingPreferences.cancellationPolicyMessage')}:</p>
              </div>
            </div>
            <CancellationPolicies
              handleLearnMore={this.onLearnMore}
              cancellationPolicy={cancellationPolicy ? cancellationPolicy : ''}
              onCancellationPolicyChange={this.handleCancellationPolicy}
            />
            <SubmitHandler/>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2"/>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2 mnone"/>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
                <div className="nxtAlign">
                  <NextLink
                    submitForm={this.onSubmitForm}
                    saveData={this.props.saveBookingPreference}
                    data={
                      {bookingPreferences, cancellationPolicy, bookingCutOffTime}
                    }
                    saveType={appConstants.saveType.onlyProfile}
                    next={REGISTRATION_ISP_ACCOUNT_DETAILS}
                  />
                </div>
              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
                <div className="finishDivSec">
                  <FinishLaterLink/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal isModalOpen={this.state.isCancellationPolicyModalOpen} cancellationPolicy={this.state.e} handleCloseModal={this.onCloseModal}/>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveBookingPreference}
          data={
            {bookingPreferences, cancellationPolicy, bookingCutOffTime}
          }
          saveType={appConstants.saveType.onlyProfile}
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      bookingPreferences: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      cancellationPolicy: PropTypes.string,
      saveBookingPreference: PropTypes.func.isRequired,
      bookingCutOffTime: PropTypes.number
    };
  }
}
ISPRegistration10Class.defaultProps = {
  bookingPreferences: '',
  cancellationPolicy: '',
  bookingCutOffTime: null
};

const mapStateToProps = state => {
  const {payoutOption, bookingPreferences, cancellationPolicy, bookingCutOffTime} = state;
  return {
    payoutOption,
    bookingPreferences,
    cancellationPolicy,
    bookingCutOffTime
  };
};

const mapDispatchToProps = dispatch => ({
  saveBookingPreference: (data, updateType) => dispatch(saveBookingPreference(data, updateType))
});

export default connect(mapStateToProps, mapDispatchToProps)(translate(ISPRegistration10Class));


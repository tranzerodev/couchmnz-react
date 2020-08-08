import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {} from '../../../../../actions';
import appConstants from '../../../../../constants/appConstants';

import {saveBookingPreference} from '../../../../../actions';

import DashboardCancellationPolicy from './DashboardCancellationPolicy';
import DashboardSaveLink from '../DashboardSaveLink';
import {notNull} from '../../../../../validators/common/util';
import {DASHBOARD_ACCOUNT_DETAILS, DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS} from '../../../../../constants/pathConstants';
import validateBookingPreference from '../../../../../validators/ssp/isp/common/bookingPreferences';
import RequiredNotFilledModal from '../../registration/RequiredNotFilledModal';

const DROP_DOWN_OPTION_SELECT = 'DROP_DOWN_OPTION_SELECT';

class DashboardBookingPreferences extends Component {
  constructor(props) {
    super(props);
    const {bookingPreferences, cancellationPolicy, bookingCutOffTime} = props;
    let initialBookingCutOffTime = appConstants.bookingPreference.initalBookingCutOffTime.autoAccept;
    if (bookingPreferences === appConstants.bookingPreference.mode.manualAccept) {
      initialBookingCutOffTime = appConstants.bookingPreference.initalBookingCutOffTime.manualAccept;
    }
    this.state = {
      bookingPreferences,
      cancellationPolicy,
      bookingCutOffTime: (bookingCutOffTime) ? bookingCutOffTime : initialBookingCutOffTime,
      submit: false,
      notFilled: [],
      isNotFilledModalOpen: false
    };
    this.handleBookingPreference = this.handleBookingPreference.bind(this);
    this.handleCancellationPolicy = this.handleCancellationPolicy.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleBookingCutOffTimeChange = this.handleBookingCutOffTimeChange.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.handleSetBookingPreferences = this.handleSetBookingPreferences.bind(this);
    this.handleSetBookingCutOffTime = this.handleSetBookingCutOffTime.bind(this);
    this.handleSetCancellationPolicy = this.handleSetCancellationPolicy.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(preProps) {
    if (!preProps.bookingPreferences && this.props.bookingPreferences) {
      this.handleSetBookingPreferences();
    }
    if (!preProps.bookingCutOffTime && this.props.bookingCutOffTime) {
      this.handleSetBookingCutOffTime();
    }
    if (!preProps.cancellationPolicy && this.props.cancellationPolicy) {
      this.handleSetCancellationPolicy();
    }
  }

  handleSetBookingPreferences() {
    const {bookingPreferences} = this.props;
    this.setState({bookingPreferences});
  }

  handleSetBookingCutOffTime() {
    const {bookingCutOffTime} = this.props;
    this.setState({bookingCutOffTime});
  }

  handleSetCancellationPolicy() {
    const {cancellationPolicy} = this.props;
    this.setState({cancellationPolicy});
  }

  handleBookingCutOffTimeChange(event) {
    const {value} = event.target;
    this.setState({
      bookingCutOffTime: (value === DROP_DOWN_OPTION_SELECT) ? null : parseInt(value, 10)
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
    const isValidBookingPreferences = notNull(bookingPreferences);
    const isValidCancellationPolicy = notNull(cancellationPolicy);
    const isValidBookingCutOffTime = notNull(bookingCutOffTime);
    const valid = isValidBookingPreferences && isValidCancellationPolicy && isValidBookingCutOffTime;
    this.setState({submit: true});
    const notFilled = this.getNotFilled({bookingPreferences, cancellationPolicy, bookingCutOffTime});
    if (notFilled.length > 0) {
      if (this.props.profileActivationStatus) {
        return false;
      }
      this.setState({isNotFilledModalOpen: true, notFilled});
      return false;
    }
    return true;
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
    const {p, profileActivationStatus} = this.props;
    const {bookingPreferences, cancellationPolicy, bookingCutOffTime, submit} = this.state;
    const isValidBookingPreferences = notNull(bookingPreferences);
    const isValidCancellationPolicy = notNull(cancellationPolicy);
    const isValidBookingCutOffTime = notNull(bookingCutOffTime);
    const valid = isValidBookingPreferences && isValidCancellationPolicy;
    const buttonName = profileActivationStatus ? p.t('DashboardSaveLink.save') : p.t('DashboardSaveLink.save_and_continue');

    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-7-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-trainingLocationInner">
          <div className="field-holder">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <h1 className="uk-padding-remove">{p.t('BookingPreferences.title')}</h1>
                <p className="pb35">{p.t('BookingPreferences.message')}</p>
              </div>
            </div>
            <div className={(submit === true && isValidBookingPreferences === false) ? 'field-holder error' : 'field-holder'}>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
                  <div className="subcription">
                    <div className="tandc">
                      <input id="booking1" type="radio" checked={bookingPreferences === appConstants.bookingPreference.mode.autoAccept} onChange={this.handleBookingPreference} onClick={this.handleBookingPreference} value={appConstants.bookingPreference.mode.autoAccept}/>
                      <label htmlFor="booking1">{p.t('BookingPreferences.bookingPreferences.A.name')}</label>
                    </div>
                    <div className="tableDiv">
                      <div className="rCol">
                        <p>{p.t('BookingPreferences.bookingPreferences.A.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
                  <div className="subcription">
                    <div className="tandc">
                      <input id="booking2" type="radio" checked={bookingPreferences === appConstants.bookingPreference.mode.manualAccept} onChange={this.handleBookingPreference} onClick={this.handleBookingPreference} value={appConstants.bookingPreference.mode.manualAccept}/>
                      <label htmlFor="booking2">{p.t('BookingPreferences.bookingPreferences.N.name')}</label>
                    </div>
                    <div className="tableDiv">
                      <div className="rCol">
                        <p>{p.t('BookingPreferences.bookingPreferences.N.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <span className="error-text">{this.props.p.t('BookingPreferences.validation_messages.bookingPreference')}</span>
            </div>
          </div>
        </div>
        <div className="cl-sd-trainingLocationInner cl-sd-hour">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <h1 className="uk-padding-remove">{this.props.p.t('BookingPreferences.cutOffTimeForBookings')}</h1>
              <p>{this.props.p.t('BookingPreferences.closeAthleteBookingBeforeDesc')}</p>
              {/*   <p className="pb35">{p.t('BookingPreferences.bookingMessage')}</p>  */}
            </div>
            <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2  uk-width-small-1-1 ">
              <div className={(isValidBookingCutOffTime === false && submit === true) ? 'field-holder error' : 'field-holder'}>
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

        <DashboardCancellationPolicy submit={submit} isValidCancellationPolicy={isValidCancellationPolicy} cancellationPolicy={cancellationPolicy} onChangeCancellationPolicy={this.handleCancellationPolicy}/>
        <div className="uk-grid">
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1 uk-margin-top">
            <DashboardSaveLink
              saveType={appConstants.saveType.onlyProfile}
              saveData={this.props.saveBookingPreference}
              data={
                {bookingPreferences, cancellationPolicy, bookingCutOffTime}
              }
              submitForm={this.onSubmitForm}
              buttonName={buttonName}
              isNewSports={profileActivationStatus}
              next={profileActivationStatus === true ? DASHBOARD_ACCOUNT_DETAILS : DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS}
            />
          </div>
        </div>
        <br />
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
      cancellationPolicy: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      saveBookingPreference: PropTypes.func.isRequired,
      profileActivationStatus: PropTypes.bool.isRequired,
      bookingCutOffTime: PropTypes.number
    };
  }
}

DashboardBookingPreferences.defaultProps = {
  bookingPreferences: null,
  cancellationPolicy: null,
  bookingCutOffTime: null
};

const mapStateToProps = state => {
  const {bookingPreferences, cancellationPolicy, userProfiles, bookingCutOffTime} = state;
  return {
    bookingPreferences,
    cancellationPolicy,
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active,
    bookingCutOffTime
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveBookingPreference: (data, updateType) => dispatch(saveBookingPreference(data, updateType))
  };
};
const DashboardBookingPreferencesPage = translate(connect(mapStateToProps, mapDispatchToProps)(DashboardBookingPreferences));
export default DashboardBookingPreferencesPage;

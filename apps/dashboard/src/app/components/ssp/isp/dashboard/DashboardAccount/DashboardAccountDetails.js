import React, {Component} from 'react';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {PulseLoader, ClipLoader} from 'react-spinners';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {DebounceInput} from 'react-debounce-input';
import {withRouter} from 'react-router-dom';

import AutoSuggetion from '../../../../common/AutoSuggetion';
import DashboardSaveLink from '../DashboardSaveLink';
import DashboardChangePassword from '../DashboardChangePassword';
import {validateAccountDetails} from '../../../../../validators/ssp/isp/registration/accountDetails';
import appConstants from '../../../../../constants/appConstants';
import config from '../../../../../config';
import BusinessEmailVerificationModal from './BusinessEmailVerificationModal';
import EmailVerificationModal from './EmailVerificationModal';
import RequiredNotFilledModal from '../../registration/RequiredNotFilledModal';

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

import {
  clearStates,
  fetchCountries,
  fetchStates,
  fetchTimezones,
  clearCities,
  fetchCitiesByState,
  fetchCitiesCountry,
  fetchNicknames,
  saveAccountDetails,
  verifyNickname,
  verifyBusinessEmail,
  verifyEmail
} from '../../../../../actions';

import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {DASHBOARD_ACCOUNT_PAYOUT_DETAILS, DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS} from '../../../../../constants/pathConstants';
import {notNull} from '../../../../../validators/common/util';
/* Import {PropType} from 'redux-polyglot'; */

/* eslint react/no-array-index-key: 0 */

function getSuggestionValue(suggestion) {
  return suggestion;
}
function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

const renderInputComponent = inputProps =>
  (
    <DebounceInput
      {...inputProps}
      ref={null}
      debounceTimeout={300}
      inputRef={inputProps.ref}
      minLength={1}
    />
  );

class DashboardAccountDetails extends Component {
  constructor(props) {
    super(props);
    this.handleNav = this.handleNav.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSelectCountry = this.handleSelectCountry.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);

    this.handleChangeStreet = this.handleChangeStreet.bind(this);

    this.handleChangeZip = this.handleChangeZip.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeLandline = this.handleChangeLandline.bind(this);
    this.handleSelectTimezone = this.handleSelectTimezone.bind(this);

    this.fetchProps = this.fetchProps.bind(this);
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.availability = this.availability.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.getCoachlistUrl = this.getCoachlistUrl.bind(this);
    this.renderGenders = this.renderGenders.bind(this);
    this.renderNicknameAvailability = this.renderNicknameAvailability.bind(this);
    this.handleChangeFirstNameAndLastName = this.handleChangeFirstNameAndLastName.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleStateHighlighted = this.handleStateHighlighted.bind(this);
    this.handleStateSelected = this.handleStateSelected.bind(this);
    this.handleContactPreferenceChange = this.handleContactPreferenceChange.bind(this);

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCityHighlighted = this.handleCityHighlighted.bind(this);
    this.handleCitySelected = this.handleCitySelected.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleBusinessNumberChange = this.handleBusinessNumberChange.bind(this);
    this.handleBusinessEmailChange = this.handleBusinessEmailChange.bind(this);
    this.renderVerifyBusinessEmail = this.renderVerifyBusinessEmail.bind(this);
    this.handleBusinessEmailVerficationModalOpen = this.handleBusinessEmailVerficationModalOpen.bind(this);
    this.handleBusinessEmailVerficationModalClose = this.handleBusinessEmailVerficationModalClose.bind(this);
    this.renderVerifyBusinessEmailModal = this.renderVerifyBusinessEmailModal.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.renderVerifyEmail = this.renderVerifyEmail.bind(this);
    this.handleEmailVerficationModalOpen = this.handleEmailVerficationModalOpen.bind(this);
    this.handleEmailVerficationModalClose = this.handleEmailVerficationModalClose.bind(this);
    this.renderVerifyEmailModal = this.renderVerifyEmailModal.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.handleBusinessUrlBlur = this.handleBusinessUrlBlur.bind(this);
    this.handlePrimaryEmailchange = this.handlePrimaryEmailchange.bind(this);
    this.handleContactPreferenceCallChange = this.handleContactPreferenceCallChange.bind(this);
    this.handleCityTimezone = this.handleCityTimezone.bind(this);
    this.handleFindCity = this.handleFindCity.bind(this);
    this.handleSetContact = this.handleSetContact.bind(this);
    const {contact, profile, presentNickName} = this.props;
    const nickname = presentNickName.nickname;
    const email = profile.data && profile.data.profile && profile.data.profile.email ? profile.data.profile.email : '';
    if (this.props.countries.status === FULFILLED) {
      contact.countryCode = notNull(contact) && notNull(contact.countryID) ? this.props.countries.data.find(i => i.id === contact.countryID).isoCode : null;
    }
    const validation = validateAccountDetails({...contact, nickname, email, countryCode: 'US'});
    this.state = {
      availability: false,
      suggestions: this.props.nicknamesList.data,
      nickname: (nickname) ? nickname : '',
      nicknameChanged: false,
      contact,
      validation,
      submit: false,
      notFilled: [],
      isNotFilledModalOpen: false,
      isEmailVerificationModalOpen: false,
      email,
      isEmailVerified: true
    };
  }

  componentDidUpdate(preProps) {
    const {status, data} = this.props.businessEmailVerificationStatus;
    const preStatus = preProps.businessEmailVerificationStatus.status;
    const preEmailStatus = preProps.emailVerificationStatus.status;
    if (status !== preStatus) {
      const {contact} = this.state;
      const businessEmail = Object.assign({}, contact);
      if (data.email && data.email === businessEmail) {
        businessEmail.isVerified = appConstants.businessEmailVerificationStatus.verified;
        this.handleChangeContactData({businessEmail});
      }
    }
    if (preProps.countries.status === PENDING && this.props.countries.status === FULFILLED) {
      this.handleSetContact();
    }
    if (this.props.emailVerificationStatus.status !== preEmailStatus) {
      const {email} = this.state;
      if (this.props.emailVerificationStatus.data.email && this.props.emailVerificationStatus.status === FULFILLED && this.props.emailVerificationStatus.data.email === email) {
        this.setState({email, isEmailVerified: true});
      }
    }
    if (preProps.contact.cityID !== this.props.contact.cityID && this.props.cities.status === FULFILLED) {
      this.handleCityTimezone(this.props.contact.cityID);
    }
  }

  handleSetContact() {
    const {contact} = this.props;
    this.setState({contact});
  }

  onNotFilledModalClose() {
    const {email, isEmailVerified} = this.state;
    const {profile} = this.props;
    if (email !== profile.data.profile.email && isEmailVerified === false) {
      this.handleEmailVerficationModalOpen();
      return false;
    }
    this.setState({isNotFilledModalOpen: false});
  }

  getNotFilled() {
    const {p} = this.props;
    const {nickname, email, contact} = this.state;
    const validation = validateAccountDetails({...contact, email, nickname});
    const {zip, gender, mobile, countryID, street, cityName, timezone, firstName, lastName} = validation;
    const notFilled = [];
    if (zip.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.zipCode'));
    }
    if (gender.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.gender'));
    }
    if (mobile.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.mobile'));
    }
    if (countryID.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.countryID'));
    }
    // If (businessName.required === false) {
    //   notFilled.push(p.t('RequiredNotFilledModal.businessName'));
    // }
    if (street.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.street'));
    }
    if (cityName.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.cityName'));
    }
    if (timezone.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.timezone'));
    }
    if (firstName.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.firstName'));
    }
    if (lastName.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.lastName'));
    }
    if (validation.nickname.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.nickname'));
    }
    if (validation.email !== true) {
      notFilled.push(p.t('RequiredNotFilledModal.email'));
    }
    return notFilled;
  }

  handleChangeContactData(data) {
    const {contact, nickname, email} = this.state;
    const newContact = Object.assign({}, contact, data);

    const validation = validateAccountDetails({...newContact, nickname, email, countryCode: 'US'});
    this.setState({
      contact: newContact,
      validation
    });
  }

  handleChangeName(e) {
    this.handleChangeContactData({
      businessName: e.target.value
    });
  }

  handleChangeURL(e) {
    this.handleChangeContactData({
      businessUrl: e.target.value
    });
  }

  handleFocus() {
    return true;
  }

  handleSelectTimezone(e) {
    let data = {
      id: '',
      label: ''
    };
    if (e.target.value !== '') {
      data = {
        id: e.target.value,
        label: this.props.timezones.data[this.getArrayItemById(this.props.timezones.data, e.target.value)].label
      };
    }

    this.handleChangeContactData({
      timezone: data
    });
  }

  handleChangeStreet(e) {
    this.handleChangeContactData({
      street: e.target.value
    });
  }

  handleChangeZip(e) {
    this.handleChangeContactData({
      zip: e.target.value
    });
  }

  handleChangeMobile(e) {
    const {value} = e.target;
    this.handleChangeContactData({
      mobile: value
    });
  }

  handleChangeLandline(e) {
    this.handleChangeContactData({
      landline: e.target.value
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.countries.status !== FULFILLED && this.props.countries.status !== PENDING) {
      this.props.fetchCountries();
    }
    if (this.props.timezones.status !== FULFILLED && this.props.timezones.status !== PENDING && this.props.timezones.status !== REJECTED) {
      this.props.fetchTimezones()
    }
    this.fetchProps(this.props);
    if (this.props.profile.status === FULFILLED && this.props.nicknamesList.status !== FULFILLED) {
      this.props.fetchNicknames({userID: this.props.profile.data.profile.id});
    }
    this.availability(this.props);
    const {firstName, lastName} = this.props.profile.data.profile;
    this.props.updateContact({
      firstName, lastName
    });
  }
  componentWillReceiveProps(nextProps) {
    this.fetchProps(nextProps);
    const {emailVerificationStatus} = nextProps;
    if (this.props.emailVerificationStatus.verifyEmailstatus === PENDING && emailVerificationStatus.verifyEmailstatus === FULFILLED) {
      this.handleEmailVerficationModalOpen();
    }
    if ( nextProps.contact.countryCode && this.props.timezones.data.length >= 420  ) {
        this.props.fetchTimezones(`?countryCode=${nextProps.contact.countryCode}`)
    }
  }
  fetchProps(nextProps) {
    if (nextProps.contact.countryID && nextProps.states.status !== FULFILLED && nextProps.states.status !== PENDING && nextProps.states.status !== REJECTED) {
      this.props.fetchStates({countryID: nextProps.contact.countryID});
    }
    if (nextProps.contact.stateID) {
      if (nextProps.cities.status !== FULFILLED && nextProps.cities.status !== PENDING && nextProps.states.status !== REJECTED) {
        this.props.fetchCitiesByState({id: nextProps.contact.stateID});
      }
    } else if (nextProps.contact.countryID) {
      if (nextProps.cities.status !== FULFILLED && nextProps.cities.status !== PENDING && nextProps.states.status !== REJECTED) {
        this.props.fetchCitiesCountry({id: nextProps.contact.countryID});
      }
    }
    if (nextProps.profile.status === FULFILLED) {
      if (!this.state.nicknameSet && nextProps.listing && nextProps.listing.nickname) {
        this.setState({nickname: nextProps.listing.nickname, nicknameSet: true});
      }
      if (nextProps.nicknamesList.status !== FULFILLED && nextProps.nicknamesList.status !== PENDING) {
        nextProps.fetchNicknames({userID: nextProps.profile.data.profile.id});
      }
      if (nextProps.nicknamesList.status === FULFILLED) {
        this.setState({suggestions: nextProps.nicknamesList.data});
      }
    }
    this.availability(nextProps);
  }
  handleCountrySearch(countries, id) {
    return countries.findIndex(country => country.id === id);
  }
  getArrayItemById(states, id) {
    return states.findIndex(state => state.id === id);
  }
  handleCitySearch(cities, id) {
    return cities.findIndex(city => city.id === id);
  }
  handleNav() {
    this.props.history.push('reg12');
  }
  handleBack() {
    this.props.history.push('reg10');
  }
  handleSearchPhone(phones, type) {
    return phones.findIndex(phone => phone.type === type);
  }
  handleSelectCountry(e) {
    let data = {
      countryID: '',
      countryName: ''
    };
    if (e.target.value !== '') {
      data = {
        countryID: e.target.value,
        countryName: this.props.countries.data[this.handleCountrySearch(this.props.countries.data, e.target.value)].isoCode,
        stateID: null,
        stateName: '',
        cityID: null,
        cityName: '',
        timezone: {
          id: null
        },
        mobile: '',
        landline: ''
      };
      this.props.fetchTimezones(`?countryCode=${this.props.countries.data[this.handleCountrySearch(this.props.countries.data, e.target.value)].isoCode}`)      
      this.props.clearStates();
      this.props.fetchStates({countryID: e.target.value});
    }
    this.handleChangeContactData(data);
  }
  /* eslint complexity:0 */

  handleSuggestionsFetchRequested = () => {
    this.setState({
      suggestions: this.props.nicknamesList.data
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: this.props.nicknamesList.data
    });
  };

  availability(nextProp) {
    if (nextProp.nickname.status === FULFILLED) {
      if (nextProp.nickname.data.available === appConstants.nicknameAvailabilityFlags.available && nextProp.nickname.data.nickname === this.state.nickname && this.state.availability === false) {
        this.setState({availability: true, coachlistURL: config.profileBaseUrl + this.props.listing.nickname});
      } else if (nextProp.nickname.data.available === appConstants.nicknameAvailabilityFlags.notAvailable && nextProp.nickname.data.nickname === this.state.nickname) {
        this.setState({availability: false});
      }
    }
  }
  getCoachlistUrl() {
    if (this.props.profile.data && this.props.profile.data.profile && this.props.profile.data.profile.url) {
      return this.props.profile.data.profile.url + '/' + this.state.nickname;
    }
    return '';
  }

  handleNicknameChange(e, {newValue}) {
    const {contact, email} = this.state;
    const nickname = newValue.trim();
    const validation = validateAccountDetails({...contact, nickname, email, countryCode: 'US'});
    let availability = false;
    if (validation.nickname.required === true && validation.nickname.valid === true) {
      const {presentNickName} = this.props;
      const presentNickname = presentNickName.nickname;
      if (presentNickname && presentNickname === nickname) {
        availability = true;
      } else {
        this.props.verifyNickname(nickname);
      }
    }

    this.setState({
      nickname,
      availability,
      nicknameChanged: true,
      validation
    });
  }

  handleStateChange(e, {newValue}) {
    this.handleChangeContactData({
      stateID: null,
      stateName: newValue
    });
  }

  handleStateSelected(event, {suggestion}) {
    this.handleStateHighlighted({suggestion});
  }

  handleStateHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.handleChangeContactData({
        stateID: id,
        stateName: name,
        cityID: null,
        cityName: ''
      });
      this.props.clearCities();
      this.props.fetchCitiesByState({id});
    }
  }

  handleCityChange(e, {newValue}) {
    this.handleChangeContactData({
      cityID: null,
      cityName: newValue,
      timezone: {
        id: null
      }
    });
  }

  handleCityTimezone(id) {
    const city = this.handleFindCity(id);
    this.handleChangeContactData({
      timezone: {
        id: city && city.timezoneId ? city.timezoneId : null
      }
    });
  }

  handleCitySelected(event, {suggestion}) {
    const {id, name} = suggestion;
    const city = this.handleFindCity(id);
    this.handleChangeContactData({
      cityID: id,
      cityName: name,
      timezone: {
        id: city && city.timezoneId ? city.timezoneId : null
      }
    });
  }

  handleFindCity(id) {
    return this.props.cities.data.find(e => e.id === id);
  }

  handleCityHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      const city = this.handleFindCity(id);
      this.handleChangeContactData({
        cityID: id,
        cityName: name,
        timezone: {
          id: city && city.timezoneId ? city.timezoneId : null
        }
      });
    }
  }

  handleGenderChange(event) {
    const {value} = event.target;
    this.handleChangeContactData({
      gender: value
    });
  }

  handleBusinessNumberChange(e) {
    const {contact} = this.props;
    const businessNumber = Object.assign({}, contact.businessNumber, {number: e.target.value});
    this.handleChangeContactData({
      businessNumber
    });
  }

  handleBusinessEmailChange(e) {
    const {contact, businessEmailVerificationStatus} = this.props;
    const {email} = businessEmailVerificationStatus.data;
    const {verified, notVerified} = appConstants.businessEmailVerificationStatus;
    const newEmail = e.target.value;
    const businessEmail = Object.assign({}, contact.businessEmail, {email: newEmail});
    if (businessEmail.email === e.target.value) {
      businessEmail.isVerified = email && email === newEmail ? verified : businessEmail.isVerified;
    } else {
      businessEmail.isVerified = email && email === newEmail ? verified : notVerified;
    }
    this.handleChangeContactData({businessEmail});
  }
  handlePrimaryEmailchange() {
    const {email, nickname, contact, isEmailVerified} = this.state;
    const {profile, profileId} = this.props;
    const validation = validateAccountDetails({...contact, nickname, email});
    this.setState({submit: true});
    if (email !== profile.data.profile.email && isEmailVerified === false && validation.email) {
      this.props.verifyEmail({profileId}, {email});
    }
  }
  handleEmailChange(e) {
    const {emailVerificationStatus} = this.props;
    const {email} = emailVerificationStatus.data;
    const {verified, notVerified} = appConstants.businessEmailVerificationStatus;
    const newEmail = e.target.value;
    const {contact, nickname} = this.state;
    const newContact = Object.assign({}, contact);
    const validation = validateAccountDetails({...newContact, nickname, email: newEmail, countryCode: 'US'});
    const emailObject = Object.assign({}, {email: newEmail});
    if (emailObject.email === e.target.value) {
      emailObject.isVerified = email && email === newEmail ? verified : emailObject.isVerified;
    } else {
      emailObject.isVerified = email && email === newEmail ? verified : notVerified;
    }
    this.setState({email: emailObject.email, validation, isEmailVerified: false});
  }
  handleChangeFirstNameAndLastName(event) {
    const {name, value} = event.target;
    this.handleChangeContactData({
      [name]: value
    });
  }

  handleContinue() {
    this.props.history.push(DASHBOARD_ACCOUNT_PAYOUT_DETAILS);
  }

  handleBusinessEmailVerficationModalOpen() {
    const {profileId} = this.props;
    const {businessEmail} = this.state.contact;
    this.props.verifyBusinessEmail({profileId}, {email: businessEmail.email});
    this.setState({isBusinessEmailVerificationModalOpen: true});
  }
  handleEmailVerficationModalOpen() {
    this.setState({isEmailVerificationModalOpen: true});
  }
  handleContactPreferenceChange(e) {
    let {contactPreferences} = Object.assign({}, this.state.contact);
    if (e.target.checked === true) {
      contactPreferences = Object.assign({}, contactPreferences, {canSendReminder: appConstants.contactPreferences.smsFlags.yes});
    } else {
      contactPreferences = Object.assign({}, contactPreferences, {canSendReminder: appConstants.contactPreferences.smsFlags.no});
    }
    this.handleChangeContactData({contactPreferences});
  }

  handleContactPreferenceCallChange(e) {
    let {contactPreferences} = Object.assign({}, this.state.contact);
    if (e.target.checked === true) {
      contactPreferences = Object.assign({}, contactPreferences, {canReceiveMarketingCall: appConstants.contactPreferences.smsFlags.yes});
    } else {
      contactPreferences = Object.assign({}, contactPreferences, {canReceiveMarketingCall: appConstants.contactPreferences.smsFlags.no});
    }
    this.handleChangeContactData({contactPreferences});
  }

  handleBusinessEmailVerficationModalClose() {
    this.setState({isBusinessEmailVerificationModalOpen: false});
  }
  handleEmailVerficationModalClose() {
    this.setState({isEmailVerificationModalOpen: false});
  }
  renderNicknameAvailability() {
    const {nickname, p} = this.props;
    const {validation, nicknameChanged, availability} = this.state;

    if (nickname.status !== PENDING && nickname.status !== null && validation.nickname && validation.nickname.valid === true && nicknameChanged) {
      if (availability) {
        return (
          <span className="cl-sd-available">{p.t('SSPProfileListing.available')}</span>
        );
      }
      return (
        <span/>
      );
    }
  }

  renderGenders(gender, index) {
    const {p} = this.props;
    const {contact} = this.state;
    const id = `gen${index}`;
    return (
      <span key={index}>
        <input id={id} type="radio" name="gender" value={gender.value} onChange={this.handleGenderChange} checked={gender.value === contact.gender}/>
        <label htmlFor={id}>{p.t(gender.displayName)}</label>
        <span className="w50"/>
      </span>
    );
  }

  onSubmitForm() {
    this.setState({submit: true});
    const {availability, email, isEmailVerified, contact, nickname} = this.state;
    const validation = validateAccountDetails({...contact, nickname, email});
    const {profile, profileId} = this.props;
    if (validation.valid) {
      const notFilled = this.getNotFilled();
      if (notFilled.length > 0) {
        if (this.props.profileActivationStatus) {
          return false;
        }
        if (email !== profile.data.profile.email && isEmailVerified === false && validation.email) {
          this.props.verifyEmail({profileId}, {email});
          return false;
        }
        this.setState({notFilled, isNotFilledModalOpen: true});
        return false;
      }
      if (email !== profile.data.profile.email && isEmailVerified === false && validation.email) {
        this.props.verifyEmail({profileId}, {email});
        return false;
      }
      return validation.valid && validation.required && availability;
    }
    return false;
  }

  handleBusinessUrlBlur(e) {
    let businessUrl = e.target.value;
    if (businessUrl.trim() !== '' && !businessUrl.match(appConstants.regularExp.urlProtocol)) {
      businessUrl = appConstants.url.prtocol + businessUrl;
    }
    this.handleChangeContactData({
      businessUrl
    });
  }

  renderVerifyBusinessEmail() {
    const {p, contact} = this.props;
    const {businessEmail} = contact;

    if (businessEmail.isVerified !== appConstants.businessEmailVerificationStatus.verified) {
      return (
        <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-5-10 uk-text-right">
          <a onClick={this.handleBusinessEmailVerficationModalOpen} className="cl-sd-verifyLink">{p.t('DashboardAccountDetails.verify_now')}</a>
        </div>
      );
    }
  }

  renderVerifyBusinessEmailModal() {
    const {isEmailVerificationModalOpen, contact} = this.state;
    const {businessEmail} = contact;
    if (isEmailVerificationModalOpen) {
      return (
        <BusinessEmailVerificationModal
          isModalOpen={isEmailVerificationModalOpen}
          email={businessEmail.email}
          onClose={this.handleBusinessEmailVerficationModalClose}
        />
      );
    }
  }

  renderVerifyEmail() {
    const {p, profile} = this.props;
    const {email} = profile.data.profile;

    if (email.isVerified !== appConstants.businessEmailVerificationStatus.verified) {
      return (
        <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-5-10 uk-text-right">
          <a onClick={this.handleEmailVerficationModalOpen} className="cl-sd-verifyLink">{p.t('DashboardAccountDetails.verify_now')}</a>
        </div>
      );
    }
  }

  renderVerifyEmailModal() {
    const {isEmailVerificationModalOpen, email} = this.state;
    const {profile} = this.props;
    if (isEmailVerificationModalOpen) {
      return (
        <EmailVerificationModal
          isModalOpen={isEmailVerificationModalOpen}
          email={profile.data.profile.email}
          email2={email}
          onClose={this.handleEmailVerficationModalClose}
        />
      );
    }
  }

  render() {
    const {p, profileActivationStatus, emailVerificationStatus} = this.props;
    const {contact, submit, nickname, email, isEmailVerified} = this.state;
    const inputProps = {
      value: this.state.nickname,
      onChange: this.handleNicknameChange,
      placeholder: p.t('SSPProfileListing.nick_name_placeholder')
    };
    const {stateName, cityName, contactPreferences} = contact;
    const stateAutoSuggestInputProps = {
      value: (stateName) ? stateName : '',
      onChange: this.handleStateChange,
      placeholder: p.t('AccountDetails.statePlaceholder')
    };
    const cityAutoSuggestInputProps = {
      value: (cityName) ? cityName : '',
      onChange: this.handleCityChange,
      placeholder: p.t('AccountDetails.cityPlaceholder'),
      className: 'uk-form-controls field-required'
    };
    const coachlistURL = this.getCoachlistUrl();

    const buttonName = profileActivationStatus ? p.t('DashboardSaveLink.save') : p.t('DashboardSaveLink.save_and_continue');

    const emailAlreadyExists = Boolean(emailVerificationStatus.verifyEmailstatus === REJECTED && emailVerificationStatus.verificationStatusCode === appConstants.emailVerificationStatusCode.emailExists);

    const country = this.props.countries.data.find(i => i.id === contact.countryID);
    if (notNull(country)) {
      contact.countryCode = country.isoCode;
    }
    const emailVerifyLoading = Boolean(emailVerificationStatus.verifyEmailstatus === PENDING);
    const number = notNull(contact.mobile) && contact.mobile.length > 1 ? phoneUtil.parseAndKeepRawInput(contact.mobile, notNull(contact.countryCode) ? contact.countryCode : 'US') : null;
    const defaultNumber = phoneUtil.parseAndKeepRawInput(appConstants.defaultPhone, notNull(contact.countryCode) ? contact.countryCode : 'US');
    const mobile = notNull(number) ? phoneUtil.format(number, PNF.INTERNATIONAL) : '';
    contact.formattedMobile = notNull(mobile) ? mobile.substr(mobile.indexOf(' ') + 1) : '';
    const countryCode = notNull(number) ? number.getCountryCode() : defaultNumber.getCountryCode();
    const number2 = notNull(contact.landline) && contact.landline.length > 1 ? phoneUtil.parseAndKeepRawInput(contact.landline, notNull(contact.countryCode) ? contact.countryCode : 'US') : null;
    const landline = notNull(number2) ? phoneUtil.format(number2, PNF.INTERNATIONAL) : '';
    contact.formattedLandline = notNull(landline) ? landline.substr(landline.indexOf(' ') + 1) : '';
    const validation = validateAccountDetails({...contact, nickname, email, formattedLandline: contact.formattedLandline, formattedMobile: contact.formattedMobile});
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-trainingLocationInner">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="accDetails">
                <h1 className="uk-padding-remove">{p.t('DashboardAccountDetails.businessInfo')}</h1>
                <p className="mb25">{p.t('DashboardAccountDetails.manageBusinessDetails')}</p>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className="uk-grid">
                      <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-5-10">
                        <label>{p.t('DashboardAccountDetails.email_address')}</label>
                      </div>
                      <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-5-10 uk-text-right">
                        {
                          isEmailVerified ? (
                            <p className="cl-sd-verified">
                              <svg className="cl-icon-verified" xmlns="http://www.w3.org/2000/svg" viewBox="-7044 -1120 20 20.001">
                                <g transform="translate(-7044 -1120)">
                                  <g data-name="Group 260" transform="translate(0 0)">
                                    <path className="cl-icon-verified-1" d="M10,0,7.775,1.7,5,1.338,3.924,3.925,1.338,5,1.7,7.775,0,10l1.7,2.226L1.338,15l2.586,1.074L5,18.661l2.777-.36L10,20l2.225-1.7,2.775.36,1.074-2.586L18.662,15l-.36-2.777L20,10,18.3,7.775,18.662,5,16.076,3.925,15,1.338l-2.777.36Z" transform="translate(0 0)"/>
                                    <path className="cl-icon-verified-2" d="M6.286,10.714l2.857,2.857,5.714-5.714" transform="translate(-0.571 -0.714)"/>
                                  </g>
                                </g>
                              </svg>
                              {p.t('DashboardAccountDetails.verified')}
                            </p>) : null
                        }
                      </div>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-2 uk-width-small-1-1 "/>
                  <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={((validation.email === false || emailAlreadyExists === true) && submit === true) ? 'field-holder error' : 'field-holder'}>
                      <input disabled={profileActivationStatus === false} type="email" value={email} name="" placeholder="barryjohnson@gmail.com" className=" field-required" onChange={this.handleEmailChange}/>
                      <span className="error-text">{(emailAlreadyExists === true) ? p.t('DashboardAccountDetails.emailAlreadyExists', {email: emailVerificationStatus.verifyEmail}) : p.t('SSPProfileListing.validation_messages.email')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                    {profileActivationStatus && (
                      <div className="cl-sd-changeOuter">
                        <a className="cancel" data-uk-modal onClick={this.handlePrimaryEmailchange}>{p.t('DashboardAccountDetails.change')}</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                    <label>{p.t('SSPProfileListing.nickname')}</label>
                    <p>{p.t('SSPProfileListing.nickName_message')}</p>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={(validation.nickname.valid === false) && submit ? 'field-holder error' : 'field-holder'}>
                      <Autosuggest
                        suggestions={this.state.suggestions}
                        getSuggestionValue={getSuggestionValue}
                        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                        renderSuggestion={renderSuggestion}
                        renderInputComponent={renderInputComponent}
                        inputProps={inputProps}
                        shouldRenderSuggestions={this.handleFocus}
                      />
                      <span className="error-text">{validation.nickname.required === false ? p.t('SSPProfileListing.validation_messages.nickName.required') : p.t('SSPProfileListing.validation_messages.nickName.valid')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className="loader loader-field">
                      {this.props.nickname.status === PENDING &&
                      <div className="cl-loader">
                        <PulseLoader loading={this.props.nickname.status === PENDING} size={7}/>
                      </div> }
                      {
                        this.renderNicknameAvailability()
                      }
                    </div>
                  </div>
                </div> */}

                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                    <label>{p.t('SSPProfileListing.nickname')}</label>
                    <p>{p.t('SSPProfileListing.nickName_message')}</p>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className="loader loader-field">
                      {this.props.nickname.status === PENDING &&
                      <div className="cl-loader">
                        <PulseLoader loading={this.props.nickname.status === PENDING} size={7}/>
                      </div> }
                    </div>
                    <div className={(validation.nickname.valid === false) && submit ? 'field-holder error cl-sd-email-available' : 'field-holder cl-sd-email-available'}>
                      <Autosuggest
                        suggestions={this.state.suggestions}
                        getSuggestionValue={getSuggestionValue}
                        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                        renderSuggestion={renderSuggestion}
                        renderInputComponent={renderInputComponent}
                        inputProps={inputProps}
                        shouldRenderSuggestions={this.handleFocus}
                      />
                      {
                        this.renderNicknameAvailability()
                      }
                      <span className="error-text">{validation.nickname.required === false ? p.t('SSPProfileListing.validation_messages.nickName.required') : p.t('SSPProfileListing.validation_messages.nickName.valid')}</span>
                    </div>
                  </div>
                </div>

                <div className="uk-grid">
                  <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <label>{p.t('SSPProfileListing.coachlistURL')}</label>
                    <a href={coachlistURL} target="_blank" className="link">{coachlistURL}</a>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={validation.firstName.required === false && submit ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('AccountDetails.firstName')}</label>
                      <input type="text" name="firstName" className="uk-form-controls field-required" placeholder={p.t('AccountDetails.firstNamePlaceholder')} value={contact.firstName} onChange={this.handleChangeFirstNameAndLastName}/>
                      <span className="error-text">{p.t('AccountDetails.validation_messages.firstName')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={validation.lastName.required === false && submit ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('AccountDetails.lastName')}</label>
                      <input type="text" name="lastName" className="uk-form-controls field-required" placeholder={p.t('AccountDetails.lastNamePlaceholder')} value={contact.lastName} onChange={this.handleChangeFirstNameAndLastName}/>
                      <span className="error-text">{p.t('AccountDetails.validation_messages.lastName')}</span>
                    </div>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                    <h6>{p.t('AccountDetails.gender')}</h6>
                    <div className={validation.gender.required === false && submit ? 'field-holder error' : 'field-holder'}>

                      <div className="tandc">
                        {
                          config.genders.map(this.renderGenders)
                        }
                        <span className="error-text">{p.t('AccountDetails.validation_messages.gender')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className="field-holder">
                      <label>{p.t('AccountDetails.businessName')}</label>
                      <input type="text" name onChange={this.handleChangeName} className="uk-form-controls" placeholder={p.t('AccountDetails.businessNameExample')} value={contact.businessName}/>
                      <span className="error-text">{p.t('AccountDetails.validation_messages.businessName')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={validation.businessUrl === false && submit ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('DashboardAccountDetails.businessWebsite')}</label>
                      <input type="text" name onChange={this.handleChangeURL} onBlur={this.handleBusinessUrlBlur} className="uk-form-controls" placeholder="https://www.coachlist.com/" value={contact.businessUrl}/>
                      <span className="error-text">{p.t('AccountDetails.validation_messages.businessUrl')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="accDetails">
                <h1 className="uk-padding-remove">Address</h1>
                <p className="mb25">Enter your business address below</p>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={validation.countryID.required === false && submit ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('AccountDetails.country')}</label>
                      <select className="uk-form-controls field-required" onChange={this.handleSelectCountry} value={contact.countryID}>
                        <option value="">{p.t('AccountDetails.select_country')}</option>
                        {
                          this.props.countries.data.map((country, i) => <option key={i} value={country.id}>{country.name}</option>)
                        }
                      </select>
                      <span className="error-text">{p.t('AccountDetails.validation_messages.countryID')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className="field-holder">
                      <label>{p.t('AccountDetails.state')}</label>

                      <div className="uk-autocomplete cl-sd-degreeDropdownhead">
                        <AutoSuggetion
                          list={this.props.states.data}
                          inputProps={stateAutoSuggestInputProps}
                          onSelectSuggetion={this.handleStateSelected}
                          onSuggestionHighlighted={this.handleStateHighlighted}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={validation.cityName.required === false && submit ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('AccountDetails.city')}</label>
                      <div className="uk-autocomplete cl-sd-degreeDropdownhead">
                        <AutoSuggetion
                          list={this.props.cities.data}
                          inputProps={cityAutoSuggestInputProps}
                          onSelectSuggetion={this.handleCitySelected}
                          onSuggestionHighlighted={this.handleCityHighlighted}
                        />
                      </div>
                      <span className="error-text">{p.t('AccountDetails.validation_messages.cityName')}</span>
                    </div>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={validation.street.required === false && submit ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('AccountDetails.streetAddress')}</label>
                      <input type="text" name className="uk-form-controls field-required" placeholder={p.t('AccountDetails.streetAddressExample')} onChange={this.handleChangeStreet} value={contact.street}/>
                      <span className="error-text">{p.t('AccountDetails.validation_messages.street')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={(validation.zip.required === false || validation.zip.valid === false || validation.zip.maxLength === false) && submit ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('AccountDetails.zipCode')}</label>
                      <input type="text" name className="uk-form-controls field-required" placeholder={p.t('AccountDetails.zipCodeExample')} onChange={this.handleChangeZip} value={contact.zip}/>
                      <span className="error-text">{validation.zip.required === false ? p.t('AccountDetails.validation_messages.zip.required') : validation.zip.valid === false ? p.t('AccountDetails.validation_messages.zip.valid') : p.t('AccountDetails.validation_messages.zip.maxLength')}</span>
                    </div>

                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                    <label>{p.t('AccountDetails.timezone')}</label>
                  </div>
                  <div className={validation.timezone.required === false && submit ? 'field-holder error' : 'field-holder'}>
                    <select className="field-required" onChange={this.handleSelectTimezone}>
                      <option value="">
                      {contact && contact.timezone && contact.timezone.label? 
                      contact.timezone.label : p.t('AccountDetails.select_timezone')}
                      </option>
                      {this.props.timezones && 
                        this.props.timezones.data.map((timezone, i) => {
                          const option = contact.timezone && contact.timezone.id === timezone.id ? <option key={i} selected value={timezone.id}>{timezone.label}</option> : <option key={i} value={timezone.id}>{timezone.label}</option>;
                          return option;
                        })
                      }
                    </select>
                    <span className="error-text">{p.t('AccountDetails.validation_messages.timezone')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="accDetails">
                <h1 className="uk-padding-remove">{p.t('DashboardAccountDetails.phone_numbers')}</h1>
                <p className="mb25">{p.t('DashboardAccountDetails.phone_desc')}</p>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={(validation.mobile.required === false || validation.mobile.valid === false) && submit ? 'field-holder error' : 'field-holder'}>
                      <div className="tableDivSec">
                        <div className="lCol">
                          <label>{p.t('AccountDetails.mobile')}</label>
                        </div>
                      </div>
                      <div className="cl-sd-preset">
                        <input type="text" name="mobile" className="uk-form-controls field-required" placeholder={p.t('AccountDetails.mobileExample')} onChange={this.handleChangeMobile} value={contact.formattedMobile ? contact.formattedMobile : contact.mobile}/>
                        <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                      </div>
                      <span className="error-text">{validation.mobile.required === false ? p.t('AccountDetails.validation_messages.mobile.required') : p.t('AccountDetails.validation_messages.mobile.valid')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                    <div className={(validation.landline.required === false || validation.landline.valid === false) && submit ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('DashboardAccountDetails.business_number')}</label>
                      <div className="cl-sd-preset">
                        <input type="text" name="landline" className="uk-form-controls" placeholder={p.t('AccountDetails.landlineExample')} onChange={this.handleChangeLandline} value={contact.formattedLandline ? contact.formattedLandline : contact.landline}/>
                        <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                      </div>

                      <span className="error-text">{validation.landline.required === false ? p.t('AccountDetails.validation_messages.landline.required') : p.t('AccountDetails.validation_messages.landline.valid')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                    <div className="field-holder mb10">
                      <div className="allowOuter">
                        <input
                          checked={contactPreferences.canSendReminder === appConstants.contactPreferences.smsFlags.yes}
                          onChange={this.handleContactPreferenceChange}
                          type="checkbox"
                          name=""
                          id="allow1"
                        />
                        <label htmlFor="allow1"><span>{p.t('AccountDetails.canSendReminder')}</span></label>
                      </div>
                    </div>
                    <div className="field-holder">
                      <div className="allowOuter">
                        <input
                          checked={contactPreferences.canReceiveMarketingCall === appConstants.contactPreferences.smsFlags.yes}
                          onChange={this.handleContactPreferenceCallChange}
                          type="checkbox"
                          name=""
                          id="allow2"
                        />
                        <label htmlFor="allow2"><span>{p.t('AccountDetails.canReceiveMarketingCall')}</span></label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1">
              <DashboardSaveLink
                saveType={appConstants.saveType.onlyProfile}
                data={{contact, nickname}}
                saveData={this.props.saveAccountDetails}
                submitForm={this.onSubmitForm}
                buttonName={buttonName}
                isNewSports={profileActivationStatus}
                next={profileActivationStatus == true ? DASHBOARD_ACCOUNT_PAYOUT_DETAILS : DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS}
              />
            </div>
          </div>
        </div>

        {profileActivationStatus === true &&
        <DashboardChangePassword/> }
        {/* <DashboardAccountDeactivate/> */}
        {/* {this.renderVerifyBusinessEmailModal()} */}
        {this.renderVerifyEmailModal()}
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveAccountDetails}
          data={{contact, nickname}}
          saveType={appConstants.saveType.onlyProfile}
        />

        <div className={emailVerifyLoading ? 'overlayLoader' : ''}>
          <ClipLoader loading={emailVerifyLoading} size={30}/>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchCitiesCountry: PropTypes.func.isRequired,
      presentNickName: PropTypes.object.isRequired,
      nicknamesList: PropTypes.object,
      nickname: PropTypes.object,
      listing: PropTypes.object,
      profile: PropTypes.object.isRequired,
      contact: PropTypes.object.isRequired,
      saveAccountDetails: PropTypes.func.isRequired,
      fetchNicknames: PropTypes.func.isRequired,
      verifyNickname: PropTypes.func.isRequired,
      profileActivationStatus: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired,
      countries: PropTypes.object.isRequired,
      businessEmailVerificationStatus: PropTypes.object.isRequired,
      profileId: PropTypes.string.isRequired,
      verifyBusinessEmail: PropTypes.func.isRequired,
      verifyEmail: PropTypes.func.isRequired
    };
  }
}
/* eslint react/no-array-index-key: 0 */

DashboardAccountDetails.defaultProps = {
  history: {},
  countries: {},
  states: {},
  clearStates: () => {},
  updateContact: () => {},
  updatePhones: () => {},
  fetchCountries: () => {},
  fetchStates: () => {},
  contact: {},
  addPhone: () => {},
  timezones: {data: [], status: null},
  cities: {data: [], status: null},
  nicknamesList: {status: null, data: []},
  nickname: {status: null, data: {}},
  listing: {}
};

const mapStateToProps = state => {
  const {countries, states, contact, timezones, cities, listing, nicknamesList, nickname, presentNickName, profile, userProfiles,
    businessEmailVerificationStatus, emailVerificationStatus} = state;
  return {
    countries,
    states,
    contact,
    timezones,
    cities,
    listing,
    nicknamesList,
    nickname,
    presentNickName,
    profile,
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active,
    profileId: userProfiles.selectedProfile.id,
    businessEmailVerificationStatus,
    emailVerificationStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearStates: () => dispatch(clearStates()),
    saveAccountDetails: (accountDetailsData, updateType) => dispatch(saveAccountDetails(accountDetailsData, updateType)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: country => dispatch(fetchStates(country)),
    fetchTimezones: params => dispatch(fetchTimezones(params)),
    clearCities: () => dispatch(clearCities()),
    fetchCitiesByState: params => dispatch(fetchCitiesByState(params)),
    fetchCitiesCountry: params => dispatch(fetchCitiesCountry(params)),
    fetchNicknames: params => dispatch(fetchNicknames(params)),
    verifyNickname: nickname => dispatch(verifyNickname(nickname)),
    verifyBusinessEmail: (params, data) => dispatch(verifyBusinessEmail(params, data)),
    verifyEmail: (params, data) => dispatch(verifyEmail(params, data))
  };
};
export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(DashboardAccountDetails)));
/* eslint react/no-deprecated: 0 */

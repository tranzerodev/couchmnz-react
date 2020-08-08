import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import {fetchCountries, fetchTimezones, fetchStates, clearCities, fetchCitiesByState, fetchCitiesCountry, saveParentAccount, fetchParentAccount, verifyParentEmail} from '../../../../../actions';
import {DASHBOARD} from '../../../../../constants/pathConstants';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {validateAccount} from '../../../../../validators/parent/common/account';
import AutoSuggetion from '../../../../common/AutoSuggetion/AutoSuggetion';
import appConstants from '../../../../../constants/appConstants';
import config from '../../../../../config';
import NextLink from '../../../common/NextLink';
import {withRouter} from 'react-router-dom';
import {notNull} from '../../../../../validators/common/util';
import EmailVerificationModal from '../../../../common/ParentEmailVerificationModal';

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

/* eslint complexity: 0 */
class Account extends Component {
  constructor(props) {
    super(props);
    const {account} = props;
    this.state = {
      account: account.status === FULFILLED ? account.data : {
        firstName: null,
        lastName: null,
        gender: null,
        country: {
          id: null,
          name: null
        },
        state: {
          id: null,
          name: null
        },
        city: {
          id: null,
          name: null
        },
        address: null,
        zipCode: null,
        timezone: {
          id: null,
          name: null
        },
        mobile: null,
        landLine: null,
        email: null,
        canSendReminder: appConstants.no,
        canReceiveMarketingCall: appConstants.yes
      },
      validation: validateAccount(account),
      isEmailVerified: true,
      isEmailVerificationModalOpen: false,
      submitted: false
    };
    this.handleUpdateAccount = this.handleUpdateAccount.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleStateHighlighted = this.handleStateHighlighted.bind(this);
    this.handleStateSelected = this.handleStateSelected.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCityHighlighted = this.handleCityHighlighted.bind(this);
    this.handleCitySelected = this.handleCitySelected.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleZipCode = this.handleZipCode.bind(this);
    this.handleTimezone = this.handleTimezone.bind(this);
    this.handleMobile = this.handleMobile.bind(this);
    this.handleLandLine = this.handleLandLine.bind(this);
    this.handleCanSendReminder = this.handleCanSendReminder.bind(this);
    this.handleCanReceiveMarketingCall = this.handleCanReceiveMarketingCall.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderGender = this.renderGender.bind(this);
    this.setEmailStatus = this.setEmailStatus.bind(this);
    this.handleEmailVerficationModalOpen = this.handleEmailVerficationModalOpen.bind(this);
    this.handleEmailVerficationModalClose = this.handleEmailVerficationModalClose.bind(this);
    this.handlePrimaryEmailchange = this.handlePrimaryEmailchange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFindCity = this.handleFindCity.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.countries.status !== FULFILLED && this.props.countries.status !== PENDING) {
      this.props.fetchCountries();
    }
    if (this.props.timezones.status !== FULFILLED && this.props.timezones.status !== PENDING && this.props.timezones.status !== REJECTED) {
      this.props.fetchTimezones();
    }
    if (this.props.account.status !== FULFILLED && this.props.account.status !== PENDING) {
      this.props.fetchParentAccount();
    }
    if (this.props.account.status === FULFILLED) {
      const {account} = this.props;
      if (notNull(account.data.country) && notNull(account.data.country.id)) {
        this.props.fetchStates({countryID: account.data.country.id});
        this.props.fetchCitiesCountry({id: account.data.country.id});
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.account.status === PENDING &&
          nextProps.account.status === FULFILLED) {
      const {account} = nextProps;
      this.setState({
        account: account.data
      });
      if (notNull(account.data.country) && notNull(account.data.country.id)) {
        this.props.fetchStates({countryID: account.data.country.id});
        this.props.fetchCitiesCountry({id: account.data.country.id});
      }
    }
    const {parentEmailVerificationStatus} = nextProps;
    console.log('Next Props :: ', parentEmailVerificationStatus);
    if (this.props.parentEmailVerificationStatus.verifyEmailstatus === PENDING && parentEmailVerificationStatus.verifyEmailstatus === FULFILLED) {
      this.handleEmailVerficationModalOpen();
    }
  }
  componentDidUpdate(preProps) {
    const preEmailStatus = preProps.parentEmailVerificationStatus.status;
    if (this.props.parentEmailVerificationStatus.status !== preEmailStatus) {
      const {email} = this.state;
      if (this.props.parentEmailVerificationStatus.data.email && this.props.parentEmailVerificationStatus.status === FULFILLED && this.props.parentEmailVerificationStatus.data.email === email) {
        this.setEmailStatus(email);
      }
    }
  }
  setEmailStatus(email) {
    this.setState({email, isEmailVerified: true});
  }
  handleUpdateAccount(data) {
    const {account} = this.state;
    this.setState({
      account: {
        ...account,
        ...data
      }
    });
  }
  handleFirstName(e) {
    const {value} = e.target;
    this.handleUpdateAccount({
      firstName: value
    });
  }
  handleLastName(e) {
    const {value} = e.target;
    this.handleUpdateAccount({
      lastName: value
    });
  }
  handleGenderChange(e) {
    const {value} = e.target;
    this.handleUpdateAccount({
      gender: value
    });
  }
  handleCountry(e) {
    const {value} = e.target;
    const country = this.props.countries.data.find(country => country.id === value);
    const {id, name} = country;
    this.handleUpdateAccount({
      country: {
        id,
        name
      },
      state: {
        id: null,
        name: ''
      },
      city: {
        id: null,
        name: ''
      }
    });
    this.props.fetchStates({countryID: value});
    this.props.fetchCitiesCountry({id: value});
  }
  handleStateChange(e, {newValue}) {
    this.handleUpdateAccount({
      state: {
        id: null,
        name: newValue
      }
    });
  }
  handleStateSelected(event, {suggestion}) {
    this.handleStateHighlighted({suggestion});
  }
  handleStateHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.handleUpdateAccount({
        state: {
          id,
          name
        },
        city: {
          id: null,
          name: ''
        }
      });
      this.props.clearCities();
      this.props.fetchCitiesByState({id});
    }
  }
  handleCityChange(e, {newValue}) {
    this.handleUpdateAccount({
      city: {
        id: null,
        name: newValue
      },
      timezone: {
        id: null
      }
    });
  }

  handleCitySelected(event, {suggestion}) {
    const {id, name} = suggestion;
    const city = this.handleFindCity(id);
    this.handleUpdateAccount({
      city: {
        id,
        name
      },
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
      this.handleUpdateAccount({
        city: {
          id,
          name
        },
        timezone: {
          id: city && city.timezoneId ? city.timezoneId : null
        }
      });
    }
  }
  handleAddress(e) {
    const {value} = e.target;
    this.handleUpdateAccount({
      address: value
    });
  }
  handleZipCode(e) {
    const {value} = e.target;
    this.handleUpdateAccount({
      zipCode: value
    });
  }
  handleTimezone(e) {
    const {value, name} = e.target;
    this.handleUpdateAccount({
      timezone: {
        id: value,
        name
      }
    });
  }
  handleMobile(e) {
    const {value} = e.target;
    this.handleUpdateAccount({
      mobile: value
    });
  }
  handleLandLine(e) {
    const {value} = e.target;
    this.handleUpdateAccount({
      landLine: value
    });
  }
  handleCanSendReminder(e) {
    const {checked} = e.target;
    this.handleUpdateAccount({
      canSendReminder: checked ? appConstants.yes : appConstants.no
    });
  }
  handleCanReceiveMarketingCall(e) {
    const {checked} = e.target;
    this.handleUpdateAccount({
      canReceiveMarketingCall: checked ? appConstants.yes : appConstants.no
    });
  }
  renderCountry(country, i) {
    return <option key={i} value={country.id} name={country.name}>{country.name}</option>;
  }
  renderTimeZone(timeZone, i) {
    return <option key={i} value={timeZone.id} name={timeZone.label}>{timeZone.label}</option>;
  }
  submitForm() {
    const {account} = this.state;
    const validation = validateAccount(account);
    this.setState({
      submitted: true,
      validation
    });
    return validation.valid;
  }
  renderGender(gender, index) {
    const {p} = this.props;
    const {account} = this.state;
    const id = `gen${index}`;
    return (
      <span key={index}>
        <input id={id} type="radio" name="gender" value={gender.value} onChange={this.handleGenderChange} checked={gender.value ? (gender.value === account.gender) : null}/>
        <label htmlFor={id}>{p.t(gender.displayName)}</label>
        <span className="w50"/>
      </span>
    );
  }
  handleEmailChange(e) {
    // Const {parentEmailVerificationStatus} = this.props;
    // Const {email} = parentEmailVerificationStatus.data;
    // const {verified, notVerified} = appConstants.businessEmailVerificationStatus;
    const newEmail = e.target.value;
    const {account} = this.state;
    const validation = validateAccount(account); // Const emailObject = Object.assign(account, {email: newEmail});

    /*     if (emailObject.email === e.target.value) {
      emailObject.isVerified = email && email === newEmail ? verified : emailObject.isVerified;
    } else {
      emailObject.isVerified = email && email === newEmail ? verified : notVerified;
    } */

    this.handleUpdateAccount({
      email: newEmail
    });

    this.setState({validation, isEmailVerified: false});
  }
  handleEmailVerficationModalOpen() {
    this.setState({isEmailVerificationModalOpen: true});
  }
  handleEmailVerficationModalClose() {
    this.setState({isEmailVerificationModalOpen: false});
  }
  handlePrimaryEmailchange() {
    const {isEmailVerified, account} = this.state;
    const {email} = account;
    const {profile, profileId} = this.props;
    const validation = validateAccount(account);
    this.setState({submitted: true});

    if (email !== this.props.account.data.email && isEmailVerified === false && validation.email) {
      console.log('Called Email Change :: ');
      this.props.verifyParentEmail({profileId}, {email});
    }
  }
  renderVerifyEmailModal() {
    const {isEmailVerificationModalOpen, account} = this.state;
    const {email} = account;
    const oldEmail = this.props.account.data.email;
    if (isEmailVerificationModalOpen) {
      return (
        <EmailVerificationModal
          isModalOpen={isEmailVerificationModalOpen}
          email={oldEmail}
          email2={email}
          onClose={this.handleEmailVerficationModalClose}
        />
      );
    }
  }

  render() {
    const {countries, states, cities, timezones, parentEmailVerificationStatus} = this.props;
    const {t} = this.props.p;
    const {account, submitted, isEmailVerified} = this.state;
    const {firstName, lastName, state, country, city, address, zipCode, timezone, mobile, landLine, canSendReminder, canReceiveMarketingCall, email} = account;
    const emailAlreadyExists = Boolean(parentEmailVerificationStatus.verifyEmailstatus === REJECTED && parentEmailVerificationStatus.verificationStatusCode === appConstants.emailVerificationStatusCode.emailExists);
    const validation = validateAccount(account);
    const stateAutoSuggestInputProps = {
      value: (state) && (state.name) ? state.name : '',
      onChange: this.handleStateChange,
      placeholder: t('ParentAccount.selectState')
    };
    const cityAutoSuggestInputProps = {
      value: (city) && city.name ? city.name : '',
      onChange: this.handleCityChange,
      placeholder: t('ParentAccount.selectCity')
    };
    if (country) {
      const selectedountry = this.props.countries.data.find(i => i.id === country.id);
      if (notNull(selectedountry)) {
        country.countryCode = selectedountry.isoCode;
      }
    }

    const number = notNull(mobile) && mobile.length > 1 ? phoneUtil.parseAndKeepRawInput(mobile, notNull(country) && notNull(country.countryCode) ? country.countryCode : 'US') : null;
    const defaultNumber = phoneUtil.parseAndKeepRawInput(appConstants.defaultPhone, notNull(country) && notNull(country.countryCode) ? country.countryCode : 'US');
    const mobileVal = notNull(number) ? phoneUtil.format(number, PNF.INTERNATIONAL) : '';
    const fromattedMobile = notNull(mobileVal) ? mobileVal.substr(mobileVal.indexOf(' ') + 1) : '';
    const number2 = notNull(landLine) && landLine.length > 1 ? phoneUtil.parseAndKeepRawInput(landLine, notNull(country) && notNull(country.countryCode) ? country.countryCode : 'US') : null;
    const landlineVal = notNull(number2) ? phoneUtil.format(number2, PNF.INTERNATIONAL) : '';
    const formattedLandline = notNull(landlineVal) ? landlineVal.substr(landlineVal.indexOf(' ') + 1) : '';
    const countryCode = notNull(number2) ? number2.getCountryCode() : defaultNumber.getCountryCode();

    return (
      <div className="cl-sd-trainingLocationInner mb30">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <div className="accDetails">
              <h1 className="uk-padding-remove">{t('ParentAccount.accountDetails.personalInfo')}</h1>
              <p>{t('ParentAccount.accountDetails.personalInfoDesc')}</p>
              {/*    <p><b>{t('ParentAccount.info')}</b></p> */}
              <div className="uk-grid">
                <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-5-10">
                      <label>{t('DashboardAccountDetails.email_address')}</label>
                    </div>
                    {
                      isEmailVerified ? (
                        <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-5-10 uk-text-right">
                          <p className="cl-sd-verified">
                            <svg className="cl-icon-verified" xmlns="http://www.w3.org/2000/svg" viewBox="-7044 -1120 20 20.001">
                              <g transform="translate(-7044 -1120)">
                                <g data-name="Group 260" transform="translate(0 0)">
                                  <path className="cl-icon-verified-1" d="M10,0,7.775,1.7,5,1.338,3.924,3.925,1.338,5,1.7,7.775,0,10l1.7,2.226L1.338,15l2.586,1.074L5,18.661l2.777-.36L10,20l2.225-1.7,2.775.36,1.074-2.586L18.662,15l-.36-2.777L20,10,18.3,7.775,18.662,5,16.076,3.925,15,1.338l-2.777.36Z" transform="translate(0 0)"/>
                                  <path className="cl-icon-verified-2" d="M6.286,10.714l2.857,2.857,5.714-5.714" transform="translate(-0.571 -0.714)"/>
                                </g>
                              </g>
                            </svg>
                            {t('DashboardAccountDetails.verified')}
                          </p>
                        </div>) : null
                    }
                  </div>
                </div>
                <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-2 uk-width-small-1-1 "/>
                <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={((validation.email === false || emailAlreadyExists === true) && submitted === true) ? 'field-holder error' : 'field-holder'}>
                    <input type="email" value={email ? email : null} name="" placeholder="barryjohnson@gmail.com" className=" field-required" onChange={this.handleEmailChange}/>
                    <span className="error-text">{(emailAlreadyExists === true) ? t('DashboardAccountDetails.emailAlreadyExists', {email: parentEmailVerificationStatus.verifyEmail}) : t('SSPProfileListing.validation_messages.email')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="cl-sd-changeOuter">
                    <a href="#changeemailModal" className="cancel" onClick={this.handlePrimaryEmailchange} data-uk-modal>Change</a>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.firstName === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.firstName')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.firstNameExample')} onChange={this.handleFirstName} value={firstName ? firstName : ''}/>
                    <span className="error-text">{t('ParentAccount.validation_messages.firstName')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.lastName === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.lastName')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.lastNameExample')} onChange={this.handleLastName} value={lastName ? lastName : ''}/>
                    <span className="error-text">{t('ParentAccount.validation_messages.lastName')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                  <div className={validation.gender === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <h6>{t('AccountDetails.gender')}</h6>
                    <div className="tandc">
                      {
                        config.genders.map(this.renderGender)
                      }
                      <span className="error-text">{t('AccountDetails.validation_messages.gender')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <div className="accDetails">
              <h1 className="uk-padding-remove">{t('ParentAccount.accountDetails.addressTitle')}</h1>
              <p className="mb25">{t('ParentAccount.accountDetails.addressDesc')}</p>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.country === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.country')}</label>
                    <select className="uk-form-controls field-required" onChange={this.handleCountry} value={country ? country.id : ''}>
                      <option>{t('ParentAccount.selectCountry')}</option>
                      {countries.data.map(this.renderCountry)}
                    </select>
                    <span className="error-text">{t('ParentAccount.validation_messages.country')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.state === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.state')}</label>
                    <AutoSuggetion
                      list={states.data}
                      inputProps={stateAutoSuggestInputProps}
                      onSelectSuggetion={this.handleStateSelected}
                      onSuggestionHighlighted={this.handleStateHighlighted}
                    />
                    <span className="error-text">{t('ParentAccount.validation_messages.state')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.city === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.city')}</label>
                    <div className="uk-autocomplete cl-sd-cityDropdownhead">
                      <AutoSuggetion
                        list={cities.data}
                        inputProps={cityAutoSuggestInputProps}
                        onSelectSuggetion={this.handleCitySelected}
                        onSuggestionHighlighted={this.handleCityHighlighted}
                      />
                    </div>
                    <span className="error-text">{t('ParentAccount.validation_messages.city')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid">

                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.address === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.address')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.address')} onChange={this.handleAddress} value={address ? address : ''}/>
                    <span className="error-text">{t('ParentAccount.validation_messages.address')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={(validation.zipCode.valid === false || validation.zipCode.maxLength === false) && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.zipCode')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.zipCodeExample')} onChange={this.handleZipCode} value={zipCode ? zipCode : ''}/>
                    <span className="error-text">{validation.zipCode.valid === false ? t('ParentAccount.validation_messages.zipCode.valid') : t('ParentAccount.validation_messages.zipCode.maxLength')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.timezone === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.timezone')}</label>
                    <select className="uk-form-controls field-required" onChange={this.handleTimezone} value={timezone && timezone.id ? timezone.id : ''}>
                      <option>{t('ParentAccount.selectTimeZone')}</option>
                      {timezones.data.map(this.renderTimeZone)}
                    </select>
                    <span className="error-text">{t('ParentAccount.validation_messages.timeZone')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <div className="accDetails">
              <h1 className="uk-padding-remove">{t('ParentAccount.phoneNumbers')}</h1>
              <p className="mb25">{t('ParentAccount.phoneNumbersMessage')}</p>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1">
                  <div className={(validation.mobile === false) && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <div className="tableDivSec">
                      <div className="lCol">
                        <label><span>{t('ParentAccount.mobile')}</span></label>
                      </div>
                    </div>
                    <div className="cl-sd-preset">
                      <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.mobileExample')} onChange={this.handleMobile} value={fromattedMobile ? fromattedMobile : mobile}/>
                      <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                    </div>
                    <span className="error-text">{t('ParentAccount.validation_messages.mobile')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.landline === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label><span>{t('ParentAccount.accountDetails.other')}</span></label>
                    <div className="cl-sd-preset">
                      <input type="text" name className="uk-form-controls" placeholder={t('ParentAccount.landLineExample')} onChange={this.handleLandLine} value={formattedLandline ? formattedLandline : landLine}/>
                      <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                    </div>
                  </div>
                  <span className="error-text">{t('ParentAccount.validation_messages.landLine')}</span>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">

                  <div className="field-holder mb10">
                    <div className="allowOuter">
                      <input className="optioncheckbox" id="level31" type="checkbox" onChange={this.handleCanSendReminder} checked={canSendReminder === appConstants.yes}/>
                      <label className="chechkShow" htmlFor="level31"><span>{t('AthleteAccount.canSendReminder')}</span></label>
                    </div>
                  </div>
                  <div className="field-holder">
                    <div className="allowOuter">
                      <input type="checkbox" id="allow2" onChange={this.handleCanReceiveMarketingCall} checked={canReceiveMarketingCall === appConstants.yes}/>
                      <label htmlFor="allow2"><span>{t('AthleteAccount.canReceiveMarketingCall')}</span></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <NextLink history={this.props.history} submitForm={this.submitForm} saveData={this.props.saveParentAccount} data={account} saveType={appConstants.saveType.onlyProfile} next={DASHBOARD} buttonText={t('NextLink.save')}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.renderVerifyEmailModal()}
      </div>
    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      countries: PropTypes.object.isRequired,
      states: PropTypes.object.isRequired,
      cities: PropTypes.object.isRequired,
      timezones: PropTypes.object.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      fetchStates: PropTypes.func.isRequired,
      fetchTimezones: PropTypes.func.isRequired,
      fetchCitiesByState: PropTypes.func.isRequired,
      fetchCitiesCountry: PropTypes.func.isRequired,
      account: PropTypes.object.isRequired,
      fetchParentAccount: PropTypes.func.isRequired,
      saveParentAccount: PropTypes.func.isRequired,
      clearCities: PropTypes.func.isRequired,
      verifyParentEmail: PropTypes.func.isRequired,
      parentEmailVerificationStatus: PropTypes.object.isRequired
    };
  }
}

Account.defaultProps = {};

const mapStateToProps = state => {
  const {sport, countries, states, cities, timezones, parent, profile, userProfiles} = state;
  const {account, parentEmailVerificationStatus} = parent;
  console.log('Countries in state :: ', countries);
  return {
    sport,
    countries,
    states,
    cities,
    timezones,
    account,
    profile,
    profileId: userProfiles.selectedProfile.id,
    parentEmailVerificationStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchTimezones: () => dispatch(fetchTimezones()),
    fetchStates: country => dispatch(fetchStates(country)),
    clearCities: () => dispatch(clearCities()),
    fetchCitiesByState: params => dispatch(fetchCitiesByState(params)),
    fetchCitiesCountry: params => dispatch(fetchCitiesCountry(params)),
    saveParentAccount: data => dispatch(saveParentAccount(data)),
    fetchParentAccount: () => dispatch(fetchParentAccount()),
    verifyParentEmail: (params, data) => dispatch(verifyParentEmail(params, data))
  };
};

const ParentAccount = connect(mapStateToProps, mapDispatchToProps)(Account);
export default withRouter(translate(ParentAccount));

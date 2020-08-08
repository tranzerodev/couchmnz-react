import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';

import {fetchCountries, fetchTimezones, fetchStates, clearCities, fetchCitiesByState, fetchCitiesCountry, saveAthleteAccount, fetchAthleteAccount, activateAthleteProfile, changeProfile, fetchAthletePreferences} from '../../../../../actions';
import {REGISTRATION_ATHLETE_PREFERENCES} from '../../../../../constants/pathConstants';
import {SEARCH_URL} from '../../../../../constants/WebConstants';
import ProfileCompletion from '../../common/ProfileCompletion/ProfileCompletion';
import PreviousLink from '../../common/PreviousLink/PreviousLink';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {validateAccount} from '../../../../../validators/athlete/common/account';
import AutoSuggetion from '../../../../common/AutoSuggetion/AutoSuggetion';
import NextLink from '../../../common/SaveLink';
import appConstants from '../../../../../constants/appConstants';
import {notNull} from '../../../../../validators/common/util';
import RegCompleteModal from '../../common/RegCompleteModal/RegCompleteModal';
import Modal from '../../../../common/Modal';
import QueryString from 'query-string';
import moment from 'moment';

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

/* eslint complexity: 0 */
class Account extends Component {
  constructor(props) {
    super(props);
    const {account, profile} = props;
    const isCountryDefined = profile.status === FULFILLED && notNull(profile.data.country);
    const countryID = isCountryDefined && notNull(profile.data.country.id) ? profile.data.country.id : null;
    const countryName = isCountryDefined && notNull(profile.data.country.name) ? profile.data.country.name : null;
    this.state = {
      account: account.status === FULFILLED ? account.data : {
        firstName: null,
        lastName: null,
        country: {
          id: countryID,
          name: countryName
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
        canSendReminder: null,
        canReceiveMarketingCall: null
      },
      isOpenCongratsModal: false,
      submitted: false
    };
    this.handleUpdateAccount = this.handleUpdateAccount.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCountryHighlighted = this.handleCountryHighlighted.bind(this);
    this.handleCountrySelected = this.handleCountrySelected.bind(this);
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
    this.submitForm = this.submitForm.bind(this);
    this.onSaveAthleteAccount = this.onSaveAthleteAccount.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
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
      const {profile} = this.props;
      this.props.fetchAthleteAccount({athleteId: profile.data.id});
    }
    if (this.props.account.status === FULFILLED) {
      const {account} = this.props;
      if (notNull(account.data.country) && notNull(account.data.country.id)) {
        this.props.fetchStates({countryID: account.data.country.id});
        this.props.fetchCitiesCountry({id: account.data.country.id});
      }
    }
    if (this.props.preferences.status !== FULFILLED && this.props.preferences !== PENDING && this.props.profile.status === FULFILLED) {
      const {profile} = this.props;
      const {sports} = profile.data;
      if (sports && sports.length) {
        this.props.fetchAthletePreferences({athleteId: profile.data.id, sportId: sports[0].id});
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.account.status === PENDING &&
      nextProps.account.status === FULFILLED) {
      const {account, profile} = nextProps;
      const isCountryDefined = profile.status === FULFILLED && notNull(profile.data.country);
      const countryID = isCountryDefined && notNull(profile.data.country.id) ? profile.data.country.id : null;
      const countryName = isCountryDefined && notNull(profile.data.country.name) ? profile.data.country.name : null;
      const id = account.data.country && account.data.country.id ? account.data.country.id : countryID;
      const name = account.data.country && account.data.country.id ? account.data.country.id : countryName;

      this.props.fetchStates({countryID: id});
      this.props.fetchCitiesCountry({id});
      this.setState({
        account: {
          ...account.data,
          country: {
            id,
            name
          }
        }
      });
    }
    if (this.props.accountStatus.status === PENDING &&
      nextProps.accountStatus.status === FULFILLED) {
      const {profile} = nextProps;
      if (profile.data.isActive === appConstants.no) {
        nextProps.activateAthleteProfile({profileID: profile.data.id, type: appConstants.userProfileTypes.ATHLETE});
      } else if (profile.data.isActive === appConstants.yes) {
        this.handleOpenModal();
        // This.props.history.push(DASHBOARD_LINK);
      }
    }
  }
  getAthleteAge(age) {
    switch (age) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4: return appConstants.searchParams.ages.toddler;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9: return appConstants.searchParams.ages.child;
      case 10:
      case 11:
      case 12: return appConstants.searchParams.ages.preteen;
      case 13:
      case 14:
      case 15:
      case 16:
      case 17: return appConstants.searchParams.ages.adolescent;
      case 18:
      case 19:
      case 20:
      case 21:
      case 22: return appConstants.searchParams.ages.collegiate;
      case 23: return appConstants.searchParams.ages.adult;
      default: return appConstants.searchParams.ages.adult;
    }
  }
  handleSearchFilter() {
    const {account, preferences, profile} = this.props;
    const {athleteGender, athleteAgeGroups, athleteSkillLevels, trainerGenderParam, sessionTypesParam, distanceParam, canTravelParam, yearOfPlayingExperienceParam} = appConstants.filterQueries;
    const {city, gender} = account.data;
    const url = parseUrlTemplate(SEARCH_URL, {city: city && city.name ? city.name : appConstants.masterDataTypes.city});
    const {skillLevel} = preferences.data;
    const {sspSubTypes, trainerGenders, yearOfExperience, travelPref} = preferences.data.preferences;
    const {dob} = profile.data;
    const updatedFilters = Object.assign({},
      {
        [sessionTypesParam]: (sspSubTypes.length > 0) ? sspSubTypes.map(i => i.description) : undefined,
        [trainerGenderParam]: (trainerGenders.length > 0 && trainerGenders.indexOf(appConstants.gender.any) < 0) ? trainerGenders : undefined,
        [yearOfPlayingExperienceParam]: yearOfExperience ? yearOfExperience : undefined,
        [athleteAgeGroups]: this.getAthleteAge(moment().diff(dob, 'years')),
        [athleteGender]: gender && gender !== appConstants.gender.any ? gender : undefined,
        [athleteSkillLevels]: (skillLevel && skillLevel.description) ? (skillLevel.description) : undefined,
        // [canTravelParam]: travelPref && travelPref.distance > 0 ? appConstants.yes : undefined,
        [distanceParam]: travelPref && travelPref.distance > 0 ? travelPref.distance : undefined
      }
    );
    const search = QueryString.stringify(updatedFilters);
    const searchUrl = url + '&' + search;
    return searchUrl;
  }
  componentDidUpdate(preProps) {
    if (preProps.userProfiles.status !== FULFILLED && this.props.userProfiles.status === FULFILLED) {
      const profile = this.props.userProfiles.data.find(profile => profile.type === appConstants.userProfileTypes.ATHLETE);
      this.props.changeProfile(profile);
    }
    if (preProps.userProfiles.selectedProfile &&
      preProps.userProfiles.selectedProfile.isActive !== this.props.userProfiles.selectedProfile.isActive) {
      this.handleOpenModal();
      // This.props.history.push(DASHBOARD_LINK);
    }
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
  handleCountry(e) {
    const {value} = e.target;
    const name = e.currentTarget.getAttribute('name');
    this.handleUpdateAccount({
      country: {
        id: value,
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
  handleCountryChange(e, {newValue}) {
    this.handleUpdateAccount({
      country: {
        id: null,
        name: newValue
      }
    });
  }
  handleCountrySelected(event, {suggestion}) {
    this.handleCountryHighlighted({suggestion});
  }
  handleCountryHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
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
      this.props.fetchStates({countryID: id});
      this.props.fetchCitiesCountry({id});
    }
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

  handleFindCity(id) {
    return this.props.cities.data.find(e => e.id === id);
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
  onSaveAthleteAccount(data) {
    const validation = validateAccount(this.state.account);
    if (validation.valid) {
      this.props.saveAthleteAccount(data);
    }
  }
  handleSave() {}
  onCloseModal() {
    const url = this.handleSearchFilter();
    this.setState({isOpenCongratsModal: false});
    window.location.href = url;
  }
  handleOpenModal() {
    this.setState({isOpenCongratsModal: true});
  }
  render() {
    const {countries, states, cities, timezones, profile} = this.props;
    const {t} = this.props.p;
    const {account, submitted} = this.state;
    const {firstName, lastName, country, state, city, address, zipCode, timezone, mobile, landLine, canSendReminder, canReceiveMarketingCall} = account;
    
    const validation = validateAccount(account);
    const countryAutoSuggestInputProps = {
      value: (country) && (country.name) ? country.name : profile.country ? profile.country.name : '',
      onChange: this.handleCountryChange,
      placeholder: t('AthleteAccount.selectCountry')
    };
    const stateAutoSuggestInputProps = {
      value: (state) && (state.name) ? state.name : '',
      onChange: this.handleStateChange,
      placeholder: t('AthleteAccount.selectState')
    };
    const cityAutoSuggestInputProps = {
      value: (city) && (city.name) ? city.name : '',
      onChange: this.handleCityChange,
      placeholder: t('AthleteAccount.selectCity')
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
      <div className="header">
        <ProfileCompletion index={2}/>
        <div className="top-back-sec">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <PreviousLink history={this.props.history} previous={REGISTRATION_ATHLETE_PREFERENCES}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="stepSection stepSectionNaccountxt cl-sm-athleteSection ssp-regflow-1o">
          <div className="uk-container uk-container-center ">
            <div className="accDetails cl-sm-customInp">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                  <h1 className="uk-text-left">{t('AthleteAccount.title')}</h1>
                  <p className="pt0">{t('AthleteAccount.message')}</p>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.firstName === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('AthleteAccount.firstName')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('AthleteAccount.firstNameExample')} onChange={this.handleFirstName} value={firstName ? firstName : ''}/>
                    <span className="error-text">{t('AthleteAccount.validation_messages.firstName')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.lastName === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('AthleteAccount.lastName')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('AthleteAccount.lastNameExample')} onChange={this.handleLastName} value={lastName ? lastName : ''}/>
                    <span className="error-text">{t('AthleteAccount.validation_messages.lastName')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.country === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('AthleteAccount.country')}</label>
                    <AutoSuggetion
                      list={countries.data}
                      inputProps={countryAutoSuggestInputProps}
                      onSelectSuggetion={this.handleCountrySelected}
                      onSuggestionHighlighted={this.handleCountryHighlighted}
                    />
                    <span className="error-text">{t('AthleteAccount.validation_messages.country')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.state === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('AthleteAccount.state')}</label>
                    <AutoSuggetion
                      list={states.data}
                      inputProps={stateAutoSuggestInputProps}
                      onSelectSuggetion={this.handleStateSelected}
                      onSuggestionHighlighted={this.handleStateHighlighted}
                    />
                    <span className="error-text">{t('AthleteAccount.validation_messages.state')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.city === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('AthleteAccount.city')}</label>
                    <div className="uk-autocomplete cl-sd-cityDropdownhead">
                      <AutoSuggetion
                        list={cities.data}
                        inputProps={cityAutoSuggestInputProps}
                        onSelectSuggetion={this.handleCitySelected}
                        onSuggestionHighlighted={this.handleCityHighlighted}
                      />
                    </div>
                    <span className="error-text">{t('AthleteAccount.validation_messages.city')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.address === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('AthleteAccount.address')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('AthleteAccount.address')} onChange={this.handleAddress} value={address ? address : ''}/>
                    <span className="error-text">{t('AthleteAccount.validation_messages.address')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={(validation.zipCode.valid === false || validation.zipCode.maxLength === false) && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('AthleteAccount.zipCode')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('AthleteAccount.zipCodeExample')} onChange={this.handleZipCode} value={zipCode ? zipCode : ''}/>
                    <span className="error-text">{validation.zipCode.valid === false ? t('AthleteAccount.validation_messages.zipCode.valid') : t('AthleteAccount.validation_messages.zipCode.maxLength')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-11 uk-width-medium-1-1 uk-width-small-1-1 uk-width-mobile">
                  <label>{t('AthleteAccount.timezone')}</label>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.timezone === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <select className="uk-form-controls field-required" onChange={this.handleTimezone} value={timezone && timezone.id ? timezone.id : ''}>
                      <option>{t('AthleteAccount.selectTimeZone')}</option>
                      {timezones.data.map(this.renderTimeZone)}
                    </select>
                    <span className="error-text">{t('AthleteAccount.validation_messages.timeZone')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 uk-width-mobile pd10">
                  <label>{t('AthleteAccount.phoneNumbers')}</label>
                  <p>{t('AthleteAccount.phoneNumbersMessage')}</p>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={(validation.mobile === false) && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <div className="tableDivSec">
                      <div className="lCol">
                        <label>{t('AthleteAccount.mobile')}</label>
                      </div>
                    </div>
                    <div className="cl-sd-preset">
                      <input type="text" name="mobile" className="uk-form-controls field-required" placeholder={t('AthleteAccount.mobileExample')} onChange={this.handleMobile} value={fromattedMobile ? fromattedMobile : mobile}/>
                      <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                    </div>
                    <span className="error-text">{t('AthleteAccount.validation_messages.mobile')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.landline === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label><span>{t('AthleteAccount.landLine')}</span></label>
                    <div className="cl-sd-preset">
                      <input type="text" name className="uk-form-controls" placeholder={t('AthleteAccount.landLineExample')} onChange={this.handleLandLine} value={formattedLandline ? formattedLandline : landLine}/>
                      <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                    </div>
                    <span className="error-text">{t('AthleteAccount.validation_messages.landLine')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-10 uk-width-large-1-10 uk-width-medium-1-1  uk-width-small-1-1"/>
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 cl-sm-tandc pt10">
                  <div className="chk-sec">
                    <div className="field-holder mb10">
                      <div className="allowOuter">
                        <input className="optioncheckbox" id="allow1" type="checkbox" onChange={this.handleCanSendReminder} checked={canSendReminder === appConstants.yes}/>
                        <label htmlFor="allow1"><span>{t('AthleteAccount.canSendReminder')}</span></label>
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

              </div>
              <div className="uk-grid text-right">
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4  uk-width-small-1-2"/>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4  uk-width-small-1-2 mnone"/>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4  uk-width-small-1-2">
                  <NextLink submitForm={this.submitForm} saveData={this.onSaveAthleteAccount} data={account} saveType={appConstants.saveType.onlyProfile} buttonText={t('NextLink.save')} onSave={this.handleSave}/>
                </div>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4  uk-width-small-1-1"/>
              </div>
            </div>
          </div>
        </section>
        <Modal isModalOpen={this.state.isOpenCongratsModal} >
          <RegCompleteModal handleClose={this.onCloseModal}/>
        </Modal>
      </div>

    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      countries: PropTypes.object.isRequired,
      states: PropTypes.object.isRequired,
      account: PropTypes.object.isRequired,
      accountStatus: PropTypes.object.isRequired,
      cities: PropTypes.object.isRequired,
      timezones: PropTypes.object.isRequired,
      preferences: PropTypes.object.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      activateAthleteProfile: PropTypes.func.isRequired,
      fetchStates: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      fetchTimezones: PropTypes.func.isRequired,
      fetchCitiesByState: PropTypes.func.isRequired,
      fetchCitiesCountry: PropTypes.func.isRequired,
      saveAthleteAccount: PropTypes.func.isRequired,
      fetchAthleteAccount: PropTypes.func.isRequired,
      fetchAthletePreferences: PropTypes.func.isRequired,
      clearCities: PropTypes.func.isRequired,
      changeProfile: PropTypes.func.isRequired
    };
  }
}

Account.defaultProps = {};

const mapStateToProps = state => {
  const {sport, countries, states, cities, timezones, athlete, profile, userProfiles} = state;
  const {account, accountStatus, profileStatus, preferences} = athlete;
  return {
    sport,
    countries,
    states,
    cities,
    timezones,
    account,
    accountStatus,
    profileStatus,
    profile,
    userProfiles,
    preferences
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
    saveAthleteAccount: data => dispatch(saveAthleteAccount(data)),
    activateAthleteProfile: params => dispatch(activateAthleteProfile(params)),
    fetchAthleteAccount: params => dispatch(fetchAthleteAccount(params)),
    fetchAthletePreferences: params => dispatch(fetchAthletePreferences(params)),
    changeProfile: profile => dispatch(changeProfile(profile))
  };
};

const AthleteAccount = connect(mapStateToProps, mapDispatchToProps)(Account);
export default translate(AthleteAccount);
/* eslint complexity: 0 */

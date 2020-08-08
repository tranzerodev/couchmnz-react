import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import {fetchCountries, fetchTimezones, fetchStates, clearCities, fetchCitiesByState, fetchCitiesCountry, saveParentAccount, fetchParentAccount, activateParentProfile, changeProfile} from '../../../../../actions';
import {REGISTRATION_PARENT_PREFERENCES} from '../../../../../constants/pathConstants';
import ProfileCompletion from '../../common/ProfileCompletion/ProfileCompletion';
import PreviousLink from '../../common/PreviousLink/PreviousLink';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {validateAccount} from '../../../../../validators/parent/common/account';
import AutoSuggetion from '../../../../common/AutoSuggetion/AutoSuggetion';
import NextLink from '../../../common/SaveLink';
import appConstants from '../../../../../constants/appConstants';
import {notNull, isNonEmptyArray} from '../../../../../validators/common/util';
import Modal from '../../../../common/Modal';
import RegCompleteModal from '../../common/RegCompleteModal/RegCompleteModal';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import moment from 'moment';
import QueryString from 'query-string';
import {SEARCH_URL} from '../../../../../constants/WebConstants';

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
/* eslint complexity: 0 */
class Account extends Component {
  constructor(props) {
    super(props);
    const {account, profile} = props;
    const isCountryDefined = Boolean(profile.status === FULFILLED && notNull(profile.data.country));
    const countryID = isCountryDefined && notNull(profile.data.country.id) ? profile.data.country.id : null;
    const countryName = isCountryDefined && notNull(profile.data.country.name) ? profile.data.country.name : null;
    this.state = {
      account: account.status === FULFILLED ? account.data : {
        firstName: null,
        lastName: null,
        gender: null,
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
      submitted: false,
      isOpenCongratsModal: false
    };
    this.handleUpdateAccount = this.handleUpdateAccount.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleGender = this.handleGender.bind(this);
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
    this.onSaveParentAccount = this.onSaveParentAccount.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
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
      const {account, profile} = nextProps;
      const {country} = account;
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
      const {profile, userProfiles} = nextProps;
      if (userProfiles.selectedProfile && isNonEmptyArray(userProfiles.selectedProfile.dependents)) {
        if (userProfiles.selectedProfile.dependents[0].isActive === appConstants.profileActiveFlages.inactive) {
          nextProps.activateParentProfile({parentId: profile.data.parentId, childId: profile.data.id});
        } else if (userProfiles.selectedProfile.dependents[0].isActive === appConstants.profileActiveFlages.active) {
          this.handleOpenModal();
          // This.props.history.push(DASHBOARD_LINK);
        }
      }
    }
  }

  componentDidUpdate(preProps) {
    if (preProps.userProfiles.status !== FULFILLED && this.props.userProfiles.status === FULFILLED) {
      const profileId = preProps.userProfiles.selectedProfile && preProps.userProfiles.selectedProfile.id ? preProps.userProfiles.selectedProfile.dependentId : null;
      const profile = this.props.userProfiles.data.find(profile => profile.type === appConstants.userProfileTypes.PARENT);
      if (profile && isNonEmptyArray(profile.dependents) && profileId) {
        const dependent = profile.dependents.find(i => i.id === profileId);
        this.props.changeProfile({...profile, dependents: [dependent], dependentId: dependent.id});
      } else {
        this.props.changeProfile({...profile, dependents: [profile.dependents[0]]});
      }
    }
    if (preProps.userProfiles.selectedProfile && isNonEmptyArray(preProps.userProfiles.selectedProfile.dependents) &&
          preProps.userProfiles.selectedProfile.dependents[0].isActive !== this.props.userProfiles.selectedProfile.dependents[0].isActive) {
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
  handleGender(e) {
    const {value} = e.target;
    this.handleUpdateAccount({
      gender: value
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
  handleOpenModal() {
    this.setState({isOpenCongratsModal: true});
  }
  onCloseModal() {
    const url = this.handleSearchFilter();
    this.setState({isOpenCongratsModal: false});
    window.location.href = url;
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
  onSaveParentAccount(data) {
    const validation = validateAccount(this.state.account);
    if (validation.valid) {
      this.props.saveParentAccount(data);
    }
  }
  handleSave() {}
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
    const {city} = account.data;
    const url = parseUrlTemplate(SEARCH_URL, {city: city && city.name ? city.name : appConstants.masterDataTypes.city});
    const {skillLevel} = preferences.data;
    const {sspSubTypes, trainerGenders, yearOfExperience, travelPref} = preferences.data.preferences;
    const {dob, gender} = profile.data;
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
  render() {
    const {countries, states, cities, timezones, profile} = this.props;
    const {t} = this.props.p;
    const {account, submitted} = this.state;
    const {firstName, lastName, gender, country, state, city, address, zipCode, timezone, mobile, landLine, canReceiveMarketingCall, canSendReminder} = account;
    const validation = validateAccount(account);
    const countryAutoSuggestInputProps = {
      value: (country) && (country.name) ? country.name : profile.country ? profile.country.name : '',
      onChange: this.handleCountryChange,
      placeholder: t('ParentAccount.selectCountry')
    };
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

    if (countries && countries.data && country) {
      const selectedountry = countries.data.find(i => i.id === country.id);
      if (notNull(selectedountry)) {
        country.countryCode = selectedountry.isoCode;
      }
    }
    const number = notNull(mobile) && mobile.length > 1 ? phoneUtil.parseAndKeepRawInput(mobile, notNull(country) && notNull(country.countryCode) ? country.countryCode : 'US') : null;
    const defaultNumber = phoneUtil.parseAndKeepRawInput(appConstants.defaultPhone, notNull(country) && notNull(country.countryCode) ? country.countryCode : 'US');
    const mobileVal = notNull(number) ? phoneUtil.format(number, PNF.INTERNATIONAL) : '';
    const fromattedMobile = notNull(mobileVal) ? mobileVal.substr(mobileVal.indexOf(' ') + 1) : '';
    const number2 = notNull(landLine) && landLine.length > 1 ? phoneUtil.parseAndKeepRawInput(landLine, notNull(country.countryCode) ? country.countryCode : 'US') : null;
    const landlineVal = notNull(number2) ? phoneUtil.format(number2, PNF.INTERNATIONAL) : '';
    const formattedLandline = notNull(landlineVal) ? landlineVal.substr(landlineVal.indexOf(' ') + 1) : '';
    const countryCode = notNull(number2) ? number2.getCountryCode() : defaultNumber.getCountryCode();

    return (
      <div className>
        <ProfileCompletion index={2}/>
        <div className="top-back-sec">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <PreviousLink history={this.props.history} previous={REGISTRATION_PARENT_PREFERENCES}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="stepSection stepSectionNxt cl-sm-athleteSection ssp-regflow-1o">
          <div className="uk-container uk-container-center ">
            <div className="accDetails cl-sm-customInp">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                  <h1 className="uk-text-left">{t('ParentAccount.title')}</h1>
                  <p className="pt0">{t('ParentAccount.message')}</p>
                  <h3 className="label"><b>{t('ParentAccount.info')}</b></h3>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.firstName === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.firstName')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.firstNameExample')} onChange={this.handleFirstName} value={firstName ? firstName : ''}/>
                    <span className="error-text">{t('ParentAccount.validation_messages.firstName')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.lastName === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.lastName')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.lastNameExample')} onChange={this.handleLastName} value={lastName ? lastName : ''}/>
                    <span className="error-text">{t('ParentAccount.validation_messages.lastName')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                  <div className="uk-form-inline uk-from-inline-mobile">
                    <div className={validation.gender === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                      <h6 className="uk-padding-remove">{t('ParentProfile.gender')}</h6>
                      <div className="tandc">
                        <input className id="gn1" type="radio" name={t('ParentProfile.genders.M')} value={appConstants.gender.male} checked={gender === appConstants.gender.male} onChange={this.handleGender}/>
                        <label htmlFor="gn1">{t('ParentProfile.genders.M')}</label>
                        <input className id="gn2" name={t('ParentProfile.genders.F')} value={appConstants.gender.female} type="radio" checked={gender === appConstants.gender.female} onChange={this.handleGender}/>
                        <label htmlFor="gn2">{t('ParentProfile.genders.F')}</label>
                        <input className id="gn3" type="radio" name={t('ParentProfile.genders.O')} value={appConstants.gender.other} checked={gender === appConstants.gender.other} onChange={this.handleGender}/>
                        <label htmlFor="gn3">{t('ParentProfile.genders.O')}</label>
                        <span className="error-text">{t('ParentProfile.validation_messages.gender')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.country === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.country')}</label>
                    <AutoSuggetion
                      list={countries.data}
                      inputProps={countryAutoSuggestInputProps}
                      onSelectSuggetion={this.handleCountrySelected}
                      onSuggestionHighlighted={this.handleCountryHighlighted}
                    />
                    {/* <select className="uk-form-controls field-required" onChange={this.handleCountry} value={country.id}>
                      <option>{t('ParentAccount.selectCountry')}</option>
                      {countries.data.map(this.renderCountry)}
                    </select> */}
                    <span className="error-text">{t('ParentAccount.validation_messages.country')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
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
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
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
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.address === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.address')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.address')} onChange={this.handleAddress} value={address ? address : ''}/>
                    <span className="error-text">{t('ParentAccount.validation_messages.address')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={(validation.zipCode.valid === false || validation.zipCode.maxLength === false) && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label>{t('ParentAccount.zipCode')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentAccount.zipCodeExample')} onChange={this.handleZipCode} value={zipCode ? zipCode : ''}/>
                    <span className="error-text">{validation.zipCode.valid === false ? t('ParentAccount.validation_messages.zipCode.valid') : t('ParentAccount.validation_messages.zipCode.maxLength')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-11 uk-width-medium-1-1 uk-width-small-1-1 uk-width-mobile">
                  <label>{t('ParentAccount.timezone')}</label>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.timezone === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <select className="uk-form-controls field-required" onChange={this.handleTimezone} value={timezone && timezone.id ? timezone.id : ''}>
                      <option>{t('ParentAccount.selectTimeZone')}</option>
                      {timezones.data.map(this.renderTimeZone)}
                    </select>
                    <span className="error-text">{t('ParentAccount.validation_messages.timeZone')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid uk-grid-mobile">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 uk-width-mobile pd10">
                  <label>{t('ParentAccount.phoneNumbers')}</label>
                  <p>{t('ParentAccount.phoneNumbersMessage')}</p>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
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
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                  <div className={validation.landline === false && submitted ? appConstants.fieldClasses.error : appConstants.fieldClasses.holder}>
                    <label><span>{t('ParentAccount.landLine')}</span></label>
                    <div className="cl-sd-preset">
                      <input type="text" name className="uk-form-controls" placeholder={t('ParentAccount.landLineExample')} onChange={this.handleLandLine} value={formattedLandline ? formattedLandline : landLine}/>
                      <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                    </div>
                    <span className="error-text">{t('ParentAccount.validation_messages.landLine')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-10 uk-width-large-1-10 uk-width-medium-1-1  uk-width-small-1-1"/>
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 cl-sm-tandc pt10">
                  <div className="chk-sec">
                    <div className="field-holder mb10">
                      <div className="allowOuter">
                        <input className="optioncheckbox" id="allow1" type="checkbox" onChange={this.handleCanSendReminder} checked={canSendReminder === appConstants.yes}/>
                        <label htmlFor="allow1"><span>{t('ParentAccount.canSendReminder')}</span></label>
                      </div>
                    </div>
                    <div className="field-holder">
                      <div className="allowOuter">
                        <input type="checkbox" id="allow2" onChange={this.handleCanReceiveMarketingCall} checked={canReceiveMarketingCall === appConstants.yes}/>
                        <label htmlFor="allow2"><span>{t('ParentAccount.canReceiveMarketingCall')}</span></label>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
              <div className="uk-grid text-right">
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4  uk-width-small-1-2"/>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4  uk-width-small-1-2 mnone"/>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4  uk-width-small-1-2">
                  <NextLink history={this.props.history} submitForm={this.submitForm} saveData={this.onSaveParentAccount} data={account} saveType={appConstants.saveType.onlyProfile} onSave={this.handleSave} buttonText={t('NextLink.save')}/>
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
      accountStatus: PropTypes.object.isRequired,
      cities: PropTypes.object.isRequired,
      timezones: PropTypes.object.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      fetchStates: PropTypes.func.isRequired,
      fetchTimezones: PropTypes.func.isRequired,
      fetchCitiesByState: PropTypes.func.isRequired,
      fetchCitiesCountry: PropTypes.func.isRequired,
      account: PropTypes.object.isRequired,
      preferences: PropTypes.object.isRequired,
      fetchParentAccount: PropTypes.func.isRequired,
      saveParentAccount: PropTypes.func.isRequired,
      clearCities: PropTypes.func.isRequired,
      activateParentProfile: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      changeProfile: PropTypes.func.isRequired
    };
  }
}

Account.defaultProps = {};

const mapStateToProps = state => {
  const {sport, countries, states, cities, timezones, parent, profile, userProfiles} = state;
  const {account, accountStatus, profileStatus, preferences} = parent;
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
    preferences,
    userProfiles
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
    activateParentProfile: params => dispatch(activateParentProfile(params)),
    changeProfile: profile => dispatch(changeProfile(profile))
  };
};

const ParentAccount = connect(mapStateToProps, mapDispatchToProps)(Account);
export default translate(ParentAccount);
/* eslint complexity: 0 */

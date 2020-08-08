import React, {Component} from 'react';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {PulseLoader} from 'react-spinners';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {DebounceInput} from 'react-debounce-input';

import appConstants from '../../../../../constants/appConstants';
import config from '../../../../../config';

import AutoSuggetion from '../../../../common/AutoSuggetion';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import NextLink from '../../../../common/RegistrationNextLink';
import {validateAccountDetails} from '../../../../../validators/ssp/isp/registration/accountDetails';
import RequiredNotFilledModal from '../RequiredNotFilledModal';

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
  verifyNickname
} from '../../../../../actions';

import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {REGISTRATION_ISP_PROFILE_READY_MESSAGE} from '../../../../../constants/pathConstants';
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

class AccountDetails extends Component {
  constructor(props) {
    super(props);

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

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCityHighlighted = this.handleCityHighlighted.bind(this);
    this.handleCitySelected = this.handleCitySelected.bind(this);
    this.handleChangeContactData = this.handleChangeContactData.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);

    const {contact, presentNickName} = this.props;
    const nickname = presentNickName.nickname;
    const validation = validateAccountDetails({...contact, nickname});

    this.state = {
      availability: false,
      suggestions: this.props.nicknamesList.data,
      nickname: (nickname) ? nickname : '',
      nicknameChanged: false,
      contact,
      validation,
      submit: false,
      notFilled: [],
      isNotFilledModalOpen: false
    };
  }

  getNotFilled() {
    const {p} = this.props;
    const {validation} = this.state;
    const {zip, gender, mobile, countryID, street, cityName, timezone, firstName, lastName, nickname} = validation;
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
    if (nickname.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.nickname'));
    }
    return notFilled;
  }

  onSubmitForm() {
    const {contact, nickname, availability} = this.state;
    const validation = validateAccountDetails({...contact, nickname});
    if (validation.valid) {
      if (validation.required === true && availability === true) {
        return true;
      } else if (validation.nickname.required === true && availability === false) {
        this.setState({submit: true, validation});
        return false;
      }
      this.setState({submit: true, validation, notFilled: this.getNotFilled(), isNotFilledModalOpen: true});
      return false;
    }
    this.setState({submit: true, validation});
    return false;
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  handleChangeContactData(data) {
    const {contact, nickname} = this.state;
    const newContact = Object.assign({}, contact, data);

    const validation = validateAccountDetails({...newContact, nickname});
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
    this.handleChangeContactData({
      mobile: e.target.value
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
      this.props.fetchTimezones();
    }
    this.fetchProps(this.props);
    if (this.props.profile.status === FULFILLED && this.props.nicknamesList.status !== FULFILLED) {
      this.props.fetchNicknames({userID: this.props.profile.data.profile.id});
    }
    this.availability(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchProps(nextProps);
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
        // This.props.fetchTimezones({countryID: nextProps.contact.countryID});
      }
    }
    if (nextProps.profile.status === FULFILLED) {
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
        countryName: this.props.countries.data[this.handleCountrySearch(this.props.countries.data, e.target.value)].name,
        stateID: null,
        stateName: '',
        cityID: null,
        cityName: ''
      };
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
    const {contact} = this.state;
    const nickname = newValue.trim();
    const validation = validateAccountDetails({...contact, nickname});
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
      cityName: newValue
    });
  }

  handleCitySelected(event, {suggestion}) {
    const {id, name} = suggestion;
    this.handleChangeContactData({
      cityID: id,
      cityName: name
    });
  }

  handleCityHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.handleChangeContactData({
        cityID: id,
        cityName: name
      });
    }
  }

  handleGenderChange(event) {
    const {value} = event.target;
    this.handleChangeContactData({
      gender: value
    });
  }

  handleChangeFirstNameAndLastName(event) {
    const {name, value} = event.target;
    this.handleChangeContactData({
      [name]: value
    });
  }

  renderNicknameAvailability() {
    const {nickname, p} = this.props;
    const {validation, nicknameChanged, availability} = this.state;

    if (nickname.status !== PENDING && nickname.status !== null && validation.nickname.required === true && validation.nickname.valid === true && nicknameChanged) {
      if (availability) {
        return (
          <p className="cl-sd-available">{p.t('SSPProfileListing.available')}</p>
        );
      }
      return (
        <p className="cl-sd-notavailable">{p.t('SSPProfileListing.notAvailable')}</p>
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

  render() {
    const {p} = this.props;
    const {contact, validation, submit, nickname} = this.state;
    const inputProps = {
      value: this.state.nickname,
      onChange: this.handleNicknameChange,
      placeholder: p.t('SSPProfileListing.nick_name_placeholder')
    };
    const {stateName, cityName} = contact;
    const stateAutoSuggestInputProps = {
      value: (stateName) ? stateName : '',
      onChange: this.handleStateChange,
      placeholder: p.t('AccountDetails.statePlaceholder')
    };

    const cityAutoSuggestInputProps = {
      value: (cityName) ? cityName : '',
      onChange: this.handleCityChange,
      placeholder: p.t('AccountDetails.cityPlaceholder')
    };
    const coachlistURL = this.getCoachlistUrl();

    return (
      <div className="uk-container uk-container-center">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <h1 className="uk-padding-remove">{p.t('AccountDetails.title')}</h1>
            <p>{p.t('AccountDetails.message')}</p>
          </div>
        </div>

        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <div className="accDetails">

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                  <label>{p.t('SSPProfileListing.nickname')}</label>
                  <p>{p.t('SSPProfileListing.nick_name_message')}</p>
                </div>
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
                  <div className={(validation.nickname.valid === false) && submit ? 'field-holder error' : 'field-holder'}>
                    <Autosuggest
                      getSuggestionValue={getSuggestionValue}
                      inputProps={inputProps}
                      onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                      onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                      renderInputComponent={renderInputComponent}
                      renderSuggestion={renderSuggestion}
                      shouldRenderSuggestions={this.handleFocus}
                      suggestions={this.state.suggestions}
                    />
                    <span className="error-text">{ p.t('SSPProfileListing.validation_messages.nickName.valid')}</span>
                  </div>
                </div>

                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
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
              </div>

              <div className="uk-grid">
                <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <label>{p.t('SSPProfileListing.coachlistURL')}</label>
                    <input
                      type="text"
                      className="uk-form-controls"
                      placeholder="https://www.coachlist.com/"
                      name="url"
                      value={coachlistURL}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <label>{p.t('AccountDetails.firstName')}</label>
                    <input type="text" name="firstName" className="uk-form-controls field-required" placeholder={p.t('AccountDetails.firstNamePlaceholder')} value={contact.firstName} onChange={this.handleChangeFirstNameAndLastName}/>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <label>{p.t('AccountDetails.lastName')}</label>
                    <input type="text" name="lastName" className="uk-form-controls field-required" placeholder={p.t('AccountDetails.lastNamePlaceholder')} value={contact.lastName} onChange={this.handleChangeFirstNameAndLastName}/>

                  </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                  <div className="uk-form-inline uk-from-inline-mobile">
                    <div className={validation.gender.valid === false && submit ? 'field-holder error' : 'field-holder'}>
                      <h6 className="uk-padding-remove">{p.t('AccountDetails.gender')}</h6>
                      <p>{p.t('AccountDetails.genderMessage')}</p>
                      <div className="tandc">
                        {
                          config.genders.map(this.renderGenders)
                        }
                        <span className="error-text">{p.t('AccountDetails.validation_messages.gender')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <label>{p.t('AccountDetails.businessName')}</label>
                    <input type="text" name onChange={this.handleChangeName} className="uk-form-controls" placeholder={p.t('AccountDetails.businessNameExample')} value={contact.businessName}/>

                  </div>
                </div>
                <div className="uk-width-xlarge-2-3 uk-width-large-2-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.businessUrl === false && submit ? 'field-holder error' : 'field-holder'}>
                    <label>{p.t('AccountDetails.businessURL')}</label>
                    <input type="text" name onChange={this.handleChangeURL} className="uk-form-controls" placeholder="https://www.coachlist.com/" value={contact.businessUrl}/>
                    <span className="error-text">{p.t('AccountDetails.validation_messages.businessUrl')}</span>
                  </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <label>{p.t('AccountDetails.country')}</label>
                    <select className="uk-form-controls field-required" onChange={this.handleSelectCountry}>
                      <option value="">{p.t('AccountDetails.select_country')}</option>
                      {
                        this.props.countries.data.map((country, i) => {
                          const option = contact.countryID === country.id ? <option key={i} selected value={country.id}>{country.name}</option> : <option key={i} value={country.id}>{country.name}</option>;
                          return option;
                        })
                      }
                    </select>

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
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <label>{p.t('AccountDetails.streetAddress')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={p.t('AccountDetails.streetAddressExample')} onChange={this.handleChangeStreet} value={contact.street}/>

                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <label>{p.t('AccountDetails.city')}</label>
                    <div className="uk-autocomplete cl-sd-degreeDropdownhead">
                      <AutoSuggetion
                        list={this.props.cities.data}
                        inputProps={cityAutoSuggestInputProps}
                        onSelectSuggetion={this.handleCitySelected}
                        onSuggestionHighlighted={this.handleCityHighlighted}
                      />
                    </div>

                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1 ">
                  <div className={(validation.zip.valid === false || validation.zip.maxLength === false) && submit ? 'field-holder error' : 'field-holder'}>
                    <label>{p.t('AccountDetails.zipCode')}</label>
                    <input type="text" name className="uk-form-controls field-required" placeholder={p.t('AccountDetails.zipCodeExample')} onChange={this.handleChangeZip} value={contact.zip}/>
                    <span className="error-text">{validation.zip.valid === false ? p.t('AccountDetails.validation_messages.zip.valid') : p.t('AccountDetails.validation_messages.zip.maxLength')}</span>
                  </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <label>{p.t('AccountDetails.timezone')}</label>
                    <select className="uk-form-controls field-required" onChange={this.handleSelectTimezone}>
                      <option value="">{p.t('AccountDetails.select_timezone')}</option>
                      {
                        this.props.timezones.data.map((timezone, i) => {
                          const option = contact.timezone && contact.timezone.id === timezone.id ? <option key={i} selected value={timezone.id}>{timezone.label}</option> : <option key={i} value={timezone.id}>{timezone.label}</option>;
                          return option;
                        })
                      }
                    </select>

                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                  <h6 className="uk-padding-remove">{p.t('AccountDetails.phoneNumbers')}</h6>
                  <p>{p.t('AccountDetails.phoneNumbersMessage')}</p>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={(validation.mobile.valid === false) && submit ? 'field-holder error' : 'field-holder'}>
                    <label><span>{p.t('AccountDetails.mobile')}</span></label>
                    <input type="text" name="mobile" className="uk-form-controls field-required" placeholder={p.t('AccountDetails.mobileExample')} onChange={this.handleChangeMobile} value={contact.mobile}/>
                    <span className="error-text">{p.t('AccountDetails.validation_messages.mobile.valid')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className={validation.landline === false && submit ? 'field-holder error' : 'field-holder'}>
                    <label><span>{p.t('AccountDetails.landline')}</span></label>
                    <input type="text" name="landline" className="uk-form-controls field-required" placeholder={p.t('AccountDetails.landlineExample')} onChange={this.handleChangeLandline} value={contact.landline}/>
                    <span className="error-text">{p.t('AccountDetails.validation_messages.landline')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2"/>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2 mnone"/>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
            <div className="nxtAlign">
              <NextLink submitForm={this.onSubmitForm} saveData={this.props.saveAccountDetails} data={{contact, nickname}} saveType={appConstants.saveType.onlyProfile} next={REGISTRATION_ISP_PROFILE_READY_MESSAGE}/>
            </div>
          </div>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
            <div className="finishDivSec">
              <FinishLaterLink/>
            </div>
          </div>
        </div>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveAccountDetails}
          data={{contact, nickname}}
          msgKey={'AccountDetails.validation_messages.notFilled'}
          saveType={appConstants.saveType.onlyProfile}
        />
      </div>
    );
  }
}
/* eslint react/no-array-index-key: 0 */

AccountDetails.propTypes = {
  countries: PropTypes.object,
  states: PropTypes.object,
  clearStates: PropTypes.func.isRequired,
  saveAccountDetails: PropTypes.func.isRequired,

  fetchCountries: PropTypes.func.isRequired,
  fetchStates: PropTypes.func.isRequired,
  contact: PropTypes.object,

  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  fetchTimezones: PropTypes.func.isRequired,
  timezones: PropTypes.object,

  cities: PropTypes.object,
  fetchCitiesByState: PropTypes.func.isRequired,

  fetchCitiesCountry: PropTypes.func.isRequired,

  presentNickName: PropTypes.object.isRequired,

  nicknamesList: PropTypes.object,
  nickname: PropTypes.object,
  listing: PropTypes.object,

  profile: PropTypes.object.isRequired,
  fetchNicknames: PropTypes.func.isRequired,
  verifyNickname: PropTypes.func.isRequired,
  clearCities: PropTypes.func.isRequired
};

AccountDetails.defaultProps = {
  history: {},
  countries: {},
  states: {},
  clearStates: () => {},

  fetchCountries: () => {},
  fetchStates: () => {},
  contact: {},

  timezones: {data: [], status: null},
  cities: {data: [], status: null},
  nicknamesList: {status: null, data: []},
  nickname: {status: null, data: {}},
  listing: {}
};

const mapStateToProps = state => {
  const {countries, states, contact, timezones, cities, listing, nicknamesList, nickname, presentNickName, profile} = state;
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
    profile
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
    verifyNickname: nickname => dispatch(verifyNickname(nickname))
  };
};

const Registration4 = connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
export default translate(Registration4);

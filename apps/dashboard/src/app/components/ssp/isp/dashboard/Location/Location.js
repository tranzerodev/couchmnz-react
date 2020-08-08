import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {fetchCountries, fetchStates, fetchCitiesByState, saveAccountDetails} from '../../../../../actions/index';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import AutoSuggetion from '../../../../common/AutoSuggetion';
import appConstants from '../../../../../constants/appConstants';
import DashboardSaveLink from '../DashboardSaveLink';
import {DASHBOARD_SPORTS} from '../../../../../constants/pathConstants';
import {validateLocations} from '../../../../../validators/ssp/isp/dashboard/locations';

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
import {notNull} from '../../../../../validators/common/util';

class IspLocation extends Component {
  constructor(props) {
    super(props);

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onStateBlur = this.onStateBlur.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.handleStateHighlightChange = this.handleStateHighlightChange.bind(this);
    this.handleCityHighlightChange = this.handleCityHighlightChange.bind(this);
    this.handleStateSelection = this.handleStateSelection.bind(this);
    this.handleCitySelection = this.handleCitySelection.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeLandline = this.handleChangeLandline.bind(this);
    this.handleContactPreferenceChange = this.handleContactPreferenceChange.bind(this);
    this.handleContactPreferenceCallChange = this.handleContactPreferenceCallChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    const validation = validateLocations({});
    this.state = {
      data: {
        countryName: '',
        countryID: '',
        stateName: '',
        stateID: '',
        cityName: '',
        cityID: '',
        street: '',
        zip: '',
        mobile: '',
        landline: '',
        contactPreferences: {
          canSendReminder: appConstants.contactPreferences.smsFlags.no,
          canReceiveMarketingCall: appConstants.contactPreferences.smsFlags.no
        }
      },
      validation,
      submit: false
    };
  }

  componentDidMount() {
    const {countries} = this.props;
    const {status} = countries;
    if (status !== FULFILLED && status !== PENDING && status !== REJECTED) {
      this.props.fetchCountries();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.saveDataOnNextStatus === PENDING && this.props.saveDataOnNextStatus === FULFILLED && this.state.submit) {
      this.props.history.push(DASHBOARD_SPORTS);
    }
  }

  onDataChange(newData) {
    const data = Object.assign({}, this.state.data, newData);
    const validation = validateLocations(data);
    this.setState({data, validation});
  }

  handleCountryChange(e) {
    const newData = this.state.data;
    newData.countryID = e.target.value;
    const country = this.props.countries.data.find(country => country.id === newData.countryID);
    newData.countryName = country.name;
    newData.stateName = '';
    newData.stateID = '';
    newData.cityID = '';
    newData.cityName = '';
    newData.mobile = '';
    newData.landline = '';
    this.onDataChange(newData);
    this.props.fetchStates({countryID: e.target.value});
  }

  onStateChange(e, {newValue}) {
    const newData = this.state.data;
    newData.stateName = newValue;
    newData.stateID = '';
    this.onDataChange(newData);
  }

  onStateBlur() {
    const {stateID} = this.state.data;
    if (stateID) {
      this.props.fetchCitiesByState({id: stateID});
    }
  }

  onCityChange(event, {newValue}) {
    const newData = this.state.data;
    newData.cityID = '';
    newData.cityName = newValue;
    this.onDataChange(newData);
  }

  handleStateHighlightChange({suggestion}) {
    if (suggestion) {
      const newData = this.state.data;
      newData.stateName = suggestion.name;
      newData.stateID = suggestion.id;
      newData.cityID = '';
      newData.cityName = '';
      this.onDataChange(newData);
    }
  }

  handleCityHighlightChange({suggestion}) {
    if (suggestion) {
      const newData = Object.assign({}, this.state.data);
      newData.cityName = suggestion.name;
      newData.cityID = suggestion.id;
      this.onDataChange(newData);
    }
  }

  handleStateSelection(event, {suggestion}) {
    const newData = this.state.data;
    newData.stateName = suggestion.name;
    newData.stateID = suggestion.id;
    newData.cityID = '';
    newData.cityName = '';
    this.onDataChange(newData);
    this.props.fetchCitiesByState({id: suggestion.id});
  }

  handleCitySelection(event, {suggestion}) {
    const newData = this.state.data;
    newData.cityName = suggestion.name;
    newData.cityID = suggestion.id;
    this.onDataChange(newData);
  }

  handleChangeAddress(e) {
    const street = e.target.value;
    this.onDataChange({street});
  }

  handleZipChange(e) {
    const zip = e.target.value;
    this.onDataChange({zip});
  }

  handleChangeMobile(e) {
    this.onDataChange({
      mobile: e.target.value
    });
  }

  handleChangeLandline(e) {
    this.onDataChange({
      landline: e.target.value
    });
  }

  handleContactPreferenceChange(e) {
    let {contactPreferences} = Object.assign({}, this.state.data);
    if (e.target.checked === true) {
      contactPreferences = Object.assign({}, contactPreferences, {canSendReminder: appConstants.contactPreferences.smsFlags.yes});
    } else {
      contactPreferences = Object.assign({}, contactPreferences, {canSendReminder: appConstants.contactPreferences.smsFlags.no});
    }
    this.onDataChange({contactPreferences});
  }

  handleContactPreferenceCallChange(e) {
    let {contactPreferences} = Object.assign({}, this.state.data);
    if (e.target.checked === true) {
      contactPreferences = Object.assign({}, contactPreferences, {canReceiveMarketingCall: appConstants.contactPreferences.smsFlags.yes});
    } else {
      contactPreferences = Object.assign({}, contactPreferences, {canReceiveMarketingCall: appConstants.contactPreferences.smsFlags.no});
    }
    this.onDataChange({contactPreferences});
  }
  onSubmitForm() {
    this.setState({submit: true});
    const data = this.state.data;
    const validation = validateLocations(data);
    if (validation.valid === true && validation.required === true) {
      return true;
    }
    this.setState({validation});
    return false;
  }

  render() {
    const {p, countries, states, cities, contact, presentNickName} = this.props;
    const {t} = p;
    const {data, validation, submit} = this.state;
    const {stateName, cityName, countryID, street, zip, mobile, landline, contactPreferences} = data;

    const stateInputProps = {
      value: stateName,
      placeholder: t('IspLocation.enterState'),
      onChange: this.onStateChange,
      onBlur: this.onStateBlur
    };
    const cityInputProps = {
      value: cityName,
      onChange: this.onCityChange,
      placeholder: t('IspLocation.city')
    };

    const country = this.props.countries.data.find(i => i.id === data.countryID);
    if (notNull(country)) {
      data.countryCode = country.isoCode;
    }
    const number = notNull(mobile) && mobile.length > 1 ? phoneUtil.parseAndKeepRawInput(mobile, notNull(data.countryCode) ? data.countryCode : 'US') : null;
    const defaultNumber = phoneUtil.parseAndKeepRawInput(appConstants.defaultPhone, notNull(data.countryCode) ? data.countryCode : 'US');
    const countryCode = notNull(number) ? number.getCountryCode() : defaultNumber.getCountryCode();
    const mobileVal = notNull(number) ? phoneUtil.format(number, PNF.INTERNATIONAL) : '';
    contact.formattedMobile = notNull(mobileVal) ? mobileVal.substr(mobileVal.indexOf(' ') + 1) : '';
    const number2 = notNull(landline) && landline.length > 1 ? phoneUtil.parseAndKeepRawInput(landline, notNull(data.countryCode) ? data.countryCode : 'US') : null;
    const landlineVal = notNull(number2) ? phoneUtil.format(number2, PNF.INTERNATIONAL) : '';
    contact.formattedLandline = notNull(landlineVal) ? landlineVal.substr(landlineVal.indexOf(' ') + 1) : '';

    return (
      <div className="dashboardSection">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-10 uk-width-large-1-10 uk-width-medium-1-1 uk-width-small-1-1"/>
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
            <div className="trainingLocation">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="cl-sd-trainingLocationInner service_location ">
                    <h1 className="uk-padding-remove">{t('IspLocation.h1')}</h1>
                    <p className="pb20">{t('IspLocation.p')}</p>
                    <div className="uk-grid">
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                        <div className={validation.countryID.required === false && submit ? 'field-holder error' : 'field-holder'}>
                          <label>{t('IspLocation.country')}</label>
                          <select onChange={this.handleCountryChange} selected={countryID}>
                            <option value="">{this.props.p.t('IspLocation.select_country')}</option>
                            {
                              countries.data.map(country => {
                                return <option key={country.id} value={country.id} name={country.name}>{country.name}</option>;
                              })
                            }
                          </select>
                          <span className="error-text">{p.t('IspLocation.validation_messages.countryID')}</span>
                        </div>
                      </div>
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                        <div className="field-holder ">
                          <label>{t('IspLocation.state')}</label>
                          <AutoSuggetion
                            inputProps={stateInputProps}
                            list={states.data}
                            onSelectSuggetion={this.handleStateSelection}
                            onSuggestionHighlighted={this.handleStateHighlightChange}
                          />
                        </div>
                      </div>
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                        <div className={validation.cityID.required === false && submit ? 'field-holder error' : 'field-holder'}>
                          <label>City</label>
                          <div className="uk-autocomplete cl-sd-cityDropdownhead">
                            <AutoSuggetion
                              inputProps={cityInputProps}
                              list={cities.data}
                              onSelectSuggetion={this.handleCitySelection}
                              onSuggestionHighlighted={this.handleCityHighlightChange}
                            />

                          </div>
                          <span className="error-text">{p.t('IspLocation.validation_messages.cityName')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="uk-grid">
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                        <div className={validation.street.required === false && submit ? 'field-holder error' : 'field-holder'}>
                          <label>{t('IspLocation.street')}</label>
                          <div className="uk-autocomplete cl-sd-cityDropdownhead" >
                            <input
                              type="text"
                              className="uk-form-controls field-required"
                              placeholder={this.props.p.t('TravelPreference.addressExample')}
                              onChange={this.handleChangeAddress}
                              value={street}
                            />
                          </div>
                          <span className="error-text">{p.t('IspLocation.validation_messages.street')}</span>
                        </div>
                      </div>
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                        <div className={(validation.zip.required === false || validation.zip.valid === false || validation.zip.maxLength === false) && submit ? 'field-holder error' : 'field-holder'}>
                          <label>{t('IspLocation.zip')}</label>
                          <input
                            type="text"
                            onChange={this.handleZipChange}
                            value={zip}
                            className="uk-form-controls field-required"
                            placeholder={t('TravelPreference.zip_placeholder')}
                          />
                          <span className="error-text">{validation.zip.required === false ? p.t('IspLocation.validation_messages.zip.required') : validation.zip.valid === false ? p.t('IspLocation.validation_messages.zip.valid') : p.t('IspLocation.validation_messages.zip.maxLength')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="uk-grid">
                      <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                        <h1 className="uk-padding-remove">Phone Numbers</h1>
                        <p className="pb20">We need at least your mobile number phone # to text or call about cancellations, bookings or other events.</p>
                      </div>
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                        <div className={(validation.mobile.required === false || validation.mobile.valid === false) && submit ? 'field-holder error' : 'field-holder'}>
                          <div className="tableDivSec">
                            <div className="lCol">
                              <label>{t('IspLocation.mobile_number')}</label>
                            </div>
                          </div>
                          <div className="cl-sd-preset">
                            <input
                              type="text"
                              name="mobile"
                              className="uk-form-controls field-required"
                              placeholder={p.t('AccountDetails.mobileExample')}
                              onChange={this.handleChangeMobile}
                              value={contact.formattedMobile ? contact.formattedMobile : mobile}
                            />
                            <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                          </div>
                          <span className="error-text">{validation.mobile.required === false ? p.t('AccountDetails.validation_messages.mobile.required') : p.t('AccountDetails.validation_messages.mobile.valid')}</span>
                        </div>
                      </div>
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                        <div className={(validation.landline.required === false || validation.landline.valid === false) && submit ? 'field-holder error' : 'field-holder'}>
                          <label>{t('IspLocation.business_number')}</label>
                          <div className="cl-sd-preset">
                            <input
                              type="text"
                              name="landline"
                              className="uk-form-controls"
                              placeholder={p.t('AccountDetails.mobileExample')}
                              onChange={this.handleChangeLandline}
                              value={contact.formattedLandline ? contact.formattedLandline : landline}
                            />
                            <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                          </div>
                          <span className="error-text">{validation.landline.required === false ? p.t('AccountDetails.validation_messages.landline.required') : p.t('AccountDetails.validation_messages.landline.valid')}</span>
                        </div>

                      </div>
                      <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                        {/* <div className="field-holder">
                          <div className="tandc">
                            <input
                              checked={contactPreferences.sms === appConstants.contactPreferences.smsFlags.yes}
                              onChange={this.handleContactPreferenceChange}
                              type="checkbox"
                              name=""
                              id="allow1"
                            />
                            <label htmlFor="allow1">Allow Coachlist to send SMS</label>
                          </div>
                        </div> */}
                        <div className="field-holder mb10">
                          <div className="tandc">
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
                          <div className="tandc">
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
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="addanotherBtn">
                    <DashboardSaveLink
                      saveType={appConstants.saveType.onlyProfile}
                      data={{contact: {
                        ...contact,
                        ...data
                      }, nickname: presentNickName.nickname}}
                      saveData={this.props.saveAccountDetails}
                      submitForm={this.onSubmitForm}
                      isNewSports
                      buttonName={p.t('DashboardSaveLink.save_and_continue')}
                      next={DASHBOARD_SPORTS}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      countries: PropTypes.object.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      states: PropTypes.object.isRequired,
      fetchStates: PropTypes.func.isRequired,
      cities: PropTypes.object.isRequired,
      fetchCitiesByState: PropTypes.func.isRequired,
      contact: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      presentNickName: PropTypes.object.isRequired,
      saveDataOnNextStatus: PropTypes.string,
      saveAccountDetails: PropTypes.func.isRequired
    };
  }
}

IspLocation.defaultProps = {
  saveDataOnNextStatus: null
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: params => dispatch(fetchStates(params)),
    fetchCitiesByState: params => dispatch(fetchCitiesByState(params)),
    saveAccountDetails: (accountDetailsData, updateType) => dispatch(saveAccountDetails(accountDetailsData, updateType))
  };
};

const mapStateToProps = state => {
  const {
    countries,
    states,
    cities,
    contact,
    presentNickName,
    saveDataOnNext
  } = state;
  return {
    countries,
    states,
    cities,
    contact,
    presentNickName,
    saveDataOnNextStatus: saveDataOnNext.status
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(IspLocation)));

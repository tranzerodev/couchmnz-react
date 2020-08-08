import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import ViewOrder from '../View/Order';

import appConstants from '../../../../constants/appConstants';
import PaymentSummary from '../Edit/PaymentSummary';
import {shoppingCartCheckout, clearStates, fetchCountries, fetchStates, clearCities, fetchCitiesByState, fetchCitiesCountry} from '../../../../actions';
import {SHOPPING_CART_EDIT} from '../../../../constants/pathConstants';
import {validateAddress} from '../../../../validators/common/address';
import {notNull} from '../../../../validators/common/util';
import {FULFILLED, PENDING, REJECTED} from '../../../../constants/ActionTypes';
import AutoSuggetion from '../../AutoSuggetion/AutoSuggetion';

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const {isDependentFlag} = appConstants.shoppingCart;

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.handleShowAddress = this.handleShowAddress.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleStateHighlighted = this.handleStateHighlighted.bind(this);
    this.handleStateSelected = this.handleStateSelected.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCityHighlighted = this.handleCityHighlighted.bind(this);
    this.handleCitySelected = this.handleCitySelected.bind(this);
    this.fetchProps = this.fetchProps.bind(this);
    this.handleSelectCountry = this.handleSelectCountry.bind(this);
    this.handleChangeStreet = this.handleChangeStreet.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeZip = this.handleChangeZip.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeLandline = this.handleChangeLandline.bind(this);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    this.fetchProps(nextProps);
  }

  fetchProps(nextProps) {
    if (notNull(nextProps.account) && nextProps.account.countryId && nextProps.states.status !== FULFILLED && nextProps.states.status !== PENDING && nextProps.states.status !== REJECTED) {
      this.props.fetchStates({countryID: nextProps.account.countryId});
    }
    if (notNull(nextProps.account) && nextProps.account.stateId) {
      if (nextProps.cities.status !== FULFILLED && nextProps.cities.status !== PENDING && nextProps.states.status !== REJECTED) {
        this.props.fetchCitiesByState({id: nextProps.account.stateId});
      }
    } else if (notNull(nextProps.account) && nextProps.account.countryId) {
      if (nextProps.cities.status !== FULFILLED && nextProps.cities.status !== PENDING && nextProps.states.status !== REJECTED) {
        this.props.fetchCitiesCountry({id: nextProps.account.countryId});
      }
    }
  }

  handleCountrySearch(countries, id) {
    return countries.findIndex(country => country.id === id);
  }

  handleSubmitForm() {
    this.props.shoppingCartCheckout();
  }

  getUserProfilesData() {
    const {userProfiles} = this.props;
    const allProfileDataList = [];
    userProfiles.data.forEach(profile => {
      if (profile.type === appConstants.userProfileTypes.ATHLETE) {
        profile.isDependent = isDependentFlag.no;
        allProfileDataList.push(profile);
      } else if (profile.type === appConstants.userProfileTypes.PARENT) {
        profile.dependents.forEach(dependentProfile => {
          dependentProfile.isDependent = isDependentFlag.yes;
          allProfileDataList.push(dependentProfile);
        });
      }
    });
    return allProfileDataList;
  }

  renderOrders() {
    const {cartItems} = this.props;
    const dependents = this.getUserProfilesData();

    if (cartItems.length) {
      return cartItems.map(cartItem =>
        (
          <ViewOrder
            key={cartItem.sspId}
            cartItem={cartItem}
            dependents={dependents}
          />
        )
      );
    }
  }

  renderPaymentSummary() {
    return (
      <PaymentSummary
        key="PaymentSummary"
        hideButtons
        onSubmit={this.handleSubmitForm}
        continueLink={SHOPPING_CART_EDIT}
        continueButtonText={this.props.p.t('CartAddress.edit')}
      />
    );
  }

  onAddressChange(billing) {
    const account = Object.assign({}, this.props.billing, billing);
    this.props.onChangeAddress(account);
  }

  handleFocus() {
    return true;
  }

  handleStateChange(e, {newValue}) {
    this.onAddressChange({
      stateId: null,
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
      this.onAddressChange({
        stateId: id,
        state: {
          id,
          name
        },
        cityId: null,
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
    this.onAddressChange({
      cityId: null,
      city: {
        id: null,
        name: newValue
      }
    });
  }

  handleCitySelected(event, {suggestion}) {
    const {id, name} = suggestion;
    this.onAddressChange({
      cityId: id,
      city: {
        id,
        name
      }
    });
  }

  handleCityHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.onAddressChange({
        cityId: id,
        city: {
          id,
          name
        }
      });
    }
  }

  handleShowAddress(e) {
    const {checked} = e.target;
    this.props.onToggleAddress(checked);
  }

  handleSelectCountry(e) {
    let data = {
      countryId: '',
      country: ''
    };
    if (e.target.value !== '') {
      data = {
        countryId: e.target.value,
        country: {
          id: e.target.value,
          name: this.props.countries.data[this.handleCountrySearch(this.props.countries.data, e.target.value)].name
        },
        stateId: null,
        state: {
          id: null,
          name: ''
        },
        cityId: null,
        city: {
          id: null,
          name: ''
        },
        mobile: '',
        landline: ''
      };
      this.props.clearStates();
      this.props.fetchStates({countryID: e.target.value});
    }
    this.onAddressChange(data);
  }

  handleChangeStreet(e) {
    this.onAddressChange({
      street: e.target.value
    });
  }

  handleChangeArea(e) {
    this.onAddressChange({
      area: e.target.value
    });
  }

  handleChangeZip(e) {
    this.onAddressChange({
      zip: e.target.value
    });
  }

  handleChangeMobile(e) {
    const {value} = e.target;
    this.onAddressChange({
      mobile: value
    });
  }

  handleChangeLandline(e) {
    this.onAddressChange({
      landline: e.target.value
    });
  }

  handleAddressRender(account) {
    const city = (account.city && account.city.id ? account.city.name : null);
    const state = (account.state && account.state.id ? account.state.name : null);
    const country = (account.country && account.country.id ? account.country.name : null);
    return [
      account.street,
      account.area,
      city,
      account.zip,
      state,
      country
    ].filter(e => e).join(', ');
  }

  render() {
    const {p, showAddress, account, billing, label, toggleLabel, submitted} = this.props;
    const stateAutoSuggestInputProps = {
      value: (billing && billing.state && billing.state.name) ? billing.state.name : '',
      onChange: this.handleStateChange,
      placeholder: p.t('CartAddress.statePlaceholder'),
      className: 'uk-form-controls'
    };
    const cityAutoSuggestInputProps = {
      value: (billing && billing.city && billing.city.name) ? billing.city.name : '',
      onChange: this.handleCityChange,
      placeholder: p.t('CartAddress.cityPlaceholder'),
      className: 'uk-form-controls field-required'
    };
    const country = this.props.countries.data.find(i => i.id === (billing && billing.countryId ? billing.countryId : ''));
    if (notNull(country)) {
      billing.countryCode = country.isoCode;
    }
    const number = notNull(billing) && notNull(billing.mobile) && billing.mobile.length > 1 ? phoneUtil.parseAndKeepRawInput(billing.mobile, notNull(billing.countryCode) ? billing.countryCode : 'US') : null;
    const defaultNumber = phoneUtil.parseAndKeepRawInput(appConstants.defaultPhone, notNull(billing.countryCode) ? billing.countryCode : 'US');
    const mobile = notNull(number) ? phoneUtil.format(number, PNF.INTERNATIONAL) : '';
    billing.formattedMobile = notNull(mobile) ? mobile.substr(mobile.indexOf(' ') + 1) : '';
    const countryCode = notNull(number) ? number.getCountryCode() : defaultNumber.getCountryCode();
    const number2 = notNull(billing) && notNull(billing.landline) && billing.landline.length > 1 ? phoneUtil.parseAndKeepRawInput(billing.landline, notNull(billing.countryCode) ? billing.countryCode : 'US') : null;
    const landline = notNull(number2) ? phoneUtil.format(number2, PNF.INTERNATIONAL) : '';
    billing.formattedLandline = notNull(landline) ? landline.substr(landline.indexOf(' ') + 1) : '';
    const accountValidation = validateAddress({...billing, formattedLandline: billing.formattedLandline, formattedMobile: billing.formattedMobile});
    return (
      <div className="cl-sd-address-outer">
        <h4>{label}</h4>
        {notNull(account) && notNull(account.country) && notNull(account.country.id) && <address>{this.handleAddressRender(account)}</address>}
        {notNull(account) && notNull(account.country) && notNull(account.country.id) && (
          <div className="tandc">
            <input type="checkbox" onClick={this.handleShowAddress} id={label} checked={showAddress}/>
            <label htmlFor={label}><span>{toggleLabel}</span></label>
          </div>
        )}
        {
          showAddress && (
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                <div className={accountValidation.countryId.required === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label>{p.t('AccountDetails.country')}</label>
                  <select className="uk-form-controls field-required" onChange={this.handleSelectCountry} value={billing.countryId}>
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
                  <label>{p.t('CartAddress.state')}</label>
                  <AutoSuggetion
                    list={this.props.states.data}
                    inputProps={stateAutoSuggestInputProps}
                    onSelectSuggetion={this.handleStateSelected}
                    onSuggestionHighlighted={this.handleStateHighlighted}
                  />
                  <span className="error-text">{p.t('CartAddress.validation_messages.stateID')}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
                <div className={accountValidation.city.required === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label>{p.t('CartAddress.city')}</label>
                  <AutoSuggetion
                    list={this.props.cities.data}
                    inputProps={cityAutoSuggestInputProps}
                    onSelectSuggetion={this.handleCitySelected}
                    onSuggestionHighlighted={this.handleCityHighlighted}
                  />
                  <span className="error-text">{p.t('CartAddress.validation_messages.city')}</span>
                </div>
              </div>
            </div>)
        }
        {showAddress && (
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
              <div className={accountValidation.street.required === false && submitted ? 'field-holder error' : 'field-holder'}>
                <label>{p.t('CartAddress.streetAddress')}</label>
                <div className="uk-autocomplete cl-sd-cityDropdownhead" data-uk-autocomplete="{source:'../../resources/assets/jsons/street-address.json'}">
                  <input type="text" name placeholder={p.t('CartAddress.streetAddressExample')} className="uk-form-controls field-required" onChange={this.handleChangeStreet} value={billing.street} autoComplete="off"/>
                  <div className="uk-dropdown" aria-expanded="false"/>
                </div>
                <span className="error-text">{p.t('CartAddress.validation_messages.street')}</span>
              </div>
            </div>
            {/* <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
              <div className={accountValidation.area.required === false && submitted ? 'field-holder error' : 'field-holder'}>
                <label>{p.t('CartAddress.area')}</label>
                <div className="uk-autocomplete cl-sd-cityDropdownhead" data-uk-autocomplete="{source:'../../resources/assets/jsons/street-address.json'}">
                  <input type="text" name placeholder={p.t('CartAddress.areaExample')} className="uk-form-controls field-required" onChange={this.handleChangeArea} value={billing.area} autoComplete="off"/>
                  <div className="uk-dropdown" aria-expanded="false"/>
                </div>
                <span className="error-text">{p.t('CartAddress.validation_messages.area')}</span>
              </div>
            </div> */}
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
              <div className={(accountValidation.zip.required === false || accountValidation.zip.valid === false || accountValidation.zip.maxLength === false) && submitted ? 'field-holder error' : 'field-holder'}>
                <label>{p.t('CartAddress.zipCode')}</label>
                <input type="text" name placeholder={p.t('CartAddress.zipCodeExample')} className="uk-form-controls field-required" onChange={this.handleChangeZip} value={billing.zip}/>
                <span className="error-text">{accountValidation.zip.required === false ? p.t('CartAddress.validation_messages.zip.required') : accountValidation.zip.valid === false ? p.t('CartAddress.validation_messages.zip.valid') : p.t('CartAddress.validation_messages.zip.maxLength')}</span>
              </div>
            </div>
          </div>
        )}
        {showAddress && (
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
              <div className={(accountValidation.mobile.required === false || accountValidation.mobile.valid === false) && submitted ? 'field-holder error mb0' : 'field-holder mb0'}>
                <label>{p.t('CartAddress.mobile')}</label>
                <div className="cl-sd-preset">
                  <input type="text" name placeholder={p.t('CartAddress.mobileExample')} className="field-required" onChange={this.handleChangeMobile} value={billing.formattedMobile ? billing.formattedMobile : billing.mobile}/>
                  <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                </div>
                <span className="error-text">{accountValidation.mobile.required === false ? p.t('CartAddress.validation_messages.mobile.required') : p.t('CartAddress.validation_messages.mobile.valid')}</span>
              </div>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 ">
              <div className={(accountValidation.landline.required === false || accountValidation.landline.valid === false) && submitted ? 'field-holder error' : 'field-holder'}>
                <label>{p.t('CartAddress.landline')}</label>
                <div className="cl-sd-preset">
                  <input type="text" name placeholder={p.t('CartAddress.landlineExample')} onChange={this.handleChangeLandline} value={billing.formattedLandline ? billing.formattedLandline : billing.landline}/>
                  <span className="cl-sd-country-code">{countryCode ? '+' + countryCode : ''}</span>
                </div>
                <span className="error-text">{accountValidation.landline.required === false ? p.t('CartAddress.validation_messages.landline.required') : p.t('CartAddress.validation_messages.landline.valid')}</span>
              </div>
            </div>
          </div>
        )
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      cartItems: PropTypes.array.isRequired,
      userProfiles: PropTypes.object.isRequired,
      shoppingCartCheckout: PropTypes.func.isRequired,
      fetchCitiesCountry: PropTypes.func.isRequired,
      fetchStates: PropTypes.func.isRequired,
      fetchCitiesByState: PropTypes.func.isRequired,
      onChangeAddress: PropTypes.func.isRequired,
      onToggleAddress: PropTypes.func.isRequired,
      clearStates: PropTypes.func.isRequired,
      clearCities: PropTypes.func.isRequired,
      toggleLabel: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      submitted: PropTypes.bool.isRequired,
      account: PropTypes.object,
      billing: PropTypes.object.isRequired,
      showAddress: PropTypes.bool.isRequired,
      countries: PropTypes.object.isRequired,
      cities: PropTypes.object.isRequired,
      states: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {countries, states, userProfiles, timezones, cities, profile} = state;
  return {
    countries,
    states,
    timezones,
    cities,
    profile,
    profileId: userProfiles.selectedProfile.id,
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    shoppingCartCheckout: () => dispatch(shoppingCartCheckout()),
    clearStates: () => dispatch(clearStates()),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: country => dispatch(fetchStates(country)),
    clearCities: () => dispatch(clearCities()),
    fetchCitiesByState: params => dispatch(fetchCitiesByState(params)),
    fetchCitiesCountry: params => dispatch(fetchCitiesCountry(params))
  };
};

AddressForm.defaultProps = {
  account: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(AddressForm)));
/* eslint react/no-deprecated: 0 */
/* eslint complexity: 0 */

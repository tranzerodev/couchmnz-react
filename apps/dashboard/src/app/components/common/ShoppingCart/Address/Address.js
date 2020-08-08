import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import PaymentProgressBar from '../PaymentProgressBar';
import ViewOrder from '../View/Order';

import appConstants from '../../../../constants/appConstants';
import PaymentSummary from '../Edit/PaymentSummary';
import {shoppingCartCheckout, fetchCountries, fetchBillingAddress, updateBillingAddress, fetchStates, fetchCitiesCountry} from '../../../../actions';
import {SHOPPING_CART_EDIT, SHOPPING_CART_PAYMENT} from '../../../../constants/pathConstants';
import {validateAddress} from '../../../../validators/common/address';
import {FULFILLED, PENDING} from '../../../../constants/ActionTypes';
import AddressForm from './AddressForm';
import {notNull} from '../../../../validators/common/util';
import {shoppingCartProfileType} from '../../../../validators/common/shoppingCart';

const {isDependentFlag} = appConstants.shoppingCart;

import AthleteNavBar from '../../../athlete/dashboard/NavBar';
import ParentNavBar from '../../../parent/dashboard/NavBar';

class Address extends Component {
  constructor(props) {
    super(props);
    this.renderOrders = this.renderOrders.bind(this);
    this.getUserProfilesData = this.getUserProfilesData.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handleSubmitBillingAddress = this.handleSubmitBillingAddress.bind(this);
    this.handleToggleBillingAddress = this.handleToggleBillingAddress.bind(this);
    // This.handleSubmitShippingAddress = this.handleSubmitShippingAddress.bind(this);
    // This.handleToggleShippingAddress = this.handleToggleShippingAddress.bind(this);
    this.handleSetBillingAddress = this.handleSetBillingAddress.bind(this);
    // This.handleSetShippingAddress = this.handleSetShippingAddress.bind(this);
    const {billingAddress/* , shippingAddress */} = props;
    this.state = {
      accountAddress: billingAddress.status === FULFILLED && notNull(billingAddress.data) && notNull(billingAddress.data.account) && notNull(billingAddress.data.account.country) && notNull(billingAddress.data.account.country.id) ? billingAddress.data.account : null,
      billingAddress: billingAddress.status === FULFILLED && notNull(billingAddress.data) && billingAddress.data.canOverrideBillingAddress === appConstants.yes ? billingAddress.data.billing : {
        id: null,
        landline: null,
        mobile: null,
        street: null,
        area: null,
        city: {
          id: null,
          name: null
        },
        state: {
          id: null,
          name: null
        },
        country: {
          id: null,
          name: null
        },
        zip: null,
        isModified: false
      },
      // ShippingAddress: shippingAddress.status === FULFILLED ? shippingAddress.data : {},
      // newShippingAddress: {
      //   id: null,
      //   landline: null,
      //   mobile: null,
      //   street: null,
      //   area: null,
      //   cityId: null,
      //   city: null,
      //   stateId: null,
      //   state: null,
      //   countryId: null,
      //   country: null,
      //   zip: null,
      //   isModified: false
      // },
      showBillingAddress: billingAddress.status === FULFILLED ? billingAddress.data.canOverrideBillingAddress === appConstants.yes ? true : !(notNull(billingAddress.data.account) && notNull(billingAddress.data.account.country) && notNull(billingAddress.data.account.country.id)) : false,
      showShippingAddress: false
    };
  }

  handleSetBillingAddress(address) {
    if (notNull(address)) {
      const {canOverrideBillingAddress, account, billing} = address;
      const accountAddress = notNull(account) && notNull(account.country) && notNull(account.country.id) ? {...account,
        countryId: account.country.id,
        stateId: account.state.id,
        cityId: account.city.id
      } : {};
      const billingAddress = canOverrideBillingAddress === appConstants.yes ? {
        ...billing,
        countryId: billing.country.id,
        stateId: billing.state.id,
        cityId: billing.city.id
      } : {};
      const showBillingAddress = canOverrideBillingAddress === appConstants.yes ? true : !(notNull(account) && notNull(account.country) && notNull(account.country.id));

      this.setState({
        accountAddress,
        billingAddress,
        showBillingAddress
      });
      const countryID = notNull(billing) ? billing.country.id : null;
      if (notNull(countryID)) {
        this.props.fetchStates({countryID});
        this.props.fetchCitiesCountry({id: countryID});
      }
    }
  }

  // HandleSetShippingAddress(shippingAddress) {
  //   this.setState({shippingAddress});
  // }

  componentWillReceiveProps(nextProps) {
    const {showBillingAddress, showShippingAddress, submitted} = this.state;
    if (this.props.billingAddress.status === PENDING && nextProps.billingAddress.status === FULFILLED) {
      this.handleSetBillingAddress(nextProps.billingAddress.data);
    }
    // If (this.props.shippingAddress.status === PENDING && nextProps.shippingAddress.status === FULFILLED) {
    //   this.handleSetShippingAddress(nextProps.shippingAddress.data);
    // }
    if (showBillingAddress && showShippingAddress) {
      if (nextProps.billingAddress.saveStatus === FULFILLED && nextProps.shippingAddress.saveStatus === FULFILLED && submitted) {
        this.props.history.push(SHOPPING_CART_PAYMENT);
      }
    } else if (showBillingAddress) {
      if (this.props.billingAddress.saveStatus === PENDING && nextProps.billingAddress.saveStatus === FULFILLED && submitted) {
        this.props.history.push(SHOPPING_CART_PAYMENT);
      }
    } else if (showShippingAddress) {
      if (this.props.shippingAddress.saveStatus === PENDING && nextProps.shippingAddress.saveStatus === FULFILLED && submitted) {
        this.props.history.push(SHOPPING_CART_PAYMENT);
      }
    } else if (this.props.billingAddress.saveStatus === PENDING && nextProps.billingAddress.saveStatus === FULFILLED && submitted) {
      this.props.history.push(SHOPPING_CART_PAYMENT);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.countries.status !== FULFILLED && this.props.countries.status !== PENDING) {
      this.props.fetchCountries();
    }
    if (this.props.billingAddress.status !== PENDING) {
      const {profileType} = this.props;
      this.props.fetchBillingAddress(profileType);
    } else if (this.props.billingAddress.status === FULFILLED) {
      const {billingAddress} = this.props;
      const {canOverrideBillingAddress, billing} = billingAddress.data;
      const countryID = canOverrideBillingAddress === appConstants.yes && notNull(billing) ? billing.country.id : null;
      if (notNull(countryID)) {
        this.props.fetchStates({countryID});
        this.props.fetchCitiesCountry({id: countryID});
      }
    }
    // If (this.props.shippingAddress.status !== PENDING) {
    //   const {profileId} = this.props;
    //   this.props.fetchShippingAddress(profileId);
    // }
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

  handlePush() {
    const {showBillingAddress, billingAddress, /* newShippingAddress, */showShippingAddress} = this.state;
    const {profileType} = this.props;
    const billingAddressValidation = validateAddress(billingAddress);
    // Const shippingAddressValidation = validateAddress(newShippingAddress);
    this.setState({billingAddressValidation, submitted: true});
    if (showBillingAddress) {
      if (billingAddressValidation.valid) {
        this.props.updateBillingAddress(profileType, {billing: billingAddress, canOverrideBillingAddress: appConstants.yes});
      }
    }
    // If (showShippingAddress) {
    //   if (shippingAddressValidation.valid) {
    //     this.props.updateShippingAddress(profileId, newShippingAddress);
    //   }
    // }
    if (showBillingAddress === false && showShippingAddress === false) {
      this.props.updateBillingAddress(profileType, {canOverrideBillingAddress: appConstants.no});
    }
  }

  handleSubmitBillingAddress(billingAddress) {
    this.setState({billingAddress: {...billingAddress, isModified: true}});
  }

  handleToggleBillingAddress(showBillingAddress) {
    this.setState({showBillingAddress, submitted: false});
  }

  // HandleSubmitShippingAddress(newShippingAddress) {
  //   this.setState({newShippingAddress: {...newShippingAddress, isModified: true}});
  // }

  // handleToggleShippingAddress(showShippingAddress) {
  //   this.setState({showShippingAddress, submitted: false});
  // }

  render() {
    const {p} = this.props;
    const {accountAddress, billingAddress, showBillingAddress, /* shippingAddress, newShippingAddress, showShippingAddress, */submitted} = this.state;
    return (
      <div>
        {this.props.userProfiles.selectedProfile.displayName == 'Parent' ? 
          <ParentNavBar /> : <AthleteNavBar /> }
        <section className="cl-sd-shopping-cart-header">
          <div className="cl-sd-wrapper">
            <div className="cl-sd-row">
              <h1>{p.t('CartAddress.title')}</h1>
              <p>{p.t('CartAddress.message')}</p>
            </div>
          </div>
        </section>
        <section className="cl-sd-shopping-cart-body">
          <div className="cl-sd-row">
            <div className="cl-sd-col-shoppingMain">
              <div className="cl-sd-wrapper">
                <PaymentProgressBar
                  completedSteps={2}
                />
                <div className="cl-sd-shoppingContent-general">
                  <AddressForm
                    label={p.t('CartAddress.billingAddress')}
                    toggleLabel={p.t('CartAddress.differentBillingAddress')}
                    account={accountAddress}
                    billing={billingAddress}
                    submitted={submitted}
                    showAddress={showBillingAddress}
                    onChangeAddress={this.handleSubmitBillingAddress}
                    onToggleAddress={this.handleToggleBillingAddress}
                  />
                  {/* <AddressForm
                    label={p.t('CartAddress.shippingAddress')}
                    toggleLabel={p.t('CartAddress.differentShippingAddress')}
                    address={shippingAddress}
                    newAddress={newShippingAddress}
                    submitted={submitted}
                    showAddress={showShippingAddress}
                    onChangeAddress={this.handleSubmitShippingAddress}
                    onToggleAddress={this.handleToggleShippingAddress}
                  /> */}
                </div>

                <div className="btn-grp">
                  <a onClick={this.handlePush} className="general_btn">{p.t('CartAddress.continue')}</a>
                </div>

              </div>
            </div>
            {
              this.renderPaymentSummary()
            }
          </div>
        </section>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      cartItems: PropTypes.array.isRequired,
      userProfiles: PropTypes.object.isRequired,
      shoppingCartCheckout: PropTypes.func.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      billingAddress: PropTypes.object.isRequired,
      shippingAddress: PropTypes.object.isRequired,
      profileType: PropTypes.string.isRequired,
      fetchStates: PropTypes.func.isRequired,
      fetchCitiesCountry: PropTypes.func.isRequired,
      fetchBillingAddress: PropTypes.func.isRequired,
      updateBillingAddress: PropTypes.func.isRequired,
      // FetchShippingAddress: PropTypes.func.isRequired,
      // updateShippingAddress: PropTypes.func.isRequired,
      countries: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {countries, states, shoppingCart, userProfiles, cities, profile} = state;
  const {cartData, billingAddress} = shoppingCart;
  return {
    countries,
    states,
    billingAddress,
    // ShippingAddress,
    cities,
    profile,
    profileType: shoppingCartProfileType(userProfiles.data),
    cartItems: cartData.data.cartItems,
    shoppingCartGetStatus: cartData.status ? cartData.status : '',
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    shoppingCartCheckout: () => dispatch(shoppingCartCheckout()),
    fetchCountries: () => dispatch(fetchCountries()),
    // FetchShippingAddress: id => dispatch(fetchShippingAddress(id)),
    fetchBillingAddress: type => dispatch(fetchBillingAddress(type)),
    fetchStates: params => dispatch(fetchStates(params)),
    fetchCitiesCountry: params => dispatch(fetchCitiesCountry(params)),
    // UpdateShippingAddress: (id, data) => dispatch(updateShippingAddress(id, data)),
    updateBillingAddress: (id, data) => dispatch(updateBillingAddress(id, data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(Address)));
/* eslint react/no-deprecated: 0 */
/* eslint complexity: 0 */

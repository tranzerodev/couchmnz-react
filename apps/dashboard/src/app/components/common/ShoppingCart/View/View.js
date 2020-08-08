import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import PaymentProgressBar from '../PaymentProgressBar';
import ViewOrder from './Order';
import appConstants from '../../../../constants/appConstants';
import PaymentSummary from '../Edit/PaymentSummary';
import {shoppingCartCheckout} from '../../../../actions';
import {SHOPPING_CART_EDIT, SHOPPING_CART_ADDRESS} from '../../../../constants/pathConstants';

const {isDependentFlag} = appConstants.shoppingCart;

import AthleteNavBar from '../../../athlete/dashboard/NavBar';
import ParentNavBar from '../../../parent/dashboard/NavBar';

class ShoppingCartView extends Component {
  constructor(props) {
    super(props);
    this.renderOrders = this.renderOrders.bind(this);
    this.getUserProfilesData = this.getUserProfilesData.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.getTotalItems = this.getTotalItems.bind(this);
  }

  handleSubmitForm() {
    this.props.history.push(SHOPPING_CART_ADDRESS);
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

  getTotalItems() {
    let itemCount = 0;
    const {cartItems} = this.props;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].orderItems.length) {
        itemCount += cartItems[i].orderItems.length;
      }
    }
    return itemCount;
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
        onSubmit={this.handleSubmitForm}
        continueLink={SHOPPING_CART_EDIT}
        continueButtonText={this.props.p.t('ViewCart.edit')}
      />
    );
  }

  render() {
    const {p} = this.props;
    return (
      <div>
        {this.props.userProfiles.selectedProfile.displayName == 'Parent' ? 
          <ParentNavBar /> : <AthleteNavBar /> }
        <section className="cl-sd-shopping-cart-header">
          <div className="cl-sd-wrapper">
            <div className="cl-sd-row">
              <div className="cl-sd-leftCol">
                <h1>{p.t('ViewCart.confirm_order')}</h1>
                <p>{p.t('ViewCart.you_have_total')} <strong>{this.getTotalItems()}</strong> {p.t('ViewCart.items')}</p>
              </div>
              <div className="cl-sd-rightCol"/>
            </div>
          </div>
        </section>
        <section className="cl-sd-shopping-cart-body">
          <div className="cl-sd-row">
            <div className="cl-sd-col-shoppingMain">
              <div className="cl-sd-wrapper">
                <PaymentProgressBar
                  completedSteps={1}
                />
                <div className="cl-sd-CodeOuter">
                  {
                    this.renderOrders()
                  }
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
      history: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      shoppingCartCheckout: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {shoppingCart, userProfiles} = state;
  const {cartData} = shoppingCart;
  return {
    cartItems: cartData.data.cartItems,
    shoppingCartGetStatus: cartData.status ? cartData.status : '',
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    shoppingCartCheckout: () => dispatch(shoppingCartCheckout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(ShoppingCartView)));

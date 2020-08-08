import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch, Route, Redirect, NavLink} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {StripeProvider} from 'react-stripe-elements';
import config from '../../../../../config';
import {
  Elements
} from 'react-stripe-elements';

import {
  SHOPPING_CART_PAYMENT_CARD,
  SHOPPING_CART_PAYMENT_ADD_CARD,
  SHOPPING_CART_PAYMENT_SAVED_CARDS
} from '../../../../../constants/pathConstants';

import NewCard from './NewCard';
import SavedCards from './SavedCards';
import {fetchPaymentDeatils} from '../../../../../actions';
import {notFetched} from '../../../../../validators/common/util';
import {PENDING, FULFILLED} from '../../../../../constants/ActionTypes';
import {shoppingCartProfileType} from '../../../../../validators/common/shoppingCart';

const {payment} = config;

class CardPayment extends Component {
  constructor(props) {
    super(props);
    this.getRedirectUrl = this.getRedirectUrl.bind(this);
    this.renderNewCard = this.renderNewCard.bind(this);
    this.renderSavedCards = this.renderSavedCards.bind(this);
    this.state = {stripe: null};
  }

  componentDidMount() {
    const {paymentDetailsStatus, profileType} = this.props;
    if (window.Stripe) {
      this.setState({stripe: window.Stripe(payment.stripe.apiKey)});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({stripe: window.Stripe(payment.stripe.apiKey)});
      });
    }
    if (notFetched(paymentDetailsStatus)) {
      this.props.fetchPaymentDeatils(profileType);
    }
  }

  componentDidUpdate(preProps) {
    const {paymentDetailsStatus} = this.props;
    if (preProps.paymentDetailsStatus === PENDING && paymentDetailsStatus === FULFILLED) {
      const {paymentDetailsData} = this.props;
      if (paymentDetailsData.savedCards.length > 0) {
        this.props.history.push(SHOPPING_CART_PAYMENT_SAVED_CARDS);
      }
    }
  }

  getRedirectUrl() {
    const {paymentDetailsData} = this.props;
    if (paymentDetailsData.savedCards.length > 0) {
      return SHOPPING_CART_PAYMENT_SAVED_CARDS;
    }
    return SHOPPING_CART_PAYMENT_ADD_CARD;
  }
  renderSavedCards() {
    const {canUseWallet, useRewardPoint, rewardPoints, transaction} = this.props;
    return (
      <Elements>
        <SavedCards
          canUseWallet={canUseWallet}
          useRewardPoint={useRewardPoint}
          rewardPoints={rewardPoints}
          transactionId={transaction.transactionId}
        />
      </Elements>

    );
  }
  renderNewCard() {
    const {canUseWallet, useRewardPoint, rewardPoints, transaction} = this.props;
    return (
      <NewCard
        canUseWallet={canUseWallet}
        useRewardPoint={useRewardPoint}
        rewardPoints={rewardPoints}
        transactionId={transaction.transactionId}
      />
    );
  }

  render() {
    const {p, paymentDetailsData} = this.props;
    const showSavedCardTabs = paymentDetailsData.savedCards.length > 0;
    return (
      <div className="cl-sd-cardTab-outer active">
        <ul className="cl-sd-cardNav">
          <li><NavLink to={SHOPPING_CART_PAYMENT_ADD_CARD}>{p.t('CardPayment.new_card')}</NavLink></li>
          {showSavedCardTabs &&
          <li><NavLink to={SHOPPING_CART_PAYMENT_SAVED_CARDS}>{p.t('CardPayment.saved_cards')}</NavLink></li>
          }
        </ul>
        <StripeProvider stripe={this.state.stripe}>
          <Switch>
            <Route path={SHOPPING_CART_PAYMENT_ADD_CARD} render={this.renderNewCard}/>
            <Route path={SHOPPING_CART_PAYMENT_SAVED_CARDS} render={this.renderSavedCards}/>
            <Redirect exact from={SHOPPING_CART_PAYMENT_CARD} to={this.getRedirectUrl()}/>
          </Switch>
        </StripeProvider>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchPaymentDeatils: PropTypes.func.isRequired,
      paymentDetailsStatus: PropTypes.string.isRequired,
      paymentDetailsData: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      profileType: PropTypes.string.isRequired,
      canUseWallet: PropTypes.bool.isRequired,
      useRewardPoint: PropTypes.bool.isRequired,
      rewardPoints: PropTypes.number.isRequired,
      transaction: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPaymentDeatils: type => dispatch(fetchPaymentDeatils(type))
  };
};

const mapStateToProps = state => {
  const {payment, userProfiles} = state;
  const {paymentDetails} = payment;
  return {
    paymentDetailsStatus: paymentDetails.status,
    paymentDetailsData: paymentDetails.data,
    profileType: shoppingCartProfileType(userProfiles.data)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(CardPayment)));

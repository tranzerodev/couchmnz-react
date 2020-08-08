import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {withRouter} from 'react-router-dom';
import {PulseLoader} from 'react-spinners';

import PaymentProgressBar from '../PaymentProgressBar';
import PaymentOptions from './PaymentOptions';
import WalletPaymentSummary from '../Edit/WalletPaymentSummary';
import Wallet from '../wallet';

import {fetchPaymentDeatils} from '../../../../actions/index';
import {notEmpty} from '../../../../validators/common/util';
import {FULFILLED, PENDING} from '../../../../constants/ActionTypes';
import PaymentModeSwitch from './PaymentModeSwitch';
import {shoppingCartProfileType} from '../../../../validators/common/shoppingCart';
import {SHOPPING_CART} from '../../../../constants/pathConstants';

import AthleteNavBar from '../../../athlete/dashboard/NavBar';
import ParentNavBar from '../../../parent/dashboard/NavBar';

class PaymentMode extends Component {
  constructor(props) {
    super(props);
    const {location} = this.props;
    const {state} = location;
    this.state = {
      useRewardPoint: false,
      canUseWallet: true,
      rewardPoint: this.props.paymentDetailsData && this.props.paymentDetailsData.rewardPoint ? this.props.paymentDetailsData.rewardPoint : 0,
      remainingAmount: 0,
      locationData: state ? state : {}
    };
    this.renderPaymentSummary = this.renderPaymentSummary.bind(this);
    this.canDisplayCard = this.canDisplayCard.bind(this);
    this.walletOptionChange = this.walletOptionChange.bind(this);
    this.redeemOptionChange = this.redeemOptionChange.bind(this);
    this.rewardPointChange = this.rewardPointChange.bind(this);
    this.getRemainingAmount = this.getRemainingAmount.bind(this);
    this.renderPaymentError = this.renderPaymentError.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {paymentDetailsStatus, profileType} = this.props;
    const {locationData} = this.state;
    let query = '?';
    if (locationData.transactionId) {
      query += 'transactionId=' + locationData.transactionId;
    }
    this.props.fetchPaymentDeatils(profileType, query);
    if (paymentDetailsStatus === FULFILLED) {
      this.setRewardPoints();
    }
  }

  componentDidUpdate(preProps) {
    const {paymentDetailsStatus, paymentDetailsData} = this.props;
    if (preProps.paymentDetailsStatus === PENDING && paymentDetailsStatus === FULFILLED) {
      if (paymentDetailsData.totalAmount <= 0) {
        this.props.history.push(SHOPPING_CART);
      }
      // This.setRewardPoints();
    }
  }

  renderPaymentSummary() {
    const {locationData} = this.state;
    return (
      <WalletPaymentSummary
        key="PaymentSummary"
        continueButtonText={this.props.p.t('PaymentSummary.continue_shopping')}
        hideButtons
        remainingAmount={this.getRemainingAmount}
        rewardPoints={this.state.rewardPoint}
        canUseWallet={this.state.canUseWallet}
        useRewardPoint={this.state.useRewardPoint}
        paymentDetailsData={this.props.paymentDetailsData}
        transactionId={locationData.transactionId}
      />
    );
  }

  walletOptionChange(event) {
    const {target} = event;
    this.setState({canUseWallet: target.checked});
  }

  redeemOptionChange(event) {
    const {target} = event;
    this.setState({useRewardPoint: target.checked});
  }

  rewardPointChange(event) {
    const {target} = event;
    const {rewardPoints} = this.props.paymentDetailsData;
    if (notEmpty(target.value)) {
      if (target.value <= rewardPoints) {
        this.setState({rewardPoint: parseInt(target.value, 10)});
      }
    } else {
      this.setState({rewardPoint: 0});
    }
  }

  canDisplayCard() {
    const amountToDeduct = this.getRemainingAmount();
    if (amountToDeduct > 0) {
      return true;
    }
    return false;
  }

  getAmountTodeduct() {
    const {paymentDetailsData} = this.props;
    if (paymentDetailsData && paymentDetailsData.walletBalance) {
      if (paymentDetailsData.totalAmount < paymentDetailsData.walletBalance) {
        return (paymentDetailsData.totalAmount - paymentDetailsData.walletBalance);
      }
    }
    return 0;
  }

  getRemainingAmount() {
    const {canUseWallet} = this.state;
    const {paymentDetailsData} = this.props;
    const {totalAmount, walletBalance} = paymentDetailsData;
    if (canUseWallet) {
      if (totalAmount > walletBalance) {
        return totalAmount - walletBalance;
      }
      return 0;
    }
    return totalAmount;
  }

  setRewardPoints() {
    const {paymentDetailsData} = this.props;
    const {rewardPoints} = paymentDetailsData;

    const maxAmountToRedeem = rewardPoints;
    this.setState({rewardPoint: parseInt(maxAmountToRedeem, 10)});
  }

  renderPaymentError() {
    const {locationData} = this.state;
    const {p} = this.props;
    if (locationData.transactionId && locationData.responseCode) {
      return (
        <div className="cl-sd-payment-error mb30">
          <div className="cl-sd-row">
            <div className="cl-sd-leftCol">
              <p>{p.t('PaymentMode.error')} {locationData.responseCode}</p>
              <p>{p.t('paymentErrorCodes.' + locationData.responseCode.toString())}</p>
              <p>{p.t('PaymentMode.transaction_id')} {locationData.transactionId}</p>
            </div>
            <div className="cl-sd-rightCol">
              <p><a>{p.t('PaymentMode.contact_support')}</a></p>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const {p} = this.props;
    const {paymentDetailsStatus} = this.props;
    const {canUseWallet, useRewardPoint, rewardPoint} = this.state;
    const loading = paymentDetailsStatus === PENDING;
    if (paymentDetailsStatus === FULFILLED) {
      return (
        <div>
        {this.props.userProfiles.selectedProfile.displayName == 'Parent' ? 
          <ParentNavBar /> : <AthleteNavBar /> }
          <section className="cl-sd-shopping-cart-header">
            <div className="cl-sd-wrapper">
              <div className="cl-sd-row">
                <h1>{p.t('PaymentMode.make_payment')}</h1>
                <p>{p.t('PaymentMode.select_payment_method')}</p>
              </div>
            </div>
          </section>
          <section className="cl-sd-shopping-cart-body">
            <div className="cl-sd-row">
              <div className="cl-sd-col-shoppingMain">
                <div className="cl-sd-wrapper">
                  <PaymentProgressBar
                    completedSteps={3}
                  />
                  {
                    this.renderPaymentError()
                  }
                  <div className="cl-sd-paymentContent">
                    <h2>{p.t('PaymentMode.payment')}</h2>
                    <p className="pb30">{p.t('PaymentMode.select_your_payment_option')}</p>
                    <Wallet
                      paymentDetailsStatus={this.props.paymentDetailsStatus}
                      paymentDetailsData={this.props.paymentDetailsData}
                      handleRewardValueChange={this.rewardPointChange}
                      rewardPoints={this.state.rewardPoint}
                      canUseWallet={this.state.canUseWallet}
                      handleWalletOptionChange={this.walletOptionChange}
                      handleReedemChange={this.redeemOptionChange}
                      useRewardPoint={this.state.useRewardPoint}
                      remainingAmount={this.getRemainingAmount}
                    />
                    {
                      this.canDisplayCard() &&
                      <PaymentOptions/>
                    }
                  </div>
                  {
                    this.canDisplayCard() &&
                      <PaymentModeSwitch
                        transaction={this.state.locationData}
                        canUseWallet={canUseWallet}
                        useRewardPoint={useRewardPoint}
                        rewardPoints={rewardPoint}
                      />
                  }
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
    return (
      <div className="cl-loader-center">
        <div className="cl-loader">
          <PulseLoader loading={loading} size={10}/>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchPaymentDeatils: PropTypes.func.isRequired,
      paymentDetailsStatus: PropTypes.string.isRequired,
      paymentDetailsData: PropTypes.object.isRequired,
      profileType: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPaymentDeatils: (type, query) => dispatch(fetchPaymentDeatils(type, query))
  };
};

const mapStateToProps = state => {
  const {payment, userProfiles} = state;
  const {paymentDetails} = payment;
  return {
    paymentDetailsStatus: paymentDetails.status,
    paymentDetailsData: paymentDetails.data,
    profileType: shoppingCartProfileType(userProfiles.data),
    userProfiles: userProfiles
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(PaymentMode)));

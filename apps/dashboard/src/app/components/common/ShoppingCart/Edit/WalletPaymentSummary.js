import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';

import config from '../../../../config';
import {notNull} from '../../../../validators/common/util';
import appConstants from '../../../../constants/appConstants';
import {fetchPaymentSummary} from '../../../../actions';

const {shoppingCart} = appConstants;
const {currencyDecimals} = shoppingCart;

function getKey(name, index) {
  return name + index;
}

class WalletPaymentSummary extends Component {
  constructor() {
    super();
    this.renderSsp = this.renderSsp.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.getAmountDeductedFromWallet = this.getAmountDeductedFromWallet.bind(this);
  }

  componentDidMount() {
    const {transactionId} = this.props;
    if (transactionId) {
      this.props.fetchPaymentSummary(transactionId);
    }
  }

  handleContinue() {
    const {continueLink} = this.props;
    if (continueLink) {
      this.props.history.push(continueLink);
    } else {
      window.open(config.sspSearchBaseUrl);
    }
  }

  getAmountDeductedFromWallet() {
    const {paymentDetailsData} = this.props;
    const {totalAmount, walletBalance} = paymentDetailsData;
    if (totalAmount > walletBalance) {
      return walletBalance.toFixed(currencyDecimals);
    }
    return totalAmount.toFixed(currencyDecimals);
  }

  renderSsp() {
    const {p, paymentSummary} = this.props;
    const {t} = p;
    const {ssps} = paymentSummary;
    if (ssps && ssps.length) {
      return ssps.map((ssp, index) =>
        (
          <div key={getKey(ssp.sspName, index)} className="cl-sd-paymentSummary-table">
            <div className="cl-sd-paymentSummary-tableRow bdnone">
              <div className="cl-sd-paymentSummary-tableHead">
                <p><span>{ssp.sspName}</span></p>
              </div>
            </div>
            <div className="cl-sd-paymentSummary-tableRow pt0">
              <div className="cl-sd-paymentSummary-tableCol">
                <p>{t('PaymentSummary.desc', {totalItems: ssp.totalItems, sportsList: ssp.sportNames.join(', ')})}</p>
              </div>
              <div className="cl-sd-paymentSummary-tableCol">
                <p>{t('currency')}{ssp.subTotal.toFixed(currencyDecimals)}</p>
              </div>
            </div>
            <div className="cl-sd-paymentSummary-tableRow cl-sd-taxRow">
              <div className="cl-sd-paymentSummary-tableCol">
                <p>{t('PaymentSummary.tax')}</p>
              </div>
              <div className="cl-sd-paymentSummary-tableCol">
                <p>{t('currency')}{ssp.tax.toFixed(currencyDecimals)}</p>
              </div>
            </div>
            <div className="cl-sd-paymentSummary-tableRow cl-subtotalRow">
              <div className="cl-sd-paymentSummary-tableCol">
                <p><span>{t('PaymentSummary.sub_total')}</span></p>
              </div>
              <div className="cl-sd-paymentSummary-tableCol">
                <p><span>{t('currency')}{ssp.total.toFixed(currencyDecimals)}</span></p>
              </div>
            </div>
          </div>
        )
      );
    }
  }

  render() {
    const {
      p,
      paymentSummary,
      rewardPoints,
      canUseWallet,
      remainingAmount,
      useRewardPoint} = this.props;

    const amountToPay = remainingAmount();

    return (
      <div className="cl-sd-col-shoppingSide">
        <div className="cl-sd-payment-summary">
          <h3>{p.t('ShoppingCart.paymentSummary')}</h3>
          {
            this.renderSsp()
          }
          { notNull(paymentSummary.total) &&
          <div className="cl-sd-paymentSummary-table">
            <div className="cl-sd-paymentSummary-tableRow cl-subtotalRow">
              <div className="cl-sd-paymentSummary-tableCol">
                <p><span>{p.t('PaymentSummary.total_items', {itemCount: paymentSummary.totalItems})}</span></p>
              </div>
              <div className="cl-sd-paymentSummary-tableCol">
                <p>{p.t('currency')}{paymentSummary.total.toFixed(currencyDecimals)}</p>
              </div>
            </div>
          </div>
          }
          { useRewardPoint &&
          <div className="cl-sd-paymentSummary-table">
            <div className="cl-sd-paymentSummary-tableRow redeempointRow">
              <div className="cl-sd-paymentSummary-tableCol">
                <p><span>{p.t('PaymentSummary.redeemReward', {rewardPoints})}</span></p>
              </div>
              <div className="cl-sd-paymentSummary-tableCol">
                <p>- {p.t('currency')}{rewardPoints}</p>
              </div>
            </div>
          </div>
          }
          {canUseWallet &&
          <div className="cl-sd-paymentSummary-table">
            <div className="cl-sd-paymentSummary-tableRow redeempointRow">
              <div className="cl-sd-paymentSummary-tableCol">
                <p><span>{p.t('PaymentSummary.fromWallet')}</span></p>
              </div>
              <div className="cl-sd-paymentSummary-tableCol">
                <p>- ${this.getAmountDeductedFromWallet()}</p>
              </div>
            </div>
          </div>
          }
          <div className="cl-sd-paymentSummary-table">
            <div className="cl-sd-paymentSummary-tableRow totalRow">
              <div className="cl-sd-paymentSummary-tableCol">
                <p><span>{p.t('PaymentSummary.balanceAmount')}</span></p>
              </div>
              <div className="cl-sd-paymentSummary-tableCol">
                <p>${amountToPay.toFixed(currencyDecimals)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.object.isRequired,
      paymentSummary: PropTypes.object.isRequired,
      continueLink: PropTypes.string,
      history: PropTypes.object.isRequired,
      continueButtonText: PropTypes.string.isRequired,
      hideButtons: PropTypes.bool,
      useRewardPoint: PropTypes.bool.isRequired,
      remainingAmount: PropTypes.func.isRequired,
      rewardPoints: PropTypes.number.isRequired,
      paymentDetailsData: PropTypes.object.isRequired,
      canUseWallet: PropTypes.bool.isRequired,
      transactionId: PropTypes.string,
      fetchPaymentSummary: PropTypes.func.isRequired
    };
  }
}

WalletPaymentSummary.defaultProps = {
  continueLink: undefined,
  hideButtons: false,
  transactionId: undefined
};

const mapStateToProps = state => {
  const {shoppingCart} = state;
  const {cartData} = shoppingCart;
  return {
    paymentSummary: cartData.data.paymentSummary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPaymentSummary: transactionId => dispatch(fetchPaymentSummary(transactionId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(WalletPaymentSummary)));

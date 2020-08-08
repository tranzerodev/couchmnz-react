import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';

import config from '../../../../config';
import {notNull} from '../../../../validators/common/util';
import appConstants from '../../../../constants/appConstants';

const {shoppingCart} = appConstants;
const {currencyDecimals} = shoppingCart;

function getKey(name, index) {
  return (name + index);
}

class PaymentSummary extends Component {
  constructor() {
    super();
    this.renderSsp = this.renderSsp.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleContinue() {
    const {continueLink} = this.props;
    if (continueLink) {
      this.props.history.push(continueLink);
    } else {
      window.open(config.sspSearchBaseUrl, '_self');
    }
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
    const {p, paymentSummary, continueButtonText, hideButtons, cartItemCount} = this.props;
    const canProceed = (cartItemCount > 0);
    return (
      <div className="cl-sd-col-shoppingSide">
        <div className="cl-sd-payment-summary">
          <h3>{p.t('ShoppingCart.paymentSummary')}</h3>
          {
            this.renderSsp()
          }
          { notNull(paymentSummary.total) &&
          <div className="cl-sd-paymentSummary-table">
            <div className="cl-sd-paymentSummary-tableRow totalRow">
              <div className="cl-sd-paymentSummary-tableCol">
                <p><span>{p.t('PaymentSummary.total_items', {itemCount: paymentSummary.totalItems})}</span></p>
              </div>
              <div className="cl-sd-paymentSummary-tableCol">
                <p>{p.t('currency')}{paymentSummary.total.toFixed(currencyDecimals)}</p>
              </div>
            </div>
          </div>
          }
          {hideButtons === false &&
          <div className="btn-grp">
            { canProceed &&
            <div className="lCol">
              <a onClick={this.props.onSubmit} className="general_btn">{p.t('ShoppingCart.proceedToCheckout')} </a>
            </div>
            }
            <div className="rCol">
              <a onClick={this.handleContinue} className="transparent_btn">{continueButtonText}</a>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.object.isRequired,
      onSubmit: PropTypes.func,
      paymentSummary: PropTypes.object.isRequired,
      continueLink: PropTypes.string,
      history: PropTypes.object.isRequired,
      continueButtonText: PropTypes.string.isRequired,
      hideButtons: PropTypes.bool,
      cartItemCount: PropTypes.number.isRequired
    };
  }
}

PaymentSummary.defaultProps = {
  continueLink: undefined,
  onSubmit: () => {},
  hideButtons: false
};

const mapStateToProps = state => {
  const {shoppingCart} = state;
  const {cartData} = shoppingCart;
  return {
    paymentSummary: cartData.data.paymentSummary,
    cartItemCount: cartData.data.cartItems.length
  };
};

export default withRouter(connect(mapStateToProps)(translate(PaymentSummary)));

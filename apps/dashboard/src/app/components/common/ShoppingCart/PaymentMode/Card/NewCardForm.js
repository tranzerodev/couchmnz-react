import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {injectStripe} from 'react-stripe-elements';
import pathToRegExp from 'path-to-regexp';
import QueryString from 'query-string';
import {ClipLoader} from 'react-spinners';

import config from '../../../../../config';
import appConstants from '../../../../../constants/appConstants';

const {payment} = appConstants;
const {threeDSecure, types, queryStrings, saveCardFlags} = payment;

function isTrue(flag) {
  return flag ? saveCardFlags.yes : saveCardFlags.no;
}

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements';
import {PAYMENT_REDIRECT_ROUTE} from '../../../../../constants/pathConstants';

class NewCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: {
        error: false,
        message: ''
      },
      submitted: false,
      saveCard: false,
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSavedCardChange = this.handleSavedCardChange.bind(this);
    this.createThreeDSecuredSource = this.createThreeDSecuredSource.bind(this);
    this.getReturnUrl = this.getReturnUrl.bind(this);
    this.getQueryString = this.getQueryString.bind(this);
  }

  handleSavedCardChange(e) {
    this.setState({saveCard: e.target.checked});
  }

  getQueryString() {
    const transactionId = this.props.transactionId;
    const query = {
      [queryStrings.canSaveCard]: isTrue(this.state.saveCard),
      [queryStrings.canUseWallet]: isTrue(this.props.canUseWallet),
      [queryStrings.transactionId]: transactionId
    };
    return '?' + QueryString.stringify(query);
  }

  getReturnUrl(source) {
    const toPath = pathToRegExp.compile(PAYMENT_REDIRECT_ROUTE);
    return config.payment.stripe.returnUrl +
    toPath({type: types.card, sourceId: source.id}) + this.getQueryString();
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({submitted: true, validation: {error: false, message: ''}});
    if (this.props.stripe) {
      this.setState({loading: true});
      this.props.stripe
        .createSource({type: types.card})
        .then(payload => {
          this.setState({loading: false});
          if (payload.error) {
            this.setState({validation: {
              error: true,
              message: payload.error.message
            }});
          } else if (payload.source) {
            const {source} = payload;
            if (source.card.three_d_secure === threeDSecure.options.required) {
              this.createThreeDSecuredSource(source);
            } else {
              const toPath = pathToRegExp.compile(PAYMENT_REDIRECT_ROUTE);
              const returnUrl = toPath({type: types.card, sourceId: source.id});
              this.props.history.push({
                pathname: returnUrl,
                search: this.getQueryString()
              });
            }
          }
        });
    }
  };

  createThreeDSecuredSource(source) {
    const {paymentDetails, canUseWallet} = this.props;
    const {data} = paymentDetails;
    const returnUrl = this.getReturnUrl(source);
    const totalAmount = canUseWallet ? data.totalAmount - data.walletBalance : data.totalAmount;
    const totalAmountInCents = totalAmount * 100;
    this.setState({loading: true});
    this.props.stripe.createSource({
      type: types.threeDSecure,
      amount: totalAmountInCents,
      currency: paymentDetails.data.currency,
      three_d_secure: {
        card: source.id
      },
      redirect: {
        return_url: returnUrl
      }
    }).then(payload => {
      this.setState({loading: false});
      if (payload.error) {
        this.setState({validation: {
          error: true,
          message: payload.error.message
        }});
      } else {
        window.open(payload.source.redirect.url, '_self');
      }
    });
  }

  render() {
    const {validation, submitted, saveCard, loading} = this.state;
    const {p} = this.props;
    const {t} = p;
    return (
      <form onSubmit={this.handleSubmit} className="cl-sd-newCrad" id="cl-sd-newCrad">
        <div className="cl-sd-cardTab">
          <div className="cl-sd-cardTabContent">
            <div className="cl-sd-stripe-form">
              <label>
                {t('NewCardForm.card_number')}
                <CardNumberElement/>
              </label>
              <label>
                {t('NewCardForm.expiration_date')}
                <CardExpiryElement/>
              </label>
              <label>
                {t('NewCardForm.cvc')}
                <CardCVCElement/>
              </label>
              <label>
                {t('NewCardForm.postal_code')}
                <PostalCodeElement/>
              </label>
            </div>
            <div className={'tandc field-holder' + (validation.error && submitted) ? ' error' : ''}>
              <input checked={saveCard} onChange={this.handleSavedCardChange} type="checkbox" name="saveCard" id="save1"/>
              <label htmlFor="save1">{t('NewCardForm.save_this_card')}</label>
              <span className="error-text">{validation.message}</span>
            </div>
          </div>
        </div>
        <div className="btn-grp">
          <button className="general_btn"> {t('NewCardForm.pay_now')}</button>
          <p>
            {t('NewCardForm.p')}
            <a href={config.tosUrl} target="_blank">{t('NewCardForm.tos')}</a>
          </p>
        </div>
        <div className={loading ? 'overlayLoader' : ''}>
          <ClipLoader loading={loading} size={30}/>
        </div>
      </form>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      stripe: PropTypes.object,
      paymentDetails: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      canUseWallet: PropTypes.bool.isRequired,
      useRewardPoint: PropTypes.bool.isRequired,
      rewardPoints: PropTypes.number.isRequired,
      transactionId: PropTypes.string
    };
  }
}

NewCardForm.defaultProps = {
  stripe: undefined,
  transactionId: undefined
};

const mapStateToProps = state => {
  const {payment} = state;
  const {paymentDetails} = payment;
  return {
    paymentDetails
  };
};

export default injectStripe(connect(mapStateToProps)(withRouter(translate(NewCardForm))));

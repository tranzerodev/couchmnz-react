import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import pathToRegExp from 'path-to-regexp';
import QueryString from 'query-string';
import {injectStripe} from 'react-stripe-elements';
import {ClipLoader} from 'react-spinners';

import config from '../../../../../config';
import appConstants from '../../../../../constants/appConstants';
import {PAYMENT_REDIRECT_ROUTE} from '../../../../../constants/pathConstants';

const {payment} = appConstants;
const {threeDSecure, types, queryStrings, saveCardFlags} = payment;

function isTrue(flag) {
  return flag ? saveCardFlags.yes : saveCardFlags.no;
}

class SavedCards extends Component {
  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getQueryString = this.getQueryString.bind(this);
    this.handlePay = this.handlePay.bind(this);
    this.getQueryString = this.getQueryString.bind(this);
    this.createThreeDSecuredSource = this.createThreeDSecuredSource.bind(this);
    this.getReturnUrl = this.getReturnUrl.bind(this);

    this.state = {
      selectedCardId: '',
      loading: false
    };
  }

  handleSelect(e) {
    this.setState({selectedCardId: e.target.value});
  }

  getQueryString() {
    const {canUseWallet, transactionId} = this.props;
    const query = {
      [queryStrings.canUseWallet]: isTrue(canUseWallet),
      [queryStrings.transactionId]: transactionId
    };
    return '?' + QueryString.stringify(query);
  }

  getReturnUrl(source) {
    const toPath = pathToRegExp.compile(PAYMENT_REDIRECT_ROUTE);
    return config.payment.stripe.returnUrl +
    toPath({type: types.card, sourceId: source.id}) + this.getQueryString();
  }

  handlePay() {
    const {paymentDetails} = this.props;
    const {selectedCardId} = this.state;
    if (selectedCardId) {
      const card = paymentDetails.data.savedCards.find(card => selectedCardId === card.id);
      if (card) {
        if (card.threeDSecure === threeDSecure.options.required) {
          this.createThreeDSecuredSource(card);
        } else {
          const toPath = pathToRegExp.compile(PAYMENT_REDIRECT_ROUTE);
          const returnUrl = toPath({type: types.card, sourceId: card.id}) + this.getQueryString();
          this.props.history.push(returnUrl);
        }
      }
    }
  }

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
      this.setState({loading: true});
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

  renderCards() {
    const {paymentDetails, p} = this.props;
    const {selectedCardId} = this.state;
    if (paymentDetails.status === FULFILLED && paymentDetails.data.savedCards.length) {
      return paymentDetails.data.savedCards.map(card =>
        (
          <div key={card.id} className="cl-sd-saveCard-inner">
            <input
              value={card.id}
              onChange={this.handleSelect}
              type="radio"
              checked={selectedCardId === card.id}
              id={card.id}
            />
            <label htmlFor={card.id}>
              <div className="cl-sd-saveCard">
                <div className="tableDiv">
                  <div className="cl-sd-cardNo">
                    <h6>{p.t('SavedCards.card_number')}</h6>
                    <h5>{p.t('SavedCards.last_numbers', {last4: card.last4})}</h5>
                  </div>
                  <div className="cl-sd-cardImg"/>
                </div>
                <div className="tableDiv cl-sd-cardName">
                  <div className="lCol"/>
                  <div className="rCol">
                    <h6>{p.t('SavedCards.expires')}</h6>
                    <p>{p.t('SavedCards.date', {month: card.expMonth, year: card.expYear})}</p>
                  </div>
                </div>
                <div className="tableDiv cl-sd-cvvCode">
                  <div className="field-holder cvv-number">
                    <label>{p.t('SavedCards.security_code')}</label>
                    <input type="password" name="" className="uk-form-controls" placeholder="CVV Number"/>
                  </div>
                  <div className="cl-sc-iconhelp">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-905 -5144 16 16">
                        <g id="icon-help" transform="translate(11581 382)">
                          <path id="BOOKING_SUMMARY" data-name="BOOKING SUMMARY" className="cl-sc-helpicon" d="M9.167-2.976V-1.31a.324.324,0,0,1-.094.24.324.324,0,0,1-.24.094H7.167a.324.324,0,0,1-.24-.094.324.324,0,0,1-.094-.24V-2.976a.324.324,0,0,1,.094-.24.324.324,0,0,1,.24-.094H8.833a.324.324,0,0,1,.24.094A.324.324,0,0,1,9.167-2.976Zm2.667-5.167a2.655,2.655,0,0,1-.156.937,1.9,1.9,0,0,1-.474.719,4.9,4.9,0,0,1-.542.458q-.224.156-.62.375-.333.188-.484.292a1.317,1.317,0,0,0-.271.25.472.472,0,0,0-.12.3v.333a.324.324,0,0,1-.094.24.324.324,0,0,1-.24.094H7.167a.324.324,0,0,1-.24-.094.324.324,0,0,1-.094-.24v-.708a1.991,1.991,0,0,1,.109-.672,1.873,1.873,0,0,1,.25-.495,1.715,1.715,0,0,1,.406-.37,4.277,4.277,0,0,1,.427-.266q.161-.083.464-.219a4.049,4.049,0,0,0,.781-.448.624.624,0,0,0,.229-.51.889.889,0,0,0-.453-.745,1.735,1.735,0,0,0-.995-.307,1.7,1.7,0,0,0-.99.281,4.765,4.765,0,0,0-.833.865.307.307,0,0,1-.26.125.321.321,0,0,1-.2-.063L4.646-8.862a.3.3,0,0,1-.125-.208.318.318,0,0,1,.052-.24,4.061,4.061,0,0,1,3.635-2,3.844,3.844,0,0,1,2.484.932A2.8,2.8,0,0,1,11.833-8.143Zm-1.245-4.135A6.48,6.48,0,0,0,8-12.81a6.48,6.48,0,0,0-2.589.531,6.732,6.732,0,0,0-2.125,1.422A6.732,6.732,0,0,0,1.865-8.731a6.48,6.48,0,0,0-.531,2.589,6.48,6.48,0,0,0,.531,2.589A6.732,6.732,0,0,0,3.286-1.429,6.732,6.732,0,0,0,5.411-.007,6.48,6.48,0,0,0,8,.524a6.48,6.48,0,0,0,2.589-.531,6.732,6.732,0,0,0,2.125-1.422,6.732,6.732,0,0,0,1.422-2.125,6.48,6.48,0,0,0,.531-2.589,6.48,6.48,0,0,0-.531-2.589,6.732,6.732,0,0,0-1.422-2.125A6.732,6.732,0,0,0,10.589-12.278Zm4.339,2.12A7.826,7.826,0,0,1,16-6.143a7.826,7.826,0,0,1-1.073,4.016A7.964,7.964,0,0,1,12.016.784,7.826,7.826,0,0,1,8,1.857,7.826,7.826,0,0,1,3.984.784,7.964,7.964,0,0,1,1.073-2.127,7.826,7.826,0,0,1,0-6.143a7.826,7.826,0,0,1,1.073-4.016A7.964,7.964,0,0,1,3.984-13.07,7.826,7.826,0,0,1,8-14.143a7.826,7.826,0,0,1,4.016,1.073A7.964,7.964,0,0,1,14.927-10.158Z" transform="translate(-12486 -5511.857)"/>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </label>
          </div>
        )
      );
    }
  }

  render() {
    const {p} = this.props;
    const {loading} = this.state;
    return (
      <div id="cl-sd-savedCard">
        <div className="cl-sd-cardTab">
          <div className="cl-sd-cardTabContent">
            <div className="cl-sd-saveCard-outer">
              {
                this.renderCards()
              }
            </div>
          </div>
        </div>
        <div className="btn-grp">
          <a onClick={this.handlePay} className="general_btn">{p.t('SavedCards.pay_now')}</a>
          <p>{p.t('SavedCards.p')} <a href={config.tosUrl} target="_blank">{p.t('SavedCards.tos')}</a></p>
        </div>
        <div className={loading ? 'overlayLoader' : ''}>
          <ClipLoader loading={loading} size={30}/>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      paymentDetails: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      canUseWallet: PropTypes.bool.isRequired,
      useRewardPoint: PropTypes.bool.isRequired,
      rewardPoints: PropTypes.number.isRequired,
      transactionId: PropTypes.string,
      stripe: PropTypes.object
    };
  }
}

SavedCards.defaultProps = {
  transactionId: undefined,
  stripe: undefined
};

const mapStateToProps = state => {
  const {payment} = state;
  const {paymentDetails} = payment;
  return {
    paymentDetails
  };
};

export default connect(mapStateToProps)(withRouter(translate(injectStripe(SavedCards))));

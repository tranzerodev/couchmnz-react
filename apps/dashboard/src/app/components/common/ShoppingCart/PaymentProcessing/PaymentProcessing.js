import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, matchPath} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import pathToRegExp from 'path-to-regexp';

import PaymentSummary from '../Edit/PaymentSummary';
import PaymentProgressBar from '../PaymentProgressBar';
import ConfirmationModal from '../../ConfirmationModal';
import {chargeCard} from '../../../../actions';
import appConstants from '../../../../constants/appConstants';
import {
  PENDING,
  FULFILLED,
  REJECTED
} from '../../../../constants/ActionTypes';
import {
  PAYMENT_REDIRECT_ROUTE,
  SHOPPING_CART_ORDER_CONFIRMATION,
  SHOPPING_CART_PAYMENT,
  SHOPPING_CART
} from '../../../../constants/pathConstants';
import {shoppingCartProfileType} from '../../../../validators/common/shoppingCart';
import {isConfirmationError} from '../../../../validators/common/payment';

import AthleteNavBar from '../../../athlete/dashboard/NavBar';
import ParentNavBar from '../../../parent/dashboard/NavBar';


const {payment} = appConstants;
const {types, queryStrings, saveCardFlags} = payment;

class PaymentProcessing extends Component {
  constructor(props) {
    super(props);

    this.renderPaymentConfirmationModal = this.renderPaymentConfirmationModal.bind(this);
    this.handleCancelPayment = this.handleCancelPayment.bind(this);
    this.handleContinuePayment = this.handleContinuePayment.bind(this);
    this.handlePaymentConfirmationModalOpen = this.handlePaymentConfirmationModalOpen.bind(this);

    this.state = {
      data: null,
      showPaymentConfirmationModal: false,
      responseCode: null
    };
  }

  componentDidUpdate(preProps) {
    const {status, data, responseCode} = this.props.charge;
    const transactionId = data && data.transactionId ? data.transactionId : '';
    const {charge} = preProps;
    if (charge.status === PENDING) {
      if (status === FULFILLED) {
        const toPath = pathToRegExp.compile(SHOPPING_CART_ORDER_CONFIRMATION);
        const returnUrl = toPath({transactionId});
        this.props.history.push(returnUrl);
      } else if (status === REJECTED) {
        if (isConfirmationError(responseCode)) {
          this.handlePaymentConfirmationModalOpen(data, responseCode);
          return;
        }
        const path = {
          pathname: SHOPPING_CART_PAYMENT,
          state: {
            transactionId,
            responseCode
          }
        };
        this.props.history.push(path);
      }
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {query, location, profileType} = this.props;
    const {pathname} = location;
    const match = matchPath(pathname, {path: PAYMENT_REDIRECT_ROUTE, strict: true, exact: true});
    if (match) {
      const sourceId = query[queryStrings.source] ? query[queryStrings.source] : match.params.sourceId;
      const type = match.params.type;
      if (sourceId) {
        if (type === types.card) {
          this.props.chargeCard({
            sourceId: match.params.sourceId,
            threeDSecureSourceId: query[queryStrings.source],
            canSaveCard: query[queryStrings.canSaveCard],
            [queryStrings.transactionId]: query[queryStrings.transactionId],
            canUseWallet: query[queryStrings.canUseWallet]
          }, profileType
          );
        }
      } else if (type === types.wallet) {
        this.props.chargeCard({
          type: types.wallet,
          canUseWallet: saveCardFlags.yes,
          [queryStrings.transactionId]: query[queryStrings.transactionId]
        }, profileType
        );
      }
    }
  }

  handleCancelPayment() {
    this.props.history.push(SHOPPING_CART);
  }

  handleContinuePayment() {
    const {data} = this.state;
    const {profileType} = this.props;
    if (data) {
      this.props.chargeCard(data, profileType);
    }
    this.setState({showPaymentConfirmationModal: false, data: null, responseCode: null});
  }

  handlePaymentConfirmationModalOpen(data, responseCode) {
    this.setState({data, responseCode, showPaymentConfirmationModal: true});
  }

  renderPaymentSummary() {
    return (
      <PaymentSummary
        key="PaymentSummary"
        continueButtonText={this.props.p.t('PaymentSummary.continue_shopping')}
        hideButtons
      />
    );
  }

  renderPaymentConfirmationModal() {
    const {showPaymentConfirmationModal, responseCode} = this.state;
    const {p} = this.props;
    if (showPaymentConfirmationModal) {
      return (
        <ConfirmationModal
          isModalOpen={showPaymentConfirmationModal}
          heading={p.t('ConfirmationModal.confirm')}
          description={p.t('paymentErrorCodes.' + responseCode)}
          onOk={this.handleContinuePayment}
          onCancel={this.handleCancelPayment}
          okButtonLabel={p.t('PaymentProcessing.ok')}
          cancelButtonLabel={p.t('PaymentProcessing.cancel')}
        />
      );
    }
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
              <h1>{p.t('PaymentMode.make_payment')}</h1>
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
                <div className="cl-sd-paymentContent">
                  <h2>{p.t('PaymentProcessing.payment')}</h2>
                  <p className="mb30">{p.t('PaymentProcessing.p')}</p>
                  <div className="cl-sd-shoppingContent-general">
                    <div className="cl-sd-payment-processing">
                      <div className="cl-search-loader">
                        <div className="cl-lds-roller">
                          <div/>
                          <div/>
                          <div/>
                          <div/>
                          <div/>
                          <div/>
                          <div/>
                          <div/>
                        </div>
                        <p>{p.t('PaymentProcessing.processing')}</p>
                      </div>
                      <p>{p.t('PaymentProcessing.p2')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              this.renderPaymentSummary()
            }
          </div>
        </section>
        {
          this.renderPaymentConfirmationModal()
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      location: PropTypes.object.isRequired,
      chargeCard: PropTypes.func.isRequired,
      query: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      charge: PropTypes.object.isRequired,
      profileType: PropTypes.string.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chargeCard: (data, profileType) => dispatch(chargeCard(data, profileType))
  };
};

const mapStateToProps = state => {
  const {payment, router, userProfiles} = state;
  return {
    charge: payment.charge,
    query: router.query,
    profileType: shoppingCartProfileType(userProfiles.data),
    userProfiles: userProfiles
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(PaymentProcessing)));

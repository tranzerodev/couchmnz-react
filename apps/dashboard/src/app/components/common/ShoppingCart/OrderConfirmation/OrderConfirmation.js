import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {PulseLoader} from 'react-spinners';

import PaymentProgressBar from '../PaymentProgressBar';
import {fetchShoppingCartTransactionSummary} from '../../../../actions/index';
import {notNull} from '../../../../validators/common/util';
import {PENDING, FULFILLED} from '../../../../constants/ActionTypes';
import ViewOrder from './Order';
import appConstants from '../../../../constants/appConstants';
import {DASHBOARD} from '../../../../constants/pathConstants';
const {isDependentFlag} = appConstants.shoppingCart;

import AthleteNavBar from '../../../athlete/dashboard/NavBar';
import ParentNavBar from '../../../parent/dashboard/NavBar';


class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.handleTransactionState = this.handleTransactionState.bind(this);
    this.renderRightPanel = this.renderRightPanel.bind(this);
    this.getUserProfilesData = this.getUserProfilesData.bind(this);
    this.getTotalItems = this.getTotalItems.bind(this);
    this.renderOrders = this.renderOrders.bind(this);
    this.state = {};
  }

  componentDidMount() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    const {match} = this.props;
    if (notNull(match) && notNull(match.params) && notNull(match.params.transactionId)) {
      if (this.props.transactionSummary.status !== PENDING && this.props.transactionSummary.status !== FULFILLED) {
        this.props.fetchShoppingCartTransactionSummary(match.params.transactionId);
      }
    } else {
      this.props.history.push(DASHBOARD);
    }
  }

  handleTransactionState(transactionSummary) {
    this.setState({transactionSummary: transactionSummary.data ? transactionSummary.data : {}});
  }

  renderRightPanel() {}

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
    const {transactionSummary} = this.props;
    const {orders} = transactionSummary.data;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].orderItems.length) {
        itemCount += orders[i].orderItems.length;
      }
    }
    return itemCount;
  }

  renderOrders() {
    const {transactionSummary} = this.props;
    const {orders} = transactionSummary.data;
    const dependents = this.getUserProfilesData();

    if (orders.length) {
      return orders.map(order =>
        (
          <ViewOrder
            key={order.sspId}
            order={order}
            dependents={dependents}
          />
        )
      );
    }
  }

  render() {
    const {transactionSummary} = this.props;
    const {t} = this.props.p;
    if (transactionSummary.status === PENDING) {
      return (
        <div className="cl-loader-center">
          <div className="cl-loader">
            <PulseLoader loading={transactionSummary.status === PENDING} size={10}/>
          </div>
        </div>
      );
    }
    return (
      transactionSummary.status === FULFILLED && (
        <div>
        {this.props.userProfiles.selectedProfile.displayName == 'Parent' ? 
          <ParentNavBar /> : <AthleteNavBar /> }
          <section className="cl-sd-shopping-cart-header">
            <div className="cl-sd-wrapper">
              <div className="cl-sd-row">
                <div className="lCol"/>
                <div className="rCol">
                  <h1>{t('OrderConfirmation.success')}</h1>
                  <p>{t('OrderConfirmation.paidAmount', {amount: transactionSummary.data.totalPaid})}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="cl-sd-shopping-cart-body">
            <div className="cl-sd-row">
              <div className="cl-sd-col-shoppingMain">
                <div className="cl-sd-wrapper">
                  <PaymentProgressBar
                    completedSteps={5}
                  />
                  <div className="cl-sd-download-receipt-head">
                    <div className="cl-sd-row">
                      <div className="cl-sd-receiptHead-lCol">
                        <h2>{t('OrderConfirmation.details')}</h2>
                        <h6>{t('OrderConfirmation.transactionID')}: <span>{transactionSummary.data.transactionId}</span></h6>
                      </div>
                      <div className="cl-sd-receiptHead-rCol">
                        <p>{t('OrderConfirmation.paid')}: ${transactionSummary.data.totalPaid}</p>
                      </div>
                    </div>
                  </div>
                  {
                    this.renderOrders()
                  }
                </div>
              </div>
              {this.renderRightPanel()}
            </div>
          </section>
        </div>
      )
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      match: PropTypes.object.isRequired,
      fetchShoppingCartTransactionSummary: PropTypes.func.isRequired,
      userProfiles: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      transactionSummary: PropTypes.object.isRequired
      // P: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchShoppingCartTransactionSummary: transactionId => dispatch(fetchShoppingCartTransactionSummary(transactionId))
  };
};

const mapStateToProps = state => {
  const {shoppingCart, userProfiles} = state;
  const {transactionSummary} = shoppingCart;
  return {
    transactionSummary,
    userProfiles
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(OrderConfirmation)));
/* eslint react/no-deprecated: 0 */

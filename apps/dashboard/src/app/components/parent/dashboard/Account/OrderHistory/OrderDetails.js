import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {fetchParentOrderDetails} from '../../../../../actions/index';
import {DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST} from '../../../../../constants/pathConstants';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {ClipLoader} from 'react-spinners';
import PackageItem from './PackageItem';
import { getSportsNames } from '../../../../../utils/orderHistory';
class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleBack = this.handleBack.bind(this);
    this.renderOrderdetails = this.renderOrderdetails.bind(this);
    this.displayPackageNos = this.displayPackageNos.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }
  componentWillMount() {
    const {selectedProfile, location} = this.props;
    const profileId = selectedProfile.id;
    this.setState({athleteID: profileId});
    if (location.state && location.state.orderId) {
      console.log('ORDER ID', location.state.orderId);
      this.props.fetchParentOrderDetails(location.state.orderId);
    } else {
      this.props.history.push(DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST);
    }
  }
  getClassName(status) {
    let className;
    switch (status.toUpperCase()) {
      case 'P' :
        className = 'cl-sd-green';
        break;
      case 'IP' :
        className = 'cl-sd-orange';
        break;
      case 'D' :
        className = 'cl-sd-red';
        break;
      case 'F' :
        className = 'cl-sd-red';
        break;
      default :
        className = 'cl-sd-green';
    }
    return className;
  }
  handleButton(event) {
    const value = event.currentTarget.getAttribute('value');
    console.log('Value ::: ', value);
    if (value.toUpperCase() === 'F') {
      console.log('Call Url');
    }
  }
  handleBack() {
    this.props.history.push(DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST);
  }
  displayPackageNos() {
    if (this.props.orderDetails.data.orderItems.length) {
      const len = this.props.orderDetails.data.packages.length - 1;
      return (' (' + len + ' other packages )');
    }
  }
  renderOrderdetails() {
    const orderData = this.props.orderDetails.data;
    return (
      <div className="cl-sd-paymentStatus">
        <h4>{this.props.p.t('orderDetails.details')}</h4>
        {
          orderData.packages.map(orderPackage =>
            (
              <PackageItem key={orderPackage.id} orderPackage={orderPackage} priceUnit={orderData.priceUnit}/>
            )
          )
        }
        <hr/>
        <ul>
          <li className="highlight">{this.props.p.t('orderDetails.tax')}</li>
          <li>{orderData.tax && `${orderData.priceUnit}${orderData.tax}`}</li>
        </ul>
        <ul>
          <li className="cl-sd-total highlight">Order Total</li>
          <li className="cl-sd-total">{orderData.priceUnit}{orderData.orderDetails.totalPrice}</li>
        </ul>
      </div>
    );
  }

  render() {
    const order = this.props.orderDetails.data;
    const loading = this.props.orderDetails.status === PENDING;
    const sportNames = getSportsNames(order.sport);
    if (this.props.orderDetails.status === FULFILLED) {
      return (
        <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
          <div className="cl-sd-trainingLocationInner cl-sd-order-history">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 link">
                <a onClick={this.handleBack} className="link"><svg className="cl-icon-arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="-850.061 -5141.531 6.591 11.063">   <g transform="translate(-1065.606 -5996.5)">     <path data-name="Path 150" className="cl-icon-arrow-left-1" d="M-17914.895-2197l5,5,5-5" transform="translate(-1975.395 18770.395) rotate(90)"/>   </g> </svg>
                  {this.props.p.t('orderDetails.backToOrderHistory')}
                </a>
              </div>
            </div>

            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                <h4>{order.orderDetails ? order.orderItems[0].name : ''}</h4> <span >{this.displayPackageNos()}</span>
                <p className="pb25" >{this.props.p.t('orderDetails.sport')}{sportNames.join(', ') } </p>
                {
                  (order.canCompletePayment && order.canCompletePayment.toUpperCase() === 'Y') ? <a onClick={this.handleButton} value={order.orderDetails.status} className="general_btn">{this.props.p.t('orderDetails.button.complete_pay')}</a> : <a/>
                }
                {
                  (order.canContactAdvisor && order.canContactAdvisor.toUpperCase() === 'Y') ? <a onClick={this.handleButton} value={order.orderDetails.status} className="general_btn">{this.props.p.t('orderDetails.button.contact')}</a> : <a/>
                }
                {/*  {
                  (order.canWriteReview.toUpperCase() === 'Y') ? <a onClick={this.handleButton} value="WR" className="general_btn">{this.props.p.t('orderDetails.button.review')}</a> : <a/>
                } */}
                {
                  (order.downloadUrl) ? <a href={order.downloadUrl} value="DR"className="cancel">{this.props.p.t('orderDetails.button.receipt')}</a> : <a/>
                }
                {
                  (order.canReorder && order.canReorder.toUpperCase() === 'Y') ? <a onClick={this.handleButton} value="RO" className="cancel">{this.props.p.t('orderDetails.button.re_order')}</a> : <a/>
                }

              </div>

            </div>

          </div>
          <div className="cl-sd-order-historySec">
            <div className="cl-sd-paymentStatus">
              <h4>{this.props.p.t('orderDetails.summary.title')}</h4>
              <ul>
                <li className="highlight">{this.props.p.t('orderDetails.summary.order_id')}</li>
                <li>{order.orderDetails.number ? order.orderDetails.number : ''}</li>
              </ul>
              <ul>
                <li className="highlight">{this.props.p.t('orderDetails.summary.status')}</li>
                <li className={this.getClassName(order.orderDetails.status)}>{this.props.p.t('OrderHistory.status.' + order.orderDetails.status)}</li>
              </ul>
              <ul>
                <li className="highlight">{this.props.p.t('orderDetails.summary.date_of_order')}</li>
                <li>{order.orderDetails.bookingDate ? moment(order.orderDetails.bookingDate).format('LLL') : ''}</li>
              </ul>
              <ul>
                <li className="highlight">{this.props.p.t('orderDetails.summary.order_total')}</li>
                <li>{order.orderDetails.totalPrice ? `${order.priceUnit}${order.orderDetails.totalPrice}` : ''}</li>
              </ul>
            </div>
            {this.renderOrderdetails()}
            <div className="cl-sd-paymentStatus">
              <h4>{this.props.p.t('orderDetails.payment.title')}</h4>
              <ul>
                <li className="highlight">{this.props.p.t('orderDetails.payment.method')}</li>
                <li>{order.paymentInfo.method ? order.paymentInfo.method : ''}</li>
              </ul>
              <ul>
                <li className="highlight">{this.props.p.t('orderDetails.payment.billing_address')}</li>
                <li>{order.paymentInfo.billingAddress ? order.paymentInfo.billingAddress : ''}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <ClipLoader loading={loading} size={30}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchParentOrderDetails: PropTypes.func.isRequired,
      orderDetails: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchParentOrderDetails: orderID => dispatch(fetchParentOrderDetails({orderID}))
  };
};

const mapStateToProps = state => {
  const {profile, parent, userProfiles} = state;
  const {orderDetails} = parent;
  return {
    orderDetails,
    profile,
    selectedProfile: userProfiles.selectedProfile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(OrderDetails)));

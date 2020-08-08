import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import pathToRegExp from 'path-to-regexp';
import moment from 'moment';

import {DASHBOARD_PROFILE_TYPE_ACCOUNT_ORDER_DETAILS} from '../../../../../constants/pathConstants';

class OrderList extends Component {
  constructor(props) {
    super(props);
    // Const {orderHistoryList} = props;
    this.getLocation = this.getLocation.bind(this);
    this.state = {
      athleteID: ''
    };
    this.displayOrderItems = this.displayOrderItems.bind(this);
  }

  componentDidMount() {
  }
  getClassName(status) {
    let className;
    console.log('Status----', status);
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
  displayOrderItems() {
    const orderHistoryList = this.props.orderHistoryList.data;
    if (orderHistoryList.orders) {
      return (
        <div className="cl-sd-order-historySec">
          {
            orderHistoryList.orders.map(order =>
              (
                <div key={order.id} className="cl-sd-order-historySecOuter" >
                  <div className="cl-sd-order-historySecInner cl-sd-date">
                    <h2>
                      <span> {moment(order.bookingDate).format('MMM')}</span> {moment(order.bookingDate).date()} <span>{moment(order.bookingDate).year()}</span>
                    </h2>
                  </div>
                  <div className="cl-sd-order-historySecInner">
                    <h4><Link to={this.getLocation(order.id)} > {order.name}  </Link></h4>
                    <p><Link to={this.getLocation(order.id)} > Order ID: {order.id} </Link>
                    </p>
                  </div>
                  <div className="cl-sd-order-historySecInner">
                    <h2 className="cl-sd-price">{orderHistoryList.priceUnit}{order.amountPaid}</h2>
                    <h5 className={this.getClassName(order.status)}>{this.props.p.t('OrderHistory.status.' + order.status)}</h5>
                  </div>
                </div>
              )
            )
          }
        </div>
      );
    }
    return (
      <div className="cl-sd-order-historySec"/>
    );
  }

  getLocation(orderId) {
    const {type} = this.props.selectedProfile;
    const toPath = pathToRegExp.compile(DASHBOARD_PROFILE_TYPE_ACCOUNT_ORDER_DETAILS);
    const pathname = toPath({profileType: type});
    return {
      pathname,
      state: {orderId}
    };
  }

  render() {
    return (
      this.displayOrderItems()
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      orderHistoryList: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {athlete, profile, userProfiles} = state;
  const {orderHistory} = athlete;
  const {router} = state;
  const {query} = router;
  return {
    orderHistoryList: orderHistory,
    profile,
    query,
    selectedProfile: userProfiles.selectedProfile
  };
};

export default connect(mapStateToProps)(withRouter(translate(OrderList)));

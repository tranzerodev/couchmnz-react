import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {DASHBOARD_PARENT_ACCOUNT_ORDER_DETAILS} from '../../../../../constants/pathConstants';
import {fetchParentOrderHistory} from '../../../../../actions/index';
import moment from 'moment';

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
    const {selectedProfile} = this.props;
    const profileId = selectedProfile.id;
    this.setState({athleteID: profileId});
    if (this.props.orderHistoryList.status !== FULFILLED && this.props.orderHistoryList.status !== PENDING && this.props.orderHistoryList.status !== REJECTED) {
      this.props.fetchParentOrderHistory(profileId, this.props.query);
    }
  }
  componentWillReceiveProps() {
    // This.props.fetchAthleteOrderHistory(this.state.athleteID);
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
    const orderHistoryList = this.props.orderHistoryList.data.orders;
    return (
      <div className="cl-sd-order-historySec">
        {
          orderHistoryList.map(order =>
            (
              <div key={order.id} className="cl-sd-order-historySecOuter" >
                <div className="cl-sd-order-historySecInner cl-sd-date">
                  <h2>
                    <span> {moment(order.bookingDate).format('MMM')}</span> {moment(order.bookingDate).date()} <span>{moment(order.bookingDate).year()}</span>
                  </h2>
                </div>
                <div className="cl-sd-order-historySecInner">
                  <h4><Link to={this.getLocation(order.id)} > {order.name}  </Link></h4>
                  <p><Link to={this.getLocation(order.id)} > Order ID: {order.number} </Link>
                  </p>
                </div>
                <div className="cl-sd-order-historySecInner">
                  <h2 className="cl-sd-price">{order.amountPaid}</h2>
                  <h5 className={this.getClassName(order.status)}>{this.props.p.t('OrderHistory.status.' + order.status)}</h5>
                </div>
              </div>
            )
          )
        }
      </div>
    );
  }

  getLocation(orderId) {
    return {
      pathname: DASHBOARD_PARENT_ACCOUNT_ORDER_DETAILS,
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
      fetchParentOrderHistory: PropTypes.func.isRequired,
      orderHistoryList: PropTypes.object.isRequired,
      query: PropTypes.object,
      selectedProfile: PropTypes.object.isRequired
    };
  }
}
OrderList.defaultProps = {
  query: {}
};
const mapStateToProps = state => {
  const {parent, profile, userProfiles} = state;
  const {orderHistory} = parent;
  const {router} = state;
  const {query} = router;
  return {
    orderHistoryList: orderHistory,
    profile,
    query,
    selectedProfile: userProfiles.selectedProfile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchParentOrderHistory: (parentID, query) => dispatch(fetchParentOrderHistory(parentID, query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(OrderList)));

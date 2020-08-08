import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import ViewOrderItem from './OrderItem';
import {isValidDate} from '../../../../validators/common/util';
import {downloadFileWithAuth} from '../../../../utils/downloadFile';

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.renderOrderItems = this.renderOrderItems.bind(this);
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
  }

  sortBySession(order, order2) {
    return ((order.attendeeProfileId === order2.attendeeProfileId) && (order.session.id > order2.session.id));
  }

  handleDownloadClick() {
    const {order, p} = this.props;
    const fileName = p.t('OrderConfirmation.coachlist') + order.id + '.pdf';
    downloadFileWithAuth(order.receiptLink, fileName);
  }

  renderOrderItems() {
    const {order, dependents} = this.props;
    const {orderItems} = order;
    if (order && orderItems) {
      const keys = Object.keys(orderItems);
      return keys.map(key =>
        (
          <ViewOrderItem
            key={key}
            dependents={dependents}
            orderItem={orderItems[key]}
          />
        )
      );
    }
  }

  render() {
    const {order} = this.props;
    const {t} = this.props.p;
    return (
      <div className="cl-sd-shoppingContent cl-sd-confirm-order">
        <div className="cl-sd-cartlistHead">
          <div className="cl-sd-row">
            <div className="cl-sd-cart-userImage-container">
              <div className="tableDiv">
                <div className="lCol">
                  <img src={order.ssp.profileImage} alt="Profile Image"/>
                </div>
                <div className="rCol">
                  <h4>{order.ssp.name}</h4>
                </div>
              </div>
            </div>
            <div className="cl-sd-cart-orderDate-container">
              <p>{t('Order.orderDate')}: <span>{isValidDate(order.orderDate) ? moment(order.orderDate).format('ll') : ''}</span></p>
              <p>{t('Order.orderID')}: <span>{order.id}</span></p>
              <p><a onClick={this.handleDownloadClick} >{t('OrderConfirmation.downloadReceipt')}</a></p>
            </div>
          </div>
        </div>
        {
          this.renderOrderItems()
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      order: PropTypes.object.isRequired,
      dependents: PropTypes.array.isRequired
    };
  }
}

export default translate(ViewOrder);

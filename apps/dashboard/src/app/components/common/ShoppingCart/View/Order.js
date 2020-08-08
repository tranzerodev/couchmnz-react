import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import ViewOrderItem from './OrderItem';

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.renderOrderItems = this.renderOrderItems.bind(this);
  }

  renderOrderItems() {
    const {cartItem, dependents} = this.props;
    return cartItem.orderItems.map(orderItem =>
      (
        <ViewOrderItem
          key={orderItem.id}
          dependents={dependents}
          orderItem={orderItem}
        />
      )
    );
  }

  render() {
    const {cartItem} = this.props;
    return (
      <div className="cl-sd-shoppingContent cl-sd-confirm-order">
        <div className="cl-sd-cartlistHead">
          <div className="cl-sd-row">
            <div className="cl-sd-cart-userImage-container">
              <div className="tableDiv">
                <div className="lCol">
                  <img src={cartItem.profileImage} alt="Profile Image"/>
                </div>
                <div className="rCol">
                  <h4>{cartItem.name}</h4>
                </div>
              </div>
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
      cartItem: PropTypes.object.isRequired,
      dependents: PropTypes.array.isRequired
    };
  }
}

export default translate(ViewOrder);

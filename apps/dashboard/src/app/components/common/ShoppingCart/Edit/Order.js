import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {
  SSR_PATH
} from '../../../../constants/pathConstants';

import OrderItem from './OrderItem';

function isChecked(id, list) {
  list.forEach(element => {
    if (element === id) {
      return true;
    }
  });
}

class Order extends Component {
  constructor(props) {
    super(props);
    this.renderOrderItems = this.renderOrderItems.bind(this);
    this.handleCancelationPolicyChange = this.handleCancelationPolicyChange.bind(this);
  }

  handleCancelationPolicyChange(e) {
    const {checked} = e.target;
    this.props.onCancelationPolicyChange(this.props.cartItem.sspId, checked);
  }

  renderOrderItems() {
    const {cartItem, dependents, validation, submitted} = this.props;
    return cartItem.orderItems.map((orderItem, index) =>
      (
        <OrderItem
          key={orderItem.id}
          onChangeProfile={this.props.onChangeProfile}
          dependents={dependents}
          onDelete={this.props.onDeleteModal}
          id={orderItem.id}
          index={index}
          orderItem={orderItem}
          onNumberOfSessionChange={this.props.onNumberOfSessionChange}
          onCancelationPolicyClick={this.handleCancelationPolicyModalOpen}
          onVolumeDiscountModalOpen={this.props.onVolumeDiscountModalOpen}
          validation={validation && validation.for && validation.for[orderItem.id] ? validation.for[orderItem.id] : false}
          submitted={submitted}
          onClone={this.props.onClone}
        />
      )
    );
  }
  render() {
    const {cartItem, p, sspCancellationPolicyMap, validation, submitted} = this.props;
    const {t} = p;
    return (
      <div className="cl-sd-shoppingContent">
        <div className="cl-sd-cartlistHead">
          <div className="cl-sd-row">
            <div className="cl-sd-cart-userImage-container">
              <div className="tableDiv">
                <div className="lCol">
                    <img src={cartItem.profileImage} alt="Profile Image"/>
                </div>
                <div className="rCol">
                  <h4><a href={SSR_PATH(`/instructors/${cartItem.nickname}`)}>{cartItem.name}</a></h4>
                </div>
              </div>
            </div>
            <div className="cl-sd-cart-cancelPolicy-container">
              <div className={'tandc field-holder ' + (submitted && validation.cancelationPolicy === false ? 'error' : '')}>
                <input
                  checked={isChecked(cartItem.sspId, sspCancellationPolicyMap)}
                  onChange={this.handleCancelationPolicyChange}
                  className="optioncheckbox"
                  id={'cp' + cartItem.sspId}
                  type="checkbox"
                />
                <label htmlFor={'cp' + cartItem.sspId}>{t('ShoppingCart.iAgree')}</label>{' '}
                <a
                  data-value={cartItem.cancellationPolicy}
                  onClick={this.props.onCancelationPolicyClick}
                >{t('ShoppingCart.cancellationPolicy')}
                </a>
                <span className="error-text">{p.t('Order.validation_cancelationpolicy')}</span>
              </div>
            </div>
            <div className="cl-sd-cart-delIcon-container">
              <a data-value={cartItem.sspId} onClick={this.props.onDeleteSsp} className="cl-sd-delete">
                <svg className="cl-icon-bin-gray" xmlns="http://www.w3.org/2000/svg" viewBox="-1212 -5145 15.714 17.143">
                  <g transform="translate(-1473.643 -5761.286)">
                    <path data-name="Welcome! What type of profile do you want to set up right now?" className="cl-icon-gray-1" d="M-2.143-8.929V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1h-.714a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H-2.5a.348.348,0,0,1,.257.1A.348.348,0,0,1-2.143-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H-.357a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H.357a.348.348,0,0,1,.257.1A.348.348,0,0,1,.714-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H2.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h.714a.348.348,0,0,1,.257.1A.348.348,0,0,1,3.571-8.929ZM5-.848v-10.58H-5V-.848A1.267,1.267,0,0,0-4.922-.4a1,1,0,0,0,.162.3Q-4.676,0-4.643,0H4.643q.033,0,.117-.095a1,1,0,0,0,.162-.3A1.267,1.267,0,0,0,5-.848ZM-2.5-12.857h5l-.536-1.306a.315.315,0,0,0-.19-.123H-1.763a.315.315,0,0,0-.19.123ZM7.857-12.5v.714a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H6.429V-.848A2.534,2.534,0,0,1,5.9.753a1.556,1.556,0,0,1-1.261.675H-4.643A1.571,1.571,0,0,1-5.9.776,2.442,2.442,0,0,1-6.429-.8V-11.429H-7.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-12.5a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h3.449l.781-1.864a1.546,1.546,0,0,1,.6-.7,1.576,1.576,0,0,1,.882-.29H1.786a1.576,1.576,0,0,1,.882.29,1.546,1.546,0,0,1,.6.7l.781,1.864H7.5a.348.348,0,0,1,.257.1A.348.348,0,0,1,7.857-12.5Z" transform="translate(269.5 632)"/>
                  </g>
                </svg>
              </a>
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
      cartItem: PropTypes.object.isRequired,
      sspCancellationPolicyMap: PropTypes.array.isRequired,
      onCancelationPolicyClick: PropTypes.func.isRequired,
      onDeleteSsp: PropTypes.func.isRequired,
      dependents: PropTypes.array.isRequired,
      onChangeProfile: PropTypes.func.isRequired,
      onNumberOfSessionChange: PropTypes.func.isRequired,
      onDeleteModal: PropTypes.func.isRequired,
      onVolumeDiscountModalOpen: PropTypes.func.isRequired,
      onCancelationPolicyChange: PropTypes.func.isRequired,
      validation: PropTypes.object,
      submitted: PropTypes.bool.isRequired,
      onClone: PropTypes.func.isRequired
    };
  }
}

Order.defaultProps = {
  validation: {}
};

export default withRouter(translate(Order));

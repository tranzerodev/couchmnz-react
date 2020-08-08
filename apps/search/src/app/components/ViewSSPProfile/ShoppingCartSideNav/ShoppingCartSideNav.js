import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import CartItem from './CartItem';
import {updateShoppingCartItems} from '../../../actions/index';
import {getShoppingCartId} from '../../../utils/shoppingCart';
import appConstants from '../../../constants/appConstants';
import ConfirmationModal from '../../common/ConfirmationModal';
import config from '../../../config';
import VolumeDiscountModal from './VolumeDiscount';

const {shoppingCart, userProfileTypes} = appConstants;
const {actions, isDependentFlag} = shoppingCart;

class ShoppingCartSideNav extends Component {
  constructor(props) {
    super(props);
    this.renderCartItems = this.renderCartItems.bind(this);
    this.handleSessionQtyChange = this.handleSessionQtyChange.bind(this);
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleCartDeleteModalClose = this.handleCartDeleteModalClose.bind(this);
    this.handleDeleteElementFromCart = this.handleDeleteElementFromCart.bind(this);
    this.getUserProfilesData = this.getUserProfilesData.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
    this.handleDeleteSchedule = this.handleDeleteSchedule.bind(this);
    this.handleVolumeDiscountModalClose = this.handleVolumeDiscountModalClose.bind(this);
    this.handleVolumeDiscountModalOpen = this.handleVolumeDiscountModalOpen.bind(this);
    this.handleNumberOfSessionsChange = this.handleNumberOfSessionsChange.bind(this);
    this.handleSidePanelToggle = this.handleSidePanelToggle.bind(this);
    this.handleClone = this.handleClone.bind(this);

    this.state = {
      showPackageDeleteModal: false,
      deleteItemid: '',
      showVolumeDiscountModal: false,
      selectedVolumeDiscount: {
        discounts: [],
        itemId: '',
        baseRate: 0,
        offerTerminology: {}
      }
    };
  }

  handleSessionQtyChange(itemId, qty) {
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.update,
        data: {itemId, qty}
      }, cartId);
  }

  handleDeleteModal(packageId) {
    this.setState({showPackageDeleteModal: true, deleteItemid: packageId});
  }

  handleCartDeleteModalClose() {
    this.setState({showPackageDeleteModal: false});
  }

  handleDeleteElementFromCart() {
    const {deleteItemid} = this.state;
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.delete,
        data: {itemId: deleteItemid}
      }, cartId);

    this.setState({
      showPackageDeleteModal: false
    });
  }

  getUserProfilesData() {
    const {userProfiles} = this.props;
    const allProfileDataList = [];
    userProfiles.data.forEach(profile => {
      if (profile.type === userProfileTypes.ATHLETE) {
        profile.isDependent = isDependentFlag.no;
        allProfileDataList.push(profile);
      } else if (profile.type === userProfileTypes.PARENT) {
        profile.dependents.forEach(dependentProfile => {
          dependentProfile.isDependent = isDependentFlag.yes;
          allProfileDataList.push(dependentProfile);
        });
      }
    });
    return allProfileDataList;
  }

  handleChangeProfile(itemId, attendeeProfileId) {
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.update,
        data: {itemId, attendeeProfileId}
      }, cartId);
  }

  handleDeleteSchedule(eventId, itemId) {
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.deleteSchedule,
        data: {itemId, eventId}
      }, cartId);
  }

  handleVolumeDiscountModalOpen(discounts, baseRate, itemId, offerTerminology) {
    const selectedVolumeDiscount = {
      discounts,
      itemId,
      baseRate,
      offerTerminology
    };
    this.setState({showVolumeDiscountModal: true, selectedVolumeDiscount});
  }

  handleVolumeDiscountModalClose() {
    this.setState({showVolumeDiscountModal: false});
  }

  handleNumberOfSessionsChange(itemId, qty) {
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.update,
        data: {itemId, qty}
      }, cartId);
  }

  handleSidePanelToggle() {
    this.props.toggleSidePanel();
  }

  handleClone(id) {
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.clone,
        data: {
          itemId: id
        }
      }, cartId);
  }

  renderCartItems() {
    const {nickname, cartData} = this.props;
    const {cartItems} = cartData.data;
    const dependents = this.getUserProfilesData();
    const order = cartItems.find(order => order.nickname === nickname);
    if (order) {
      if (order.orderItems.length) {
        return order.orderItems.map(item =>
          (
            <CartItem
              key={item.id}
              item={item}
              onSessionQtyChange={this.handleSessionQtyChange}
              onDelete={this.handleDeleteModal}
              dependents={dependents}
              onChangeProfile={this.handleChangeProfile}
              onDeleteSchedule={this.handleDeleteSchedule}
              onVolumeDiscountModal={this.handleVolumeDiscountModalOpen}
              onClone={this.handleClone}
            />
          )
        );
      }
    }
  }

  renderPackageDeleteConfirmationModal() {
    const {showPackageDeleteModal} = this.state;
    const {p} = this.props;
    return (
      <ConfirmationModal
        isModalOpen={showPackageDeleteModal}
        heading={p.t('ConfirmationModal.delete')}
        description={p.t('ShoppingCartItem.deleteComfirmationMessage')}
        onOk={this.handleDeleteElementFromCart}
        onCancel={this.handleCartDeleteModalClose}
        okButtonLabel={p.t('ShoppingCartItem.deleteComfirmationYes')}
        cancelButtonLabel={p.t('ShoppingCartItem.deleteComfirmationNo')}
      />
    );
  }

  renderVolumeDiscountModal() {
    const {selectedVolumeDiscount, showVolumeDiscountModal} = this.state;
    if (showVolumeDiscountModal) {
      return (
        <VolumeDiscountModal
          onClose={this.handleVolumeDiscountModalClose}
          volumeDiscounts={selectedVolumeDiscount.discounts}
          baseRate={selectedVolumeDiscount.baseRate}
          offerTerminology={selectedVolumeDiscount.offerTerminology}
          onVolumeDiscountSelect={this.handleNumberOfSessionsChange}
          itemId={selectedVolumeDiscount.itemId}
          isModalOpen={showVolumeDiscountModal}
        />
      );
    }
  }

  render() {
    const {p, show} = this.props;
    return (
      <div id="sidepannel" className={'sidepanel ' + (show ? 'show' : '')}>
        <div className="cl-sidepanel-holder">
          <div className="closeSidebar">
            <a onClick={this.handleSidePanelToggle} id="sidepael-close">
              <svg className="cl-sd-cross-orange" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                <g transform="translate(-1946.5 -5770.5)">
                  <line data-name="Line 230" className="cl-sd-cross-orange-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                  <line data-name="Line 231" className="cl-sd-cross-orange-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                </g>
              </svg>
            </a>
          </div>
          <div className="v-scroll-container">
            <div className="payment-summary-box payment-summary-box1-2">
              <h2>{p.t('ShoppingCartSideNav.payment_summary')}</h2>
              {
                this.renderCartItems()
              }
            </div>
            <div className="action-btn">
              <a href={config.dashboardShoppingCart} className="payment-summary-box-btn orange-btn uk-float-left">{p.t('ShoppingCartSideNav.view_cart')}</a>
              <a
                onClick={this.handleSidePanelToggle}
                className="payment-summary-box-btn tranparent-btn uk-float-right"
              >
                {p.t('ShoppingCartSideNav.continue_shopping')}
              </a>
              
            </div>
          </div>
        </div>
        {
          this.renderPackageDeleteConfirmationModal()
        }
        {
          this.renderVolumeDiscountModal()
        }
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      cartData: PropTypes.object.isRequired,
      updateShoppingCartItems: PropTypes.func.isRequired,
      userProfiles: PropTypes.object.isRequired,
      nickname: PropTypes.string.isRequired,
      toggleSidePanel: PropTypes.func.isRequired,
      show: PropTypes.bool.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateShoppingCartItems: (data, cartId) => dispatch(updateShoppingCartItems(data, cartId))
  };
};

const mapStateToProps = state => {
  const {shoppingCart, userProfiles, viewssp} = state;
  const {cartData} = shoppingCart;
  return {
    cartData,
    userProfiles,
    nickname: viewssp && viewssp.sspData && viewssp.sspData.data ? viewssp.sspData.data.nickname : ''
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(ShoppingCartSideNav)));

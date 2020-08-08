import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {PulseLoader} from 'react-spinners';

import PaymentSummary from './PaymentSummary';
import appConstants from '../../../../constants/appConstants';
import {
  fetchShoppingCartItems,
  updateShoppingCartItems,
  fetchShoppingCartTaxSummary,
  createShoppingCart
} from '../../../../actions';
import {PENDING, FULFILLED} from '../../../../constants/ActionTypes';
import {getShoppingCartId} from '../../../../utils/shoppingCart';

import ConfirmationModal from '../../ConfirmationModal';
import CancelationPolicyModal from '../../CancelationPolicyModal';
import {validateCartItems} from '../../../../validators/common/shoppingCart';
import Order from './Order';
import VolumeDiscountModal from '../VolumeDiscount';
import {SHOPPING_CART_VIEW} from '../../../../constants/pathConstants';
import config from '../../../../config';

const {actions, isDependentFlag} = appConstants.shoppingCart;


import AthleteNavBar from '../../../athlete/dashboard/NavBar';
import ParentNavBar from '../../../parent/dashboard/NavBar';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      showPackageDeleteModal: false,
      deleteItemid: null,
      sspCancellationPolicyMap: [],
      allProfileDataList: [],
      confirmation: null,
      showCancelationPolicyModal: false,
      selectedCancelationPolicy: '',
      showVolumeDiscountModal: false,
      showDeleteSspModal: false,
      selectedVolumeDiscount: {
        discounts: [],
        itemId: '',
        baseRate: 0,
        offerTerminology: ''
      },
      validation: {cartItems: {}, cancelationPolicy: true, for: true},
      submitted: false,
      deleteSspId: null
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleSspCancellationPolicyChange = this.handleSspCancellationPolicyChange.bind(this);
    this.handleNumberOfSessionsChange = this.handleNumberOfSessionsChange.bind(this);
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleCartDeleteModalClose = this.handleCartDeleteModalClose.bind(this);
    this.handleDeleteElementFromCart = this.handleDeleteElementFromCart.bind(this);
    this.handleSspDeleteModalOpen = this.handleSspDeleteModalOpen.bind(this);
    this.handleSspDeleteModalClose = this.handleSspDeleteModalClose.bind(this);

    this.handleChangeProfile = this.handleChangeProfile.bind(this);
    this.renderPackageDeleteConfirmationModal = this.renderPackageDeleteConfirmationModal.bind(this);
    this.getUserProfilesData = this.getUserProfilesData.bind(this);
    this.renderCancelationPolicyModal = this.renderCancelationPolicyModal.bind(this);
    this.handleCancelationPolicyModalOpen = this.handleCancelationPolicyModalOpen.bind(this);
    this.handleCancelationPolicyModalClose = this.handleCancelationPolicyModalClose.bind(this);
    this.handleVolumeDiscountModalClose = this.handleVolumeDiscountModalClose.bind(this);
    this.handleVolumeDiscountModalOpen = this.handleVolumeDiscountModalOpen.bind(this);
    this.updateValidation = this.updateValidation.bind(this);
    this.handleClone = this.handleClone.bind(this);

    this.renderOrders = this.renderOrders.bind(this);
    this.handleDeleteSsp = this.handleDeleteSsp.bind(this);
    this.renderSspDeleteConfirmationModal = this.renderSspDeleteConfirmationModal.bind(this);
    this.renderEmptyCart = this.renderEmptyCart.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const cartId = getShoppingCartId();
    if (cartId) {
      this.props.fetchShoppingCartItems({cartId});
    } else {
      this.props.createShoppingCart({});
    }
  }

  componentDidUpdate(prevProps) {
    const {shoppingCartGetStatus} = this.props;
    if (prevProps.shoppingCartGetStatus === PENDING && shoppingCartGetStatus === FULFILLED) {
      this.updateValidation();
    }
  }

  updateValidation() {
    const {shoppingCartDataList} = this.props;
    const {sspCancellationPolicyMap} = this.state;
    const validation = validateCartItems(sspCancellationPolicyMap, shoppingCartDataList);
    this.setState({validation});
  }

  handleNumberOfSessionsChange(itemId, qty) {
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.update,
        data: {itemId, qty}
      }, cartId);
  }

  handleSspCancellationPolicyChange(sspId, cancellationState) {
    const sspCancellationPolicyMap = Object.assign([], this.state.sspCancellationPolicyMap);
    if (cancellationState) {
      sspCancellationPolicyMap.push(sspId);
    } else {
      const index = sspCancellationPolicyMap.findIndex(id => id === sspId);
      if (index > -1) {
        sspCancellationPolicyMap.splice(index, 1);
      }
    }
    const {shoppingCartDataList} = this.props;
    const validation = validateCartItems(sspCancellationPolicyMap, shoppingCartDataList);
    this.setState({sspCancellationPolicyMap, validation});
  }

  handleValidation(data) {
    return {
      valid: Boolean(data)
    };
  }

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

  handleDeleteModal(packageId) {
    this.setState({showPackageDeleteModal: true, deleteItemid: packageId});
  }

  handleCartDeleteModalClose() {
    this.setState({showPackageDeleteModal: false});
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

  handleSubmitForm() {
    window.scrollTo(0, 0);
    const {shoppingCartDataList, history} = this.props;
    const {sspCancellationPolicyMap} = this.state;
    const validation = validateCartItems(sspCancellationPolicyMap, shoppingCartDataList);
    this.setState({validation, submitted: true});
    if (validation.cancelationPolicy && validation.for && shoppingCartDataList.length > 0) {
      history.push(SHOPPING_CART_VIEW);
    }
  }

  handleChangeProfile(itemId, attendeeProfileId) {
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.update,
        data: {itemId, attendeeProfileId}
      }, cartId);
  }

  handleCancelationPolicyModalOpen(e) {
    const selectedCancelationPolicy = e.currentTarget.getAttribute('data-value');
    this.setState({selectedCancelationPolicy, showCancelationPolicyModal: true});
  }

  handleCancelationPolicyModalClose() {
    this.setState({selectedCancelationPolicy: '', showCancelationPolicyModal: false});
  }

  handleDeleteSsp() {
    const sspId = this.state.deleteSspId;
    const cartId = getShoppingCartId();
    this.props.updateShoppingCartItems(
      {
        action: actions.deleteSsp,
        data: {sspId}
      }, cartId);
    this.setState({showDeleteSspModal: false, deleteSspId: null});
  }

  handleSspDeleteModalOpen(e) {
    const sspId = e.currentTarget.getAttribute('data-value');
    this.setState({showDeleteSspModal: true, deleteSspId: sspId});
  }

  handleSspDeleteModalClose() {
    this.setState({showDeleteSspModal: false, deleteSspId: null});
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

  renderPaymentSummary() {
    return (
      <PaymentSummary
        key="PaymentSummary"
        onClickTaxSummary={this.handleTaxSummaryModalOpen}
        onSubmit={this.handleSubmitForm}
        continueButtonText={this.props.p.t('PaymentSummary.continue_shopping')}
      />
    );
  }

  renderPackageDeleteConfirmationModal() {
    const {showPackageDeleteModal} = this.state;
    const {p} = this.props;
    return (
      <ConfirmationModal
        isModalOpen={showPackageDeleteModal}
        heading={p.t('ConfirmationModal.delete')}
        description={p.t('ShoppingCart.deleteComfirmationMessage')}
        onOk={this.handleDeleteElementFromCart}
        onCancel={this.handleCartDeleteModalClose}
        okButtonLabel={p.t('ShoppingCart.deleteComfirmationYes')}
        cancelButtonLabel={p.t('ShoppingCart.deleteComfirmationNo')}
      />
    );
  }

  renderSspDeleteConfirmationModal() {
    const {showDeleteSspModal} = this.state;
    const {p} = this.props;
    return (
      <ConfirmationModal
        isModalOpen={showDeleteSspModal}
        heading={p.t('ConfirmationModal.delete')}
        description={p.t('ShoppingCart.deleteSspMessage')}
        onOk={this.handleDeleteSsp}
        onCancel={this.handleSspDeleteModalClose}
        okButtonLabel={p.t('ShoppingCart.deleteComfirmationYes')}
        cancelButtonLabel={p.t('ShoppingCart.deleteComfirmationNo')}
      />
    );
  }

  renderCancelationPolicyModal() {
    const {showCancelationPolicyModal, selectedCancelationPolicy} = this.state;
    if (showCancelationPolicyModal) {
      return (
        <CancelationPolicyModal
          id={selectedCancelationPolicy}
          onClose={this.handleCancelationPolicyModalClose}
        />
      );
    }
  }

  renderOrders() {
    const {shoppingCartDataList} = this.props;
    const {sspCancellationPolicyMap, validation, submitted} = this.state;
    const dependents = this.getUserProfilesData();

    if (shoppingCartDataList.length) {
      return shoppingCartDataList.map(cartItem =>
        (
          <Order
            key={cartItem.sspId}
            cartItem={cartItem}
            sspCancellationPolicyMap={sspCancellationPolicyMap}
            onCancelationPolicyClick={this.handleCancelationPolicyModalOpen}
            onDeleteSsp={this.handleSspDeleteModalOpen}
            dependents={dependents}
            onChangeProfile={this.handleChangeProfile}
            onNumberOfSessionChange={this.handleNumberOfSessionsChange}
            onDeleteModal={this.handleDeleteModal}
            onVolumeDiscountModalOpen={this.handleVolumeDiscountModalOpen}
            onCancelationPolicyChange={this.handleSspCancellationPolicyChange}
            validation={validation.cartItems[cartItem.sspId]}
            submitted={submitted}
            onClone={this.handleClone}
          />
        )
      );
    }
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

  renderEmptyCart() {
    const {shoppingCartDataList, p} = this.props;
    if (shoppingCartDataList.length <= 0) {
      return (
        <div className="cl-sd-shoppingContent">
          <div className="cl-sd-cartEmpty-msg">
            <h5>{p.t('ShoppingCart.cart_empty')}</h5>
            <p><a href={config.sspSearchBaseUrl}>{p.t('ShoppingCart.start_browsing')}</a> {p.t('ShoppingCart.add_to_cart')}</p>
          </div>
        </div>
      );
    }
  }

  render() {
    const {p, shoppingCartGetStatus} = this.props;
    const loading = Boolean(shoppingCartGetStatus === PENDING);

    if (loading) {
      return (
        <div className="cl-loader-center">
          <div className="cl-loader">
            <PulseLoader loading={loading} size={10}/>
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.props.userProfiles.selectedProfile.displayName == 'Parent' ? 
          <ParentNavBar /> : <AthleteNavBar /> }
        <section className="cl-sd-shopping-cart-header">
          <div className="cl-sd-wrapper">
            <div className="cl-sd-row">
              <div className="cl-sd-leftCol">
                <h1>{p.t('ShoppingCart.title')}</h1>
              </div>
              <div className="cl-sd-rightCol">
                <p className="cl-sd-shopping-info-txt">{p.t('ShoppingCart.info1')}<br/>
                  {p.t('ShoppingCart.info2')}<br/>
                  {p.t('ShoppingCart.info3')}
                  <strong> {p.t('ShoppingCart.info4')} </strong> {p.t('ShoppingCart.info5')}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="cl-sd-shopping-cart-body">
          <div className="cl-sd-row">
            <div className="cl-sd-col-shoppingMain">
              <div className="cl-sd-wrapper">
                {
                  this.renderOrders()
                }
                {
                  this.renderEmptyCart()
                }
              </div>
            </div>
            {
              this.renderPaymentSummary()
            }
          </div>
        </section>
        {
          this.renderCancelationPolicyModal()
        }
        {
          this.renderPackageDeleteConfirmationModal()
        }
        {
          this.renderVolumeDiscountModal()
        }
        {
          this.renderSspDeleteConfirmationModal()
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.object.isRequired,
      shoppingCartDataList: PropTypes.array,
      userProfiles: PropTypes.object.isRequired,
      shoppingCartGetStatus: PropTypes.string.isRequired,
      fetchShoppingCartItems: PropTypes.func.isRequired,
      updateShoppingCartItems: PropTypes.func.isRequired,
      createShoppingCart: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

ShoppingCart.defaultProps = {
  shoppingCartDataList: []
};

const mapStateToProps = state => {
  const {shoppingCart, userProfiles} = state;
  const {cartData} = shoppingCart;
  return {
    shoppingCartDataList: cartData.data.cartItems,
    shoppingCartGetStatus: cartData.status ? cartData.status : '',
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchShoppingCartItems: params => dispatch(fetchShoppingCartItems(params)),
    updateShoppingCartItems: (data, cartId) => dispatch(updateShoppingCartItems(data, cartId)),
    fetchShoppingCartTaxSummary: query => dispatch(fetchShoppingCartTaxSummary(query)),
    createShoppingCart: data => dispatch(createShoppingCart(data))
  };
};

const CartData = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
export default translate(CartData);

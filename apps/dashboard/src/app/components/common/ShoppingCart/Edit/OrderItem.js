import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import moment from 'moment';

import appConstants from '../../../../constants/appConstants';
import ConfirmationModal from '../../ConfirmationModal';
import {FULFILLED, PENDING} from '../../../../constants/ActionTypes';
import {hasChild} from '../../../../validators/common/shoppingCart';

const {shoppingCart} = appConstants;
const {currencyDecimals, actions, isDependentFlag} = shoppingCart;

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.renderDiscountRates = this.renderDiscountRates.bind(this);
    this.handleNumberOfSession = this.handleNumberOfSession.bind(this);
    this.handleDiscountRate = this.handleDiscountRate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderSession = this.renderSession.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.getSelectedProfile = this.getSelectedProfile.bind(this);
    this.handleSessionQtyChange = this.handleSessionQtyChange.bind(this);
    this.getScheduledSessions = this.getScheduledSessions.bind(this);
    this.renderSessionDeleteConfirmationModal = this.renderSessionDeleteConfirmationModal.bind(this);
    this.handleSessionDeleteConfirmationModalOpen = this.handleSessionDeleteConfirmationModalOpen.bind(this);
    this.handleSessionDeleteModalClose = this.handleSessionDeleteModalClose.bind(this);
    this.handleSessionDeleteOk = this.handleSessionDeleteOk.bind(this);
    this.renderProfileSelectionDropDown = this.renderProfileSelectionDropDown.bind(this);
    this.renderAppliedDiscount = this.renderAppliedDiscount.bind(this);
    this.handleViewDetails = this.handleViewDetails.bind(this);
    this.handleVolumeDiscountModal = this.handleVolumeDiscountModal.bind(this);
    this.renderBuyMoreSaveMoreLink = this.renderBuyMoreSaveMoreLink.bind(this);
    this.updateData = this.updateData.bind(this);
    this.renderCloneOption = this.renderCloneOption.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    const {orderItem} = this.props;
    const {attendeeProfileId, qty} = orderItem;

    this.state = {
      attendeeProfileId,
      numberOfSession: qty,
      showSessionDeleteModal: false,
      showDetails: false
    };
  }

  componentDidUpdate(preProps) {
    const {shoppingCartDataFetchStatus} = this.props;
    if (preProps.shoppingCartDataFetchStatus === PENDING && shoppingCartDataFetchStatus === FULFILLED) {
      this.updateData();
    }
  }

  updateData() {
    const {orderItem} = this.props;
    const {attendeeProfileId, qty} = orderItem;
    this.setState({attendeeProfileId,
      numberOfSession: qty});
  }

  handleNumberOfSession(e) {
    const value = e ? e.target.value : 0;
    this.setState({numberOfSession: value});
  }

  handleSessionQtyChange(e) {
    const {orderItem} = this.props;
    const {qty} = orderItem;
    const value = e ? e.target.value : 0;
    if (isNaN(value) || value < 1) {
      this.props.onDelete(this.props.id);
      this.setState({numberOfSession: value});
    } else if (value < this.getScheduledSessions()) {
      this.handleSessionDeleteConfirmationModalOpen(value);
    } else if (qty !== parseInt(value, 10)) {
      this.setState({numberOfSession: value});
      this.props.onNumberOfSessionChange(this.props.id, value);
    }
  }

  getScheduledSessions() {
    const {sessions} = this.props.orderItem;
    let count = 0;
    for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].status === shoppingCart.itemStatus.scheduled) {
        count += 1;
      }
    }
    return count;
  }

  handleSessionDeleteConfirmationModalOpen() {
    this.setState({showSessionDeleteModal: true});
  }

  handleSessionDeleteModalClose() {
    this.setState({showSessionDeleteModal: false});
    this.props.onNumberOfSessionChange(this.props.id, this.state.numberOfSession);
  }

  handleSessionDeleteOk() {
    const {numberOfSession} = this.state;
    this.setState({showSessionDeleteModal: false});
    this.props.onNumberOfSessionChange(this.props.id, numberOfSession);
  }

  handleDiscountRate(e) {
    const {orderItem} = this.props;
    const {discountRates} = orderItem;
    const id = e.currentTarget.getAttribute('value');
    const discount = discountRates.filter(item => String(item.id) === String(id))[0];
    this.props.onNumberOfSessionChange(this.props.id, discount.minNumberOfSession);
    this.setState({numberOfSession: discount.minNumberOfSession});
  }

  handleDelete(e) {
    const value = e.currentTarget.getAttribute('value');
    this.props.onDelete(value);
  }

  handleChangeProfile(e) {
    const value = e.target.value;
    const {id} = this.props;
    if (value === actions.clone) {
      this.props.onClone(id);
      return;
    }
    this.props.onChangeProfile(id, value);
  }

  handleViewDetails() {
    const {showDetails} = this.state;
    this.setState({showDetails: !showDetails});
  }

  handleVolumeDiscountModal() {
    const {orderItem} = this.props;
    const {discountRates, offerTerminology, basePrice, id} = orderItem;
    this.props.onVolumeDiscountModalOpen(discountRates, basePrice, id, offerTerminology);
  }

  getSelectedProfile(selectedProfileId, dependents) {
    return dependents.find(dependent => dependent.id === selectedProfileId);
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.handleSessionQtyChange(e);
    }
  }

  renderSessionDeleteConfirmationModal() {
    const {showSessionDeleteModal} = this.state;
    const {p} = this.props;
    if (showSessionDeleteModal) {
      return (
        <ConfirmationModal
          isModalOpen={showSessionDeleteModal}
          heading={p.t('ConfirmationModal.delete')}
          description={p.t('ShoppingCart.deleteSessionComfirmationMessage')}
          onOk={this.handleSessionDeleteOk}
          onCancel={this.handleSessionDeleteModalClose}
          okButtonLabel={p.t('ShoppingCart.deleteComfirmationYes')}
          cancelButtonLabel={p.t('ShoppingCart.deleteComfirmationNo')}
        />
      );
    }
  }

  renderProfileSelectionDropDown() {
    const {attendeeProfileId} = this.state;
    const {dependents, p} = this.props;
    return (
      <select onChange={this.handleChangeProfile} value={attendeeProfileId}>
        <option value=""> {p.t('OrderItem.select_for')} </option>
        {
          dependents.map(this.renderProfile)
        }
        {
          this.renderCloneOption()
        }
      </select>
    );
  }

  renderDiscountRates(discount, index) {
    const {p, orderItem} = this.props;
    return (
      <li key={orderItem.id + index}>
        <p><span>{discount.minNumberOfSession}+</span> {p.t('ShoppingCart.sessionsLabel', {offerTerminology: orderItem.offerTerminology.plural.toUpperCase()})} <span>{p.t('ShoppingCart.currency')}{orderItem.basePrice - discount.discountPrice} {p.t('ShoppingCart.each')}</span></p>
        <h6>Save ${discount.discountPrice} <a onClick={this.handleDiscountRate} value={discount.id}>Select</a></h6>
      </li>
    );
  }

  renderSession(session, index) {
    const {p} = this.props;
    const date = session.status === shoppingCart.itemStatus.scheduled ? session.eventDetails.date : undefined;
    return (
      <p key={session.name + index}>
        <span>{session.name}: </span>
        {session.status === appConstants.sessionEvents.scheduled ?
          p.t('OrderItem.scheduledTimeStamp',
            {
              date: moment(date.start).format('ddd[,] MMM DD'),
              startTime: moment(date.start).format('hh:mm a'),
              endTime: moment(date.end).format('hh:mm a'),
              locationName: session.eventDetails.location
            }) : session.status }
      </p>
    );
  }

  renderProfile(profileData) {
    const {p} = this.props;
    return (
      <option key={profileData.id} value={profileData.id}>
        {(profileData.isDependent === isDependentFlag.no) ? p.t('ShoppingCart.me') : profileData.displayName}
      </option>
    );
  }

  renderAppliedDiscount() {
    const {orderItem, p} = this.props;
    const {discountRates, appliedDiscountId, offerTerminology, basePrice} = orderItem;
    if (appliedDiscountId) {
      const volumeDiscount = discountRates.find(discount => discount.id === appliedDiscountId);
      if (volumeDiscount) {
        const {minNumberOfSession, discountPrice} = volumeDiscount;
        return (
          <div className="cl-sd-col3">
            <p>{p.t('OrderItem.discount_applied')}</p>
            <p>
              <a onClick={this.handleVolumeDiscountModal}>
                {p.t('OrderItem.discount_sessions',
                  {
                    noOfSessions: minNumberOfSession,
                    offerTerminology: offerTerminology.plural,
                    eachSession: discountPrice
                  })}
                <br/>  {p.t('OrderItem.you_save', {discountPrice})}
              </a>
            </p>
          </div>
        );
      }
    }
  }

  renderBuyMoreSaveMoreLink() {
    const {orderItem, p} = this.props;
    const {appliedDiscountId} = orderItem;
    const {discountRates} = orderItem;
    if (!appliedDiscountId && discountRates.length > 0) {
      return (
        <div className="cl-sd-col3">
          <p>
            <a onClick={this.handleVolumeDiscountModal} className="buymoreBtn">
              <span className="cl-sd-percentageSvg">
                <svg className="cl-icon-percentage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
                  <g transform="translate(-2.563 -2.563)">
                    <g data-name="Group 2951" transform="translate(2.563 2.563)">
                      <circle data-name="Ellipse 233" className="cl-icon-percentage-1" cx="1.711" cy="1.711" r="1.711" transform="translate(11.012 11.013)"/>
                      <path data-name="Path 327" className="cl-icon-percentage-1" d="M36.533,15.017a.846.846,0,0,0-.433-.539l-4.077-2.108.214-4.586a.857.857,0,0,0-.25-.645.816.816,0,0,0-.645-.25L26.758,7.1,24.65,3.025A.855.855,0,0,0,23.429,2.7L19.563,5.176,15.7,2.7a.855.855,0,0,0-1.221.328L12.369,7.1,7.784,6.89a.81.81,0,0,0-.645.248.857.857,0,0,0-.25.645L7.1,12.369,3.025,14.477A.857.857,0,0,0,2.7,15.7l2.477,3.864L2.7,23.427a.855.855,0,0,0,.327,1.22L7.1,26.754l-.214,4.586a.857.857,0,0,0,.25.645.815.815,0,0,0,.645.25l4.586-.216,2.106,4.08a.858.858,0,0,0,.539.435.871.871,0,0,0,.683-.106l3.866-2.479,3.864,2.477a.86.86,0,0,0,.462.135.878.878,0,0,0,.221-.029.862.862,0,0,0,.539-.435l2.108-4.08,4.585.216a.811.811,0,0,0,.645-.25.856.856,0,0,0,.25-.645l-.214-4.586L36.1,24.645a.855.855,0,0,0,.327-1.22L33.95,19.563,36.427,15.7A.839.839,0,0,0,36.533,15.017Zm-24.668.269a3.421,3.421,0,1,1,3.421,3.421A3.425,3.425,0,0,1,11.864,15.286ZM15.036,25.3a.856.856,0,0,1-1.211-1.209L24.089,13.827A.855.855,0,0,1,25.3,15.036Zm8.8,1.96a3.421,3.421,0,1,1,3.421-3.421A3.425,3.425,0,0,1,23.839,27.261Z" transform="translate(-2.563 -2.563)"/>
                      <circle data-name="Ellipse 234" className="cl-icon-percentage-1" cx="1.711" cy="1.711" r="1.711" transform="translate(19.566 19.566)"/>
                    </g>
                  </g>
                </svg>
              </span>
              <span>{p.t('OrderItem.buy_more')}<br/> {p.t('OrderItem.save_more')}</span>
            </a>
          </p>
        </div>
      );
    }
  }

  renderCloneOption() {
    const {userProfiles, p} = this.props;
    const hasDependent = hasChild(userProfiles);
    if (hasDependent) {
      return (
        <option value={actions.clone}> {p.t('OrderItem.clone')}</option>
      );
    }
  }

  render() {
    const {p, orderItem, validation, submitted} = this.props;
    const {sport, trainingType, sessions, ageGroup, skillLevel, basePrice, totalPrice, qty} = orderItem;
    const {numberOfSession, showDetails} = this.state;

    return (
      <div className="cl-sd-cartlistbody">
        <div className={'field-holder ' + (submitted && validation === false ? 'error' : '')}>
          {this.renderProfileSelectionDropDown()}
          <span className="error-text">{p.t('OrderItem.for_validation')}</span>
        </div>
        <div className="cl-sd-row cl-two-cols">
          <div className="cl-sd-col1">
            <h6>{sport.name}</h6>
          </div>
          <div className="cl-sd-col2">
            <a onClick={this.handleDelete} value={orderItem.id} className="cl-sd-delete">
              <svg className="cl-icon-bin-gray" xmlns="http://www.w3.org/2000/svg" viewBox="-1212 -5145 15.714 17.143">
                <g transform="translate(-1473.643 -5761.286)">
                  <path data-name="Welcome! What type of profile do you want to set up right now?" className="cl-icon-gray-1" d="M-2.143-8.929V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1h-.714a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H-2.5a.348.348,0,0,1,.257.1A.348.348,0,0,1-2.143-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H-.357a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H.357a.348.348,0,0,1,.257.1A.348.348,0,0,1,.714-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H2.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h.714a.348.348,0,0,1,.257.1A.348.348,0,0,1,3.571-8.929ZM5-.848v-10.58H-5V-.848A1.267,1.267,0,0,0-4.922-.4a1,1,0,0,0,.162.3Q-4.676,0-4.643,0H4.643q.033,0,.117-.095a1,1,0,0,0,.162-.3A1.267,1.267,0,0,0,5-.848ZM-2.5-12.857h5l-.536-1.306a.315.315,0,0,0-.19-.123H-1.763a.315.315,0,0,0-.19.123ZM7.857-12.5v.714a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H6.429V-.848A2.534,2.534,0,0,1,5.9.753a1.556,1.556,0,0,1-1.261.675H-4.643A1.571,1.571,0,0,1-5.9.776,2.442,2.442,0,0,1-6.429-.8V-11.429H-7.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-12.5a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h3.449l.781-1.864a1.546,1.546,0,0,1,.6-.7,1.576,1.576,0,0,1,.882-.29H1.786a1.576,1.576,0,0,1,.882.29,1.546,1.546,0,0,1,.6.7l.781,1.864H7.5a.348.348,0,0,1,.257.1A.348.348,0,0,1,7.857-12.5Z" transform="translate(269.5 632)"/>
                </g>
              </svg>
            </a>
          </div>
        </div>
        <div className="cl-sd-row cl-four-cols">
          <div className="cl-sd-col1">
            <p><span>{orderItem.sessionLabel}</span></p>
            <p> {p.t('ShoppingCart.description',
              {trainingType: trainingType.name,
                ageGroup: ageGroup.description,
                skillLevel: skillLevel.description
              })}
            </p>
            <p>
              <a onClick={this.handleViewDetails} className={'cl-sd-view-Btn ' + (showDetails ? 'open' : 'close')}>
                {p.t('ShoppingCart.viewDetails') + ' '}
                <svg className="cl-icon-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591">
                  <g transform="translate(-962.105 -6007)">
                    <path data-name="Path 148" className="cl-icon-arrow-down-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/>
                  </g>
                </svg>
                <svg className="cl-icon-arrow-top" xmlns="http://www.w3.org/2000/svg" viewBox="-710.531 -5140.061 11.063 6.591">
                  <g transform="translate(-913.105 -5998)">
                    <path data-name="Path 134" className="cl-icon-arrow-top-1" d="M-17914.895-2197l5,5,5-5" transform="translate(-17701.789 -1333) rotate(180)"/>
                  </g>
                </svg>
              </a>
            </p>
          </div>
          <div className="cl-sd-col2">
            <div className="inputOuter field-holder">
              <div className="lCol">
                <label>{p.t('ShoppingCart.numberOfSession', {offerTerminology: orderItem.offerTerminology.plural})}</label>
              </div>
              <div className="rCol">
                <input
                  type="number"
                  onChange={this.handleNumberOfSession}
                  onBlur={this.handleSessionQtyChange}
                  onKeyDown={this.handleKeyPress}
                  min={1}
                  max={99}
                  value={numberOfSession}
                />
              </div>
            </div>
          </div>
          {
            this.renderAppliedDiscount()
          }
          {
            this.renderBuyMoreSaveMoreLink()
          }
          <div className="cl-sd-col4">
            <p>{p.t('OrderItem.price')}</p>
            {basePrice * qty !== totalPrice && <p><del>{p.t('currency')}{basePrice * qty}</del></p> }
            <p className="cl-sd-price">{p.t('currency')}{totalPrice.toFixed(currencyDecimals)}</p>
          </div>
        </div>
        <div className={'cl-sd-viewSessions-deatils ' + (showDetails ? 'show' : 'hide')}>
          {
            sessions.map(this.renderSession)
          }
        </div>
        {
          this.renderSessionDeleteConfirmationModal()
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.object.isRequired,
      orderItem: PropTypes.object,
      onNumberOfSessionChange: PropTypes.func.isRequired,
      onDelete: PropTypes.func.isRequired,
      onChangeProfile: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
      dependents: PropTypes.array.isRequired,
      onVolumeDiscountModalOpen: PropTypes.func.isRequired,
      validation: PropTypes.bool.isRequired,
      submitted: PropTypes.bool.isRequired,
      shoppingCartDataFetchStatus: PropTypes.string.isRequired,
      userProfiles: PropTypes.array.isRequired,
      onClone: PropTypes.func.isRequired
    };
  }
}

OrderItem.defaultProps = {
  orderItem: {}
};

const mapStateToProps = state => {
  const {shoppingCart, userProfiles} = state;
  return {
    shoppingCartDataFetchStatus: shoppingCart.cartData.updateStatus,
    userProfiles: userProfiles.data
  };
};

export default connect(mapStateToProps)(translate(OrderItem));

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import appConstants from '../../../constants/appConstants';
import ConfirmationModal from '../../common/ConfirmationModal';
import {PENDING, FULFILLED} from '../../../constants/ActionTypes';
import {hasChild} from '../../../validators/common/shoppingCart';

const {shoppingCart} = appConstants;
const {qty, currencyDecimals, actions} = shoppingCart;

class ShoppingCartItem extends Component {
  constructor(props) {
    super(props);
    this.getLocationName = this.getLocationName.bind(this);
    this.handleNumberOfSession = this.handleNumberOfSession.bind(this);
    this.handleSessionQtyChange = this.handleSessionQtyChange.bind(this);
    this.handleSessionDeleteConfirmationModalOpen = this.handleSessionDeleteConfirmationModalOpen.bind(this);
    this.handleSessionDeleteOk = this.handleSessionDeleteOk.bind(this);
    this.handleSessionDeleteModalClose = this.handleSessionDeleteModalClose.bind(this);
    this.getScheduledSessions = this.getScheduledSessions.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderSessionItems = this.renderSessionItems.bind(this);
    this.handleDeleteSchedule = this.handleDeleteSchedule.bind(this);
    this.renderProfileSelectionDropDown = this.renderProfileSelectionDropDown.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
    this.handleVolumeDiscountModalOpen = this.handleVolumeDiscountModalOpen.bind(this);
    this.updateData = this.updateData.bind(this);
    this.renderViewVolumeDiscountButton = this.renderViewVolumeDiscountButton.bind(this);
    this.renderCloneOption = this.renderCloneOption.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    const {attendeeProfileId, qty} = this.props.item;

    this.state = {
      attendeeProfileId,
      numberOfSession: qty,
      showSessionDeleteModal: false,
      deleteEventId: ''
    };
  }

  componentDidUpdate(preProps) {
    const {shoppingCartDataFetchStatus} = this.props;
    if (preProps.shoppingCartDataFetchStatus === PENDING && shoppingCartDataFetchStatus === FULFILLED) {
      this.updateData();
    }
  }

  updateData() {
    const {item} = this.props;
    const {attendeeProfileId, qty} = item;
    this.setState({attendeeProfileId,
      numberOfSession: qty});
  }

  getLocationName() {
    const {sessions} = this.props.item;
    const session = sessions.find(session => session.status === shoppingCart.itemStatus.scheduled);
    if (session) {
      return session.eventDetails.location;
    }
    return '';
  }

  handleNumberOfSession(e) {
    const value = e ? e.target.value : 0;
    this.setState({numberOfSession: value});
  }

  handleSessionQtyChange(e) {
    const {id, qty} = this.props.item;
    const value = e ? e.target.value : 0;
    if (isNaN(value) || value < 1) {
      this.props.onDelete(id);
      this.setState({numberOfSession: value});
    } else if (value < this.getScheduledSessions()) {
      this.handleSessionDeleteConfirmationModalOpen();
    } else if (qty !== parseInt(value, 10)) {
      this.setState({numberOfSession: value});
      this.props.onSessionQtyChange(id, value);
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.handleSessionQtyChange(e);
    }
  }

  getScheduledSessions() {
    const {sessions} = this.props.item;
    let count = 0;
    for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].status === shoppingCart.itemStatus.scheduled) {
        count += 1;
      }
    }
    return count;
  }

  handleSessionDeleteConfirmationModalOpen(eventId) {
    this.setState({showSessionDeleteModal: true, deleteEventId: eventId});
  }

  handleSessionDeleteOk() {
    const {numberOfSession, deleteEventId} = this.state;
    if (deleteEventId) {
      this.props.onDeleteSchedule(deleteEventId, this.props.item.id);
    } else {
      this.props.onSessionQtyChange(this.props.item.id, numberOfSession);
    }
    this.setState({showSessionDeleteModal: false});
  }

  handleSessionDeleteModalClose() {
    this.setState({showSessionDeleteModal: false});
  }

  handleDelete() {
    this.props.onDelete(this.props.item.id);
  }

  handleDeleteSchedule(e) {
    const {numberOfSession} = this.state;
    const eventId = e.currentTarget.getAttribute('data-eventid');
    if (eventId) {
      this.handleSessionDeleteConfirmationModalOpen(eventId);
    } else {
      const qty = numberOfSession - 1;
      this.props.onSessionQtyChange(this.props.item.id, qty);
    }
  }

  handleChangeProfile(e) {
    const value = e.target.value;
    const {id} = this.props.item;
    if (value === actions.clone) {
      this.props.onClone(id);
      return;
    }
    this.props.onChangeProfile(id, value);
  }

  handleVolumeDiscountModalOpen() {
    const {item} = this.props;
    this.props.onVolumeDiscountModal(item.discountRates, item.basePrice, item.id, item.offerTerminology);
  }

  renderSessionDeleteConfirmationModal() {
    const {showSessionDeleteModal} = this.state;
    const {p} = this.props;
    if (showSessionDeleteModal) {
      return (
        <ConfirmationModal
          isModalOpen={showSessionDeleteModal}
          heading={p.t('ConfirmationModal.delete')}
          description={p.t('ShoppingCartItem.deleteSessionComfirmationMessage')}
          onOk={this.handleSessionDeleteOk}
          onCancel={this.handleSessionDeleteModalClose}
          okButtonLabel={p.t('ShoppingCartItem.deleteComfirmationYes')}
          cancelButtonLabel={p.t('ShoppingCartItem.deleteComfirmationNo')}
        />
      );
    }
  }

  renderSessionItems(pricePerSession) {
    const {p, item} = this.props;
    const {sessions} = item;
    if (sessions.length) {
      return sessions.map((session, index) => {
        const eventId = session.status === shoppingCart.itemStatus.scheduled ? session.eventDetails.id : undefined;
        const date = session.status === shoppingCart.itemStatus.scheduled ? session.eventDetails.date : undefined;
        const key = session.name + index;
        return (
          <tr key={key}>
            <td className="uk-width-6-10">
              <span className="session-count">
                {session.name}
              </span>
              {session.status === shoppingCart.itemStatus.scheduled &&
              <span className="session-time">
                {p.t('ShoppingCartItem.scheduledTimeStamp',
                  {
                    date: moment(date.start).format('ddd[,] MMM DD'),
                    startTime: moment(date.start).format('hh:mm a'),
                    endTime: moment(date.end).format('hh:mm a')
                  })}
              </span>
              }
            </td>
            <td className="uk-width-3-10">
              <span className="bold-font-family uk-text-center">${pricePerSession.toFixed(currencyDecimals)}</span>
            </td>
            <td className="uk-width-1-10">
              <a onClick={this.handleDeleteSchedule} data-eventid={eventId} className="trash-icon">
                <svg className="cl-icon-bin-gray" xmlns="http://www.w3.org/2000/svg" viewBox="-1212 -5145 15.714 17.143">
                  <g transform="translate(-1473.643 -5761.286)">
                    <path data-name="Welcome! What type of profile do you want to set up right now?" className="cl-icon-gray-1" d="M-2.143-8.929V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1h-.714a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H-2.5a.348.348,0,0,1,.257.1A.348.348,0,0,1-2.143-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H-.357a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H.357a.348.348,0,0,1,.257.1A.348.348,0,0,1,.714-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H2.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h.714a.348.348,0,0,1,.257.1A.348.348,0,0,1,3.571-8.929ZM5-.848v-10.58H-5V-.848A1.267,1.267,0,0,0-4.922-.4a1,1,0,0,0,.162.3Q-4.676,0-4.643,0H4.643q.033,0,.117-.095a1,1,0,0,0,.162-.3A1.267,1.267,0,0,0,5-.848ZM-2.5-12.857h5l-.536-1.306a.315.315,0,0,0-.19-.123H-1.763a.315.315,0,0,0-.19.123ZM7.857-12.5v.714a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H6.429V-.848A2.534,2.534,0,0,1,5.9.753a1.556,1.556,0,0,1-1.261.675H-4.643A1.571,1.571,0,0,1-5.9.776,2.442,2.442,0,0,1-6.429-.8V-11.429H-7.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-12.5a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h3.449l.781-1.864a1.546,1.546,0,0,1,.6-.7,1.576,1.576,0,0,1,.882-.29H1.786a1.576,1.576,0,0,1,.882.29,1.546,1.546,0,0,1,.6.7l.781,1.864H7.5a.348.348,0,0,1,.257.1A.348.348,0,0,1,7.857-12.5Z" transform="translate(269.5 632)"/>
                  </g>
                </svg>
              </a>
            </td>
          </tr>
        );
      }
      );
    }
  }

  renderProfileSelectionDropDown() {
    const {attendeeProfileId} = this.state;
    const {dependents, p} = this.props;
    return (
      <select onChange={this.handleChangeProfile} value={attendeeProfileId} className="cl-sd-person-select">
        <option value=""> {p.t('ShoppingCartItem.select_for')} </option>
        {
          dependents.map(profileData =>
            (
              <option key={profileData.id} value={profileData.id}>
                {(profileData.isDependent === shoppingCart.isDependentFlag.no) ? p.t('ShoppingCartItem.me') : profileData.displayName}
              </option>
            )
          )
        }
        {
          this.renderCloneOption()
        }
      </select>
    );
  }

  renderCloneOption() {
    const {userProfiles, p} = this.props;
    const hasDependent = hasChild(userProfiles);
    if (hasDependent) {
      return (
        <option value={actions.clone}> {p.t('ShoppingCartItem.clone')}</option>
      );
    }
  }

  renderViewVolumeDiscountButton(t) {
    const {discountRates} = this.props.item;
    if (discountRates.length > 0) {
      return (
        <a onClick={this.handleVolumeDiscountModalOpen}>{t('ShoppingCartItem.view_volume_discount')}</a>
      );
    }
  }

  render() {
    const {item, p} = this.props;
    const {sport, skillLevel, ageGroup, trainingType, totalPrice} = item;
    const {t} = p;

    const locationName = this.getLocationName();

    const {numberOfSession} = this.state;
    const pricePerSession = totalPrice / item.qty;

    return (
      <div className="payment-summary-content">
        <div className="uk-flex">
          <div className="uk-width-9-10">
            <div className="package-details">
              <h3 className="training-type">{sport.name}</h3>
              <span className="training-group">{t('ShoppingCartItem.description', {ageGroup: ageGroup.description, skillLevel: skillLevel.description})}</span>
              <span className="t-type">{trainingType.name}</span>
              <span className="training-place">{locationName}</span>
              {
                this.renderProfileSelectionDropDown()
              }
            </div>
          </div>
          <div className="uk-width-1-10">
            <a onClick={this.handleDelete} className="trash-icon" title="Move to Trash">
              <svg className="cl-icon-bin-gray" xmlns="http://www.w3.org/2000/svg" viewBox="-1212 -5145 15.714 17.143">
                <g transform="translate(-1473.643 -5761.286)">
                  <path data-name="Welcome! What type of profile do you want to set up right now?" className="cl-icon-gray-1" d="M-2.143-8.929V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1h-.714a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H-2.5a.348.348,0,0,1,.257.1A.348.348,0,0,1-2.143-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H-.357a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H.357a.348.348,0,0,1,.257.1A.348.348,0,0,1,.714-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H2.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h.714a.348.348,0,0,1,.257.1A.348.348,0,0,1,3.571-8.929ZM5-.848v-10.58H-5V-.848A1.267,1.267,0,0,0-4.922-.4a1,1,0,0,0,.162.3Q-4.676,0-4.643,0H4.643q.033,0,.117-.095a1,1,0,0,0,.162-.3A1.267,1.267,0,0,0,5-.848ZM-2.5-12.857h5l-.536-1.306a.315.315,0,0,0-.19-.123H-1.763a.315.315,0,0,0-.19.123ZM7.857-12.5v.714a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H6.429V-.848A2.534,2.534,0,0,1,5.9.753a1.556,1.556,0,0,1-1.261.675H-4.643A1.571,1.571,0,0,1-5.9.776,2.442,2.442,0,0,1-6.429-.8V-11.429H-7.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-12.5a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h3.449l.781-1.864a1.546,1.546,0,0,1,.6-.7,1.576,1.576,0,0,1,.882-.29H1.786a1.576,1.576,0,0,1,.882.29,1.546,1.546,0,0,1,.6.7l.781,1.864H7.5a.348.348,0,0,1,.257.1A.348.348,0,0,1,7.857-12.5Z" transform="translate(269.5 632)"/>
                </g>
              </svg>
            </a>
          </div>
        </div>
        <div className="select-session">
          <div className="uk-flex">
            <div className="uk-width-7-10">
              <span className="select-txt">{t('ShoppingCartItem.qty', {offerTerminology: item.offerTerminology.plural})}</span>
              <span>{this.renderViewVolumeDiscountButton(t)}</span>
            </div>
            <div className="uk-width-3-10 uk-text-right">
              <input
                onChange={this.handleNumberOfSession}
                onBlur={this.handleSessionQtyChange}
                onKeyDown={this.handleKeyPress}
                value={numberOfSession}
                min={qty.min}
                max={qty.max}
                type="number"
                className="session-no"
              />
            </div>
          </div>
        </div>
        <div className="booked-session-table">
          <table className="uk-table">
            <tbody>
              {
                this.renderSessionItems(pricePerSession)
              }
              <tr>
                <td className="uk-width-6-10 total-td">
                  <span className="session-count">
                    {t('ShoppingCartItem.sub_total')}:
                  </span>
                </td>
                <td className="uk-width-3-10 total-td">
                  <span className="bold-font-family uk-text-center">${totalPrice.toFixed(currencyDecimals)}</span>
                </td>
                <td className="uk-width-1-10 total-td"/>
              </tr>
            </tbody>
          </table>
        </div>
        {
          this.renderSessionDeleteConfirmationModal()
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      item: PropTypes.object.isRequired,
      onSessionQtyChange: PropTypes.func.isRequired,
      onDelete: PropTypes.func.isRequired,
      dependents: PropTypes.array.isRequired,
      onChangeProfile: PropTypes.func.isRequired,
      onDeleteSchedule: PropTypes.func.isRequired,
      onVolumeDiscountModal: PropTypes.func.isRequired,
      shoppingCartDataFetchStatus: PropTypes.string.isRequired,
      userProfiles: PropTypes.array.isRequired,
      onClone: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {shoppingCart, userProfiles} = state;
  return {
    shoppingCartDataFetchStatus: shoppingCart.cartData.updateStatus,
    userProfiles: userProfiles.data
  };
};

export default connect(mapStateToProps)(withRouter(translate(ShoppingCartItem)));

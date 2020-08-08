import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import appConstants from '../../../../../constants/appConstants';
import Modal from '../../../../common/Modal';
import {fetchReasons, athleteCancelFutureSessions} from '../../../../../actions/index';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import isValid from '../../../../../validators/athlete/common/cancelFutureSession';
import {getProfileId} from '../../../../../middlewares/athlete/schedulerUtils';

class CancelFutureSessionsModal extends Component {
  constructor(props) {
    super(props);
    this.renderReasons = this.renderReasons.bind(this);
    this.handleReasonsSelect = this.handleReasonsSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderFutureSessions = this.renderFutureSessions.bind(this);
    this.renderTemplate = this.renderTemplate.bind(this);
    this.handleSessionSelectChange = this.handleSessionSelectChange.bind(this);
    this.getAppliedDiscount = this.getAppliedDiscount.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.renderVolumeDiscounts = this.renderVolumeDiscounts.bind(this);
    this.getNewVolumeDiscount = this.getNewVolumeDiscount.bind(this);
    this.state = {
      data: {
        reasonId: null,
        sessions: []
      }
    };
  }

  componentDidMount() {
    this.props.fetchReasons({event: appConstants.reasons.cancelFutureSessions});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cancelFutureSessions.status !== FULFILLED && this.props.cancelFutureSessions.status === FULFILLED) {
      this.handleCloseModal();
    }
  }

  handleReasonsSelect(e) {
    const {data} = this.state;
    data.reasonId = e.currentTarget.getAttribute('data-id');
    this.setState({data});
  }

  handleSubmit() {
    const {data} = this.state;
    if (isValid(data)) {
      const {selectedProfile} = this.props;
      const profileId = getProfileId(selectedProfile);
      this.props.athleteCancelFutureSessions(
        {profileId, profileType: selectedProfile.type
        },
        {
          reasonId: data.reasonId,
          sessionIds: data.sessions
        });
    }
  }

  handleCloseModal() {
    this.props.onClose();
  }

  handleSessionSelectChange(e) {
    const {data} = this.state;
    const value = e.target.value;
    const sessions = Object.assign([], data.sessions);
    if (e.target.checked === true) {
      sessions.push(value);
    } else {
      const index = sessions.findIndex(session => session === value);
      if (index > -1) {
        sessions.splice(index, 1);
      }
    }
    data.sessions = sessions;
    this.setState({data});
  }

  isSelected(list, id) {
    const index = list.findIndex(item => item === id);
    if (index > -1) {
      return true;
    }
    return false;
  }

  getAppliedDiscount() {
    const {volumeDiscounts, session} = this.props;
    if (volumeDiscounts.status !== FULFILLED) {
      return;
    }
    const {orderItem} = session;
    const discounts = volumeDiscounts.data.volumeDiscounts;
    const noOfPurchase = orderItem.noOfPurchase;
    let match = null;
    let appiledDiscount = null;
    for (let i = 0; i < discounts.length; i++) {
      if (noOfPurchase >= discounts[i].numberOfSessions) {
        if (match) {
          if (match.numberOfSessions < discounts[i].numberOfSessions) {
            match = discounts[i];
          }
        } else {
          match = discounts[i];
        }
      }
    }
    if (match) {
      const discountReceivedPerSession = (volumeDiscounts.data.basePrice * match.discount) / 100;
      appiledDiscount = {
        discountReceivedPerSession,
        pricePerSessionAfterDiscount: volumeDiscounts.data.basePrice - discountReceivedPerSession
      };
    }
    return appiledDiscount;
  }

  getNewVolumeDiscount() {
    const {volumeDiscounts, session} = this.props;
    if (volumeDiscounts.status !== FULFILLED) {
      return;
    }
    const discounts = volumeDiscounts.data.volumeDiscounts;
    const noOfPurchase = session.orderItem.noOfPurchase;
    const basePrice = volumeDiscounts.data.basePrice;
    const noOfSessions = noOfPurchase - this.state.data.sessions.length;
    let appiledDiscount = null;
    let match = null;
    for (let i = 0; i < discounts.length; i++) {
      if (noOfSessions >= discounts[i].numberOfSessions) {
        if (match) {
          if (match.numberOfSessions < discounts[i].numberOfSessions) {
            match = discounts[i];
          }
        } else {
          match = discounts[i];
        }
      }
    }
    if (match) {
      const volumeDicountAfterCancel = basePrice - ((basePrice * match.discount) / 100);
      appiledDiscount = {
        noOfSessionToCancel: match.numberOfSessions,
        volumeDicountAfterCancel,
        balanceAmount: session.orderItem.totalPrice - (noOfSessions * volumeDicountAfterCancel),
        isVolumeDiscountApplicable: true
      };
    } else {
      appiledDiscount = {
        volumeDicountAfterCancel: basePrice,
        balanceAmount: session.orderItem.totalPrice - (noOfSessions * basePrice),
        isVolumeDiscountApplicable: false
      };
    }
    return appiledDiscount;
  }

  renderReasons() {
    const {reasons} = this.props;
    if (reasons.data.length) {
      return (
        <ul>
          {
            reasons.data.map(reason =>
              <li key={reason.id} ><a data-id={reason.id} onClick={this.handleReasonsSelect}>{reason.reason}</a></li>
            )
          }
        </ul>
      );
    }
  }

  renderFutureSessions() {
    const {futureSessions} = this.props;
    const {data} = this.state;
    return (
      futureSessions.data.map(session =>
        (
          <span key={session.id}>
            <input
              type="checkbox"
              value={session.id}
              checked={this.isSelected(data.sessions, session.id)}
              onChange={this.handleSessionSelectChange}
              name="session"
              id={session.id}
            />
            <label htmlFor={session.id}>{session.name}: {this.renderTemplate(session.lastEvent)}</label>
          </span>
        )
      )
    );
  }

  renderTemplate(lastEvent) {
    const {sessionEvents} = appConstants;
    const {p} = this.props;
    const {t} = p;
    const type = lastEvent.type;
    if (type === sessionEvents.scheduled) {
      return t('CancelFutureSessionsModal.sessionStatus.' + type, {
        date: moment(lastEvent.timestamp).format('DD[-]MMM[,] YYYY'),
        time: moment(lastEvent.timestamp).format('hh:mm A')
      });
    } else if (type === sessionEvents.unscheduled) {
      return t('CancelFutureSessionsModal.sessionStatus.' + type);
    } else if (type === sessionEvents.rejectedRescheduleRequest) {
      return t('CancelFutureSessionsModal.sessionStatus.' + type);
    }
  }

  renderVolumeDiscounts() {
    const {sessions} = this.state.data;
    const {session, p} = this.props;
    const {orderItem} = session;
    const {t} = p;
    if (sessions.length) {
      const newVolumeDiscount = this.getNewVolumeDiscount();
      if (newVolumeDiscount.isVolumeDiscountApplicable) {
        return t('CancelFutureSessionsModal.volume_discount', {
          noOfPurchase: orderItem.noOfPurchase,
          noOfSessionToCancel: newVolumeDiscount.noOfSessionToCancel,
          offerTerminology: session.offerTerminology.plural,
          volumeDicountAfterCancel: newVolumeDiscount.volumeDicountAfterCancel.toFixed(2),
          balanceAmount: newVolumeDiscount.balanceAmount.toFixed(2)
        });
      }
      return t('CancelFutureSessionsModal.without_volume_discount', {
        noOfPurchase: orderItem.noOfPurchase,
        offerTerminology: session.offerTerminology.plural,
        volumeDicountAfterCancel: newVolumeDiscount.volumeDicountAfterCancel.toFixed(2),
        balanceAmount: newVolumeDiscount.balanceAmount.toFixed(2)
      });
    }
  }

  render() {
    const {p, reasons, session} = this.props;
    const {orderItem} = session;
    const {t} = p;
    const {data} = this.state;
    const selectedReason = reasons.data.find(reason => reason.id === this.state.data.reasonId);
    const appliedDiscount = this.getAppliedDiscount();
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div className="degreeModal" id="cl-cencel-future-session">
          <div className="uk-modal-dialog uk-modal-dialog-medium">
            <a onClick={this.props.onClose} className="del uk-modal-close">
              <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                <g transform="translate(-1946.5 -5770.5)">
                  <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                  <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                </g>
              </svg>
            </a>
            <div className="cl-scheduler-modalHeader">
              {t('CancelFutureSessionsModal.cancel_future_session', {offerTerminology: session.offerTerminology.plural})}
            </div>
            <div className="cl-scheduler-modalForm">
              <div className="cl-scheduler-modalFormRow">
                {t('CancelFutureSessionsModal.reason')}:
                <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                  <button className="uk-button">{selectedReason ? selectedReason.reason : t('CancelFutureSessionsModal.select_reason')}<i className="cl-icon cl-icon-down"/>
                  </button>
                  <div className="cl-scheduler-modalOptions uk-dropdown cl-arrow-dropdown">
                    {this.renderReasons()}
                  </div>
                </div>
              </div>
              <div className="cl-scheduler-modalFormRow">
                <p>
                  {t('CancelFutureSessionsModal.heading',
                    {
                      noOfPurchase: orderItem.noOfPurchase,
                      offerTerminology: session.offerTerminology.plural,
                      coachName: session.ssp.name,
                      date: moment(session.order.date).format('DD[-]MMM[,] YYYY')
                    }
                  )}
                </p>
              </div>
              <div className="cl-scheduler-modalFormRow">
                <h6>
                  {t('CancelFutureSessionsModal.select',
                    {
                      offerTerminology: session.offerTerminology.plural
                    }
                  )}:
                </h6>
                {this.renderFutureSessions()}
              </div>
              <div className="cl-scheduler-modalFormRow">
                <a onClick={this.handleSubmit} className={'uk-button theme-orange-btn' + (isValid(data) ? '' : ' disabled')}>
                  {t('CancelFutureSessionsModal.cancel_sessions')}
                </a>
              </div>
            </div>
            <div className="cl-scheduler-modalContent">
              <p>
                {appliedDiscount && t('CancelFutureSessionsModal.discount_received', {
                  noOfPurchase: orderItem.noOfPurchase,
                  discountReceivedPerSession: appliedDiscount.discountReceivedPerSession.toFixed(2),
                  offerTerminology: session.offerTerminology.plural,
                  pricePerSessionAfterDiscount: appliedDiscount.pricePerSessionAfterDiscount.toFixed(2)
                })}
                {/* {this.renderVolumeDiscounts()} */}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      fetchReasons: PropTypes.func.isRequired,
      reasons: PropTypes.object.isRequired,
      session: PropTypes.object.isRequired,
      futureSessions: PropTypes.object.isRequired,
      volumeDiscounts: PropTypes.object.isRequired,
      athleteCancelFutureSessions: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      cancelFutureSessions: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: type => dispatch(fetchReasons(type)),
    athleteCancelFutureSessions: (params, data) => dispatch(athleteCancelFutureSessions(params, data))
  };
};

const mapStateToProps = state => {
  const {reasons, athlete, volumeDiscounts, userProfiles} = state;
  const {futureSessions, cancelFutureSessions} = athlete;
  const {selectedProfile} = userProfiles;
  return {
    reasons,
    futureSessions,
    volumeDiscounts,
    selectedProfile,
    cancelFutureSessions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(CancelFutureSessionsModal));

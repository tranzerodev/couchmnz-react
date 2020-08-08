import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import appConstant from '../../../../../constants/appConstants';
const {sessionEventActions} = appConstant;
const {ACCEPT_ALL, REMIND_ATHLETE, ACCEPT, REJECT, REJECT_ALL, APPLY_ACCEPT_DECLINE} = sessionEventActions;

import Modal from '../../../../common/Modal';
import RescheduleBookingModal from '../DashboardScheduleModals/RescheduleBookingModal';
import ConfirmationModal from '../../../../common/ConfirmationModal/ConfirmationModal';
import {sspBookingAction} from '../../../../../actions';
import {PENDING, FULFILLED, REJECTED} from '../../../../../constants/ActionTypes';

/* eslint react/no-deprecated:0  */
class SessionBookingActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    this.handleOkOnAction = this.handleOkOnAction.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.renderAccpetModal = this.renderAccpetModal.bind(this);
    this.renderRejectModal = this.renderRejectModal.bind(this);
    this.renderAcceptDeclineModal = this.renderAcceptDeclineModal.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {bookingActionStatus} = newProps;
    const oldBookingActionStatus = this.props.bookingActionStatus;
    if (oldBookingActionStatus === PENDING && bookingActionStatus === FULFILLED) {
      this.setState({
        error: false
      });
      this.props.onClose();
      const {location} = this.props.history;
      this.props.history.replace(location.pathname);
    } else if (oldBookingActionStatus === PENDING && bookingActionStatus === REJECTED) {
      this.setState({
        error: true
      });
    }
  }

  handleOnClose() {
    this.setState({
      error: false
    });
    this.props.onClose();
  }

  handleOkOnAction() {
    this.setState({error: false});
    const {selectedProfile, booking, action} = this.props;
    if (action === sessionEventActions.APPLY_ACCEPT_DECLINE) {
      const {accepted, declined} = booking;
      const payload = {
        acceptIdList: accepted, 
        declineIdList: declined
      };
      this.props.sspBookingAction(selectedProfile.type, selectedProfile.id, booking.id, {action, payload});
    } else {
      this.props.sspBookingAction(selectedProfile.type, selectedProfile.id, booking.id, {action});
    }
  }

  renderAccpetModal() {
    const {action, p} = this.props;
    const {error} = this.state;
    if (action === ACCEPT || action === ACCEPT_ALL) {
      const description = action === ACCEPT ? p.t('SessionBookingActions.accept.description') : p.t('SessionBookingActions.accept.description_all');
      return (
        <ConfirmationModal
          isModalOpen
          heading={p.t('SessionBookingActions.accept.heading')}
          description={description}
          okButtonLabel={p.t('SessionBookingActions.btnOk')}
          cancelButtonLabel={p.t('SessionBookingActions.btnCancel')}
          onOk={this.handleOkOnAction}
          onCancel={this.handleOnClose}
          error={error === true ? p.t('SessionBookingActions.accept.error') : null}
        />
      );
    }
  }

  renderAcceptDeclineModal() {
    const {action, p, booking} = this.props;
    const {error} = this.state;
    if (action === APPLY_ACCEPT_DECLINE) {
      const {accepted, declined} = booking;
      const description = p.t('SessionBookingActions.applyAcceptDecline.description', {accepted: accepted.length, declined: declined.length});

      return (
        <ConfirmationModal
          isModalOpen
          heading={p.t('SessionBookingActions.applyAcceptDecline.heading')}
          description={description}
          okButtonLabel={p.t('SessionBookingActions.btnOk')}
          cancelButtonLabel={p.t('SessionBookingActions.btnCancel')}
          onOk={this.handleOkOnAction}
          onCancel={this.handleOnClose}
          error={error === true ? p.t('SessionBookingActions.applyAcceptDecline.error') : null}
        />
      );
    }
  }

  renderRejectModal() {
    const {action, p} = this.props;
    const {error} = this.state;
    if (action === REJECT || action === REJECT_ALL) {
      const description = action === ACCEPT ? p.t('SessionBookingActions.reject.description') : p.t('SessionBookingActions.reject.description_all');
      return (
        <ConfirmationModal
          isModalOpen
          heading={p.t('SessionBookingActions.reject.heading')}
          description={description}
          okButtonLabel={p.t('SessionBookingActions.btnOk')}
          cancelButtonLabel={p.t('SessionBookingActions.btnCancel')}
          onOk={this.handleOkOnAction}
          onCancel={this.handleOnClose}
          error={error === true ? p.t('SessionBookingActions.reject.error') : null}
        />
      );
    }
  }

  render() {
    const {action, booking, p} = this.props;
    const {error} = this.state;
    return (
      <div>
        <Modal isModalOpen={(action === appConstant.sessionEventActions.RESCHEDULE)}>
          <RescheduleBookingModal booking={booking} onCancel={this.handleOnClose} error={error === true ? p.t('SessionBookingActions.accept.error') : null}/>
        </Modal>
        {
          this.renderAccpetModal()
        }
        <ConfirmationModal
          isModalOpen={(action === appConstant.sessionEventActions.CANCEL)}
          heading={p.t('SessionBookingActions.cancel.heading')}
          description={p.t('SessionBookingActions.cancel.description')}
          okButtonLabel={p.t('SessionBookingActions.btnOk')}
          cancelButtonLabel={p.t('SessionBookingActions.btnCancel')}
          onOk={this.handleOkOnAction}
          onCancel={this.handleOnClose}
          error={error === true ? p.t('SessionBookingActions.cancel.error') : null}
        />
        {
          this.renderRejectModal()
        }
        <ConfirmationModal
          isModalOpen={(action === REMIND_ATHLETE)}
          heading={p.t('SessionBookingActions.remind_athlete.heading')}
          description={p.t('SessionBookingActions.remind_athlete.description')}
          okButtonLabel={p.t('SessionBookingActions.btnOk')}
          cancelButtonLabel={p.t('SessionBookingActions.btnCancel')}
          onOk={this.handleOkOnAction}
          onCancel={this.handleOnClose}
          error={error === true ? p.t('SessionBookingActions.remind_athlete.error') : null}
        />
        {
          this.renderAcceptDeclineModal()
        }
      </div>
    );
  }
}

SessionBookingActions.propTypes = {
  history: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  booking: PropTypes.object,
  action: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  sspBookingAction: PropTypes.func.isRequired,
  selectedProfile: PropTypes.object.isRequired,
  bookingActionStatus: PropTypes.string
};

SessionBookingActions.defaultProps = {
  booking: null,
  action: null,
  bookingActionStatus: null
};

const mapStateToProps = state => {
  const {bookingActionStatus} = state;
  return {
    bookingActionStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sspBookingAction: (type, profileId, bookingId, data) => dispatch(sspBookingAction(type, profileId, bookingId, data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(SessionBookingActions)));

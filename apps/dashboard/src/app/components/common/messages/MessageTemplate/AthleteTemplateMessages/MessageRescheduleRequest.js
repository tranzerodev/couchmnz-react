import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import pathToRegExp from 'path-to-regexp';
import {withRouter} from 'react-router';

import appConstants from '../../../../../constants/appConstants';
const {sessionEventActions} = appConstants;
import BookingInfo from './BookingInfo';
import {DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS} from '../../../../../constants/pathConstants';

class MessageRescheduleRequest extends PureComponent {
  constructor(props) {
    super(props);
    this.handleProposeNewTime = this.handleProposeNewTime.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  handleProposeNewTime() {
    const {selectedProfile, message} = this.props;
    const {orderItem, scheduleId} = message.body;
    const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS);
    const path = toPath({orderItemId: orderItem.id, profileType: selectedProfile.type, scheduleId});
    this.props.history.push(path);
  }

  renderActions() {
    const {message, p, onAction} = this.props;
    const {canTakeAction} = message;
    if (canTakeAction === appConstants.apiBooleanFlags.TRUE) {
      return (
        <div className="msg_messagesDetail-scheduleActions msg_messagesDetail-scheduleActions--narrow uk-clearfix">
          <div className="msg_messagesDetail-scheduleCtas">
            <a onClick={onAction} data-action={sessionEventActions.ACCEPT} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-check"/> {p.t('btnAccept')}</a>
            <a onClick={onAction} data-action={sessionEventActions.REJECT} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-close"/> {p.t('btnDecline')}</a>
            <a onClick={this.handleProposeNewTime} data-action={sessionEventActions.RESCHEDULE} className="msg_messagesDetail-ctaBtn">{p.t('btnProposeNewTime')}</a>
          </div>
        </div>
      );
    }
  }

  render() {
    const {p, message} = this.props;
    const {session} = message.body;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-mail-open"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('sessionRescheduleRequest')}</strong>
          </div>

        </div>

        <BookingInfo session={session}/>

        {
          this.renderActions()
        }

      </div>
    );
  }
}
MessageRescheduleRequest.defaultProps = {

};

MessageRescheduleRequest.propTypes = {
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  onAction: PropTypes.func.isRequired,
  selectedProfile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default withRouter(translate('MessageRescheduleRequest')(MessageRescheduleRequest));


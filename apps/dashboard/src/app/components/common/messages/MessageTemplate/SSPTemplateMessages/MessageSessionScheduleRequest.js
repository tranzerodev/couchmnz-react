
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {Set as immutableSet} from 'immutable';

import SessionScheduleItem from './SessionScheduleItem';
import MessagePaymentInfoBlock from '../AthleteTemplateMessages/MessagePaymentInfoBlock';

import appConstants from '../../../../../constants/appConstants';
const {sessionEventActions} = appConstants;
const {ACCEPT, ACCEPT_ALL, REJECT, REJECT_ALL, APPLY_ACCEPT_DECLINE} = sessionEventActions;

class MessageSessionScheduleRequest extends Component {
  constructor(props) {
    super(props);

    const {message} = this.props;
    const {body} = message;
    const {totalSessionCount, sessionOrder} = body;
    const isMultipleSession = (totalSessionCount > 1);
    const accepted = [];
    sessionOrder.forEach(sessionOrderItem => {
      sessionOrderItem.sessions.forEach(session => {
        accepted.push(session.id);
      });
    });
    this.state = {
      isMultipleSession,
      accepted,
      declined: []
    };

    this.renderSessionItems = this.renderSessionItems.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.handleOnSelectSessionItem = this.handleOnSelectSessionItem.bind(this);
    this.handleApplyAcceptDecline = this.handleApplyAcceptDecline.bind(this);
  }

  handleOnSelectSessionItem(event) {
    const {dataset} = event.currentTarget;
    const {action, id} = dataset;
    const {accepted, declined} = this.state;
    let acceptedSet = immutableSet(accepted);
    let declinedSet = immutableSet(declined);
    if (action === sessionEventActions.ACCEPT) {
      declinedSet = declinedSet.remove(id);
      acceptedSet = acceptedSet.add(id);
    } else {
      declinedSet = declinedSet.add(id);
      acceptedSet = acceptedSet.remove(id);
    }
    this.setState({
      accepted: acceptedSet.toJS(),
      declined: declinedSet.toJS()
    });
  }

  handleApplyAcceptDecline() {
    const {accepted, declined} = this.state;
    this.props.onApplyAcceptDecline(APPLY_ACCEPT_DECLINE, accepted, declined);
  }

  renderSessionItems(sessionOrder) {
    const {p, userName, message} = this.props;
    const {canTakeAction} = message;
    const {id, sessions, skill, sport, ageGroup, name} = sessionOrder;
    const {isMultipleSession, accepted, declined} = this.state;

    const acceptedSet = immutableSet(accepted);
    const declinedSet = immutableSet(declined);
    return (
      <div key={id} className="msg_messagesDetail-scheduleContainer">
        <div className="msg_messagesDetail-scheduleHeader">
          <strong>{p.t('sessionDetails', {skill, sport, ageGroup})}</strong>
          <i className="uk-icon-circle"/> {name}
        </div>
        {
          sessions.map(sessionItem =>
            (
              <SessionScheduleItem
                key={sessionItem.id}
                sessionItem={{userName, skill, sport, ageGroup, ...sessionItem}}
                isMultipleSession={isMultipleSession}
                onAction={this.handleOnSelectSessionItem}
                takeAction={canTakeAction === appConstants.apiBooleanFlags.TRUE}
                accepted={acceptedSet.has(sessionItem.id)}
                declined={declinedSet.has(sessionItem.id)}
              />
            ))
        }
      </div>
    );
  }

  renderActions() {
    const {message, p, onAction} = this.props;
    const {canTakeAction} = message;
    const {isMultipleSession, accepted, declined} = this.state;
    const showApplyBtn = (accepted.length > 0) && (declined.length > 0);
    if (canTakeAction === appConstants.apiBooleanFlags.TRUE) {
      return (
        <div className="msg_messagesDetail-scheduleCtas">
          <a onClick={onAction} data-action={isMultipleSession ? ACCEPT_ALL : ACCEPT} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-check"/>{ (isMultipleSession) ? p.t('acceptAll') : p.t('accept')}</a>
          {(isMultipleSession === true && showApplyBtn === true) ? <a onClick={this.handleApplyAcceptDecline} data-action={APPLY_ACCEPT_DECLINE} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-check"/> {p.t('apply')}</a> : ''}
          <a onClick={onAction} data-action={isMultipleSession ? REJECT_ALL : REJECT} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-close"/> { (isMultipleSession) ? p.t('declineAll') : p.t('decline')}</a>
        </div>
      );
    }
    return null;
  }

  render() {
    const {message, p} = this.props;
    const {body} = message;
    const {sessionOrder, totalSessionCount, paymentInfo} = body;
    const {isMultipleSession} = this.state;
    return (
      <div>
        <div className="msg_messagesDetail-scheduleActions uk-clearfix">
          <div className="msg_messagesDetail-scheduleCount">{p.t('numberSession', {totalSessionCount})}</div>
          {
            this.renderActions()
          }
        </div>
        <div className="msg_messagesDetail-messageContent uk-clearfix">
          {
            sessionOrder.map(session => this.renderSessionItems(session))
          }
          {
            (isMultipleSession === true) ?
              <div><h4>{p.t('paymentDetails')}</h4>
                <MessagePaymentInfoBlock paymentInfo={paymentInfo}/>
              </div> : ''
          }
        </div>
      </div>
    );
  }
}
MessageSessionScheduleRequest.defaultProps = {

};

MessageSessionScheduleRequest.propTypes = {
  message: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  onApplyAcceptDecline: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  onAction: PropTypes.func.isRequired
};
export default translate('MessageSessionScheduleRequest')(MessageSessionScheduleRequest);

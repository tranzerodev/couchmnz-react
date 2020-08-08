
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import pathToRegExp from 'path-to-regexp';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';
import MessageSessionDetails from '../MessageSessionDetails';
import appConstants from '../../../../../constants/appConstants';
import {DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS, DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED} from '../../../../../constants/pathConstants';
import {getUrlWithProfileType} from '../../../../../utils/path';
const {sessionEventActions} = appConstants;
const {ACCEPT} = sessionEventActions;

class MessageRescheduleDeclineProposeNewTime extends PureComponent {
  constructor(props) {
    super(props);
    this.handleReschedule = this.handleReschedule.bind(this);
  }

  handleReschedule() {
    const {message, selectedProfile} = this.props;
    const {orderItem, scheduleId} = message.body;
    const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS);
    const path = toPath({orderItemId: orderItem.id, profileType: selectedProfile.type, scheduleId});
    this.props.history.push(path);
  }

  render() {
    const {p, message, name, onAction, selectedProfile} = this.props;
    const {body, canTakeAction} = message;
    const {session, SSPName} = body;
    const {sessionDateTime} = session;
    const dateTime = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    const path = getUrlWithProfileType(DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED, selectedProfile.type);

    return (

      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('messageRescheduleDecline', {SSPName, dateTime, ...session})}</p>
          <div className="msg-content-border"/>
          <MessageSessionDetails session={session}/>

          {(canTakeAction === appConstants.apiBooleanFlags.TRUE) ? <p><a onClick={onAction} data-action={ACCEPT}>{p.t('accept')}</a></p> : ''}
          {(canTakeAction === appConstants.apiBooleanFlags.TRUE) ? <p><a onClick={this.handleReschedule}>{p.t('reschedule')}</a></p> : ''}
          <p>{p.t('youCanManageSessions')}<Link to={path}>{p.t('dashboard')}</Link>.</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageRescheduleDeclineProposeNewTime.defaultProps = {

};

MessageRescheduleDeclineProposeNewTime.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  onAction: PropTypes.func.isRequired,
  selectedProfile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default withRouter(translate('MessageRescheduleDeclineProposeNewTime')(MessageRescheduleDeclineProposeNewTime));


import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import {Link} from 'react-router-dom';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';
import {getUrlWithProfileType} from '../../../../../utils/path';
import {DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED} from '../../../../../constants/pathConstants';

class MessageRescheduleRequestConfirm extends PureComponent {
  render() {
    const {p, name, message, selectedProfile} = this.props;
    const {body} = message;
    const {session, SSPName} = body;
    const {sessionDateTime} = session;
    const dateTime = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    const path = getUrlWithProfileType(DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED, selectedProfile.type);

    return (

      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('sessionRescheduleDetails', {SSPName, dateTime, ...session})}</p>
          <div className="msg-content-border"/>
          <p>{p.t('youCanManageSession')} <Link to={path}>{p.t('dashboard')}</Link>.</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageRescheduleRequestConfirm.defaultProps = {

};

MessageRescheduleRequestConfirm.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  selectedProfile: PropTypes.object.isRequired
};
export default translate('MessageRescheduleRequestConfirm')(MessageRescheduleRequestConfirm);


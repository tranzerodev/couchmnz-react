
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';

class MessageRequestRateService extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {session, SSPName} = body;
    const {sessionDateTime} = session;
    const dateTime = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sessionDateTimeFormat')) : undefined;
    return (

      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('msgRequestRating', {SSPName, dateTime, ...session})}</p>
          <p>{p.t('weHopeTrainingSession')}</p>
          <p>
            <a href="#">{SSPName}</a> {p.t('isReviewServices')}
            <a href="#">{p.t('review')}</a> {p.t('rateProviderDashboard')}
          </p>
          <p>{p.t('dontForgetRewardsPoints')}</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>
        </div>

      </div>
    );
  }
}
MessageRequestRateService.defaultProps = {

};

MessageRequestRateService.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageRequestRateService')(MessageRequestRateService);


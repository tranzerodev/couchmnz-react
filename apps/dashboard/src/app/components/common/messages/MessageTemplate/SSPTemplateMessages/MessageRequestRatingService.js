import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';

class MessageRequestRatingService extends PureComponent {
  render() {
    const {p, name} = this.props;
    return (
      <div className="msg_messagesDetail-messageContent">
        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('yourEarningsRecentMonth')}</p>
          <p> {p.t('login')} <a href="#">{p.t('here')}</a>{p.t('toSeeHowMuchYouEarn')}</p>
          <p>{p.t('toChangeYourSettings')}</p>
          <p>{p.t('anyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>
      </div>
    );
  }
}
MessageRequestRatingService.defaultProps = {

};

MessageRequestRatingService.propTypes = {
  name: PropTypes.string.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageRequestRatingService')(MessageRequestRatingService);


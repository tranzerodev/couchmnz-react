import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';

class MessageRequestReceivedFundWithdraw extends PureComponent {
  render() {
    const {p, name} = this.props;
    return (

      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('messageDetails')} <a href="#">{p.t('here')}</a>. </p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageRequestReceivedFundWithdraw.defaultProps = {

};

MessageRequestReceivedFundWithdraw.propTypes = {
  name: PropTypes.string.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageRequestReceivedFundWithdraw')(MessageRequestReceivedFundWithdraw);

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {Link} from 'react-router-dom';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';
import {DASHBOARD_ACCOUNT_PAYOUT_DETAILS} from '../../../../../constants/pathConstants';

class MessageFundTransferBank extends PureComponent {
  render() {
    const {p, name} = this.props;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('messageDetails')} <Link to={DASHBOARD_ACCOUNT_PAYOUT_DETAILS}> {p.t('here')}</Link>. </p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageFundTransferBank.defaultProps = {

};

MessageFundTransferBank.propTypes = {
  name: PropTypes.string.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageFundTransferBank')(MessageFundTransferBank);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

const dispayRecipeints = (recipients, index) => (
  <span key={index}>
    <a className="cl-icon-profile"><img src={recipients[0].profilePic} alt={recipients[0].displayName}/></a>
    <div className="msg_messagesDetail-authors">
      <span><a ><strong>{recipients.map(recipient => recipient.displayName).join(', ')}</strong></a></span>
    </div>
  </span>
);

class SentMessageView extends Component {
  constructor(props) {
    super(props);
    this.handleOnClickReplyMessage = this.handleOnClickReplyMessage.bind(this);
    this.handleOnClickForwardMessage = this.handleOnClickForwardMessage.bind(this);
  }

  handleOnClickReplyMessage() {
    const {message, onReply} = this.props;
    onReply(message);
  }

  handleOnClickForwardMessage() {
    const {message, onForward} = this.props;
    onForward(message);
  }
  render() {
    const {message, p} = this.props;
    const {body, to, timestamp} = message;

    const parsedDateString = (moment(timestamp)).format(p.t('SentMessageView.messageDateTime'));
    return (

      <div className="msg_messagesDetail-container">
        <div className="msg_messagesDetail-messageHeader uk-clearfix">
          <div className="msg_messagesDetail-senderInfo">
            {
              dispayRecipeints(to)
            }

          </div>
          <div className="msg_messagesDetail-headerActions">
            <div className="msg_messagesHeaderActions-dropdown uk-button-dropdown" data-uk-dropdown="{mode:'click'}">
              {/* <!-- This is the element toggling the dropdown --> */}
              <a className="msg_messagesHeaderActions-dropdownTrigger"><i className="cl-icon cl-icon--small cl-icon-msg-more"/></a>
              {/* <!-- This is the dropdown --> */}
              <div className="uk-dropdown cl-arrow-dropdown cl-arrow-dropdown--absright">
                <ul>
                  <li><a onClick={this.handleOnClickReplyMessage}>{p.t('RecievedMessageHeader.reply')}</a></li>
                  <li><a onClick={this.handleOnClickForwardMessage}>{p.t('RecievedMessageHeader.forward')}</a></li>
                </ul>
              </div>
            </div>
            <span className="msg_messagesDetail-headerTimestamps">{parsedDateString}</span>
          </div>
        </div>
        <div className="msg_messagesDetail-messageContent">{reactHtmlParser(body)}</div>
      </div>

    );
  }
}
SentMessageView.propTypes = {
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  onReply: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired
};

export default translate(SentMessageView);

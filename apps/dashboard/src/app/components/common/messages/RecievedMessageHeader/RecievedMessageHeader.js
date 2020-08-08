import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import translate from 'redux-polyglot/translate';

export class RecievedMessageHeader extends Component {
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
    const {from, timestamp} = message;
    const parsedDateString = (moment(timestamp)).format(p.t('messageDateTime'));

    return (
      <div className="msg_messagesDetail-messageHeader uk-clearfix">
        <div className="msg_messagesDetail-senderInfo">
          <div className="msg_messagesAuthorInfo-dropdown uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
            <a className="cl-icon-profile"><img src={from.profilePic} alt={from.displayName}/></a>
            <div className="uk-dropdown uk-clearfix">
              <div className="msg_flyOutProfilePic">
                <img src={from.profilePic} alt={from.displayName}/>
              </div>
              <div className="msg_flyOutProfileDetail">
                <span><strong>{from.displayName}</strong></span>
                {/* Needs to change  <span>Santa Clara, CA</span>
                <span>M, 25 y <i className="uk-icon-circle"/> Soccer (Intermediate) <i className="uk-icon-circle"/> Tennis (Intermediate)</span> */}
              </div>
            </div>
          </div>

          <div className="msg_messagesDetail-authors">
            <span><a ><strong>{from.displayName}</strong></a></span>
            <span><a >{p.t('toMe')}</a></span>
          </div>
        </div>
        <div className="msg_messagesDetail-headerActions">

          <div className="msg_messagesHeaderActions-dropdown uk-button-dropdown" data-uk-dropdown="{mode:'click'}">
            {/* <!-- This is the element toggling the dropdown --> */}
            <a className="msg_messagesHeaderActions-dropdownTrigger"><i className="cl-icon cl-icon--small cl-icon-msg-more"/></a>
            {/* <!-- This is the dropdown --> */}
            <div className="uk-dropdown cl-arrow-dropdown cl-arrow-dropdown--absright">
              <ul>
                <li><a onClick={this.handleOnClickReplyMessage}>{p.t('reply')}</a></li>
                <li><a onClick={this.handleOnClickForwardMessage}>{p.t('forward')}</a></li>
              </ul>
            </div>
          </div>
          <span className="msg_messagesDetail-headerTimestamps">{parsedDateString}</span>
        </div>
      </div>
    );
  }
}

RecievedMessageHeader.propTypes = {
  message: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};

export default translate('RecievedMessageHeader')(RecievedMessageHeader);

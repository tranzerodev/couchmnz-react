import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';

import RecievedMessageHeader from '../RecievedMessageHeader';

export default class RecievedMessageView extends Component {
  constructor(props) {
    super(props);
    this.handleOnReplyMessage = this.handleOnReplyMessage.bind(this);
    this.handleOnForwardMessage = this.handleOnForwardMessage.bind(this);
  }

  handleOnReplyMessage() {
    const {message, onReply} = this.props;
    onReply(message);
  }

  handleOnForwardMessage() {
    const {message, onForward} = this.props;
    onForward(message);
  }

  render() {
    const {message} = this.props;
    const {body} = message;
    return (

      <div className="msg_messagesDetail-container">
        <RecievedMessageHeader message={message} onReply={this.handleOnReplyMessage} onForward={this.handleOnForwardMessage}/>
        <div className="msg_messagesDetail-messageContent">
          <div className="msg_messagesDetail-messageSimple">
            {reactHtmlParser(body)}
          </div>
        </div>
      </div>
    );
  }
}

RecievedMessageView.propTypes = {
  message: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired
};

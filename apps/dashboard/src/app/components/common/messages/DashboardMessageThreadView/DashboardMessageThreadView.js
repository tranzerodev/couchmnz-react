import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BarLoader} from 'react-spinners';

import Modal from '../../Modal';
import MessageComposer from '../MessageComposer';
import config from '../../../../config';
import RecievedMessageView from '../RecievedMessageView';
import SentMessageView from '../SentMessageView';
import MessageTemplate from '../MessageTemplate';
import {PENDING} from '../../../../constants/ActionTypes';
import MessageThreadViewToolbar from '../MessageThreadViewToolbar';
import {setMessageDetailPane} from '../../../../utils/uiJsUtils';
import SessionBookingActions from '../../../ssp/isp/dashboard/SessionBookingActions';

const {MESSAGE_TYPE} = config.messagingSystem;

const getLastRecievedMessage = messages => {
  let lastRecievedMessage = null;
  messages.forEach(message => {
    const {type} = message;
    if (type === MESSAGE_TYPE.MESSAGE_RECEIVED) {
      if (lastRecievedMessage) {
        if (message.timestamp > lastRecievedMessage.timestamp) {
          lastRecievedMessage = message;
        }
      } else {
        lastRecievedMessage = message;
      }
    }
  });
  return lastRecievedMessage;
};

class DashboardMessageThreadView extends Component {
  constructor(props) {
    super(props);
    const {thread} = this.props;
    let choosedLabels = [];
    if (thread) {
      const {labels} = thread;
      if (labels) {
        choosedLabels = labels;
      }
    }

    this.state = {
      isOpenReplyMessageModal: false,
      replyMessage: null,
      choosedLabels,
      booking: null,
      action: null
    };
    this.displayMessage = this.displayMessage.bind(this);
    this.handleOnReplyClick = this.handleOnReplyClick.bind(this);
    this.handleOnReplyAllClick = this.handleOnReplyAllClick.bind(this);
    this.handleReplyMessage = this.handleReplyMessage.bind(this);
    this.handleOnCancelMessageComposer = this.handleOnCancelMessageComposer.bind(this);
    this.handleReplyOnSpecificMessage = this.handleReplyOnSpecificMessage.bind(this);
    this.handleForwardMessage = this.handleForwardMessage.bind(this);
    this.handleClearBookingAction = this.handleClearBookingAction.bind(this);
    this.handleManageBookingAction = this.handleManageBookingAction.bind(this);
  }

  componentDidMount() {
    setMessageDetailPane();
  }

  componentDidUpdate() {
    setMessageDetailPane();
  }

  handleOnCancelMessageComposer() {
    const isOpenReplyMessageModal = false;
    this.setState({isOpenReplyMessageModal});
  }

  handleOnReplyClick() {
    const {thread} = this.props;
    const {messages} = thread;
    const lastRecievedMessage = getLastRecievedMessage(messages);
    if (lastRecievedMessage) {
      this.handleReplyMessage(lastRecievedMessage);
    }
  }

  handleOnReplyAllClick() {
    const isOpenReplyMessageModal = true;
    const {thread, profileID} = this.props;
    const {subject, members, id} = thread;
    const to = members.filter(member => member.id !== profileID);
    const replyMessage = {
      subject,
      to,
      threadId: id
    };
    this.setState({isOpenReplyMessageModal, replyMessage});
  }

  handleReplyMessage(message) {
    const isOpenReplyMessageModal = true;
    const {thread} = this.props;
    const {subject, from} = message;
    const replyMessage = {
      subject,
      to: [from],
      threadId: thread.id
    };
    this.setState({isOpenReplyMessageModal, replyMessage});
  }

  handleForwardMessage(message) {
    const isOpenReplyMessageModal = true;
    const {subject} = message;
    const replyMessage = {
      subject,
      forwarded: message
    };
    this.setState({isOpenReplyMessageModal, replyMessage});
  }

  handleReplyOnSpecificMessage(message) {
    this.handleReplyMessage(message);
  }

  handleManageBookingAction(booking, action) {
    this.setState({
      booking, action
    });
  }

  handleClearBookingAction() {
    this.setState({
      booking: null,
      action: null
    });
  }

  displayMessage(message, index) {
    const {type} = message;
    switch (type) {
      case MESSAGE_TYPE.MESSAGE_RECEIVED: {
        return (
          <RecievedMessageView
            key={index}
            message={message}
            onReply={this.handleReplyOnSpecificMessage}
            onForward={this.handleForwardMessage}
          />
        );
      }
      case MESSAGE_TYPE.MESSAGE_SENT: {
        return (<SentMessageView key={index} message={message} onReply={this.handleReplyOnSpecificMessage} onForward={this.handleForwardMessage}/>);
      }
      default: {
        return (
          <MessageTemplate
            key={index}
            message={message}
            onReply={this.handleReplyOnSpecificMessage}
            onForward={this.handleForwardMessage}
            onBookingAction={this.handleManageBookingAction}
          />
        );
      }
    }
  }

  render() {
    const {thread, fetchingStatus, profile} = this.props;
    const {isOpenReplyMessageModal, replyMessage, booking, action} = this.state;
    const showLoadingSpiner = (fetchingStatus === PENDING);
    if (thread) {
      const {subject, messages} = thread;
      return (
        <div>
          <MessageThreadViewToolbar onReplyAllClick={this.handleOnReplyAllClick} onReplyClick={this.handleOnReplyClick} thread={thread}/>
          <div className="msg_messagesDetail-subject">
            <span className="msg_messagesDetail-subjectLine">{subject}</span>
          </div>
          {
            messages.map(this.displayMessage)
          }
          <Modal isModalOpen={isOpenReplyMessageModal}>
            <MessageComposer onCancel={this.handleOnCancelMessageComposer} message={replyMessage}/>
          </Modal>
          <SessionBookingActions
            booking={booking}
            action={action}
            onClose={this.handleClearBookingAction}
            selectedProfile={profile}
          />
        </div>
      );
    }
    return <BarLoader loading={showLoadingSpiner}/>;
  }
}
DashboardMessageThreadView.defaultProps = {
  thread: null,
  fetchingStatus: null
};

DashboardMessageThreadView.propTypes = {
  thread: PropTypes.object,
  fetchingStatus: PropTypes.string,
  profileID: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {selectedThread, labels, profile} = state.messages;
  return {
    thread: selectedThread.data,
    fetchingStatus: selectedThread.status,
    labels,
    profileID: profile.id,
    profile
  };
};

export default connect(mapStateToProps)(DashboardMessageThreadView);


import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DraftMessage from '../DraftMessage';
import Modal from '../../Modal';
import MessageComposer from '../MessageComposer';
import MessageThreadListSorter from '../MessageThreadListSorter';

class DashboardDraftMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNewMessageModal: false,
      selectedDraft: null
    };
    this.handleOnCancelMessageComposer = this.handleOnCancelMessageComposer.bind(this);
    this.handleOnClickDraftMessage = this.handleOnClickDraftMessage.bind(this);
    this.renderDraftMessages = this.renderDraftMessages.bind(this);
  }

  handleOnCancelMessageComposer() {
    const isOpenNewMessageModal = false;
    this.setState({isOpenNewMessageModal});
  }
  handleOnClickDraftMessage(draftMessage) {
    const isOpenNewMessageModal = true;
    console.log(draftMessage);
    this.setState({isOpenNewMessageModal, selectedDraft: draftMessage});
  }
  renderDraftMessages(draftMessage, index) {
    return (<DraftMessage key={index} onSelect={this.handleOnClickDraftMessage} index={index} draftMessage={draftMessage}/>);
  }

  render() {
    const {draftMessages} = this.props;

    const {isOpenNewMessageModal, selectedDraft} = this.state;
    return (
      <div className="uk-width-xlarge-3-10 uk-width-large-4-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="msg_messagesList msg_columns">
          <MessageThreadListSorter/>
          <div className="msg_messagesList-container">
            {
              draftMessages.map(this.renderDraftMessages)
            }
          </div>
        </div>
        <Modal isModalOpen={isOpenNewMessageModal}>
          <MessageComposer onCancel={this.handleOnCancelMessageComposer} message={selectedDraft}/>
        </Modal>
      </div>

    );
  }
}

DashboardDraftMessage.defaultProps = {
  draftMessages: []
};

DashboardDraftMessage.propTypes = {
  draftMessages: PropTypes.array
};
const matchStateToProps = state => {
  const {drafts} = state.messages;
  const draftMessages = drafts.data;
  return {
    draftMessages
  };
};
export default connect(matchStateToProps)(DashboardDraftMessage);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
import ReactTags from '../ReactTagAutoComplete';
import translate from 'redux-polyglot/translate';
import reactHtmlParser from 'react-html-parser';
import moment from 'moment';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './reac-tag.css';

import ShowMessageStatus from './ShowMessageStatus';
import {sendMessage, clearSentMessageStatus, clearDraftMessageStatus, saveToDrafts, searchMessageRecipients, deleteMessageAttachment} from '../../../../actions';
import FileAttachmentControl from './FileAttachmentControl';
import FileAttachmentUploadProgress from './FileAttachmentUploadProgress';
import {fileAttachmentBlockRenderer, insertFileAttachment, deleteFileAttachment, convertToHtml, getRawContent, convertToEditorState} from './ComposerUtils';
import {messageUploadImageCallBack} from '../../../../actions';
import {validateMessages} from '../../../../validators/common/messages';
import {PROGRESS, FULFILLED} from '../../../../constants/ActionTypes';
import config from '../../../../config';

/* eslint react/jsx-handler-names: 0 react/forbid-component-props: 0 */
class MessageComposer extends Component {
  constructor(props) {
    super(props);
    const {draftId, threadId, to, from, subject, body, attachments} = this.props.message;
    const profile = (from) ? from : this.props.profile;
    const editorState = (body) ? convertToEditorState(body) : EditorState.createEmpty();
    const messageTo = (to) ? to : [];
    const validation = validateMessages({to: messageTo, subject});
    const messageAttachments = (attachments) ? attachments : [];
    this.state = {
      editorState,
      to: messageTo,
      draftId,
      attachments: messageAttachments,
      threadId,
      saveToDrafts: false,
      subject,
      from: profile,
      uploadNewFile: false,
      validation,
      isSend: false,
      isValidAttachment: true
    };

    this.editorBlockRenderer = this.editorBlockRenderer.bind(this);
    this.insertAttachment = this.insertAttachment.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);

    this.handleToTagAddition = this.handleToTagAddition.bind(this);
    this.handleToTagDelete = this.handleToTagDelete.bind(this);

    this.onEditorStateChange = this.onEditorStateChange.bind(this);

    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);

    this.handleOnSuccessStatus = this.handleOnSuccessStatus.bind(this);
    this.handleSaveToDraftsClick = this.handleSaveToDraftsClick.bind(this);

    this.handleClearMessageStatus = this.handleClearMessageStatus.bind(this);
    this.handleUploadImageCallback = this.handleUploadImageCallback.bind(this);
    this.handleValidFileAttachment = this.handleValidFileAttachment.bind(this);

    this.handleRecipientSearchInputChange = this.handleRecipientSearchInputChange.bind(this);

    this.renderProfiles = this.renderProfiles.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleFromChange(event) {
    const {userProfiles} = this.props;
    const {dataset} = event.currentTarget;
    const profileId = dataset.value;
    const from = userProfiles.find(userProfile => userProfile.id === profileId);
    this.setState({
      from
    });
    console.log(from);
  }

  componentWillReceiveProps(nextProps) {
    const {attachment} = nextProps;
    if (this.props.attachment.status === PROGRESS && attachment.status === FULFILLED) {
      const fileAttachment = {
        name: attachment.data.name,
        id: attachment.data.id,
        url: attachment.data.url,
        size: attachment.data.size
      };
      this.insertAttachment(fileAttachment);
    }
  }

  handleSubjectChange(event) {
    const subject = event.target.value;
    const {to} = this.state;
    const validation = validateMessages({to, subject});
    this.setState({subject, validation});
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  handleSaveToDraftsClick() {
    const saveToDrafts = true;
    this.setState({saveToDrafts, isSend: false});

    const {from, subject, to, editorState, draftId, threadId, attachments, validation} = this.state;
    const {forwarded} = this.props.message;
    let forwardedMessageId = null;
    if (validation.subject === true) {
      if (forwarded) {
        forwardedMessageId = forwarded.id;
      }
      const messageTo = to.map(user => {
        const {id, type, nickname} = user;
        return {id, type, nickname};
      });
      const body = getRawContent(editorState);
      const message = {
        to: messageTo,
        from,
        subject,
        forwarded: forwardedMessageId,
        draftId,
        attachments,
        threadId,
        body
      };
      console.log(message);
      this.props.onSaveToDrafts(from.id, message);
      this.handleOnSuccessStatus();
    }
  }

  handleSendClick() {
    const saveToDrafts = false;
    this.setState({saveToDrafts, isSend: true});

    const {from, subject, to, editorState, draftId, threadId, attachments, validation} = this.state;
    const {forwarded} = this.props.message;
    let forwardedMessageId = null;
    if (validation.valid === true) {
      if (forwarded) {
        forwardedMessageId = forwarded.id;
      }
      const messageTo = to.map(user => {
        const {id, type, nickname} = user;
        return {id, type, nickname};
      });
      const body = convertToHtml(editorState);
      const message = {
        to: messageTo,
        from,
        subject,
        forwarded: forwardedMessageId,
        draftId,
        attachments,
        threadId,
        body
      };
      this.props.onSend(from.id, message);
      this.handleOnSuccessStatus();
    }
  }

  handleUploadImageCallback(file) {
    const profileID = this.state.from.id;
    return messageUploadImageCallBack(file, profileID);
  }

  handleOnSuccessStatus() {
    this.handleClearMessageStatus();
    this.handleCancelClick();
  }

  handleClearMessageStatus() {
    const {saveToDrafts} = this.state;
    if (saveToDrafts) {
      this.props.clearDraftMessageStatus();
    } else {
      this.props.clearSentMessageStatus();
    }
  }

  handleToTagDelete(index) {
    if (index >= 0) {
      console.log('Deleted recipient', index);
      const messageTo = [].concat(this.state.to);
      messageTo.splice(index, 1);
      const {subject} = this.state;
      const validation = validateMessages({to: messageTo, subject});
      this.setState({to: messageTo, validation});
    }
  }
  handleValidFileAttachment(isValidAttachment) {
    this.setState({isValidAttachment});
  }
  editorBlockRenderer(contentBlock) {
    const {editorState} = this.state;
    return fileAttachmentBlockRenderer(editorState, contentBlock, this.deleteAttachment);
  }

  insertAttachment(attachment) {
    const {editorState, attachments} = this.state;
    const finalState = insertFileAttachment(editorState, attachment);
    this.setState({editorState: finalState, attachments: [...attachments, attachment]});
  }

  deleteAttachment(blockKey, attachmentId) {
    const {editorState, attachments, from} = this.state;
    const finalState = deleteFileAttachment(editorState, blockKey);
    const attachmentIndex = attachments.findIndex(attachment => (attachment.id === attachmentId));
    if (attachmentIndex > -1) {
      attachments.splice(attachmentIndex, 1);
      deleteMessageAttachment(from.id, attachmentId);
    }
    this.setState({editorState: finalState});
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    });
  }

  handleToTagAddition(recipient) {
    console.log('Handle add', recipient);
    const messageTo = [].concat(this.state.to, recipient);
    const {subject} = this.state;
    const validation = validateMessages({to: messageTo, subject});
    this.setState({to: messageTo, validation});
  }

  renderForwardedMessage(forwardedMessage) {
    const {p} = this.props;
    if (forwardedMessage) {
      const {body, to, timestamp, from} = forwardedMessage;
      const parsedDateString = (moment(timestamp)).format(p.t('RecievedMessageHeader.messageDateTime'));
      const toString = to.map(item => item.displayName).join(', ');
      return (
        <div className="cl-sd-oldmessage">
          <div className="cl-old-message-head">
            <span>{p.t('MessageComposer.forwardMessage.from', {name: from.displayName})}</span>
            <span>{p.t('MessageComposer.forwardMessage.date', {dateString: parsedDateString})}</span>
            <span>{p.t('MessageComposer.forwardMessage.to', {toNames: toString})}</span>
          </div>
          {
            reactHtmlParser(body)
          }
        </div>
      );
    }
  }

  handleRecipientSearchInputChange(input) {
    const {from} = this.state;
    const {searchMessageRecipients} = this.props;
    searchMessageRecipients(from.id, input);
  }

  renderProfiles(userProfile) {
    const {id, displayName} = userProfile;
    return (
      <li key={id} data-value={id} onClick={this.handleFromChange}><a>{displayName}</a></li>
    );
  }
  renderError() {
    const {validation, isSend, saveToDrafts, isValidAttachment} = this.state;
    const {p} = this.props;
    if (validation.valid === false && isSend === true) {
      let errorMessage = '';
      if (validation.to === false && validation.subject === false) {
        errorMessage = p.t('MessageComposer.ValidationMessages.toAndSubjectEmpty');
      } else if (validation.subject === false) {
        errorMessage = p.t('MessageComposer.ValidationMessages.subjectEmpty');
      } else if (validation.to === false) {
        errorMessage = p.t('MessageComposer.ValidationMessages.toEmpty');
      }
      return (
        <div className="cl-new-msg-error">
          <p>{errorMessage}</p>
        </div>);
    } else if (validation.subject === false && saveToDrafts === true) {
      return (
        <div className="cl-new-msg-error"><p>{p.t('MessageComposer.ValidationMessages.subjectEmpty')}</p></div>
      );
    } else if (isValidAttachment === false) {
      return (
        <div className="cl-new-msg-error"><p>{p.t('MessageComposer.ValidationMessages.fileSizeExceedsLimtit', {limit: config.messagingSystem.maxFileSizeLimit})}</p></div>
      );
    }
  }

  render() {
    const {from, to, subject, editorState} = this.state;
    const {userProfiles, recipients, title, p, attachment} = this.props;
    return (
      <div className="uk-modal-dialog uk-modal-dialog-large">
        <div className="cl-new-message">
          <div className="cl-nm-subject">
            <h3>{title}</h3>
          </div>
          <div className="cl-nm-header">
            <div className="cl-from-container uk-clearfix">
              <label>{p.t('MessageComposer.lblFrom')}</label>
              <div className="cl-from-label" data-uk-dropdown="{mode:'click'}">

                <a ><span>{from.displayName}<i className="uk-icon-angle-down"/></span></a>

                <div className="uk-dropdown cl-arrow-dropdown">
                  <ul>
                    {
                      userProfiles.map(this.renderProfiles)
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="cl-to-container uk-clearfix">
              <label>{p.t('MessageComposer.lblTo')}</label>
              <ReactTags
                placeholder={p.t('MessageComposer.addRecipientPlaceHolder')}
                handleDelete={this.handleToTagDelete}
                handleAddition={this.handleToTagAddition}
                handleInputChange={this.handleRecipientSearchInputChange}
                tags={to}
                suggestions={recipients}
              />
            </div>
            <div className="cl-subject-container uk-clearfix">
              <label>{p.t('MessageComposer.lblSubject')}</label>
              <input type="text" placeholder={p.t('MessageComposer.subjectPlaceHolder')} onChange={this.handleSubjectChange} value={subject}/>
            </div>
          </div>
          <div className="cl-nm-body">
          <p className="cl-only-mobile">{p.t('MessageComposer.mobileViewErrorMessage')}</p>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              customBlockRenderFunc={this.editorBlockRenderer}
              onEditorStateChange={this.onEditorStateChange}
              editorStyle={{
                height: 200
              }}
              toolbar={{
                options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'image'],
                inline: {
                  options: ['bold', 'italic', 'underline']
                },
                image: {
                  urlEnabled: false,
                  uploadEnabled: true,
                  alignmentEnabled: true,
                  uploadCallback: this.handleUploadImageCallback,
                  inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                  alt: {present: true, mandatory: false},
                  defaultSize: {
                    height: 'auto',
                    width: 'auto'
                  }
                }
              }}
              toolbarCustomButtons={[<FileAttachmentControl key="fileUpload" profileID={from.id} isValidAttachment={this.handleValidFileAttachment} onAttachmentUploadSuccess={this.insertAttachment}/>]}
            />
          </div>

          {
            this.renderForwardedMessage(this.props.message.forwarded)

          }
          {
            this.renderError()
          }
          {
            (attachment.status === PROGRESS) ? <FileAttachmentUploadProgress fileName={attachment.data.attachmentFileName}percentage={attachment.data.uploadPercentage} requestID={attachment.data.requestId}/> : ''
          }

          <div className="cl-modal-actions">
            <a className="cl-modal-actionsCancel" onClick={this.handleCancelClick}>{p.t('MessageComposer.btnCancel')}</a>
            <a className="cl-modal-actionsCancel" onClick={this.handleSaveToDraftsClick}>{p.t('MessageComposer.btnSaveToDrafts')}</a>
            <a className="cl-modal-actionsSubmit" onClick={this.handleSendClick}>{p.t('MessageComposer.btnSend')}</a>
          </div>
          {/** Need to change this
          <ShowMessageStatus
            status={this.props.lastSentMessageStatus}
            pendingMessage="Sending message..."
            successMessage="Message sent."
            failureMessage="Failed to send message"
            onSuccessStatus={this.handleOnSuccessStatus}
            onFailureStatus={this.handleClearMessageStatus}
          />
          <ShowMessageStatus
            status={this.props.lastDraftMessageStatus}
            pendingMessage="Saving message to drafts."
            successMessage="Message saved to drafts."
            failureMessage="Failed to save message in drafts"
            onSuccessStatus={this.handleOnSuccessStatus}
            onFailureStatus={this.handleClearMessageStatus}
          />
          {/** Need to change this */}

        </div>
      </div>

    );
  }
}
/* eslint react/jsx-handler-names: 0 react/forbid-component-props: 0 */

MessageComposer.defaultProps = {
  title: 'New message',
  userProfiles: [],
  lastSentMessageStatus: null,
  lastDraftMessageStatus: null,
  message: {},
  recipients: []
};

MessageComposer.propTypes = {
  title: PropTypes.string,
  attachment: PropTypes.object.isRequired,
  userProfiles: PropTypes.array,
  profile: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onSaveToDrafts: PropTypes.func.isRequired,
  lastSentMessageStatus: PropTypes.string,
  lastDraftMessageStatus: PropTypes.string,
  clearSentMessageStatus: PropTypes.func.isRequired,
  clearDraftMessageStatus: PropTypes.func.isRequired,
  message: PropTypes.object,
  recipients: PropTypes.arrayOf(PropTypes.object),
  searchMessageRecipients: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};

const mapStateToProps = state => {
  const {userProfiles, messages} = state;
  const {profile, recipients} = messages;
  const lastSentMessageStatus = messages.sent.lastMessageStatus;
  const lastDraftMessageStatus = messages.drafts.lastMessageStatus;
  const attachment = messages.attachment;
  return {
    recipients,
    userProfiles: userProfiles.data,
    profile,
    lastSentMessageStatus,
    lastDraftMessageStatus,
    attachment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSend: (profileID, message) => dispatch(sendMessage(profileID, message)),
    onSaveToDrafts: (profileID, message) => dispatch(saveToDrafts(profileID, message)),
    clearSentMessageStatus: () => dispatch(clearSentMessageStatus()),
    clearDraftMessageStatus: () => dispatch(clearDraftMessageStatus()),
    searchMessageRecipients: (profileID, search) => dispatch(searchMessageRecipients(profileID, search)),
    deleteMessageAttachment: (profileID, attachmentId) => dispatch(deleteMessageAttachment(profileID, attachmentId))
  };
};
export default translate(connect(mapStateToProps, mapDispatchToProps)(MessageComposer));

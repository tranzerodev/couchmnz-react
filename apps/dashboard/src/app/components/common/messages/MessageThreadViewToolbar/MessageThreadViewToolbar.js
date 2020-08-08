import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {withRouter, matchPath} from 'react-router';

import {setMessageThreadStarred, archiveMessageThread, trashMessageThread, updateMessageThreadLabels} from '../../../../actions';
import NewMessageLabel from '../NewMessageLabel';
import {closeMessageDetailsPane} from '../../../../utils/uiJsUtils';
import {getCurrentSubmenuURL} from '../../../../utils/urlHelper';
import * as RouterPaths from '../../../../constants/RouterPaths';

class MessageThreadViewToolbar extends Component {
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
      choosedLabels
    };

    this.handleUpdateThreadLabels = this.handleUpdateThreadLabels.bind(this);
    this.handleResetSelectedThreadLabels = this.handleResetSelectedThreadLabels.bind(this);
    this.starUnstarThread = this.starUnstarThread.bind(this);
    this.handleStarr = this.handleStarr.bind(this);
    this.handleUnstar = this.handleUnstar.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleTrash = this.handleTrash.bind(this);
    this.handleUnTrash = this.handleUnTrash.bind(this);
    this.handleLabelSelectionChanges = this.handleLabelSelectionChanges.bind(this);
    this.renderLabels = this.renderLabels.bind(this);
    this.renderUnTrash = this.renderUnTrash.bind(this);
    this.renderDelete = this.renderDelete.bind(this);

    this.handleMblCloseMsgDetailsViewClick = this.handleMblCloseMsgDetailsViewClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {thread} = newProps;
    let choosedLabels = [];
    if (thread) {
      const {labels} = thread;
      if (labels) {
        choosedLabels = labels;
      }
    }
    this.setState({choosedLabels});
  }

  handleUpdateThreadLabels() {
    const {choosedLabels} = this.state;
    const {profileID, thread, updateMessageThreadLabels} = this.props;
    updateMessageThreadLabels(profileID, thread.id, choosedLabels);
  }

  handleResetSelectedThreadLabels() {
    const {labels} = this.props.thread;
    this.setState({choosedLabels: labels});
  }

  starUnstarThread(starred) {
    const {profileID, thread, setMessageThreadStarred} = this.props;
    setMessageThreadStarred(profileID, thread.id, starred);
  }

  handleStarr() {
    this.starUnstarThread(true);
  }

  handleUnstar() {
    this.starUnstarThread(false);
  }

  handleArchive() {
    const {profileID, thread, archiveMessageThread} = this.props;
    archiveMessageThread(profileID, thread.id, true);
  }

  handleTrash() {
    const {profileID, thread, trashMessageThread} = this.props;
    trashMessageThread(profileID, thread.id, true);
  }
  handleUnTrash() {
    const {profileID, thread, trashMessageThread} = this.props;
    trashMessageThread(profileID, thread.id, false);
  }

  handleLabelSelectionChanges(event) {
    const {name, checked} = event.target;
    const {choosedLabels} = this.state;
    const choosedLabelSet = new Set(choosedLabels);
    if (checked) {
      choosedLabelSet.add(name);
    } else {
      choosedLabelSet.delete(name);
    }
    this.setState({choosedLabels: [...choosedLabelSet]});
  }

  handleMblCloseMsgDetailsViewClick(event) {
    const {location, history} = this.props;
    const {pathname} = location;
    event.preventDefault();
    closeMessageDetailsPane();
    const threadListUrl = getCurrentSubmenuURL(pathname);
    if (threadListUrl) {
      history.push(threadListUrl);
    }
  }

  renderLabels(label, index) {
    const {choosedLabels} = this.state;
    const {name} = label;
    const checked = choosedLabels.includes(name);
    const labelId = `msg-label-${index}`;
    return (
      <li key={index} className="uk-dropdown-separator">
        <input type="checkbox" className="cl-custom-cb" id={labelId} checked={checked} name={name} onChange={this.handleLabelSelectionChanges}/>
        <label className="cl-custom-cb-label" htmlFor={labelId}>{name}</label>
      </li>
    );
  }
  renderUnTrash() {
    const {history, p} = this.props;
    const {location} = history;
    const match = matchPath(location.pathname, {path: RouterPaths.MESSAGES_TRASH_ROUTER_PATH, exact: false, strict: false});
    if (match) {
      return (
        <li className="msg_messagesDetail-toolBarSeparator msg_messagesDetail-toolBar--largeOnly">
          <a onClick={this.handleUnTrash} title={p.t('tooltipUnArchive')}><i className={`cl-icon cl-icon--small cl-icon-inbox`}/></a></li>        
        );
    }
  }
  renderDelete() {
    const {history, p} = this.props;
    const {location} = history;
    const match = matchPath(location.pathname, {path: RouterPaths.MESSAGES_TRASH_ROUTER_PATH, exact: false, strict: false});
    if (!match) {
      return (
<li className="msg_messagesDetail-toolBar--largeOnly"><a onClick={this.handleTrash} title={p.t('tooltipDelete')}><i className="cl-icon cl-icon--small cl-icon-msg-delete"/></a></li>        );
    }
  }
  render() {
    const {thread, labels, onReplyAllClick, onReplyClick, p} = this.props;
    const {starred, archived} = thread;
    const archivedTooltip = archived ? p.t('tooltipUnArchive') : p.t('tooltipArchive');
    const archiveOrInboxIcon = archived ? 'cl-icon-inbox' : 'cl-icon-msg-archive' 
    return (
      <div className="msg_messagesDetail-toolBar uk-clearfix">
        <a className="msg_messagesDetail-close" onClick={this.handleMblCloseMsgDetailsViewClick}><i className="cl-icon cl-icon--tiny cl-icon-prev"/></a>

        <div className="msg_messagesToolbar-dropdown uk-button-dropdown" data-uk-dropdown="{mode:'click'}">
          {/* <!-- This is the element toggling the dropdown --> */}
          <a className="msg_messagesToolbar-dropdownTrigger"> <i className="cl-icon cl-icon--tiny cl-icon-dots"/></a>
          {/* <!-- This is the dropdown --> */}
          <div className="uk-dropdown cl-arrow-dropdown">
            <ul>
              <li>
              <a onClick={this.handleArchive}>
              <i className={`cl-icon cl-icon--small ${archiveOrInboxIcon}`}/> {archivedTooltip}</a>
              </li>
              <li><a onClick={this.handleTrash}><i className="cl-icon cl-icon--small cl-icon-msg-delete"/> {p.t('tooltipDelete')}</a></li>
            </ul>
          </div>
        </div>
        <ul>
          <li><a onClick={onReplyClick} title={p.t('tooltipReply')}><i className="cl-icon cl-icon--small cl-icon-msg-reply"/></a></li>
          <li><a onClick={onReplyAllClick} title={p.t('tooltipReplyAll')}><i className="cl-icon cl-icon--small cl-icon-msg-replyall-disabled"/></a></li>
          {/* <li><a data-uk-tooltip title={p.t('tooltipForward')}><i className="cl-icon cl-icon--small cl-icon-msg-forward"/></a></li> */}
          <li className="msg_messagesDetail-toolBarSeparator">
            {
              (starred) ? <a onClick={this.handleUnstar} title={p.t('tooltipUnStar')}><i className="cl-icon cl-icon--small cl-icon-msg-star"/></a> : <a onClick={this.handleStarr} title={p.t('tooltipStar')}><i className="cl-icon cl-icon--small cl-icon-msg-unstar"/></a>
            }
          </li>
          <li>
            <div className="msg_messageToolbar-dropdown uk-button-dropdown" data-uk-dropdown="{mode:'click'}">
              {/*         <!-- This is the element toggling the dropdown --> */}
              <a title={p.t('tooltipAddLabel')}><i className="cl-icon cl-icon--small cl-icon-msg-label"/></a>
              {/* <!-- This is the dropdown --> */}
              <div className="uk-dropdown cl-arrow-dropdown">
                <div className="uk-dropdown-title">
                  {p.t('titleChooseLabel')}
                </div>
                <ul>
                  {
                    labels.map(this.renderLabels)
                  }

                </ul>
                <div className="uk-dropdown-link">
                  <NewMessageLabel/>
                </div>
                <div className="msg_messageToolbar-dropdownCta">
                  <a className="msg_messageToolbar-submit" onClick={this.handleUpdateThreadLabels}>{p.t('btnDone')}</a>
                  <a className="msg_messageToolbar-cancel" onClick={this.handleResetSelectedThreadLabels}>{p.t('btnReset')}</a>
                </div>
              </div>
            </div>
          </li>
          <li className="msg_messagesDetail-toolBarSeparator msg_messagesDetail-toolBar--largeOnly">
          <a onClick={this.handleArchive} title={archivedTooltip}><i className={`cl-icon cl-icon--small ${archiveOrInboxIcon}`}/></a></li>
          {this.renderDelete()}
          {/* <li className="msg_messagesDetail-toolBar--largeOnly"><a onClick={this.handleTrash} title={p.t('tooltipDelete')}><i className="cl-icon cl-icon--small cl-icon-msg-delete"/></a></li> */}
          {this.renderUnTrash()}
        </ul>
      </div>
    );
  }
}

MessageThreadViewToolbar.defaultProps = {
  labels: []
};

MessageThreadViewToolbar.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  thread: PropTypes.object.isRequired,
  profileID: PropTypes.string.isRequired,
  archiveMessageThread: PropTypes.func.isRequired,
  setMessageThreadStarred: PropTypes.func.isRequired,
  trashMessageThread: PropTypes.func.isRequired,
  updateMessageThreadLabels: PropTypes.func.isRequired,
  onReplyAllClick: PropTypes.func.isRequired,
  onReplyClick: PropTypes.func.isRequired,
  labels: PropTypes.array,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};

const mapStateToProps = state => {
  const {profile, labels} = state.messages;
  return {
    profileID: profile.id,
    labels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    archiveMessageThread: (profileID, threadId, archived) => dispatch(archiveMessageThread(profileID, threadId, archived)),
    setMessageThreadStarred: (profileID, threadId, starred) => dispatch(setMessageThreadStarred(profileID, threadId, starred)),
    trashMessageThread: (profileID, threadId, trashed) => dispatch(trashMessageThread(profileID, threadId, trashed)),
    updateMessageThreadLabels: (profileID, threadId, labels) => dispatch(updateMessageThreadLabels(profileID, threadId, labels))
  };
};

export default withRouter(translate('MessageThreadViewToolbar')(connect(mapStateToProps, mapDispatchToProps)(MessageThreadViewToolbar)));

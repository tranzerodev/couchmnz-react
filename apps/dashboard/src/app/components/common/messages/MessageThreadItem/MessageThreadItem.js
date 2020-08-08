import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import translate from 'redux-polyglot/translate';
import Highlighter from 'react-highlight-words';
import appConstants from '../../../../constants/appConstants';
import config from '../../../../config';
import { fetchMessagesMetadata } from '../../../../actions'

const {messageThreadItem} = config.messagingSystem;
const {threadLabelColors} = config.messagingSystem;

const MAX_MEMBER_NAME_CHARS = messageThreadItem.maxMembersNameChars;

const convertToArray = value => {
  if (value) {
    if (Array.isArray(value)) {
      return (value);
    }
    return ([value]);
  }
  return ([]);
};

const displayLabel = (label, index) => {
  const totalThreadLabelColors = threadLabelColors.length;
  const threadColorIndex = (index % totalThreadLabelColors);
  const threadClass = threadLabelColors[threadColorIndex];
  const threadClassName = `msg_messagesList-label ${threadClass}`;
  return (
    <span key={label} className={threadClassName}>{label}</span>
  );
};

class MessageThreadItem extends Component {
  constructor(props) {
    super(props);
    this.handleThreadClick = this.handleThreadClick.bind(this);
    this.getThreadMembersName = this.getThreadMembersName.bind(this);
    this.getThreadDateTimeString = this.getThreadDateTimeString.bind(this);
  }
  handleThreadClick() {
    const {id} = this.props.thread;
    this.props.onThreadClick(id);
    this.props.fetchMessagesMetadata(this.props.profileID);
  }

  getThreadDateTimeString(timestamp) {
    const {p} = this.props;
    const dateTimeNow = moment();
    const threadDateTime = moment(timestamp);
    const isSameDay = dateTimeNow.isSame(threadDateTime, 'day');
    if (isSameDay) {
      return threadDateTime.format(p.t('dateTimeFormatSameDay'));
    }
    return threadDateTime.format(p.t('dateTimeFormatDiffDay'));
  }

  getThreadMembersName(members) {
    const {profileID, p} = this.props;
    let memberNames = null;
    let hiddenNamesCount = 0;
    members.forEach(member => {
      let {displayName, id} = member;
      if (id === profileID) {
        displayName = p.t('you');
      }
      if (memberNames === null) {
        memberNames = displayName;
      } else {
        const updatedMemberNames = `${memberNames}, ${displayName}`;
        if (updatedMemberNames.length <= MAX_MEMBER_NAME_CHARS) {
          memberNames = updatedMemberNames;
        } else {
          hiddenNamesCount++;
        }
      }
    });
    return (hiddenNamesCount > 0) ? `${memberNames}, +${hiddenNamesCount} ${p.t('more')}` : memberNames;
  }

  renderItemBadges(thread) {
    const {starred, hasAttachments} = thread;
    return (
      <span className="msg_messagesList-itemBadges" >
        {(starred) ? <i className="cl-icon cl-icon-star"/> : null}
        {(hasAttachments) ? <i className="cl-icon cl-icon-attachment"/> : null}
      </span>
    );
  }

  render() {
    const {thread, query, selectedThreadId} = this.props;
    const search = convertToArray(query[appConstants.messaging.queryFilters.search]);
    const {labels, members, id, timestamp, unread} = thread;

    const isSelected = Boolean(selectedThreadId && selectedThreadId === id);

    const classNames = ['msg_messagesList-item'];
    if (unread) {
      classNames.push('msg_messagesList-item--unread');
    }
    if (isSelected) {
      classNames.push('msg_messagesList-item--active');
    }
    return (
      <div className={classNames.join(' ')} onClick={this.handleThreadClick}>
        <input type="checkbox" name={id} className="cl-custom-cb" id={id} checked={isSelected} readOnly/>
        <label className="cl-custom-cb-label" htmlFor={id}>
          <span className="msg_messagesList-itemAuthor">{this.getThreadMembersName(members)}</span>
          <span className="msg_messagesList-itemSubject">
            {
              labels.map(displayLabel)
            }
            <Highlighter
              highlightClassName="msg_messagesList-highlight"
              searchWords={search}
              autoEscape
              textToHighlight={thread.subject}
            />
          </span>
          <span className="msg_messagesList-itemTimestamp">{this.getThreadDateTimeString(timestamp)}</span>
          {
            this.renderItemBadges(thread)
          }
        </label>
      </div>
    );
  }
}
MessageThreadItem.defaultProps = {
  search: [],
  selectedThreadId: null
};

MessageThreadItem.propTypes = {
  thread: PropTypes.object.isRequired,
  onThreadClick: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  query: PropTypes.object.isRequired,
  profileID: PropTypes.string.isRequired,
  selectedThreadId: PropTypes.number
};

const mapStateToProps = state => {
  const {router, messages} = state;
  const {profile, selectedThread} = messages;
  let selectedThreadId = null;
  const {data} = selectedThread;
  if (data) {
    selectedThreadId = data.id;
  }
  return {
    query: router.query,
    profileID: profile.id,
    selectedThreadId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessagesMetadata: profileId => dispatch(fetchMessagesMetadata(profileId))
  }
}

export default translate('MessageThreadItem')(connect(mapStateToProps,mapDispatchToProps)(MessageThreadItem));

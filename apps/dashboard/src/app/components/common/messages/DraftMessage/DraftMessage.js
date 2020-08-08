import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import translate from 'redux-polyglot/translate';
import Highlighter from 'react-highlight-words';

import config from '../../../../config';

const {messageThreadItem} = config.messagingSystem;
const MAX_MEMBER_NAME_CHARS = messageThreadItem.maxMembersNameChars;

class DraftMessage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getThreadDateTimeString = this.getThreadDateTimeString.bind(this);
    this.getDraftsRecipientNames = this.getDraftsRecipientNames.bind(this);
  }
  handleClick() {
    const {draftMessage} = this.props;
    this.props.onSelect(draftMessage);
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

  getDraftsRecipientNames(members) {
    const {p} = this.props;
    let memberNames = null;
    let hiddenNamesCount = 0;
    if (members) {
      members.forEach(member => {
        const {displayName} = member;
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
  }

  renderItemBadges(attachments) {
    const hasAttachment = Boolean(attachments && (attachments.length > 0));
    return (
      <span className="msg_messagesList-itemBadges" >
        {(hasAttachment) ? <i className="cl-icon cl-icon-attachment"/> : null}
      </span>
    );
  }

  render() {
    const {draftMessage, search} = this.props;
    const {timestamp, to, draftId, subject, attachments} = draftMessage;
    return (
      <div className="msg_messagesList-item" onClick={this.handleClick}>
        <input type="checkbox" name="" className="cl-custom-cb" id={draftId}/>
        <label className="cl-custom-cb-label" htmlFor={draftId}>
          <span className="msg_messagesList-itemAuthor">{this.getDraftsRecipientNames(to)}</span>
          <span className="msg_messagesList-itemSubject">
            <Highlighter
              highlightClassName="msg_messagesList-highlight"
              searchWords={search}
              autoEscape
              textToHighlight={subject}
            />
          </span>
          <span className="msg_messagesList-itemTimestamp">{this.getThreadDateTimeString(timestamp)}</span>
          {this.renderItemBadges(attachments)}
        </label>
      </div>
    );
  }
}

DraftMessage.defaultProps = {
  search: []
};

DraftMessage.propTypes = {
  draftMessage: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  search: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => {
  const {router} = state;
  const {search} = router.query;
  return {
    search: (search) ? [search] : []
  };
};

export default translate('DraftMessage')(connect(mapStateToProps)(DraftMessage));

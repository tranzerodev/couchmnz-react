import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BeatLoader} from 'react-spinners';
import translate from 'redux-polyglot/translate';

import * as RouterPaths from '../../../../constants/RouterPaths';
import {threadListPageChange} from '../../../../actions';
import MessageThreadItem from '../MessageThreadItem';
import {matchPath, withRouter} from 'react-router';
import {PENDING, FULFILLED} from '../../../../constants/ActionTypes';
import MessageThreadListSorter from '../MessageThreadListSorter';

class DashboardMessageThreadList extends Component {
  constructor(props) {
    super(props);
    this.displayMessage = this.displayMessage.bind(this);
    this.handleThreadClick = this.handleThreadClick.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.handleOnPaginateNext = this.handleOnPaginateNext.bind(this);
    this.handleOnPaginatePrev = this.handleOnPaginatePrev.bind(this);
    this.renderEmptyInbox = this.renderEmptyInbox.bind(this);
  }

  displayMessage(messageThread, index) {
    return (<MessageThreadItem key={index} thread={messageThread} onThreadClick={this.handleThreadClick}/>);
  }
  renderEmptyInbox() {
    return (
      <div className="msg_messagesList-item">
        <label className="cl-custom-cb-label" htmlFor="msg_messagesList-05">
          <span className="msg_messagesList-itemAuthor">{this.props.p.t('MessageThreadItem.noMessage')}</span>
        </label>
      </div>
    );
  }

  handleThreadClick(threadId) {
    const {location, history} = this.props;
    const match = matchPath(location.pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_URL, exact: false, strict: false});
    let url = null;
    if (match) {
      const {subMenu} = match.params;
      if (subMenu === RouterPaths.MENU_LABELS) {
        const labelsMatch = matchPath(location.pathname, {path: RouterPaths.MESSAGES_LABEL_ROUTER_PATH, exact: false, strict: false});
        url = labelsMatch.url;
      } else {
        url = match.url;
      }
      history.push(url + `/${RouterPaths.MENU_THREADS}/` + threadId);
    }
    console.log(match);
  }

  handleOnPaginateNext() {
    const {page, limit, threadListPageChange} = this.props;
    threadListPageChange(page + 1, limit);
  }

  handleOnPaginatePrev() {
    const {page, limit, threadListPageChange} = this.props;
    threadListPageChange(page - 1, limit);
  }

  renderPagination() {
    const {status, limit, total, page} = this.props;
    if ((status === FULFILLED) && (total > 0)) {
      const totalPages = Math.ceil((total / limit));
      const isNotFirstPage = (page !== 1);
      const isNotLastPage = (page !== totalPages);
      return (
        <ul className="uk-pagination">
          { (isNotFirstPage) ? <li className="uk-pagination-previous"><button onClick={this.handleOnPaginatePrev} className="uk-button">Prev</button></li> : ''}
          { (isNotLastPage) ? <li className="uk-pagination-next" ><button onClick={this.handleOnPaginateNext} className="uk-button">Next</button></li> : ''}
        </ul>);
    }
    return null;
  }

  render() {
    const {threads} = this.props;
    console.log('threads', threads);
    const {status} = this.props;
    const isStatusPending = (status === PENDING);
    return (
      <div className="uk-width-xlarge-3-10 uk-width-large-4-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="msg_messagesList msg_columns">
          <MessageThreadListSorter/>
          <div className="msg_messagesList-container msg_messagesList-container1-2">
            {
              threads && threads.length > 0 ? threads.map(this.displayMessage) : this.renderEmptyInbox()
            }
            <div className="cl-loader">
              <BeatLoader loading={isStatusPending} size={10}/>
            </div>
          </div>
          {this.renderPagination()}
        </div>
      </div>
    );
  }
}
DashboardMessageThreadList.defaultProps = {
  threads: [],
  status: '',
  limit: 0,
  total: 0,
  page: 0
};

DashboardMessageThreadList.propTypes = {
  threads: PropTypes.array,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
  limit: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  threadListPageChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {messages} = state;
  const {
    threads
  } = messages;
  const {status, limit, page, total} = threads;
  return {
    threads: threads.data,
    status,
    limit,
    page,
    total
  };
};
const mapDispatchToProps = dispatch => {
  return {
    threadListPageChange: (page, limit) => dispatch(threadListPageChange(page, limit))
  };
};

export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(DashboardMessageThreadList)));

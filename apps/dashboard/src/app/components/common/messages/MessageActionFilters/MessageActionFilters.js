import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {withRouter, matchPath} from 'react-router';
import QueryString from 'query-string';
import {DebounceInput} from 'react-debounce-input';
import Datetime from 'react-datetime';
import moment from 'moment';

import config from '../../../../config';
import * as RouterPaths from '../../../../constants/RouterPaths';
import {ellipseText} from '../../../../utils/messageUtils';
import appConstants from '../../../../constants/appConstants';

const messagingConstants = appConstants.messaging;
const {messagingSystem} = config;
const SEARCH_DEBAOUNCE_TIMEOUT = messagingSystem.messageSearchDebounceTimeout;
const SESSION_FROM_TO_DATE_FORMAT = messagingSystem.messageActionFilters.sessionFromAndToDateFormat;
const SELECT_OPTION_ALL_VALUE = 'all';

const renderSports = sport => <option key={sport.id} value={sport.id}>{sport.name}</option>;

const renderSessionNames = session => <option key={session.id} value={session.id}>{session.name}</option>;

const renderSessionLocations = sessionLocation => <option key={sessionLocation.id} value={sessionLocation.id}>{sessionLocation.title}</option>;

const convertToArray = messageTypes => {
  if (messageTypes) {
    if (Array.isArray(messageTypes)) {
      return (messageTypes);
    }
    return ([messageTypes]);
  }
  return ([]);
};

/* eslint react/forbid-component-props:0 */
class MessageActionFilters extends Component {
  constructor(props) {
    super(props);
    const {query} = this.props;
    const {queryFilters} = messagingConstants;
    const messageTypes = query[queryFilters.messageTypes];
    this.state = {
      messageTypes: convertToArray(messageTypes),
      sessionDateTo: query[queryFilters.sessionDateTo],
      sessionDateFrom: query[queryFilters.sessionDateFrom],
      sessionLocationId: query[queryFilters.sessionLocationId],
      sportId: query[queryFilters.sportId],
      sessionId: query[queryFilters.sessionId],
      search: query[queryFilters.search],
      dropdownClasses: 'uk-button-dropdown'
    };

    this.renderMessageTypes = this.renderMessageTypes.bind(this);
    this.renderMessageTypeActionFilter = this.renderMessageTypeActionFilter.bind(this);
    this.renderSessionFilters = this.renderSessionFilters.bind(this);

    this.handleSearchFilterChange = this.handleSearchFilterChange.bind(this);

    this.handleMessageTypeFilterChange = this.handleMessageTypeFilterChange.bind(this);
    this.handleSessionFromDateChange = this.handleSessionFromDateChange.bind(this);
    this.handleSessionToDateChange = this.handleSessionToDateChange.bind(this);
    this.handleSearchMessageFilterChange = this.handleSearchMessageFilterChange.bind(this);
    this.handleSessionMessageFilterChange = this.handleSessionMessageFilterChange.bind(this);

    this.handleResetMessageTypeFilter = this.handleResetMessageTypeFilter.bind(this);
    this.handleResetSessionMessageFilter = this.handleResetSessionMessageFilter.bind(this);

    this.handleAllMessageTypeChecked = this.handleAllMessageTypeChecked.bind(this);
    this.getMsgTypeFilterDisplayText = this.getMsgTypeFilterDisplayText.bind(this);

    this.handleSessionNameSportLocChange = this.handleSessionNameSportLocChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {query} = newProps;
    const {queryFilters} = messagingConstants;
    const messageTypes = query[queryFilters.messageTypes];
    this.setState({
      messageTypes: convertToArray(messageTypes),
      sessionDateTo: query[queryFilters.sessionDateTo],
      sessionDateFrom: query[queryFilters.sessionDateFrom],
      sessionLocationId: query[queryFilters.sessionLocationId],
      sportId: query[queryFilters.sportId],
      sessionId: query[queryFilters.sessionId],
      search: query[queryFilters.search]
    });
  }

  getCurrentSubmenuURL(pathname) {
    let url = null;
    const subMenuMatch = matchPath(pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_URL, exact: false});
    if (subMenuMatch) {
      const {subMenu} = subMenuMatch.params;
      url = subMenuMatch.url;
      if (subMenu === RouterPaths.MENU_LABELS) {
        const labelsMenuMatch = matchPath(pathname, {path: RouterPaths.MESSAGES_LABEL_ROUTER_PATH, exact: false});
        if (labelsMenuMatch) {
          url = labelsMenuMatch.url;
        }
      }
    }
    return url;
  }

  applyChangedFilters(filterItem) {
    const {location, history, query} = this.props;
    const {pathname} = location;
    const updatedFilters = Object.assign({}, query, filterItem);
    const url = this.getCurrentSubmenuURL(pathname);
    if (url) {
      const search = QueryString.stringify(updatedFilters);
      history.push({
        pathname: url,
        search
      });
    }
  }

  handleSearchFilterChange(event) {
    const {value} = event.target;
    const search = (value.length > 0) ? value : undefined;
    const searchFilter = {
      [messagingConstants.queryFilters.search]: search
    };
    this.applyChangedFilters(searchFilter);
  }

  handleMessageTypeFilterChange(event) {
    const {value, checked} = event.target;
    const {messageTypes} = this.state;
    const messageTypeFilterSet = new Set([...messageTypes]);
    if (checked) {
      messageTypeFilterSet.add(value);
    } else {
      messageTypeFilterSet.delete(value);
    }
    this.setState({messageTypes: [...messageTypeFilterSet]});
  }

  handleResetMessageTypeFilter() {
    const {query} = this.props;
    const {messageTypes} = query;
    this.setState({
      messageTypes: convertToArray(messageTypes)
    });
  }

  handleResetSessionMessageFilter() {
    const {query} = this.props;
    const {sessionDateTo, sessionDateFrom, sessionId, sessionLocationId, sportId} = query;
    this.setState({
      sessionDateTo,
      sessionDateFrom,
      sportId,
      sessionLocationId,
      sessionId
    });
  }

  handleSessionFromDateChange(moment) {
    const sessionDateFrom = moment.format(SESSION_FROM_TO_DATE_FORMAT);
    this.setState({sessionDateFrom});
  }

  handleSessionToDateChange(moment) {
    const sessionDateTo = moment.format(SESSION_FROM_TO_DATE_FORMAT);
    this.setState({sessionDateTo});
  }

  handleSearchMessageFilterChange(event) {
    const {messageTypes} = this.state;
    const messageTypeFilter = {
      [messagingConstants.queryFilters.messageTypes]: (messageTypes.length > 0) ? messageTypes : undefined
    };
    this.applyChangedFilters(messageTypeFilter);
    event.preventDefault();
  }

  handleSessionMessageFilterChange(event) {
    const {sessionDateTo, sessionDateFrom, sessionLocationId, sportId, sessionId} = this.state;
    const filterSessionType = {
      [messagingConstants.queryFilters.sessionDateFrom]: (sessionDateFrom) ? sessionDateFrom : undefined,
      [messagingConstants.queryFilters.sessionDateTo]: (sessionDateTo) ? sessionDateTo : undefined,
      [messagingConstants.queryFilters.sessionId]: (sessionId) ? sessionId : undefined,
      [messagingConstants.queryFilters.sportId]: (sportId) ? sportId : undefined,
      [messagingConstants.queryFilters.sessionLocationId]: (sessionLocationId) ? sessionLocationId : undefined

    };
    this.applyChangedFilters(filterSessionType);
    event.preventDefault();
  }

  handlePreventFormSubmit(event) {
    event.preventDefault();
  }

  handleAllMessageTypeChecked() {
    this.setState({messageTypes: []});
  }

  handleSessionNameSportLocChange(event) {
    const {name, value} = event.target;
    const changedValue = (value === SELECT_OPTION_ALL_VALUE) ? null : value;
    this.setState(
      {
        [name]: changedValue
      }
    );
  }

  getMsgTypeFilterDisplayText(messageTypes, selectedMessageTypes) {
    const {p} = this.props;
    const displayNames = new Set([]);
    selectedMessageTypes.forEach(selectedMessageType => {
      const selectedMessageTypeBaseValue = selectedMessageType.split('.')[0];
      messageTypes.forEach(messageType => {
        const baseValue = messageType.value.split('.')[0];
        if (selectedMessageTypeBaseValue === baseValue) {
          displayNames.add(p.t(messageType.displayName));
        }
      });
    });
    return (ellipseText([...displayNames].join(', '), 20));
  }

  renderMessageTypes(messageType) {
    const {p} = this.props;
    const {messageTypes} = this.state;
    const {sub, displayName, value} = messageType;
    const checked = (messageTypes && messageTypes.includes(value));
    const filterId = `msg-filters-${value}`;
    if (sub && sub.length > 0) {
      return (
        <li key={filterId}>
          <div className="uk-accordion" data-uk-accordion="{showfirst: false, collapse: true}">
            <div className="uk-accordion-header">
              <span className="uk-accordion-title"><i className="cl-icon cl-icon-next"/>{p.t(displayName)}</span>
              <input type="checkbox" className="cl-custom-cb" id={filterId} name="messageTypes" checked={checked} onChange={this.handleMessageTypeFilterChange} value={value}/>
              <label className="cl-custom-cb-label" htmlFor={filterId}/>
            </div>
            <div className="uk-accordion-content">
              <ul>
                {
                  sub.map(subMessageType => {
                    const {value, displayName} = subMessageType;
                    const filterId = `msg-filters-${value}`;
                    const checked = (messageTypes && messageTypes.includes(value));
                    return (
                      <li key={displayName}>
                        <input type="checkbox" className="cl-custom-cb" id={filterId} name="messageTypes" value={value} checked={checked} onChange={this.handleMessageTypeFilterChange}/>
                        <label className="cl-custom-cb-label" htmlFor={filterId}>{p.t(displayName)}</label>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </li>
      );
    }
    return (
      <li key={filterId} className="uk-dropdown-separator">
        <input type="checkbox" className="cl-custom-cb" name="messageTypes" id={filterId} checked={checked} onChange={this.handleMessageTypeFilterChange} value={value}/>
        <label className="cl-custom-cb-label" htmlFor={filterId}>{p.t(displayName)}</label>
      </li>
    );
  }

  renderMessageTypeActionFilter() {
    const {threadFilters, p} = this.props;
    const {messageTypes} = threadFilters;
    const selectedMessageTypes = this.state.messageTypes;
    let allMessagesChecked = true;
    let msgTypeFltrDsplayTxt = p.t('allMessages');

    if (selectedMessageTypes && (selectedMessageTypes.length > 0)) {
      allMessagesChecked = false;
      msgTypeFltrDsplayTxt = this.getMsgTypeFilterDisplayText(messageTypes, selectedMessageTypes);
    }

    return (
      <div className={`msg_messageActions-dropdown ${this.state.dropdownClasses}`} data-uk-dropdown="{mode:'click', pos:'bottom-center'}">
        {/*  This is the element toggling the dropdown  */}
        <button className="uk-button">{msgTypeFltrDsplayTxt} <i className="cl-icon cl-icon-down"/></button>
        {/* This is the dropdown */}
        <div className="uk-dropdown cl-arrow-dropdown cl-arrow-dropdown--center">
          <ul>
            <li className="uk-dropdown-separator">
              <input type="checkbox" className="cl-custom-cb" name="messageTypes" id="msg-filters-ALL" checked={allMessagesChecked} onChange={this.handleAllMessageTypeChecked}/>
              <label className="cl-custom-cb-label" htmlFor="msg-filters-ALL">{p.t('allMessages')}</label>
            </li>
            {
              messageTypes.map(this.renderMessageTypes)
            }
          </ul>
          <div className="msg_messageActions-dropdownCta">
            <a className="msg_messageActions-submit" onClick={this.handleSearchMessageFilterChange}>{p.t('searchMessages')}</a>
            <a className="msg_messageActions-cancel" onClick={this.handleResetMessageTypeFilter}>{p.t('reset')}</a>
          </div>
        </div>
      </div>
    );
  }

  renderSessionFilters() {
    const {sessions, sessionLocations, p, sports} = this.props;
    const {sessionId, sessionLocationId, sessionDateTo, sessionDateFrom, sportId} = this.state;

    const parsedFromDate = moment(sessionDateFrom, SESSION_FROM_TO_DATE_FORMAT);
    const parsedToDate = moment(sessionDateTo, SESSION_FROM_TO_DATE_FORMAT);

    let sessionDisplayText = null;

    if (sportId) {
      sessionDisplayText = p.t('txtSport');
    }

    if (sessionId) {
      sessionDisplayText = (sessionDisplayText) ? `${sessionDisplayText}, ${p.t('txtSession')}` : p.t('txtSession');
    }

    if (sessionLocationId) {
      sessionDisplayText = (sessionDisplayText) ? `${sessionDisplayText}, ${p.t('txtLocation')}` : p.t('txtLocation');
    }

    sessionDisplayText = (sessionDisplayText) ? `by ${sessionDisplayText}` : p.t('allSessions');

    sessionDisplayText = ellipseText(sessionDisplayText, 20);

    const selectedSport = (sportId) ? sportId : SELECT_OPTION_ALL_VALUE;
    const selectedSessionName = (sessionId) ? sessionId : SELECT_OPTION_ALL_VALUE;
    const selectedSessionLoc = (sessionLocationId) ? sessionLocationId : SELECT_OPTION_ALL_VALUE;

    return (
      <div className={`msg_messageActions-dropdown ${this.state.dropdownClasses}`} data-uk-dropdown="{mode:'click', pos:'bottom-center'}">
        {/*  <!-- This is the element toggling the dropdown --> */}
        <button className="uk-button">{sessionDisplayText}<i className="cl-icon cl-icon-down"/></button>
        {/* <!-- This is the dropdown --> */}
        <div className="uk-dropdown cl-arrow-dropdown cl-arrow-dropdown--center">
          <div className="uk-form uk-form-stacked">
            <div className="uk-form-row">
              <label className="uk-form-label" htmlFor="">{p.t('selectSports')}</label>
              <div className="uk-form-controls">
                <select name="sportId" onChange={this.handleSessionNameSportLocChange} value={selectedSport}>
                  <option value={SELECT_OPTION_ALL_VALUE}>{p.t('all')}</option>
                  {
                    sports.map(renderSports)
                  }
                </select>
              </div>
            </div>
            <div className="uk-form-row">
              <label className="uk-form-label" htmlFor="sessionId">{p.t('sessionName')}</label>
              <div className="uk-form-controls">
                <select name="sessionId" onChange={this.handleSessionNameSportLocChange} value={selectedSessionName}>
                  <option value={SELECT_OPTION_ALL_VALUE}>{p.t('all')}</option>
                  {
                    sessions.map(renderSessionNames)
                  }
                </select>
              </div>
            </div>
            <div className="uk-form-row">
              <label className="uk-form-label" htmlFor="sessionLocationId">{p.t('sessionLocation')}</label>
              <div className="uk-form-controls">
                <select name="sessionLocationId" onChange={this.handleSessionNameSportLocChange} value={selectedSessionLoc}>
                  <option value={SELECT_OPTION_ALL_VALUE}>{p.t('all')}</option>
                  {
                    sessionLocations.map(renderSessionLocations)
                  }
                </select>
              </div>
            </div>
            <div className="uk-form-row">
              <label className="uk-form-label" htmlFor="">{p.t('sessionDate')}</label>
              <div className="uk-form-controls">

                <Datetime
                  name="sessionDateFrom"
                  value={parsedFromDate}
                  onChange={this.handleSessionFromDateChange}
                  dateFormat={p.t('sessionDateFormat')}
                  timeFormat={false}
                  closeOnSelect
                />
                  -
                <Datetime
                  name="sessionDateTo"
                  value={parsedToDate}
                  onChange={this.handleSessionToDateChange}
                  dateFormat={p.t('sessionDateFormat')}
                  timeFormat={false}
                  closeOnSelect
                />

              </div>
            </div>
          </div>
          <div className="msg_messageActions-dropdownCta msg_messageActions-dropdownCta--bordered">
            <a className="msg_messageActions-submit" onClick={this.handleSessionMessageFilterChange}>{p.t('searchMessages')}</a>
            <a className="msg_messageActions-cancel" onClick={this.handleResetSessionMessageFilter}>{p.t('reset')}</a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {p} = this.props;
    const {search} = this.state;

    return (
      <div className="msg_messageActions-filters" >
        <form className="uk-form uk-clearfix" onSubmit={this.handlePreventFormSubmit}>
          <DebounceInput
            type="text"
            className="msg_messageActions-input uk-width-1-4"
            placeholder={p.t('searchBoxPlaceholder')}
            debounceTimeout={SEARCH_DEBAOUNCE_TIMEOUT}
            name="search"
            value={(search) ? search : ''}
            onChange={this.handleSearchFilterChange}
          />
          {
            /** Rendering message action filter */
            this.renderMessageTypeActionFilter()
          }
          {
            this.renderSessionFilters()
          }
        </form>
      </div>
    );
  }
}
/* eslint react/forbid-component-props:0 */

MessageActionFilters.defaultProps = {
  sessions: [],
  query: {},
  sessionLocations: [],
  sports: []
};

MessageActionFilters.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  sessions: PropTypes.array,
  sessionLocations: PropTypes.array,
  query: PropTypes.object,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  threadFilters: PropTypes.object.isRequired,
  sports: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  const {sessions, router, messages, locations, sports} = state;
  const {threadFilters} = messages;
  const {query} = router;

  return {
    sessions: sessions.data,
    sessionLocations: locations.data,
    sports,
    query,
    threadFilters
  };
};

export default withRouter(translate('MessageActionFilters')(connect(mapStateToProps)(MessageActionFilters)));


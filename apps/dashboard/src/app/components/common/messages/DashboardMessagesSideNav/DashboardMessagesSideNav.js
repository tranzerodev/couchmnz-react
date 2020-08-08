import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

import * as RouterPaths from '../../../../constants/RouterPaths';
import NewMessageLabel from '../NewMessageLabel';
import Modal from '../../Modal';
import MessageComposer from '../MessageComposer';
import {changeMessagingProfile} from '../../../../actions';
import {openFiltersPanelOnMobile, toggleMessageSideNavMobile} from '../../../../utils/uiJsUtils';
import {getCurrentSubmenu} from '../../../../utils/urlHelper';

const displayMessageLabel = (messageLabel, index) => {
  const {name} = messageLabel;
  return (
    <li key={index}>
      <NavLink to={RouterPaths.MESSAGES_LABEL_MENU_ROUTER_PATH + `/${name}`}>{name}</NavLink>
    </li>
  );
};

class DashboardMessagesSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNewMessageModal: false,
      dropdownClasses: 'cl-sd-coach-dropdown msg_sidebar-trainerDropdown'
    };

    this.handleNewMessageClick = this.handleNewMessageClick.bind(this);
    this.handleNewMessageModalClose = this.handleNewMessageModalClose.bind(this);
    this.renderProfileTypes = this.renderProfileTypes.bind(this);
    this.handleOnchangeMessagingProfile = this.handleOnchangeMessagingProfile.bind(this);
    this.handleMobileMessageSideNavDisplayToggle = this.handleMobileMessageSideNavDisplayToggle.bind(this);
  }

  handleOnMobileSearchClick(event) {
    event.preventDefault();
    openFiltersPanelOnMobile();
  }

  handleMobileMessageSideNavDisplayToggle(event) {
    event.preventDefault();
    toggleMessageSideNavMobile(event);
  }

  renderProfileTypes(userProfile) {
    const {id, displayName} = userProfile;
    return <li key={id} data-value={id} onClick={this.handleOnchangeMessagingProfile}><a >{displayName}<span className="cl-sd-icon"><i className="fa fa-angle-right"/></span></a></li>;
  }

  handleOnchangeMessagingProfile(event) {
    this.setState({dropdownClasses: 'cl-sd-coach-dropdown msg_sidebar-trainerDropdown uk-dropdown-close'});
    const {changeMessagingProfile, userProfiles} = this.props;
    const {dataset} = event.currentTarget;
    const profileId = dataset.value;
    const selectedProfile = userProfiles.find(userProfile => userProfile.id === profileId);
    changeMessagingProfile(selectedProfile);
    this.props.history.push(RouterPaths.MESSAGES_INBOX_ROUTER_PATH);
  }
  handleNewMessageClick() {
    this.setState({isOpenNewMessageModal: true});
  }
  handleNewMessageModalClose() {
    this.setState({isOpenNewMessageModal: false});
  }

  render() {
    const {messageLabels, p, starred,
      unread,
      sent,
      drafts,
      archived,
      trash, userProfiles, profile, location} = this.props;
    const {pathname} = location;
    const currentSubmenu = getCurrentSubmenu(pathname);

    return (

      <div className="uk-width-xlarge-2-10 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="msg_sidebar-navContainer uk-clearfix">
          <span data-uk-dropdown="{mode:'click'}" className={this.state.dropdownClasses}>
            <a href="#" className="cl-sd-speciality-link"><span className="cl-sd-speciality-link-text">{profile.displayName}</span>
              <svg className="cl-icon-arrow-down-orange" xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591">
                <g transform="translate(-962.105 -6007)">
                  <path data-name="Path 148" className="cl-icon-arrow-down-orange-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/>
                </g>
              </svg>
            </a>
            <ul className="uk-dropdown cl-arrow-dropdown">
              {
                userProfiles.map(this.renderProfileTypes)
              }
            </ul>
          </span>
          <div className="msg_sidebar-navTrigger" onClick={this.handleMobileMessageSideNavDisplayToggle}>
            <a >{p.t(currentSubmenu)}<i className="cl-icon cl-icon-down"/></a>
          </div>
          <div className="msg_sidebar-nav">
            <div className="msg_sidebar-navigation">
              <ul>
                <li><NavLink to={RouterPaths.MESSAGES_INBOX_ROUTER_PATH}>{p.t('inbox')}<span className="msg_sidebar-count">{unread}</span></NavLink></li>
                <li><NavLink to={RouterPaths.MESSAGES_STARRED_ROUTER_PATH}>{p.t('starred')}<span className="msg_sidebar-count">{starred}</span></NavLink></li>
                { unread > 0  && <li><NavLink to={RouterPaths.MESSAGES_UNREAD_ROUTER_PATH}>{p.t('unread')}<span className="msg_sidebar-count">{unread}</span></NavLink></li>}
                <li><NavLink to={RouterPaths.MESSAGES_SENT_ROUTER_PATH}>{p.t('sent')}<span className="msg_sidebar-count">{sent}</span></NavLink></li>
                <li><NavLink to={RouterPaths.MESSAGES_DRAFTS_ROUTER_PATH}>{p.t('drafts')}<span className="msg_sidebar-count">{drafts}</span></NavLink></li>
                {/* <li><NavLink>{p.t('notifications')}<span className="msg_sidebar-count">0</span></NavLink></li> */}
                <li><NavLink to={RouterPaths.MESSAGES_ARCHIVED_ROUTER_PATH}>{p.t('archived')}<span className="msg_sidebar-count">{archived}</span></NavLink></li>
                <li><NavLink to={RouterPaths.MESSAGES_TRASH_ROUTER_PATH}>{p.t('trash')}<span className="msg_sidebar-count">{trash}</span></NavLink></li>
              </ul>
            </div>
            <div className="msg_sidebar-labels">
              <ul>
                {
                  messageLabels.map(displayMessageLabel)
                }
              </ul>
              <NewMessageLabel/>
            </div>
          </div>
          <div className="msg_sidebar-newMessageTrigger">
            <a onClick={this.handleNewMessageClick}><i className="cl-icon cl-icon--medium cl-icon-add"/></a>
            <Modal isModalOpen={this.state.isOpenNewMessageModal}>
              <MessageComposer onCancel={this.handleNewMessageModalClose}/>
            </Modal>
          </div>
          <div className="msg_sidebar-searchTrigger" >
            <a onClick={this.handleOnMobileSearchClick} ><i className="cl-icon cl-icon--medium cl-icon-search"/></a>
          </div>
        </div>
      </div>
    );
  }
}

DashboardMessagesSideNav.defaultProps = {
  messageLabels: [],
  drafts: 0,
  unread: 0,
  sent: 0,
  starred: 0,
  trash: 0,
  archived: 0,
  userProfiles: [],
  profile: null
};

DashboardMessagesSideNav.propTypes = {
  messageLabels: PropTypes.array.isRequired,
  drafts: PropTypes.number,
  unread: PropTypes.number,
  sent: PropTypes.number,
  starred: PropTypes.number,
  trash: PropTypes.number,
  archived: PropTypes.number,
  changeMessagingProfile: PropTypes.func.isRequired,
  userProfiles: PropTypes.array,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  profile: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles, messages} = state;
  const {labels, profile, metadata} = messages;
  const {starred, unread, sent, drafts, archived, trash} = metadata;
  return {
    userProfiles: userProfiles.data,
    messageLabels: labels,
    profile,
    starred,
    unread,
    sent,
    drafts,
    archived,
    trash
  };
};

const matchDispatchToProps = dispatch => {
  return {
    changeMessagingProfile: profile => dispatch(changeMessagingProfile(profile))
  };
};

export default withRouter(translate('DashboardMessagesSideNav')(connect(mapStateToProps, matchDispatchToProps)(DashboardMessagesSideNav)));

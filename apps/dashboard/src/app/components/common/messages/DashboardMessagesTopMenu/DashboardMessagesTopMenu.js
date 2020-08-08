import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import PropTypes from 'prop-types';

import Modal from '../../Modal';
import MessageComposer from '../MessageComposer';
import {withRouter} from 'react-router';
import MessageActionFilters from '../MessageActionFilters';
import {closeFiltersPanelOnMobile} from '../../../../utils/uiJsUtils';

class DashboardMessagesTopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNewMessageModal: false
    };
    this.handleNewMessageClick = this.handleNewMessageClick.bind(this);
    this.handleNewMessageModalClose = this.handleNewMessageModalClose.bind(this);
  }

  handleNewMessageClick() {
    this.setState({isOpenNewMessageModal: true});
  }

  handleCloseMobileActionFiltersClick(event) {
    event.preventDefault();
    closeFiltersPanelOnMobile();
  }

  handleNewMessageModalClose() {
    this.setState({isOpenNewMessageModal: false});
  }

  render() {
    const {p} = this.props;

    return (
      <div className="uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="msg_messageActions uk-clearfix">
          <a onClick={this.handleCloseMobileActionFiltersClick} className="msg_messageActions-close"><i className="cl-icon cl-icon-close"/></a>
          <a className="uk-button msg_messageActions-newMessage" onClick={this.handleNewMessageClick}>{p.t('newMessage')}</a>
          <Modal isModalOpen={this.state.isOpenNewMessageModal}>
            <MessageComposer onCancel={this.handleNewMessageModalClose}/>
          </Modal>
          <MessageActionFilters/>
        </div>
      </div>
    );
  }
}

DashboardMessagesTopMenu.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};

export default withRouter(translate('DashboardMessagesTopMenu')(DashboardMessagesTopMenu));

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Modal from '../../Modal';
import {FULFILLED, PENDING, REJECTED} from '../../../../constants/ActionTypes';

export default class ShowMessageStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    };

    this.renderStatus = this.renderStatus.bind(this);
    this.handleCloseMessageStatus = this.handleCloseMessageStatus.bind(this);
  }

  renderStatus() {
    const {status} = this.props;
    switch (status) {
      case PENDING :
        return this.renderPendingStatus();
      case FULFILLED :
        return this.renderSuccessStatus();
      case REJECTED :
        return this.renderFailureStatus();
      default:
        return '';
    }
  }

  handleCloseMessageStatus() {
    this.setState({
      isOpenModal: false
    });
    if (this.props.status === FULFILLED) {
      this.props.onSuccessStatus();
    } else {
      this.props.onFailureStatus();
    }
  }

  render() {
    const contents = this.renderStatus();
    return (

      <Modal isModalOpen={this.state.isOpenModal}>
        <div>
          {
            contents
          }
        </div>
      </Modal>
    );
  }

  renderPendingStatus() {
    return (
      <div>
        <h5>{this.props.pendingMessage}</h5>
      </div>
    );
  }

  renderSuccessStatus() {
    return (
      <div>
        <h4>{this.props.successMessage}</h4>
        <button className="uk-button uk-button-success" onClick={this.handleCloseMessageStatus}>Ok</button>
      </div>
    );
  }

  renderFailureStatus() {
    return (
      <div>
        <h5>{this.props.failureMessage}</h5>
        <button className="uk-button" onClick={this.handleCloseMessageStatus}>Close</button>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    const {status} = props;
    if (status) {
      this.setState({isOpenModal: true});
    } else {
      this.setState({isOpenModal: false});
    }
  }
}

ShowMessageStatus.defaultProps = {
  status: null,
  pendingMessage: 'Wait...',
  successMessage: 'Success.',
  failureMessage: 'Failed.'
};

ShowMessageStatus.propTypes = {
  status: PropTypes.string,
  pendingMessage: PropTypes.string,
  successMessage: PropTypes.string,
  failureMessage: PropTypes.string,
  onSuccessStatus: PropTypes.func.isRequired,
  onFailureStatus: PropTypes.func.isRequired
};

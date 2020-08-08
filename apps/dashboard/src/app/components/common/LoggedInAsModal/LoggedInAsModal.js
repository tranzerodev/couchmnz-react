import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../Modal';

class LoggedInAsModal extends Component {
  render() {
    const {userDetails} = this.props;
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div className="cl-sd-modal-common">
          <div className="uk-modal-dialog cl-sd-modal-width-one">
            <a onClick={this.props.onOk} className="uk-modal-close uk-close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
                </g>
              </svg>
            </a>
            <div className="uk-modal-header mb45">
              <h2>{this.props.p.t('loggedInAsModal.heading')}</h2>
            </div>
            <div className="uk-modal-body">
              <div className="uk-grid">
                <div className="uk-width-large-1-1">
                  <p>
                    {this.props.p.t('loggedInAsModal.name')} : {userDetails.firstName} {userDetails.lastName}
                    <br/>
                    <br/>
                    {this.props.p.t('loggedInAsModal.email')} : {userDetails.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="uk-modal-footer btn-red">
              <div className="uk-grid">
                <div className="uk-width-5-10 uk-text-left">
                  <button type="button" onClick={this.props.onOk} className="uk-modal-close uk-close theme-orange-btn">OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      onOk: PropTypes.func.isRequired,
      userDetails: PropTypes.object.isRequired
    };
  }
}

LoggedInAsModal.defaultProps = {
};

export default translate(LoggedInAsModal);

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../Modal';

class ConfirmationModal extends Component {
  render() {
    const {heading, description, instruction, okButtonLabel, cancelButtonLabel, error} = this.props;
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div className="cl-sd-modal-common">
          <div className="uk-modal-dialog cl-sd-modal-width-one">
            <a onClick={this.props.onCancel} className="uk-modal-close uk-close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
                </g>
              </svg>
            </a>
            <div className="uk-modal-header mb45">
              <h2>{heading}</h2>
            </div>
            <div className="uk-modal-body">
              <div className="uk-grid">
                <div className="uk-width-large-1-1">
                  <p>
                    {description}
                    <br/>
                    {instruction}
                  </p>
                </div>
              </div>
              <div className="uk-grid">
                {error &&
                <div className="uk-width-large-1-1">
                  <div className="cl-sd-alert-box mb30">
                    <p>
                      {error}
                    </p>
                  </div>
                </div>
                }
              </div>
            </div>
            <div className="uk-modal-footer btn-red">
              <div className="uk-grid">
                <div className="uk-width-5-10 uk-text-left">
                  <button type="button" disabled={Boolean(error)} onClick={this.props.onOk} className="uk-modal-close uk-close theme-orange-btn">{okButtonLabel ? okButtonLabel : this.props.p.t('ConfirmationModal.ok')}</button>
                </div>
                <div className="uk-width-5-10 uk-text-right">
                  <button type="button" onClick={this.props.onCancel} className="uk-modal-close uk-close theme-white-btn uk-text-right">{cancelButtonLabel ? cancelButtonLabel : this.props.p.t('ConfirmationModal.cancel') }</button>
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
      heading: PropTypes.string,
      description: PropTypes.string.isRequired,
      instruction: PropTypes.string,
      okButtonLabel: PropTypes.string,
      cancelButtonLabel: PropTypes.string,
      onOk: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
      error: PropTypes.string
    };
  }
}

ConfirmationModal.defaultProps = {
  heading: '',
  instruction: '',
  okButtonLabel: '',
  cancelButtonLabel: '',
  error: undefined
};

export default translate(ConfirmationModal);

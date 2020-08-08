import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../Modal';

class CancelationPolicyModal extends Component {
  render() {
    const {p, id} = this.props;
    const modalText = `DashboardCancellationPolicy.learnMoreModals.${id}`;
    const modalId = 'policyModal-' + id;
    return (
      <Modal isModalOpen>
        <div id={modalId} className="policyModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h1>{p.t(modalText + '.header')}</h1>
              <a onClick={this.props.onClose} className="close uk-modal-close">
                <svg className="cl-sd-cross-orange" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-sd-cross-orange-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-sd-cross-orange-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body policyModalBody">
              <p><span>{p.t(modalText + '.msg1')}</span></p>
              <p>{p.t(modalText + '.msg2')}</p>
              <h3>{p.t('DashboardCancellationPolicy.additionalTerms')}</h3>
              <ul>
                <li>{p.t('DashboardCancellationPolicy.terms.term1')}</li>
                <li>{p.t('DashboardCancellationPolicy.terms.term2')}</li>
                <li>{p.t('DashboardCancellationPolicy.terms.term3')}</li>
                <li>{p.t('DashboardCancellationPolicy.terms.term4')}</li>
                {/* <li>{p.t('DashboardCancellationPolicy.terms.term5')}</li> */}
              </ul>
            </div>
            <div className="uk-modal-footer">
              <a onClick={this.props.onClose} className="general_btn uk-modal-close">{p.t('DashboardCancellationPolicy.btnOk')}</a>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      id: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired
    };
  }
}

export default translate(CancelationPolicyModal);

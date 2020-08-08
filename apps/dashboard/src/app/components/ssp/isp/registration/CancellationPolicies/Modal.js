import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../../../../common/Modal';

export default translate(class DashboardContentTopModal extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const {p} = this.props;
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div id="policyOneModal" className="policyModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h1>{this.props.p.t('BookingPreferencesModal.title')}: {this.props.p.t('BookingPreferences.cancellationPolicies.' + this.props.cancellationPolicy + '.name')}</h1>
              <a onClick={this.props.handleCloseModal} className="del uk-modal-close">
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              <p><span>{this.props.p.t('BookingPreferences.cancellationPolicies.' + this.props.cancellationPolicy + '.description')}</span></p>
              <p>{this.props.p.t('BookingPreferences.cancellationPolicies.' + this.props.cancellationPolicy + '.terms')}</p>
              <h3>{this.props.p.t('BookingPreferencesModal.additionalTerms')}:</h3>
              <ul>
                <li>{p.t('BookingPreferences.cancellationPolicyTerms.term1')}</li>
                <li>{p.t('BookingPreferences.cancellationPolicyTerms.term2')}</li>
                <li>{p.t('BookingPreferences.cancellationPolicyTerms.term3')}</li>
                <li>{p.t('BookingPreferences.cancellationPolicyTerms.term4')}</li>
                <li>{p.t('BookingPreferences.cancellationPolicyTerms.term5')}</li>
              </ul>
            </div>
            <div className="uk-modal-footer">
              <a onClick={this.props.handleCloseModal} className="general_btn uk-modal-close">{this.props.p.t('BookingPreferencesModal.ok')}</a>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      cancellationPolicy: PropTypes.string.isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      handleCloseModal: PropTypes.func.isRequired
    };
  }
});

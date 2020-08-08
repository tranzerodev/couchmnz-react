import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(69, 69, 69, 0.75)',
    zIndex: 5
  },
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default translate(class DashboardContentTopModal extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {cancellationPolicy} = this.props;
    return (
      <ReactModal
        isOpen
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel=""
        ariaHideApp={false}
      >
        <div id="policyOneModal" className="uk-modal policyModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h1>{this.props.p.t('BookingPreferencesModal.title')}: {this.props.p.t('BookingPreferences.cancellationPolicies.' + this.props.cancellationPolicy + '.name')}</h1>
              <a className="del uk-modal-close">
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2={18} y2={18} transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1={18} y2={18} transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              <p><span>{this.props.p.t('BookingPreferences.cancellationPolicies.' + this.props.cancellationPolicy + '.description')}</span></p>
              <p>{cancellationPolicy.terms}</p>
              <h3>{this.props.p.t('BookingPreferencesModal.additionalTerms')}:</h3>
              {this.props.p.t('BookingPreferences.cancellationPolicies.' + this.props.cancellationPolicy + '.terms')}
            </div>
            <div className="uk-modal-footer">
              <a onClick={this.props.handleCloseModal} className="general_btn uk-modal-close">{this.props.p.t('BookingPreferencesModal.ok')}</a>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
});

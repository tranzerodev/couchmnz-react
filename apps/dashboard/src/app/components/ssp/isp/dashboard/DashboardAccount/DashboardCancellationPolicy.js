
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import config from '../../../../../config';

class DashboardCancellationPolicy extends Component {
  constructor(props) {
    super(props);
    this.renderCancellationPolicyModal = this.renderCancellationPolicyModal.bind(this);
    this.renderCancellationPolicy = this.renderCancellationPolicy.bind(this);
    this.state = {
      visible: 'none',
      visibleSpeciality: 'none',
      modal: ''
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderCancellationPolicyModal(id) {
    const {p} = this.props;
    const modalText = `DashboardCancellationPolicy.learnMoreModals.${id}`;
    const modalId = 'policyModal-' + id;
    return (
      <div id={modalId} className="uk-modal policyModal">
        <div className="uk-modal-dialog uk-modal-dialog-small">
          <div className="uk-modal-header">
            <h1>{p.t(modalText + '.header')}</h1>
            <a href="#" className="close uk-modal-close">
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
            <a href="#" className="general_btn uk-modal-close">{p.t('DashboardCancellationPolicy.btnOk')}</a>
          </div>
        </div>
      </div>
    );
  }

  renderCancellationPolicy(cancellationPolicyId) {
    const {p} = this.props;
    const cancellationPolicyText = `BookingPreferences.cancellationPolicies.${cancellationPolicyId}`;
    const name = `${cancellationPolicyText}.name`;
    const description = `${cancellationPolicyText}.description`;
    const terms = `${cancellationPolicyText}.terms`;
    const id = `radio-${cancellationPolicyId}`;
    const modalId = '#policyModal-' + cancellationPolicyId;
    const {cancellationPolicy} = this.props;
    const isSelected = (cancellationPolicy === cancellationPolicyId);

    return (
      <div key={cancellationPolicyId} className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1">
        <div className="subcription">
          <div className="tandc">
            <input id={id} type="radio" name="policy" onChange={this.props.onChangeCancellationPolicy} checked={isSelected} value={cancellationPolicyId}/>
            <label htmlFor={id}>{p.t(name)}</label>
          </div>
          <div className="tableDiv">
            <div className="rCol">
              <p><span>{p.t(description)}</span></p>
              <p>{p.t(terms)}</p>
              <a value={cancellationPolicyId} href={modalId} data-uk-modal>{this.props.p.t('BookingPreferences.learnMore')}</a>
              {this.renderCancellationPolicyModal(cancellationPolicyId)}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const {p, isValidCancellationPolicy, submit} = this.props;
    return (

      <div className="cl-sd-trainingLocationInner">
        <div className={submit === true && (isValidCancellationPolicy === false) ? 'field-holder error' : 'field-holder'}>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <h1 className="uk-padding-remove">{p.t('BookingPreferences.cancellationPolicy')}</h1>
              <p className="pb35">{p.t('BookingPreferences.cancellationPolicyMessage')}</p>
            </div>
          </div>
          <div className={submit === true && (isValidCancellationPolicy === false) ? 'field-holder error' : 'field-holder'}>
            <div className="uk-grid">
              {
                config.cancellationPollicies.map(this.renderCancellationPolicy)
              }
            </div>
            <span className="error-text">{this.props.p.t('BookingPreferences.validation_messages.cancellationPolicy')}</span>
          </div>
        </div>

      </div>
    );
  }
  static get propTypes() {
    return {
      cancellationPolicy: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      submit: PropTypes.bool.isRequired,
      isValidCancellationPolicy: PropTypes.bool.isRequired,
      onChangeCancellationPolicy: PropTypes.func.isRequired
    };
  }
}

DashboardCancellationPolicy.defaultProps = {
  cancellationPolicy: ''
};

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(DashboardCancellationPolicy));

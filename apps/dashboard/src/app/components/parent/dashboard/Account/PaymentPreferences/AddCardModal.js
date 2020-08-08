import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import Modal from '../../../../common/Modal';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCountries, savePaymentSource, fetchPaymentDeatils} from '../../../../../actions/index';
import {injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement} from 'react-stripe-elements';

import appConstants from '../../../../../constants/appConstants';
import {PENDING, FULFILLED} from '../../../../../constants/ActionTypes';
import {shoppingCartProfileType} from '../../../../../validators/common/shoppingCart';
import {ClipLoader} from 'react-spinners';

const {payment} = appConstants;
const {types} = payment;

class AddCardModal extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.state = {
      requesting: false,
      validation: {
        error: false,
        message: ''
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.paymentDetails.saveStatus === PENDING && nextProps.paymentDetails.saveStatus === FULFILLED) {
      this.props.fetchPaymentDeatils(nextProps.profileType);
      this.handleClose();
    }
  }

  handleClose() {
    this.setState({requesting: false, validation: {error: false, message: ''}});
    this.props.onClose();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({requesting: true, validation: {
      error: false,
      message: ''
    }}, this.handleRequest());
  }

  handleRequest() {
    this.props.stripe
      .createSource({type: types.card})
      .then(payload => {
        // Console.log('PAYLOAD', payload);
        if (payload.error) {
          this.setState({
            validation: {
              error: true,
              message: payload.error.message
            },
            requesting: false
          });
        } else if (payload.source) {
          this.props.savePaymentSource(this.props.profileType, payload.source.id);
        }
      });
  }

  render() {
    const {isModalOpen, p} = this.props;
    const {validation, requesting} = this.state;
    return (
      <Modal isModalOpen={isModalOpen}>
        <form onSubmit={this.handleSubmit}>
          <div id="addcardModal" className="uk-modal cardInfo uk-open" aria-hidden="false" style={{display: 'block', overflowY: 'scroll'}}>
            <div className="uk-modal-dialog uk-modal-dialog-small">
              <div className="uk-modal-header">
                <h2>{p.t('AddCardModal.addCard')}</h2>
                <a className="del uk-modal-close" onClick={this.handleClose}>
                  <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                    <g transform="translate(-1946.5 -5770.5)">
                      <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2={18} y2={18} transform="translate(1629.5 538.5)"/>
                      <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1={18} y2={18} transform="translate(1629.5 538.5)"/>
                    </g>
                  </svg>
                </a>
              </div>
              <div className="uk-modal-body">
                <div className="uk-grid">
                  <div className="uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                    <div className="field-holder">
                      <label>{p.t('AddCardModal.cardNumber')}</label>
                      <CardNumberElement/>
                    </div>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-small-1-1">
                    <div className="field-holder">
                      <label>{p.t('AddCardModal.expirationDate')}</label>
                      <CardExpiryElement/>
                    </div>
                  </div>
                  <div className="uk-width-large-4-10 uk-width-medium-4-10 uk-width-small-1-1">
                    <div className="field-holder">
                      <label>{p.t('AddCardModal.securityCode')}</label>
                      <CardCVCElement/>
                    </div>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                    <div className="field-holder">
                      <label>{p.t('AddCardModal.zipCode')}</label>
                      <PostalCodeElement/>
                    </div>
                  </div>
                </div>
                {requesting === true && (
                  <div className="uk-grid">
                    <div className="cl-loader-modal">
                      <div className="cl-loader-elem">
                        <ClipLoader loading size={30}/>
                      </div>
                    </div>
                  </div>
                )}
                <div className="uk-grid">
                  <div className={validation.error ? 'field-holder error' : 'field-holder'}>
                    <span className="error-text">{validation.message}</span>
                  </div>
                </div>
              </div>
              <div className="uk-modal-footer">
                <div className="tableDiv">
                  <div className="lCol">
                    {
                      requesting === false && (
                        <button className="general_btn"> {p.t('AddCardModal.saveCard')}</button>
                      )
                    }
                  </div>
                  <div className="rCol">
                    <a className="cancel" onClick={this.handleClose}>{p.t('AddCardModal.cancel')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      paymentDetails: PropTypes.object.isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      savePaymentSource: PropTypes.func.isRequired,
      fetchPaymentDeatils: PropTypes.func.isRequired,
      profileType: PropTypes.string,
      stripe: PropTypes.onject
    };
  }
}

AddCardModal.defaultProps = {
  stripe: null,
  profileType: ''
};

const mapStateToProps = state => {
  const {userProfiles, countries, payment} = state;
  const {paymentDetails} = payment;
  return {
    profileType: shoppingCartProfileType(userProfiles.data),
    countries,
    paymentDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savePaymentSource: (type, sourceId) => dispatch(savePaymentSource(type, sourceId)),
    fetchPaymentDeatils: type => dispatch(fetchPaymentDeatils(type)),
    fetchCountries: () => dispatch(fetchCountries())
  };
};

const AddCardModalClass = connect(mapStateToProps, mapDispatchToProps)(AddCardModal);
export default injectStripe(withRouter(translate(AddCardModalClass)));
/* eslint react/no-deprecated: 0 */

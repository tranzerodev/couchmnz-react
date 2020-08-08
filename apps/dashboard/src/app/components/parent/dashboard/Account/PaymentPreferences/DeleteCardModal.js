
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import Modal from '../../../../common/Modal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchPaymentDeatils, deletePaymentSource} from '../../../../../actions/index';
import {REJECTED, PENDING, FULFILLED} from '../../../../../constants/ActionTypes';
import {shoppingCartProfileType} from '../../../../../validators/common/shoppingCart';
import {ClipLoader} from 'react-spinners';
class PaymentPreferences extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.paymentDetails.deleteStatus === PENDING && nextProps.paymentDetails.deleteStatus === FULFILLED) {
      this.props.fetchPaymentDeatils(nextProps.profileType);
      this.handleClose();
    }
  }
  handleClose() {
    this.props.onClose();
  }
  handleDelete(e) {
    e.preventDefault();
    this.props.deletePaymentSource(this.props.profileType, this.props.source);
  }
  render() {
    const {isModalOpen, p, paymentDetails} = this.props;
    return (
      <Modal isModalOpen={isModalOpen}>
        <div id="deletecardModal" className="uk-modal cardInfo uk-open" aria-hidden="false" style={{display: 'block', overflowY: 'scroll'}}>
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2>{p.t('DeleteCardModal.title')}</h2>
              <a className="del uk-modal-close" onClick={this.props.onClose}>
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2={18} y2={18} transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1={18} y2={18} transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              {paymentDetails.deleteStatus === PENDING && (
                <div className="uk-grid">
                  <div className="cl-loader-modal">
                    <div className="cl-loader-elem">
                      <ClipLoader loading size={30}/>
                    </div>
                  </div>
                </div>
              )}
              <div className="uk-grid">
                <div className={paymentDetails.deleteStatus === REJECTED ? 'field-holder error' : 'field-holder'}>
                  <span className="error-text">{p.t('DeleteCardModal.error')}</span>
                </div>
              </div>
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  {paymentDetails.deleteStatus !== PENDING && <a className="general_btn" onClick={this.handleDelete}>{p.t('DeleteCardModal.confirmDelete')}</a>}
                </div>
                <div className="rCol">
                  <a onClick={this.props.onClose} className="cancel">{p.t('DeleteCardModal.cancel')}</a>
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
      profileType: PropTypes.string,
      fetchPaymentDeatils: PropTypes.func.isRequired,
      deletePaymentSource: PropTypes.func.isRequired,
      source: PropTypes.string.isRequired,
      paymentDetails: PropTypes.object.isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired
    };
  }
}

PaymentPreferences.defaultProps = {
  profileType: ''
};

const mapStateToProps = state => {
  const {userProfiles, payment} = state;
  const {paymentDetails} = payment;
  return {
    profileType: shoppingCartProfileType(userProfiles.data),
    paymentDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPaymentDeatils: type => dispatch(fetchPaymentDeatils(type)),
    deletePaymentSource: (type, sourceId) => dispatch(deletePaymentSource(type, sourceId))
  };
};

const DeleteCardModal = connect(mapStateToProps, mapDispatchToProps)(PaymentPreferences);

export default withRouter(translate(DeleteCardModal));
/* eslint react/no-deprecated: 0 */

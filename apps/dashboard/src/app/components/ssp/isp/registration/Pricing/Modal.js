import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import validator from '../../../../../validators/ssp/isp/common/discount';
import {connect} from 'react-redux';

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
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ModalClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: {
        name: '',
        numberOfSessions: '',
        discount: ''
      },
      submitted: false,
      validation: {
        name: false,
        numberOfSessions: false,
        discount: false,
        valid: false
      }
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
    this.handleNumberOfSessions = this.handleNumberOfSessions.bind(this);
    this.handeValidation = this.handleValidation.bind(this);
  }
  handleValidation() {
    const {discount} = this.state;
    const validation = validator(discount);
    this.setState({validation});
  }
  handleSave() {
    const object = this.state.discount;
    this.handeValidation();
    const {validation} = this.state;
    if (validation.valid) {
      const {name, numberOfSessions, discount} = object;
      this.props.onSave({
        name: name ? name : '',
        numberOfSessions: numberOfSessions ? numberOfSessions : 0,
        discount: discount ? discount : 0,
        isActive: 'N'
      });
    } else {
      this.setState({submitted: true});
    }
  }
  componentWillUnmount() {
    this.setState({
      colorPicker: 'none'
    });
  }
  handleName(e) {
    const {discount} = this.state;
    this.setState({
      discount: {
        ...discount,
        name: e.target.value
      }
    }, this.handeValidation());
  }
  handleNumberOfSessions(e) {
    const number = parseInt(e.target.value, 10);
    const {discount} = this.state;
    this.setState({
      discount: {
        ...discount,
        numberOfSessions: number ? number : ''
      }
    }, this.handeValidation());
  }
  handleDiscount(e) {
    const number = parseInt(e.target.value, 10);
    const {discount} = this.state;
    this.setState({
      discount: {
        ...discount,
        discount: number
      }
    }, this.handleValidation());
  }
  render() {
    const {offerTerminology/* , offerTerminologyPlural */} = this.props.sport;
    const {discount, validation, submitted} = this.state;
    return (
      <ReactModal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Volume Discount"
        ariaHideApp={false}
      >

        <div id="newSessionModal">
          <div className="">
            <div className="uk-modal-header">
              <h2>{this.props.p.t('PricingModal.title')}</h2>
              <a className="del uk-modal-close" onClick={this.props.closeModal}><i className="fa fa-times"/></a>
            </div>
            <div className="uk-modal-body">

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                  <label>{this.props.p.t('PricingModal.packageName')}</label>
                </div>
                <div className="uk-width-xlarge-2-2 uk-width-large-2-2 uk-width-medium-2-2  uk-width-small-1-1 ">
                  <div className={validation.name === false && validation.valid === false && submitted ? 'field-holder error' : 'field-holder'}>
                    <input type="text" className="uk-form-controls" placeholder={this.props.p.t('PricingModal.enterPackageName')} onChange={this.handleName} value={discount.name}/>
                    <span className="error-text">{this.props.p.t('PricingModal.validation_messages.name')}</span>
                  </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                  <label>{this.props.p.t('PricingModal.numberOfSessions', {session: offerTerminology.plural/* offerTerminologyPlural */})}</label>
                </div>
                <div className="uk-width-xlarge-2-2 uk-width-large-2-2 uk-width-medium-2-2  uk-width-small-1-1 ">
                  <div className={validation.numberOfSessions === false && validation.valid === false && submitted ? 'field-holder error' : 'field-holder'}>
                    <input type="number" min={0} className="uk-form-controls" placeholder={this.props.p.t('PricingModal.enterNumberOfSessions', {session: offerTerminology.plural/* offerTerminologyPlural */})} onChange={this.handleNumberOfSessions} value={discount.numberOfSessions}/>
                    <span className="error-text">{this.props.p.t('PricingModal.validation_messages.numberOfSessions', {session: offerTerminology.plural/* offerTerminologyPlural */})}</span>
                  </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                  <label>{this.props.p.t('PricingModal.discountInPercentage')}</label>
                </div>
                <div className="uk-width-xlarge-2-2 uk-width-large-2-2 uk-width-medium2-2  uk-width-small-1-1 ">
                  <div className={validation.discount === false && validation.valid === false && submitted ? 'field-holder error' : 'field-holder'}>
                    <input type="number" min={0} max={99} className="uk-form-controls" placeholder={this.props.p.t('PricingModal.enterDiscount')} onChange={this.handleDiscount} value={discount.discount}/>
                    <span className="error-text">{this.props.p.t('PricingModal.validation_messages.discount')}</span>
                  </div>
                </div>
              </div>

              <div className="borderClass pb35 mb10"/>
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a className="finish" onClick={this.handleSave}>{this.props.p.t('SessionsCreateModal.save')}</a>
                </div>
                <div className="rCol">
                  <a className="finish" onClick={this.props.closeModal}>{this.props.p.t('SessionsCreateModal.close')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </ReactModal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSave: PropTypes.func.isRequired,
      closeModal: PropTypes.func.isRequired,
      sport: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {sport} = state;
  return {
    sport
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalClass);
export default translate(Modal);

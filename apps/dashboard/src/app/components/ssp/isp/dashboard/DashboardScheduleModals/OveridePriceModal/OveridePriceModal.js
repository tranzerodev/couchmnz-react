import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import validateOverridePrice from '../../../../../../validators/ssp/isp/overridePricing';
import {ispUpdateSessionOveridePrice} from '../../../../../../actions';

class OveridePriceModal extends Component {
  constructor(props) {
    super(props);
    const {scheduledSession} = this.props;
    const overridePricing = scheduledSession.overridePricing;
    const validation = validateOverridePrice(overridePricing);
    this.state = {
      submitted: false,
      overridePricing,
      validation
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitkButtonClicked = this.handleSubmitkButtonClicked.bind(this);
    this.handleOverridePriceChange = this.handleOverridePriceChange.bind(this);
  }

  handleCancelClick() {
    this.props.onCancel();
  }
  handleSubmitkButtonClicked() {
    const {overridePricing, validation} = this.state;
    const {selectedProfile, scheduledSession} = this.props;
    if (validation.valid) {
      this.props.ispUpdateSessionOveridePrice(selectedProfile.id, scheduledSession.id, overridePricing, scheduledSession.priceUnit);
      this.props.onCancel();
    } else {
      this.setState({
        submitted: true
      });
    }
  }

  handleOverridePriceChange(e) {
    const {value} = e.target;
    const validation = validateOverridePrice(value);
    this.setState({
      overridePricing: parseInt(value, 10),
      validation
    });
  }
  render() {
    const {p, scheduledSession} = this.props;
    const {validation, submitted} = this.state;
    return (
      <div id="overide-price-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb30">
            <h2>{p.t('OveridePrice.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className={validation.overridePrice === false && submitted ? 'field-holder error' : 'field-holder'}>
              <div className="uk-grid">
                <div className="uk-width-large-1-1">
                  <div className="cl-sd-alert-box mb30">
                    <p>
                      {p.t('OveridePrice.message')}
                    </p>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-3-10">
                      <label className="uk-form-label">{p.t('OveridePrice.newPrice')}</label>
                    </div>
                    <div className="uk-width-7-10 uk-text-right">
                      <label className="uk-form-label">{p.t('OveridePrice.newPriceMessage')} {scheduledSession.overridePricing}</label>
                    </div>
                  </div>
                  <div className="uk-width-1-1">
                    <div className="dollardiv">
                      <span className="dollar">{scheduledSession.priceUnit}</span>
                      <input type="number" onChange={this.handleOverridePriceChange} className="cl-sd-input-text-full-width" value={this.state.overridePricing}/>
                    </div>
                  </div>
                </div>
              </div>
              <span className="error-text">{p.t('OveridePrice.validation.overridePrice')}</span>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" onClick={this.handleSubmitkButtonClicked} className="uk-modal-close uk-close theme-orange-btn">{p.t('OveridePrice.submit')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('OveridePrice.cancel')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      ispUpdateSessionOveridePrice: PropTypes.func.isRequired,
      scheduledSession: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired

    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ispUpdateSessionOveridePrice: (profileID, scheduledSessionId, overridePrice, priceUnit) => dispatch(ispUpdateSessionOveridePrice(profileID, scheduledSessionId, overridePrice, priceUnit))
  };
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  return {
    selectedProfile: userProfiles.selectedProfile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(OveridePriceModal));

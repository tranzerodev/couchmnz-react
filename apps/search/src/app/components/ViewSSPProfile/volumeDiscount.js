import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {VOLUME_DISCOUNT} from '../../constants/assetsPaths';

class VolumeDiscount extends Component {
  constructor(props) {
    super(props);
    this.renderDiscounts = this.renderDiscounts.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const qty = e.currentTarget.getAttribute('data-value');
    this.props.onVolumeDiscountSelect(this.props.sessionID, qty, this.props.startTime);
    this.props.onClose();
  }

  renderDiscounts() {
    const {volumeDiscounts, offerTerminology, baseRate} = this.props;
    return (
      volumeDiscounts.map((discount, index) => {
        const key = index * 2;
        return (
          <div key={key} className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
            <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
              <div className="bold-font-family pkg-name">
                {discount.vol + '+ '}
                <span className="normal-font">{offerTerminology.plural}: </span>
                {discount.currency}{discount.amt} {this.props.p.t('VolumeDiscount.each')}
              </div>
            </div>
            <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
              <span className="offer-price">
                {this.props.p.t('VolumeDiscount.save')} {discount.currency}{baseRate.rate - discount.amt}
              </span>
            </div>
            <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
              <a onClick={this.handleSelect} data-value={discount.vol} className="select-package"> {this.props.p.t('VolumeDiscount.select')} </a>
            </div>
          </div>
        );
      }
      )
    );
  }

  render() {
    const {baseRate} = this.props;
    return (
      <div id="see-volume-discount-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-four">
          <a onClick={this.props.onClose} className="uk-modal-close uk-close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb50"/>
          <div className="uk-modal-body">
            <div className="package-box">
              <h2>{this.props.p.t('VolumeDiscount.buy_more')}</h2>
              <div className="pacakge-image">
                <img src={VOLUME_DISCOUNT} width="100%" alt="Package Image" title="Package Image"/>
              </div>
              <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
                <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                  <div className="bold-font-family pkg-name">{this.props.p.t('VolumeDiscount.single_session_fee')}: {baseRate.currency}{baseRate.rate}</div>
                </div>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1"/>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1"/>
              </div>
              {this.renderDiscounts()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onClose: PropTypes.func.isRequired,
      volumeDiscounts: PropTypes.array.isRequired,
      baseRate: PropTypes.object.isRequired,
      offerTerminology: PropTypes.object.isRequired,
      onVolumeDiscountSelect: PropTypes.func.isRequired,
      sessionID: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired
    };
  }
}

export default (translate(VolumeDiscount));

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../../common/Modal';
import {VOLUME_DISCOUNT} from '../../../constants/assetsPaths';
import appConstants from '../../../constants/appConstants';

const {shoppingCart} = appConstants;
const {currencyDecimals} = shoppingCart;

class VolumeDiscount extends Component {
  constructor(props) {
    super(props);
    this.renderDiscounts = this.renderDiscounts.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const qty = e.currentTarget.getAttribute('data-value');
    this.props.onVolumeDiscountSelect(this.props.itemId, qty);
    this.props.onClose();
  }

  renderDiscounts() {
    const {volumeDiscounts, offerTerminology, baseRate, p} = this.props;
    console.log('renderDiscounts:', p);
    return (
      volumeDiscounts.map((discount, index) => {
        const key = index * 2;
        return (
          <div key={key} className="cl-sd-sessionfeeOuter">
            <div className="cl-sd-sessionfeeInner">
              <p>
                <span>{discount.minNumberOfSession + '+ '}</span>
                {offerTerminology.plural}:
                <span> {p.t('currency')}{discount.discountPrice.toFixed(currencyDecimals)} {p.t('VolumeDiscount.each')}</span>
              </p>
            </div>
            <div className="cl-sd-sessionfeeInner">
              <p><a className="bluelink">  {p.t('VolumeDiscount.save')} {p.t('currency')}{(discount.minNumberOfSession * discount.discountPrice).toFixed(currencyDecimals)}</a></p>
            </div>
            <div className="cl-sd-sessionfeeInner">
              <p>
                <a onClick={this.handleSelect} data-value={discount.minNumberOfSession} className="orangelink">
                  {this.props.p.t('VolumeDiscount.select')}
                </a>
              </p>
            </div>
          </div>
        );
      }
      )
    );
  }

  render() {
    const {baseRate, isModalOpen, p} = this.props;
    return (
      <Modal isModalOpen={isModalOpen} onClose={this.props.onClose}>
        <div id="buymoreModal" >
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2>{this.props.p.t('VolumeDiscount.buy_more')}</h2>
              <a onClick={this.props.onClose} className="del uk-modal-close">
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              <div className="cl-demoImageDiv">
                <img src={VOLUME_DISCOUNT} width="100%" alt="Package Image" title="Package Image"/>
              </div>
              <div className="cl-sd-sessionfeeOuter">
                <div className="cl-sd-sessionfeeHead">
                  <p>{p.t('VolumeDiscount.single_session_fee')}: {p.t('currency')}{baseRate}</p>
                </div>
              </div>
              {this.renderDiscounts()}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onClose: PropTypes.func.isRequired,
      volumeDiscounts: PropTypes.array.isRequired,
      baseRate: PropTypes.number.isRequired,
      offerTerminology: PropTypes.object.isRequired,
      onVolumeDiscountSelect: PropTypes.func.isRequired,
      itemId: PropTypes.string.isRequired,
      isModalOpen: PropTypes.bool.isRequired
    };
  }
}

export default (translate(VolumeDiscount));

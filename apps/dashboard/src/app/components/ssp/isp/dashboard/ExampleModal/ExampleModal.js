import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../../../../common/Modal';
import appConstants from '../../../../../constants/appConstants';

class ExampleModal extends Component {
  constructor() {
    super();
    this.handleImageRef = this.handleImageRef.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollImage = this.scrollImage.bind(this);
  }
  scrollTo() {
    setTimeout(this.scrollImage, appConstants.scrollDelay);
  }
  scrollImage() {
    const {scroll} = this.props;
    if (this.image) {
      this.image.scroll({
        top: scroll,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.isModalOpen && this.props.isModalOpen) {
      this.scrollTo();
    }
  }
  handleImageRef(ref) {
    this.image = ref;
  }
  render() {
    const {isModalOpen, image, title, offerTerminology} = this.props;
    return (
      <Modal isModalOpen={isModalOpen}>
        <div id="viewprofileexpModal" className="viewExpModal">
          <div className="uk-modal-dialog uk-modal-dialog-large">
            <div className="uk-modal-header uk-modal-header-custom">
              <h2>{this.props.p.t(title, {session: offerTerminology})}</h2>
              <a className="close uk-modal-close" onClick={this.props.onClose}>
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2={18} y2={18} transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1={18} y2={18} transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div ref={this.handleImageRef} className="uk-modal-body">
              <img src={image} alt="Help-SampleProfile"/>
            </div>
            <div className="uk-modal-footer">
              <a className="general_btn uk-modal-close" onClick={this.props.onClose}>{this.props.p.t('DashboardSports.close')}</a>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      scroll: PropTypes.number.isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired,
      offerTerminology: PropTypes.string,
      title: PropTypes.string.isRequired
    };
  }
}

ExampleModal.defaultProps = {
  offerTerminology: appConstants.defaultOfferTerminologyValue
};

const mapDispatchToProps = () => {
  return {};
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(ExampleModal)));

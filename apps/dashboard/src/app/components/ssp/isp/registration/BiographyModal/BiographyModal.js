import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import Modal from '../../../../common/Modal';
import {withRouter} from 'react-router-dom';

class BiographyModal extends Component {
  constructor() {
    super();
    this.state = {submitted: false};
    this.handleClose = this.handleClose.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  handleClose() {
    this.props.handleClose();
  }
  handleNext() {
    this.props.history.push(this.props.next);
  }
  render() {
    const {p, msgKey} = this.props;
    const notFilled = this.props.notFilled.join(', ');
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div id="notDefineModal" className="custom_modal">
          <div className="uk-modal-dialog uk-modal-dialog-medium">
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">{p.t('RequiredNotFilledModal.oops')}</h2>
              <a onClick={this.handleClose} className="del uk-modal-close">
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              <p>{p.t(msgKey, {notFilled})}</p>
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a onClick={this.handleClose} className="general_btn">{p.t('RequiredNotFilledModal.yes')}</a>
                </div>
                <div className="rCol">
                  <a onClick={this.handleNext} className="back">{p.t('RequiredNotFilledModal.takeMeToNextPage')}</a>
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
      isModalOpen: PropTypes.bool.isRequired,
      handleClose: PropTypes.func.isRequired,
      notFilled: PropTypes.array.isRequired,
      msgKey: PropTypes.string,
      next: PropTypes.string.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

BiographyModal.defaultProps = {
  msgKey: 'RequiredNotFilledModal.youHaveNotFilled'
};

export default translate(withRouter(BiographyModal));

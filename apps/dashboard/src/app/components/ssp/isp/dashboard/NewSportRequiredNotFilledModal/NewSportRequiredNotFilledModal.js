import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import Modal from '../../../../common/Modal';

class NewSportRequiredNotFilledModal extends Component {
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
    const updateType = this.props.saveType;
    this.props.saveData(this.props.data, updateType);
    this.props.handleClose();
  }
  render() {
    const {p, msgBodyKey} = this.props;
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
              <p>{p.t(msgBodyKey, {notFilled})}</p>
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
      saveData: PropTypes.func.isRequired,
      notFilled: PropTypes.array.isRequired,
      data: PropTypes.object.isRequired,
      saveType: PropTypes.string.isRequired,
      msgBodyKey: PropTypes.string
    };
  }
}

NewSportRequiredNotFilledModal.defaultProps = {
  msgBodyKey: 'NewSportRequiredNotFilledModal.youHaveNotFilled'
};

export default translate(NewSportRequiredNotFilledModal);

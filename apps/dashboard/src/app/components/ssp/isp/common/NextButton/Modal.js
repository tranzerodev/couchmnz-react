import React, {Component} from 'react';
import ReactModal from 'react-modal';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
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
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const capitalizeFirstLetter = string => {
  return string.replace(/(^|\s)\S/g, l => l.toUpperCase());
};

class DashboardContentTopModal extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <ReactModal
        isOpen
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel=""
        ariaHideApp={false}
      >
        <div id="notDefineModal" className="uk-open">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">{this.props.p.t('NextButtonModal.title')}</h2>
            </div>
            <div className="uk-modal-body">
              <p>{this.props.p.t('NextButtonModal.message')} :</p>
              {this.props.fields && this.props.fields.length && this.props.fields.map((field, i) => <p key={i}><i className="fa fa-circle-thin"/> {capitalizeFirstLetter(field)}</p>)}
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a className="general_btn" onClick={this.props.onCloseModal}>{this.props.p.t('NextButtonModal.yes')}</a>
                </div>
                <div className="rCol">
                  <a className="back" onClick={this.props.onCloseModal}>{this.props.p.t('NextButtonModal.no')}</a>
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
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

export default translate(DashboardContentTopModal);

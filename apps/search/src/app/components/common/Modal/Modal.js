import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

/* eslint react/forbid-component-props:0 */
export default class Modal extends Component {
  render() {
    return (
      <ReactModal
        isOpen={this.props.isModalOpen}
        ariaHideApp={false}
        style={
          {
            overlay: {
              display: 'block',
              overflowY: 'scroll'
            }
          }
        }
        className={{
          base: '',
          afterOpen: '',
          beforeClose: ''
        }}
        overlayClassName={{
          base: 'uk-modal',
          afterOpen: 'uk-open',
          beforeClose: 'uk-close'
        }}
        onRequestClose={this.props.onClose}
      >
        {this.props.children}
      </ReactModal>
    );
  }
}
/* eslint react/forbid-component-props:0 */
Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

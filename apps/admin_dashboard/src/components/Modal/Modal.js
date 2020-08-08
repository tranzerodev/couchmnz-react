import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.onToggle} className={this.props.className}>
        <ModalHeader toggle={this.props.onToggle}>{this.props.header}</ModalHeader>
        <ModalBody>
          {this.props.content}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.onConfirm}>{this.props.confirmText}</Button>{' '}
          {this.props.onCancel ? <Button color="secondary" onClick={this.props.onCancel}>{this.props.cancelText}</Button> : null}
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalComponent;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

import Modal from '../../Modal';
import {addMessageLabel} from '../../../../actions';
import {validateLabel} from '../../../../validators/common/messages';

/* eslint react/forbid-component-props:0 */
class NewMessageLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNewLabelModal: false,
      newLabelName: '',
      validation: true
    };
    this.handleNewLabelClick = this.handleNewLabelClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNewLabelInputChange = this.handleNewLabelInputChange.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleNewLabelClick() {
    this.setState({openNewLabelModal: true});
  }

  handleCloseModal() {
    this.setState({
      newLabelName: '',
      openNewLabelModal: false,
      validation: true
    });
  }

  handleNewLabelInputChange(event) {
    const newLabelName = event.target.value;
    const validation = validateLabel({newLabelName});
    this.setState({newLabelName, validation});
  }

  handleClickSave() {
    const {newLabelName} = this.state;
    const validation = validateLabel({newLabelName});
    this.setState({validation});
    if (validation === true) {
      const {profileID} = this.props;
      this.props.saveNewLabel(profileID, newLabelName.trim());
      this.handleCloseModal();
    }
  }

  renderError() {
    const {validation} = this.state;
    const {p} = this.props;
    if (validation === false) {
      return (<span className="cl-field-error-text">{p.t('MessageComposer.ValidationMessages.labelDoesntMatch')}</span>);
    }
  }

  render() {
    const {p} = this.props;
    const newLabelText = p.t('NewMessageLabel.newLabel');
    return (
      <span>
        <a className="msg_sidebar-newLabel" onClick={this.handleNewLabelClick}>{newLabelText}</a>
        <Modal isModalOpen={this.state.openNewLabelModal}>
          <div className="uk-modal-dialog">
            <div className="cl-create-label" >
              <div className="cl-label-header">
                <h3>{newLabelText}</h3>
              </div>
              <div className="cl-label-content">
                <input type="text" placeholder={newLabelText} value={this.state.newLabelName} onChange={this.handleNewLabelInputChange}/>
                {
                  this.renderError()
                }
              </div>
              <div className="cl-modal-actions">
                <a className="cl-modal-actionsCancel" onClick={this.handleCloseModal}>{p.t('NewMessageLabel.cancel')}</a>
                <a className="cl-modal-actionsSubmit" onClick={this.handleClickSave}>{p.t('NewMessageLabel.save')}</a>

              </div>
            </div>

          </div>
        </Modal>
      </span>
    );
  }
}
/* eslint react/forbid-component-props:0 */

NewMessageLabel.propTypes = {
  saveNewLabel: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  profileID: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const {profile} = state.messages;
  return {
    profileID: profile.id
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveNewLabel: (profileID, labelName) => dispatch(addMessageLabel(profileID, labelName))
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(NewMessageLabel));

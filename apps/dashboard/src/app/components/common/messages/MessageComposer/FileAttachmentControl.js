import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {uploadMessageAttachment} from '../../../../actions';
import config from '../../../../config';

import {validateFileAttachmentSize} from '../../../../validators/common/messages';

class FileAttachmentControl extends Component {
  constructor(props) {
    super(props);
    this.filUploadRef = null;
    this.handleAttachFileClick = this.handleAttachFileClick.bind(this);
    this.setFileUploadRef = this.setFileUploadRef.bind(this);
    this.handleAttachFileChange = this.handleAttachFileChange.bind(this);
  }

  setFileUploadRef(filUploadRef) {
    this.filUploadRef = filUploadRef;
  }

  handleAttachFileClick() {
    this.filUploadRef.click();
  }
  handleAttachFileChange(e) {
    const attachmentFile = e.target.files[0];
    const {profileID, isValidAttachment, uploadMessageAttachment} = this.props;
    if (validateFileAttachmentSize(attachmentFile) === true) {
      isValidAttachment(true);
      uploadMessageAttachment(profileID, attachmentFile);
    } else {
      isValidAttachment(false);
    }
    e.target.value = null;
  }

  render() {
    return (
      <span>
        <div className="rdw-image-wrapper" aria-haspopup="true" aria-label="rdw-image-control" onClick={this.handleAttachFileClick}>
          <div className="rdw-option-wrapper" title="Attach file">
            <span className="uk-icon-paperclip"/>
            <input ref={this.setFileUploadRef} type="file" accept={config.messagingSystem.acceptFileType} onChange={this.handleAttachFileChange} style={{display: 'none'}}/>
          </div>
        </div>
      </span>
    );
  }
}

FileAttachmentControl.propTypes = {
  profileID: PropTypes.string.isRequired,
  isValidAttachment: PropTypes.func.isRequired,
  uploadMessageAttachment: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    uploadMessageAttachment: (profileID, attachmentFile) => dispatch(uploadMessageAttachment(profileID, attachmentFile))
  };
};

export default connect(null, mapDispatchToProps)(FileAttachmentControl);

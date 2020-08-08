import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Progress from 'react-progressbar';
import translate from 'redux-polyglot/translate';

import {cancelUploadMessageAttachment} from '../../../../actions';

class FileAttachmentUploadProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }
  handleCancelClick() {
    this.props.cancelUploadMessageAttachment(this.props.requestID);
  }

  render() {
    const {p} = this.props;
    return (
      <div className="cl-attachment-progress">
        <p className="cl-attachment-name">{this.props.fileName}</p>
        <Progress completed={this.props.percentage}/>
        <a className="cl-attachment-cancel" onClick={this.handleCancelClick}>{p.t('MessageComposer.btnCancel')}</a>
      </div>
    );
  }
}
FileAttachmentUploadProgress.propTypes = {
  percentage: PropTypes.number.isRequired,
  requestID: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  cancelUploadMessageAttachment: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => {
  return {
    cancelUploadMessageAttachment: requestID => dispatch(cancelUploadMessageAttachment(requestID))
  };
};
export default translate(connect(null, mapDispatchToProps)(FileAttachmentUploadProgress));

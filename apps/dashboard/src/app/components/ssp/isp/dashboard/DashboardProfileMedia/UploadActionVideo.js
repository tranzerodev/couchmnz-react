import React from 'react';
import PropTypes from 'prop-types';
import '../../../../common/UploadVideo/index.css';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {
  setVideos,
  addVideos,
  removeVideo,
  clearVideos,
  updateVideo,
  uploadActionVideos,
  deleteActionVideo,
  postActionVideos
} from '../../../../../actions';
import appConstants from '../../../../../constants/appConstants';
import {REJECTED} from '../../../../../constants/ActionTypes';

/* eslint react/no-deprecated:0 */
class UploadActionVideo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      files: [],
      upload: 'none',
      visible: false,
      error: undefined
    };
    this.inputElement = '';
    this.handleOnDropFile = this.handleOnDropFile.bind(this);
    this.handleTriggerFileUpload = this.handleTriggerFileUpload.bind(this);

    this.handleCaption = this.handleCaption.bind(this);
    this.handleSortable = this.handleSortable.bind(this);
    this.handleInputElement = this.handleInputElement.bind(this);
    this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderPreviewVideos = this.renderPreviewVideos.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }
  simpleList = null;
  /*
  On button click, trigger input file to open
  */
  handleTriggerFileUpload() {
    this.inputElement.click();
  }

  componentWillReceiveProps(nextProps) {
    this.setVisibility(nextProps);
  }
  setVisibility(nextProps) {
    if (nextProps.actionVideos && nextProps.actionVideos.videos && nextProps.actionVideos.videos.length && (this.state.visible === false || this.state.upload === 'none')) {
      this.setState({
        visible: true,
        upload: 'inline-block'
      });
    }
  }

  handleUploadClick() {
    this.setState({
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      visible: true,
      error: undefined
    });
  }
  /*
  Handle file validation
  */
  handleOnDropFile(e) {
    const formData = new FormData();
    const files = e.target.files;
    const _this = this;
    let success = true;
    // If callback giving, fire.
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(files);
    }
    // Iterate over all uploaded files
    for (let i = 0; i < files.length && i < 1; i++) {
      const f = files[i];
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        const newArray = _this.state.notAcceptedFileType.slice();
        newArray.push(f.name);
        const newState = Object.assign({}, _this.state, {notAcceptedFileType: newArray});
        success = false;
        this.handleError(newState);
        continue;
      }
      // Check for file size
      if (f.size > appConstants.actionVideos.size) {
        const newArray = _this.state.notAcceptedFileSize.slice();
        newArray.push(f.name);
        const newState = Object.assign({}, _this.state, {notAcceptedFileSize: newArray});
        this.handleError(newState);
        success = false;
        continue;
      }
      _this.setState({files: _this.state.files.concat(f.name)});
      const newArray = _this.props.newActionVideos;
      newArray.push(f);
      this.props.setVideos(newArray);
      formData.append('actionVideos', f);
    }
    if (this.props.newActionVideos && this.props.newActionVideos.length > 0) {
      this.props.uploadActionVideos(formData, {profileID: this.props.profile.data.profile.id, sportID: this.props.sportID});
    }
  }

  /*
  Render the upload icon
  */
  renderIcon() {
    if (this.props.withIcon) {
      return <div className="uploadIcon"/>;
    }
  }

  /*
  Render label
  */
  renderLabel() {
    if (this.props.withLabel) {
      return <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>;
    }
  }

  /*
  Check file extension (onDropFile)
  */
  hasExtension(fileName) {
    return (new RegExp('(' + appConstants.actionVideos.extensions.join('|').replace(/\./ig, '\\.') + ')$')).test(fileName) ||
    (new RegExp('(' + appConstants.actionVideos.extensions.join('|').replace(/\./ig, '\\.') + ')$')).test(fileName.toLowerCase());
  }

  /*
  Remove the video from state
  */
  handleRemoveVideo(e) {
    // Const index = this.props.newActionVideos.findIndex(i => i.id === e.currentTarget.getAttribute('value'));
    // this.props.removeVideo(index);
    this.props.deleteActionVideo({profileID: this.props.profile.data.profile.id, videoID: e.currentTarget.getAttribute('value'), sportID: this.props.sportID});
  }

  /*
	 Check if any errors && render
	 */

  handleSortable(simpleList) {
    this.simpleList = simpleList;
  }

  handleError(state) {
    const {notAcceptedFileType, notAcceptedFileSize, error} = state;
    const {p} = this.props;
    if (error) {
      return;
    }
    let errorMessage;
    if (notAcceptedFileType.length) {
      errorMessage = p.t('PhotosAndVideos.validation_messages.action_video_file_type', {files: notAcceptedFileType.join(', ')});
      const newState = Object.assign({}, state, {error: errorMessage});
      this.setState(newState);
    } else if (notAcceptedFileSize.length) {
      errorMessage = p.t('PhotosAndVideos.validation_messages.action_video_file_size', {files: notAcceptedFileSize.join(', ')});
      const newState = Object.assign({}, state, {error: errorMessage});
      this.setState(newState);
    }
  }

  renderPreviewVideos(video, index) {
    const captionEn = (video.caption_en) ? video.caption_en : '';
    return (
      <div key={index} className="cl-sd-videoOuter">
        <video width="100%" autoPlay loop muted controls>
          <source src={this.props.actionVideos.baseUrl + video.video} type="video/mp4"/>
          <p>Your browser does not support HTML5 video.</p>
        </video>
        <span value={video.video} onClick={this.handleRemoveVideo} className="cl-sd-videoCross">
          <svg className="cl-icon-cross-blue" xmlns="http://www.w3.org/2000/svg" viewBox="-1322 -5229 12 12">
            <g transform="translate(-1899 -5702)">
              <path data-name="Path 161" className="cl-icon-cross-blue-1" d="M8.977-3.234a.481.481,0,0,0-.148-.352L7.414-5,8.828-6.414a.481.481,0,0,0,.148-.352.489.489,0,0,0-.148-.359l-.7-.7a.489.489,0,0,0-.359-.148.481.481,0,0,0-.352.148L6-6.414,4.586-7.828a.481.481,0,0,0-.352-.148.489.489,0,0,0-.359.148l-.7.7a.489.489,0,0,0-.148.359.481.481,0,0,0,.148.352L4.586-5,3.172-3.586a.481.481,0,0,0-.148.352.489.489,0,0,0,.148.359l.7.7a.489.489,0,0,0,.359.148.481.481,0,0,0,.352-.148L6-3.586,7.414-2.172a.481.481,0,0,0,.352.148.489.489,0,0,0,.359-.148l.7-.7A.489.489,0,0,0,8.977-3.234ZM11.2-8.012A5.869,5.869,0,0,1,12-5a5.869,5.869,0,0,1-.8,3.012A5.973,5.973,0,0,1,9.012.2,5.869,5.869,0,0,1,6,1,5.869,5.869,0,0,1,2.988.2,5.973,5.973,0,0,1,.8-1.988,5.869,5.869,0,0,1,0-5,5.869,5.869,0,0,1,.8-8.012,5.973,5.973,0,0,1,2.988-10.2,5.869,5.869,0,0,1,6-11a5.869,5.869,0,0,1,3.012.8A5.973,5.973,0,0,1,11.2-8.012Z" transform="translate(577 484)"/>
            </g>
          </svg>
        </span>

        <div className="field-holder">
          <input
            type="text"
            className="uk-form-control"
            placeholder={this.props.p.t('UploadVideo.captionText')}
            name={index}
            value={captionEn}
            onChange={this.handleCaption}
          />
        </div>
      </div>
    );
  }
  handleCaption(e) {
    const index = e.target.name;
    const value = e.target.value;
    /* Console.log('index', e.target.name, 'value', e.target.value); */
    this.props.updateVideo({
      caption: value
    }, index);
  }
  handleInputElement(input) {
    this.inputElement = input;
  }
  handleUpdate() {
    this.props.postActionVideos(this.props.actionVideos, {profileID: this.props.profile.data.profile.id, sportID: this.props.sportID});
  }
  handleClose() {
    this.setState({visible: false});
  }
  render() {
    const {p, status} = this.props;
    return (

      <li className={status}>

        <div className="uk-grid">
          <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-2 uk-width-small-1-1">
            {this.props.actionVideos.videos.map(this.renderPreviewVideos)}
          </div>
          <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1">
            <div className="field-holder error">
              <div className="imageSpecification">
                <h5>{p.t('UploadVideo.videoSpecifications')}</h5>
                <p>{p.t('UploadVideo.maxFileSize')}: {appConstants.actionVideos.sizeInMB}mb</p>
                <p>{p.t('UploadVideo.supportedFiles')}: {appConstants.actionVideos.extensions}</p>

                <input
                  ref={this.handleInputElement}
                  type="file"
                  style={{display: 'none'}}
                  name={this.props.name}
                  onChange={this.handleOnDropFile}
                  onClick={this.handleUploadClick}
                  accept={this.props.accept}
                  className={this.props.className}
                />
                <label htmlFor="photoUploadBtn2" onClick={this.handleTriggerFileUpload}>{p.t('DashboardProfileMedia.uploadVideo')}</label>
              </div>
              <span className="error-text">{this.state.error ? this.state.error : ''}</span>
              <span className="error-text">{this.props.actionVideos.status === REJECTED ? p.t('DashboardProfileMedia.uploadError') : ''}</span>
            </div>
          </div>
        </div>

        <div className="cl-sd-uploadphtBottom" style={{display: this.state.upload}}>
          <a onClick={this.handleUpdate} className="general_btn">{p.t('ProfilePicture.save')}</a>
        </div>
      </li>

    );
  }
}

UploadActionVideo.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  /* WithPreview: PropTypes.bool, */
  accept: PropTypes.string,
  name: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  setVideos: PropTypes.func,
  withIcon: PropTypes.bool,
  updateVideo: PropTypes.func,
  status: PropTypes.string,
  newActionVideos: PropTypes.array,
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  uploadActionVideos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  actionVideos: PropTypes.object,
  deleteActionVideo: PropTypes.func.isRequired,
  postActionVideos: PropTypes.func.isRequired,
  sportID: PropTypes.string.isRequired
};

UploadActionVideo.defaultProps = {
  className: '',
  onChange: () => {},
  setVideos: () => {},
  withIcon: false,
  updateVideo: () => {},
  newActionVideos: [],
  accept: 'accept=video/*',
  name: '',
  withLabel: true,
  label: 'Max file size: 15mb, accepted: mp4',
  labelStyles: {},
  labelClass: '',
  status: '',
  actionVideos: {videos: []}
};

const mapStateToProps = state => {
  const {newActionVideos, profile, actionVideos, currentSport} = state;
  return {
    newActionVideos,
    profile,
    actionVideos,
    sportID: currentSport.data && currentSport.data.id ? currentSport.data.id : ''
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addVideos: videos => dispatch(addVideos(videos)),
    removeVideo: index => dispatch(removeVideo(index)),
    setVideos: videos => dispatch(setVideos(videos)),
    updateVideo: (video, index) => dispatch(updateVideo(video, index)),
    clearVideos: () => dispatch(clearVideos()),
    uploadActionVideos: (formData, params) => dispatch(uploadActionVideos(formData, params)),
    deleteActionVideo: params => dispatch(deleteActionVideo(params)),
    postActionVideos: (data, params) => dispatch(postActionVideos(data, params))
  };
};

const Upload = connect(mapStateToProps, mapDispatchToProps)(UploadActionVideo);
export default translate(Upload);

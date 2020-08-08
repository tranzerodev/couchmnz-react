import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import uuid from '../../../utils/uuid';
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
} from '../../../actions';
import appConstants from '../../../constants/appConstants';

class UploadClass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      files: [],
      upload: 'none',
      visible: false
    };
    this.inputElement = '';
    this.handleOnDropFile = this.handleOnDropFile.bind(this);
    this.handleTriggerFileUpload = this.handleTriggerFileUpload.bind(this);
    this.updateDocumentOrder = this.updateDocumentOrder.bind(this);
    this.handleCaption = this.handleCaption.bind(this);
    this.handleSortable = this.handleSortable.bind(this);
    this.handleInputElement = this.handleInputElement.bind(this);
    this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  simpleList = null;
  /*
  On button click, trigger input file to open
  */
  handleTriggerFileUpload() {
    this.inputElement.click();
  }

  componentDidMount() {
    this.setVisibility(this.props);
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
  /*
  Handle file validation
  */
  handleOnDropFile(e) {
    this.setState({
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      visible: true
    });
    const formData = new FormData();
    if (this.props.actionVideos && this.props.actionVideos.length >= 1) {
      return;
    }
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
        _this.setState({notAcceptedFileType: newArray});
        success = false;
        continue;
      }
      console.log('Extension', this.hasExtension(f.name));
      // Check for file size
      if (f.size > appConstants.actionVideos.size) {
        const newArray = _this.state.notAcceptedFileSize.slice();
        newArray.push(f.name);
        _this.setState({notAcceptedFileSize: newArray});
        success = false;
        continue;
      }
      // Console.log('f_name', f);
      _this.setState({files: _this.state.files.concat(f.name)});
      const newArray = _this.props.newActionVideos;
      newArray.push(f);
      this.props.setVideos(newArray);
      formData.append('actionVideos', f);
      //   Const reader = new FileReader();
      // Read the video via FileReader API and save video result in state.
      // reader.onload = (() => {
      //   return e => {
      //     const index = _this.props.newActionVideos.findIndex(i => i.video === e.target.result);
      //     if (index === -1) {
      //       const newArray = _this.props.newActionVideos.slice();
      //       newArray.push({
      //         id: uuid(),
      //         name: f.name,
      //         video: e.target.result,
      //         caption: ''
      //       });
      //       this.props.setVideos(newArray);
      //       // _this.setState({pictures: newArray});
      //     } else {
      //       /*
      //         Const newArray = _this.state.pictures.slice();
      //         const video = _this.state.pictures[index];
      //         newArray.push(video);
      //         this.props.setVideos(newArray);
      // 				_this.setState({pictures: newArray});
      //       */
      //     }
      //   };
      // })(f);
      // reader.readAsDataURL(f);
    }
    if (this.props.newActionVideos && this.props.newActionVideos.length > 0) {
      this.props.uploadActionVideos(formData, {profileID: this.props.profile.data.profile.id, sportID: this.props.sport.id});
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
    this.props.deleteActionVideo({profileID: this.props.profile.data.profile.id, sportID: this.props.sport.id, videoID: e.currentTarget.getAttribute('value')});
  }

  /*
	 Check if any errors && render
	 */
  renderErrors() {
    let notAccepted = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map(error => {
        return (
          <div key={uuid()} className={'errorMessage' + this.props.errorClass} style={this.props.errorStyle}>
            * {error} {this.props.fileTypeError}
          </div>
        );
      });
    }
    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map(error => {
        return (
          <div key={uuid()} className={'errorMessage' + this.props.errorClass} style={this.props.errorStyle}>
            * {error} {this.props.fileSizeError}
          </div>
        );
      });
    }
    return notAccepted;
  }

  updateDocumentOrder(/* Items */) {
    /*
      Console.log(items);
	    console.log(i.el.childNodes);
      i.el.childNodes.forEach((div, i1) => {
      console.log('div1_0', div);
	  	console.log('div1_1', div.childNodes);
	  	div.childNodes.forEach((div2, i2) => {
      console.log('div2', div2);
	  		div2.childNodes.forEach((div3, i3) => {
	  			if (!i3) {
	  				return;
	  			}
	  			//console.log('div3', div3, 'i3', i3);
	  			div3.childNodes.forEach((div4, i4) => {
	  				//console.log('div4', div4, 'i4', i4);
	  				div4.childNodes.forEach((element, i5) => {
	  					if (i5) {
	  						return;
	  					}
	  					//console.log('element', element, 'i5', i5);
	  				});
	  				if (i4) {
	  					console.log('caption', div4.value);
	  				}
	  			})
	  		})
	  	});
	  	/* div.forEach((li, i2) => {
	  		console.log('li', li);
	  	}); */
    // const div2 = div1.childNodes[1];
    // const caption = div2.childNodes[1];
    /* }); */
    // This.props.onChange(items);
    /* Console.log('items', items); */
  }
  componentDidUpdate() {
    /* Const list = this.simpleList ? Object.assign([], this.simpleList) : [];
		  const array = [];
		  for (let i = 0; i < list.length; i++) {
			// const index = list.
			console.log('list', list, 'i', i, 'list[i]', list[i], 'list[i].props.name', list[i].props.name);
			array.concat(list[i] ? list[i].props.name : '');
		}
		console.log('array', array); */
    /* console.log('changed'); */
    // Console.log('this.simpleList', this.simpleList);
  }
  handleSortable(simpleList) {
    this.simpleList = simpleList;
  }
  /*
  Render preview videos
  */
  renderPreview() {
    this.simpleList = this.renderPreviewPictures();
    return (
      this.simpleList ? this.simpleList : []
    );
  }

  renderPreviewPictures() {
    return (
      this.props.actionVideos.videos.map((video, index) => {
        return (
          <div key={index} className="cl-sd-videoOuter">
            <video width="100%" autoPlay loop muted controls>
              <source src={this.props.actionVideos.baseUrl + video.video} type="video/mp4"/>
              <p>Your browser does not support HTML5 video.</p>
            </video>
            <a value={video.video} onClick={this.handleRemoveVideo} className="cross">
              <svg className="cl-icon-close-blue" xmlns="http://www.w3.org/2000/svg" viewBox="-698 -5236 25 25">
                <g transform="translate(-2336 -6489)">
                  <g data-name="Ellipse 39" className="cl-icon-close-blue-1" transform="translate(1638 1253)">
                    <circle className="cl-icon-close-blue-3" cx="12.5" cy="12.5" r="12.5"/>
                    <circle className="cl-icon-close-blue-4" cx="12.5" cy="12.5" r={12}/>
                  </g>
                  <g idata-name="Group 2729" transform="translate(-163 31)">
                    <line idata-name="Line 230" className="cl-icon-close-blue-2" x2={11} y2={11} transform="translate(1808 1229)"/>
                    <line data-name="Line 231" className="cl-icon-close-blue-2" x1={11} y2={11} transform="translate(1808 1229)"/>
                  </g>
                </g>
              </svg>
            </a>

            <div className="field-holder" >
              <input
                type="text"
                className="uk-form-control"
                placeholder={this.props.p.t('UploadVideo.captionText')}
                name={index}
                value={video.caption_en}
                onChange={this.handleCaption}
              />
            </div>
          </div>
        );
      })
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
    this.props.postActionVideos(this.props.actionVideos, {profileID: this.props.profile.data.profile.id, sportID: this.props.sport.id});
  }
  handleClose() {
    this.setState({visible: false});
  }
  render() {
    return (

      <div>
        <div className="uploadAcvideo uploadPhotoDiv ">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
              <svg className="cl-icon-upload-video" xmlns="http://www.w3.org/2000/svg" viewBox="-10220 4405 90 90">
                <g transform="translate(-10220 4405)">
                  <g>
                    <g>
                      <circle data-name="Ellipse 36" className="cl-icon-upload-video-1" cx={45} cy={45} r={45}/>
                      <circle data-name="Ellipse 37" className="cl-icon-upload-video-2" cx="44.5" cy="44.5" r="44.5" transform="translate(0.5 0.5)"/>
                    </g>
                  </g>
                  <g transform="translate(15 29)">
                    <path className="cl-icon-upload-video-3" d="M40.021,21.418V11.327L55.176,2.715V29.628Z"/>
                    <rect className="cl-icon-upload-video-2" width="39.181" height={31} rx={10} transform="translate(0.5 0.5)"/>
                  </g>
                  <g>
                    <rect data-name="Rectangle 69" className="cl-icon-upload-video-4" width={3} height={10} rx="1.5" transform="translate(19 40)"/>
                    <rect data-name="Rectangle 70" className="cl-icon-upload-video-5" width={2} height={9} rx={1} transform="translate(19.5 40.5)"/>
                  </g>
                  <path className="cl-icon-upload-video-6" d="M70.47,31.819l.067,26.521-3.962-1.7-.047-23Z"/>
                </g>
              </svg>
              <div className="uploadPhoto">
                <a onClick={this.handleTriggerFileUpload} className="uploadPhoto">{this.props.p.t('UploadVideo.title')} </a>
              </div>
            </div>
            <div className="uk-width-xlarge-2-3 uk-width-large-2-3 uk-width-medium-2-3  uk-width-small-1-1">
              <div className="photoDes">
                <p>{this.props.p.t('UploadVideo.message')}</p>
              </div>
            </div>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div id="my-id4" className="uk-offcanvas">
                <div className="uk-offcanvas-bar uk-offcanvas-bar-flip">
                  <div className="exampleInfo">
                    <div className="expHeading">
                      <h2 className>Listing heading</h2>
                      <a className="close uk-offcanvas-close uk-close uk-icon"/>
                    </div>
                    <div className="expcontent">
                      <h5>Example 1:</h5>
                      <p>Lorem ipsum laborum.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="imageSpecification" style={{display: this.state.visible ? 'block' : 'none'}}>
          <a onClick={this.handleClose} className="cross holder-cross"/>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
              <div className="crop">
                {/*  <p>Plugins Comes here</p> */}
                {this.renderPreview()}
                <input
                  ref={this.handleInputElement}
                  type="file"
                  style={{display: 'none'}}
                  name={this.props.name}
                  onChange={this.handleOnDropFile}
                  accept={this.props.accept}
                  className={this.props.className}
                />
              </div>
            </div>
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1  imageSpecificationright">
              {/* <h2>Crop &amp; adjust your profile image</h2> */}
              <div className="field-holder">
                <h5>{this.props.p.t('UploadVideo.videoSpecifications')}</h5>
                <p>{this.props.p.t('UploadVideo.maxFileSize')}: <span>{appConstants.actionVideos.sizeInMB}mb</span></p>
                <p>{this.props.p.t('UploadVideo.supportedFiles')}: <span>{appConstants.actionVideos.extensions}</span></p>
                {/*  <div className="bckprogress mt20">
                  <div className="progress"/>
                </div> */}
                <span className="error-text">Error message comes here....</span>
              </div>
              <div className="savecancelholder">
                <div className="uk-grid">
                  <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-2">
                    <a style={{display: this.state.upload}} className="save" onClick={this.handleUpdate}>{this.props.p.t('UploadVideo.upload')}</a>
                  </div>
                  <div className="uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-2 uk-text-right">
                    <a className="cancel">cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      style: PropTypes.object,
      className: PropTypes.string,
      onChange: PropTypes.func,
      /* WithPreview: PropTypes.bool, */
      accept: PropTypes.string,
      name: PropTypes.string,
      withLabel: PropTypes.bool,
      label: PropTypes.string,
      labelStyles: PropTypes.object,
      labelClass: PropTypes.string,
      imgExtension: PropTypes.array,
      maxFileSize: PropTypes.number,
      fileSizeError: PropTypes.string,
      fileTypeError: PropTypes.string,
      errorClass: PropTypes.string,
      errorStyle: PropTypes.object,
      setVideos: PropTypes.func,
      withIcon: PropTypes.bool,
      updateVideo: PropTypes.func,
      removeVideo: PropTypes.func,
      newActionVideos: PropTypes.array,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      uploadActionVideos: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      actionVideos: PropTypes.object,
      deleteActionVideo: PropTypes.func.isRequired,
      postActionVideos: PropTypes.func.isRequired
    };
  }
}

UploadClass.defaultProps = {
  className: '',
  onChange: () => {},
  setVideos: () => {},
  withIcon: false,
  updateVideo: () => {},
  removeVideo: () => {},
  newActionVideos: [],
  accept: 'accept=video/*',
  name: '',
  withLabel: true,
  label: 'Max file size: 15mb, accepted: mp4',
  labelStyles: {},
  labelClass: '',
  imgExtension: ['.mp4'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension',
  errorClass: '',
  style: {},
  errorStyle: {},
  actionVideos: {videos: []}
};

const mapStateToProps = state => {
  const {newActionVideos, profile, sport, actionVideos} = state;
  return {
    newActionVideos,
    profile,
    sport,
    actionVideos
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

const Upload = connect(mapStateToProps, mapDispatchToProps)(UploadClass);
export default translate(Upload);

import React from 'react';
import PropTypes from 'prop-types';
import '../../../../common/Upload/index.css';

import uuid from '../../../../../utils/uuid';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import appConstants from '../../../../../constants/appConstants';
import {
  setImages,
  addImages,
  removeImage,
  clearImages,
  updateImage,
  uploadActionImages,
  deleteActionImage,
  updateActionPicture,
  postActionImages
} from '../../../../../actions';
import {notNull} from '../../../../../validators/common/util';
import {PENDING} from '../../../../../constants/ActionTypes';
import {ClipLoader} from 'react-spinners';

class ActionPhotos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      notAcceptedProfilePictureDimensions: [],
      files: [],
      visible: false,
      expanded: true
    };
    this.inputElement = '';
    this.handleOnDropFile = this.handleOnDropFile.bind(this);
    this.handleTriggerFileUpload = this.handleTriggerFileUpload.bind(this);
    this.handleCaption = this.handleCaption.bind(this);
    this.handleSortable = this.handleSortable.bind(this);
    this.handleInputElement = this.handleInputElement.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.setExpanded = this.setExpanded.bind(this);
    this.handleToggleExpand = this.handleToggleExpand.bind(this);
    this.renderPreviewPictures = this.renderPreviewPictures.bind(this);
    this.renderPictures = this.renderPictures.bind(this);
    this.renderPicturePreview = this.renderPicturePreview.bind(this);
    this.renderPictureMap = this.renderPictureMap.bind(this);
    this.handleCaptionOnBlur = this.handleCaptionOnBlur.bind(this);
  }
  simpleList = null;
  /*
  On button click, trigger input file to open
  */
  handleTriggerFileUpload() {
    this.inputElement.click();
  }

  uploadImages(formData) {
    console.log('New Action Pictures', formData);
    if (this.props.newActionImages) {
      this.props.uploadActionImages(formData, {profileID: this.props.profile.data.profile.id, sportID: this.props.sport.id});
    }
  }

  getDimensions(picture) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        resolve({
          width,
          height
        });
      };
      img.onerror = () => resolve({
        width: 0,
        height: 0
      });
      img.src = picture;
    });
  }
  handleUpload() {
    const {profile, sport} = this.props;
    this.props.postActionImages(this.props.actionPictures, {profileID: profile.data.profile.id, sportID: sport.id});
  }
  /*
  Handle file validation
  */
  handleOnDropFile(e) {
    this.setState({notAcceptedFileType: [],
      notAcceptedFileSize: [],
      notAcceptedProfilePictureDimensions: [],
      visible: true
    });
    const formData = new FormData();

    const files = e.target.files;
    let filesLength = files.length;
    if (filesLength + this.props.actionPictures.images.length > 10) {
      console.log('Maximum Images can be uploaded is 10');
      return;
    }
    const _this = this;
    let success = true;
    // If callback giving, fire.
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(files);
    }
    // Iterate over all uploaded files
    for (let i = 0; i < files.length && i < 10; i++) {
      const f = files[i];
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        const newArray = _this.state.notAcceptedFileType.slice();
        newArray.push(f.name);
        _this.setState({notAcceptedFileType: newArray});
        filesLength -= 1;
        success = false;
        continue;
      }
      // Check for file size
      if (f.size > appConstants.actionPicture.size) {
        const newArray = _this.state.notAcceptedFileSize.slice();
        newArray.push(f.name);
        _this.setState({notAcceptedFileSize: newArray});
        filesLength -= 1;
        success = false;
        continue;
      }

      _this.setState({files: _this.state.files.concat(f.name)});
      const reader = new FileReader();
      //    Read the image via FileReader API and save image result in state.
      reader.onload = (() => {
        return e => {
          const image = e.target.result;
          this.getDimensions(image)
            .then(dimensions => {
            // Console.log('result', dimensions);
              const {width, height} = dimensions;
              console.log('Width', width, 'Height', height);
              if (width < appConstants.actionPicture.dimensions.width || height < appConstants.actionPicture.dimensions.height) {
                const newProfilePictureArray = _this.state.notAcceptedProfilePictureDimensions.slice();
                newProfilePictureArray.push(f.name);
                this.setState({notAcceptedProfilePictureDimensions: newProfilePictureArray});
                filesLength -= 1;
              } else {
                const newArray = _this.props.newActionImages;
                newArray.push(f);
                formData.append('actionImages[]', f);
                this.props.setImages(newArray);
                filesLength -= 1;
              }
              console.log('Length', filesLength);
              if (filesLength === 0) {
                this.uploadImages(formData);
              }
            })
            .catch(error => {
              console.log('error', error);
            });
        };
      })(f);
      reader.readAsDataURL(f);
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
    return (new RegExp('(' + appConstants.actionPicture.extensions.join('|').replace(/\./ig, '\\.') + ')$')).test(fileName) ||
    (new RegExp('(' + appConstants.actionPicture.extensions.join('|').replace(/\./ig, '\\.') + ')$')).test(fileName.toLowerCase());
  }

  /*
  Remove the image from state
  */
  handleRemoveImage(e) {
    this.props.deleteActionImage({profileID: this.props.profile.data.profile.id, sportID: this.props.sport.id, pictureID: e.currentTarget.getAttribute('value')});
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
    if (this.state.notAcceptedProfilePictureDimensions.length > 0) {
      notAccepted = this.state.notAcceptedProfilePictureDimensions.map(error => {
        return (
          <div key={uuid()} className={'errorMessage' + this.props.errorClass} style={this.props.errorStyle}>
            * {error} {this.props.p.t('Upload.diemesion')} {appConstants.actionPicture.dimensions.width} x {appConstants.actionPicture.dimensions.height} {this.props.p.t('Upload.px')}
          </div>
        );
      });
    }

    if (notAccepted && notAccepted.length) {
      this.setState({
        expanded: true
      });
    }

    return notAccepted;
  }

  componentDidMount() {
    this.setVisibility(this.props);
    this.setExpanded(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setVisibility(nextProps);
    this.setExpanded(nextProps);
  }
  setExpanded(nextProps) {
    if (!nextProps.actionPictures || !nextProps.actionPictures.images || !nextProps.actionPictures.images.length) {
      this.setState({
        expanded: true
      });
    }
  }
  setVisibility(nextProps) {
    if (nextProps.actionPictures && nextProps.actionPictures.images && nextProps.actionPictures.images.length && this.state.visible === false) {
      this.setState({
        visible: true
      });
    }
  }
  handleSortable(simpleList) {
    this.simpleList = simpleList;
  }
  /*
  Render preview images
  */
  renderPreview() {
    this.simpleList = this.renderPreviewPictures();
    return (
      this.simpleList ? this.simpleList : []
    );
  }

  renderPreviewPictures(picture, index) {
    return (
      <div key={index} className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-1">
        <div className="albumImage">
          <img src={this.props.actionPictures.baseUrl + picture.image}/>
          <a value={picture.image} onClick={this.handleRemoveImage} className="cross">
            <svg className="cl-icon-close-blue" xmlns="http://www.w3.org/2000/svg" viewBox="-698 -5236 25 25">
              <g transform="translate(-2336 -6489)">
                <g data-name="Ellipse 39" className="cl-icon-close-blue-1" transform="translate(1638 1253)">
                  <circle className="cl-icon-close-blue-3" cx="12.5" cy="12.5" r="12.5"/>
                  <circle className="cl-icon-close-blue-4" cx="12.5" cy="12.5" r="12"/>
                </g>
                <g idata-name="Group 2729" transform="translate(-163 31)">
                  <line idata-name="Line 230" className="cl-icon-close-blue-2" x2="11" y2="11" transform="translate(1808 1229)"/>
                  <line data-name="Line 231" className="cl-icon-close-blue-2" x1="11" y2="11" transform="translate(1808 1229)"/>
                </g>
              </g>
            </svg>
          </a>
        </div>
        <input
          type="text"
          className="uk-form-control"
          placeholder={this.props.p.t('Upload.captionText')}
          id={picture.image}
          name={index}
          value={picture.caption_en ? picture.caption_en : ''}
          onChange={this.handleCaption}
          onBlur={this.handleCaptionOnBlur}
        />
      </div>
    );
  }

  handleCaption(e) {
    const index = e.target.name;
    const value = e.target.value;
    /* Console.log('index', e.target.name, 'value', e.target.value); */
    this.props.updateActionPicture({
      caption: value
    }, index);
  }
  handleInputElement(input) {
    this.inputElement = input;
  }
  handleVisibility() {
    this.setState({
      visible: false
    });
  }

  handleToggleExpand() {
    const {expanded} = this.state;
    this.setState({
      expanded: !expanded
    });
  }

  renderPictures() {
    const {images} = this.props.actionPictures;
    const imagesArray = images.map(this.renderPictureMap);
    const pictures = [];
    for (let i = 0; i < imagesArray.length; i++) {
      if (i % 3 === 0) {
        pictures.push(
          (
            <div className="uk-grid">
              {notNull(imagesArray[i]) ? imagesArray[i] : null}
              {notNull(imagesArray[i + 1]) ? imagesArray[i + 1] : null}
              {notNull(imagesArray[i + 2]) ? imagesArray[i + 2] : null}
            </div>
          )
        );
      }
    }
    return pictures;
  }

  renderPictureMap(picture, index) {
    return this.renderPicturePreview(picture, index);
  }

  renderPicturePreview(picture, index) {
    return (
      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
        <div className="albumImage">
          <img src={this.props.actionPictures.baseUrl + picture.image}/>
          <a value={picture.image} onClick={this.handleRemoveImage} className="cross">
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
        </div>
        <input
          type="text"
          className="uk-form-control"
          placeholder={this.props.p.t('Upload.captionText')}
          id={picture.image}
          name={index}
          value={picture.caption_en ? picture.caption_en : ''}
          onChange={this.handleCaption}
          onBlur={this.handleCaptionOnBlur}
        />
      </div>
    );
  }

  renderRow(row) {
    return row;
  }

  handleCaptionOnBlur() {
    this.handleUpload();
  }

  render() {
    const {status, uploadActionPictureStatus, submit, valid} = this.props;
    const loading = uploadActionPictureStatus.status === PENDING;
    return (
      <li className={status}>

        <div className="cl-sd-uploadphtBottom cl-sd-uploadphtTop"/>
        <div className="field-holder">

          <div className="cl-sd-actionPhoto">
            {this.renderPictures().map(this.renderRow)}
            <span>
              {this.renderErrors()}
            </span>
            {
              submit === true && valid === false && (
                <span>{this.props.p.t('Upload.validation_messages.photos')}</span>
              )
            }
          </div>
        </div>

        <div className="cl-sd-uploadphtBottom">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
              <input
                ref={this.handleInputElement}
                accept={this.props.accept}
                className={this.props.className}
                multiple="multiple"
                name={this.props.name}
                onChange={this.handleOnDropFile}
                style={{display: 'none'}}
                type="file"
              />

              <label htmlFor="photoUploadBtn1" onClick={this.handleTriggerFileUpload}>
                {this.props.p.t('Upload.title')}
              </label>

            </div>
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
              {/* <div className="cl-sd-moreLink">
                <input style={{display: 'none'}} type="file"/>
                <label htmlFor="photoUpload" onClick={this.handleUpload}>{p.t('ProfilePicture.save')}</label>
              </div> */}
            </div>
          </div>
        </div>
        {loading && (
          <div className="overlayLoader">
            <ClipLoader loading={loading} size={30}/>
          </div>
        )
        }
      </li>

    );
  }
  static get propTypes() {
    return {
      className: PropTypes.string,
      onChange: PropTypes.func,
      /* WithPreview: PropTypes.bool, */
      accept: PropTypes.string,
      status: PropTypes.string,
      name: PropTypes.string,
      withLabel: PropTypes.bool,
      label: PropTypes.string,
      labelStyles: PropTypes.object,
      labelClass: PropTypes.string,
      fileSizeError: PropTypes.string,
      fileTypeError: PropTypes.string,
      errorClass: PropTypes.string,
      errorStyle: PropTypes.object,
      setImages: PropTypes.func,
      withIcon: PropTypes.bool,
      submit: PropTypes.bool,
      valid: PropTypes.bool,
      newActionImages: PropTypes.array,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profile: PropTypes.object.isRequired,
      uploadActionImages: PropTypes.func.isRequired,
      actionPictures: PropTypes.object,
      uploadActionPictureStatus: PropTypes.object,
      deleteActionImage: PropTypes.func.isRequired,
      updateActionPicture: PropTypes.func.isRequired,
      postActionImages: PropTypes.func.isRequired,
      sport: PropTypes.object.isRequired
    };
  }
}

ActionPhotos.defaultProps = {
  className: '',
  onChange: () => {},
  setImages: () => {},
  withIcon: false,
  newActionImages: [],
  /* WithPreview: false, */
  accept: 'accept=image/*',
  name: '',
  /* WithIcon: true, */
  withLabel: true,
  label: 'Max file size: 2Mb, accepted: jpg',
  labelStyles: {},
  submit: false,
  valid: false,
  labelClass: '',
  fileSizeError: ' file size is larger than ' + (appConstants.actionPicture.size / 1000000) + 'Mb',
  fileTypeError: ' is not supported file extension',
  errorClass: '',
  status: '',
  errorStyle: {},
  actionPictures: {images: []},
  uploadActionPictureStatus: {status: null}
};

const mapStateToProps = state => {
  const {newActionImages, uploadActionPictureStatus, profile, actionPictures, sspValidation, sport} = state;
  return {
    newActionImages,
    profile,
    actionPictures,
    sspValidation,
    uploadActionPictureStatus,
    sport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addImages: images => dispatch(addImages(images)),
    removeImage: index => dispatch(removeImage(index)),
    setImages: images => dispatch(setImages(images)),
    updateImage: (image, index) => dispatch(updateImage(image, index)),
    clearImages: () => dispatch(clearImages()),
    uploadActionImages: (formData, params) => dispatch(uploadActionImages(formData, params)),
    deleteActionImage: params => dispatch(deleteActionImage(params)),
    updateActionPicture: (newValue, id) => dispatch(updateActionPicture(newValue, id)),
    postActionImages: (data, params) => dispatch(postActionImages(data, params))
  };
};

const Upload = connect(mapStateToProps, mapDispatchToProps)(ActionPhotos);
export default translate(Upload);
/* eslint react/no-deprecated: 0 */

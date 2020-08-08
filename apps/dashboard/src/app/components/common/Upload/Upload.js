import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

import uuid from '../../../utils/uuid';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import appConstants from '../../../constants/appConstants';
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
} from '../../../actions';
import {REJECTED, FULFILLED} from '../../../constants/ActionTypes';

class UploadClass extends React.PureComponent {
  constructor(props) {
    super(props);
    const {actionPictures} = props;
    this.state = {
      pictures: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      notAcceptedProfilePictureDimensions: [],
      files: [],
      visible: actionPictures.images.length >= 1,
      expanded: actionPictures.images.length >= 1,
      error: true
    };
    this.inputElement = '';
    this.handleOnDropFile = this.handleOnDropFile.bind(this);
    this.handleTriggerFileUpload = this.handleTriggerFileUpload.bind(this);
    this.updateDocumentOrder = this.updateDocumentOrder.bind(this);
    this.handleCaption = this.handleCaption.bind(this);
    this.handleSortable = this.handleSortable.bind(this);
    this.handleInputElement = this.handleInputElement.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.handleToggleExpand = this.handleToggleExpand.bind(this);
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
    this.props.postActionImages(this.props.actionPictures, {profileID: this.props.profile.data.profile.id, sportID: this.props.sport.id});
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
    // Const index = this.props.newActionImages.findIndex(i => i.id === e.currentTarget.getAttribute('value'));
    // this.props.removeImage(index);
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
  componentDidMount() {
    this.setVisibility(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setVisibility(nextProps);
  }
  setVisibility(nextProps) {
    if (nextProps.actionPictures && nextProps.actionPictures.images && nextProps.actionPictures.images.length && this.state.visible === false && this.state.expanded === false) {
      this.setState({
        visible: true,
        expanded: true
      });
    }
    if (nextProps.uploadActionPictureStatus && nextProps.uploadActionPictureStatus.status && nextProps.uploadActionPictureStatus.status === FULFILLED) {
      this.setState({
        expanded: true
      });
    }
    if (nextProps.uploadActionPictureStatus && nextProps.uploadActionPictureStatus.status && nextProps.uploadActionPictureStatus.status === REJECTED) {
      this.setState({
        error: true
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

  renderPreviewPictures() {
    return (
      this.props.actionPictures.images.map((picture, index) => {
        return (
          <div key={picture.image} className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
            <div className="albumImage">
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
              <img src={this.props.actionPictures.baseUrl + picture.image}/>
            </div>
            <div className="field-holder">
              <input
                type="text"
                className="uk-form-control"
                placeholder={this.props.p.t('Upload.captionText')}
                id={picture.image}
                name={index}
                value={picture.caption_en ? picture.caption_en : ''}
                onChange={this.handleCaption}
              />
              <span className="error-text">Sample error message goes here</span>
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
      expanded: !expanded,
      error: false
    }, this.forceUpdate());
  }

  render() {
    const uploadDivClassName = 'uploadPhotoDiv ' + ((this.state.visible) ? 'uploadPhotoDivplus' : '');
    const {error} = this.state;
    const isRejected = this.props.uploadActionPictureStatus.status === REJECTED && error;
    return (

      <div>
        <div className={uploadDivClassName}>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
              <svg className="cl-icon-photo-upload" xmlns="http://www.w3.org/2000/svg" viewBox="-10221.5 3784.5 91 91">
                <g data-name="Group 112" transform="translate(-12327.5 -2592)">
                  <circle data-name="Ellipse 32" className="cl-icon-photo-upload-1" cx={45} cy={45} r={45} transform="translate(2106.5 6377)"/>
                  <g data-name="Group 111" transform="translate(-101.5)">
                    <path data-name="Intersection 1" className="cl-icon-photo-upload-1" d="M14.351,77.949c.651-3.634,1.8-7.507,3.809-9.549,3.733-3.786,12.533-6.224,20.082-7.147a23.061,23.061,0,0,0,.688-3.459,18.426,18.426,0,0,0-.559-2.957C32.3,52.2,26.108,45.426,26.108,37.471a17.477,17.477,0,0,1,.4-3.7c.187-4.974,2.78-7.276,5.6-10.65.105-.144.134.073.167.291a.7.7,0,0,0,.095.324q.232-.213.47-.417c.263-.262.535-.511.81-.755.069-.06.134-.125.2-.183.347-.3.707-.574,1.075-.839.062-.046.124-.095.187-.138.383-.268.775-.513,1.174-.743l.157-.092q.625-.348,1.277-.635c.039-.017.078-.035.118-.05a13.668,13.668,0,0,1,1.373-.513,14.047,14.047,0,0,1,1.54-.392,14.319,14.319,0,0,1,1.582-.217c.369-.03.733-.068,1.1-.068,7.621,0,15.135,4.615,17.321,12.526a17.668,17.668,0,0,1,1.149,6.248c0,7.959-6.2,14.732-12.276,17.374a16.949,16.949,0,0,0-.6,2.95,19.046,19.046,0,0,0,.68,3.232c7.789.664,18.57,3.057,22.007,7.374,1.768,2.219,2.891,6.167,3.592,9.863a45,45,0,0,1-60.957-.314Z" transform="translate(2208.149 6377)"/>
                    <path className="cl-icon-photo-upload-2" d="M47.883-16.161c-.065,5.244-2.719,7.576-5.608,11.036-.208.285-.117-.848-.361-.589-.067.07-.131.148-.2.218-.315.327-.645.631-.981.929-.069.06-.134.125-.2.183-.347.3-.707.574-1.076.839-.061.046-.124.094-.187.138-.383.268-.775.512-1.175.743l-.156.092q-.625.348-1.276.635c-.039.017-.079.035-.118.051a13.884,13.884,0,0,1-1.373.512,13.952,13.952,0,0,1-1.54.392,14.069,14.069,0,0,1-1.582.217c-.37.03-.733.069-1.1.069-8.9,0-17.65-6.291-17.947-16.774l9.339,9.385Z" transform="translate(2282.883 6395) rotate(180)"/>
                    <path className="cl-icon-photo-upload-3" d="M19.853,44.054s-3.431,9.881,10.328,9.881,11.156-9.881,11.156-9.881" transform="translate(2222.027 6395)"/>
                  </g>
                </g>
              </svg>
              <div className="uploadPhoto">
                <a onClick={this.handleTriggerFileUpload} className>{this.props.p.t('Upload.title')}
                  <span>
                    <svg className="cl-icon-star-hover" xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                      <path data-name="Path 40" className="cl-icon-star-hover-1" d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z" transform="translate(-6835.539 -1121)"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="uk-width-xlarge-2-3 uk-width-large-2-3 uk-width-medium-2-3  uk-width-small-1-1">
              <div className={this.props.sspValidation.media.actionPhotos === false && this.props.sspValidation.media.submitted ? 'field-holder error' : 'field-holder'}>
                <div className="photoDes">
                  <p>{this.props.p.t('Upload.message')}</p>
                </div>
                <span className="error-text">{this.props.p.t('PhotosAndVideos.validation_messages.actionPicture')}</span>
              </div>
            </div>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div id="my-id1" className="uk-offcanvas">
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

        <div className={'imageSpecification imageSpecification-full ' + ((this.state.expanded || isRejected) ? 'upload-section-plus' : '')} style={{display: this.state.visible ? 'block' : 'none'}}>
          {/*  <a href="#!" class="cross holder-cross"></a> */}
          <div className="imageSpeciuploadtopsec" style={{display: (this.state.expanded || isRejected) ? 'none' : 'block'}}>
            <h2>{this.props.p.t('PhotosAndVideos.youHaveUploadedActionImages', {uploaded: this.props.actionPictures.images.length, total: appConstants.actionPicture.maxPictures})}</h2>
          </div>
          <div className="upload-section" >
            <button className="upload-arrow" onClick={this.handleToggleExpand}/>
          </div>
          <div className="imageSpeciuploadbottomsec" style={{display: (this.state.expanded || isRejected) ? 'block' : 'none'}}>
            <a onClick={this.handleTriggerFileUpload} className="upload-btn">{this.props.p.t('Upload.uploadMorePhotos')}</a>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
                <h5>{this.props.p.t('Upload.imageSpecifications')}</h5>
                <p>{this.props.p.t('Upload.maxFileSize')}: <span>{appConstants.actionPicture.sizeInMB}mb</span></p>
                <p>{this.props.p.t('Upload.supportedFiles')}: <span>{appConstants.actionPicture.extensionsDisplay}</span></p>
                <p>{this.props.p.t('Upload.minResolution')}: <span>{this.props.p.t('Upload.width')} {appConstants.actionPicture.dimensions.width}px</span> by <span>{this.props.p.t('Upload.height')} {appConstants.actionPicture.dimensions.height}px</span></p>
              </div>
              <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 "/>
            </div>
            <div className="mt30 mb30"/>

            <div className="fileUploader" style={this.props.style}>
              <div className="fileContainer">
                <div className="errorsContainer">
                  {this.renderErrors()}
                </div>
                <input
                  ref={this.handleInputElement}
                  type="file"
                  name={this.props.name}
                  multiple="multiple"
                  onChange={this.handleOnDropFile}
                  accept={this.props.accept}
                  className={this.props.className}
                />
              </div>
              <div className="uk-grid">
                {this.renderPreview()}
              </div>
            </div>
            
          </div>
          <br/>
          <div>
            <a onClick={this.handleUpload} className="general_btn" style={{color: 'white'}}>{this.props.p.t('Upload.upload')}</a>
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
      fileSizeError: PropTypes.string,
      fileTypeError: PropTypes.string,
      errorClass: PropTypes.string,
      errorStyle: PropTypes.object,
      setImages: PropTypes.func,
      withIcon: PropTypes.bool,
      newActionImages: PropTypes.array,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profile: PropTypes.object.isRequired,
      uploadActionImages: PropTypes.func.isRequired,
      actionPictures: PropTypes.object,
      deleteActionImage: PropTypes.func.isRequired,
      updateActionPicture: PropTypes.func.isRequired,
      uploadActionPictureStatus: PropTypes.isRequired,
      postActionImages: PropTypes.func.isRequired
    };
  }
}

UploadClass.defaultProps = {
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
  label: 'Max file size: 5mb, accepted: jpg',
  labelStyles: {},
  labelClass: '',
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension',
  errorClass: '',
  style: {},
  errorStyle: {},
  actionPictures: {images: []}
};

/* UploadClass.PropTypes = {
  style: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  buttonClassName: PropTypes.object,
  buttonStyles: PropTypes.object,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
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
  setImages: PropTypes.func,
  withIcons: PropTypes.bool,
  updateImage: PropTypes.func
}; */

const mapStateToProps = state => {
  const {newActionImages, profile, actionPictures, sspValidation, sport, uploadActionPictureStatus} = state;
  return {
    newActionImages,
    profile,
    actionPictures,
    sspValidation,
    sport,
    uploadActionPictureStatus
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

const Upload = connect(mapStateToProps, mapDispatchToProps)(UploadClass);
export default translate(Upload);

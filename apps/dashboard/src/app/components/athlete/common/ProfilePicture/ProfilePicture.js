import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import translate from 'redux-polyglot/translate';
import appConstants from '../../../../constants/appConstants';
import {notNull} from '../../../../validators/common/util';
import {
  addAthletePicture,
  clearPicture
} from '../../../../actions';

import {connect} from 'react-redux';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%'
};

/* eslint react/forbid-component-props: 0 */
class ProfilePictureClass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
      notAcceptedProfilePictureFileType: [],
      notAcceptedProfilePictureFileSize: [],
      notAcceptedProfilePictureDimensions: [],
      cropper: 'block',
      save: 'none'
    };
    this.inputProfilePictureElement = '';
    this.handleOnDropProfilePictureFile = this.handleOnDropProfilePictureFile.bind(this);
    // This.onCrop = this.onCrop.bind(this);
    this.handleCropImage = this.handleCropImage.bind(this);
    this.handleTriggerProfilePictureFileUpload = this.handleTriggerProfilePictureFileUpload.bind(this);
    this.handleCropper = this.handleCropper.bind(this);
    this.handleProfilePictureElement = this.handleProfilePictureElement.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /*
  On button click, trigger input file to open
  */
  handleClose() {
    this.setState({save: 'none'});
  }
  handleTriggerProfilePictureFileUpload() {
    /* Console.log('trigger click');
    console.log('this.inputProfilePictureElement', this.inputProfilePictureElement); */
    this.inputProfilePictureElement.click();
    this.setState({
      save: 'block'
    });
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

  /*
	 Handle file validation
	 */
  handleOnDropProfilePictureFile(e) {
    this.setState({
      notAcceptedProfilePictureFileType: [],
      notAcceptedProfilePictureFileSize: [],
      notAcceptedProfilePictureDimensions: [],
      profilePicture: null
    });
    const files = e.target.files;
    const __this = this;
    let success = true;
    // If callback giving, fire.
    /* If (typeof this.props.onChange === "function") {
        this.props.onChange(files);
      } */
    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        const newProfilePictureArray = __this.state.notAcceptedProfilePictureFileType.slice();
        newProfilePictureArray.push(f.name);
        __this.setState({notAcceptedProfilePictureFileType: newProfilePictureArray});
        success = false;
        continue;
      }
      // Check for file size
      if (f.size > appConstants.profilePicture.size) {
        const newProfilePictureArray = __this.state.notAcceptedProfilePictureFileSize.slice();
        newProfilePictureArray.push(f.name);
        __this.setState({notAcceptedProfilePictureFileSize: newProfilePictureArray});
        success = false;
        continue;
      }
      const reader = new FileReader();
      // Read the image via FileReader API and save image result in state.
      reader.onload = (() => {
        return e => {
          if (__this.state.profilePicture !== e.target.result) {
            // Const newArray = _this.state.pictures.slice();
            const image = e.target.result;
            this.getDimensions(image)
              .then(dimensions => {
                // Console.log('result', dimensions);
                const {width, height} = dimensions;
                if (width < appConstants.profilePicture.dimensions.width || height < appConstants.profilePicture.dimensions.height) {
                  const newProfilePictureArray = __this.state.notAcceptedProfilePictureDimensions.slice();
                  newProfilePictureArray.push(f.name);
                  __this.setState({notAcceptedProfilePictureDimensions: newProfilePictureArray});
                  success = false;
                } else {
                  if (typeof this.props.onProfilePictureChange === 'function') {
                    this.props.onProfilePictureChange(image);
                  }
                  __this.setState({profilePicture: image});
                }
              })
              .catch(error => {
                console.log('error', error);
              });
          }
        };
      })(f);
      reader.readAsDataURL(f);
    }
    this.setState({cropper: 'block', save: 'block'});
    if (typeof this.props.onSelect === 'function' && success) {
      this.props.onSelect();
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
    return (new RegExp('(' + appConstants.profilePicture.extensions.join('|').replace(/\./ig, '\\.') + ')$')).test(fileName) ||
      (new RegExp('(' + appConstants.profilePicture.extensions.join('|').replace(/\./ig, '\\.') + ')$')).test(fileName.toLowerCase());
  }

  /*
  Remove the image from state
  */
  /* RemoveImage(picture) {
		console.log('index', this.state.profilePicture.indexOf(picture));
		const index = this.state.profilePicture.indexOf(picture);
		const filteredAry = this.state.profilePicture.filter((e) => e !== picture);
		const files = this.state.files.filter((f, i) => i !== index);
		this.setState({profilePicture: filteredAry, files});
	} */
  /*
  OnCrop(picture) {
      this.setState({
        profilePicture: picture
      }, () => {
        this.forceUpdate();
        console.log('file.width', f.width);
        console.log('file.height', f.height);
        console.log('width', document.getElementById('image').width, 'height', document.getElementById('image').height);
      });

    }
  */
  /*
  Check if any errors && render
  */
  renderErrors() {
    let notAccepted = '';
    if (this.state.notAcceptedProfilePictureFileType.length > 0) {
      notAccepted = this.state.notAcceptedProfilePictureFileType.map((error, index) => {
        const key = error + index;
        return (
          <div key={key} className={'errorMessage' + this.props.errorClass} style={this.props.errorStyle}>
            * {error} {this.props.fileTypeError}
          </div>
        );
      });
    }
    if (this.state.notAcceptedProfilePictureFileSize.length > 0) {
      notAccepted = this.state.notAcceptedProfilePictureFileSize.map((error, index) => {
        const key = error + index;
        return (
          <div key={key} className={'errorMessage' + this.props.errorClass} style={this.props.errorStyle}>
            * {error} {this.props.fileSizeError}
          </div>
        );
      });
    }
    if (this.state.notAcceptedProfilePictureDimensions.length > 0) {
      notAccepted = this.state.notAcceptedProfilePictureDimensions.map((error, index) => {
        const key = error + index;
        return (
          <div key={key} className={'errorMessage' + this.props.errorClass} style={this.props.errorStyle}>
            * {error} {this.props.p.t('ProfilePicture.diemesionError')} {appConstants.profilePicture.dimensions.width} x {appConstants.profilePicture.dimensions.height}{this.props.p.t('ProfilePicture.px')}
          </div>
        );
      });
    }
    return notAccepted;
  }

  /*
  Render preview images
  */
  renderPreview() {
    return (
      <div className="uploadPicturesWrapper">
        <div style={styles}>
          {this.renderPreviewPictures()}
        </div>
      </div>
    );
  }

  handleCropper(cropper) {
    this.cropper = cropper;
  }
  renderPreviewPictures() {
    return (
      <Cropper
        ref={this.handleCropper}
        src={this.state.profilePicture}
        preview=".img-preview"
        style={{display: this.state.cropper}}
        // Cropper.js options
        aspectRatio={1}
        guides={false}
        minCropBoxWidth={appConstants.profilePicture.dimensions.width}
        minCropBoxHeight={appConstants.profilePicture.dimensions.height}
        zoomable={false}
      />
    );
  }

  handleCropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    if (typeof this.props.onSelect === 'function') {
      const canvasElement = this.cropper.getCroppedCanvas();
      canvasElement.toBlob(blob => {
        const profilePicture = new File([blob], 'profile.jpg', {type: blob.type, lastModified: Date.now()});
        console.log('Profile Picture', profilePicture);
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);
        this.props.addAthletePicture(formData, {athleteId: this.props.userProfiles.selectedProfile.id});
      }, 'image/jpeg', 0.95);
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      cropper: 'none',
      save: 'none'
    });
  }
  handleProfilePictureElement(input) {
    this.inputProfilePictureElement = input;
  }
  render() {
    const isProfilePicture = Boolean(this.props.picture && this.props.picture.url);
    const {picture} = this.props;

    const isUpdatedPicture = notNull(picture) && notNull(picture.url) ? !picture.url.includes(appConstants.defaultPicture) : false;
    const ErrorMessages = this.renderErrors();
    const uploadDivClassName = 'uploadPhotoDiv ' + ((this.state.save === 'none') ? '' : 'uploadPhotoDivplus');
    return (

      <div className="uploadPht">
        <div className={uploadDivClassName}>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
              { isProfilePicture ?
                <div className="uploadedAthletePhoto">
                  <img src={this.props.picture.url + '?date=' + (new Date())}/>
                </div> :
                <svg className="cl-icon-photo-upload" xmlns="http://www.w3.org/2000/svg" viewBox="-10221.5 3784.5 91 91">
                  <g data-name="Group 112" transform="translate(-12327.5 -2592)">
                    <circle data-name="Ellipse 32" className="cl-icon-photo-upload-1" cx={45} cy={45} r={45} transform="translate(2106.5 6377)"/>
                    <g data-name="Group 111" transform="translate(-101.5)">
                      <path data-name="Intersection 1" className="cl-icon-photo-upload-1" d="M14.351,77.949c.651-3.634,1.8-7.507,3.809-9.549,3.733-3.786,12.533-6.224,20.082-7.147a23.061,23.061,0,0,0,.688-3.459,18.426,18.426,0,0,0-.559-2.957C32.3,52.2,26.108,45.426,26.108,37.471a17.477,17.477,0,0,1,.4-3.7c.187-4.974,2.78-7.276,5.6-10.65.105-.144.134.073.167.291a.7.7,0,0,0,.095.324q.232-.213.47-.417c.263-.262.535-.511.81-.755.069-.06.134-.125.2-.183.347-.3.707-.574,1.075-.839.062-.046.124-.095.187-.138.383-.268.775-.513,1.174-.743l.157-.092q.625-.348,1.277-.635c.039-.017.078-.035.118-.05a13.668,13.668,0,0,1,1.373-.513,14.047,14.047,0,0,1,1.54-.392,14.319,14.319,0,0,1,1.582-.217c.369-.03.733-.068,1.1-.068,7.621,0,15.135,4.615,17.321,12.526a17.668,17.668,0,0,1,1.149,6.248c0,7.959-6.2,14.732-12.276,17.374a16.949,16.949,0,0,0-.6,2.95,19.046,19.046,0,0,0,.68,3.232c7.789.664,18.57,3.057,22.007,7.374,1.768,2.219,2.891,6.167,3.592,9.863a45,45,0,0,1-60.957-.314Z" transform="translate(2208.149 6377)"/>
                      <path className="cl-icon-photo-upload-2" d="M47.883-16.161c-.065,5.244-2.719,7.576-5.608,11.036-.208.285-.117-.848-.361-.589-.067.07-.131.148-.2.218-.315.327-.645.631-.981.929-.069.06-.134.125-.2.183-.347.3-.707.574-1.076.839-.061.046-.124.094-.187.138-.383.268-.775.512-1.175.743l-.156.092q-.625.348-1.276.635c-.039.017-.079.035-.118.051a13.884,13.884,0,0,1-1.373.512,13.952,13.952,0,0,1-1.54.392,14.069,14.069,0,0,1-1.582.217c-.37.03-.733.069-1.1.069-8.9,0-17.65-6.291-17.947-16.774l9.339,9.385Z" transform="translate(2282.883 6395) rotate(180)"/>
                      <path className="cl-icon-photo-upload-3" d="M19.853,44.054s-3.431,9.881,10.328,9.881,11.156-9.881,11.156-9.881" transform="translate(2222.027 6395)"/>
                    </g>
                  </g>
                </svg> }
              <div className="uploadPhoto">
                <a onClick={this.handleTriggerProfilePictureFileUpload}>
                  {isUpdatedPicture ? this.props.p.t('ProfilePicture.change') + ' ' : this.props.p.t('ProfilePicture.upload') + ' '}
                  {this.props.p.t('ProfilePicture.title')}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="imageSpecification" style={{display: this.state.save}}>
          <a className="cross holder-cross" onClick={this.handleClose}/>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
              <div className="crop" style={this.props.style}>
                <div className="fileUploader">
                  <div className="fileContainer">
                    <div className="errorsContainer">
                      {ErrorMessages}
                    </div>
                    <input
                      ref={this.handleProfilePictureElement}
                      type="file"
                      name={this.props.name}
                      onChange={this.handleOnDropProfilePictureFile}
                      accept={this.props.accept}
                      className={this.props.className}
                    />
                    {this.renderPreview()}
                  </div>
                </div>
              </div>
            </div>

            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 imageSpecificationright">
              <h5>{this.props.p.t('ProfilePicture.cropMessage')}</h5>
              <h5>{this.props.p.t('ProfilePicture.imageSpecifications')}</h5>
              <p>{this.props.p.t('ProfilePicture.maxFileSize')}: <span>{appConstants.profilePicture.sizeInMB}mb</span></p>
              <p>{this.props.p.t('ProfilePicture.supportedFiles')}: <span>{appConstants.profilePicture.extensionsDisplay}</span></p>
              <p>{this.props.p.t('ProfilePicture.minResolution')}: <span>{this.props.p.t('ProfilePicture.width')} {appConstants.profilePicture.dimensions.width}px</span> by <span>{this.props.p.t('ProfilePicture.height')}  {appConstants.profilePicture.dimensions.height}px</span></p>
              <br/>
              <div style={{overflow: 'hidden', marginTop: '10px', backgroundColor: 'transparent', boxShadow: '0px 18px 18px 0px dimgrey', margin: '0 auto', borderRadius: '100px'}} className="uk-width-xlarge--2 uk-width-large-2-2 uk-width-medium-2-2  uk-width-small-2-2 albumImage img-preview"/>

              <div className="savecancelholder">
                <div className="uk-grid">
                  <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-2">
                    <a onClick={this.handleCropImage} className="save">{this.props.p.t('ProfilePicture.save')}</a>
                  </div>
                  <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-text-right uk-width-small-1-2">
                    <a onClick={this.handleClose} className="cancel" >{this.props.p.t('VerifyEmail.cancel')}</a>
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
      onProfilePictureChange: PropTypes.func,
      onSelect: PropTypes.func,
      addAthletePicture: PropTypes.func,
      /* WithPreview: PropTypes.bool, */
      accept: PropTypes.string,
      name: PropTypes.string,
      withIcon: PropTypes.bool,
      withLabel: PropTypes.bool,
      label: PropTypes.string,
      labelStyles: PropTypes.object,
      labelClass: PropTypes.string,
      fileSizeError: PropTypes.string,
      fileTypeError: PropTypes.string,
      errorClass: PropTypes.string,
      errorStyle: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      // Profile: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      picture: PropTypes.object
    };
  }
}

ProfilePictureClass.defaultProps = {
  className: '',
  onProfilePictureChange: () => {},
  onSelect: () => {},
  addAthletePicture: () => {},
  accept: 'accept=image/*',
  name: '',
  withIcon: true,
  withLabel: true,
  label: 'Max file size: 5MB, accepted: jpg png',
  labelStyles: {},
  labelClass: '',
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension',
  errorClass: '',
  style: {},
  errorStyle: {},
  picture: {url: null}
};

ProfilePictureClass.PropTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onProfilePictureChange: PropTypes.func,
  buttonClassName: PropTypes.object,
  buttonStyles: PropTypes.object,
  withPreview: PropTypes.bool,
  profile: PropTypes.object.isRequired,
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
  dimensionsError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object
};
const mapStateToProps = state => {
  const {athlete, userProfiles} = state;
  const {profile, picture} = athlete;
  return {
    profile,
    picture,
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAthletePicture: (formData, params) => dispatch(addAthletePicture(formData, params)),
    clearPicture: () => dispatch(clearPicture())
  };
};

const ProfilePicture = connect(mapStateToProps, mapDispatchToProps)(ProfilePictureClass);
export default translate(ProfilePicture);
/* eslint react/forbid-component-props: 0 */

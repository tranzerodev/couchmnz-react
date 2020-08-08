import React from 'react';
import PropTypes from 'prop-types';
import '../../registration/ProfilePicture/index.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import translate from 'redux-polyglot/translate';
import appConstants from '../../../../../constants/appConstants';
import {ClipLoader} from 'react-spinners';
import {
  addPicture,
  updatePicture,
  clearPicture
} from '../../../../../actions';

import {connect} from 'react-redux';
import {notNull} from '../../../../../validators/common/util';
import {PENDING} from '../../../../../constants/ActionTypes';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%'
};

/* eslint react/forbid-component-props: 0 */
class ProfilePicture extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
      notAcceptedProfilePictureFileType: [],
      notAcceptedProfilePictureFileSize: [],
      notAcceptedProfilePictureDimensions: [],
      cropper: 'none',
      save: false
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
    this.inputProfilePictureElement.click();
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
    this.setState({cropper: 'block', save: true});
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
  Check file extension (onDropFile)
  */
  hasExtension(fileName) {
    return (new RegExp('(' + appConstants.profilePicture.extensions.join('|').replace(/\./ig, '\\.') + ')$')).test(fileName) ||
      (new RegExp('(' + appConstants.profilePicture.extensions.join('|').replace(/\./ig, '\\.') + ')$')).test(fileName.toLowerCase());
  }

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
    const {cropper} = this.state;
    const {picture} = this.props.displayPicture;
    if (cropper === 'none') {
      return (
        <img className="croppedImage" src={picture} alt="Profile"/>
      );
    }
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
        this.props.addPicture(formData, {profileID: this.props.profile.data.profile.id});
      }, 'image/jpeg', 0.95);
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      cropper: 'none',
      save: false
    });
  }
  handleProfilePictureElement(input) {
    this.inputProfilePictureElement = input;
  }
  render() {
    const {p, status, displayPicture, profilePicture} = this.props;
    const isUpdatedPicture = notNull(displayPicture.picture) ? !displayPicture.picture.includes(appConstants.defaultPicture) : false;
    const loading = profilePicture.status === PENDING;
    return (
      <li className={status}>
        <div className="uk-grid">
          <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1">
            <div className="crop">
              <input
                ref={this.handleProfilePictureElement}
                type="file"
                name={this.props.name}
                onChange={this.handleOnDropProfilePictureFile}
                accept={this.props.accept}
                style={{display: 'none'}}
                className={this.props.className}
              />
              {this.renderPreview()}
            </div>
          </div>
          <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-2 uk-width-small-1-1">
            <div className="field-holder error">
              <div className="imageSpecification">
                <h2>{p.t('DashboardProfileMedia.cropAndAdjustYourProfileImage')}</h2>
                <h5>{p.t('DashboardProfileMedia.imageSpec')}</h5>
                <p>{p.t('ProfilePicture.maxFileSize')}: <span>{appConstants.profilePicture.sizeInMB}mb</span></p>
                <p>{p.t('ProfilePicture.supportedFiles')}: <span>{appConstants.profilePicture.extensionsDisplay}</span></p>
                <p>{p.t('ProfilePicture.minResolution')}: <span>{this.props.p.t('ProfilePicture.width')} {appConstants.profilePicture.dimensions.width}px</span> by <span>{this.props.p.t('ProfilePicture.height')}  {appConstants.profilePicture.dimensions.height}px</span></p>
                <a onClick={this.handleTriggerProfilePictureFileUpload} className="cl-sd-uploadBtn">{isUpdatedPicture ? p.t('DashboardProfileMedia.changePhoto') : p.t('DashboardProfileMedia.uploadPhoto')}</a>
              </div>
              <span className="error-text">{this.renderErrors()}</span>
            </div>
          </div>
        </div>
        {(this.state.save) && (
          <div className="cl-sd-uploadphtBottom">
            <a onClick={this.handleCropImage} className="general_btn" >{p.t('ProfilePicture.save')}</a>
          </div>
        )}
        {loading && (
          <div className="overlayLoader">
            <ClipLoader loading={loading} size={30}/>
          </div>
        )
        }
      </li>

    );
  }
}
/* eslint react/forbid-component-props: 0 */

ProfilePicture.defaultProps = {
  className: '',
  status: '',
  onProfilePictureChange: () => {},
  accept: 'accept=image/*',
  name: '',
  withIcon: true,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension',
  errorClass: '',
  errorStyle: {},
  displayPicture: {picture: null},
  profilePicture: {data: {}, status: null}
};

ProfilePicture.propTypes = {
  className: PropTypes.string,
  onProfilePictureChange: PropTypes.func,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  status: PropTypes.string,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  displayPicture: PropTypes.object,
  profilePicture: PropTypes.object,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
const mapStateToProps = state => {
  const {profilePicture, profile, displayPicture, sspValidation} = state;
  return {
    profilePicture,
    profile,
    displayPicture,
    sspValidation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPicture: (formData, params) => dispatch(addPicture(formData, params)),
    updatePicture: picture => dispatch(updatePicture(picture)),
    clearPicture: () => dispatch(clearPicture())
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(ProfilePicture));


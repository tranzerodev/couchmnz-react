import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import ProfilePicture from './ProfilePicture';
import ActionPhotos from './ActionPhotos';
import UploadActionVideo from './UploadActionVideo';
import appConstants from '../../../../../constants/appConstants';
import {notNull} from '../../../../../validators/common/util';
import {DASHBOARD_MANAGE_COMPLETE_SERVICE} from '../../../../../constants/pathConstants';

class DashboardProfileMedia extends Component {
  constructor(props) {
    super(props);
    this.handleNav = this.handleNav.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.handleImageCrop = this.handleImageCrop.bind(this);
    this.state = {
      profile: 'uk-active',
      action: '',
      videos: '',
      submit: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleNav() {
    this.setState({submit: true});
    const {actionPicturesLength} = this.props;
    const {profile, action, videos} = this.state;
    if (notNull(profile)) {
      this.setState({
        profile: '',
        action: 'uk-active',
        videos: '',
        submit: false
      });
    } else if (notNull(action)) {
      if (actionPicturesLength <= 0) {
        return;
      }
      this.setState({
        profile: '',
        action: '',
        videos: 'uk-active',
        submit: false
      });
    } else if (notNull(videos)) {
      this.props.history.push(DASHBOARD_MANAGE_COMPLETE_SERVICE);
    }
  }

  handleTab(e) {
    const value = e.currentTarget.getAttribute('value');
    const profile = value === 'profile' ? 'uk-active' : '';
    const action = value === 'action' ? 'uk-active' : '';
    const videos = value === 'videos' ? 'uk-active' : '';
    this.setState({
      profile,
      action,
      videos
    });
  }

  handleImageCrop() {
    this.setState({
      crop: 'visible'
    });
  }

  render() {
    const {sportActivationStatus, actionPicturesLength} = this.props;
    const {profile, action, videos, submit} = this.state;
    const {p} = this.props;
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
            <div className="uploadPht cl-sd-uploadPht">
              <div className="cl-sd-uploadphtUpper">
                <h1>{p.t('DashboardProfileMedia.photosAndVideos')}</h1>
                <p>{p.t('DashboardProfileMedia.manageProfileMedia')}</p>
                <ul className="cl-sd-tabTitle uk-tab">
                  <li onClick={this.handleTab} value={'profile'} className={profile}><a>{p.t('DashboardProfileMedia.profilePhoto')}</a></li>
                  <li onClick={this.handleTab} value={'action'} className={action}><a>{p.t('DashboardProfileMedia.actionPhotos')}</a></li>
                  <li onClick={this.handleTab} value={'videos'} className={videos}><a>{p.t('DashboardProfileMedia.videos')}</a></li>
                </ul>
              </div>
              <ul id="photo-tab" className="uk-switcher">
                {
                  notNull(profile) &&
                  <ProfilePicture
                    withIcon
                    buttonText={this.props.p.t('PhotosAndVideos.chooseImage')}
                    imgExtension={['.jpg', '.jpeg', '.png']}
                    label={this.props.p.t('PhotosAndVideos.profilePictureLabel')}
                    onSelect={this.handleImageCrop}
                    maxFileSize={5242880}
                    status={profile}
                    dimensionsError={this.props.p.t('PhotosAndVideos.profilePictureDimensionsError')}
                  />
                }
                <ActionPhotos
                  withIcon
                  buttonText={this.props.p.t('PhotosAndVideos.chooseImages')}
                  imgExtension={['.jpg']}
                  label={this.props.p.t('PhotosAndVideos.actionImagesLabel')}
                  status={action}
                  submit={submit}
                  valid={actionPicturesLength > 0}
                  maxFileSize={5242880}
                />

                <UploadActionVideo
                  withIcon
                  imgExtension={['.mp4']}
                  maxFileSize={52428800}
                  buttonText={this.props.p.t('PhotosAndVideos.chooseVideo')}
                  status={videos}
                  label={this.props.p.t('PhotosAndVideos.actionVideoLabel')}
                />
              </ul>
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
            {sportActivationStatus === false &&
            <a className="general_btn" onClick={this.handleNav}>{ p.t('RegistrationNextLink.save_and_continue')}</a> }
          </div>
        </div>
      </div>

    );
  }
}

DashboardProfileMedia.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  sportActivationStatus: PropTypes.bool.isRequired,
  actionPicturesLength: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {currentSport, userProfiles, actionPictures} = state;
  return {
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active),
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active,
    actionPicturesLength: actionPictures.images.length
  };
};

export default connect(mapStateToProps)(translate(DashboardProfileMedia));

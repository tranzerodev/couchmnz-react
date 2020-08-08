import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import ProfilePicture from '../../registration/ProfilePicture';
import Upload from '../../../../common/Upload';
import UploadVideo from '../../../../common/UploadVideo';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import RequiredNotFilledModal from '../RequiredNotFilledModal';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import {REGISTRATION_ISP_PRICING, REGISTRATION_ISP_LISTING} from '../../../../../constants/pathConstants';
import validateMedia from '../../../../../validators/ssp/isp/common/media';

/* Import config from '../../config'; */

class PhotosAndVideos extends Component {
  constructor(props) {
    super(props);
    this.handleVideoToggle = this.handleVideoToggle.bind(this);
    this.handleImageCrop = this.handleImageCrop.bind(this);
    this.onHandleNext = this.onHandleNext.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.state = {
      visible: 'none',
      visibleSpeciality: 'none',
      actionVideo: false,
      actionVideoVisibility: false,
      video: '',
      crop: 'hidden',
      notFilled: [],
      isNotFilledModalOpen: false
    };
  }

  getNotFilled() {
    const {p, actionPictures, displayPicture} = this.props;
    const validation = validateMedia({actionPictures: actionPictures.images, displayPicture: displayPicture.picture});
    const notFilled = [];
    if (validation.displayPicture === false) {
      notFilled.push(p.t('RequiredNotFilledModal.displayPicture'));
    }
    if (validation.actionPictures === false) {
      notFilled.push(p.t('RequiredNotFilledModal.actionPictures'));
    }
    return notFilled;
  }
  handleSubmitForm() {
    const {actionPictures, displayPicture} = this.props;
    const validation = validateMedia({actionPictures: actionPictures.images, displayPicture: displayPicture.picture});
    if (validation.valid) {
      this.onHandleNext();
    } else {
      this.setState({notFilled: this.getNotFilled(), isNotFilledModalOpen: true});
    }
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  onHandleNext() {
    this.props.history.push(REGISTRATION_ISP_PRICING);
  }
  handleVideoToggle() {
    this.setState({
      video: this.state.video === '' ? 'uk-active' : ''
    });
  }
  handleImageCrop() {
    this.setState({
      crop: 'visible'
    });
  }
  render() {
    return (
      <div>
        <TopContent step={4}/>
        <BackButton back={REGISTRATION_ISP_LISTING} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className="uploadPht">
                  <h1>{this.props.p.t('PhotosAndVideos.title')}</h1>
                  <p className="pd50">{this.props.p.t('PhotosAndVideos.message')}</p>

                  <ProfilePicture
                    withIcon
                    buttonText={this.props.p.t('PhotosAndVideos.chooseImage')}
                    imgExtension={['.jpg', '.jpeg', '.png']}
                    label={this.props.p.t('PhotosAndVideos.profilePictureLabel')}
                    onSelect={this.handleImageCrop}
                    maxFileSize={5242880}
                    dimensionsError={this.props.p.t('PhotosAndVideos.profilePictureDimensionsError')}
                  />

                  <Upload
                    withIcon
                    buttonText={this.props.p.t('PhotosAndVideos.chooseImages')}
                    imgExtension={['.jpg']}
                    label={this.props.p.t('PhotosAndVideos.actionImagesLabel')}
                    maxFileSize={5242880}
                  />

                  <h1 className="pt35">{this.props.p.t('PhotosAndVideos.actionVideoTitle')}</h1>
                  <p className="pd20">{this.props.p.t('PhotosAndVideos.actionVideoMessage')} </p>

                  <div className="uploadAcvideoAccordian">
                    <div className="uk-accordion videoAccordion" data-uk-accordion="{showfirst: false}">
                      <h3 className={'uk-accordion-title uploadAcvideoBtn1 ' + this.state.video} onClick={this.handleVideoToggle}>
                        {this.props.p.t('PhotosAndVideos.actionVideoOption')}
                      </h3>
                      <div className={'uk-accordion-content '} style={{display: this.state.video === '' ? 'none' : 'block'}}>
                        <UploadVideo
                          withIcon
                          imgExtension={['.mp4']}
                          maxFileSize={52428800}
                          buttonText={this.props.p.t('PhotosAndVideos.chooseVideo')}
                          label={this.props.p.t('PhotosAndVideos.actionVideoLabel')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="uk-grid">
              <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-2"/>
              <div className="uk-width-xlarge-2-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-2 ">
                <a className="general_btn" onClick={this.handleSubmitForm}>{this.props.p.t('NextButton.next')}</a>
              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 uk-text-right">
                <div className="finishDivSec">
                  <FinishLaterLink/>
                </div>
              </div>
            </div>

          </div>
        </section>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.onHandleNext}
          data={{}}
          saveType={''}
        />
      </div>
    );
  }
}

PhotosAndVideos.propTypes = {
  history: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  actionPictures: PropTypes.object.isRequired,
  displayPicture: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {actionPictures, displayPicture} = state;
  return {
    actionPictures, displayPicture
  };
};

export default withRouter(translate(connect(mapStateToProps)(PhotosAndVideos)));

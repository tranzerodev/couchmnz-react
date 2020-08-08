import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import PhotosAndVideo from '../../common/PhotosAndVideos';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import NextButton from '../ISPRegFlowStepFooter4';

import {
  sspPhotosAndVideosSubmit
} from '../../../../../actions';
import {REGISTRATION_ISP_LISTING, REGISTRATION_ISP_PRICING} from '../../../../../constants/pathConstants';

class ISPRegistration4Class extends Component {
  render() {
    return (
      <div>
        <TopContent step={4}/>
        <BackButton back={REGISTRATION_ISP_LISTING} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <PhotosAndVideo {...this.props}/>
              </div>
            </div>
            <NextButton submit={'dontpost'} valid={this.props.sspValidation.media.valid} submitForm={this.props.sspPhotosAndVideosSubmit} {...this.props} next={REGISTRATION_ISP_PRICING} finishNext/>
          </div>
        </section>
      </div>
    );
  }
  static get propTypes() {
    return {
      sspPhotosAndVideosSubmit: PropTypes.func.isRequired,
      sspValidation: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {sspValidation} = state;
  return {
    sspValidation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sspPhotosAndVideosSubmit: profile => dispatch(sspPhotosAndVideosSubmit(profile))
  };
};

const Registration4 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration4Class);
export default translate(Registration4);

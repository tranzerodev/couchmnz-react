import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import SSPPRofileListing from '../SSPProfileListing';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import NextButton from '../ISPRegFlowStepFooter';
import {
  sspListingSubmit
} from '../../../../../actions';
import {REGISTRATION_ISP_TRAINING_PREFERENCE, REGISTRATION_ISP_MEDIA} from '../../../../../constants/pathConstants';

class ISPRegistration3 extends Component {
  render() {
    return (
      <div>
        <TopContent step={3}/>
        <BackButton back={REGISTRATION_ISP_TRAINING_PREFERENCE} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-3-4 uk-width-large-3-4 uk-width-medium-1-1  uk-width-small-1-1 ">
                <SSPPRofileListing {...this.props}/>
              </div>
            </div>
            <NextButton submit={'sport'} valid={this.props.sspValidation.listing.valid} submitForm={this.props.sspListingSubmit} {...this.props} next={REGISTRATION_ISP_MEDIA} finishNext/>
          </div>
        </section>
      </div>
    );
  }
  static get propTypes() {
    return {
      sspListingSubmit: PropTypes.func.isRequired,
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
    sspListingSubmit: profile => dispatch(sspListingSubmit(profile))
  };
};

const Registration3 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration3);
export default translate(Registration3);

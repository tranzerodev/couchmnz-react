import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';

import Biography from '../../common/Biography';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import {saveBiography} from '../../../../../actions';
// Import NextLink from '../../../../common/RegistrationNextLink';
import NextLink from '../../../../common/EmptyLink';
import FinishLaterLink from '../../../../common/FinishLaterLink';
// Import RequiredNotFilledModal from '../../registration/RequiredNotFilledModal';
import BiographyModal from '../../registration/BiographyModal';
import {REGISTRATION_ISP_TRAINING_PREFERENCE, REGISTRATION_ISP_SPORTS} from '../../../../../constants/pathConstants';
import {notNull} from '../../../../../validators/common/util';
import appConstants from '../../../../../constants/appConstants';
class ISPRegistration1 extends Component {
  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.setNotFilled = this.setNotFilled.bind(this);
    this.onBiographyNotFilledModalClose = this.onBiographyNotFilledModalClose.bind(this);
    this.state = {
      isBiographyNotFilledModalOpen: false,
      notFilled: []
    };
  }
  onSubmitForm() {
    if (this.state.notFilled.length) {
      this.setState({isBiographyNotFilledModalOpen: true});
      return false;
    }
    return true;
  }
  setNotFilled(nextProps) {
    const notFilled = [];
    if (nextProps.degrees.data.length === 0 && nextProps.sportsDegrees.data.length === 0) {
      notFilled.push(nextProps.p.t('RequiredNotFilledModal.degrees'));
    }
    if (nextProps.certifications.data.length === 0 && nextProps.genCertifications.data.length === 0) {
      notFilled.push(nextProps.p.t('RequiredNotFilledModal.certification'));
    }
    if (nextProps.genAwards.data.length === 0 && nextProps.sportsAwards.data.length === 0) {
      notFilled.push(nextProps.p.t('RequiredNotFilledModal.awards'));
    }
    if (nextProps.genTools.data.length === 0 && nextProps.sportsTools.data.length === 0) {
      notFilled.push(nextProps.p.t('RequiredNotFilledModal.tool'));
    }
    if (nextProps.genAffiliations.data.length === 0 && nextProps.sportsAffiliation.data.length === 0) {
      notFilled.push(nextProps.p.t('RequiredNotFilledModal.affiliations'));
    }
    if (nextProps.sportsExperience.data.length === 0) {
      notFilled.push(nextProps.p.t('RequiredNotFilledModal.experienceDescription'));
    } else {
      const playingExperience = nextProps.sportsExperience.data.find(i => i.type === appConstants.sportExperience.playing);
      const coachingExperience = nextProps.sportsExperience.data.find(i => i.type === appConstants.sportExperience.coaching);
      if ((coachingExperience && coachingExperience.description && coachingExperience.description.length === 0) &&
        (playingExperience && playingExperience.description && playingExperience.description.length === 0)) {
        notFilled.push(nextProps.p.t('RequiredNotFilledModal.experienceDescription'));
      }
    }
    if (nextProps.sportsExperienceYear.data.length === 0) {
      notFilled.push(nextProps.p.t('RequiredNotFilledModal.coachingExperience'));
    } else {
      const coachingExperience = nextProps.sportsExperienceYear.data.find(e => e.type === appConstants.sportExperience.coaching);
      if ((!notNull(coachingExperience)) && parseInt(coachingExperience.year, 10) > 0) {
        notFilled.push(nextProps.p.t('RequiredNotFilledModal.coachingExperience'));
      }
    }
    if (nextProps.genAccomplishments.data.length === 0 && nextProps.sportsAccomplishment.data.length === 0) {
      notFilled.push(nextProps.p.t('RequiredNotFilledModal.accomplishment'));
    }
    if (notFilled.length < 0 && nextProps.isModalOpen) {
      nextProps.handleContinue();
    }
    this.setState({notFilled});
  }
  componentDidMount() {
    this.setNotFilled(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setNotFilled(nextProps);
  }
  onBiographyNotFilledModalClose() {
    this.setState({isBiographyNotFilledModalOpen: false});
  }
  render() {
    return (
      <div>
        <TopContent step={1}/>
        <BackButton back={REGISTRATION_ISP_SPORTS} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <Biography {...this.props}/>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-2"/>
              <div className="uk-width-xlarge-2-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-2 ">
                <NextLink submitForm={this.onSubmitForm} next={REGISTRATION_ISP_TRAINING_PREFERENCE}/>
              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
                <FinishLaterLink/>
              </div>
            </div>
          </div>
        </section>
        <BiographyModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isBiographyNotFilledModalOpen}
          handleClose={this.onBiographyNotFilledModalClose}
          next={REGISTRATION_ISP_TRAINING_PREFERENCE}
          msgKey="Biography.youHaveNotFilled"
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      // SaveBiography: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {
    sportsDegrees,
    genCertifications,
    genAwards,
    sportsAwards,
    sportsAffiliation,
    sportsExperience,
    sportsExperienceYear,
    genAccomplishments,
    sportsAccomplishment,
    genAffiliations,
    sportsTools,
    genTools,
    degrees,
    certifications
  } = state;
  return {
    sportsDegrees,
    genCertifications,
    genAwards,
    sportsAwards,
    sportsExperience,
    sportsExperienceYear,
    genAccomplishments,
    sportsAccomplishment,
    sportsAffiliation,
    genAffiliations,
    sportsTools,
    genTools,
    degrees,
    certifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveBiography: (data, updateType) => dispatch(saveBiography(data, updateType))
  };
};

const Registration = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration1);
export default translate(Registration);

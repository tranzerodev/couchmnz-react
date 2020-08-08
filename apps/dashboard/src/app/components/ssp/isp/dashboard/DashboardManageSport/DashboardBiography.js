import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';

import Biography from '../../common/Biography';
import appConstants from '../../../../../constants/appConstants';
import {saveBiography} from '../../../../../actions';
import {DASHBOARD_MANAGE_SPORT_LISTING} from '../../../../../constants/pathConstants';
import NextLink from '../../../../common/EmptyLink/EmptyLink';
import BiographyModal from '../../registration/BiographyModal/BiographyModal';
import {isNonEmptyArray} from '../../../../../validators/common/util';

class DashboardBiography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFilled: [],
      isNotFilledModalOpen: false
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.setNotFilled = this.setNotFilled.bind(this);
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
    if (isNonEmptyArray(nextProps.sportsExperience.data)) {
      const playingExperience = nextProps.sportsExperience.data.find(i => i.type === appConstants.sportExperience.playing);
      const coachingExperience = nextProps.sportsExperience.data.find(i => i.type === appConstants.sportExperience.coaching);
      if (coachingExperience && playingExperience) {
        if (!isNonEmptyArray(coachingExperience.description) && !isNonEmptyArray(playingExperience.description)) {
          notFilled.push(nextProps.p.t('RequiredNotFilledModal.experience'));
        }
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

  onSubmitForm() {
    if (this.state.notFilled.length > 0) {
      this.setState({isNotFilledModalOpen: true});
      return false;
    }
    return true;
  }
  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }
  render() {
    const {p, sportActivationStatus} = this.props;
    const buttonName = (sportActivationStatus === false) ? p.t('RegistrationNextLink.save_and_continue') : p.t('SaveButton.save');
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <Biography/>
        <div className="uk-grid">
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1 uk-margin-top">
            <NextLink buttonName={buttonName} submitForm={this.onSubmitForm} next={DASHBOARD_MANAGE_SPORT_LISTING}/>
          </div>
        </div>
        <BiographyModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          next={DASHBOARD_MANAGE_SPORT_LISTING}
          msgKey="Biography.youHaveNotFilled"
        />
      </div>
    );
  }
}

DashboardBiography.propTypes = {
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  sportActivationStatus: PropTypes.bool.isRequired
};

DashboardBiography.defaultProps = {};

const mapStateToProps = state => {
  const {
    currentSport,
    sportsDegrees,
    genCertifications,
    genAwards,
    sportsAwards,
    sportsExperience,
    genAccomplishments,
    sportsAccomplishment,
    sportsAffiliation,
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
    genAccomplishments,
    sportsAccomplishment,
    sportsAffiliation,
    genAffiliations,
    sportsTools,
    genTools,
    degrees,
    certifications,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveBiography: (data, updateType) => dispatch(saveBiography(data, updateType))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(DashboardBiography));

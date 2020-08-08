import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';
import BiographySelector from '../BiographySelector/BiographySelector';
import ExperienceSelector from '../ExperienceSelector/ExperienceSelector';
import BiographyExperience from '../BiographyExperience/BiographyExperience';
import BiographyButton from '../BiographyButton/BiographyButton';
import appConstants from '../../../../../constants/appConstants';

class Experience extends Component {
  render() {
    const {biography, type, submit, validation, experienceType, isModified} = this.props;
    const {description} = biography;
    const bioType = biography.type;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
          <div className="cl-sd-biographyOuter">
            <BiographySelector type={type} biography={biography} onSelectType={this.props.onSelectType}/>
            <ExperienceSelector experienceType={experienceType} type={bioType} onSelectType={this.props.onSelectExperienceType}/>
            <BiographyExperience description={description} onChange={this.props.onChangeExperience} submit={submit} valid={validation.description}/>
          </div>
          <BiographyButton isModified={isModified} onSubmit={this.props.onSubmit}/>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      // P: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectType: PropTypes.func.isRequired,
      biography: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired,
      onSubmit: PropTypes.func.isRequired,
      onSelectExperienceType: PropTypes.func.isRequired,
      onChangeExperience: PropTypes.func.isRequired,
      submit: PropTypes.bool.isRequired,
      validation: PropTypes.object.isRequired,
      experienceType: PropTypes.string,
      isModified: PropTypes.bool
    };
  }
}

Experience.defaultProps = {
  experienceType: appConstants.sportExperience.coaching,
  isModified: false
};

const mapStateToProps = (/* state */) => {
  return {
  };
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const ExperiencePage = connect(mapStateToProps, mapDispatchToProps)(translate(Experience));
export default ExperiencePage;

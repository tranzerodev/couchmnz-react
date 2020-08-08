import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';
import {AWARDS, AFFILIATIONS, CERTIFICATIONS, DEGREES, EXPERIENCE, TOOLS} from '../../../../../constants/ActionTypes';
import AwardsAndAccomplishments from '../AwardsAndAccomplishments/AwardsAndAccomplishments';
import Affiliations from '../Affiliations/Affiliations';
import Certifications from '../Certifications/Certifications';
import Degrees from '../Degrees/Degrees';
import Experience from '../Experience/Experience';
import Tools from '../Tools/Tools';
import appConstants from '../../../../../constants/appConstants';

class BiographyForm extends Component {
  render() {
    const {type, subType, biography, isSportRelated, submit, validation, sportName, experienceType, isModified} = this.props;
    switch (type) {
      case AWARDS: {
        return (
          <AwardsAndAccomplishments
            type={type}
            subType={subType}
            biography={biography}
            onSelectType={this.props.onSelectType}
            submit={submit}
            validation={validation}
            onSubmit={this.props.onSubmit}
            onSelectSubType={this.props.onSelectSubType}
            isSportRelated={isSportRelated}
            onSelectRelation={this.props.onSelectRelation}
            onChangeYear={this.props.onChangeYear}
            onChangeDescription={this.props.onChangeDescription}
            onSelectAward={this.props.onSelectAward}
            onSelectInstitution={this.props.onSelectInstitution}
            sportName={sportName}
            isModified={isModified}
          />
        );
      }
      case AFFILIATIONS: {
        return (
          <Affiliations
            type={type}
            subType={subType}
            biography={biography}
            onSelectType={this.props.onSelectType}
            onSelectSubType={this.props.onSelectSubType}
            isSportRelated={isSportRelated}
            onSelectRelation={this.props.onSelectRelation}
            submit={submit}
            validation={validation}
            onSubmit={this.props.onSubmit}
            onSelectOrganization={this.props.onSelectOrganization}
            sportName={sportName}
            isModified={isModified}
          />
        );
      }
      case CERTIFICATIONS: {
        return (
          <Certifications
            type={type}
            subType={subType}
            biography={biography}
            onSelectType={this.props.onSelectType}
            onSelectSubType={this.props.onSelectSubType}
            isSportRelated={isSportRelated}
            onSelectRelation={this.props.onSelectRelation}
            submit={submit}
            validation={validation}
            onSubmit={this.props.onSubmit}
            onChangeYear={this.props.onChangeYear}
            onSelectInstitution={this.props.onSelectInstitution}
            onSelectCertification={this.props.onSelectName}
            sportName={sportName}
            isModified={isModified}
          />
        );
      }
      case DEGREES: {
        return (
          <Degrees
            type={type}
            subType={subType}
            biography={biography}
            onSelectType={this.props.onSelectType}
            onSelectSubType={this.props.onSelectSubType}
            isSportRelated={isSportRelated}
            onSelectRelation={this.props.onSelectRelation}
            submit={submit}
            validation={validation}
            onSubmit={this.props.onSubmit}
            onChangeYear={this.props.onChangeYear}
            onSelectDegree={this.props.onSelectDegree}
            onSelectInstitution={this.props.onSelectInstitution}
            sportName={sportName}
            isModified={isModified}
          />
        );
      }
      /*       Case EXPERIENCE: {
        return (
          <Experience
            type={type}
            subType={subType}
            biography={biography}
            onSelectType={this.props.onSelectType}
            onSelectSubType={this.props.onSelectSubType}
            isSportRelated={isSportRelated}
            onSelectRelation={this.props.onSelectRelation}
            submit={submit}
            validation={validation}
            onSubmit={this.props.onSubmit}
            onChangeExperience={this.props.onChangeExperience}
            onSelectExperienceType={this.props.onSelectExperienceType}
            sportName={sportName}
            experienceType={experienceType}
            isModified={isModified}
          />
        );
      } */
      case TOOLS: {
        return (
          <Tools
            type={type}
            subType={subType}
            biography={biography}
            onSelectType={this.props.onSelectType}
            onSelectSubType={this.props.onSelectSubType}
            isSportRelated={isSportRelated}
            onSelectRelation={this.props.onSelectRelation}
            submit={submit}
            validation={validation}
            onSubmit={this.props.onSubmit}
            onSelectTool={this.props.onSelectTool}
            onSelectInstitution={this.props.onSelectInstitution}
            onSelectCertification={this.props.onSelectCertification}
            onSelectCertified={this.props.onSelectCertified}
            sportName={sportName}
            isModified={isModified}
          />
        );
      }
      default: return (
        <AwardsAndAccomplishments
          type={type}
          subType={subType}
          biography={biography}
          onSelectType={this.props.onSelectType}
          submit={submit}
          validation={validation}
          onSubmit={this.props.onSubmit}
          onSelectSubType={this.props.onSelectSubType}
          isSportRelated={isSportRelated}
          onSelectRelation={this.props.onSelectRelation}
          onChangeYear={this.props.onChangeYear}
          onChangeDescription={this.props.onChangeDescription}
          onSelectAward={this.props.onSelectAward}
          onSelectInstitution={this.props.onSelectInstitution}
          sportName={sportName}
          isModified={isModified}
        />
      );
    }
  }
  static get propTypes() {
    return {
      type: PropTypes.string.isRequired,
      subType: PropTypes.string,
      biography: PropTypes.object.isRequired,
      isSportRelated: PropTypes.string.isRequired,
      submit: PropTypes.bool.isRequired,
      experienceType: PropTypes.string,
      validation: PropTypes.object.isRequired,
      sportName: PropTypes.string.isRequired,
      onSelectType: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      onSelectSubType: PropTypes.func.isRequired,
      onSelectRelation: PropTypes.func.isRequired,
      onChangeYear: PropTypes.func.isRequired,
      onChangeDescription: PropTypes.func.isRequired,
      onSelectAward: PropTypes.func.isRequired,
      onSelectDegree: PropTypes.func.isRequired,
      onSelectInstitution: PropTypes.func.isRequired,
      onSelectOrganization: PropTypes.func.isRequired,
      onSelectCertification: PropTypes.func.isRequired,
      onChangeExperience: PropTypes.func.isRequired,
      onSelectExperienceType: PropTypes.func.isRequired,
      onSelectTool: PropTypes.func.isRequired,
      onSelectCertified: PropTypes.func.isRequired,
      onSelectName: PropTypes.func.isRequired,
      isModified: PropTypes.bool
    };
  }
}

BiographyForm.defaultProps = {
  subType: null,
  isModified: false,
  experienceType: appConstants.sportExperience.coaching
};

const mapStateToProps = (/* state */) => {
  return {
  };
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};
const BiographyPage = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyForm));
export default BiographyPage;

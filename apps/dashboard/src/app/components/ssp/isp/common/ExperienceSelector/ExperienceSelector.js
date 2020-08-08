import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';
import appConstants from '../../../../../constants/appConstants';

class ExperienceSelector extends Component {
  render() {
    const {experienceType} = this.props;
    const {t} = this.props.p;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className="field-holder">
            <h6>{t('Biography.selectType')}</h6>
            <div className="tandc">
              <input type="radio" name="awardType" id="awardType3" value={appConstants.sportExperience.playing} checked={experienceType === appConstants.sportExperience.playing} onChange={this.props.onSelectType}/>
              <label htmlFor="awardType3">{t('Biography.playing')}</label>
              <input type="radio" name="awardType" id="awardType4" value={appConstants.sportExperience.coaching} checked={experienceType === appConstants.sportExperience.coaching} onChange={this.props.onSelectType}/>
              <label htmlFor="awardType4">{t('Biography.coaching')}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectType: PropTypes.func.isRequired,
      experienceType: PropTypes.string.isRequired
    };
  }
}

const mapStateToProps = (/* state */) => {
  return {
  };
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const ExperienceSelectorComponent = connect(mapStateToProps, mapDispatchToProps)(translate(ExperienceSelector));
export default ExperienceSelectorComponent;

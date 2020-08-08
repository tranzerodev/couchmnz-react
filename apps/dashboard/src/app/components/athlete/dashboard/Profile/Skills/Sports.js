import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import SportsRow from './SportsRow';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import {fetchAthleteProfile} from '../../../../../actions';

class SkillsSports extends Component {
  render() {
    const {t} = this.props.p;
    const {sportsMapping} = this.props;
    const keys = sportsMapping.status === FULFILLED ? Object.keys(sportsMapping.data) : [];
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-trainingLocationInner">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <section className="stepSection stepSectionNxt cl-sm-athleteSection ssp-regflow-1o">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                    <h1 className="uk-text-left">{t('ProfileSkills.title')}</h1>
                    <p className="pt0">{t('ProfileSkills.message')}</p>
                  </div>
                </div>
                {sportsMapping.status === FULFILLED &&
                  keys.map((key, i) => i % 2 ? null : <SportsRow key={i} onEdit={this.props.onEdit} history={this.props.history} sports={[sportsMapping.data[key], sportsMapping.data[keys[i + 1]] ? sportsMapping.data[keys[i + 1]] : null]}/>)
                }
              </section>
            </div>
          </div>
        </div>
        <a className="add_an general_btn uk-margin-top" onClick={this.props.onAdd}>{t('ProfileSkills.addAnother')}</a>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sportsMapping: PropTypes.object.isRequired,
      onAdd: PropTypes.func.isRequired,
      onEdit: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {athlete} = state;
  const {sportsMapping} = athlete;
  return {
    sportsMapping
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAthleteProfile: params => dispatch(fetchAthleteProfile(params))
  };
};

const AthleteSkills = connect(mapStateToProps, mapDispatchToProps)(SkillsSports);
export default (translate(AthleteSkills));

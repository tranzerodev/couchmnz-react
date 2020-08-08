import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import QueryString from 'query-string';
import appConstants from '../../constants/appConstants';
import {
  fetchSportsSuggestion, fetchLocationsSuggestion, changeSelectedLocation
} from '../../actions';
import {convertToArray} from '../../utils/sspSearchUtils';

const {filterQueries} = appConstants;

class AthleteFilters extends Component {
  constructor(props) {
    super(props);

    const {query} = this.props;

    const gender = query[filterQueries.athleteGender];
    const ageGroups = query[filterQueries.athleteAgeGroups];
    const skillLevels = query[filterQueries.athleteSkillLevels];

    this.state = {
      gender: (gender) ? gender : null,
      ageGroups: convertToArray(ageGroups),
      skillLevels: convertToArray(skillLevels),
      value: [],
      selected: {
        skills: [],
        ageGroups: [],
        genders: []
      }
    };

    this.handleResetGender = this.handleResetGender.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleAgeGroupChange = this.handleAgeGroupChange.bind(this);
    this.renderAthleteAgeList = this.renderAthleteAgeList.bind(this);
    this.handleSkillLevelChange = this.handleSkillLevelChange.bind(this);
    this.renderAthleteSkillList = this.renderAthleteSkillList.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);

    this.generatAgeGroupFilterteOptions = this.generatAgeGroupFilterteOptions.bind(this);

    this.generatAgeGroupOptions = this.generatAgeGroupOptions.bind(this);
  }
  componentWillReceiveProps(newProps) {
    const {query} = newProps;
    const gender = query[filterQueries.athleteGender];
    const ageGroups = query[filterQueries.athleteAgeGroups];
    const skillLevels = query[filterQueries.athleteSkillLevels];
    this.setState({
      gender: (gender) ? gender : null,
      ageGroups: convertToArray(ageGroups),
      skillLevels: convertToArray(skillLevels)
    });
  }

  handleSearchFilter() {
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    const {gender, ageGroups, skillLevels} = this.state;
    const {athleteGender, athleteAgeGroups, athleteSkillLevels} = filterQueries;
    const updatedFilters = Object.assign({}, query,
      {
        [athleteGender]: (gender) ? gender : undefined,
        [athleteAgeGroups]: (ageGroups.length > 0) ? ageGroups : undefined,
        [athleteSkillLevels]: (skillLevels.length > 0) ? skillLevels : undefined,
        page: undefined
      }
    );

    const search = QueryString.stringify(updatedFilters);
    history.push({
      pathname,
      search
    });
  }

  handleResetGender() {
    this.setState({
      gender: null
    });
  }

  handleGenderChange(event) {
    const {value} = event.target;
    this.setState({
      gender: value
    });
  }

  handleAgeGroupChange(event) {
    const {value, checked} = event.target;
    const {ageGroups} = this.state;
    const ageGroupsFilterSet = new Set([...ageGroups]);
    if (checked) {
      ageGroupsFilterSet.add(value);
    } else {
      ageGroupsFilterSet.delete(value);
    }
    this.setState({ageGroups: [...ageGroupsFilterSet]});
  }

  handleResetFilters() {
    const {query} = this.props;
    const gender = query[filterQueries.athleteGender];
    const ageGroups = query[filterQueries.athleteAgeGroups];
    const skillLevels = query[filterQueries.athleteSkillLevels];
    this.setState({
      gender: (gender) ? gender : null,
      ageGroups: convertToArray(ageGroups),
      skillLevels: convertToArray(skillLevels)
    });
  }

  handleSkillLevelChange(event) {
    const {value, checked} = event.target;
    const {skillLevels} = this.state;
    const skillLevelFilterSet = new Set([...skillLevels]);
    if (checked) {
      skillLevelFilterSet.add(value);
    } else {
      skillLevelFilterSet.delete(value);
    }
    this.setState({skillLevels: [...skillLevelFilterSet]});
  }

  renderAthleteAgeList(age, i) {
    const {name, description} = age;
    const {ageGroups} = this.state;
    const checked = ageGroups.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'mobage' + i} type="checkbox" name="ageGroups" value={name} checked={checked} onChange={this.handleAgeGroupChange}/>
        <label htmlFor={'mobage' + i}>{description}</label>
        {/*         <input className="optioncheckbox" id="select2" type="checkbox"/>
                  <label htmlFor="select2">Toddler</label> */}
      </span>
    );
  }

  renderAthleteSkillList(skillLevel, i) {
    const {name, description} = skillLevel;
    const {skillLevels} = this.state;
    const checked = skillLevels.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'mobskill' + i} type="checkbox" name="skillLevels" value={name} checked={checked} onChange={this.handleSkillLevelChange}/>
        <label htmlFor={'mobskill' + i}>{description}</label>
      </span>
    );
  }

  generatAgeGroupFilterteOptions(coveredArr) {
    const {multiSelect} = this.state;
    const groupFilterOption = coveredArr.map((opt, key) => {
      return {value: opt.name, label: opt.description, key};
    });
    const arr = (Object.assign([], multiSelect, groupFilterOption));
    this.setState({multiSelect: arr});
  }

  generatAgeGroupOptions(coveredArr) {
    return coveredArr.map((opt, key) => {
      return {value: opt.name, label: opt.description, key};
    });
  }
  render() {
    const {p} = this.props;
    const {gender} = this.state;
    const {selected} = this.state;
    const {skills} = selected;
    return (
      <div id="cl-sr-athletemenu" className="uk-offcanvas">
        <div className="uk-offcanvas-bar">
          <div className="uk-accordion-content">
            <h3>{p.t('AthleteFilters.filterHeader')}.</h3>
            <div className="uk-width-1 sr-subnav-borderbottom">
              <div className="cl-sr-dropdown-gender">
                <h5>{p.t('AthleteFilters.gender')}</h5>
                <div className="cl-sr-selectgender">
                  <input id="mgender1" name="mobathletegender" type="radio" checked={gender === null} onChange={this.handleResetGender}/>
                  <label htmlFor="mgender1">{p.t('AthleteFilters.genderAny')}</label>
                </div>
                <div className="cl-sr-selectgender">
                  <input id="mgender2" name="mobathletegender" type="radio" checked={gender === appConstants.genders.Male} value={appConstants.genders.Male} onChange={this.handleGenderChange}/>
                  <label htmlFor="mgender2">{p.t('AthleteFilters.male')}</label>
                </div>
                <div className="cl-sr-selectgender">
                  <input id="mgender3" name="mobathletegender" type="radio" checked={gender === appConstants.genders.Female} value={appConstants.genders.Female} onChange={this.handleGenderChange}/>
                  <label htmlFor="mgender3">{p.t('AthleteFilters.female')}</label>
                </div>
              </div>
            </div>
            <div className="uk-width-1 cl-sr-checklist sr-subnav-borderbottom">
              <h5>{p.t('AthleteFilters.age')}</h5>

              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <div className="tandc cl-sd-preferences-settings">
                  {
                    appConstants.athleteAgeList.map(this.renderAthleteAgeList)
                  }
                </div>

              </div>
            </div>
            <div className="uk-width-1 cl-sr-checklist sr-subnav-borderbottom">
              <h5>{p.t('AthleteFilters.skillLevel')}</h5>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <div className="tandc cl-sd-preferences-settings">
                  {
                    appConstants.athleteSkillList.map(this.renderAthleteSkillList)
                  }
                </div>
              </div>
            </div>
            <div className="uk-width-1-1 sr-subnav-borderbottom">
              <a className="sr-dd-searchlink" onClick={this.handleSearchFilter}>{p.t('AthleteFilters.btnSearch')}</a>
            </div>
            <div className="uk-width-1-1">
              <a className="sr-dd-cancellink" onClick={this.handleResetFilters}>{p.t('AthleteFilters.btnReset')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AthleteFilters.propTypes = {
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  sportsList: PropTypes.object.isRequired,
  locationList: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fetchSportsSuggestion: PropTypes.func.isRequired,
  fetchLocationsSuggestion: PropTypes.func.isRequired,
  changeSelectedLocation: PropTypes.func.isRequired
};

AthleteFilters.defultProps = {

};

const mapStateToProps = state => {
  const {router, sportNameSuggestions, locationNameSuggestion} = state;

  return {
    sportsList: sportNameSuggestions,
    locationList: locationNameSuggestion,
    query: router.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSportsSuggestion: searchKey => dispatch(fetchSportsSuggestion(searchKey)),
    fetchLocationsSuggestion: locationKey => dispatch(fetchLocationsSuggestion(locationKey)),
    changeSelectedLocation: selectedLocation => dispatch(changeSelectedLocation(selectedLocation))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(AthleteFilters)));

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import QueryString from 'query-string';

import MultiSelect from '@khanacademy/react-multi-select';

// Import 'react-dropdown-tree-select/dist/styles.css';
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
      skillLevels: convertToArray(skillLevels)
    };

    this.handleResetGender = this.handleResetGender.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleAgeGroupChange = this.handleAgeGroupChange.bind(this);
    this.renderAthleteAgeList = this.renderAthleteAgeList.bind(this);
    this.handleSkillLevelChange = this.handleSkillLevelChange.bind(this);
    this.renderAthleteSkillList = this.renderAthleteSkillList.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);

    this.generateAgeGroupOptions = this.generateAgeGroupOptions.bind(this);
    this.handleNewAgeGroupChange = this.handleNewAgeGroupChange.bind(this);

    this.generateSkillOptions = this.generateSkillOptions.bind(this);
    this.handleNewSkillGroupChange = this.handleNewSkillGroupChange.bind(this);
    this.skillLevelValueRenderer = this.skillLevelValueRenderer.bind(this);
    this.ageGroupValueRenderer = this.ageGroupValueRenderer.bind(this);
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
    console.log('updatedFilters===', updatedFilters);

    const search = QueryString.stringify(updatedFilters);
    console.log('Search Athlete===', search);
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

  handleAgeGroupChange(ageGroups) {
    this.setState({ageGroups});
  }

  handleNewAgeGroupChange(selected) {
    const checked = selected.checked;
    const value = selected.value;

    const {ageGroups} = this.state;
    const ageGroupsFilterSet = new Set([...ageGroups]);
    if (checked) {
      ageGroupsFilterSet.add(value);
    } else {
      ageGroupsFilterSet.delete(value);
    }
    this.setState({ageGroups: [...ageGroupsFilterSet]});
  }
  handleNewSkillGroupChange(skillLevels) {
    this.setState({skillLevels});
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
        <input className="optioncheckbox" id={'age' + i} type="checkbox" name="ageGroups" value={name} checked={checked} onChange={this.handleAgeGroupChange}/>
        <label htmlFor={'age' + i}>{description}</label>
      </span>
    );
  }

  renderAthleteSkillList(skillLevel, i) {
    const {name, description} = skillLevel;
    const {skillLevels} = this.state;
    const checked = skillLevels.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'skill' + i} type="checkbox" name="skillLevels" value={name} checked={checked} onChange={this.handleSkillLevelChange}/>
        <label htmlFor={'skill' + i}>{description}</label>
      </span>
    );
  }
  generateAgeGroupOptions(coveredArr) {
    const {ageGroups} = this.state;
    return coveredArr.map((opt, key) => {
      const checked = ageGroups.includes(opt.name);
      return {value: opt.name, label: opt.description, key, checked};
    });
  }

  generateSkillOptions(coveredArr) {
    const {skillLevels} = this.state;
    return coveredArr.map((opt, key) => {
      const checked = skillLevels.includes(opt.name);
      return {value: opt.name, label: opt.description, key, checked};
    });
  }

  ageGroupValueRenderer(selected) {
    const {p} = this.props;

    if (selected.length === 0) {
      return p.t('AthleteFilters.chooseAgeGroup');
    }

    return selected.join(', ');
  }

  skillLevelValueRenderer(selected) {
    const {p} = this.props;
    if (selected.length === 0) {
      return p.t('AthleteFilters.chooseSkillLevel');
    }

    return selected.join(', ');
  }

  render() {
    const {p} = this.props;
    const {gender} = this.state;
    return (
      <li className="cl-sr-navbar-link" onClick={this.handleOpenDropdown}>
        <div className={this.state.isOpen ? 'uk-button-dropdown uk-open' : 'uk-button-dropdown'} data-uk-dropdown="{mode:'click'}" aria-haspopup="true" aria-expanded="false">
          <button className="uk-button">{p.t('AthleteFilters.filterHeader')}<i className="fa fa-angle-down"/></button>
          <div className="uk-dropdown uk-dropdown-width-2 uk-dropdown-bottom cl-sr-nav-athlete" aria-hidden="false" tabIndex="" style={{top: 45, left: 0, marginTop: 20}}>
            <div className="uk-grid uk-dropdown-grid sr-subnav-borderbottom">
              <div className="uk-width-1">
                <div className="cl-sr-dropdown-gender">
                  <h5>{p.t('AthleteFilters.gender')}</h5>
                  <div className="cl-sr-selectgender">
                    <input className="optioncheckbox" id="gender1" name="athletegender" type="radio" checked={gender === null} onChange={this.handleResetGender}/>
                    <label htmlFor="gender1">{p.t('AthleteFilters.genderAny')}</label>
                  </div>
                  <div className="cl-sr-selectgender">
                    <input className="optioncheckbox" id="gender2" name="athletegender" type="radio" checked={gender === appConstants.genders.Male} value={appConstants.genders.Male} onChange={this.handleGenderChange}/>
                    <label htmlFor="gender2">{p.t('AthleteFilters.male')}</label>
                  </div>
                  <div className="cl-sr-selectgender">
                    <input id="gender3" name="athletegender" type="radio" checked={gender === appConstants.genders.Female} value={appConstants.genders.Female} onChange={this.handleGenderChange}/>
                    <label htmlFor="gender3">{p.t('AthleteFilters.female')}</label>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-2 cl-sr-checklist">
                <div className="cl-multiselect-dd-react">
                  <h5>{p.t('AthleteFilters.age')}</h5>
                  <MultiSelect
                    selected={this.state.ageGroups}
                    valueRenderer={this.ageGroupValueRenderer}
                    options={appConstants.athleteAgeList.map(item => {
                      return (
                        {label: item.description, value: item.name}
                      );
                    })
                    }
                    onSelectedChanged={this.handleAgeGroupChange}
                    disableSearch
                    hasSelectAll={false}
                  />
                </div>
              </div>
              <div className="uk-width-1-2 cl-sr-checklist">
                <div className="cl-multiselect-dd-react">
                  <h5>{p.t('AthleteFilters.skillLevel')}</h5>
                  <MultiSelect
                    selected={this.state.skillLevels}
                    valueRenderer={this.skillLevelValueRenderer}
                    options={appConstants.athleteSkillList.map(item => {
                      return (
                        {label: item.description, value: item.name}
                      );
                    })
                    }
                    onSelectedChanged={this.handleNewSkillGroupChange}
                    disableSearch
                    hasSelectAll={false}
                  />
                </div>
              </div>
            </div>
            <div className="uk-dropdown-grid">
              <div className="uk-width-1-1">
                <a className="sr-dd-searchlink" onClick={this.handleSearchFilter}>{p.t('AthleteFilters.btnSearch')}</a>
                <a className="sr-dd-cancellink" onClick={this.handleResetFilters}>{p.t('AthleteFilters.btnReset')}</a>
              </div>
            </div>
          </div>
        </div>
      </li>
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

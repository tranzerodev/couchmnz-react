import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import QueryString from 'query-string';

import appConstants from '../../constants/appConstants';
import {convertToArray} from '../../utils/sspSearchUtils';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import MultiSelect from '@khanacademy/react-multi-select';
import {  
  UK_BUTTON_DROPDOWN, UK_DROPDOWN_CLOSE
} from '../../constants/cssConstants'

const {filterQueries} = appConstants;

class TrainerFilters extends Component {
  constructor(props) {
    super(props);

    const {query} = this.props;
    const trainerGender = query[filterQueries.trainerGenderParam];
    const trainerTypes = query[filterQueries.trainerTypesParam];
    const sessionTypes = query[filterQueries.sessionTypesParam];
    const yearOfCoachingExperiences = query[filterQueries.yearOfTrainingExperienceParam];
    const yearOfPlayingExperiences = query[filterQueries.yearOfPlayingExperienceParam];
    const instantBook = query[filterQueries.instantBookParam];
    const isCertified = query[filterQueries.isCertifiedParam];
    const canTravel = query[filterQueries.canTravelParam];

    this.state = {
      trainerGender: (trainerGender) ? trainerGender : null,
      trainerTypes: convertToArray(trainerTypes),
      sessionTypes: convertToArray(sessionTypes),
      yearOfCoachingExperiences: convertToArray(yearOfCoachingExperiences),
      yearOfPlayingExperiences: convertToArray(yearOfPlayingExperiences),
      instantBook: (instantBook) ? instantBook : null,
      isCertified: (isCertified) ? isCertified : null,
      canTravel: (canTravel) ? canTravel : null,
      dropdownClasses: this.props.dropdownClasses
    };

    this.handleResetGender = this.handleResetGender.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);
    this.handleTrainerTypeChange = this.handleTrainerTypeChange.bind(this);
    this.renderTrainerTypeList = this.renderTrainerTypeList.bind(this);
    this.handleSessionTypeChange = this.handleSessionTypeChange.bind(this);
    this.renderTrainingSessionsList = this.renderTrainingSessionsList.bind(this);
    this.handleYearOfExperienceChange = this.handleYearOfExperienceChange.bind(this);
    this.handlePlayingExpChange = this.handlePlayingExpChange.bind(this);
    this.renderYearOfExperienceList = this.renderYearOfExperienceList.bind(this);
    this.handleInstantBookChange = this.handleInstantBookChange.bind(this);
    this.handleIsCertifiedChange = this.handleIsCertifiedChange.bind(this);
    this.handleCanTravelChange = this.handleCanTravelChange.bind(this);

    this.generateSessionOptions = this.generateSessionOptions.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.generateExpOptions = this.generateExpOptions.bind(this);
    this.handleExpChange = this.handleExpChange.bind(this);
    this.generateTrainerTypeOptions = this.generateTrainerTypeOptions.bind(this);
    this.handleTrainerChange = this.handleTrainerChange.bind(this);

    this.trainingExpValueRenderer = this.trainingExpValueRenderer.bind(this);
    this.sessionTypeValueRenderer = this.sessionTypeValueRenderer.bind(this);
    this.playingExpValueRenderer = this.playingExpValueRenderer.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {query} = newProps;
    const trainerGender = query[filterQueries.trainerGenderParam];
    const trainerTypes = query[filterQueries.trainerTypesParam];
    const sessionTypes = query[filterQueries.sessionTypesParam];
    const yearOfCoachingExperiences = query[filterQueries.yearOfTrainingExperienceParam];
    const yearOfPlayingExperiences = query[filterQueries.yearOfPlayingExperienceParam];
    const instantBook = query[filterQueries.instantBookParam];
    const isCertified = query[filterQueries.isCertifiedParam];
    const canTravel = query[filterQueries.canTravelParam];
    this.setState({
      trainerGender: (trainerGender) ? trainerGender : null,
      trainerTypes: convertToArray(trainerTypes),
      sessionTypes: convertToArray(sessionTypes),
      yearOfCoachingExperiences: convertToArray(yearOfCoachingExperiences),
      yearOfPlayingExperiences: convertToArray(yearOfPlayingExperiences),
      instantBook: (instantBook) ? instantBook : null,
      isCertified: (isCertified) ? isCertified : null,
      canTravel: (canTravel) ? canTravel : null
    });
  }

  generateSessionOptions(coveredArr) {
    const {sessionTypes} = this.state;
    return coveredArr.map((opt, key) => {
      const checked = sessionTypes.includes(opt.name);
      return {value: opt.name, label: opt.description, key, checked};
    });
  }

  generateExpOptions(coveredArr) {
    const {yearOfCoachingExperiences} = this.state;
    return coveredArr.map((opt, key) => {
      const checked = yearOfCoachingExperiences.includes(opt.name);
      return {value: opt.name, label: opt.description, key, checked};
    });
  }

  generatePlayingExpOptions(coveredArr) {
    const {yearOfPlayingExperiences} = this.state;
    return coveredArr.map((opt, key) => {
      const checked = yearOfPlayingExperiences.includes(opt.name);
      return {value: opt.name, label: opt.description, key, checked};
    });
  }

  generateTrainerTypeOptions(coveredArr) {
    const {trainerTypes} = this.state;
    return coveredArr.map((opt, key) => {
      const checked = trainerTypes.includes(opt.name);
      return {value: opt.name, label: opt.description, key, checked};
    });
  }

  handleSessionChange(sessionTypes) {
    this.setState({sessionTypes});
  }
  handleExpChange(yearOfCoachingExperiences) {
    this.setState({yearOfCoachingExperiences});
  }
  handlePlayingExpChange(yearOfPlayingExperiences) {
    this.setState({yearOfPlayingExperiences});
  }

  handleTrainerChange(trainerTypes) {
    this.setState({trainerTypes});
  }
  handleSearchFilter() {
    this.setState({
      dropdownClasses: UK_BUTTON_DROPDOWN
    })
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    const {trainerGender, trainerTypes, sessionTypes, yearOfCoachingExperiences, yearOfPlayingExperiences, instantBook, isCertified, canTravel} = this.state;
    const {trainerGenderParam, trainerTypesParam, sessionTypesParam, yearOfTrainingExperienceParam, yearOfPlayingExperienceParam, instantBookParam, isCertifiedParam, canTravelParam} = filterQueries;
    const updatedFilters = Object.assign({}, query,
      {
        [trainerGenderParam]: (trainerGender) ? trainerGender : undefined,
        [trainerTypesParam]: (trainerTypes.length > 0) ? trainerTypes : undefined,
        [sessionTypesParam]: (sessionTypes.length > 0) ? sessionTypes : undefined,
        [yearOfTrainingExperienceParam]: (yearOfCoachingExperiences.length > 0) ? yearOfCoachingExperiences : undefined,
        [yearOfPlayingExperienceParam]: (yearOfPlayingExperiences.length > 0) ? yearOfPlayingExperiences : undefined,
        [instantBookParam]: (instantBook) ? instantBook : undefined,
        [isCertifiedParam]: (isCertified) ? isCertified : undefined,
        [canTravelParam]: (canTravel) ? canTravel : undefined,
        page: undefined
      }
    );

    const search = QueryString.stringify(updatedFilters);
    history.push({
      pathname,
      search
    });
  }
  handleResetFilters() {
    const {query} = this.props;
    const trainerGenderVal = query[filterQueries.trainerGenderParam];
    const trainerTypes = query[filterQueries.trainerTypesParam];
    const sessionTypes = query[filterQueries.sessionTypesParam];
    const yearOfCoachingExperiences = query[filterQueries.yearOfTrainingExperienceParam];
    const yearOfPlayingExperiences = query[filterQueries.yearOfPlayingExperienceParam];
    const instantBook = query[filterQueries.instantBookParam];
    const isCertified = query[filterQueries.isCertifiedParam];
    const canTravel = query[filterQueries.canTravelParam];
    this.setState({
      trainerGender: (trainerGenderVal) ? trainerGenderVal : null,
      trainerTypes: convertToArray(trainerTypes),
      sessionTypes: convertToArray(sessionTypes),
      yearOfCoachingExperiences: convertToArray(yearOfCoachingExperiences),
      yearOfPlayingExperiences: convertToArray(yearOfPlayingExperiences),
      instantBook: (instantBook) ? instantBook : null,
      isCertified: (isCertified) ? isCertified : null,
      canTravel: (canTravel) ? canTravel : null
    });
  }

  handleResetGender() {
    this.setState({
      trainerGender: null
    });
  }

  handleGenderChange(event) {
    const {value} = event.target;
    this.setState({
      trainerGender: value
    });
  }

  handleInstantBookChange(event) {
    const {checked} = event.target;
    this.setState({
      instantBook: (checked) ? 'Y' : undefined
    });
  }

  handleIsCertifiedChange(event) {
    const {checked} = event.target;
    this.setState({
      isCertified: (checked) ? 'Y' : undefined
    });
  }

  handleCanTravelChange(event) {
    const {checked} = event.target;
    this.setState({
      canTravel: (checked) ? 'Y' : undefined
    });
  }

  handleTrainerTypeChange(event) {
    const {value, checked} = event.target;
    const {trainerTypes} = this.state;
    const trainerTypesFilterSet = new Set([...trainerTypes]);
    if (checked) {
      trainerTypesFilterSet.add(value);
    } else {
      trainerTypesFilterSet.delete(value);
    }
    this.setState({trainerTypes: [...trainerTypesFilterSet]});
  }

  handleSessionTypeChange(event) {
    const {value, checked} = event.target;
    const {sessionTypes} = this.state;
    const sessionTypesFilterSet = new Set([...sessionTypes]);
    if (checked) {
      sessionTypesFilterSet.add(value);
    } else {
      sessionTypesFilterSet.delete(value);
    }
    this.setState({sessionTypes: [...sessionTypesFilterSet]});
  }

  handleYearOfExperienceChange(event) {
    const {value, checked} = event.target;
    const {yearOfCoachingExperiences} = this.state;
    const yearOfExperiencesFilterSet = new Set([...yearOfCoachingExperiences]);
    if (checked) {
      yearOfExperiencesFilterSet.add(value);
    } else {
      yearOfExperiencesFilterSet.delete(value);
    }
    this.setState({yearOfCoachingExperiences: [...yearOfExperiencesFilterSet]});
  }

  renderTrainerTypeList(trainingType, i) {
    const {name, description} = trainingType;
    const {trainerTypes} = this.state;
    const checked = trainerTypes.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'trainingType' + i} type="checkbox" name="trainingTypes" value={name} checked={checked} onChange={this.handleTrainerTypeChange}/>
        <label htmlFor={'trainingType' + i}>{description}</label>
      </span>
    );
  }

  renderTrainingSessionsList(trainingSession, i) {
    const {name, description} = trainingSession;
    const {sessionTypes} = this.state;
    const checked = sessionTypes.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'sessionType' + i} type="checkbox" name="sessionTypes" value={name} checked={checked} onChange={this.handleSessionTypeChange}/>
        <label htmlFor={'sessionType' + i}>{description}</label>
      </span>
    );
  }

  renderYearOfExperienceList(yearOfExperience, i) {
    const {name, description} = yearOfExperience;
    const {yearOfCoachingExperiences} = this.state;
    const checked = yearOfCoachingExperiences.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'yearOfExperience' + i} type="checkbox" name="yearOfExperiences" value={name} checked={checked} onChange={this.handleYearOfExperienceChange}/>
        <label htmlFor={'yearOfExperience' + i}>{description}</label>
      </span>
    );
  }

  sessionTypeValueRenderer(selected) {
    const {p} = this.props;

    if (selected.length === 0) {
      return p.t('AthleteFilters.chooseSessionType');
    }

    return selected.join(', ');
  }

  trainingExpValueRenderer(selected) {
    const {p} = this.props;

    if (selected.length === 0) {
      return p.t('AthleteFilters.chooseTrainingExp');
    }

    return selected.join(', ');
  }

  playingExpValueRenderer(selected) {
    const {p} = this.props;

    if (selected.length === 0) {
      return p.t('AthleteFilters.choosePlayingExp');
    }

    return selected.join(', ');
  }

  render() {
    const {p} = this.props;
    const {trainerGender, instantBook, isCertified, canTravel} = this.state;
    return (
      <li className="cl-sr-navbar-link">
        <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click'}" aria-haspopup="true" aria-expanded="false">
          <button className="uk-button">{p.t('TrainerFilters.filterHeader')}<i className="fa fa-angle-down"/></button>
          <div className="uk-dropdown uk-dropdown-width-3 uk-dropdown-autoflip uk-dropdown-bottom cl-sr-nav-trainer" aria-hidden="false" tabIndex="" style={{top: 45, left: 0, marginTop: 20}}>
            <div className="uk-grid uk-dropdown-grid sr-subnav-borderbottom">
              <div className="uk-width-1">
                <div className="cl-sr-dropdown-gender">
                  <h5>{p.t('TrainerFilters.gender')}</h5>
                  <div className="cl-sr-selectgender">
                    <input id="gender4" name="trainerGender" type="radio" checked={trainerGender === null} onChange={this.handleResetGender}/>
                    <label htmlFor="gender4">{p.t('TrainerFilters.genderAny')}</label>
                  </div>
                  <div className="cl-sr-selectgender">
                    <input id="gender5" name="trainerGender" type="radio" checked={trainerGender === appConstants.genders.Male} value={appConstants.genders.Male} onChange={this.handleGenderChange}/>
                    <label htmlFor="gender5">{p.t('TrainerFilters.male')}</label>
                  </div>
                  <div className="cl-sr-selectgender">
                    <input id="gender6" name="trainerGender" type="radio" checked={trainerGender === appConstants.genders.Female} value={appConstants.genders.Female} onChange={this.handleGenderChange}/>
                    <label htmlFor="gender6">{p.t('TrainerFilters.female')}</label>
                  </div>
                </div>
              </div>
              {/*               <div className="uk-width-1-3 cl-sr-checklist">
                <h5>{p.t('TrainerFilters.typeOfTrainer')}</h5>
                <MultiSelect
                  selected={this.state.trainerTypes}
                  options={appConstants.trainerTypeList.map(item => {
                    return (
                      {label: item.description, value: item.name}
                    );
                  })
                  }
                  onSelectedChanged={this.handleTrainerChange}
                  disableSearch
                  hasSelectAll={false}
                />
              </div> */}
              <div className="uk-width-1-3 cl-sr-checklist">
                <div className="cl-multiselect-dd-react">
                  <h5>{p.t('TrainerFilters.trainingSessionType')}</h5>
                  <MultiSelect
                    selected={this.state.sessionTypes}
                    valueRenderer={this.sessionTypeValueRenderer}
                    options={appConstants.trainerSessionList.map(item => {
                      return (
                        {label: item.description, value: item.name}
                      );
                    })
                    }
                    onSelectedChanged={this.handleSessionChange}
                    disableSearch
                    hasSelectAll={false}
                  />
                </div>
              </div>
              <div className="uk-width-1-3 cl-sr-checklist">
                <div className="cl-multiselect-dd-react">
                  <h5>{p.t('TrainerFilters.trainingExperience')}</h5>
                  <MultiSelect
                    selected={this.state.yearOfCoachingExperiences}
                    valueRenderer={this.trainingExpValueRenderer}
                    options={appConstants.yearOfTrainingExperienceList.map(item => {
                      return (
                        {label: item.description, value: item.name}
                      );
                    })
                    }
                    onSelectedChanged={this.handleExpChange}
                    disableSearch
                    hasSelectAll={false}
                  />
                </div>
              </div>

              <div className="uk-width-1-3 cl-sr-checklist">
                <div className="cl-multiselect-dd-react">
                  <h5>{p.t('TrainerFilters.playingExperience')}</h5>
                  <MultiSelect
                    selected={this.state.yearOfPlayingExperiences}
                    valueRenderer={this.playingExpValueRenderer}
                    options={appConstants.yearOfPlayingExperienceList.map(item => {
                      return (
                        {label: item.description, value: item.name}
                      );
                    })
                    }
                    onSelectedChanged={this.handlePlayingExpChange}
                    disableSearch
                    hasSelectAll={false}
                  />
                </div>
              </div>
            </div>
            <div className="uk-grid uk-dropdown-grid sr-subnav-borderbottom">
              <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-8-10 uk-width-small-8-10 ">
                <div className="uk-align-left">
                  <div className="sr-dd-show">
                    <h6>{p.t('TrainerFilters.certifications')}</h6>
                    <p>{p.t('TrainerFilters.certificationsLabel')}</p>
                  </div>
                </div>
              </div>
              <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10 uk-width-small-2-10">
                <div className="cl-sd-switchOuter">
                  <label className="cl-sd-switch" htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" name="isCertified" checked={isCertified === appConstants.isCertified.Yes} onChange={this.handleIsCertifiedChange}/>
                    <div className="cl-sd-slider cl-sd-round"/>
                  </label>
                </div>
              </div>
            </div>
            {/* <div className="uk-grid uk-dropdown-grid sr-subnav-borderbottom">
              <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-8-10 uk-width-small-8-10 ">
                <div className="uk-align-left">
                  <div className="sr-dd-show">
                    <div className="cl-verified-col">
                      <div className="lcol">
                        <svg className="cl-icon-verified" xmlns="http://www.w3.org/2000/svg" viewBox="-7044 -1120 20 20.001">
                          <g transform="translate(-7044 -1120)">
                            <g data-name="Group 260" transform="translate(0 0)">
                              <path className="cl-icon-verified-1" d="M10,0,7.775,1.7,5,1.338,3.924,3.925,1.338,5,1.7,7.775,0,10l1.7,2.226L1.338,15l2.586,1.074L5,18.661l2.777-.36L10,20l2.225-1.7,2.775.36,1.074-2.586L18.662,15l-.36-2.777L20,10,18.3,7.775,18.662,5,16.076,3.925,15,1.338l-2.777.36Z" transform="translate(0 0)"/>
                              <path className="cl-icon-verified-2" d="M6.286,10.714l2.857,2.857,5.714-5.714" transform="translate(-0.571 -0.714)"/>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="rcol"><h6>VERIFIED</h6></div>
                    </div>
                    <p>Only show trainers who have been verified via a background check</p>
                  </div>
                </div>
                </div>
              <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10 uk-width-small-2-10">
                <div className="cl-sd-switchOuter">
                  <label className="cl-sd-switch" htmlFor="checkbox2" onChange={this.handleVerfiedChange}>
                    <input type="checkbox" id="checkbox2"/>
                    <div className="cl-sd-slider cl-sd-round"/>
                  </label>
                </div>
              </div>

            </div>
            <div className="uk-grid uk-dropdown-grid sr-subnav-borderbottom">
              <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-8-10 uk-width-small-8-10 ">
                <div className="uk-align-left">
                  <div className="sr-dd-show">
                    <h6>{p.t('TrainerFilters.travel')}</h6>
                    <p>{p.t('TrainerFilters.travelLabel')}</p>
                  </div>
                </div>
              </div>

              <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10 uk-width-small-2-10">
                <div className="cl-sd-switchOuter">
                  <label className="cl-sd-switch" htmlFor="checkbox3">
                    <input type="checkbox" id="checkbox3" name="canTravel" checked={canTravel === appConstants.canTravel.Yes} onChange={this.handleCanTravelChange}/>
                    <div className="cl-sd-slider cl-sd-round"/>
                  </label>
                </div>
              </div>

            </div>
            <div className="uk-grid uk-dropdown-grid sr-subnav-borderbottom">

              <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-8-10 uk-width-small-8-10 ">
                <div className="uk-align-left">
                  <div className="sr-dd-show">
                    <h6>{p.t('TrainerFilters.instantBook')}</h6>
                    <p>{p.t('TrainerFilters.instantBookHeader')}</p>
                  </div>
                </div>
              </div>

              <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10 uk-width-small-2-10">
                <div className="cl-sd-switchOuter">
                  <label className="cl-sd-switch" htmlFor="checkbox4">
                    <input type="checkbox" id="checkbox4" name="instantBook" checked={instantBook === appConstants.instantBook.Yes} onChange={this.handleInstantBookChange}/>
                    <div className="cl-sd-slider cl-sd-round"/>
                  </label>
                </div>
              </div>

            </div> */}
            <div className="uk-dropdown-grid">
              <div className="uk-width-1-1">
                <a className="sr-dd-searchlink" onClick={this.handleSearchFilter}>{p.t('TrainerFilters.btnSearch')}</a>
                <a className="sr-dd-cancellink" onClick={this.handleResetFilters}>{p.t('TrainerFilters.btnReset')}</a>
              </div>

            </div>
          </div>
        </div>
      </li>

    );
  }
}

TrainerFilters.propTypes = {
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  query: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

TrainerFilters.defultProps = {
  dropdownClasses: UK_BUTTON_DROPDOWN
};

const mapStateToProps = state => {
  const {router} = state;

  return {
    query: router.query
  };
};

export default withRouter(connect(mapStateToProps)(translate(TrainerFilters)));

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import QueryString from 'query-string';

import appConstants from '../../constants/appConstants';
import {convertToArray} from '../../utils/sspSearchUtils';

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
      canTravel: (canTravel) ? canTravel : null
    };

    this.handleResetGender = this.handleResetGender.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);
    this.handleTrainerTypeChange = this.handleTrainerTypeChange.bind(this);
    this.renderTrainerTypeList = this.renderTrainerTypeList.bind(this);
    this.handleSessionTypeChange = this.handleSessionTypeChange.bind(this);
    this.renderTrainingSessionsList = this.renderTrainingSessionsList.bind(this);
    this.renderYearOfPlayingExperienceList = this.renderYearOfPlayingExperienceList.bind(this)
    this.handleYearOfExperienceChange = this.handleYearOfExperienceChange.bind(this);
    this.handleYearOfPlayingExperienceChange = this.handleYearOfPlayingExperienceChange.bind(this);
    this.renderYearOfTrainingExperienceList = this.renderYearOfTrainingExperienceList.bind(this);
    this.handleInstantBookChange = this.handleInstantBookChange.bind(this);
    this.handleIsCertifiedChange = this.handleIsCertifiedChange.bind(this);
    this.handleCanTravelChange = this.handleCanTravelChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {query} = newProps;
    const trainerGender = query[filterQueries.trainerGenderParam];
    const trainerTypes = query[filterQueries.trainerTypesParam];
    const sessionTypes = query[filterQueries.sessionTypesParam];
    const instantBook = query[filterQueries.instantBookParam];
    const isCertified = query[filterQueries.isCertifiedParam];
    const canTravel = query[filterQueries.canTravelParam];
    const yearOfCoachingExperiences = query[filterQueries.yearOfTrainingExperienceParam];
    const yearOfPlayingExperiences = query[filterQueries.yearOfPlayingExperienceParam];
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

  handleSearchFilter() {
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
    console.log('Called IsCertified Event::', event.target.checked);

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
    console.log('Called Session type :: ', value);

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

  handleYearOfPlayingExperienceChange(event) {
    const {value, checked} = event.target;
    const {yearOfPlayingExperiences} = this.state;
    const yearOfPlayingExperiencesFilterSet = new Set([...yearOfPlayingExperiences]);
    if (checked) {
      yearOfPlayingExperiencesFilterSet.add(value);
    } else {
      yearOfPlayingExperiencesFilterSet.delete(value);
    }
    this.setState({yearOfPlayingExperiences: [...yearOfPlayingExperiencesFilterSet]});
  }

  renderTrainerTypeList(trainingType, i) {
    const {name, description} = trainingType;
    const {trainerTypes} = this.state;
    const checked = trainerTypes.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'mobtrainingType' + i} type="checkbox" name="mobtrainingTypes" value={name} checked={checked} onChange={this.handleTrainerTypeChange}/>
        <label htmlFor={'mobtrainingType' + i}>{description}</label>
      </span>
    );
  }

  renderTrainingSessionsList(trainingSession, i) {
    const {name, description} = trainingSession;
    const {sessionTypes} = this.state;
    const checked = sessionTypes.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'mobsessionType' + i} type="checkbox" name="mobsessionTypes" value={name} checked={checked} onChange={this.handleSessionTypeChange}/>
        <label htmlFor={'mobsessionType' + i}>{description}</label>
      </span>
    );
  }

  renderYearOfTrainingExperienceList(yearOfExperience, i) {
    const {name, description} = yearOfExperience;
    const {yearOfCoachingExperiences} = this.state;
    const checked = yearOfCoachingExperiences.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'mobyearOftrainingExperience' + i} type="checkbox" name="mobyearOftrainingExperience" value={name} checked={checked} onChange={this.handleYearOfExperienceChange}/>
        <label htmlFor={'mobyearOftrainingExperience' + i}>{description}</label>
      </span>
    );
  }

  renderYearOfPlayingExperienceList(yearOfPlayingExperience, i) {
    const {name, description} = yearOfPlayingExperience;
    const {yearOfPlayingExperiences} = this.state;
    const checked = yearOfPlayingExperiences.includes(name);
    return (
      <span key={i}>
        <input className="optioncheckbox" id={'mobyearOfPlayingExperience' + i} type="checkbox" name="mobyearOfPlayingExperience" value={name} checked={checked} onChange={this.handleYearOfPlayingExperienceChange}/>
        <label htmlFor={'mobyearOfPlayingExperience' + i}>{description}</label>
      </span>
    );
  }

  render() {
    const {p} = this.props;
    const {trainerGender, instantBook, isCertified, canTravel} = this.state;
    return (
      <div id="cl-sr-trainermenu" className="uk-offcanvas">
        <div className="uk-offcanvas-bar">
          <div className="uk-accordion-content">
            <h3>{p.t('TrainerFilters.filterHeader')}</h3>
            <div className="uk-width-1 sr-subnav-borderbottom">
              <div className="cl-sr-dropdown-gender">
                <h5>{p.t('TrainerFilters.gender')}</h5>
                <div className="cl-sr-selectgender">
                  <input id="mgender4" name="gender" type="radio" checked={trainerGender === null} onChange={this.handleResetGender}/>
                  <label htmlFor="mgender4">{p.t('TrainerFilters.genderAny')}</label>
                </div>
                <div className="cl-sr-selectgender">
                  <input id="mgender5" name="gender" type="radio" checked={trainerGender === appConstants.genders.Male} value={appConstants.genders.Male} onChange={this.handleGenderChange}/>
                  <label htmlFor="mgender5">{p.t('TrainerFilters.male')}</label>
                </div>
                <div className="cl-sr-selectgender">
                  <input id="mgender6" name="gender" type="radio" checked={trainerGender === appConstants.genders.Female} value={appConstants.genders.Female} onChange={this.handleGenderChange}/>
                  <label htmlFor="mgender6">{p.t('TrainerFilters.female')}</label>
                </div>
              </div>
            </div>
            <div className="uk-width-1 cl-sr-checklist sr-subnav-borderbottom">
              <h5>{p.t('TrainerFilters.typeOfTrainer')}</h5>

              {/*               <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <div className="tandc cl-sd-preferences-settings">
                  {
                    appConstants.trainerTypeList.map(this.renderTrainerTypeList)
                  }
                </div>
              </div> */}

            </div>
            <div className="uk-width-1 cl-sr-checklist sr-subnav-borderbottom">
              <h5>{p.t('TrainerFilters.trainingSessionType')}</h5>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <div className="tandc cl-sd-preferences-settings">
                  {
                    appConstants.trainerSessionList.map(this.renderTrainingSessionsList)
                  }

                </div>
              </div>
            </div>

            <div className="uk-width-1 cl-sr-checklist sr-subnav-borderbottom">
              <h5>{p.t('TrainerFilters.trainingExperience')}</h5>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <div className="tandc cl-sd-preferences-settings">
                  {
                    appConstants.yearOfTrainingExperienceList.map(this.renderYearOfTrainingExperienceList)
                  }

                </div>
              </div>
            </div>
            <div className="uk-width-1 cl-sr-checklist sr-subnav-borderbottom">
              <h5>{p.t('TrainerFilters.playingExperience')}</h5>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <div className="tandc cl-sd-preferences-settings">
                  {
                    appConstants.yearOfPlayingExperienceList.map(this.renderYearOfPlayingExperienceList)
                  }

                </div>
              </div>
            </div>
            <div className="uk-width-1 sr-subnav-borderbottom cl-sr-leftspace">
              <div className="uk-grid">
                <div className="cl-sr-leftcont">
                  <div className="sr-dd-show">
                    <h5>{p.t('TrainerFilters.certifications')}</h5>
                    <p>{p.t('TrainerFilters.certificationsLabel')}</p>
                  </div>
                </div>
                <div className="cl-sr-rightcont">
                  <div className="cl-sd-switchOuter">
                    <label className="cl-sd-switch" htmlFor="selectcheckbox" >
                      <input type="checkbox" id="selectcheckbox" name="mobisCertified" checked={isCertified === appConstants.isCertified.Yes} onChange={this.handleIsCertifiedChange}/>
                      <div className="cl-sd-slider cl-sd-round"/>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/*             <div className="uk-width-1 sr-subnav-borderbottom cl-sr-leftspace">
              <div className="uk-grid">
                <div className="cl-sr-leftcont">
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
                <div className="cl-sr-rightcont">
                  <div className="cl-sd-switchOuter">
                    <label className="cl-sd-switch" htmlFor="selectcheckbox1">
                      <input type="checkbox" id="selectcheckbox1"/>
                      <div className="cl-sd-slider cl-sd-round"/>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="uk-width-1 sr-subnav-borderbottom cl-sr-leftspace">
              <div className="uk-grid">
                <div className="cl-sr-leftcont">
                  <div className="sr-dd-show">
                    <h5>TRAVEL</h5>
                    <p>Show me sports service providers who are willing to travel to my location</p>
                  </div>
                </div>
                <div className="cl-sr-rightcont">
                  <div className="cl-sd-switchOuter">
                    <label className="cl-sd-switch" htmlFor="selectcheckbox2">
                      <input type="checkbox" id="selectcheckbox2"/>
                      <div className="cl-sd-slider cl-sd-round"/>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-width-1 sr-subnav-borderbottom cl-sr-leftspace">
              <div className="uk-grid">
                <div className="cl-sr-leftcont">
                  <div className="sr-dd-show">
                    <h5>INSTANT BOOK</h5>
                    <p>Only show trainers who automatically accept booking requests</p>
                  </div>
                </div>
                <div className="cl-sr-rightcont">
                  <div className="cl-sd-switchOuter">
                    <label className="cl-sd-switch" htmlFor="selectcheckbox3">
                      <input type="checkbox" id="selectcheckbox3"/>
                      <div className="cl-sd-slider cl-sd-round"/>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          */}
            <div className="uk-width-1 sr-subnav-borderbottom">
              <a className="sr-dd-searchlink" onClick={this.handleSearchFilter}>{p.t('TrainerFilters.btnSearch')}</a>
            </div>
            <div className="uk-width-1">
              <a className="sr-dd-cancellink" onClick={this.handleResetFilters}>{p.t('TrainerFilters.btnReset')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrainerFilters.propTypes = {
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  query: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

TrainerFilters.defultProps = {

};

const mapStateToProps = state => {
  const {router} = state;

  return {
    query: router.query
  };
};

export default withRouter(connect(mapStateToProps)(translate(TrainerFilters)));

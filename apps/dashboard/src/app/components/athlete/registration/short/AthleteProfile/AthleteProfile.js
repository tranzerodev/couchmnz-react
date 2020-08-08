import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import DatePicker from 'react-datetime';
import moment from 'moment';

import {PROFILE, DASHBOARD} from '../../../../../constants/pathConstants';
import validateProfile from '../../../../../validators/athlete/common/profileShort';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import {saveAthleteShortProfile, fetchSportsList, fetchSkillsList, fetchTrainingList, fetchAthletePreferences} from '../../../../../actions';
import ProfileCompletion from '../../common/ProfileCompletion/ProfileCompletion';
import PreviousLink from '../../common/PreviousLink/PreviousLink';
import NextLink from '../../common/NextLink/NextLink';
import appConstants from '../../../../../constants/appConstants';
const {defaultDateFormat} = appConstants;
import {notNull, isNonEmptyArray} from '../../../../../validators/common/util';

const today = moment();
const validDateRange = function (current) {
  return current.isBefore(today);
};

class Profile extends Component {
  constructor(props) {
    super(props);
    const {profile, preferences} = this.props;
    this.handleGender = this.handleGender.bind(this);
    this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
    this.submitForm = this.submitForm.bind(this);

    /* Preferences */
    const {id} = preferences.status === FULFILLED ? preferences.data : {id: null};
    const isSportSet = notNull(id);
    if (isSportSet) {
      props.fetchTrainingList(id);
    }

    this.state = {
      profile: profile.status === FULFILLED ? profile.data : {
        id: '',
        firstName: null,
        lastName: null,
        gender: null,
        dob: null,
        profileImage: null,
        country: {
          id: null,
          name: null
        },
        grade: null,
        height: {
          unit: null,
          value: null
        },
        weight: {
          unit: null,
          value: null
        }
      },
      sport: {
        id: null,
        name: null,
        specializations: [],
        yearOfExperience: null,
        skillLevel: {
          id: null,
          name: null
        },
        notes: null,
        preferences: {
          sspSubTypes: [],
          otherTypes: [],
          trainerGenders: [],
          travelPref: {
            distance: null,
            unit: null,
            travelFrom: {
              address: null,
              latlon: {
                lat: null,
                lon: null
              }
            }
          }
        }
      },
      sportName: name,
      isSportSet,
      visibleSports: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'none',
      arrowSports: 'block',
      clearSports: 'none',
      filteredSports: []
    };
    this.handleSelectSports = this.handleSelectSports.bind(this);
    this.handleListSpecializations = this.handleListSpecializations.bind(this);
    this.handleUpdateSpecialization = this.handleUpdateSpecialization.bind(this);
    this.handleClickSports = this.handleClickSports.bind(this);
    this.handleSearchSpecialization = this.handleSearchSpecialization.bind(this);
    this.handleChangeSports = this.handleChangeSports.bind(this);
    this.handleAddSpecialization = this.handleAddSpecialization.bind(this);
    this.handleDoneSports = this.handleDoneSports.bind(this);
    this.handleFocusSports = this.handleFocusSports.bind(this);
    this.handleBlurSports = this.handleBlurSports.bind(this);
    this.handleClearSports = this.handleClearSports.bind(this);
    this.isExistingSpecialization = this.isExistingSpecialization.bind(this);
    this.isCheckedSpecialization = this.isCheckedSpecialization.bind(this);
    this.renderSpecializations = this.renderSpecializations.bind(this);
    this.handleExperience = this.handleExperience.bind(this);
    this.handleSkillLevel = this.handleSkillLevel.bind(this);
    this.renderGender = this.renderGender.bind(this);
    this.renderDOB = this.renderDOB.bind(this);
    this.renderSports = this.renderSports.bind(this);
    this.renderExperience = this.renderExperience.bind(this);
    this.renderSkills = this.renderSkills.bind(this);
    this.handleUpdateSport = this.handleUpdateSport.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.preferences.status === PENDING &&
      nextProps.preferences.status === FULFILLED) {
      const {preferences} = nextProps;
      console.log('preferences', preferences);
      this.setState({
        sport: preferences.data
      });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.sportsList && this.props.sportsList.data && this.props.sportsList.data.length === 0) {
      this.props.fetchSportsList();
    }
    this.props.fetchSkillsList();
  }
  handleValidation(profile) {
    return {
      valid: Boolean(profile)
    };
  }
  submitForm() {
    const {profile, sport} = this.state;
    const validation = validateProfile(profile, sport);
    this.setState({
      submitted: true,
      validation
    });
    return validation.valid;
  }
  handleProfileUpdate(data) {
    const {profile} = this.state;
    this.setState({
      profile: {
        ...profile,
        ...data
      }
    });
  }

  handleGender(e) {
    const {value} = e.target;
    this.handleProfileUpdate({
      gender: value
    });
  }
  handleDateOfBirth(e) {
    const {_d} = e;
    this.handleProfileUpdate({
      dob: _d
    });
  }

  handleSelectSports(e) {
    const {isSportSet} = this.state;
    if (!isSportSet) {
      const item = this.handleListSpecializations(e.currentTarget.getAttribute('value'));
      const {sport} = this.state;
      const id = e.currentTarget.getAttribute('value');
      console.log('handleSelectSport', 'spec', this.props.sportsList.data[item].specializations);
      this.props.fetchTrainingList(id);
      this.setState({
        visibleSports: 'none',
        visibleAddSpecialization: isNonEmptyArray(this.props.sportsList.data[item].specializations) ? 'block' : 'none',
        sportName: e.currentTarget.textContent,
        item,
        sport: {
          ...sport,
          id,
          name: e.currentTarget.textContent
        },
        showOtherTypes: false
      });
    }
  }

  handleListSpecializations(id) {
    return this.props.sportsList.data.findIndex(sport => sport.id === id);
  }
  handleSpecializationSearch(specializations, id) {
    return specializations.findIndex(specialization => specialization.id === id) >= 0;
  }
  handleUpdateSpecialization(specialization) {
    const {id, checked} = specialization;
    const {sport} = this.state;
    let specializations = sport.specializations ? sport.specializations : [];
    if (checked) {
      if (!this.handleSpecializationSearch(specializations, id)) {
        const {id, name} = specialization;
        specializations = Object.assign([], specializations.concat({
          id,
          name
        }));
      }
    } else {
      specializations = Object.assign([], specializations.filter(spec => spec.id !== specialization.id));
    }
    this.handleUpdateSport({
      specializations
    });
  }
  handleClickSports(e) {
    const {checked, value} = e.currentTarget;
    const exists = this.isExistingSpecialization(value);
    if (!exists) {
      // Console.log('handleClickSports', 'value', value);
      const spec = this.handleSearchSpecialization(value);
      // Console.log('handleClickSports', 'spec', spec);
      this.handleUpdateSpecialization({
        id: value,
        name: spec.name,
        checked
      });
    }
  }
  handleSearchSpecialization(id) {
    const sport = Object.assign({}, this.props.sportsList.data[this.state.item]);
    // Console.log('handleSearchSpecialization', 'sport', sport);
    if (sport.specializations) {
      for (let i = 0; i < sport.specializations.length; i++) {
        if (sport.specializations[i].id === id) {
          return Object.assign({}, sport.specializations[i]);
        }
      }
    }
    return {};
  }
  handleChangeSports(e) {
    console.log('handleChangeSport', this.state);
    const {isSportSet} = this.state;
    if (!isSportSet) {
      this.setState({sportName: e.target.value});
      if (e.target.value === '') {
        this.setState({
          visibleSports: 'none'
        });
        return;
      }
      this.handleUpdateSport({
        specializations: [],
        id: null,
        name: e.target.value
      });
      const filteredSports = this.findItemsBeginningWith(this.props.sportsList.data, e.target.value).concat(this.findItemsContaining(this.props.sportsList.data, e.target.value));
      this.setState({
        filteredSports: (filteredSports) ? filteredSports : [],
        visibleSports: filteredSports.length > 0 ? 'block' : 'none',
        showOtherTypes: false
      });
    }
  }
  findItemsBeginningWith(items, key) {
    return items.filter(item => item.name.toLowerCase().replace(/ +/g, '').indexOf(key.toLowerCase().replace(/ +/g, '')) === 0);
  }
  findItemsContaining(items, key) {
    return items.filter(item => item.name.toLowerCase().replace(/ +/g, '').indexOf(key.toLowerCase().replace(/ +/g, '')) > 0);
  }
  handleAddSpecialization() {
    this.setState({
      visibleAddSpecialization: this.state.visibleAddSpecialization === 'none' ? 'block' : 'none',
      visibleSpecialization: this.state.visibleSpecialization === 'none' ? 'block' : 'none'
    });
  }
  handleDoneSports() {
    // Let { experience, sports, sportsQuery, specializations } = this.state;
    this.setState({
      visibleAddSpecialization: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'block',
      msgSports: ''
    });
  }
  handleFocusSports() {
    const {isSportSet, sportName} = this.state;
    const {sportsList} = this.props;
    if (!isSportSet && notNull(sportName)) {
      const filteredSports = this.findItemsBeginningWith(sportsList.data, sportName).concat(this.findItemsContaining(sportsList.data, sportName));
      this.setState({
        filteredSports: (filteredSports) ? filteredSports : [],
        visibleSports: this.props.sportsList.data.length > 0 ? 'block' : 'none',
        arrowSports: 'none',
        clearSports: 'block'
      });
    }
  }
  handleBlurSports() {
    /* This.setState({
      arrowSports: 'block',
      clearSports: 'none'
    }); */
  }
  handleClearSports() {
    this.handleUpdateSport({
      id: null,
      name: null,
      specializations: [],
      skillLevel: {
        id: null,
        name: null
      }
    });
    this.setState({
      filteredSports: [],
      visibleSports: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'none',
      arrowSports: 'block',
      clearSports: 'none',
      sportName: '',
      showOtherTypes: false,
      item: 0
    });
    console.log('handleclearSports');
  }
  isExistingSpecialization(value) {
    const {sport} = this.state;
    return sport.specializations.findIndex(specialization => specialization === value) >= 0;
  }
  isCheckedSpecialization(id) {
    const {sport} = this.state;
    if (sport.specializations) {
      for (let i = 0; i < sport.specializations.length; i++) {
        if (sport.specializations[i].id === id) {
          return true;
        }
      }
    }
    return false;
  }
  renderSpecializations(item) {
    const {sportsList} = this.props;

    if (sportsList && sportsList.status === FULFILLED) {
      const sport = this.props.sportsList.data[item];
      if (sport) {
        const {specializations} = sport;
        return specializations.map((spec, i) => {
          return (
            <li key={spec.id} style={{display: this.state.visibleSpecialization}}>
              <input className="optioncheckbox" id={'specialization' + i} type="checkbox" defaultValue={spec.id} checked={this.isCheckedSpecialization(spec.id)} onChange={this.handleClickSports}/>
              <label htmlFor={'specialization' + i}>{spec.name}</label>
            </li>);
        });
      }
    }
  }
  handleExperience(e) {
    const {value} = e.target;
    this.handleUpdateSport({
      yearOfExperience: value
    });
  }
  handleSkillLevel(e) {
    const {value} = e.target;
    const {skillsList} = this.props;
    const index = skillsList.status === FULFILLED ? skillsList.data.findIndex(skill => skill.id === value) : -1;
    const skillLevel = index >= 0 ? skillsList.data[index] : {id: null, name: null};
    const {id, name} = skillLevel;
    this.handleUpdateSport({
      skillLevel: {
        id,
        name
      }
    });
  }

  renderSkillListItem(skill, i) {
    return (
      <option key={i} value={skill.id} name={skill.name}>{skill.name}</option>
    );
  }

  renderGender() {
    const {t} = this.props.p;
    const {profile, sport, submitted} = this.state;
    const validation = validateProfile(profile, sport);
    const {gender} = profile;
    return (
      <div className={validation.gender === false && submitted ? 'field-holder error' : 'field-holder'}>
        <h6 className="uk-padding-remove">{t('AthleteProfile.gender')}</h6>
        <div className="tandc">
          <input className id="gn1" type="radio" name={t('AthleteProfile.genders.M')} value={appConstants.gender.male} checked={gender === appConstants.gender.male} onChange={this.handleGender}/>
          <label htmlFor="gn1">{t('AthleteProfile.genders.M')}</label>
          <input className id="gn2" name={t('AthleteProfile.genders.F')} value={appConstants.gender.female} type="radio" checked={gender === appConstants.gender.female} onChange={this.handleGender}/>
          <label htmlFor="gn2">{t('AthleteProfile.genders.F')}</label>
          <input className id="gn3" type="radio" name={t('AthleteProfile.genders.O')} value={appConstants.gender.other} checked={gender === appConstants.gender.other} onChange={this.handleGender}/>
          <label htmlFor="gn3">{t('AthleteProfile.genders.O')}</label>
          <span className="error-text">{t('AthleteProfile.validation_messages.gender')}</span>
        </div>
      </div>
    );
  }

  renderDOB() {
    const {t} = this.props.p;
    const {profile, sport, submitted} = this.state;
    const validation = validateProfile(profile, sport);
    const {dob} = profile;
    return (
      <div className={validation.dob === false && submitted ? 'field-holder uk-form error' : 'field-holder uk-form'}>
        <label>{t('AthleteProfile.dateOfBirth')}</label>
        <DatePicker
          value={dob ? moment(dob).format(defaultDateFormat) : undefined}
          defaultValue={dob ? moment(dob).format(defaultDateFormat) : undefined}
          viewDate={dob ? dob : new Date(appConstants.defaultViewDate)}
          viewMode={dob ? 'days' : 'years'}
          dateFormat={defaultDateFormat}
          timeFormat={false}
          closeOnSelect
          onChange={this.handleDateOfBirth}
          min={new Date()}
          isValidDate={validDateRange}
          inputProps={{className:'field-required'}}
        />
        <span className="error-text">{t('AthleteProfile.validation_messages.dateOfBirth')}</span>
      </div>
    );
  }

  renderSports() {
    const {t} = this.props.p;
    const {profile, sport, submitted, item} = this.state;
    const {isSportSet, sportName, arrowSports, clearSports, filteredSports, visibleAddSpecialization, visibleSpecialization} = this.state;
    const {specializations} = sport;
    const validation = validateProfile(profile, sport);
    const invalidSport = (submitted && validation.sport === false);
    return (
      <div className="uk-form-inline uk-from-inline-mobile">
        <div className={invalidSport ? 'field-holder error' : 'field-holder'}>
          <label className="uk-form-label uk-form-help-block" htmlFor="typeSport">{t('AthletePreferences.sport')}</label>
          <div className="multiLevelDD">
            <div className="rowOne">
              <input type="text" className="field-required" onChange={this.handleChangeSports} placeholder={t('InputSport.typeSport')} value={sportName} onFocus={this.handleFocusSports} onBlur={this.handleBlurSports}/>
              <span style={{display: isSportSet ? 'none' : arrowSports}} className="arrowIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591">
                  <g transform="translate(-962.105 -6007)">
                    <path data-name="Path 148" className="cl-icon-arrow-down-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/>
                  </g>
                </svg>
              </span>
              <a style={{display: clearSports}} onClick={this.handleClearSports} className="clearIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1322 -5229 12 12">
                  <g transform="translate(-1899 -5702)">
                    <path data-name="Path 161" className="icon-close-small-1" d="M8.977-3.234a.481.481,0,0,0-.148-.352L7.414-5,8.828-6.414a.481.481,0,0,0,.148-.352.489.489,0,0,0-.148-.359l-.7-.7a.489.489,0,0,0-.359-.148.481.481,0,0,0-.352.148L6-6.414,4.586-7.828a.481.481,0,0,0-.352-.148.489.489,0,0,0-.359.148l-.7.7a.489.489,0,0,0-.148.359.481.481,0,0,0,.148.352L4.586-5,3.172-3.586a.481.481,0,0,0-.148.352.489.489,0,0,0,.148.359l.7.7a.489.489,0,0,0,.359.148.481.481,0,0,0,.352-.148L6-3.586,7.414-2.172a.481.481,0,0,0,.352.148.489.489,0,0,0,.359-.148l.7-.7A.489.489,0,0,0,8.977-3.234ZM11.2-8.012A5.869,5.869,0,0,1,12-5a5.869,5.869,0,0,1-.8,3.012A5.973,5.973,0,0,1,9.012.2,5.869,5.869,0,0,1,6,1,5.869,5.869,0,0,1,2.988.2,5.973,5.973,0,0,1,.8-1.988,5.869,5.869,0,0,1,0-5,5.869,5.869,0,0,1,.8-8.012,5.973,5.973,0,0,1,2.988-10.2,5.869,5.869,0,0,1,6-11a5.869,5.869,0,0,1,3.012.8A5.973,5.973,0,0,1,11.2-8.012Z" transform="translate(577 484)"/>
                  </g>
                </svg>
              </a>
            </div>
            <ul className="autoFill" style={{display: this.state.visibleSports}}>
              {
                filteredSports.map(sport => <li key={sport.id}><a value={sport.id} onClick={this.handleSelectSports}>{sport.name}</a></li>)
              }
            </ul>
            <div className="rowSpeciality" style={{display: (visibleAddSpecialization === 'block' || visibleSpecialization === 'block' || (specializations && specializations.length)) ? 'block' : 'none'}}>
              <a className="addLink" onClick={this.handleAddSpecialization} style={{display: visibleSpecialization === 'none' && (specializations ? specializations.length === 0 : true) ? 'block' : 'none', textAlign: 'left'}}>{t('InputSport.addSpeciality')}</a>

              <a className="linkValueSpeciality" onClick={this.handleAddSpecialization} style={{display: specializations.length ? 'block' : 'none'}}>
                {
                  specializations.map(spec => spec.name).join(', ')
                }
              </a>

              <h6 className="specialityHead mt10" style={{display: visibleSpecialization}}>{t('InputSport.addSpeciality')}</h6>

              <ul className="checkBoxList" style={{display: visibleSpecialization}}>
                {
                  this.renderSpecializations(item)
                }
                <li className="LastChild" style={{display: visibleSpecialization}}><a onClick={this.handleDoneSports} style={{display: visibleSpecialization}}>{t('InputSport.done')}</a></li>
              </ul>

            </div>
          </div>
          <span className="error-text">{invalidSport ? t('InputSport.validation_messages.sportsName.required') : t('InputSport.validation_messages.sportsName.valid')}</span>
        </div>
      </div>
    );
  }

  renderExperience() {
    const {t} = this.props.p;
    const {profile, sport, submitted} = this.state;
    const {yearOfExperience} = sport;
    const validation = validateProfile(profile, sport);
    return (
      <div className={validation.experience === false && submitted ? 'field-holder error' : 'field-holder'}>
        <label>{t('AthletePreferences.experience')}</label>
        <input type="number" name className="uk-form-controls field-required" placeholder={t('AthletePreferences.enterYears')} value={yearOfExperience} onChange={this.handleExperience}/>
        <span className="error-text">{t('AthletePreferences.validation_messages.experience')}</span>
      </div>
    );
  }

  renderSkills() {
    const {t} = this.props.p;
    const {skillsList} = this.props;
    const {profile, sport, submitted} = this.state;
    const validation = validateProfile(profile, sport);
    const {skillLevel} = sport;
    return (
      <div className={validation.skillLevel === false && submitted ? 'field-holder error' : 'field-holder'}>
        <label>{t('AthletePreferences.level')}</label>
        <select className="uk-form-controls field-required" value={skillLevel.id} name={skillLevel.name} onChange={this.handleSkillLevel}>
          <option>{t('AthletePreferences.selectYourLevel')}</option>
          {
            skillsList.status === FULFILLED &&
            skillsList.data.map(this.renderSkillListItem)
          }
        </select>
        <span className="error-text">{t('AthletePreferences.validation_messages.level')}</span>
      </div>
    );
  }

  handleUpdateSport(data) {
    const {sport} = this.state;
    this.setState({
      sport: {
        ...sport,
        ...data
      }
    });
  }

  render() {
    const {t} = this.props.p;
    const {profile, sport} = this.state;
    const data = {profile, sport};
    return (
      <div className>
        <ProfileCompletion short index={0}/>
        {/* END PROFILE TYPE SECTION */}
        {/* START back SECTION */}
        <div className="top-back-sec">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <PreviousLink history={this.props.history} previous={PROFILE}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end back SECTION */}
        {/* START STEP SECTION */}
        <section className="stepSection stepSectionNxt cl-sm-athleteSection ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <h1 className="uk-text-left uk-padding-remove">{t('Welcome.build_your_profile')}</h1>
                <p className>{t('AthleteProfile.message')}</p>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className="buildProfile buildProfileSec">
                  <div className="uk-grid uk-grid-mobile">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                      <div className="uk-form-inline uk-from-inline-mobile">
                        {this.renderGender()}
                      </div>
                    </div>
                  </div>
                  <div className="uk-grid uk-grid-mobile">
                    <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                      {this.renderDOB()}
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                      <h1 className="uk-text-left">{t('AthletePreferences.title')}</h1>
                      <p className="pt0">{t('AthletePreferences.message')}</p>
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                      <div className="buildProfile buildProfileSec">
                        <div className="uk-grid uk-grid-mobile">
                          <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                            <div className="customDropdown">
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                                  {this.renderSports()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="uk-grid uk-grid-mobile">
                          <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                            {this.renderExperience()}
                          </div>
                          <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                            {this.renderSkills()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-text-right">
                <NextLink history={this.props.history} submitForm={this.submitForm} saveData={this.props.saveAthleteShortProfile} data={data} saveType={appConstants.saveType.profile} next={DASHBOARD} buttonText={t('NextLink.next')}/>
              </div>
            </div>
          </div>
        </section>
        {/* END STEP SECTION */}
      </div>
    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profile: PropTypes.object.isRequired,
      preferences: PropTypes.object,
      saveAthleteShortProfile: PropTypes.func.isRequired,
      sportsList: PropTypes.object.isRequired,
      skillsList: PropTypes.object,
      fetchSportsList: PropTypes.func.isRequired,
      fetchSkillsList: PropTypes.func.isRequired,
      fetchAthletePreferences: PropTypes.func.isRequired,
      fetchTrainingList: PropTypes.func.isRequired
    };
  }
}

Profile.defaultProps = {
  preferences: {
    yearOfExperience: null,
    skillLevel: {
      id: null,
      name: null
    }
  },
  skillsList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {sportsList, sport, profile, preferences, skillsList} = state;
  return {
    sport,
    profile,
    preferences,
    sportsList,
    skillsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSportsList: () => dispatch(fetchSportsList()),
    fetchSkillsList: () => dispatch(fetchSkillsList()),
    fetchTrainingList: currentSportId => dispatch(fetchTrainingList(currentSportId)),
    fetchAthletePreferences: params => dispatch(fetchAthletePreferences(params)),
    saveAthleteShortProfile: params => dispatch(saveAthleteShortProfile(params))
  };
};

const AthleteProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default translate(AthleteProfile);

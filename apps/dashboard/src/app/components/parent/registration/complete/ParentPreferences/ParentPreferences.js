import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import {fetchSportsList, fetchSkillsList, fetchTrainingList, saveParentPreferences, fetchParentPreferences, clearParentPreferences, activateParentProfile, changeProfile} from '../../../../../actions';
import validatePreferences from '../../../../../validators/parent/common/preferences';
import {REGISTRATION_PARENT_ACCOUNT, REGISTRATION_PARENT_PROFILE} from '../../../../../constants/pathConstants';
import ProfileCompletion from '../../common/ProfileCompletion/ProfileCompletion';
import PreviousLink from '../../common/PreviousLink/PreviousLink';
import {notNull, isNonEmptyArray} from '../../../../../validators/common/util';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
// Import NextLink from '../../common/NextLink/NextLink';
import NextLink from '../../../common/SaveLink';
import appConstants from '../../../../../constants/appConstants';
import {kilometresToMiles} from '../../../../../utils/coverter';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import Modal from '../../../../common/Modal';
import RegCompleteModal from '../../common/RegCompleteModal/RegCompleteModal';
import QueryString from 'query-string';
import moment from 'moment';
import {SEARCH_URL} from '../../../../../constants/WebConstants';

/* eslint complexity: 0 */
class Preferences extends Component {
  constructor(props) {
    super(props);
    const {preferences, sportsList} = props;
    const {id, name} = preferences.status === FULFILLED ? preferences.data : {id: null, name: ''};
    const isSportSet = notNull(id);
    const item = isSportSet ? sportsList.data.findIndex(sportItem => sportItem.id === id) : 0;
    if (isSportSet) {
      props.fetchTrainingList(id);
    }
    this.state = {
      sport: notNull(id) ? preferences.data : {
        id: null,
        name: null,
        specializations: [],
        yearOfExperience: null,
        skillLevel: {
          id: null,
          description: null
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
      filteredSports: [],

      visibleSports: appConstants.displayTypes.none,
      visibleSpecialization: appConstants.displayTypes.none,
      addAnotherSport: appConstants.displayTypes.none,

      showSpecializations: true,
      item,
      arrowSports: appConstants.displayTypes.block,
      clearSports: appConstants.displayTypes.none,
      sportName: name,
      showOtherTypes: isSportSet ? preferences.data.preferences.otherTypes.length > 0 : false,
      submitted: false,
      isAllChecked: false,
      isSportSet,
      isOpenCongratsModal: false
    };
    this.submitForm = this.submitForm.bind(this);
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
    this.handleNotes = this.handleNotes.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleUpdateSport = this.handleUpdateSport.bind(this);
    this.handleTraining = this.handleTraining.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
    this.handleDistanceUnit = this.handleDistanceUnit.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleShowOtherTypes = this.handleShowOtherTypes.bind(this);
    this.handleServices = this.handleServices.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.profile.status === PENDING &&
      nextProps.profile.status === FULFILLED) {
      if (nextProps.preferences.status !== FULFILLED && nextProps.preferences.status !== PENDING && nextProps.profile.status !== REJECTED && isNonEmptyArray(nextProps.profile.data.sports)) {
        const sportId = nextProps.preferences.data.id ? nextProps.preferences.data.id : nextProps.profile.data.sports[0].id;
        this.props.fetchParentPreferences({parentId: nextProps.profile.data.parentId, childId: nextProps.profile.data.id, sportId});
        this.props.fetchTrainingList(sportId);
      }
    }
    if (this.props.preferences.status === PENDING &&
      nextProps.preferences.status === FULFILLED) {
      const {preferences} = nextProps;
      console.log('preferences', preferences);
      this.setState({
        sport: preferences.data,
        sportName: preferences.data.name,
        specializations: preferences.data.specializations,
        showOtherTypes: preferences.data.preferences.otherTypes.length > 0
      });
    }
    if (this.props.preferencesStatus.status === PENDING &&
      nextProps.preferencesStatus.status === FULFILLED) {
      const {profile, userProfiles} = nextProps;
      if (userProfiles.selectedProfile && isNonEmptyArray(userProfiles.selectedProfile.dependents)) {
        if (userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active && userProfiles.selectedProfile.dependents[0].isActive === appConstants.profileActiveFlages.inactive) {
          nextProps.activateParentProfile({parentId: profile.data.parentId, childId: profile.data.id});
        } else if (userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active && userProfiles.selectedProfile.dependents[0].isActive === appConstants.profileActiveFlages.active) {
          this.handleOpenModal();
          // This.props.history.push(DASHBOARD_LINK);
        } else if (userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.inactive) {
          this.props.history.push(REGISTRATION_PARENT_ACCOUNT);
        }
      }
    }
  }
  componentDidUpdate(preProps) {
    if (preProps.userProfiles.status !== FULFILLED && this.props.userProfiles.status === FULFILLED) {
      const profileId = preProps.userProfiles.selectedProfile && preProps.userProfiles.selectedProfile.id ? preProps.userProfiles.selectedProfile.dependentId : null;
      const profile = this.props.userProfiles.data.find(profile => profile.type === appConstants.userProfileTypes.PARENT);
      if (profile && isNonEmptyArray(profile.dependents) && profileId) {
        const dependent = profile.dependents.find(i => i.id === profileId);
        this.props.changeProfile({...profile, dependents: [dependent], dependentId: dependent.id});
      } else {
        this.props.changeProfile({...profile, dependents: [profile.dependents[0]]});
      }
    }
    if (preProps.userProfiles.selectedProfile && isNonEmptyArray(preProps.userProfiles.selectedProfile.dependents) &&
          preProps.userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active &&
            preProps.userProfiles.selectedProfile.dependents[0].isActive !== this.props.userProfiles.selectedProfile.dependents[0].isActive) {
      this.handleOpenModal();
      // This.props.history.push(DASHBOARD_LINK);
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.sportsList && this.props.sportsList.data && this.props.sportsList.data.length === 0) {
      this.props.fetchSportsList();
    }
    if (this.props.profile.status === FULFILLED) {
      if (!isNonEmptyArray(this.props.profile.data.sports)) {
        this.props.clearParentPreferences();
      }
    }
    if (this.props.skillsList.status !== FULFILLED && this.props.skillsList.status !== PENDING) {
      this.props.fetchSkillsList();
    }
    const {profile, preferences} = this.props;
    if (preferences.status !== FULFILLED && preferences.status !== PENDING && profile.status !== REJECTED && isNonEmptyArray(profile.data.sports)) {
      const sportId = preferences.data.id ? preferences.data.id : profile.data.sports[0].id;
      this.props.fetchParentPreferences({parentId: profile.data.parentId, childId: profile.data.id, sportId});
      this.props.fetchTrainingList(sportId);
    }
  }
  submitForm() {
    const {sport} = this.state;
    const validation = validatePreferences(sport);
    this.setState({
      submitted: true,
      validation
    });
    return validation.valid;
  }
  handleSelectSports(e) {
    const {isSportSet} = this.state;
    if (!isSportSet) {
      const item = this.handleListSpecializations(e.currentTarget.getAttribute('value'));
      const {sport} = this.state;
      const id = e.currentTarget.getAttribute('value');
      this.props.fetchTrainingList(id);
      this.setState({
        visibleSports: appConstants.displayTypes.none,
        visibleAddSpecialization: isNonEmptyArray(this.props.sportsList.data[item].specializations) ? appConstants.displayTypes.block : appConstants.displayTypes.none,
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
          description: name
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
      const spec = this.handleSearchSpecialization(value);
      this.handleUpdateSpecialization({
        id: value,
        name: spec.name,
        checked
      });
    }
  }
  handleSearchSpecialization(id) {
    const sport = Object.assign({}, this.props.sportsList.data[this.state.item]);
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
    const {isSportSet} = this.state;
    if (!isSportSet) {
      this.setState({sportName: e.target.value});
      if (e.target.value === '') {
        this.setState({
          visibleSports: appConstants.displayTypes.none
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
        filteredSports,
        visibleSports: filteredSports.length > 0 ? appConstants.displayTypes.block : appConstants.displayTypes.none,
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
      visibleAddSpecialization: this.state.visibleAddSpecialization === appConstants.displayTypes.none ? appConstants.displayTypes.block : appConstants.displayTypes.none,
      visibleSpecialization: this.state.visibleSpecialization === appConstants.displayTypes.none ? appConstants.displayTypes.block : appConstants.displayTypes.none
    });
  }
  handleDoneSports() {
    // Let { experience, sports, sportsQuery, specializations } = this.state;
    this.setState({
      visibleAddSpecialization: appConstants.displayTypes.none,
      visibleSpecialization: appConstants.displayTypes.none,
      addAnotherSport: appConstants.displayTypes.block,
      msgSports: ''
    });
  }
  handleFocusSports() {
    const {isSportSet, sportName} = this.state;
    if (!isSportSet && notNull(sportName)) {
      const filteredSports = this.findItemsBeginningWith(this.props.sportsList.data, sportName).concat(this.findItemsContaining(this.props.sportsList.data, sportName));
      this.setState({
        filteredSports,
        visibleSports: this.props.sportsList.data.length > 0 ? appConstants.displayTypes.block : appConstants.displayTypes.none,
        arrowSports: appConstants.displayTypes.none,
        clearSports: appConstants.displayTypes.block
      });
    }
  }
  handleBlurSports() {
    /* This.setState({
      arrowSports: appConstants.displayTypes.block,
      clearSports: appConstants.displayTypes.none
    }); */
  }
  handleClearSports() {
    this.handleUpdateSport({
      id: null,
      name: null,
      specializations: []
    });
    this.setState({
      filteredSports: [],
      visibleSports: appConstants.displayTypes.none,
      visibleSpecialization: appConstants.displayTypes.none,
      addAnotherSport: appConstants.displayTypes.none,
      arrowSports: appConstants.displayTypes.block,
      clearSports: appConstants.displayTypes.none,
      sportName: '',
      showOtherTypes: false,
      item: 0
    });
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
        description: name
      }
    });
  }
  handleNotes(e) {
    const {value} = e.target;
    this.handleUpdateSport({
      notes: value
    });
  }
  handleGender(e) {
    const {value} = e.target;
    const {preferences} = this.state.sport;
    this.handleUpdateSport({
      preferences: {
        ...preferences,
        trainerGenders: [value]
      }
    });
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
  handleServices(e) {
    const {name, value, checked} = e.target;
    const {sport} = this.state;
    const {preferences} = sport;
    const {otherTypes} = preferences;
    this.handleUpdateSport({
      preferences: {
        ...preferences,
        otherTypes: checked ? [...otherTypes, {id: value, name}] : otherTypes.filter(type => type.id !== value && type.name !== name)
      }
    });
  }
  handleTraining(e) {
    const {trainingList} = this.props;
    const {name, value, checked} = e.target;
    const {sport} = this.state;
    const {preferences} = sport;
    const {sspSubTypes} = preferences;
    if (value === appConstants.all) {
      if (checked) {
        this.handleUpdateSport({
          preferences: {
            ...preferences,
            sspSubTypes: trainingList.data
          }
        });
        this.setState({isAllChecked: true});
      } else {
        this.handleUpdateSport({
          preferences: {
            ...preferences,
            sspSubTypes: []
          }
        });
        this.setState({isAllChecked: false});
      }
    } else {
      const isAllChecked = checked && sspSubTypes.length === trainingList.data.length - 1;
      this.setState({isAllChecked});
      this.handleUpdateSport({
        preferences: {
          ...preferences,
          sspSubTypes: checked ? [...sspSubTypes, {id: value, name}] : sspSubTypes.filter(type => type.id !== value && type.name !== name)
        }
      });
    }
  }
  handleDistance(e) {
    const {value} = e.target;
    const {preferences} = this.state.sport;
    const {travelPref} = preferences;
    const {unit} = travelPref;
    this.handleUpdateSport({
      preferences: {
        ...preferences,
        travelPref: {
          ...travelPref,
          distance: value,
          unit: notNull(unit) ? unit : appConstants.units.distance.miles
        }
      }
    });
  }
  handleDistanceUnit(e) {
    const {value} = e.target;
    const {preferences} = this.state.sport;
    const {travelPref} = preferences;
    this.handleUpdateSport({
      preferences: {
        ...preferences,
        travelPref: {
          ...travelPref,
          unit: value
        }
      }
    });
  }
  handleAddress(e) {
    const {value} = e.target;
    const {preferences} = this.state.sport;
    const {travelPref} = preferences;
    const {travelFrom} = travelPref;
    this.handleUpdateSport({
      preferences: {
        ...preferences,
        travelPref: {
          ...travelPref,
          travelFrom: {
            ...travelFrom,
            address: value
          }
        }
      }
    });
  }
  handleShowOtherTypes(e) {
    const {checked} = e.target;
    const {sport} = this.state;
    const {preferences} = sport;
    if (checked) {
      this.setState({showOtherTypes: checked});
    } else {
      this.handleUpdateSport({
        preferences: {
          ...preferences,
          otherTypes: []
        }
      });
      this.setState({showOtherTypes: checked});
    }
  }
  handleSave() {}
  onCloseModal() {
    const url = this.handleSearchFilter();
    this.setState({isOpenCongratsModal: false});
    window.location.href = url;
  }
  handleOpenModal() {
    this.setState({isOpenCongratsModal: true});
  }
  getAthleteAge(age) {
    switch (age) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4: return appConstants.searchParams.ages.toddler;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9: return appConstants.searchParams.ages.child;
      case 10:
      case 11:
      case 12: return appConstants.searchParams.ages.preteen;
      case 13:
      case 14:
      case 15:
      case 16:
      case 17: return appConstants.searchParams.ages.adolescent;
      case 18:
      case 19:
      case 20:
      case 21:
      case 22: return appConstants.searchParams.ages.collegiate;
      case 23: return appConstants.searchParams.ages.adult;
      default: return appConstants.searchParams.ages.adult;
    }
  }
  handleSearchFilter() {
    const {account, preferences, profile} = this.props;
    const {athleteGender, athleteAgeGroups, athleteSkillLevels, trainerGenderParam, sessionTypesParam, distanceParam, canTravelParam, yearOfPlayingExperienceParam} = appConstants.filterQueries;
    const {city} = account.data;
    const url = parseUrlTemplate(SEARCH_URL, {city: city && city.name ? city.name : appConstants.masterDataTypes.city});
    const {skillLevel} = preferences.data;
    const {sspSubTypes, trainerGenders, yearOfExperience, travelPref} = preferences.data.preferences;
    const {dob, gender} = profile.data;
    console.log('MOMENT AGE_LABEL', this.getAthleteAge(moment().diff(dob, 'years')));
    const updatedFilters = Object.assign({},
      {
        [sessionTypesParam]: (sspSubTypes.length > 0) ? sspSubTypes.map(i => i.description) : undefined,
        [trainerGenderParam]: (trainerGenders.length > 0 && trainerGenders.indexOf(appConstants.gender.any) < 0) ? trainerGenders : undefined,
        [yearOfPlayingExperienceParam]: yearOfExperience ? yearOfExperience : undefined,
        [athleteAgeGroups]: this.getAthleteAge(moment().diff(dob, 'years')),
        [athleteGender]: gender && gender !== appConstants.gender.any ? gender : undefined,
        [athleteSkillLevels]: (skillLevel && skillLevel.description) ? (skillLevel.description) : undefined,
        [canTravelParam]: travelPref && travelPref.distance > 0 ? appConstants.yes : undefined,
        [distanceParam]: travelPref && travelPref.distance > 0 ? travelPref.distance : undefined
      }
    );
    const search = QueryString.stringify(updatedFilters);
    const searchUrl = url + '&' + search;
    return searchUrl;
  }
  render() {
    const {submitted, sport, item, isSportSet, sportName, showOtherTypes, isAllChecked} = this.state;

    const {id, name, yearOfExperience, skillLevel, notes, preferences, specializations} = sport;

    const {sspSubTypes, otherTypes, trainerGenders, travelPref} = preferences;
    const gender = isNonEmptyArray(trainerGenders) ? trainerGenders[0] : null;
    const {distance, unit, travelFrom} = travelPref;
    const {t} = this.props.p;
    const {skillsList, trainingList, servicesList, profile} = this.props;
    const data = {id, name, specializations, yearOfExperience, skillLevel, notes, preferences: {...preferences, travelPref: {...travelPref, distance: travelPref.unit === appConstants.units.distance.kilometres ? kilometresToMiles(travelPref.distance) : travelPref.distance, unit: appConstants.units.distance.miles}}, parentId: profile.data.parentId, childId: profile.data.id};
    const validation = validatePreferences(sport);
    const invalidSport = (submitted && validation.sport === false);
    return (
      <div className>
        <ProfileCompletion index={1}/>
        <div className="top-back-sec">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <PreviousLink history={this.props.history} previous={REGISTRATION_PARENT_PROFILE}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="stepSection stepSectionNxt cl-sm-athleteSection ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <h1 className="uk-text-left">{t('ParentPreferences.title')}</h1>
                <p className="pt0">{t('ParentPreferences.message')}</p>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">

                <div className="buildProfile buildProfileSec">
                  <div className="customDropdown">

                    <div className="uk-grid uk-grid-mobile">
                      <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                        <div className="uk-form-inline uk-from-inline-mobile">
                          <div className={invalidSport ? 'field-holder error' : 'field-holder'}>
                            <label className="uk-form-label uk-form-help-block" htmlFor="typeSport">{t('ParentPreferences.sport')}</label>
                            <div className="multiLevelDD">
                              <div className="rowOne">
                                <input type="text" className="field-required" onChange={this.handleChangeSports} placeholder={t('InputSport.typeSport')} value={sportName} onFocus={this.handleFocusSports} onBlur={this.handleBlurSports}/>
                                <span style={{display: isSportSet ? appConstants.displayTypes.none : this.state.arrowSports}} className="arrowIcon">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591">
                                    <g transform="translate(-962.105 -6007)">
                                      <path data-name="Path 148" className="cl-icon-arrow-down-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/>
                                    </g>
                                  </svg>
                                </span>
                                <a style={{display: this.state.clearSports}} onClick={this.handleClearSports} className="clearIcon">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1322 -5229 12 12">
                                    <g transform="translate(-1899 -5702)">
                                      <path data-name="Path 161" className="icon-close-small-1" d="M8.977-3.234a.481.481,0,0,0-.148-.352L7.414-5,8.828-6.414a.481.481,0,0,0,.148-.352.489.489,0,0,0-.148-.359l-.7-.7a.489.489,0,0,0-.359-.148.481.481,0,0,0-.352.148L6-6.414,4.586-7.828a.481.481,0,0,0-.352-.148.489.489,0,0,0-.359.148l-.7.7a.489.489,0,0,0-.148.359.481.481,0,0,0,.148.352L4.586-5,3.172-3.586a.481.481,0,0,0-.148.352.489.489,0,0,0,.148.359l.7.7a.489.489,0,0,0,.359.148.481.481,0,0,0,.352-.148L6-3.586,7.414-2.172a.481.481,0,0,0,.352.148.489.489,0,0,0,.359-.148l.7-.7A.489.489,0,0,0,8.977-3.234ZM11.2-8.012A5.869,5.869,0,0,1,12-5a5.869,5.869,0,0,1-.8,3.012A5.973,5.973,0,0,1,9.012.2,5.869,5.869,0,0,1,6,1,5.869,5.869,0,0,1,2.988.2,5.973,5.973,0,0,1,.8-1.988,5.869,5.869,0,0,1,0-5,5.869,5.869,0,0,1,.8-8.012,5.973,5.973,0,0,1,2.988-10.2,5.869,5.869,0,0,1,6-11a5.869,5.869,0,0,1,3.012.8A5.973,5.973,0,0,1,11.2-8.012Z" transform="translate(577 484)"/>
                                    </g>
                                  </svg>
                                </a>
                              </div>
                              <ul className="autoFill" style={{display: this.state.visibleSports}}>
                                {
                                  this.state.filteredSports.map(sport => <li key={sport.id}><a value={sport.id} onClick={this.handleSelectSports}>{sport.name}</a></li>)
                                }
                              </ul>
                              <div className="rowSpeciality" style={{display: (this.state.visibleAddSpecialization === appConstants.displayTypes.block || this.state.visibleSpecialization === appConstants.displayTypes.block || (specializations && specializations.length)) ? appConstants.displayTypes.block : appConstants.displayTypes.none}}>
                                <a className="addLink" onClick={this.handleAddSpecialization} style={{display: this.state.visibleSpecialization === appConstants.displayTypes.none && (specializations ? specializations.length === 0 : true) ? appConstants.displayTypes.block : appConstants.displayTypes.none, textAlign: 'left'}}>{t('InputSport.addSpeciality')}</a>

                                <a className="linkValueSpeciality" onClick={this.handleAddSpecialization} style={{display: specializations.length ? appConstants.displayTypes.block : appConstants.displayTypes.none}}>
                                  {
                                    specializations.map(spec => spec.description).join(', ')
                                  }
                                </a>

                                <h6 className="specialityHead mt10" style={{display: this.state.visibleSpecialization}}>{t('InputSport.addSpeciality')}</h6>

                                <ul className="checkBoxList" style={{display: this.state.visibleSpecialization}}>
                                  {
                                    this.renderSpecializations(item)
                                  }
                                  <li className="LastChild" style={{display: this.state.visibleSpecialization}}><a onClick={this.handleDoneSports} style={{display: this.state.visibleSpecialization}}>{t('InputSport.done')}</a></li>
                                </ul>

                              </div>
                            </div>
                            <span className="error-text">{invalidSport ? t('InputSport.validation_messages.sportsName.required') : t('InputSport.validation_messages.sportsName.valid')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="uk-grid uk-grid-mobile">
                      <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                        <div className={validation.experience === false && submitted ? 'field-holder error' : 'field-holder'}>
                          <label>{t('ParentPreferences.experience')}</label>
                          <input type="text" name className="uk-form-controls" placeholder={t('ParentPreferences.enterYears')} value={yearOfExperience ? yearOfExperience : ''} onChange={this.handleExperience} min={0}/>
                          <span className="error-text">{t('ParentPreferences.validation_messages.experience')}</span>
                        </div>
                      </div>
                      <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                        <div className={validation.skillLevel === false && submitted ? 'field-holder error' : 'field-holder'}>
                          <label>{t('ParentPreferences.level')}</label>
                          <select className="uk-form-controls field-required" value={skillLevel && skillLevel.id ? skillLevel.id : ''} name={skillLevel.name} onChange={this.handleSkillLevel}>
                            <option>{t('ParentPreferences.selectYourLevel')}</option>
                            {
                              skillsList.status === FULFILLED &&
                                skillsList.data.map((skill, i) => <option key={i} value={skill.id} name={skill.name}>{skill.name}</option>)
                            }
                          </select>
                          <span className="error-text">{t('ParentPreferences.validation_messages.level')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="uk-grid uk-grid-mobile">
                      <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                        <div className="field-holder">
                          <label>{t('ParentPreferences.validation_messages.notes')}</label>
                          <textarea className="uk-form-controls uk-form-date" placeholder={t('ParentPreferences.notesExample')} value={notNull(notes) ? notes : ''} onChange={this.handleNotes}/>
                          <span className="error-text">{t('ParentPreferences.validation_messages.notes')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="borderClass"/>
                    {trainingList.status === FULFILLED && isNonEmptyArray(trainingList.data) &&
                      (
                        <div className="uk-grid uk-grid-mobile">
                          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                            <div className="uk-form-inline uk-from-inline-mobile">
                              <div className={validation.sspSubTypes === false && submitted ? 'field-holder error' : 'field-holder'}>
                                <h6 className="uk-padding-remove">{t('ParentPreferences.trainingPref')}</h6>
                                <div className="tandc instructioncheck">
                                  <input className id="trainingAll" type="checkbox" name="all" value={appConstants.all} onChange={this.handleTraining} checked={isAllChecked}/>
                                  <label htmlFor="trainingAll">{t('ParentPreferences.all')}</label>
                                  {
                                    trainingList.data.map((training, i) => {
                                      return (
                                        <span key={i}>
                                          <input className id={'training' + i} value={training.id} type="checkbox" name={training.name} onChange={this.handleTraining} checked={sspSubTypes.findIndex(s => s.id === training.id) >= 0}/>
                                          <label htmlFor={'training' + i}>{training.name}</label>
                                        </span>
                                      );
                                    })
                                  }
                                  <span className="error-text">{t('ParentPreferences.validation_messages.sspSubTypes')}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    {servicesList.status === FULFILLED && isNonEmptyArray(servicesList.data) &&
                      (
                        <div className="uk-grid cl-sm-customInp">
                          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 cl-sm-tandc">
                            <div className="chk-sec">
                              <div className="field-holder">
                                <input className="optioncheckbox" id="level31" type="checkbox" onChange={this.handleShowOtherTypes} checked={showOtherTypes}/>
                                <label className="chechkShow" htmlFor="level31">{t('ParentPreferences.otherTypes')}</label>
                                <div className="after-check-sec" style={{display: showOtherTypes ? appConstants.displayTypes.block : appConstants.displayTypes.none}}>
                                  {/* <p>{t('ParentPreferences.otherTypesExample')} </p> */}
                                  <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10  uk-width-small-1-1 uk-width-mobile">
                                    <div className="field-holder">
                                      <div className="tandc cl-sd-preferences-settings">
                                        {
                                          servicesList.data.map((type, i) => {
                                            return (
                                              <span key={i}>
                                                <input className="optioncheckbox" id={'Other' + i} type="checkbox" name={type.name} value={type.id} onChange={this.handleServices} checked={otherTypes.findIndex(s => s.id === type.id) >= 0}/>
                                                <label htmlFor={'Other' + i}>{type.name}</label>
                                              </span>
                                            );
                                          })
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    <div className="uk-grid uk-grid-mobile">
                      <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                        <div className="uk-form-inline uk-from-inline-mobile">
                          <div className={validation.trainerGenders === false && submitted ? 'field-holder error' : 'field-holder'}>
                            <h6 className="uk-padding-remove">{t('ParentPreferences.serviceProvider')}</h6>
                            <div className="tandc instructioncheck">
                              <input className id="spr1" type="radio" value={appConstants.gender.any} name="gen" onChange={this.handleGender} checked={gender === appConstants.gender.any}/>
                              <label htmlFor="spr1">{t('ParentPreferences.genders.A')}</label>
                              <input className id="spr2" type="radio" value={appConstants.gender.male} name="gen" onChange={this.handleGender} checked={gender === appConstants.gender.male}/>
                              <label htmlFor="spr2">{t('ParentPreferences.genders.M')}</label>
                              <input className id="spr3" type="radio" value={appConstants.gender.female} name="gen" onChange={this.handleGender} checked={gender === appConstants.gender.female}/>
                              <label htmlFor="spr3">{t('ParentPreferences.genders.F')}</label>
                              <span className="error-text">{t('ParentPreferences.validation_messages.gender')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="uk-grid uk-grid-mobile num60">
                      <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                        <label>{t('ParentPreferences.travelPref')}</label>
                      </div>
                      <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                        <div className={validation.distance === false && submitted ? 'field-holder error' : 'field-holder'}>
                          <input type="number" name placeholder={t('ParentPreferences.howFar')} value={distance ? distance : ''} onChange={this.handleDistance} min={0}/>
                          <select className="uk-form-controls uk-form-width-small addon" placeholder value={unit ? unit : ''} onChange={this.handleDistanceUnit}>
                            <option value={appConstants.units.distance.miles}>{t('ParentPreferences.distanceUnits.M')}</option>
                            <option value={appConstants.units.distance.kilometres}>{t('ParentPreferences.distanceUnits.K')}</option>
                          </select>
                          <span className="error-text">{t('ParentPreferences.validation_messages.travelPref')}</span>
                        </div>
                      </div>
                      <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                        <div className={validation.address === false && submitted ? 'field-holder error' : 'field-holder'}>
                          <input type="text" name placeholder={t('ParentPreferences.address')} onChange={this.handleAddress} value={travelFrom && travelFrom.address ? travelFrom.address : ''}/>
                          <span className="error-text">{t('ParentPreferences.validation_messages.address')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-text-right">
                {/* <NextLink history={this.props.history} submitForm={this.submitForm} saveData={this.props.saveParentPreferences} data={data} saveType={appConstants.saveType.sportsSpecific} next={REGISTRATION_PARENT_ACCOUNT} buttonText={t('NextLink.next')}/> */}
                <NextLink submitForm={this.submitForm} saveData={this.props.saveParentPreferences} data={data} saveType={appConstants.saveType.sportsSpecific} onSave={this.handleSave} buttonText={t('NextLink.next')}/>
              </div>
            </div>
          </div>
        </section>
        <Modal isModalOpen={this.state.isOpenCongratsModal} >
          <RegCompleteModal handleClose={this.onCloseModal}/>
        </Modal>
      </div>
    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
      preferences: PropTypes.object,
      account: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      sportsList: PropTypes.object.isRequired,
      skillsList: PropTypes.object,
      trainingList: PropTypes.object,
      servicesList: PropTypes.object,
      fetchSportsList: PropTypes.func.isRequired,
      fetchSkillsList: PropTypes.func.isRequired,
      fetchTrainingList: PropTypes.func.isRequired,
      clearParentPreferences: PropTypes.func.isRequired,
      fetchParentPreferences: PropTypes.func.isRequired,
      changeProfile: PropTypes.func.isRequired,
      activateParentProfile: PropTypes.func.isRequired,
      userProfiles: PropTypes.object,
      saveParentPreferences: PropTypes.func.isRequired,
      preferencesStatus: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}
/* eslint complexity: 0 */

Preferences.defaultProps = {
  preferences: {
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
  skillsList: {data: [], status: null},
  trainingList: {data: [], status: null},
  servicesList: {data: [], status: null},
  userProfiles: {}
};

const mapStateToProps = state => {
  const {sportsList, skillsList, trainingList, servicesList, parent, profile, userProfiles} = state;
  const {preferences, preferencesStatus, account} = parent;
  return {
    sportsList,
    skillsList,
    trainingList,
    servicesList,
    preferences,
    profile,
    preferencesStatus,
    userProfiles,
    account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSportsList: () => dispatch(fetchSportsList()),
    fetchSkillsList: () => dispatch(fetchSkillsList()),
    fetchTrainingList: currentSportId => dispatch(fetchTrainingList(currentSportId)),
    saveParentPreferences: (data, updateType) => dispatch(saveParentPreferences(data, updateType)),
    activateParentProfile: profile => dispatch(activateParentProfile(profile)),
    changeProfile: profile => dispatch(changeProfile(profile)),
    fetchParentPreferences: params => dispatch(fetchParentPreferences(params)),
    clearParentPreferences: () => dispatch(clearParentPreferences())
  };
};

const ParentPreferences = connect(mapStateToProps, mapDispatchToProps)(Preferences);
export default translate(ParentPreferences);

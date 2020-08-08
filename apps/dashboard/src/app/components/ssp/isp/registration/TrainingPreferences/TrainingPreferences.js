import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';

import NextLink from '../../../../common/RegistrationNextLink';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import appConstants from '../../../../../constants/appConstants';
import RequiredNotFilledModal from '../RequiredNotFilledModal';
import validateTrainingPref from '../../../../../validators/ssp/isp/common/trainingPrefrences';
import {
  fetchAgesList,
  fetchTrainingList,
  fetchSkillsList,
  saveTrainingPreferences
} from '../../../../../actions';
import {REGISTRATION_ISP_LISTING} from '../../../../../constants/pathConstants';

class TrainingPreferences extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddSpeciality = this.handleAddSpeciality.bind(this);
    this.handleAges = this.handleAges.bind(this);
    this.handleTraining = this.handleTraining.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleSkillSearch = this.handleItemSearch.bind(this);
    this.handleServices = this.handleServices.bind(this);
    this.renderOtherServices = this.renderOtherServices.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.handleAllLevels = this.handleAllLevels.bind(this);
    this.handleAllAges = this.handleAllAges.bind(this);
    this.handleAllGender = this.handleAllGender.bind(this);
    this.handleAllServices = this.handleAllServices.bind(this);
    const {skillLevels, training, ages, gender, services} = this.props;

    this.state = {
      skillLevels,
      ages,
      genders: gender,
      trainings: training,
      services,
      notFilled: [],
      isNotFilledModalOpen: false
    };
  }
  getNotFilled() {
    const {p} = this.props;
    const {skillLevels, trainings, ages, genders} = this.state;
    const validation = validateTrainingPref({skillLevels, training: trainings, ages, gender: genders});
    const notFilled = [];
    if (validation.skillLevels === false) {
      notFilled.push(p.t('RequiredNotFilledModal.skillLevels'));
    }
    if (validation.gender === false) {
      notFilled.push(p.t('RequiredNotFilledModal.athleteGender'));
    }
    if (validation.training === false) {
      notFilled.push(p.t('RequiredNotFilledModal.training'));
    }
    if (validation.ages === false) {
      notFilled.push(p.t('RequiredNotFilledModal.ages'));
    }

    return notFilled;
  }

  onSubmitForm() {
    const {skillLevels, trainings, ages, genders} = this.state;
    const validation = validateTrainingPref({skillLevels, training: trainings, ages, gender: genders});
    if (validation.valid === false) {
      this.setState({isNotFilledModalOpen: true, notFilled: this.getNotFilled()});
      return false;
    }
    return true;
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchAgesList();
    this.props.fetchSkillsList();
    this.props.fetchTrainingList(this.props.currentSportId);
  }

  handleDisplayOrder(i1, i2) {
    return i1.displayOrder > i2.displayOrder;
  }

  handleSelect(e) {
    this.setState({
      visible: 'none',
      visibleAddSpeciality: 'block',
      sportsQuery: e.currentTarget.textContent
    });
  }

  handleItemSearch(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return Object.assign({}, array[i]);
      }
    }
    return undefined;
  }

  handleClick(e) {
    const skill = this.handleItemSearch(this.props.skillsList.data, e.target.value);
    const {skillLevels} = this.state;
    if (e.target.checked === true) {
      skillLevels.push(skill);
    } else {
      const id = skill.id;
      const index = skillLevels.findIndex(skill => skill.id === id);
      if (index > -1) {
        skillLevels.splice(index, 1);
      }
    }
    this.setState({skillLevels});
  }

  handleAges(e) {
    const age = this.handleItemSearch(this.props.agesList.data, e.target.value);
    const {ages} = this.state;
    if (e.target.checked === true) {
      ages.push(age);
    } else {
      const id = age.id;
      const index = ages.findIndex(age => age.id === id);
      if (index > -1) {
        ages.splice(index, 1);
      }
    }
    this.setState({ages});
  }

  handleTraining(e) {
    const training = this.handleItemSearch(this.props.trainingList.data, e.target.value);
    const {trainings} = this.state;
    if (e.target.checked === true) {
      trainings.push(training);
    } else {
      const id = training.id;
      const index = trainings.findIndex(age => age.id === id);
      if (index > -1) {
        trainings.splice(index, 1);
      }
    }
    this.setState({trainings});
  }

  handleServices(e) {
    const service = this.handleItemSearch(this.props.servicesList.data, e.target.value);
    const {services} = this.state;
    if (e.target.checked === true) {
      services.push(service);
    } else {
      const id = service.id;
      const index = services.findIndex(age => age.id === id);
      if (index > -1) {
        services.splice(index, 1);
      }
    }
    this.setState({services});
  }

  handleGender(e) {
    const {genders} = this.state;
    const value = e.target.value;
    if (e.target.checked === true) {
      if (value === appConstants.gender.any) {
        this.setState({genders: Object.assign([], appConstants.genders)});
        return;
      }
      const index = genders.findIndex(gender => gender === appConstants.gender.any);
      if (index > -1 && genders.length < 2) {
        genders.splice(index, 1);
      }
      genders.push(value);
      if (genders.length === 3) {
        genders.push(appConstants.gender.any);
      }
    } else {
      const index = genders.findIndex(gender => gender === value);
      if (index > -1) {
        genders.splice(index, 1);
      }
      if (value !== appConstants.gender.any) {
        const index = genders.findIndex(gender => gender === appConstants.gender.any);
        if (index > -1) {
          genders.splice(index, 1);
        }
      }
    }
    this.setState({genders});
  }

  handleChange() {
    this.setState({

    });
  }

  handleAddSpeciality() {
    this.setState({
      visibleAddSpeciality: 'none',
      visibleSpeciality: 'block'
    });
  }

  isExistingItem(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return true;
      }
    }
    return false;
  }

  isExistingGender(array, gender) {
    const index = array.findIndex(g => g === gender);
    return index >= 0;
  }

  handleAllLevels(e) {
    let {skillLevels} = this.state;
    if (e.target.checked === false) {
      skillLevels = Object.assign([], []);
    } else {
      skillLevels = Object.assign([], this.props.skillsList.data);
    }
    this.setState({skillLevels, allSkills: e.target.checked});
  }

  handleAllAges(e) {
    let ages = [];
    if (e.target.checked === false) {
      ages = Object.assign([], []);
    } else {
      ages = Object.assign([], this.props.agesList.data);
    }
    this.setState({ages});
  }

  handleAllGender(e) {
    let genders = [];
    if (e.target.checked === false) {
      genders = Object.assign([], []);
    } else {
      genders = Object.assign([], this.props.genderList);
    }
    this.setState({genders});
  }

  handleAllServices(e) {
    let services = [];
    if (e.target.checked === false) {
      services = Object.assign([], []);
    } else {
      services = Object.assign([], this.props.servicesList.data);
    }
    this.setState({services});
  }

  renderOtherServices() {
    const {servicesList} = this.props;
    const {services} = this.state;
    if (servicesList.data.length > 0) {
      return (
        <div className="field-holder">
          <h6 className="uk-padding-remove">{this.props.p.t('TrainingPreferences.services')}</h6>
          <div className="tandc cl-sd-preferences-settings">
            {/* <span >
              <input className="optioncheckbox" id={this.props.p.t('TrainingPreferences.all_other_services')} type="checkbox" checked={services.length > 0 && services.length === servicesList.data.length} onChange={this.handleAllServices}/>
              <label htmlFor={this.props.p.t('TrainingPreferences.all_other_services')}>{this.props.p.t('TrainingPreferences.all_other_services')}</label>
            </span> */}
            {
              servicesList.data.map((service, i) => {
                return (
                  <span key={service.id}>
                    <input className="optioncheckbox" id={'service' + i} type="checkbox" name={service.name} value={service.id} checked={this.isExistingItem(this.state.services, service.id)} onChange={this.handleServices}/>
                    <label htmlFor={'service' + i}>{service.name}</label>
                  </span>
                );
              })
            }
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {skillLevels, ages, genders, trainings, services} = this.state;
    const {skillsList, agesList, genderList, trainingList} = this.props;
    return (
      <section className="stepSection stepSectionNxt ssp-regflow-1o">
        <div className="uk-container uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="trainingPreference">
                <h1 className="uk-padding-remove">{this.props.p.t('TrainingPreferences.title')}</h1>
                <p className="">{this.props.p.t('TrainingPreferences.message')}</p>
                <div className="uk-form-row mt30">
                  <div className="field-holder">
                    <h6 className="uk-padding-remove">{this.props.p.t('TrainingPreferences.athleteSkillLevel')}</h6>
                    <div className="tandc cl-sd-preferences-settings">
                      <div className="tandc"/>
                      {skillsList.data.length > 0 &&
                      <span>
                        <input className="optioncheckbox" type="checkbox" checked={skillLevels.length > 0 && skillLevels.length === skillsList.data.length} onChange={this.handleAllLevels} id={this.props.p.t('TrainingPreferences.all_levels')}/>
                        <label htmlFor={this.props.p.t('TrainingPreferences.all_levels')}>{this.props.p.t('TrainingPreferences.all_levels')}</label>
                      </span> }
                      {
                        skillsList.data.sort(this.handleDisplayOrder).map((skillLevel, i) => {
                          return (
                            <span key={skillLevel.id}>
                              <input className="optioncheckbox" id={'skill' + i} type="checkbox" name={skillLevel.name} value={skillLevel.id} checked={this.isExistingItem(skillLevels, skillLevel.id)} onChange={this.handleClick}/>
                              <label htmlFor={'skill' + i}>{skillLevel.name}</label>
                            </span>
                          );
                        })
                      }
                    </div>
                    <span className="error-text">{this.props.p.t('TrainingPreferences.validation_messages.skillLevels')}</span>
                  </div>

                  <div className="field-holder">
                    <h6 className="uk-padding-remove">{this.props.p.t('TrainingPreferences.age')}</h6>
                    <div className="tandc cl-sd-preferences-settings">
                      { agesList.data.length > 0 &&
                      <span>
                        <input className="optioncheckbox" type="checkbox" checked={ages.length > 0 && agesList.data.length === ages.length} onChange={this.handleAllAges} id={this.props.p.t('TrainingPreferences.all_ages')}/>
                        <label htmlFor={this.props.p.t('TrainingPreferences.all_ages')}>{this.props.p.t('TrainingPreferences.all_ages')}</label>
                      </span>
                      }
                      {
                        agesList.data.sort(this.handleDisplayOrder).map((age, i) => {
                          return (
                            <span key={age.id}>
                              <input className="optioncheckbox" id={'age' + i} type="checkbox" name={age.name} value={age.id} checked={this.isExistingItem(ages, age.id)} onChange={this.handleAges}/>
                              <label htmlFor={'age' + i}>{age.name}</label>
                            </span>
                          );
                        })
                      }
                    </div>
                    <span className="error-text">{this.props.p.t('TrainingPreferences.validation_messages.ages')}</span>
                  </div>

                  <div className="field-holder">
                    <h6 className="uk-padding-remove">{this.props.p.t('TrainingPreferences.gender')}</h6>
                    <div className="tandc cl-sd-preferences-settings">
                      {
                        genderList.map((gender, i) => {
                          return (
                            <span key={gender}>
                              <input className="optioncheckbox" id={'gender' + i} type="checkbox" name={gender} value={gender} checked={this.isExistingGender(genders, gender)} onChange={this.handleGender}/>
                              <label htmlFor={'gender' + i}>{this.props.p.t('TrainingPreferences.genders.' + gender)}</label>
                            </span>
                          );
                        })
                      }
                    </div>
                    <span className="error-text">{this.props.p.t('TrainingPreferences.validation_messages.gender')}</span>
                  </div>

                  <div className="field-holder pdnone">
                    <h6 className="uk-padding-remove">{this.props.p.t('TrainingPreferences.training')}</h6>
                    <div className="tandc cl-sd-preferences-settings">
                      {
                        trainingList.data.sort(this.handleDisplayOrder).map((training, i) => {
                          return training.name === 'Team Practice' || training.name === 'Virtual Training' ? (
                            <span key={training.id}>
                              <input className="optioncheckbox" type="checkbox" disabled/>
                              <label htmlFor="" className="comingsoon">{training.name}</label>
                            </span>
                          ) : (
                            <span key={training.id}>
                              <input className="optioncheckbox" id={'training' + i} type="checkbox" name={training.name} value={training.id} checked={this.isExistingItem(trainings, training.id)} onChange={this.handleTraining}/>
                              <label htmlFor={'training' + i}>{training.name}</label>
                            </span>
                          );
                        })
                      }
                    </div>
                    <span className="error-text">{this.props.p.t('TrainingPreferences.validation_messages.training')}</span>
                  </div>
                  {
                    this.renderOtherServices()
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-1  uk-width-small-1-2"/>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-2">
              <NextLink
                submitForm={this.onSubmitForm}
                saveData={this.props.saveTrainingPreferences}
                data={
                  {skillLevels, ages, genders, trainings, services}
                }
                saveType={appConstants.saveType.sportsSpecific}
                next={REGISTRATION_ISP_LISTING}
              />
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-text-right">
              <div className="finishDivSec">
                <FinishLaterLink/>
              </div>
            </div>
          </div>
        </div>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveTrainingPreferences}
          data={{skillLevels, ages, genders, trainings, services}}
          saveType={appConstants.saveType.sportsSpecific}
        />
      </section>
    );
  }
  static get propTypes() {
    return {
      genderList: PropTypes.array,
      history: PropTypes.object,
      skillLevels: PropTypes.array,
      training: PropTypes.array,
      services: PropTypes.array,
      ages: PropTypes.array,
      gender: PropTypes.array,
      skillsList: PropTypes.object,
      agesList: PropTypes.object,
      trainingList: PropTypes.object,
      servicesList: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      currentSportId: PropTypes.string.isRequired,
      fetchAgesList: PropTypes.func.isRequired,
      fetchSkillsList: PropTypes.func.isRequired,
      fetchTrainingList: PropTypes.func.isRequired,
      saveTrainingPreferences: PropTypes.func.isRequired
    };
  }
}

TrainingPreferences.defaultProps = {
  genderList: appConstants.genders,
  history: {},
  skillLevels: [],
  training: [],
  services: [],
  ages: [],
  gender: [],
  skillsList: {data: []},
  agesList: {data: []},
  trainingList: {data: []},
  servicesList: {data: []}
};

const mapStateToProps = state => {
  const {skillLevels, ages, gender, training, agesList, skillsList, trainingList, services, servicesList, currentSport} = state;
  const currentSportId = currentSport.data.id;
  return {
    skillLevels,
    ages,
    gender,
    training,
    agesList,
    skillsList,
    trainingList,
    services,
    servicesList,
    currentSportId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAgesList: () => dispatch(fetchAgesList()),
    fetchSkillsList: () => dispatch(fetchSkillsList()),
    fetchTrainingList: currentSportId => dispatch(fetchTrainingList(currentSportId)),
    saveTrainingPreferences: (data, updateType) => dispatch(saveTrainingPreferences(data, updateType))
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(TrainingPreferences));

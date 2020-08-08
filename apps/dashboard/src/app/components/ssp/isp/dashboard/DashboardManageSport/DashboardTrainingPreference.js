import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import DashboardSaveLink from '../DashboardSaveLink';
import appConstants from '../../../../../constants/appConstants';
import {
  fetchAgesList,
  fetchTrainingList,
  fetchSkillsList,
  saveTrainingPreferences
} from '../../../../../actions';
import validateTrainingPref from '../../../../../validators/ssp/isp/common/trainingPrefrences';
import {DASHBOARD_MANAGE_SPORT_PRICING} from '../../../../../constants/pathConstants';
import NewSportRequiredNotFilledModal from '../NewSportRequiredNotFilledModal';
import ExampleModal from '../ExampleModal/ExampleModal';
import {SAMPLE_PREFERENCES} from '../../../../../constants/assetsPaths';
import {FULFILLED} from '../../../../../constants/ActionTypes';

class DashboardTrainingPreference extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddSpeciality = this.handleAddSpeciality.bind(this);
    this.handleAges = this.handleAges.bind(this);
    this.handleTraining = this.handleTraining.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleServices = this.handleServices.bind(this);
    this.renderOtherServices = this.renderOtherServices.bind(this);
    this.renderGenderList = this.renderGenderList.bind(this);
    this.renderAges = this.renderAges.bind(this);
    this.renderSkillLevels = this.renderSkillLevels.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.validate = this.validate.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.handleAllLevels = this.handleAllLevels.bind(this);
    this.handleAllAges = this.handleAllAges.bind(this);
    this.handleAllGender = this.handleAllGender.bind(this);
    this.handleAllServices = this.handleAllServices.bind(this);
    this.handleSampleModal = this.handleSampleModal.bind(this);
    this.handleData = this.handleData.bind(this);
    // Const {skillLevels, training, ages, gender, services} = this.props;
    const validation = this.validate({skillLevels: [], trainings: [], ages: [], genders: []});
    this.state = {
      skillLevels: [],
      ages: [],
      genders: [],
      trainings: [],
      services: [],
      submitted: false,
      notFilled: [],
      isNotFilledModalOpen: false,
      validation,
      isModalOpen: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log('componentDidMount - \\ | / - |');
    const {agesList, skillsList, trainingList} = this.props;
    if (agesList.status !== FULFILLED) {
      this.props.fetchAgesList();
    }
    if (skillsList.status !== FULFILLED) {
      this.props.fetchSkillsList();
    }
    if (trainingList.status !== FULFILLED) {
      this.props.fetchTrainingList(this.props.currentSportId);
    }
    this.handleData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleData(nextProps);
  }

  handleData(props) {
    const {skillLevels, training, ages, gender, services} = props;
    const validation = this.validate({skillLevels, trainings: training, ages, genders: gender});
    this.setState({ages, skillLevels, trainings: training, services, genders: gender, validation});
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
    const skillsList = this.props.skillsList.data;
    const skill = this.handleItemSearch(skillsList, e.target.value);
    const {skillLevels} = this.state;
    if (e.target.checked === true) {
      skillLevels.push(skill);
      const skillLevelsIndex = skillLevels.findIndex(this.findAnyOption);
      if (skillLevelsIndex < 0 && skillLevels.length === skillsList.length - 1) {
        const allLevels = skillsList.find(this.findAnyOption);
        skillLevels.push(allLevels);
      }
    } else {
      const id = skill.id;
      const index = skillLevels.findIndex(skill => skill.id === id);
      if (index > -1) {
        skillLevels.splice(index, 1);
      }
      const skillLevelsIndex = skillLevels.findIndex(this.findAnyOption);
      if (skillLevelsIndex > -1) {
        skillLevels.splice(skillLevelsIndex, 1);
      }
    }
    const {trainings, ages, genders} = this.state;
    const validation = this.validate({skillLevels, trainings, ages, genders});
    this.setState({validation, skillLevels});
  }
  handleAges(e) {
    const agesList = this.props.agesList.data;
    const age = this.handleItemSearch(agesList, e.target.value);
    const {ages} = this.state;
    if (e.target.checked === true) {
      ages.push(age);
      const agesIndex = ages.findIndex(this.findAnyOption);
      if (agesIndex < 0 && ages.length === agesList.length - 1) {
        const allAges = agesList.find(this.findAnyOption);
        ages.push(allAges);
      }
    } else {
      const id = age.id;
      const index = ages.findIndex(age => age.id === id);
      if (index > -1) {
        ages.splice(index, 1);
      }
      const agesIndex = ages.findIndex(this.findAnyOption);
      if (agesIndex > -1) {
        ages.splice(agesIndex, 1);
      }
    }
    const {trainings, skillLevels, genders} = this.state;
    const validation = this.validate({skillLevels, trainings, ages, genders});
    this.setState({validation, ages});
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
    const {ages, skillLevels, genders} = this.state;
    const validation = this.validate({skillLevels, trainings, ages, genders});
    this.setState({validation, trainings});
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
        const {ages, skillLevels, trainings} = this.state;
        const validation = this.validate({skillLevels, trainings, ages, genders: Object.assign([], appConstants.genders)});
        this.setState({validation, genders: Object.assign([], appConstants.genders)});
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
    const {ages, skillLevels, trainings} = this.state;
    const validation = this.validate({skillLevels, trainings, ages, genders});
    this.setState({validation, genders});
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

  onSubmitForm() {
    const {validation} = this.state;
    if (this.props.sportActivationStatus === false) {
      if (validation.valid) {
        return true;
      }
      this.setState({notFilled: this.getNotFilled(), isNotFilledModalOpen: true});
      return false;
    }
    this.setState({submitted: true});
    if (validation.valid === false) {
      return false;
    }
    return true;
  }

  validate(data) {
    const {skillLevels, trainings, ages, genders} = data;
    const validation = validateTrainingPref({skillLevels, training: trainings, ages, gender: genders});
    return validation;
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

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  handleAllLevels(e) {
    let {skillLevels} = this.state;
    if (e.target.checked === false) {
      skillLevels = Object.assign([], []);
    } else {
      skillLevels = Object.assign([], this.props.skillsList.data);
    }
    this.setState({skillLevels});
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

  filterAnyOption(object) {
    return object && object.name ? (object.name.toLowerCase() !== 'all ages' && object.name.toLowerCase() !== 'all levels' ) : true;
  }

  findAnyOption(object) {
    return Boolean(object && object.name && (object.name.toLowerCase() === 'all ages' || object.name.toLowerCase() === 'all levels'));
  }

  renderSkillLevels() {
    const {p, skillsList} = this.props;
    const {skillLevels, validation, submitted} = this.state;
    return (
      <div className={validation.skillLevels === false && submitted ? 'field-holder error' : 'field-holder'}>
        <h6 className="uk-padding-remove">{p.t('TrainingPreferences.athleteSkillLevel')}</h6>
        <div className="tandc cl-sd-preferences-settings">
          {skillsList.data.length > 0 &&
          <span>
            <input className="optioncheckbox" type="checkbox" checked={skillLevels.length > 0 && skillLevels.length === skillsList.data.length} onChange={this.handleAllLevels} id="allLevels"/>
            <label htmlFor="allLevels">{this.props.p.t('TrainingPreferences.all_levels')}</label>
          </span> }
          {
            skillsList.data.filter(this.filterAnyOption).sort(this.handleDisplayOrder).map((skillLevel, i) => {
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
    );
  }

  renderAges() {
    const {p, agesList, sportName } = this.props;
    const {ages, validation, submitted} = this.state;
    
    return (
      <div className={validation.ages === false && submitted ? 'field-holder error' : 'field-holder'}>
        <h6 className="uk-padding-remove">{p.t('TrainingPreferences.age')}</h6>
        <div className="tandc cl-sd-preferences-settings">
          { agesList.data.length > 0 &&
          <span>
            <input className="optioncheckbox" type="checkbox" checked={ages.length > 0 && agesList.data.length === ages.length} onChange={this.handleAllAges} id="allAges"/>
            <label htmlFor="allAges">{this.props.p.t('TrainingPreferences.all_ages')}</label>
          </span>
          }
          {sportName == 'Golf' ? 
            agesList.data.filter(this.filterAnyOption).sort(this.handleDisplayOrder).map((age, i) => {
              return (
                <span key={age.id}>
                  <input className="optioncheckbox" id={'age' + i} type="checkbox" name={age.name} value={age.id} checked={this.isExistingItem(ages, age.id)} onChange={this.handleAges}/>
                  <label htmlFor={'age' + i}>{age.name}</label>
                </span>
              ); })          
            : agesList.data.filter(this.filterAnyOption).filter(r => r.name !== 'Masters' ).sort(this.handleDisplayOrder).map((age, i) => {
              return (
                <span key={age.id}>
                  <input className="optioncheckbox" id={'age' + i} type="checkbox" name={age.name} value={age.id} checked={this.isExistingItem(ages, age.id)} onChange={this.handleAges}/>
                  <label htmlFor={'age' + i}>{age.name}</label>
                </span>
              );
            })
          }
        </div>
        <span className="error-text">{p.t('TrainingPreferences.validation_messages.ages')}</span>
      </div>
    );
  }

  renderGenderList() {
    const {genders, validation, submitted} = this.state;
    const {p, genderList} = this.props;
    return (
      <div className={validation.gender === false && submitted ? 'field-holder error' : 'field-holder'}>
        <h6 className="uk-padding-remove">{p.t('TrainingPreferences.gender')}</h6>
        <div className="tandc cl-sd-preferences-settings">
          {
            genderList.map((gender, i) => {
              return (
                <span key={gender}>
                  <input className="optioncheckbox" id={'gender' + i} type="checkbox" name={gender} value={gender} checked={this.isExistingGender(genders, gender)} onChange={this.handleGender}/>
                  <label htmlFor={'gender' + i}>{p.t('TrainingPreferences.genders.' + gender)}</label>
                </span>
              );
            })
          }
        </div>
        <span className="error-text">{this.props.p.t('TrainingPreferences.validation_messages.gender')}</span>
      </div>
    );
  }

  renderTrainingList() {
    const {trainings, validation, submitted} = this.state;
    const {p, trainingList} = this.props;
    return (
      <div className={validation.training === false && submitted ? 'field-holder pdnone error' : 'field-holder pdnone'}>
        <h6 className="uk-padding-remove">{p.t('TrainingPreferences.training')}</h6>
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
    );
  }

  renderOtherServices() {
    const {services} = this.state;
    const {servicesList} = this.props;
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
                    <input className="optioncheckbox" id={'service' + i} type="checkbox" name={service.name} value={service.id} checked={this.isExistingItem(services, service.id)} onChange={this.handleServices}/>
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

  handleSampleModal() {
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  }

  render() {
    const {p, sportActivationStatus, sportName} = this.props;
    const {skillLevels, ages, genders, trainings, services, isModalOpen} = this.state;
    const buttonName = sportActivationStatus ? p.t('SaveButton.save') : p.t('RegistrationNextLink.save_and_continue');
    const saveType = appConstants.saveType.sportsSpecific;
    const {offerTerminology} = this.props;
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
            <div className="trainingPreference cl-sd-trainingLocationInner">
              <div className="uk-grid">
                <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
                  <h1 className="uk-padding-remove">{this.props.p.t('TrainingPreferences.title', {offerTerminology: offerTerminology.singular, sportName})}</h1>
                </div>
                <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1">
                  <div className="viewExpOuter">
                    <a onClick={this.handleSampleModal} data-uk-modal>{this.props.p.t('ExampleModal.message')}</a>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <p>{this.props.p.t('TrainingPreferences.message')}</p>
                </div>
              </div>

              <div className="uk-form-row mt30">
                {
                  this.renderSkillLevels()
                }

                {
                  this.renderAges()
                }

                {
                  this.renderGenderList()
                }

                {
                  this.renderTrainingList()
                }

                {
                  this.renderOtherServices()
                }
              </div>
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
            <DashboardSaveLink
              submitForm={this.onSubmitForm}
              saveData={this.props.saveTrainingPreferences}
              data={
                {skillLevels, ages, genders, trainings, services}
              }
              saveType={appConstants.saveType.sportsSpecific}
              buttonName={buttonName}
              isNewSports={sportActivationStatus}
              next={DASHBOARD_MANAGE_SPORT_PRICING}
            />
          </div>
        </div>

        <NewSportRequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveTrainingPreferences}
          data={{skillLevels, ages, genders, trainings, services}}
          saveType={saveType}
        />
        <ExampleModal title="ExampleModal.sessionPreferences" offerTerminology={offerTerminology.singular} isModalOpen={isModalOpen} scroll={appConstants.scroll.preferences} image={SAMPLE_PREFERENCES} onClose={this.handleSampleModal}/>
      </div>
    );
  }

  static get propTypes() {
    return {
      genderList: PropTypes.array,
      // SkillLevels: PropTypes.array,
      // training: PropTypes.array,
      // services: PropTypes.array,
      // ages: PropTypes.array,
      // gender: PropTypes.array,
      skillsList: PropTypes.object,
      agesList: PropTypes.object,
      trainingList: PropTypes.object,
      servicesList: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      currentSportId: PropTypes.string.isRequired,
      fetchAgesList: PropTypes.func.isRequired,
      fetchSkillsList: PropTypes.func.isRequired,
      fetchTrainingList: PropTypes.func.isRequired,
      saveTrainingPreferences: PropTypes.func.isRequired,
      sportActivationStatus: PropTypes.bool.isRequired,
      offerTerminology: PropTypes.object.isRequired,
      sportName: PropTypes.string.isRequired
    };
  }
}

DashboardTrainingPreference.defaultProps = {
  genderList: appConstants.genders,
  // SkillLevels: [],
  // training: [],
  // services: [],
  // ages: [],
  // gender: [],
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
    currentSportId,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active),
    offerTerminology: currentSport.data && currentSport.data.offerTerminology ? currentSport.data.offerTerminology : {singular: appConstants.defaultOfferTerminology},
    sportName: currentSport.data && currentSport.data.name ? currentSport.data.name : ''
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

export default translate(connect(mapStateToProps, mapDispatchToProps)(DashboardTrainingPreference));
/* eslint react/no-deprecated: 0 */

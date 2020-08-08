import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import appConstants from '../../../../../constants/appConstants';
import {saveBuildProfile, fetchSportsList, clearSaveDataOnNextStatus} from '../../../../../actions';
import {validateBuildProfile, notNull} from '../../../../../validators/ssp/isp/common/buildProfile';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import {DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES, DASHBOARD_SPORTS} from '../../../../../constants/pathConstants';
import NewSportRequiredNotFilledModal from '../NewSportRequiredNotFilledModal';

class DashboardBuildProfile extends Component {
  constructor(props) {
    super(props);

    const {sport, sportsList} = props;
    const {id, name, coachingExperience, playingExperience, offerTerminology, specializations} = sport;
    const item = (id) ? sportsList.data.findIndex(sportItem => sportItem.id === id) : 0;
    const validation = validateBuildProfile(sport);
    this.state = {
      filteredSports: [],

      visibleSports: 'none',
      // VisibleSpecialization: 'none',
      addAnotherSport: 'none',

      visibleAddSpecialization: 'block',
      visibleSpecialization: item >= 0 && sportsList.data[item].specializations.length > 0 ? 'block' : 'none',
      isAllSpecializationsChecked: item >= 0 ? specializations.length > 0 && specializations.length === sportsList.data[item].specializations.length : false,

      showSpecializations: true,

      sport: {
        id,
        name,
        coachingExperience,
        offerTerminology,
        playingExperience,
        specializations
      },
      item,
      arrowSports: 'block',
      clearSports: 'none',
      sportName: name,
      isSportSet: notNull(id),
      submit: false,
      notFilled: [],
      isNotFilledModalOpen: false,
      nav: null,
      validation
    };

    this.handleChangeOfferTerminology = this.handleChangeOfferTerminology.bind(this);
    this.renderOfferTerminology = this.renderOfferTerminology.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.handleChangeSports = this.handleChangeSports.bind(this);
    this.handleSelectSports = this.handleSelectSports.bind(this);
    this.handleClickSports = this.handleClickSports.bind(this);
    this.handleAddSpecialization = this.handleAddSpecialization.bind(this);
    this.handleDoneSports = this.handleDoneSports.bind(this);
    this.handleListSpecializations = this.handleListSpecializations.bind(this);
    this.handleSearchSpecialization = this.handleSearchSpecialization.bind(this);
    this.handleFocusSports = this.handleFocusSports.bind(this);
    this.handleBlurSports = this.handleBlurSports.bind(this);
    this.handleClearSports = this.handleClearSports.bind(this);

    this.handleUpdateSpecialization = this.handleUpdateSpecialization.bind(this);

    this.isExistingSpecialization = this.isExistingSpecialization.bind(this);
    this.isCheckedSpecialization = this.isCheckedSpecialization.bind(this);
    this.renderSpecializations = this.renderSpecializations.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.handleChangeSportData = this.handleChangeSportData.bind(this);
    this.getNextLink = this.getNextLink.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSport = this.handleSport.bind(this);
    this.handleSportFilter = this.handleSportFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prevSaveDataOnNextStatus = this.props.saveDataOnNext.status;
    const newSaveDataOnNextStatus = nextProps.saveDataOnNext.status;
    if (prevSaveDataOnNextStatus === PENDING) {
      if (newSaveDataOnNextStatus === FULFILLED) {
        this.props.clearSaveDataOnNextStatus();
        if (this.props.sportActivationStatus === false) {
          const {nav} = this.state;
          nextProps.history.push(nav);
        }
      }
    }
    const oldSport = this.state.sport;
    if (nextProps.sport.id !== oldSport.id) {
      this.handleChangeSportData({
        ...nextProps.sport
      });

      const {id, name} = nextProps.sport;
      const item = (id) ? nextProps.sportsList.data.findIndex(sportItem => sportItem.id === id) : 0;
      const validation = validateBuildProfile(nextProps.sport);
      const {specializations} = nextProps.sportsList.data[item];
      this.setState({
        sportName: name,
        isSportSet: notNull(id),
        submit: false,
        validation,
        isAllSpecializationsChecked: specializations.length > 0 && nextProps.sport.specializations.length === specializations.length,
        visibleSpecialization: item >= 0 && nextProps.sportsList.data[item].specializations.length > 0 ? 'block' : 'none',
        item
      });
    }
  }

  getNotFilled() {
    const notFilled = [];
    return notFilled;
  }

  submitForm() {
    const {validation} = this.state;
    const {sportActivationStatus} = this.props;
    if (validation.valid) {
      if (validation.required) {
        return true;
      } else if (sportActivationStatus === false) {
        this.setState({submit: true, notFilled: this.getNotFilled(), isNotFilledModalOpen: true});
        return false;
      }
    }
    this.setState({submit: true});
    return false;
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  handleChangeSportData(data) {
    const {sport, item} = this.state;
    const newSport = Object.assign({}, sport, data);
    const validation = validateBuildProfile(newSport);
    const {sportsList} = this.props;
    const isAllSpecializationsChecked = sportsList.data[item].specializations.length > 0 && sportsList.data[item].specializations.length === newSport.specializations.length;
    this.setState({
      sport: newSport,
      validation,
      isAllSpecializationsChecked
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.sportsList && this.props.sportsList.data && this.props.sportsList.data.length === 0) {
      this.props.fetchSportsList();
    }
  }

  handleChangeOfferTerminology(e) {
    const {value} = e.target;
    this.handleChangeSportData({
      offerTerminology: value
    });
  }

  handleSelectSports(e) {
    const {isSportSet} = this.state;
    const {sportsList} = this.props;
    if (!isSportSet) {
      const item = this.handleListSpecializations(e.currentTarget.getAttribute('value'));

      this.handleChangeSportData({
        id: e.currentTarget.getAttribute('value'),
        name: e.currentTarget.textContent
      });

      this.setState({
        visibleSports: 'none',
        // VisibleAddSpecialization: 'block',
        sportName: e.currentTarget.textContent,
        item,
        visibleAddSpecialization: this.state.visibleAddSpecialization === 'block',
        visibleSpecialization: item >= 0 && sportsList.data[item].specializations.length > 0 ? 'block' : 'none'
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
    const {sport, item} = this.state;
    const {sportsList} = this.props;
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

    this.handleChangeSportData({
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
    const {isSportSet} = this.state;
    if (!isSportSet) {
      this.setState({sportName: e.target.value});
      if (e.target.value === '') {
        this.setState({
          visibleSports: 'none'
        });
        return;
      }

      this.handleChangeSportData({
        specializations: [],
        id: null,
        name: e.target.value
      });

      const filteredSports = this.findItemsBeginningWith(this.props.sportsList.data, e.target.value).concat(this.findItemsContaining(this.props.sportsList.data, e.target.value));
      this.setState({
        filteredSports: filteredSports.filter(this.handleSportFilter),
        visibleSports: filteredSports.length > 0 ? 'block' : 'none'
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
    if (!isSportSet && notNull(sportName)) {
      const filteredSports = this.findItemsBeginningWith(this.props.sportsList.data, sportName).concat(this.findItemsContaining(this.props.sportsList.data, sportName));
      this.setState({
        filteredSports,
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
    this.handleChangeSportData({
      id: null,
      name: null,
      specializations: []
    });

    this.setState({
      filteredSports: [],
      visibleSports: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'none',
      arrowSports: 'block',
      clearSports: 'none',
      sportName: '',
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
      const {specializations} = sport;
      return specializations.map((spec, i) => {
        return (
          <li key={spec.id} style={{display: this.state.visibleSpecialization}}>
            <input className="optioncheckbox" id={'specialization' + i} type="checkbox" defaultValue={spec.id} checked={this.isCheckedSpecialization(spec.id)} onChange={this.handleClickSports}/>
            <label htmlFor={'specialization' + i}><span>{spec.name}</span></label>
          </li>);
      });
    }
  }

  getNextLink() {
    const {isFirstSport} = this.props;
    if (isFirstSport) {
      return DASHBOARD_SPORTS;
    }
    return DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES;
  }

  handleCheckAll(e) {
    const {item} = this.state;
    const {sportsList} = this.props;
    if (sportsList && sportsList.status === FULFILLED) {
      const sport = this.props.sportsList.data[item];
      const {specializations} = sport;
      const {checked} = e.target;
      if (checked) {
        this.setState({sport: {...this.state.sport, specializations}, isAllSpecializationsChecked: true});
      } else {
        this.setState({sport: {...this.state.sport, specializations: []}, isAllSpecializationsChecked: false});
      }
    }
  }

  renderInputSport() {
    const {p} = this.props;
    const {submit, item, isSportSet, validation, isAllSpecializationsChecked, visibleSpecialization} = this.state;

    const invalidSport = (submit && validation.sport === false);
    return (
      <div className="cl-sd-trainingLocationInner">
        <div className="cl-sd-addServiceouter">
          <div className="uk-grid">
            <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
              <h1 className="uk-padding-remove">{p.t('BuildProfile.title')}</h1>
            </div>
            <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1"/>
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <p className>{p.t('BuildProfile.message')}</p>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-4-10 uk-width-large-5-10 uk-width-medium-1-2  uk-width-small-1-1">
              <div className={invalidSport ? 'field-holder error' : 'field-holder'}>
                <label>{p.t('BuildProfile.selectService')}</label>
                <div className="multiLevelDD">
                  <div className="rowOne">
                    <input type="text" className="field-required" onChange={this.handleChangeSports} placeholder={p.t('InputSport.typeSport')} value={this.state.sportName} onFocus={this.handleFocusSports} onBlur={this.handleBlurSports}/>
                    <span style={{display: isSportSet ? 'none' : this.state.arrowSports}} className="arrowIcon">
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
                      this.state.filteredSports.map(sport => {
                        return <li key={sport.id}><a value={sport.id} onClick={this.handleSelectSports}>{sport.name}</a></li>;
                      })
                    }
                  </ul>

                  {/* <div className="rowSpeciality" style={{display: 'block'}} >
                    <a className="addLink" onClick={this.handleAddSpecialization} style={{display: this.state.visibleSpecialization === 'none' && (specializations ? specializations.length === 0 : true) ? 'block' : 'none', textAlign: 'left'}}>{p.t('InputSport.addSpeciality')}</a>

                    <a className="linkValueSpeciality" onClick={this.handleAddSpecialization} style={{display: 'block'}} >
                      {
                        specializations.map((spec, i) => {
                          const elem = i === specializations.length - 1 ? spec.name : spec.name + ', ';
                          return <span key={i}>{elem}</span>;
                        })
                      }
                    </a>

                    <h6 className="specialityHead mt10" style={{display: this.state.visibleSpecialization}}>{p.t('InputSport.addSpeciality')}</h6>

                    {/* <ul className="checkBoxList" style={{display: this.state.visibleSpecialization}}>
                      {
                        this.renderSpecializations(item)
                      }
                      <li className="LastChild" style={{display: this.state.visibleSpecialization}}><a onClick={this.handleDoneSports} style={{display: this.state.visibleSpecialization}}>{p.t('InputSport.done')}</a></li>
                    </ul> }

                  </div> */}
                </div>
                <span className="error-text">{invalidSport ? p.t('InputSport.validation_messages.sportsName.required') : p.t('InputSport.validation_messages.sportsName.valid')}</span>
              </div>
            </div>
            <div className="uk-width-xlarge-4-10 uk-width-large-5-10 uk-width-medium-1-2  uk-width-small-1-1"/>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1" style={{display: visibleSpecialization}}>
              <h1 className="uk-padding-remove">{p.t('BuildProfile.selectSpecialties')}</h1>
            </div>
          </div>
        </div>

        <div className="cl-sd-addServiceouterv2">
          <div className="cl-sd-addServiceInnerv2" style={{display: visibleSpecialization}}>
            <div className="cl-sd-addServiceInnerv2Head">
              <input type="checkbox" name id="checkall" checked={isAllSpecializationsChecked} onChange={this.handleCheckAll}/>
              <label htmlFor="checkall"><span>Specializations:</span></label>
            </div>
            <ul>
              {
                this.renderSpecializations(item)
              }
            </ul>
          </div>
        </div>

      </div>
    );
  }

  renderOfferTerminology() {
    const {p} = this.props;
    const {submit, sport, validation} = this.state;
    const {offerTerminology} = sport;

    const inValidOfferTerminology = (submit && validation.offerTerminology === false);
    return (

      <div className="cl-sd-trainingLocationInner defineSession">
        <div className={inValidOfferTerminology ? 'field-holder error' : 'field-holder'}>
          <h1 className="uk-padding-remove">{p.t('Sessions.defineTerminology')}</h1>
          <p>{p.t('Sessions.defineTerminologyMessage')}:</p>
          <div className="tandc">
            <input className id="dt1" checked={offerTerminology === 'S'} type="radio" value={'S'} onChange={this.handleChangeOfferTerminology}/>
            <label htmlFor="dt1">{p.t('BuildProfile.sessions')}</label>
            <span className="w70"/>
            <input className id="dt2" checked={offerTerminology === 'L'} type="radio" value={'L'} onChange={this.handleChangeOfferTerminology}/>
            <label htmlFor="dt2">{p.t('BuildProfile.lessons')}</label>
            <span className="w70"/>
            <input className id="dt3" checked={offerTerminology === 'C'} type="radio" value={'C'} onChange={this.handleChangeOfferTerminology}/>
            <label htmlFor="dt3">{p.t('BuildProfile.classes')}</label>
            <span className="w70"/>
          </div>
          <span className="error-text">{p.t('Sessions.validation_messages.sessionName')}</span>
        </div>
      </div>

    );
  }

  handleNext() {
    this.handleSave(DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES);
  }

  handleSave(nav) {
    this.setState({nav});
    const valid = this.submitForm();
    if (valid === true) {
      const {sport, isSportSet} = this.state;
      const saveType = (isSportSet) ? appConstants.saveType.sportsSpecific : appConstants.saveType.both;
      const {playingExperience, coachingExperience, offerTerminology, specializations, id, name} = sport;
      const data = {id, name, playingExperience, coachingExperience, offerTerminology, specializations};
      this.props.saveBuildProfile(data, saveType);
    }
  }

  handleSport() {
    this.handleSave(DASHBOARD_SPORTS);
  }

  handleSportFilter(sport) {
    const {serviceProfiles} = this.props;
    const {data} = serviceProfiles;
    if (data) {
      const match = data.find(s => s.sportId === sport.id);
      return !match;
    }
    return true;
  }

  render() {
    const {p, sportActivationStatus} = this.props;
    const {sport, isSportSet} = this.state;
    const {playingExperience, coachingExperience, offerTerminology, specializations, id} = sport;
    const data = {id, name, playingExperience, coachingExperience, offerTerminology, specializations};

    const saveType = (isSportSet) ? appConstants.saveType.sportsSpecific : appConstants.saveType.both;
    const buttonName = (sportActivationStatus === false) ? p.t('RegistrationNextLink.save_and_continue') : p.t('SaveButton.save');
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="buildProfile ssp-buildProfile-1-2">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              {
                this.renderInputSport()
              }
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
              <a className="general_btn" onClick={this.handleNext}>{buttonName}</a>
              {/* <SaveLink
              saveType={saveType}
              saveData={this.props.saveBuildProfile}
              data={data}
              submitForm={this.submitForm}
              buttonName={buttonName}
              isNewSports={sportActivationStatus}
              next={DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES}
            /> */}
            </div>
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
              {(sportActivationStatus === false) && (
                <div className="cl-addserviceBtnOuter">
                  <a className="back btm-back" onClick={this.handleSport}>{'Save & Add another Service'}</a>
                  {/* <SaveLink
                saveType={saveType}
                saveData={this.props.saveBuildProfile}
                data={data}
                submitForm={this.submitForm}
                buttonName={'Save & Add Another Service'}
                isNewSports={sportActivationStatus}
                next={DASHBOARD_SPORTS}
              /> */}
                </div>
              )}
            </div>
          </div>
        </div>

        <NewSportRequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveBuildProfile}
          data={data}
          saveType={saveType}
        />
      </div>
    );
  }
}

DashboardBuildProfile.propTypes = {

  sport: PropTypes.object,
  sportsList: PropTypes.object,

  fetchSportsList: PropTypes.func.isRequired,
  saveBuildProfile: PropTypes.func.isRequired,
  clearSaveDataOnNextStatus: PropTypes.func.isRequired,
  saveDataOnNext: PropTypes.string,
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  sportActivationStatus: PropTypes.bool.isRequired,
  serviceProfiles: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isFirstSport: PropTypes.bool.isRequired
};

DashboardBuildProfile.defaultProps = {
  sport: {},
  sportsList: {},
  saveDataOnNext: null
};

const mapStateToProps = state => {
  const {sport, currentSport, serviceProfiles, profile, sportsList, saveDataOnNext} = state;
  return {
    sport,
    sportsList,
    profile,
    currentSport,
    serviceProfiles,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active),
    isFirstSport: (serviceProfiles.data && serviceProfiles.data.length < 1),
    saveDataOnNext,
    saveDataOnNextStatus: saveDataOnNext.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveBuildProfile: (data, updateType) => dispatch(saveBuildProfile(data, updateType)),
    fetchSportsList: () => dispatch(fetchSportsList()),
    clearSaveDataOnNextStatus: () => dispatch(clearSaveDataOnNextStatus())
  };
};
export default translate(connect(mapStateToProps, mapDispatchToProps)(DashboardBuildProfile));
/* eslint react/no-deprecated: 0 */

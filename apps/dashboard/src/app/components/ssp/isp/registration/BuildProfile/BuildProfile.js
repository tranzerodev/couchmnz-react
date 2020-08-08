import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

import {validateBuildProfile, notNull} from '../../../../../validators/ssp/isp/common/buildProfile';
import RequiredNotFilledModal from '../RequiredNotFilledModal';
import NextLink from '../../../../common/RegistrationNextLink';

import {

  fetchSportsList,
  saveBuildProfile

} from '../../../../../actions';

import appConstants from '../../../../../constants/appConstants';
import {REGISTRATION_ISP_BIOGRAPHY} from '../../../../../constants/pathConstants';
import {FULFILLED} from '../../../../../constants/ActionTypes';

/* eslint react/no-array-index-key: 0 */
class BuildProfile extends Component {
  constructor(props) {
    super(props);

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
    const {sport, sportsList} = props;
    const {id, name, coachingExperience, playingExperience, offerTerminology, specializations} = sport;
    const item = (id) ? sportsList.data.findIndex(sportItem => sportItem.id === id) : 0;
    this.state = {
      filteredSports: [],

      visibleSports: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'none',

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
      isNotFilledModalOpen: false
    };
  }

  getNotFilled() {
    const notFilled = [];
    return notFilled;
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  componentWillReceiveProps(nextProps) {
    const {sport, sportsList} = nextProps;
    const {id, name, offerTerminology, specializations} = sport;
    if (this.state.sport.id !== sport.id) {
      const item = (id) ? sportsList.data.findIndex(sportItem => sportItem.id === id) : 0;
      const newSport = Object.assign({}, this.state.sport, {
        id,
        name,
        coachingExperience: {
          numberOfYears: -1,
          description: null
        },
        playingExperience: {
          numberOfYears: -1,
          description: null
        },
        offerTerminology,
        specializations: [].concat(specializations)
      });
      this.setState({
        sport: newSport,
        item,
        sportName: name,
        isSportSet: notNull(id)
      });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.sportsList && this.props.sportsList.data && this.props.sportsList.data.length === 0) {
      this.props.fetchSportsList();
    }
  }

  handleChangeOfferTerminology(e) {
    const {value} = e.target;
    const {sport} = this.state;
    this.setState({
      sport: {
        ...sport,
        offerTerminology: value
      }
    });
  }

  submitForm() {
    const {sport} = this.state;
    const validation = validateBuildProfile(sport);
    if (validation.valid) {
      if (validation.required) {
        return true;
      }
      this.setState({submit: true, validation, notFilled: this.getNotFilled(), isNotFilledModalOpen: true});
      return false;
    }
    this.setState({submit: true, validation});
    return false;
  }

  renderOfferTerminology() {
    const {p} = this.props;
    const {submit, sport} = this.state;
    const {offerTerminology} = sport;

    const validation = validateBuildProfile(sport);

    const inValidOfferTerminology = (submit && validation.offerTerminology === false);
    return (
      <div className="uk-grid uk-grid-mobile">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
          <div className="uk-form-inline uk-from-inline-mobile">
            <div className={inValidOfferTerminology ? 'field-holder error' : 'field-holder'}>
              <h6 className="uk-padding-remove">{this.props.p.t('Sessions.defineTerminology')}</h6>
              <p>{this.props.p.t('Sessions.defineTerminologyMessage')}:</p>
              <div className="tandc">
                <input className id="dt1" checked={offerTerminology === 'S'} type="radio" value={'S'} onChange={this.handleChangeOfferTerminology}/>
                <label htmlFor="dt1">{p.t('BuildProfile.sessions')}</label>
                <input className id="dt2" checked={offerTerminology === 'L'} type="radio" value={'L'} onChange={this.handleChangeOfferTerminology}/>
                <label htmlFor="dt2">{p.t('BuildProfile.lessons')}</label>
                <input className id="dt3" checked={offerTerminology === 'C'} type="radio" value={'C'} onChange={this.handleChangeOfferTerminology}/>
                <label htmlFor="dt3">{p.t('BuildProfile.classes')}</label>
                <span className="error-text">{this.props.p.t('Sessions.validation_messages.sessionName')}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
  handleSelectSports(e) {
    const {isSportSet} = this.state;
    if (!isSportSet) {
      const item = this.handleListSpecializations(e.currentTarget.getAttribute('value'));
      const {sport} = this.state;
      this.setState({
        visibleSports: 'none',
        visibleAddSpecialization: 'block',
        sportName: e.currentTarget.textContent,
        item,
        sport: {
          ...sport,
          id: e.currentTarget.getAttribute('value'),
          name: e.currentTarget.textContent
        }
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
    this.setState({
      sport: {
        ...sport,
        specializations
      }
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
    const {isSportSet, sport} = this.state;
    if (!isSportSet) {
      this.setState({sportName: e.target.value});
      if (e.target.value === '') {
        this.setState({
          visibleSports: 'none'
        });
        return;
      }
      this.setState({
        sport: {
          ...sport,
          specializations: [],
          id: null,
          name: e.target.value
        }
      });
      const filteredSports = this.findItemsBeginningWith(this.props.sportsList.data, e.target.value).concat(this.findItemsContaining(this.props.sportsList.data, e.target.value));
      this.setState({
        filteredSports,
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
    const {sport} = this.state;
    this.setState({
      filteredSports: [],
      visibleSports: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'none',
      arrowSports: 'block',
      clearSports: 'none',
      sportName: '',
      item: 0,
      sport: {
        ...sport,
        id: null,
        name: null,
        specializations: []
      }
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
  render() {
    const {submit, sport, item, isSportSet} = this.state;
    const {id, name, playingExperience, coachingExperience, offerTerminology, specializations} = sport;
    const data = {id, name, playingExperience, coachingExperience, offerTerminology, specializations};
    const validation = validateBuildProfile(sport);
    const invalidSport = (submit && validation.sport === false);

    return (

      <section className="stepSection stepSectionNxt ssp-regflow-1o">
        <div className="uk-container uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">

              <div className="buildProfile buildProfileSec">
                <h1 className="uk-padding-remove">{this.props.p.t('BuildProfile.title')} <span>{this.props.p.t('BuildProfile.sportSpecific')}</span></h1>
                <p className>{this.props.p.t('BuildProfile.message')}</p>

                <div className="customDropdown">
                  <div className={'uk-grid uk-grid-mobile'}>
                    <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                      <div className="uk-form-inline uk-from-inline-mobile">

                        <div className={invalidSport ? 'field-holder error' : 'field-holder'}>
                          <label className="uk-form-label uk-form-help-block" htmlFor="typeSport">{this.props.p.t('InputSport.coaching')}</label>
                          <div className="multiLevelDD">
                            <div className="rowOne">
                              <input type="text" className="field-required" onChange={this.handleChangeSports} placeholder={this.props.p.t('InputSport.typeSport')} value={this.state.sportName} onFocus={this.handleFocusSports} onBlur={this.handleBlurSports}/>
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

                            <div className="rowSpeciality" style={{display: 'block'}}>
                              <a className="addLink" onClick={this.handleAddSpecialization} style={{display: this.state.visibleSpecialization === 'none' && (specializations ? specializations.length === 0 : true) ? 'block' : 'none', textAlign: 'left'}}>{this.props.p.t('InputSport.addSpeciality')}</a>

                              <a className="linkValueSpeciality" onClick={this.handleAddSpecialization} style={{display: 'block'}}>
                                {
                                  specializations.map((spec, i) => {
                                    const elem = i === specializations.length - 1 ? spec.name : spec.name + ', ';
                                    return <span key={i}>{elem}</span>;
                                  })
                                }
                              </a>

                              <h6 className="specialityHead mt10" style={{display: this.state.visibleSpecialization}}>{this.props.p.t('InputSport.addSpeciality')}</h6>

                              <ul className="checkBoxList" style={{display: this.state.visibleSpecialization}}>
                                {
                                  this.renderSpecializations(item)
                                }
                                <li className="LastChild" style={{display: this.state.visibleSpecialization}}><a onClick={this.handleDoneSports} style={{display: this.state.visibleSpecialization}}>{this.props.p.t('InputSport.done')}</a></li>
                              </ul>

                            </div>
                          </div>

                          <span className="error-text">{invalidSport ? this.props.p.t('InputSport.validation_messages.sportsName.required') : this.props.p.t('InputSport.validation_messages.sportsName.valid')}</span>
                        </div>

                      </div>
                    </div>
                  </div>

                  {
                    this.renderOfferTerminology()
                  }
                </div>
              </div>

            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-2  uk-width-small-1-2"/>
            <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2  uk-width-small-1-2 uk-text-right">
              <NextLink submitForm={this.submitForm} saveData={this.props.saveBuildProfile} data={data} saveType={appConstants.saveType.both} next={REGISTRATION_ISP_BIOGRAPHY}/>
            </div>
          </div>
        </div>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveBuildProfile}
          data={data}
          saveType={appConstants.saveType.both}
        />
      </section>
    );
  }
}

BuildProfile.propTypes = {

  sport: PropTypes.object,
  sportsList: PropTypes.object,

  fetchSportsList: PropTypes.func,
  saveBuildProfile: PropTypes.func.isRequired,

  p: PropTypes.shape({t: PropTypes.func}).isRequired
};

BuildProfile.defaultProps = {
  sport: {},
  sportsList: {},
  fetchSportsList: () => {}
};

const mapStateToProps = state => {
  const {sport, currentSport, profile, sportsList} = state;
  return {
    sport,
    sportsList,
    profile,
    currentSport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveBuildProfile: (data, updateType) => dispatch(saveBuildProfile(data, updateType)),
    fetchSportsList: () => dispatch(fetchSportsList())

  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(BuildProfile));

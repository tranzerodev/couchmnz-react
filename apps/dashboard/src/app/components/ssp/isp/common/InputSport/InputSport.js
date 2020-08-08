import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
// Import {} from '../../../../../actions';

class InputSportClass extends Component {
  constructor() {
    super();
    this.handleChangeSports = this.handleChangeSports.bind(this);
    this.handleSelectSports = this.handleSelectSports.bind(this);
    this.handleClickSports = this.handleClickSports.bind(this);
    this.handleAddSpecialization = this.handleAddSpecialization.bind(this);
    this.handleDoneSports = this.handleDoneSports.bind(this);
    this.handleListSpecializations = this.handleListSpecializations.bind(this);
    this.handleFocusSports = this.handleFocusSports.bind(this);
    this.handleBlurSports = this.handleBlurSports.bind(this);
    this.handleClearSports = this.handleClearSports.bind(this);

    this.isExistingSpecialization = this.isExistingSpecialization.bind(this);
    this.isCheckedSpecialization = this.isCheckedSpecialization.bind(this);
    
    this.state = {
      filteredSports: [],

      visibleSports: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'none',

      showSpecializations: true,

      specializations: [],
      sport: {
        id: null,
        name: null,
        coachingExperience: {
          numberOfYears: null,
          description: null
        },
        playingExperience: {
          numberOfYears: null,
          description: null
        },
        specializations: []
      },
      arrowSports: 'block',
      clearSports: 'none',
      item: 0,
      sportName: '',
      isSportSet: false
    };
  }
  componentWillUnmount() {
    this.handleChangeSports = () => {};
    this.handleSelectSports = () => {};
    this.handleClickSports = () => {};
    this.handleAddSpecialization = () => {};
    this.handleDoneSports = () => {};
    this.handleNavSports = () => {};
    this.handleBackSports = () => {};
    this.handleListSpecializations = () => {};
    this.handleSelectedExperience = () => {};
    this.handleFocusSports = () => {};
    this.handleBlurSports = () => {};
    this.handleClearSports = () => {};
    this.handleSportSearch = () => {};
    this.isExistingSpecialization = () => {};
    this.isCheckedSpecialization = () => {};
  }
  componentDidMount() {}
  handleSelectSports(e) {
    const {isSportSet} = this.state;
    if (!isSportSet) {
      const item = this.handleListSpecializations(e.currentTarget.getAttribute('value'));
      this.setState({
        visibleSports: 'none',
        visibleAddSpecialization: 'block',
        item,
        sport: {
          id: e.currentTarget.getAttribute('value'),
          name: e.currentTarget.textContent
        }
      });
    }
  }
  handleListSpecializations(id) {
    return this.props.sportsList.findIndex(sport => sport.id === id);
  }
  handleClickSports(e) {
    const {checked, value} = e.currentTarget;
    const exists = this.isExistingSpecialization(value);
    if (!exists) {
      const spec = this.handleSpecializationSearch(value);
      this.props.updateSpecialization({
        id: value,
        name: spec.name,
        checked
      });
    }
  }
  handleChangeSports(e) {
    const {isSportSet} = this.state;
    if (!isSportSet) {
      this.setState({sportName: e.target.value});
      if (e.target.value === '') {
        this.setState({
          visibleSports: 'none'
        });
        if (this.props.sports.length && this.props.sport.id) {
          this.handleClearSports();
        }
        return;
      }
      this.setState({
        sport: {
          id: null,
          name: e.target.value,
          specializations: [],
          certifications: []
        }
      });
      // Const filteredSports = this.props.sportsList.filter(sport => sport.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
      const filteredSports = this.findItemsBeginningWith(this.props.sportsList, e.target.value).concat(this.findItemsContaining(this.props.sportsList, e.target.value));
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
    // Let { experience, sports, sportsQuery, specializations } = this.state;
    this.setState({
      visibleAddSpecialization: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'block',
      msgSports: ''
    });
  }
  handleFocusSports() {
    const {isSportSet} = this.state;
    if (!isSportSet) {
      const filteredSports = this.findItemsBeginningWith(this.props.sportsList, this.state.sportName).concat(this.findItemsContaining(this.props.sportsList, this.state.sportName));
      this.setState({
        filteredSports,
        visibleSports: this.props.sportsList.length > 0 ? 'block' : 'none',
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
    this.setState({
      filteredSports: [],
      visibleSports: 'none',
      visibleSpecialization: 'none',
      addAnotherSport: 'none',
      arrowSports: 'block',
      clearSports: 'none',
      sportName: '',
      item: -1
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
  handleSpecializationSearch(id) {
    const sport = Object.assign({}, this.props.sportsList[this.state.item]);
    if (sport.specializations) {
      for (let i = 0; i < sport.specializations.length; i++) {
        if (sport.specializations[i].id === id) {
          return Object.assign({}, sport.specializations[i]);
        }
      }
    }
    return undefined;
  }
  componentWillMount() {
    /* If (!this.sportExists()) {
      this.props.addNewSport();
    } */
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({sportName: nextProps.sport ? nextProps.sport.name : ''});
    // if (nextProps.sport && nextProps.sport.id && nextProps.sport.id !== '') {
    //   const index = nextProps.sportsList.findIndex(sport => sport.id === nextProps.sport.id);
    //   if (index > -1) {
    //     this.props.setCertificationsList({certificationsList: nextProps.sportsList && nextProps.sportsList.length ? nextProps.sportsList[index].certifications : []});
    //   }
    // }
  }
  sportExists() {
    return true/* this.props.sport !== undefined */;
  }
  render() {
    return (
      <div className={'uk-grid uk-grid-mobile ' + (this.props.item ? 'secRow mt20' : '')}>
        <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
          <div className="uk-form-inline uk-from-inline-mobile">

            <div className={this.props.isInValid ? 'field-holder error' : 'field-holder'}>
              <label className="uk-form-label uk-form-help-block" htmlFor="typeSport">{this.props.p.t('InputSport.coaching')}</label>
              <div className="multiLevelDD">
                <div className="rowOne">
                  <input type="text" className="field-required" onChange={this.handleChangeSports} placeholder={this.props.p.t('InputSport.typeSport')} value={this.state.sportName} onFocus={this.handleFocusSports} onBlur={this.handleBlurSports}/>
                  <span style={{display: this.state.arrowSports}} className="arrowIcon">
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

                <div className="rowSpeciality" style={{display: (this.state.visibleAddSpecialization === 'block' || this.state.visibleSpecialization === 'block' || (this.props.sport && this.props.sport.specializations && this.props.sport.specializations.length)) ? 'block' : 'none'}}>
                  <a className="addLink" onClick={this.handleAddSpecialization} style={{display: this.state.visibleSpecialization === 'none' && (this.props.sport && this.props.sport.specializations ? this.props.sport.specializations.length === 0 : true) ? 'block' : 'none', textAlign: 'left'}}>{this.props.p.t('InputSport.addSpeciality')}</a>

                  <a className="linkValueSpeciality" onClick={this.handleAddSpecialization} style={{display: this.props.sport && this.props.sport.specializations && this.props.sport.specializations.length ? 'block' : 'none'}}>
                    {
                      this.props.sport && this.props.sport.specializations && this.props.sport.specializations.length && this.props.sport.specializations.map((spec, i) => {
                        const elem = i === this.props.sport.specializations.length - 1 ? spec.name : spec.name + ', ';
                        return <span key={i}>{elem}</span>;
                      })
                    }
                  </a>

                  <h6 className="specialityHead mt10" style={{display: this.state.visibleSpecialization}}>{this.props.p.t('InputSport.addSpeciality')}</h6>

                  <ul className="checkBoxList" style={{display: this.state.visibleSpecialization}}>
                    {
                      this.state.item >= 0 && this.state.item < this.props.sportsList.length ? this.props.sportsList[this.state.item] ? this.props.sportsList[this.state.item].specializations.map((spec, i) => {
                        return (
                          <li key={spec.id} style={{display: this.state.visibleSpecialization}}>
                            <input className="optioncheckbox" id={'specialization' + this.props.item + i} type="checkbox" defaultValue={spec.id} checked={this.isCheckedSpecialization(spec.id)} onChange={this.handleClickSports}/>
                            <label htmlFor={'specialization' + this.props.item + i}>{this.props.sportsList[this.state.item].specializations[i].name}</label>
                          </li>);
                      }) : '' : ''
                    }
                    <li className="LastChild" style={{display: this.state.visibleSpecialization}}><a onClick={this.handleDoneSports} style={{display: this.state.visibleSpecialization}}>{this.props.p.t('InputSport.done')}</a></li>
                  </ul>

                </div>
              </div>

              <span className="error-text">{this.props.sspValidation.buildProfile.sport.required === false ? this.props.p.t('InputSport.validation_messages.sportsName.required') : this.props.p.t('InputSport.validation_messages.sportsName.valid')}</span>
            </div>

          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      item: PropTypes.number,
      sportsList: PropTypes.array,
      sports: PropTypes.array,
      history: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sspValidation: PropTypes.object.isRequired,
      isInValid: PropTypes.bool
    };
  }
}

InputSportClass.defaultProps = {
  item: [],
  sportsList: [],
  sports: [],
  history: {},
  isInValid: false
};

const mapStateToProps = state => {
  const {sports, sport, profile} = state;
  return {
    sports,
    sport,
    profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fn: dispatch(() => {})
  };
};

const InputSport = connect(mapStateToProps)(InputSportClass);
export default translate(InputSport);

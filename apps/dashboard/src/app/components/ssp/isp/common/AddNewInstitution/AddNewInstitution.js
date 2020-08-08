import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import Modal from '../../../../common/Modal';
import {fetchCountries, fetchStates, fetchCitiesByState, addMaterData} from '../../../../../actions/index';
import {REJECTED, PENDING, FULFILLED} from '../../../../../constants/ActionTypes';
import AutoSuggetion from '../../../../common/AutoSuggetion';
import appConstants from '../../../../../constants/appConstants';

function notNull(value) {
  const object = value.trim();
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
class AddNewInstitution extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCountrySearch = this.handleCountrySearch.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.handleStateSelection = this.handleStateSelection.bind(this);
    this.handleStateHighlightChange = this.handleStateHighlightChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.updateCityChange = this.updateCityChange.bind(this);
    this.handleCitySelection = this.handleCitySelection.bind(this);
    this.handleCityHighlightChange = this.handleCityHighlightChange.bind(this);
    this.handleInstitutionChange = this.handleInstitutionChange.bind(this);
    this.validateData = this.validateData.bind(this);
    this.onStateBlur = this.onStateBlur.bind(this);
    this.state = {data: {
      countryName: '',
      countryID: '',
      stateName: '',
      stateID: '',
      cityName: '',
      cityID: '',
      name: '',
      year: null,
      sportID: null,
      type: appConstants.masterDataTypes.ispInstitution,
      notes: null
    },
    valid: false, submitted: false, posted: false};
  }
  handleChange(e) {
    this.setState({degreeName: e.target.value});
    this.setState({valid: false});
  }
  handleSubmit() {
    this.setState({submitted: true});
    if (this.validateData()) {
      const data = this.state.data;
      if (this.props.sportsSpecific) {
        data.sportID = this.props.currentSport.data.id;
      } else {
        data.sportID = '';
      }
      this.props.addMaterData(data, {profileID: this.props.profile.data.profile.id});
      this.setState({posted: true});
    }
  }
  componentDidMount() {
    if (this.props.countries.status !== FULFILLED && this.props.countries.status !== PENDING && this.props.countries.status !== REJECTED) {
      this.props.fetchCountries();
    }
  }
  handleCountryChange(e) {
    const newData = this.state.data;
    newData.countryID = e.target.value;
    newData.countryName = this.props.countries.data[this.handleCountrySearch(this.props.countries.data, e.target.value)].name;
    newData.stateName = '';
    newData.stateID = '';
    newData.cityID = '';
    newData.cityName = '';
    this.setState({data: newData});
    this.props.fetchStates({countryID: e.target.value});
  }
  handleCountrySearch(countries, id) {
    return countries.findIndex(country => country.id === id);
  }
  onStateChange(e, {newValue}) {
    const newData = this.state.data;
    newData.stateName = newValue;
    newData.stateID = '';
    this.setState({data: newData});
  }
  handleStateSelection(event, {suggestion}) {
    const newData = this.state.data;
    newData.stateName = suggestion.name;
    newData.stateID = suggestion.id;
    newData.cityID = '';
    newData.cityName = '';
    this.setState({data: newData});
    this.props.fetchCitiesByState({id: suggestion.id});
  }
  handleStateHighlightChange({suggestion}) {
    if (suggestion) {
      const newData = this.state.data;
      newData.stateName = suggestion.name;
      newData.stateID = suggestion.id;
      newData.cityID = '';
      newData.cityName = '';
      this.setState({data: newData});
    }
  }
  onStateBlur() {
    const {stateID} = this.state.data;
    if (stateID) {
      this.props.fetchCitiesByState({id: stateID});
    }
  }
  onCityChange(event, {newValue}) {
    const newData = this.state.data;
    newData.cityID = '';
    newData.cityName = newValue;
    this.updateCityChange(newData);
  }
  updateCityChange(data) {
    this.setState({data});
  }
  handleCitySelection(event, {suggestion}) {
    const newData = this.state.data;
    newData.cityName = suggestion.name;
    newData.cityID = suggestion.id;
    this.updateCityChange(newData);
  }
  handleCityHighlightChange({suggestion}) {
    if (suggestion) {
      const newData = this.state.data;
      newData.cityName = suggestion.name;
      newData.cityID = suggestion.id;
      this.setState({data: newData});
    }
  }
  handleInstitutionChange(e) {
    const newData = this.state.data;
    newData.name = e.target.value;
    this.setState({data: newData});
  }
  validateData() {
    if (notNull(this.state.data.name) && notNull(this.state.data.countryID) && notNull(this.state.data.cityName)) {
      return true;
    }
    return false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.addNewMasterData.status === FULFILLED && this.state.posted) {
      this.setState({posted: true, data: {countryName: '', countryID: '', stateName: '', stateID: '', cityName: '', cityID: '', name: ''}, valid: false, submitted: false, showSuccess: true});
    }
  }
  handleClose() {
    this.props.handleClose();
    this.setState({posted: false, data: {countryName: '', countryID: '', stateName: '', stateID: '', cityName: '', cityID: '', name: ''}, valid: false, submitted: false, showSuccess: false});
  }
  render() {
    const {p, msgBodyKey} = this.props;
    const type = p.t('Biography.institution');
    const stateInputProps = {
      value: this.state.data.stateName,
      placeholder: this.props.p.t(this.props.textKey + '.placeholder2'),
      onChange: this.onStateChange,
      onBlur: this.onStateBlur
    };
    const cityInputProps = {
      value: this.state.data.cityName,
      onChange: this.onCityChange,
      placeholder: this.props.p.t(this.props.textKey + '.placeholder3')
    };
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div id="addinstituteModal" className="degreeModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2>{this.props.p.t(this.props.textKey + '.h2')}</h2>
              {!this.state.showSuccess &&
              <p><span>{this.props.p.t(this.props.textKey + '.note')}:</span> {this.props.p.t(this.props.textKey + '.p')}</p>
              }
              <a onClick={this.props.handleClose} className="del uk-modal-close">
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              <div className="uk-grid">
                {this.state.showSuccess &&
                <div className="uk-width-xlarge-1-1 mb25">
                  <p className="cl-alert-text-green">{p.t(msgBodyKey, {type})}</p>
                </div>
                }
                {!this.state.showSuccess &&
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={this.state.submitted && !notNull(this.state.data.name) ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t(this.props.textKey + '.name')}</label>
                    <input type="text" onChange={this.handleInstitutionChange} name="" className="field-required" placeholder={this.props.p.t(this.props.textKey + '.placeholder1')}/>
                    <span className="error-text">{this.props.p.t(this.props.textKey + '.validation_messages.name')}</span>
                  </div>
                </div>
                }
              </div>
              {!this.state.showSuccess &&
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={this.state.submitted && !notNull(this.state.data.countryID) ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t(this.props.textKey + '.country')}</label>
                    <select onChange={this.handleCountryChange} selected={this.state.data.countryID}>
                      <option value="">{this.props.p.t(this.props.textKey + '.select_country')}</option>
                      {
                        this.props.countries.data.map(country => {
                          return <option key={country.id} value={country.id} name={country.name}>{country.name}</option>;
                        })
                      }
                    </select>
                    <span className="error-text">{this.props.p.t(this.props.textKey + '.validation_messages.country')}</span>
                  </div>
                </div>
              </div>
              }
              {!this.state.showSuccess &&
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="field-holder">
                    <label>{this.props.p.t(this.props.textKey + '.state')}</label>
                    <div className="uk-autocomplete cl-sd-degreeDropdownhead lastnotlink" >
                      <AutoSuggetion inputProps={stateInputProps} list={this.props.states.data} onSelectSuggetion={this.handleStateSelection} onSuggestionHighlighted={this.handleStateHighlightChange}/>
                    </div>
                    <span className="error-text">{this.props.p.t(this.props.textKey + '.validation_messages.state')}</span>
                  </div>
                </div>
              </div>
              }
              {!this.state.showSuccess &&
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={this.state.submitted && !notNull(this.state.data.cityName) ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t(this.props.textKey + '.city')}</label>
                    <div className="uk-autocomplete cl-sd-degreeDropdownhead lastnotlink" >
                      <AutoSuggetion inputProps={cityInputProps} list={this.props.cities.data} onSelectSuggetion={this.handleCitySelection} onSuggestionHighlighted={this.handleCityHighlightChange}/>
                    </div>
                    <span className="error-text">{this.props.p.t(this.props.textKey + '.validation_messages.city')}</span>
                  </div>
                </div>
              </div>
              }
              { this.props.addNewMasterData.status === REJECTED &&
              <div className="uk-grid">
                {!this.state.showSuccess &&
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="gen_error">
                    <div className="tableDiv">
                      <div className="lCol">
                        <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                      </div>
                      <div className="rCol">
                        <p>{this.props.p.t('SaveButton.error_message')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                }
              </div>
              }
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                {!this.state.showSuccess &&
                <div className="lCol">
                  <a onClick={this.handleSubmit} className="general_btn">{this.props.p.t(this.props.textKey + '.submit')}</a>
                </div>
                }
                {!this.state.showSuccess &&
                <div className="rCol">
                  <a onClick={this.handleClose} className="cancel">{this.props.p.t(this.props.textKey + '.cancel')}</a>
                </div>
                }
                {this.state.showSuccess &&
                <div className="rCol">
                  <a onClick={this.handleClose} className="general_btn">{this.props.p.t('Biography.close')}</a>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      handleClose: PropTypes.func.isRequired,
      sportsSpecific: PropTypes.bool.isRequired,
      currentSport: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      textKey: PropTypes.string.isRequired,
      countries: PropTypes.object.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      states: PropTypes.object.isRequired,
      fetchStates: PropTypes.func.isRequired,
      cities: PropTypes.object.isRequired,
      fetchCitiesByState: PropTypes.func.isRequired,
      addMaterData: PropTypes.func.isRequired,
      addNewMasterData: PropTypes.object,
      msgBodyKey: PropTypes.string
    };
  }
}

AddNewInstitution.defaultProps = {
  addNewMasterData: {data: {}, status: null},
  msgBodyKey: 'Biography.master_data_submitted'
};

const mapStateToProps = state => {
  const {
    currentSport,
    profile,
    countries,
    states,
    cities,
    addNewMasterData
  } = state;
  return {
    currentSport,
    profile,
    countries,
    states,
    cities,
    addNewMasterData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: params => dispatch(fetchStates(params)),
    fetchCitiesByState: params => dispatch(fetchCitiesByState(params)),
    addMaterData: (data, params) => dispatch(addMaterData(data, params))
  };
};

const AddNewInstitutionModal = connect(mapStateToProps, mapDispatchToProps)(translate(AddNewInstitution));
export default AddNewInstitutionModal;

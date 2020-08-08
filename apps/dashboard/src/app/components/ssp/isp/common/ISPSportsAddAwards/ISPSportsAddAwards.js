import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import AddNewBiographyModal from '../AddNewBiographyModal';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CantFind from '../CantFind';
import {updateNewAward, submitNewAwards, addNewSportsAward, clearNewAward, clearNewAwardsValidation, fetchSportsList, setSportsAwardsList} from '../../../../../actions/index';
import AddNewAwardModal from '../AddNewAward';
import AddNewInstitution from '../AddNewInstitution';
class ISPAddAwards extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
    this.onAwardNameChange = this.onAwardNameChange.bind(this);
    this.onInstitutionChange = this.onInstitutionChange.bind(this);
    this.onInstitutionNameChange = this.onInstitutionNameChange.bind(this);
    this.clearNewAwardStates = this.clearNewAwardStates.bind(this);
    this.onCantFindClick = this.onCantFindClick.bind(this);
    this.renderCantFindModal = this.renderCantFindModal.bind(this);
    this.onAddNewAwardModalClose = this.onAddNewAwardModalClose.bind(this);
    this.onAddNewInstitutionModalClose = this.onAddNewInstitutionModalClose.bind(this);
    this.onCantFindInstitutionClick = this.onCantFindInstitutionClick.bind(this);
    this.handleHighlightedAwardsChange = this.handleHighlightedAwardsChange.bind(this);
    this.handleHighlightedInstitutionChange = this.handleHighlightedInstitutionChange.bind(this);
    this.findAwardList = this.findAwardList.bind(this);
    this.state = {
      isModalOpen: false,
      awardName: '',
      institutionName: '',
      isAddNewAwardModalOpen: false,
      isAddNewInstitutionModalOpen: false
    };
    this.onAwardChange = this.onAwardChange.bind(this);
  }
  componentDidMount() {
    this.findAwardList(this.props);
  }
  findAwardList(nexProps) {
    if (nexProps.sportsAwardsList.status !== FULFILLED) {
      if (nexProps.sportsList.status !== FULFILLED && nexProps.sportsList.status !== PENDING && nexProps.sportsList.status !== REJECTED) {
        this.props.fetchSportsList();
      } else {
        const index = this.props.sportsList.data.findIndex(sport => sport.id === this.props.currentSport.id);
        if (index >= 0) {
          const data = this.props.sportsList && this.props.sportsList.data.length ? this.props.sportsList.data[index].awards : [];
          this.props.setSportsAwardsList(data);
        }
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.findAwardList(nextProps);
  }
  handleClick() {
    this.setState({isModalOpen: true});
    this.clearNewAwardStates();
  }
  onModalClose() {
    this.props.submitNewAwards({status: false});
    this.setState({isModalOpen: false});
    this.clearNewAwardStates();
  }
  onAdd() {
    this.props.submitNewAwards({status: true});
    if (this.props.validateNewAwards.valid) {
      this.props.addNewSportsAward(this.props.newAward);
      this.onModalClose();
    }
  }
  onSelectYear(e) {
    this.props.updateNewAward({year: e.target.value});
  }
  onAwardChange(event, {suggestion}) {
    this.setState({awardName: suggestion.name});
    this.props.updateNewAward({name: suggestion.name, id: suggestion.id});
  }
  handleHighlightedAwardsChange({suggestion}) {
    if (suggestion) {
      this.setState({awardName: suggestion.name});
      this.props.updateNewAward({name: suggestion.name, id: suggestion.id});
    }
  }
  onAwardNameChange(e, {newValue}) {
    this.setState({awardName: newValue});
    this.props.updateNewAward({name: '', id: ''});
  }
  onInstitutionChange(event, {suggestion}) {
    this.setState({institutionName: suggestion.name});
    this.props.updateNewAward({institutionID: suggestion.id, institutionName: suggestion.name});
  }
  handleHighlightedInstitutionChange({suggestion}) {
    if (suggestion) {
      this.setState({institutionName: suggestion.name});
      this.props.updateNewAward({institutionID: suggestion.id, institutionName: suggestion.name});
    }
  }
  onInstitutionNameChange(e, {newValue}) {
    this.setState({institutionName: newValue});
    this.props.updateNewAward({institutionID: '', institutionName: ''});
  }
  clearNewAwardStates() {
    this.props.clearNewAward();
    this.props.clearNewAwardsValidation();
    this.setState({awardName: '', institutionName: ''});
  }
  renderCantFindModal() {
    return (
      <CantFind handleAddNewModal={this.onCantFindClick}/>
    );
  }
  onCantFindClick() {
    this.setState({isAddNewAwardModalOpen: true});
    this.onModalClose();
  }
  onAddNewAwardModalClose() {
    this.setState({isAddNewAwardModalOpen: false});
  }
  renderCantFindInstitution() {
    return (
      <CantFind handleAddNewModal={this.onCantFindInstitutionClick}/>
    );
  }
  onCantFindInstitutionClick() {
    this.setState({isAddNewInstitutionModalOpen: true});
    this.onModalClose();
  }
  onAddNewInstitutionModalClose() {
    this.setState({isAddNewInstitutionModalOpen: false});
  }
  render() {
    const cantFind = this.renderCantFindModal();
    const cantFindInstitution = this.renderCantFindInstitution();
    return (
      <div>
        <a onClick={this.handleClick} className="cl-sd-addAnother-btn">{this.props.p.t('ISPAddAwards.add_awards')}</a>
        <AddNewBiographyModal onHighlightedInstitutionChange={this.handleHighlightedInstitutionChange} onHighlightedInputChange={this.handleHighlightedAwardsChange} cantFindInstitution={cantFindInstitution} cantFind={cantFind} element={this.props.validateNewAwards} year={this.props.newAward.year} handleInstitutionNameChange={this.onInstitutionNameChange} institutionName={this.state.institutionName} handleInstitutionChange={this.onInstitutionChange} handleInputChange={this.onAwardChange} textKey="ISPAddAwards" isModalOpen={this.state.isModalOpen} handleCloseModal={this.onModalClose} handleAdd={this.onAdd} handleSelectYear={this.onSelectYear} list={this.props.sportsAwardsList.data} input={this.state.awardName} inpuChange={this.onAwardNameChange}/>
        <AddNewAwardModal handleClose={this.onAddNewAwardModalClose} isModalOpen={this.state.isAddNewAwardModalOpen} sportsSpecific/>
        <AddNewInstitution textKey="AddNewInstitution" handleClose={this.onAddNewInstitutionModalClose} isModalOpen={this.state.isAddNewInstitutionModalOpen} sportsSpecific/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sportsAwardsList: PropTypes.object,
      newAward: PropTypes.object.isRequired,
      updateNewAward: PropTypes.func.isRequired,
      validateNewAwards: PropTypes.object.isRequired,
      submitNewAwards: PropTypes.func.isRequired,
      addNewSportsAward: PropTypes.func.isRequired,
      clearNewAward: PropTypes.func.isRequired,
      clearNewAwardsValidation: PropTypes.func.isRequired,
      fetchSportsList: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired,
      sportsList: PropTypes.object.isRequired,
      setSportsAwardsList: PropTypes.func.isRequired
    };
  }
}

ISPAddAwards.defaultProps = {
  sportsAwardsList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {
    sportsAwardsList,
    newAward,
    validateNewAwards,
    currentSport,
    sportsList
  } = state;
  return {
    sportsAwardsList,
    newAward,
    validateNewAwards,
    currentSport,
    sportsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNewAward: updatedData => dispatch(updateNewAward(updatedData)),
    submitNewAwards: data => dispatch(submitNewAwards(data)),
    addNewSportsAward: data => dispatch(addNewSportsAward(data)),
    clearNewAward: () => dispatch(clearNewAward()),
    clearNewAwardsValidation: () => dispatch(clearNewAwardsValidation()),
    fetchSportsList: () => dispatch(fetchSportsList()),
    setSportsAwardsList: data => dispatch(setSportsAwardsList(data))
  };
};

const ISPAddAwardsLink = connect(mapStateToProps, mapDispatchToProps)(translate(ISPAddAwards));
export default ISPAddAwardsLink;

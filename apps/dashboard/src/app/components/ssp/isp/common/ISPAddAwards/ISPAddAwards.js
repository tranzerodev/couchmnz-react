import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import AddNewBiographyModal from '../AddNewBiographyModal';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CantFind from '../CantFind';
import {fetchGenAwardsList, updateNewAward, submitNewAwards, addNewAward, clearNewAward, clearNewAwardsValidation} from '../../../../../actions/index';
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
    this.state = {
      isModalOpen: false,
      awardName: '',
      institutionName: '',
      isAddNewAwardModalOpen: false,
      isAddNewInstitutionModalOpen: false,
      institutionsList: []
    };
    this.onAwardChange = this.onAwardChange.bind(this);
  }
  componentDidMount() {
    if (this.props.genAwardsList.status !== FULFILLED && this.props.genAwardsList.status !== PENDING && this.props.genAwardsList.status !== REJECTED) {
      this.props.fetchGenAwardsList();
    }
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
      this.props.addNewAward(this.props.newAward);
      this.onModalClose();
    }
  }
  onSelectYear(e) {
    this.props.updateNewAward({year: e.target.value});
  }
  onAwardChange(event, {suggestion}) {
    this.setState({awardName: suggestion.name});
    this.props.updateNewAward({name: suggestion.name, id: ''});
    this.fetchInstitutionChildren(suggestion.name);
  }
  handleHighlightedAwardsChange({suggestion}) {
    if (suggestion) {
      this.setState({awardName: suggestion.name});
      this.props.updateNewAward({name: suggestion.name, id: ''});
      this.fetchInstitutionChildren(suggestion.name);
    }
  }
  onAwardNameChange(e, {newValue}) {
    this.setState({awardName: newValue});
    this.props.updateNewAward({name: newValue, id: ''});
    this.fetchInstitutionChildren(newValue);
  }
  onInstitutionChange(event, {suggestion}) {
    this.setState({institutionName: suggestion.name});
    this.props.updateNewAward({id: suggestion.id, institutionName: suggestion.name});
  }
  handleHighlightedInstitutionChange({suggestion}) {
    if (suggestion) {
      this.setState({institutionName: suggestion.name});
      this.props.updateNewAward({id: suggestion.id, institutionName: suggestion.name});
    }
  }
  onInstitutionNameChange(e, {newValue}) {
    this.setState({institutionName: newValue});
    this.props.updateNewAward({institutionID: '', institutionName: ''});
  }
  fetchInstitutionChildren(awardName) {
    this.setState({institutionName: ''});
    const institutionsList = this.props.genAwardsList.data.find(e => e.name === awardName);
    if (institutionsList === undefined) {
      this.setState({institutionsList: []});
    } else {
      this.setState({institutionsList: institutionsList.institutes});
    }
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
        <AddNewBiographyModal institutionsList={this.state.institutionsList} onHighlightedInstitutionChange={this.handleHighlightedInstitutionChange} onHighlightedInputChange={this.handleHighlightedAwardsChange} cantFindInstitution={cantFindInstitution} cantFind={cantFind} element={this.props.validateNewAwards} year={this.props.newAward.year} handleInstitutionNameChange={this.onInstitutionNameChange} institutionName={this.state.institutionName} handleInstitutionChange={this.onInstitutionChange} handleInputChange={this.onAwardChange} textKey="ISPAddAwards" isModalOpen={this.state.isModalOpen} handleCloseModal={this.onModalClose} handleAdd={this.onAdd} handleSelectYear={this.onSelectYear} list={this.props.genAwardsList.data} input={this.state.awardName} inpuChange={this.onAwardNameChange}/>
        <AddNewAwardModal handleClose={this.onAddNewAwardModalClose} isModalOpen={this.state.isAddNewAwardModalOpen} sportsSpecific={false}/>
        <AddNewInstitution textKey="AddNewInstitution" handleClose={this.onAddNewInstitutionModalClose} isModalOpen={this.state.isAddNewInstitutionModalOpen} sportsSpecific={false}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      genAwardsList: PropTypes.object,
      fetchGenAwardsList: PropTypes.func.isRequired,
      newAward: PropTypes.object.isRequired,
      updateNewAward: PropTypes.func.isRequired,
      validateNewAwards: PropTypes.object.isRequired,
      submitNewAwards: PropTypes.func.isRequired,
      addNewAward: PropTypes.func.isRequired,
      clearNewAward: PropTypes.func.isRequired,
      clearNewAwardsValidation: PropTypes.func.isRequired
    };
  }
}

ISPAddAwards.defaultProps = {
  genAwardsList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {
    genAwardsList,
    newAward,
    validateNewAwards
  } = state;
  return {
    genAwardsList,
    newAward,
    validateNewAwards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenAwardsList: () => dispatch(fetchGenAwardsList()),
    updateNewAward: updatedData => dispatch(updateNewAward(updatedData)),
    submitNewAwards: data => dispatch(submitNewAwards(data)),
    addNewAward: data => dispatch(addNewAward(data)),
    clearNewAward: () => dispatch(clearNewAward()),
    clearNewAwardsValidation: () => dispatch(clearNewAwardsValidation())
  };
};

const ISPAddAwardsLink = connect(mapStateToProps, mapDispatchToProps)(translate(ISPAddAwards));
export default ISPAddAwardsLink;

import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import AddNewBiographyModal from '../AddNewBiographyModal';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CantFind from '../CantFind';
import {fetchSportsDegreesList, updateNewDegree, submitNewDegree, addNewSportsDegree, clearNewDegree} from '../../../../../actions/index';
import AddNewDegreeModal from '../AddNewDegree';
import AddNewInstitution from '../AddNewInstitution';
class ISPSportsAddDegree extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
    this.onDegreeNameChange = this.onDegreeNameChange.bind(this);
    this.onInstitutionChange = this.onInstitutionChange.bind(this);
    this.onInstitutionNameChange = this.onInstitutionNameChange.bind(this);
    this.clearNewDegreeStates = this.clearNewDegreeStates.bind(this);
    this.onCantFindClick = this.onCantFindClick.bind(this);
    this.renderCantFindModal = this.renderCantFindModal.bind(this);
    this.onAddNewDegreeModalClose = this.onAddNewDegreeModalClose.bind(this);
    this.onAddNewInstitutionModalClose = this.onAddNewInstitutionModalClose.bind(this);
    this.onCantFindInstitutionClick = this.onCantFindInstitutionClick.bind(this);
    this.handleHighlightedDegreeChange = this.handleHighlightedDegreeChange.bind(this);
    this.handleHighlightedInstitutionChange = this.handleHighlightedInstitutionChange.bind(this);
    this.loadSportsDegreesList = this.loadSportsDegreesList.bind(this);
    this.state = {
      isModalOpen: false,
      degreeName: '',
      institutionName: '',
      isAddNewDegreeModalOpen: false,
      isAddNewInstitutionModalOpen: false,
      institutionsList: []
    };
    this.onDegreeChange = this.onDegreeChange.bind(this);
  }
  componentDidMount() {
    this.loadSportsDegreesList(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.loadSportsDegreesList(nextProps);
  }
  loadSportsDegreesList(props) {
    if (props.currentSport.status === FULFILLED && props.sportsDegreesList.status !== FULFILLED && props.sportsDegreesList.status !== PENDING && props.sportsDegreesList.status !== REJECTED) {
      props.fetchSportsDegreesList(props.currentSport.data.id);
    }
  }
  handleClick() {
    this.setState({isModalOpen: true});
    this.clearNewDegreeStates();
  }
  onModalClose() {
    this.props.submitNewDegree({status: false});
    this.setState({isModalOpen: false});
    this.clearNewDegreeStates();
  }
  onAdd() {
    this.props.submitNewDegree({status: true});
    if (this.props.validateNewDegree.valid) {
      this.props.addNewSportsDegree(this.props.newDegree);
      this.onModalClose();
    }
  }
  onSelectYear(e) {
    this.props.updateNewDegree({year: e.target.value});
  }
  onDegreeChange(event, {suggestion}) {
    this.setState({degreeName: suggestion.name});
    this.props.updateNewDegree({name: suggestion.name, id: ''});
    this.fetchInstitutionChildren(suggestion.name);
  }
  handleHighlightedDegreeChange({suggestion}) {
    if (suggestion) {
      this.setState({degreeName: suggestion.name});
      this.props.updateNewDegree({name: suggestion.name, id: ''});
      this.fetchInstitutionChildren(suggestion.name);
    }
  }
  onDegreeNameChange(e, {newValue}) {
    this.setState({degreeName: newValue});
    this.props.updateNewDegree({name: newValue, id: ''});
    this.fetchInstitutionChildren(newValue);
  }
  onInstitutionChange(event, {suggestion}) {
    this.setState({institutionName: suggestion.name});
    this.props.updateNewDegree({id: suggestion.id, institutionName: suggestion.name});
  }
  handleHighlightedInstitutionChange({suggestion}) {
    if (suggestion) {
      this.setState({institutionName: suggestion.name});
      this.props.updateNewDegree({id: suggestion.id, institutionName: suggestion.name});
    }
  }
  onInstitutionNameChange(e, {newValue}) {
    this.setState({institutionName: newValue});
  }
  clearNewDegreeStates() {
    this.props.clearNewDegree();
    this.setState({degreeName: '', institutionName: ''});
  }
  fetchInstitutionChildren(degreeName) {
    this.setState({institutionName: ''});
    const institutionsList = this.props.sportsDegreesList.data.find(e => e.name === degreeName);
    if (institutionsList === undefined) {
      this.setState({institutionsList: []});
    } else {
      this.setState({institutionsList: institutionsList.institutes});
    }
  }
  renderCantFindModal() {
    return (
      <CantFind handleAddNewModal={this.onCantFindClick}/>
    );
  }
  onCantFindClick() {
    this.setState({isAddNewDegreeModalOpen: true});
    this.onModalClose();
  }
  onAddNewDegreeModalClose() {
    this.setState({isAddNewDegreeModalOpen: false});
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
    const list = this.props.sportsDegreesList.data;
    return (
      <div>
        <a onClick={this.handleClick} className="cl-sd-addAnother-btn">{this.props.p.t('ISPAddDegree.add_degree')}</a>
        <AddNewBiographyModal
          institutionsList={this.state.institutionsList}
          onHighlightedInstitutionChange={this.handleHighlightedInstitutionChange}
          onHighlightedInputChange={this.handleHighlightedDegreeChange}
          cantFindInstitution={cantFindInstitution}
          cantFind={cantFind}
          element={this.props.validateNewDegree}
          year={this.props.newDegree.year}
          handleInstitutionNameChange={this.onInstitutionNameChange}
          institutionName={this.state.institutionName}
          handleInstitutionChange={this.onInstitutionChange}
          handleInputChange={this.onDegreeChange}
          textKey="ISPAddDegree"
          isModalOpen={this.state.isModalOpen}
          handleCloseModal={this.onModalClose}
          handleAdd={this.onAdd}
          handleSelectYear={this.onSelectYear}
          list={list}
          input={this.state.degreeName}
          inpuChange={this.onDegreeNameChange}
        />
        <AddNewDegreeModal
          handleClose={this.onAddNewDegreeModalClose}
          isModalOpen={this.state.isAddNewDegreeModalOpen}
          sportsSpecific
        />
        <AddNewInstitution textKey="AddNewInstitution" handleClose={this.onAddNewInstitutionModalClose} isModalOpen={this.state.isAddNewInstitutionModalOpen} sportsSpecific/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchSportsDegreesList: PropTypes.func.isRequired,
      newDegree: PropTypes.object.isRequired,
      updateNewDegree: PropTypes.func.isRequired,
      validateNewDegree: PropTypes.object.isRequired,
      submitNewDegree: PropTypes.func.isRequired,
      addNewSportsDegree: PropTypes.func.isRequired,
      clearNewDegree: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired,
      sportsDegreesList: PropTypes.object
    };
  }
}

ISPSportsAddDegree.defaultProps = {
  sportsDegreesList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {
    newDegree,
    validateNewDegree,
    sportsList,
    currentSport,
    sportsDegreesList
  } = state;
  return {
    newDegree,
    validateNewDegree,
    sportsList,
    currentSport,
    sportsDegreesList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSportsDegreesList: sportID => dispatch(fetchSportsDegreesList(sportID)),
    updateNewDegree: updatedData => dispatch(updateNewDegree(updatedData)),
    submitNewDegree: data => dispatch(submitNewDegree(data)),
    addNewSportsDegree: data => dispatch(addNewSportsDegree(data)),
    clearNewDegree: () => dispatch(clearNewDegree())
  };
};

const ISPSportsAddDegreeLink = connect(mapStateToProps, mapDispatchToProps)(translate(ISPSportsAddDegree));
export default ISPSportsAddDegreeLink;

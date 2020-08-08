import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import AddNewBiographyModal from '../AddNewBiographyModal';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CantFind from '../CantFind';
import {updateNewCertifications, submitNewCertification, addNewSportsCertification, clearNewCertification, clearNewCertificationValidation, fetchSportsCertificationsList} from '../../../../../actions/index';
import AddNewCertificationModal from '../AddNewCertification';
import AddNewInstitution from '../AddNewInstitution';
class ISPSportsAddCertifications extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
    this.onCertificationNameChange = this.onCertificationNameChange.bind(this);
    this.onInstitutionChange = this.onInstitutionChange.bind(this);
    this.onInstitutionNameChange = this.onInstitutionNameChange.bind(this);
    this.clearNewCertificationStates = this.clearNewCertificationStates.bind(this);
    this.onCantFindClick = this.onCantFindClick.bind(this);
    this.renderCantFindModal = this.renderCantFindModal.bind(this);
    this.onAddNewDegreeModalClose = this.onAddNewDegreeModalClose.bind(this);
    this.onAddNewInstitutionModalClose = this.onAddNewInstitutionModalClose.bind(this);
    this.onCantFindInstitutionClick = this.onCantFindInstitutionClick.bind(this);
    this.handleHighlightedCertificationChange = this.handleHighlightedCertificationChange.bind(this);
    this.handleHighlightedInstitutionChange = this.handleHighlightedInstitutionChange.bind(this);
    this.loadSportsCertificationsList = this.loadSportsCertificationsList.bind(this);
    this.state = {
      isModalOpen: false,
      certificationName: '',
      certifierName: '',
      isAddNewDegreeModalOpen: false,
      isAddNewInstitutionModalOpen: false,
      institutionsList: []
    };
    this.onCertificationChange = this.onCertificationChange.bind(this);
  }
  componentDidMount() {
    this.loadSportsCertificationsList(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.loadSportsCertificationsList(nextProps);
  }
  loadSportsCertificationsList(props) {
    if (props.currentSport.status === FULFILLED && props.sportsCertificationsList.status !== FULFILLED && props.sportsCertificationsList.status !== PENDING && props.sportsCertificationsList.status !== REJECTED) {
      props.fetchSportsCertificationsList(props.currentSport.data.id);
    }
  }
  handleClick() {
    this.setState({isModalOpen: true});
    this.clearNewCertificationStates();
  }
  onModalClose() {
    this.setState({isModalOpen: false});
    this.clearNewCertificationStates();
  }
  onAdd() {
    this.props.submitNewCertification({status: true});
    if (this.props.validateNewCertification.valid) {
      this.props.addNewSportsCertification(this.props.newCertification);
      this.onModalClose();
    }
  }
  onSelectYear(e) {
    this.props.updateNewCertifications({year: e.target.value});
  }
  onCertificationChange(event, {suggestion}) {
    this.setState({certificationName: suggestion.name});
    this.props.updateNewCertifications({name: suggestion.name, id: ''});
    this.fetchInstitutionChildren(suggestion.name);
  }
  handleHighlightedCertificationChange({suggestion}) {
    if (suggestion) {
      this.setState({certificationName: suggestion.name});
      this.props.updateNewCertifications({name: suggestion.name, id: ''});
      this.fetchInstitutionChildren(suggestion.name);
    }
  }
  onCertificationNameChange(e, {newValue}) {
    this.setState({certificationName: newValue});
    this.props.updateNewCertifications({name: newValue, id: ''});
    this.fetchInstitutionChildren(newValue);
  }
  onInstitutionChange(event, {suggestion}) {
    this.setState({certifierName: suggestion.name});
    this.props.updateNewCertifications({id: suggestion.id, institutionName: suggestion.name});
  }
  handleHighlightedInstitutionChange({suggestion}) {
    if (suggestion) {
      this.setState({certifierName: suggestion.name});
      this.props.updateNewCertifications({id: suggestion.id, institutionName: suggestion.name});
    }
  }
  onInstitutionNameChange(e, {newValue}) {
    this.setState({certifierName: newValue});
  }
  clearNewCertificationStates() {
    this.props.clearNewCertification();
    this.props.clearNewCertificationValidation();
    this.setState({certificationName: '', certifierName: ''});
  }
  fetchInstitutionChildren(degreeName) {
    this.setState({institutionName: ''});
    const institutionsList = this.props.sportsCertificationsList.data.find(e => e.name === degreeName);
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
    return (
      <div>
        <a onClick={this.handleClick} className="cl-sd-addAnother-btn">{this.props.p.t('ISPAddCertifications.add_certification')}</a>
        <AddNewBiographyModal institutionsList={this.state.institutionsList} onHighlightedInstitutionChange={this.handleHighlightedInstitutionChange} onHighlightedInputChange={this.handleHighlightedCertificationChange} cantFindInstitution={cantFindInstitution} cantFind={cantFind} element={this.props.validateNewCertification} year={this.props.newCertification.year} handleInstitutionNameChange={this.onInstitutionNameChange} institutionName={this.state.certifierName} handleInstitutionChange={this.onInstitutionChange} handleInputChange={this.onCertificationChange} textKey="ISPAddCertification" isModalOpen={this.state.isModalOpen} handleCloseModal={this.onModalClose} handleAdd={this.onAdd} handleSelectYear={this.onSelectYear} list={this.props.sportsCertificationsList.data} input={this.state.certificationName} inpuChange={this.onCertificationNameChange}/>
        <AddNewCertificationModal handleClose={this.onAddNewDegreeModalClose} isModalOpen={this.state.isAddNewDegreeModalOpen} sportsSpecific/>
        <AddNewInstitution textKey="AddNewInstitution" handleClose={this.onAddNewInstitutionModalClose} isModalOpen={this.state.isAddNewInstitutionModalOpen} sportsSpecific/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sportsCertificationsList: PropTypes.object,
      newCertification: PropTypes.object.isRequired,
      updateNewCertifications: PropTypes.func.isRequired,
      validateNewCertification: PropTypes.object.isRequired,
      submitNewCertification: PropTypes.func.isRequired,
      addNewSportsCertification: PropTypes.func.isRequired,
      clearNewCertification: PropTypes.func.isRequired,
      fetchSportsCertificationsList: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired
    };
  }
}

ISPSportsAddCertifications.defaultProps = {
  sportsCertificationsList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {
    sportsCertificationsList,
    newCertification,
    validateNewCertification,
    currentSport
  } = state;
  return {
    sportsCertificationsList,
    newCertification,
    validateNewCertification,
    currentSport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNewCertifications: updatedData => dispatch(updateNewCertifications(updatedData)),
    submitNewCertification: data => dispatch(submitNewCertification(data)),
    addNewSportsCertification: data => dispatch(addNewSportsCertification(data)),
    clearNewCertification: () => dispatch(clearNewCertification()),
    clearNewCertificationValidation: () => dispatch(clearNewCertificationValidation()),
    fetchSportsCertificationsList: sportID => dispatch(fetchSportsCertificationsList(sportID))
  };
};

const ISPSportsAddCertificationsLink = connect(mapStateToProps, mapDispatchToProps)(translate(ISPSportsAddCertifications));
export default ISPSportsAddCertificationsLink;

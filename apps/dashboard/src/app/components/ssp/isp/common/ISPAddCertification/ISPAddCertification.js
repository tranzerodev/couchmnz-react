import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import AddNewBiographyModal from '../AddNewBiographyModal';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CantFind from '../CantFind';
import {fetchGenCertificationList, updateNewCertifications, submitNewCertification, addNewGenCertification, clearNewCertification, clearNewCertificationValidation} from '../../../../../actions/index';
import AddNewCertificationModal from '../AddNewCertification';
import AddNewInstitution from '../AddNewInstitution';
class ISPAddCertifications extends Component {
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
    this.state = {
      isModalOpen: false,
      certificationName: '',
      certifierName: '',
      isAddNewDegreeModalOpen: false,
      isAddNewInstitutionModalOpen: false,
      institutionsList: []
    };
    this.onDegreeChange = this.onDegreeChange.bind(this);
  }
  componentDidMount() {
    if (this.props.genCertificationsList.status !== FULFILLED && this.props.genCertificationsList.status !== PENDING && this.props.genCertificationsList.status !== REJECTED) {
      this.props.fetchGenCertificationList();
    }
  }
  handleClick() {
    this.setState({isModalOpen: true});
    this.clearNewDegreeStates();
  }
  onModalClose() {
    this.setState({isModalOpen: false});
    this.clearNewDegreeStates();
  }
  onAdd() {
    this.props.submitNewCertification({status: true});
    if (this.props.validateNewCertification.valid) {
      this.props.addNewGenCertification(this.props.newCertification);
      this.onModalClose();
    }
  }
  onSelectYear(e) {
    this.props.updateNewCertifications({year: e.target.value});
  }
  onDegreeChange(event, {suggestion}) {
    this.setState({certificationName: suggestion.name});
    this.props.updateNewCertifications({name: suggestion.name, id: ''});
    this.fetchInstitutionChildren(suggestion.name);
  }
  handleHighlightedDegreeChange({suggestion}) {
    if (suggestion) {
      this.setState({certificationName: suggestion.name});
      this.props.updateNewCertifications({name: suggestion.name, id: ''});
      this.fetchInstitutionChildren(suggestion.name);
    }
  }
  onDegreeNameChange(e, {newValue}) {
    this.setState({certificationName: newValue});
    this.props.updateNewCertifications({name: newValue, id: ''});
    this.fetchInstitutionChildren(newValue);
  }
  onInstitutionChange(event, {suggestion}) {
    this.setState({certifierName: suggestion.name});
    this.props.updateNewCertifications({id: suggestion.id, certifierID: suggestion.id, certifierName: suggestion.name});
  }
  handleHighlightedInstitutionChange({suggestion}) {
    if (suggestion) {
      this.setState({certifierName: suggestion.name});
      this.props.updateNewCertifications({id: suggestion.id, certifierID: suggestion.id, certifierName: suggestion.name});
    }
  }
  onInstitutionNameChange(e, {newValue}) {
    this.setState({certifierName: newValue});
    this.props.updateNewCertifications({certifierID: '', certifierName: ''});
  }
  fetchInstitutionChildren(certificateName) {
    this.setState({certifierName: ''});
    const institutionsList = this.props.genCertificationsList.data.find(e => e.name === certificateName);
    if (institutionsList === undefined) {
      this.setState({institutionsList: []});
    } else {
      this.setState({institutionsList: institutionsList.institutes});
    }
  }
  clearNewDegreeStates() {
    this.props.clearNewCertification();
    this.props.clearNewCertificationValidation();
    this.setState({certificationName: '', certifierName: ''});
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
        <AddNewBiographyModal institutionsList={this.state.institutionsList} onHighlightedInstitutionChange={this.handleHighlightedInstitutionChange} onHighlightedInputChange={this.handleHighlightedDegreeChange} cantFindInstitution={cantFindInstitution} cantFind={cantFind} element={this.props.validateNewCertification} year={this.props.newCertification.year} handleInstitutionNameChange={this.onInstitutionNameChange} institutionName={this.state.certifierName} handleInstitutionChange={this.onInstitutionChange} handleInputChange={this.onDegreeChange} textKey="ISPAddCertification" isModalOpen={this.state.isModalOpen} handleCloseModal={this.onModalClose} handleAdd={this.onAdd} handleSelectYear={this.onSelectYear} list={this.props.genCertificationsList.data} input={this.state.certificationName} inpuChange={this.onDegreeNameChange}/>
        <AddNewCertificationModal handleClose={this.onAddNewDegreeModalClose} isModalOpen={this.state.isAddNewDegreeModalOpen} sportsSpecific={false}/>
        <AddNewInstitution textKey="AddNewInstitution" handleClose={this.onAddNewInstitutionModalClose} isModalOpen={this.state.isAddNewInstitutionModalOpen} sportsSpecific={false}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      genCertificationsList: PropTypes.object,
      fetchGenCertificationList: PropTypes.func.isRequired,
      newCertification: PropTypes.object.isRequired,
      updateNewCertifications: PropTypes.func.isRequired,
      validateNewCertification: PropTypes.object.isRequired,
      submitNewCertification: PropTypes.func.isRequired,
      addNewGenCertification: PropTypes.func.isRequired,
      clearNewCertification: PropTypes.func.isRequired,
      clearNewCertificationValidation: PropTypes.func.isRequired
    };
  }
}

ISPAddCertifications.defaultProps = {
  genCertificationsList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {
    genCertificationsList,
    newCertification,
    validateNewCertification
  } = state;
  return {
    genCertificationsList,
    newCertification,
    validateNewCertification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenCertificationList: () => dispatch(fetchGenCertificationList()),
    updateNewCertifications: updatedData => dispatch(updateNewCertifications(updatedData)),
    submitNewCertification: data => dispatch(submitNewCertification(data)),
    addNewGenCertification: data => dispatch(addNewGenCertification(data)),
    clearNewCertification: () => dispatch(clearNewCertification()),
    clearNewCertificationValidation: () => dispatch(clearNewCertificationValidation())
  };
};

const ISPAddCertificationsLink = connect(mapStateToProps, mapDispatchToProps)(translate(ISPAddCertifications));
export default ISPAddCertificationsLink;

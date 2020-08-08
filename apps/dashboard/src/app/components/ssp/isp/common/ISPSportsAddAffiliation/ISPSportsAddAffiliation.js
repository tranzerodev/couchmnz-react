import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import AddNewBiographySingle from '../AddNewBiographySingle';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CantFind from '../CantFind';
import {
  updateNewAffiliation,
  addNewSportsAffiliation,
  clearNewAffiliation,
  fetchSportsAffiliationsList
} from '../../../../../actions/index';
import AddNewInstitution from '../AddNewInstitution';
function notNull(value) {
  const object = value.trim();
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
class ISPSportsAddAffiliation extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onOrganizationNameChange = this.onOrganizationNameChange.bind(this);
    this.clearNewOrganizationStates = this.clearNewOrganizationStates.bind(this);
    this.onCantFindClick = this.onCantFindClick.bind(this);
    this.onAddNewInstitutionModalClose = this.onAddNewInstitutionModalClose.bind(this);
    this.onCantFindInstitutionClick = this.onCantFindInstitutionClick.bind(this);
    this.handleOrganizationAwardsChange = this.handleOrganizationAwardsChange.bind(this);
    this.state = {
      isModalOpen: false,
      organizationName: '',
      isAddNewAwardModalOpen: false,
      isAddNewInstitutionModalOpen: false
    };
    this.onOrganizationChange = this.onOrganizationChange.bind(this);
  }
  componentDidMount() {
    this.findToolsList(this.props);
  }
  findToolsList(nexProps) {
    if (nexProps.currentSport.status === FULFILLED && nexProps.sportsAffiliationsList.status !== FULFILLED && nexProps.sportsAffiliationsList.status !== PENDING && nexProps.sportsAffiliationsList.status !== REJECTED) {
      nexProps.fetchSportsAffiliationsList(nexProps.currentSport.data.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.findToolsList(nextProps);
  }
  handleClick() {
    this.setState({isModalOpen: true});
    this.clearNewOrganizationStates();
  }
  onModalClose() {
    this.setState({isModalOpen: false});
    this.clearNewOrganizationStates();
  }
  onAdd() {
    if (notNull(this.props.newAffiliation.id)) {
      this.props.addNewSportsAffiliation(this.props.newAffiliation);
      this.onModalClose();
    }
  }
  onOrganizationChange(event, {suggestion}) {
    this.setState({organizationName: suggestion.name});
    this.props.updateNewAffiliation({name: suggestion.name, id: suggestion.id});
  }
  handleOrganizationAwardsChange({suggestion}) {
    if (suggestion) {
      this.setState({organizationName: suggestion.name});
      this.props.updateNewAffiliation({name: suggestion.name, id: suggestion.id});
    }
  }
  onOrganizationNameChange(e, {newValue}) {
    this.setState({organizationName: newValue});
    this.props.updateNewAffiliation({name: '', id: ''});
  }
  clearNewOrganizationStates() {
    this.props.clearNewAffiliation();
    this.setState({organizationName: ''});
  }
  onCantFindClick() {
    this.setState({isAddNewAwardModalOpen: true});
    this.onModalClose();
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
    const cantFind = this.renderCantFindInstitution();
    return (
      <div>
        <a onClick={this.handleClick} className="cl-sd-addAnother-btn">{this.props.p.t('ISPSportsAddAffiliation.add_subject')}</a>
        <AddNewBiographySingle
          onHighlightedInputChange={this.handleOrganizationAwardsChange}
          cantFind={cantFind}
          element={this.props.newAffiliation}
          handleInputChange={this.onOrganizationChange}
          textKey="ISPSportsAddAffiliation"
          isModalOpen={this.state.isModalOpen}
          handleCloseModal={this.onModalClose}
          handleAdd={this.onAdd}
          list={this.props.sportsAffiliationsList.data}
          input={this.state.organizationName}
          inpuChange={this.onOrganizationNameChange}
        />
        <AddNewInstitution
          textKey="AddNewOrganization"
          handleClose={this.onAddNewInstitutionModalClose}
          isModalOpen={this.state.isAddNewInstitutionModalOpen}
          sportsSpecific
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sportsAffiliationsList: PropTypes.object,
      newAffiliation: PropTypes.object.isRequired,
      updateNewAffiliation: PropTypes.func.isRequired,
      addNewSportsAffiliation: PropTypes.func.isRequired,
      clearNewAffiliation: PropTypes.func.isRequired,
      fetchSportsAffiliationsList: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired
    };
  }
}

ISPSportsAddAffiliation.defaultProps = {
  sportsAffiliationsList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {
    sportsAffiliationsList,
    newAffiliation,
    currentSport
  } = state;
  return {
    sportsAffiliationsList,
    newAffiliation,
    currentSport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNewAffiliation: updatedData => dispatch(updateNewAffiliation(updatedData)),
    addNewSportsAffiliation: data => dispatch(addNewSportsAffiliation(data)),
    clearNewAffiliation: () => dispatch(clearNewAffiliation()),
    fetchSportsAffiliationsList: sportID => dispatch(fetchSportsAffiliationsList(sportID))
  };
};

const ISPSportsAddAffiliationLink = connect(mapStateToProps, mapDispatchToProps)(translate(ISPSportsAddAffiliation));
export default ISPSportsAddAffiliationLink;

import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import AddNewBiographySingle from '../AddNewBiographySingle';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CantFind from '../CantFind';
import {
  updateNewTool,
  submitNewAwards,
  addNewGenTool,
  clearNewTool,
  clearNewAwardsValidation,
  fetchGenToolsList
} from '../../../../../actions/index';
import AddNewTool from '../AddNewTool';
function notNull(value) {
  const object = value.trim();
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
class ISPAddTool extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onToolNameChange = this.onToolNameChange.bind(this);
    this.clearNewToolStates = this.clearNewToolStates.bind(this);
    this.onCantFindClick = this.onCantFindClick.bind(this);
    this.onAddNewToolModalClose = this.onAddNewToolModalClose.bind(this);
    this.handleToolChange = this.handleToolChange.bind(this);
    this.state = {
      isModalOpen: false,
      toolName: '',
      isAddNewToolModalOpen: false
    };
    this.onToolChange = this.onToolChange.bind(this);
  }
  componentDidMount() {
    if (this.props.genToolsList.status !== FULFILLED && this.props.genToolsList.status !== PENDING && this.props.genToolsList.status !== REJECTED) {
      this.props.fetchGenToolsList();
    }
  }
  handleClick() {
    this.setState({isModalOpen: true});
    this.clearNewToolStates();
  }
  onModalClose() {
    this.setState({isModalOpen: false});
    this.clearNewToolStates();
  }
  onAdd() {
    if (notNull(this.props.newTool.id)) {
      this.props.addNewGenTool(this.props.newTool);
      this.onModalClose();
    }
  }
  onToolChange(event, {suggestion}) {
    this.setState({toolName: suggestion.name});
    this.props.updateNewTool({name: suggestion.name, id: suggestion.id});
  }
  handleToolChange({suggestion}) {
    if (suggestion) {
      this.setState({toolName: suggestion.name});
      this.props.updateNewTool({name: suggestion.name, id: suggestion.id});
    }
  }
  onToolNameChange(e, {newValue}) {
    this.setState({toolName: newValue});
    this.props.updateNewTool({name: '', id: ''});
  }
  clearNewToolStates() {
    this.props.clearNewTool();
    this.setState({toolName: ''});
  }
  onCantFindClick() {
    this.setState({isAddNewToolModalOpen: true});
    this.onModalClose();
  }
  renderCantFind() {
    return (
      <CantFind handleAddNewModal={this.onCantFindClick}/>
    );
  }
  onAddNewToolModalClose() {
    this.setState({isAddNewToolModalOpen: false});
  }
  render() {
    const cantFind = this.renderCantFind();
    return (
      <div>
        <a onClick={this.handleClick} className="cl-sd-addAnother-btn">{this.props.p.t('ISPAddTool.add_subject')}</a>
        <AddNewBiographySingle
          onHighlightedInputChange={this.handleToolChange}
          cantFind={cantFind}
          element={this.props.newTool}
          handleInputChange={this.onToolChange}
          textKey="ISPAddTool"
          isModalOpen={this.state.isModalOpen}
          handleCloseModal={this.onModalClose}
          handleAdd={this.onAdd}
          list={this.props.genToolsList.data}
          input={this.state.toolName}
          inpuChange={this.onToolNameChange}
        />
        <AddNewTool
          handleClose={this.onAddNewToolModalClose}
          isModalOpen={this.state.isAddNewToolModalOpen}
          sportsSpecific={false}
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      genToolsList: PropTypes.object,
      newTool: PropTypes.object.isRequired,
      updateNewTool: PropTypes.func.isRequired,
      addNewGenTool: PropTypes.func.isRequired,
      clearNewTool: PropTypes.func.isRequired,
      fetchGenToolsList: PropTypes.func.isRequired
    };
  }
}

ISPAddTool.defaultProps = {
  genToolsList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {
    genToolsList,
    newTool
  } = state;
  return {
    genToolsList,
    newTool
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNewTool: updatedData => dispatch(updateNewTool(updatedData)),
    submitNewAwards: data => dispatch(submitNewAwards(data)),
    addNewGenTool: data => dispatch(addNewGenTool(data)),
    clearNewTool: () => dispatch(clearNewTool()),
    clearNewAwardsValidation: () => dispatch(clearNewAwardsValidation()),
    fetchGenToolsList: () => dispatch(fetchGenToolsList())
  };
};

const ISPAddToolLink = connect(mapStateToProps, mapDispatchToProps)(translate(ISPAddTool));
export default ISPAddToolLink;

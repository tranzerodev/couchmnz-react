import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import AddNewBiographySingle from '../AddNewBiographySingle';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CantFind from '../CantFind';
import {
  updateNewTool,
  addNewSportsTool,
  clearNewTool,
  fetchSportsToolsList
} from '../../../../../actions/index';
import AddNewTool from '../AddNewTool';
function notNull(value) {
  const object = value.trim();
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
class ISPSportsAddTool extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onToolNameChange = this.onToolNameChange.bind(this);
    this.clearNewToolStates = this.clearNewToolStates.bind(this);
    this.onCantFindClick = this.onCantFindClick.bind(this);
    this.onAddNewToolModalClose = this.onAddNewToolModalClose.bind(this);
    this.handleToolChange = this.handleToolChange.bind(this);
    this.findToolsList = this.findToolsList.bind(this);
    this.state = {
      isModalOpen: false,
      toolName: '',
      isAddNewToolModalOpen: false
    };
    this.onToolChange = this.onToolChange.bind(this);
  }
  componentDidMount() {
    this.findToolsList(this.props);
  }
  findToolsList(nexProps) {
    if (nexProps.currentSport.status === FULFILLED && nexProps.sportsToolsList.status !== FULFILLED && nexProps.sportsToolsList.status !== PENDING && nexProps.sportsToolsList.status !== REJECTED) {
      nexProps.fetchSportsToolsList(nexProps.currentSport.data.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.findToolsList(nextProps);
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
      this.props.addNewSportsTool(this.props.newTool);
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
          list={this.props.sportsToolsList.data}
          input={this.state.toolName}
          inpuChange={this.onToolNameChange}
        />
        <AddNewTool
          handleClose={this.onAddNewToolModalClose}
          isModalOpen={this.state.isAddNewToolModalOpen}
          sportsSpecific
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sportsToolsList: PropTypes.object,
      newTool: PropTypes.object.isRequired,
      updateNewTool: PropTypes.func.isRequired,
      addNewSportsTool: PropTypes.func.isRequired,
      clearNewTool: PropTypes.func.isRequired,
      fetchSportsToolsList: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired
    };
  }
}

ISPSportsAddTool.defaultProps = {
  sportsToolsList: {data: [], status: null}
};

const mapStateToProps = state => {
  const {
    sportsToolsList,
    newTool,
    sportsList,
    currentSport
  } = state;
  return {
    sportsToolsList,
    newTool,
    sportsList,
    currentSport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNewTool: updatedData => dispatch(updateNewTool(updatedData)),
    addNewSportsTool: data => dispatch(addNewSportsTool(data)),
    clearNewTool: () => dispatch(clearNewTool()),
    fetchSportsToolsList: sportID => dispatch(fetchSportsToolsList(sportID))
  };
};

const ISPAddToolLink = connect(mapStateToProps, mapDispatchToProps)(translate(ISPSportsAddTool));
export default ISPAddToolLink;

import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import SideNav from '../common/SideNav';
import Sports from './Sports';
import Preferences from './Preferences';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {fetchAthletePreferences, setAthletePreferences} from '../../../../../actions/index';
import AddPreferences from './AddPreferences';

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      edit: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleEdit(e) {
    const {sportsMapping} = this.props;
    const id = e.currentTarget.getAttribute('value');
    this.props.setAthletePreferences(sportsMapping.data[id]);
    this.setState({edit: true, add: false});
  }
  handleAdd() {
    this.setState({edit: false, add: true});
  }
  handleSave() {
    this.setState({edit: false, add: false});
  }
  render() {
    const {edit, add} = this.state;
    return (
      <div className="booking-wrapper cl-sm-bk-wrapper">
        <div className="dashboardSection">
          <div className="uk-grid">
            <SideNav/>
            {edit === false && add === false && <Sports history={this.props.history} onEdit={this.handleEdit} onAdd={this.handleAdd}/>}
            {edit && <Preferences history={this.props.history} onSave={this.handleSave}/>}
            {edit === false && add === true && <AddPreferences history={this.props.history} onSave={this.handleSave}/>}
          </div>
        </div>
      </div>

    );
  }
  static get propTypes() {
    return {
      sportsMapping: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      setAthletePreferences: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, countries, athlete} = state;
  const {sportsMapping} = athlete;
  return {
    profile,
    countries,
    sportsMapping
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAthletePreferences: params => dispatch(fetchAthletePreferences(params)),
    setAthletePreferences: data => dispatch(setAthletePreferences(data))
  };
};

const AthleteSkills = connect(mapStateToProps, mapDispatchToProps)(Skills);
export default (translate(AthleteSkills));

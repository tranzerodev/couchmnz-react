import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';

import {fetchCurrentSport, clearSportsRelatedStores} from '../../../../../../actions';

class SportsDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSportIds: []
    };
    this.handleChangeSport = this.handleChangeSport.bind(this);
    this.renderSports = this.renderSports.bind(this);
    this.handleChangeMultipleSport = this.handleChangeMultipleSport.bind(this);
  }

  sortSportByName(sport, sport2) {
    return sport.name > sport2.name;
  }

  handleChangeSport(e) {
    let id = '';

    if (this.props.isMultiSelect) {
      id = e.currentTarget.dataset.id;
    } else {
      id = e.target.value;
    }

    console.log('ID', id);

    this.props.onChange(e);
  }

  handleChangeMultipleSport({target}) {
    if (target.checked) {
      console.log('Checked ' + target.value);
      this.setState({
        selectedSportIds: [...this.state.selectedSportIds, target.value]
      });
    } else {
      console.log('Un Checked ' + target.value);
      const array = this.state.selectedSportIds;
      const index = array.indexOf(target.value);
      array.splice(index, 1);
      this.setState({
        selectedSportIds: array
      });
    }

    console.log('selectedSportIds' + this.state.selectedSportIds);
    this.props.onChange({target});
  }

  renderSports(sport) {
    return (
      this.props.isMultiSelect ?
        (
          <li key={sport.id} data-id={sport.id}>
            <label className="container-ck bold-font-family">
              <span className="event-text">{sport.name}</span>
              <input type="checkbox" value={sport.id} onChange={this.handleChangeMultipleSport}/>
              <span className="checkmark"/>
            </label>
          </li>
        ) : (
          <option key={sport.id} id={sport.id} value={sport.id} >{sport.name}</option>
        )
    );
  }

  render() {
    console.log('this.props.isMultiSelect ' + this.props.isMultiSelect);

    return (
      this.props.isMultiSelect ?

        (
          <ul className="uk-nav uk-nav-dropdown uk-text-left">
            {
              this.props.sports && this.props.sports.length >= 1 && this.props.sports.sort(this.sortSportByName).map(this.renderSports)
            }
          </ul>
        ) :
        (
          <select name="cl-select-role" id="cl-select-role" onChange={this.handleChangeSport} >
            <option value={1}>Select Sport</option>
            {
              this.props.sports && this.props.sports.length >= 1 && this.props.sports.sort(this.sortSportByName).map(this.renderSports)
            }
          </select>
        )

    );
  }
  static get propTypes() {
    return {
      sports: PropTypes.array,
      isMultiSelect: PropTypes.bool,
      onChange: PropTypes.func

    };
  }
}

SportsDropDown.defaultProps = {
  sports: [],
  isMultiSelect: false,
  onChange: () => {}
};

const mapStateToProps = state => {
  const {userProfiles, profile, currentProfile, currentSport, sports} = state;
  return {
    userProfiles,
    profile,
    currentProfile,
    currentSport,
    sports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentSport: params => dispatch(fetchCurrentSport(params)),
    clearSportsRelatedStores: () => dispatch(clearSportsRelatedStores())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(SportsDropDown)));

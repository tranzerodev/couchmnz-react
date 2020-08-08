import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';

import {fetchCurrentSport, clearSportsRelatedStores} from '../../../../../actions';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import {DASHBOARD_MANAGE_SPORT} from '../../../../../constants/pathConstants';
import {notNull} from '../../../../../validators/common/util';

class SportsSwitcherDropDown extends Component {
  constructor(props) {
    super(props);

    this.handleChangeSport = this.handleChangeSport.bind(this);
    this.renderSports = this.renderSports.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
  }

  sortSportByName(sport, sport2) {
    return sport.name > sport2.name;
  }

  handleChangeSport(e) {
    const id = e.target.value;
    console.log('ID', id);
    if (notNull(id)) {
      this.props.fetchCurrentSport({profileID: this.props.profile.data.profile.id, sportID: id});
    } else {
      this.handleAddNew();
    }
  }

  handleAddNew() {
    this.props.clearSportsRelatedStores();
    this.props.history.push(DASHBOARD_MANAGE_SPORT);
  }

  renderSports(sport) {
    return (
      <option key={sport.id} id={sport.id} value={sport.id} >{sport.name}</option>
    );
  }

  render() {
    return (
      this.props.currentSport && this.props.currentSport.status === FULFILLED && (
        <select name="cl-select-role" id="cl-select-role" onChange={this.handleChangeSport} selected={this.props.currentSport.data.id}>
          {
            this.props.sports && this.props.sports.length >= 1 && this.props.sports.sort(this.sortSportByName).map(this.renderSports)
          }
          <option value={''}>{this.props.p.t('SportsSwitcherDropDown.add_new_sport')}</option>
        </select>
      )
    );
  }
  static get propTypes() {
    return {
      currentSport: PropTypes.object.isRequired,
      fetchCurrentSport: PropTypes.func.isRequired,
      sports: PropTypes.array,
      profile: PropTypes.object.isRequired,
      clearSportsRelatedStores: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

SportsSwitcherDropDown.defaultProps = {
  sports: []
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(SportsSwitcherDropDown)));

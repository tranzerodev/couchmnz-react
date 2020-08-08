import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';

import {fetchCurrentSport, clearSportsRelatedStores, fetchNewSessions} from '../../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../../constants/ActionTypes';

class SessionDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSessionIds: []
    };
    this.handleChangeSession = this.handleChangeSession.bind(this);
    this.renderSessions = this.renderSessions.bind(this);
    this.handleChangeMultipleSessions = this.handleChangeMultipleSessions.bind(this);
  }

  componentDidMount() {
    if (this.props.sessionsNew.status !== FULFILLED && this.props.sessionsNew.status !== PENDING) {
      this.props.fetchNewSessions({profileID: this.props.userProfiles.selectedProfile.id, sportID: this.props.sport.id});
      // This.props.fetchNewSessions({profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
    }
  }

  sortSessionsByName(sessionsNew, session2) {
    return sessionsNew.name > session2.name;
  }

  handleChangeMultipleSessions({target}) {
    if (target.checked) {
      console.log('Checked ' + target.value);
      this.setState({
        selectedSessionIds: [...this.state.selectedSessionIds, target.value]
      });
    } else {
      console.log('Un Checked ' + target.value);
      const array = this.state.selectedSessionIds;
      const index = array.indexOf(target.value);
      array.splice(index, 1);
      this.setState({
        selectedSessionIds: array
      });
    }

    console.log('selectedSessionIds' + this.state.selectedSessionIds);
    this.props.onChange({target});
  }

  handleChangeSession(e) {
    const id = e.currentTarget.dataset.id;
    console.log('Session ID', id);

    this.props.onChange(e);
  }
  getSessionName(session) {
    return session.name + ', ' + session.trainingType.description + ', ' + session.ageGroup.description + ', ' + session.skillLevel.description;
  }

  renderSessions(sessionsNew) {
    const sessionName = this.getSessionName(sessionsNew);
    return (
      this.props.isMultiSelect ?
        (
          <li key={sessionsNew.id} data-id={sessionsNew.id}>
            <label className="container-ck bold-font-family">
              <span className="event-color" style={{backgroundColor: sessionsNew.color}}/>
              <span className="event-text">{sessionName}</span>
              <input type="checkbox" value={sessionsNew.id} onChange={this.handleChangeMultipleSessions}/>
              <span className="checkmark"/>
            </label>
          </li>
        ) : (
          <li key={sessionsNew.id} onClick={this.handleChangeSession} data-id={sessionsNew.id}>
            <label className="container-ck bold-font-family">
              <span className="event-color" style={{backgroundColor: sessionsNew.color}}/>
              <span className="event-text">{sessionName}</span>
            </label>
          </li>
        )
    );
  }

  render() {
    return (
      <ul className="uk-nav uk-nav-dropdown uk-text-left">
        {
          this.props.sessionsNew.data && this.props.sessionsNew.data.length >= 1 && this.props.sessionsNew.data.map(this.renderSessions)
        }
      </ul>

    );
  }
  static get propTypes() {
    return {
      fetchNewSessions: PropTypes.func,
      isMultiSelect: PropTypes.bool,
      sessionsNew: PropTypes.object,
      // UserIDs: PropTypes.object,
      userProfiles: PropTypes.object.isRequired,
      sport: PropTypes.object.isRequired,
      onChange: PropTypes.func
    };
  }
}

SessionDropDown.defaultProps = {
  sessionsNew: {data: []},
  fetchNewSessions: () => {},
  // UserIDs: {data: []},
  isMultiSelect: false,
  onChange: () => {}
};

const mapStateToProps = state => {
  const {sports, userProfiles, profile, currentProfile, currentSport, userIDs, sessionsNew, sport} = state;
  return {
    sports,
    userProfiles,
    profile,
    currentProfile,
    currentSport,
    userIDs,
    sessionsNew,
    sport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentSport: params => dispatch(fetchCurrentSport(params)),
    fetchNewSessions: userID => dispatch(fetchNewSessions(userID)),
    clearSportsRelatedStores: () => dispatch(clearSportsRelatedStores())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(SessionDropDown)));

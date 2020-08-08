import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import appConstants from '../../../../../../constants/appConstants';
import moment from 'moment';

import {fetchCurrentSport, clearSportsRelatedStores, ispFetchWorkingDays} from '../../../../../../actions';
import {PENDING, FULFILLED} from '../../../../../../constants/ActionTypes';

class TimeDropDown extends Component {
  constructor(props) {
    super(props);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.renderTimes = this.renderTimes.bind(this);
    this.getTimeList = this.getTimeList.bind(this);
  }

  handleChangeTime(e) {
    this.props.onChange(e);
  }
  componentDidMount() {
    if (this.props.workingDays.status !== FULFILLED && this.props.workingDays.status !== PENDING) {
      this.props.ispFetchWorkingDays({profileId: this.props.selectedProfile.id});
    }
  }

  getTimeList() {
    const {selectedDate, workingDays} = this.props;
    const times = [];
    const selectedDateDayName = moment(selectedDate, appConstants.schedules.ISO_DATE_FORMAT).format('ddd').toUpperCase();
    const dayStartEndTime = workingDays.data[selectedDateDayName];
    let startTime = appConstants.scheduleSession.defaultStartTime;
    let endTime = appConstants.scheduleSession.defaultEndTime;
    if (dayStartEndTime && dayStartEndTime.startTime && dayStartEndTime.endTime) {
      startTime = dayStartEndTime.startTime;
      endTime = dayStartEndTime.endTime;
    }
    const endDateTime = moment(selectedDate, appConstants.schedules.ISO_DATE_FORMAT).set({h: endTime.hour, m: endTime.minute});
    const curTime = moment(selectedDate, appConstants.schedules.ISO_DATE_FORMAT).set({h: startTime.hour, m: startTime.minute});
    while (curTime.isSameOrBefore(endDateTime, appConstants.momentJSConstants.MINUTE)) {
      if (curTime.isSameOrAfter(moment(), appConstants.momentJSConstants.MINUTE)) {
        times.push(curTime.format('HH:mm'));
      }
      curTime.add({m: appConstants.scheduleSession.sessionTimeIntervalMinutes});
    }
    return times;
  }

  renderTimes(time) {
    return (

      <li key={time} onClick={this.handleChangeTime} data-id={time} data-value={time} className="uk-active"><a>{time}</a></li>

    );
  }

  render() {
    const times = this.getTimeList();
    return (
      <ul className="uk-nav uk-nav-dropdown uk-text-left">
        {
          times.map(this.renderTimes)
        }
      </ul>
    );
  }
  static get propTypes() {
    return {
      onChange: PropTypes.func.isRequired,
      selectedDate: PropTypes.string,
      workingDays: PropTypes.object.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired
    };
  }
}

TimeDropDown.defaultProps = {
  selectedDate: moment().format(appConstants.schedules.ISO_DATE_FORMAT)
};

const mapStateToProps = state => {
  const {userProfiles, workingDays} = state;
  return {
    selectedProfile: userProfiles.selectedProfile,
    workingDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentSport: params => dispatch(fetchCurrentSport(params)),
    clearSportsRelatedStores: () => dispatch(clearSportsRelatedStores()),
    ispFetchWorkingDays: profileIdData => dispatch(ispFetchWorkingDays(profileIdData))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(TimeDropDown)));

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import InputRange from 'react-input-range';
import moment from 'moment';
import 'react-input-range/lib/css/index.css';

import appConstants from '../../../../../constants/appConstants';
import {ispFetchWorkingDays, ispSaveWorkingDays} from '../../../../../actions/index';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import {DASHBOARD_SCHEDULES} from '../../../../../constants/pathConstants';
import {validateWorkingDays} from '../../../../../validators/ssp/isp/common/schedulerSettings';

function getTimeValueInMinutes(time) {
  return ((time.hour * 60) + time.minute);
}

function getTime(number) {
  const hour = parseInt((number / 60), 10);
  const minute = parseInt((number % 60), 10);
  return {
    hour,
    minute
  };
}

function formatTimeLabel(value) {
  const time = getTime(value);
  return (moment().set({h: time.hour, m: time.minute}).format('hh:mm A'));
}

class SchedulerSettings extends Component {
  constructor(props) {
    super(props);
    this.renderWeek = this.renderWeek.bind(this);
    this.renderDay = this.renderDay.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.getMinMax = this.getMinMax.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleSave = this.handleSave.bind(this);
    const {workingDays} = this.props;
    const valid = validateWorkingDays(workingDays.data);
    this.state = {
      weeks: workingDays.data,
      valid
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.ispFetchWorkingDays({profileId: this.props.selectedProfile.id});
  }

  componentDidUpdate(preProps) {
    if (preProps.workingDays.status !== FULFILLED && this.props.workingDays.status === FULFILLED) {
      this.updateState(this.props.workingDays.data);
    }
    if (preProps.workingDays.postStatus !== FULFILLED && this.props.workingDays.postStatus === FULFILLED) {
      this.props.history.push(DASHBOARD_SCHEDULES);
      this.props.ispFetchWorkingDays({profileId: this.props.selectedProfile.id});
    }
  }

  updateState(weeks) {
    const valid = validateWorkingDays(weeks);
    this.setState({weeks, valid});
  }

  handleRangeChange = day => value => {
    const range = {
      startTime: getTime(value.min),
      endTime: getTime(value.max)
    };
    const weeks = Object.assign({}, this.state.weeks);
    weeks[day] = range;
    this.updateState(weeks);
  }

  handleCheckBoxChange(e) {
    const weeks = Object.assign({}, this.state.weeks);
    if (e.target.checked === true) {
      weeks[e.target.value] = appConstants.workingDaysSlider.defaultDayTiming;
    } else {
      weeks[e.target.value] = {
        startTime: null,
        endTime: null
      };
    }
    this.updateState(weeks);
  }

  isChecked(day) {
    const {weeks} = this.state;
    const dayData = weeks[day];
    if (dayData && dayData.startTime) {
      return true;
    }
    return false;
  }

  getMinMax(data) {
    const value = Object.assign({}, appConstants.workingDaysSlider.defaultDayTimingInFloat);
    if (data && data.startTime) {
      value.min = getTimeValueInMinutes(data.startTime);
      value.max = getTimeValueInMinutes(data.endTime);
    }
    return value;
  }

  handleSave() {
    const {weeks, valid} = this.state;
    if (valid) {
      this.props.ispSaveWorkingDays({profileId: this.props.selectedProfile.id}, weeks);
    }
  }

  renderWeek() {
    return (
      appConstants.weekDays.map(day => this.renderDay(day))
    );
  }

  renderDay(day) {
    const {p} = this.props;
    const {weeks} = this.state;
    const dayData = weeks[day];
    const disabled = !(dayData && dayData.startTime);
    const value = this.getMinMax(dayData);
    return (
      <div key={day} className="cl-workinghour-outer">
        <div className="cl-workinghour-inner">
          <h4>{p.t('WeekDays.' + day)}</h4>
        </div>
        <div className="cl-workinghour-inner">
          <input id={day} type="checkbox" value={day} checked={this.isChecked(day)} onChange={this.handleCheckBoxChange}/>
          <label htmlFor={day}/>
        </div>
        <div className="cl-workinghour-inner">
          <InputRange
            draggableTrack
            maxValue={appConstants.workingDaysSlider.maxValue}
            minValue={appConstants.workingDaysSlider.minValue}
            onChange={this.handleRangeChange(day)}
            value={value}
            name={day}
            step={appConstants.workingDaysSlider.stepSize}
            disabled={disabled}
            formatLabel={formatTimeLabel}
          />
        </div>
      </div>
    );
  }

  render() {
    const {p, offerTerminology} = this.props;
    const {valid} = this.state;
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-7-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-trainingLocationInner">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <h1 className="uk-padding-remove">{p.t('DashboardSchedulerSettings.h1')}</h1>
              <p>{p.t('DashboardSchedulerSettings.p')}</p>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              {this.renderWeek()}
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1 uk-margin-top">
            <a onClick={this.handleSave} className={'general_btn ' + (valid ? '' : 'disabled-link')}>{p.t('DashboardSchedulerSettings.save')}</a>
            <p className="cl-sd-nextscreen-note cl-sd-nextscreen-noteSec">{p.t('DashboardSchedulerSettings.nextInfo1', {session: offerTerminology.plural})}<br/>{p.t('DashboardSchedulerSettings.nextInfo2')}</p>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      workingDays: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      offerTerminology: PropTypes.object.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired,
      ispSaveWorkingDays: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ispFetchWorkingDays: params => dispatch(ispFetchWorkingDays(params)),
    ispSaveWorkingDays: (params, data) => dispatch(ispSaveWorkingDays(params, data))
  };
};

const mapStateToProps = state => {
  const {workingDays, userProfiles, currentSport} = state;
  return {
    workingDays,
    selectedProfile: userProfiles.selectedProfile,
    offerTerminology: currentSport.data && currentSport.data.offerTerminology ?
      currentSport.data.offerTerminology : {singular: appConstants.defaultOfferTerminology}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(SchedulerSettings)));

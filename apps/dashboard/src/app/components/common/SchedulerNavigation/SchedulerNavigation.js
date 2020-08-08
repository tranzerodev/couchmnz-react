import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import DatePicker from '../DatePicker';
import appConstants from '../../../constants/appConstants';

const dateFormat = appConstants.schedulerNavigationDateFormat;

function isValidDate(current) {
  const yesterday = moment().subtract(1, 'day');
  return current.isAfter(yesterday);
}

class SchedulerNavigation extends Component {
  constructor(props) {
    super(props);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleToday = this.handleToday.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.state = {isDatePickerOpen: false};
  }
  handlePrevious() {
    const {date, onDateChange} = this.props;
    const newDate = moment(date, dateFormat).add('days', -1);
    if (isValidDate(newDate)) {
      onDateChange(newDate);
    }
  }

  handleNext() {
    const {date, onDateChange} = this.props;
    const newDate = moment(date, dateFormat).add('days', 1);
    if (isValidDate(newDate)) {
      onDateChange(newDate);
    }
  }

  handleToday() {
    this.props.onDateChange(moment());
  }
  
  handleAll() {
    this.props.onDateChange()
  }

  handleClick() {
    const isDatePickerOpen = !this.state.isDatePickerOpen;
    this.setState({isDatePickerOpen});
  }

  render() {
    const {onDateChange, date, p} = this.props;
    const momentDateObject = moment(date, dateFormat);
    const dateDisplayFormat = p.t('SchedulerNavigation.dateFormat');
    return (
      <div className="uk-grid">
        <div className="uk-width-medium-2-10">
          <a className={`uk-button theme-white-btn t-btn ${date ? '' : 'active'}`} onClick={this.handleAll}>{p.t('SchedulerNavigation.all')}</a>
          <a className={`uk-button theme-white-btn t-btn ${date ? 'active' : ''}`} onClick={this.handleToday}>{p.t('SchedulerNavigation.today')}</a>
        </div>
        <div className="uk-width-medium-6-10">
          {date && <div className="scheduler-calendarDate">
            <a onClick={this.handlePrevious}><i className="uk-icon-angle-left"/></a>
            <span>
              <a onClick={this.handleClick}>
                {momentDateObject.format(dateDisplayFormat)}
              </a>
              <DatePicker
                defaultValue={moment()}
                isValidDate={isValidDate}
                handleChange={onDateChange}
                date={momentDateObject}
                isOpen={this.state.isDatePickerOpen}
                dateFormat={dateDisplayFormat}
              />
            </span>
            <a onClick={this.handleNext}><i className="uk-icon-angle-right"/></a>
          </div>}
        </div>
        <div className="uk-width-medium-2-10"/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onDateChange: PropTypes.func.isRequired,
      date: PropTypes.string.isRequired
    };
  }
}

export default withRouter(translate(SchedulerNavigation));

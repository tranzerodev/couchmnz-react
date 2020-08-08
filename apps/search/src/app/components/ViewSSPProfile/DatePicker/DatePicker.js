import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import 'react-dates/initialize';
import momentPropTypes from 'react-moment-proptypes';

import 'react-dates/lib/css/_datepicker.css';

import {DayPickerSingleDateController} from 'react-dates';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: true
    };
  }

  render() {
    const {date, onChange, onFocusChange, isDayHighlighted, onNextMonthClick, onPrevMonthClick, isDayBlocked} = this.props;
    const {focused} = this.state;
    return (
      <DayPickerSingleDateController
        navPrev={<i className="fa fa-chevron-left fa-sm"></i>}
        navNext={<i className="fa fa-chevron-right fa-sm"></i>}
        daySize={54}
        date={date}
        onDateChange={onChange}
        onFocusChange={onFocusChange}
        focused={focused}
        numberOfMonths={1}
        isDayHighlighted={isDayHighlighted}
        onNextMonthClick={onNextMonthClick}
        onPrevMonthClick={onPrevMonthClick}
        noBorder
        isDayBlocked={isDayBlocked}
      />
    );
  }

  static get propTypes() {
    return {
      date: momentPropTypes.momentObj.isRequired,
      onChange: PropTypes.func.isRequired,
      onFocusChange: PropTypes.func,
      isDayHighlighted: PropTypes.func.isRequired,
      onPrevMonthClick: PropTypes.func.isRequired,
      onNextMonthClick: PropTypes.func.isRequired,
      isDayBlocked: PropTypes.func.isRequired
    };
  }
}

DatePicker.defaultProps = {
  onFocusChange: () => {}
};

export default DatePicker;

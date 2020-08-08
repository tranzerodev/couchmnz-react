import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import DateTimePicker from 'react-datetime';

class DatePicker extends Component {
  render() {
    const {p, defaultValue, date, handleChange, dateFormat} = this.props;
    return (
      <DateTimePicker
        locale={p.t('locale')}
        closeOnSelect
        timeFormat={false}
        dateFormat={dateFormat}
        defaultValue={defaultValue}
        isValidDate={this.props.isValidDate}
        value={date}
        onChange={handleChange}
        input={false}
        open={this.props.isOpen}
      />
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      isValidDate: PropTypes.func.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      handleChange: PropTypes.func.isRequired,
      isOpen: PropTypes.bool.isRequired,
      dateFormat: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ])

    };
  }
}
DatePicker.defaultProps = {
  dateFormat: true
};
export default translate(DatePicker);

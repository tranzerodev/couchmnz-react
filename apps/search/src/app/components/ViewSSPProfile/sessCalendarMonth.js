import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* Class Day extends Component {
  constructor(props) {
    super(props);
    this.state={
      presentDate:new Date()
    };
  }
  static get propTypes() {
    return{
      dd: PropTypes.number.isRequired,
      mm: PropTypes.number.isRequired,
      yyyy: PropTypes.number. isRequired,
      onClick: PropTypes.func.isRequired
    };
  }
  handleDayDisplay() {

  }

  render() {
    return(
      <li
    );
  }
}
 */
/* --------------------Start of Month Renderer ----------------------- */

class MonthScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      presentMonth: this.props.selectedDate.getMonth()
    };
    this.monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.endOfMonthSY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.endOfMonthLY = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.handleNextM = this.handleNextM.bind(this);
    this.handlePrevM = this.handlePrevM.bind(this);
  }

  static get propTypes() {
    return {
      selectedDate: PropTypes.any.isRequired,
      onChange: PropTypes.func.isRequired
    };
  }

  handleNextM() {
    if (this.state.presentMonth < 10) {
      this.setState({presentMonth: this.state.presentMonth + 1});
    } else {
      const d = new Date();
      this.setState({presentMonth: 0, selectedDate: Date.setFullYear(this.props.selectedDate.getFullYear() + 1, 0, 1)});
    }
  }

  handlePrevM() {
    if (this.state.presentMonth > 0) {
      this.setState({presentMonth: this.state.presentMonth - 1});
    } else {
      const d = new Date();
      this.setState({presentMonth: 11, selectedDate: d.setFullYear(this.props.selectedDate.getFullYear() - 1, 11, 31)});
    }
  }

  render() {
    return (
      <ul>
        <li className="prev" onClick={this.handlePrevM}>&#10094;</li>
        <li className="next" onClick={this.handleNextM}>&#10095;</li>
        <li onChange={this.props.onChange(this.state.selectedDate.getFullYear())}>{this.monthArray[this.state.selectedDate.getMonth()]}&nbsp;{this.state.selectedDate.getFullYear()}</li>
      </ul>
    );
  }
}

/* --------------------End of Month Scroller ----------------------- */

class CalendarMonth extends Component {
  constructor(props, selectedDate) {
    super(props);
    const thisYear = selectedDate.getFullYear();
    this.state = {
      selectedDate,
      thisMonth: [Array(42).fill(0)],
      thisYear
    };
    this.weekArray = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.endOfMonthSY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.endOfMonthLY = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  static get propTypes() {
    return {
    //   SelectedDate: PropTypes.any.isRequired,
      availableDates: PropTypes.array.isRequired,
      onClick: PropTypes.func.isRequired
    };
  }
  handleMakeMonth(passMonth, passYear) {
    const passedMonth = this.monthArray[passMonth];
    const isLY = passYear % 4;
    const startDate = new Date();
    startDate.setFullYear(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), 1);
    const startDay = this.state.weekdays[startDate.getDay()];
    const eOm = ((isLY === 0) ? this.endOfMonthLY[passMonth] : this.endOfMonthSY[passMonth]);
    const theMonth = this.state.thisMonth.slice();
    for (let i = 0; i < eOm; i++) {
      theMonth[startDay + i] = i + 1;
    }
    // This.setState({thisMonth: theMonth});
  }
  handleWeek() {
    const displayArr = [];
    let keyVal = 0;
    for (let i = 0; i < 7; i++) {
      displayArr.push(<li key={keyVal++}>this.state.weekdays[i]</li>);
    }
    return displayArr;
  }
  handleMonth(dayValue, isActive) {
    return (<li className={isActive}>{dayValue}</li>);
  }
  render() {
    return (
      <div className="calender">
        <div className="month">
          <MonthScroll selectedDate={this.props.selectedDate} onChange={this.handleMakeMonth(this.state.thisMonth, this.state.thisYear)}/>
        </div>
        <ul className="weekdays">
          {this.handleWeek}
        </ul>
        <ul className="days">
          {this.handleMonth(this.state.thisMonth)}
          {/* <li><a href="#"/></li>
          <li><a href="#"/></li>
          <li><a href="#"/></li>
          <li><a href="#"/></li>
          <li><a href="#"/></li>
          <li className="inactive"><a href="#">1</a></li>
          <li className="inactive"><a href="#">2</a></li>
          <li className="inactive"><a href="#">3</a></li>
          <li className="inactive"><a href="#">4</a></li>
          <li className="inactive"><a href="#">5</a></li>
          <li className="inactive"><a href="#">6</a></li>
          <li><a href="#">7</a></li>
          <li><a href="#">8</a></li>
          <li><a href="#">9</a></li>
          <li><a href="#">10</a></li>
          <li><a href="#">11</a></li>
          <li><a href="#">12</a></li>
          <li><a href="#">13</a></li>
          <li><a href="#">14</a></li>
          <li className="availaible"><a href="#">15</a></li>
          <li><a href="#">16</a></li>
          <li><a href="#">17</a></li>
          <li className="availaible"><a href="#">18</a></li>
          <li><a href="#">19</a></li>
          <li><a href="#">20</a></li>
          <li><a href="#">21</a></li>
          <li className="active"><a href="#">22</a></li>
          <li className="availaible"><a href="#">23</a></li>
          <li><a href="#">24</a></li>
          <li><a href="#">25</a></li>
          <li className="availaible"><a href="#">26</a></li>
          <li><a href="#">27</a></li>
          <li className="availaible"><a href="#">28</a></li>
          <li><a href="#">29</a></li>
          <li><a href="#">30</a></li>
          <li><a href="#">31</a></li> */}
        </ul>
      </div>);
  }
}

export default CalendarMonth;

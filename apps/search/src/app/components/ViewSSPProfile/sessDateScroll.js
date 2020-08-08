import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DateScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDate: new Date(),
      windowStartDate: new Date(),
      windowEndDate: new Date(),
      windows: 0,
      dayStates: ['', '', '', '', '', '', '']
    };
    this.dateParams = {
      days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      days3L: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthEndsSY: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthEndsLY: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthBrief: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthDesc: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    this.sessionDatesTxt = [];
    this.sessionDates = [];
    this.generateWeek = this.generateWeek.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDayDisplay = this.handleDayDisplay.bind(this);
    this.handleStartBack = this.handleStartBack.bind(this);
    this.handleStartForward = this.handleStartForward.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.showDateNum = this.showDateNum.bind(this);
    this.showMonthNum = this.showMonthNum.bind(this);
    this.handleSessionDate2txt = this.handleSessionDate2txt.bind(this);
  }
  static get propTypes() {
    return {
      activeDate: PropTypes.any,
      sessionDates: PropTypes.any,
      onClick: PropTypes.func.isRequired
    };
  }
  componentDidMount() {
    this.setState({activeDate: this.props.activeDate});
    this.generateWeek(this.state.activeDate);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeDate !== this.state.activeDate) {
      this.setState({activeDate: nextProps.activeDate});
      this.generateWeek(this.state.activeDate);
    }
  }
  generateWeek(date) {
    const thisDay = date;
    const start = this.changeDate(thisDay, -3);
    const end = this.changeDate(start, 6);
    this.setState({windowStartDate: start, windowEndDate: end});
    for (let counter = 0; counter < 7; counter++) {
      this.sessionDates.push(this.changeDate(start, counter));
    }
    // This.sessionDatesTxt = this.handleSessionDate2txt(this.sessionDates);
    const tempArray = ['', '', '', '', '', '', ''];
    for (let counter = 0; counter < 7; counter++) {
      if (this.props.sessionDates.indexOf(this.sessionDates[counter]) >= 0) {
        tempArray[counter] = '';
      }
      if (this.sessionDates[counter] === this.state.activeDate) {
        tempArray[counter] = 'active-date';
      }
      if (this.sessionDates[counter] < new Date()) {
        tempArray[counter] = 'disable-date';
      }
    }
    this.setState({dayStates: tempArray});
  }
  handleSessionDate2txt(dateArray) {
    const retArray = [];
    let date = new Date();
    let dd = '';
    let mm = '';
    let yyyy = '';
    for (let f = 0; f < dateArray.length; f++) {
      date = dateArray[f];
      dd = date.getDate();
      mm = date.getMonth();
      yyyy = date.getFullYear();
      retArray.push(yyyy.toString() + '-' + mm.toString() + '-' + dd.toString());
    }
    return (retArray);
  }
  handleDayDisplay(startDate) {
    const dispArray = [];
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let renderNow = startDate;
    for (let count = 0; count < 7; count++) {
      dispArray.push(
        <li key={count} className={this.state.dayStates[count]}>
          <a onClick={(value)=>this.handleClick(value)}>
            <span className="day">{this.dateParams.days3L[renderNow.getDay()]}</span>
            <span className="date">{this.showMonthNum(renderNow)}/{this.showDateNum(renderNow)}</span>
          </a>
        </li>);
      renderNow = this.changeDate(renderNow, 1);
    }
    return (dispArray);
  }
  showMonthNum(date) {
    const mm = date.getMonth() + 1;
    if (mm < 10) {
      return ('0' + mm.toString());
    }
    return (mm.toString());
  }
  showDateNum(date) {
    const dd = date.getDate();
    if (dd < 10) {
      return ('0' + dd.toString());
    }
    return (dd.toString());
  }
  changeDate(date, change) {
    let newD = date.getDate() + change;
    let newM = date.getMonth();
    let newY = date.getFullYear();
    const eOM = ((date.getFullYear() % 4 === 0) ? this.dateParams.monthEndsLY : this.dateParams.monthEndsSY);
    if (newD > eOM[newM]) {
      newD -= eOM[newM];
      newM++;
    } else if (newD <= 0) {
      newM--;
      newD += (eOM[newM]);
    }
    if (newM <= 0) {
      newM += 11;
      newY--;
    } else if (newM > 11) {
      newM -= 12;
      newY++;
    }
    const retDate = new Date(newY, newM, newD);
    return (retDate);
  }

  handleClick(event) {
      event.preventDefault();
    const selectedDate = event.target.value;
    // This.setState({activeDate: new Date(event.target.value)});
    // this.generateWeek(this.state.activeDate);
    this.props.onClick(selectedDate);
  }
  handleStartBack(event) {
    event.preventDefault();
    if (this.state.windowStartDate > new Date()) {
      const newWin = this.state.windows - 1;
      this.setState({windows: newWin});
      this.generateWeek(this.changeDate(this.state.activeDate, this.state.windows));
    }
  }
  handleStartForward(event) {
    event.preventDefault();
    const newWin = this.state.windows + 1;
    this.setState({windows: newWin});
    this.generateWeek(this.changeDate(this.state.activeDate, this.state.windows));
  }
  render() {
    return (
      <div className="slide-view-area">
        <div className="scroll-area">
          <ul>
            {this.handleDayDisplay(this.state.windowStartDate)}
          </ul>
        </div>
        <a className="prev" onClick={this.handleStartBack}>
          <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M5,12.5l15.682,15L35,12.5" transform="translate(-5389 3446) rotate(90)"/></svg>
        </a>
        <a className="next" onClick={this.handleStartForward}>
          <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg>
        </a>
      </div>
    );
  }
}
DateScroll.defaultProps = {
  activeDate: new Date(),
  sessionDates: [new Date()]
};

export default DateScroll;

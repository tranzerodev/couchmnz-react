import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* START OF DATE COMPONENT */

class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayState: '',
      disable: false,
      active: false,
      date: new Date(),
      DD: '',
      MM: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.showMonth = this.showMonth.bind(this);
    this.showDateNum = this.showDateNum.bind(this);
    this.dateParams = {
      days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      days3L: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthEndsSY: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthEndsLY: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthBrief: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthDesc: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
  }
  static get propTypes() {
    return {
      date: PropTypes.any,
      active: PropTypes.bool,
      disable: PropTypes.bool,
      onClick: PropTypes.func
    };
  }

  componentDidMount() {
    this.setState({date: this.props.date});
    this.setState({DD: this.showDateNum(this.props.date)});
    this.setState({MM: this.showMonth(this.props.date)});
    if (this.props.disable) {
      this.setState({dayState: 'disable-date', active: false, disable: true});
    } else if (this.props.active) {
      this.setState({dayState: 'active-date', active: true, disable: false});
    } else {
      this.setState({dayState: '', active: false, disable: false});
    }
    /*     If (this.props.dayState === 'active-date') {
      this.setState({disable: false, active: true});
    } else if (this.props.dayState === 'disable-date') {
      this.setState({disable: true, active: false});
    } else if (this.props.dayState === '') {
      this.setState({disable: false, active: false});
    } */
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({date: nextProps.date});
      this.setState({DD: this.showDateNum(nextProps.date)});
      this.setState({MM: this.showMonth(nextProps.date)});
      if (nextProps.disable) {
        this.setState({dayState: 'disable-date', active: false, disable: true});
      } else if (nextProps.active) {
        this.setState({dayState: 'active-date', active: true, disable: false});
      } else {
        this.setState({dayState: '', active: false, disable: false});
      }
    }
  }

  showMonth(date) {
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
  handleClick(event) {
    const value = event.target.value;
    if (!this.state.disable) {
      this.setState({active: !this.state.active, dayState: 'active-date'});
      console.log(value);
      this.props.onClick(this.props.date);
    }
  }
  render() {
    return (
      <li className={((this.state.active ? 'active' : '') + (this.state.disable ? 'disable' : '') + (this.state.disable || this.state.active ? '-date' : ''))}>
        <a onClick={this.handleClick} value={this.state.date}>
          {/* <input type="radio" name="dateScroll" disable={this.state.disable} checked={this.state.active} onChange={this.handleClick} value={this.state.date}/> */}
          <span className="day">{this.dateParams.days3L[this.state.date.getDay()]}</span>
          <span className="date">{this.state.DD}/{this.state.MM}</span>
        </a>
      </li>
    );
  }
}
/* END OF DATE COMPONENT */
/* START  OF DATE SCROLLER */
class DateScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDate: new Date(),
      windowStartDate: new Date(),
      windowEndDate: new Date(),
      windows: 0,
      sessionDates: []
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

    this.generateWeek = this.generateWeek.bind(this);
    this.handleDayDisplay = this.handleDayDisplay.bind(this);
    this.handleStartBack = this.handleStartBack.bind(this);
    this.handleStartForward = this.handleStartForward.bind(this);
    this.changeDate = this.changeDate.bind(this);
    // This.handleSessionDate2txt = this.handleSessionDate2txt.bind(this);
  }
  static get propTypes() {
    return {
      activeDate: PropTypes.any,
      sessionDates: PropTypes.any,
      onClick: PropTypes.func.isRequired
    };
  }
  componentDidMount() {
    const newState = this.props.activeDate;
    const newSessionDates = this.props.sessionDates;
    console.log(this.props.activeDate);
    console.log(this.props.sessionDates);
    this.setState({activeDate: newState, sessionDates: newSessionDates});
    this.generateWeek(newState);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeDate !== this.props.activeDate) {
      const newState = nextProps.activeDate;
      //   Const newSessionDates = nextProps.sessionDates;
      console.log(this.props.activeDate);
      //   Console.log(this.props.sessionDates);
      this.setState({activeDate: newState});
      this.generateWeek(newState);
    }
    if (nextProps.sessionDates !== this.props.sessionDates) {
      // Const newState = nextProps.activeDate;
      const newSessionDates = nextProps.sessionDates;
      // Console.log(this.props.activeDate);
      console.log(this.props.sessionDates);
      this.setState({sessionDates: newSessionDates});
      // This.generateWeek(newState);
    }
  }

  /* Function to set the week's start and end points */
  generateWeek(date) {
    const thisDay = date;
    const start = this.changeDate(thisDay, -3);
    const end = this.changeDate(start, 6);
    this.setState({windowStartDate: start, windowEndDate: end});
  }
  /* Function of changes and propagation on clicking of a Dates Object */
  handleClick(event) {
    console.log(event.target.value);
    const newActiveDate = event.target.value;
    this.setState({activeDate: newActiveDate});
    this.props.onClick(newActiveDate);
  }

  /* Function to handle all the dates of the week and their styles */
  handleDayDisplay(startDate) {
    const dispArray = [];
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let renderNow = startDate;
    let keyVal = 0;
    for (let count = 0; count < 7; count++) {
      /* If (renderNow >= today) {
        if (renderNow === this.props.activeDate) { */
      dispArray.push(
        <Dates key={keyVal++} date={renderNow} active={(renderNow === this.state.activeDate)} disable={(renderNow < today)} onClick={value => this.props.onClick(value)} value={renderNow}/>
      );
      /*         } else {
          dispArray.push(
            <Dates key={keyVal++} date={renderNow} active={false} disable={false} onClick={value => this.props.onClick(value)} value={renderNow}/>
          );
        }
      } else {
        dispArray.push(
          <Dates key={keyVal++} date={renderNow} active={false} disable value={renderNow} onClick={}/>
        );
      } */
      renderNow = this.changeDate(renderNow, 1);
    }
    return (dispArray);
  }
  /* Receive a Date (in Date Format) and the value (+ or -) to change it by and return the date after offset */
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

  /* Move Active Date back by one day if the present active Date > Present Date */
  handleStartBack(event) {
    event.preventDefault();
    if (this.state.windowStartDate > new Date()) {
      const newWin = this.state.windows - 1;
      this.setState({windows: newWin});
      this.generateWeek(this.changeDate(this.state.activeDate, this.state.windows));
    }
  }
  /* Move Active Date forward by one day if the present active Date > Present Date */
  handleStartForward(event) {
    event.preventDefault();
    const newWin = this.state.windows + 1;
    this.setState({windows: newWin});
    this.generateWeek(this.changeDate(this.state.activeDate, this.state.windows));
  }
  render() {
    let keyVal = 0;
    return (
      <div key={keyVal++} className="slide-view-area">
        <div key={keyVal++} className="scroll-area">
          <ul key={keyVal++}>
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

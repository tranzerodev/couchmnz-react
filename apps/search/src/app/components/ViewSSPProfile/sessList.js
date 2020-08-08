import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SessionLILHS from './sessListItem';
import SessionLIRHS from './sessListDisc';

class SessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionList: [],
      selected: []
    };
    this.handleList = this.handleList.bind(this);
    this.isThisSelected = this.isThisSelected.bind(this);
    // This.onSelect = this.onSelect.bind(this);
  }
  static get propTypes() {
    return {
      sessionList: PropTypes.array,
      selected: PropTypes.array,
      onSelect: PropTypes.func
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({selected: nextProps.selected});
    }
    if (nextProps.sessionList !== this.props.sessionList) {
      this.setState({sessionList: nextProps.sessionList});
    }
  }
  isThisSelected(item) {
    for (let count = 0; count < this.state.selected.length; count++) {
      if (this.state.selected[count].sessionID === item) {
        return true;
      }
    }
    return false;
  }
  /*   OnSelect(event, actionFlag) {
    const array = this.props.sessionList[event.target.key];
    const action = actionFlag;
    this.props.onSelect(action, array);
  } */
  handleList(sessionList) {
    let keyVal = 20;
    if (this.props.sessionList.length === 0) {
      return (
        <div key={keyVal++} className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around evevnt-column">
          <p>The view can be seen by clicking the calendar icon <i className="fa fa-calendar" aria-hidden="true"/> near this Section's Title.</p>
          <p>This set of Filters is not returning any matching session(s). </p><p>To apply the filters over a broader date base you may find the Calendar View more convenient. </p>
        </div>
      );
    }
    const dispArray = [];
    // Console.log(this.props.sessionList);
    for (let i = 0; i < sessionList.length; i++) {
      dispArray.push(
        <div key={keyVal++} className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around evevnt-column">
          <SessionLILHS
            key={i}
            sessionID={sessionList[i].sessionID}
            sessionColor={sessionList[i].sessionColor}
            sessionTime={sessionList[i].sessionTime}
            selected={this.isThisSelected(sessionList[i].sessionID)}
            trainOpen={sessionList[i].trainOpen}
            sessionPunch={sessionList[i].sessionPunch}
            sessionSport={sessionList[i].sessionSport}
            sessionType={sessionList[i].sessionType}
            sessionGender={sessionList[i].sessionGender}
            sessionAgeG={sessionList[i].sessionAgeG}
            sessionSkillLevel={sessionList[i].sessionSkillLevel}
            trainVenue={sessionList[i].trainVenue}
            distAway={sessionList[i].distAway}
            sessionRegRate={sessionList[i].sessionRegRate}
            discountRate={sessionList[i].discountRate}
            onSelect={(action, array) => this.props.onSelect(action, array)}
          />
          <SessionLIRHS
            key={keyVal++}
            sessionRegRate={this.props.sessionList[i].sessionRegRate}
            discountRate={this.props.sessionList[i].discountRate}
          />
        </div>);
    }
    return (dispArray);
  }
  render() {
    // Console.log(this.props);
    return (
      <div key="1">
        {this.handleList(this.props.sessionList)}
      </div>
    );
  }
}

SessionList.defaultProps = {
  sessionList: []
};
export default SessionList;

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class SchedulesAgendaClass extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleSearchSession(sessions, id) {
    return sessions.findIndex(session => session.id === id);
  }
  render() {
    const {event} = this.props;
    return (
      <div className="agendaInner" style={{background: 'white'}}>
        <div className="tableDiv">
          <div className="lCol">
            <p><span>{this.props.event.start.toLocaleTimeString(this.props.p.t('locale')) + '-' + this.props.event.end.toLocaleTimeString(this.props.p.t('locale'))}</span></p>
            <p>{this.props.p.t('SchedulesAgendaClass.open_positions')}: {(this.props.event.totalPosition - this.props.event.totalPositionBooked)}/{this.props.event.totalPosition}</p>
          </div>
          <div className="rCol">
            <p><span className="sspTxt">{this.props.p.t('SchedulesAgendaClass.user_types.' + this.props.event.userType)}</span> <span>{this.props.event.session.name + ', ' + this.props.event.session.ageGroupName} <i className="fa fa-circle"/></span>{event.session.trainingLocation && event.session.trainingLocation.title ? event.session.trainingLocation.title : ''}</p>
            <p>{this.props.event.totalBookingRequests} {this.props.p.t('SchedulesAgendaClass.booking_request')}<a>{this.props.p.t('SchedulesAgendaClass.see_all')}</a></p>
          </div>
        </div>
        <div className="dot">
          <a>
            <svg className="icon-ellipsish" xmlns="http://www.w3.org/2000/svg" viewBox="299.5 403.5 73.857 18.143">
              <path data-name="ellipsish" className="ellipsish" d="M17.143-35.714v8.571a4.133,4.133,0,0,1-1.25,3.036,4.133,4.133,0,0,1-3.036,1.25H4.286a4.133,4.133,0,0,1-3.036-1.25A4.133,4.133,0,0,1,0-27.143v-8.571A4.133,4.133,0,0,1,1.25-38.75,4.133,4.133,0,0,1,4.286-40h8.571a4.133,4.133,0,0,1,3.036,1.25A4.133,4.133,0,0,1,17.143-35.714Zm27.857,0v8.571a4.133,4.133,0,0,1-1.25,3.036,4.133,4.133,0,0,1-3.036,1.25H32.143a4.133,4.133,0,0,1-3.036-1.25,4.133,4.133,0,0,1-1.25-3.036v-8.571a4.133,4.133,0,0,1,1.25-3.036A4.133,4.133,0,0,1,32.143-40h8.571a4.133,4.133,0,0,1,3.036,1.25A4.133,4.133,0,0,1,45-35.714Zm27.857,0v8.571a4.133,4.133,0,0,1-1.25,3.036,4.133,4.133,0,0,1-3.036,1.25H60a4.133,4.133,0,0,1-3.036-1.25,4.133,4.133,0,0,1-1.25-3.036v-8.571a4.133,4.133,0,0,1,1.25-3.036A4.133,4.133,0,0,1,60-40h8.571a4.133,4.133,0,0,1,3.036,1.25A4.133,4.133,0,0,1,72.857-35.714Z" transform="translate(300 444)"/>
            </svg>
          </a>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      event: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

SchedulesAgendaClass.defaultProps = {
  event: {}
};

const mapStateToProps = state => {
  const {sessions} = state;
  return {
    sessions
  };
};

const SchedulesAgenda = connect(mapStateToProps)(translate(SchedulesAgendaClass));
export default SchedulesAgenda;

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import {isNonEmptyArray} from '../../../../../validators/common/util';
import {
  updateProfile,
  clearProfile,
  setSessions,
  addEvents,
  updateEvent,
  fetchSessions,
  fetchEvents,
  postEvents
} from '../../../../../actions';
import config from '../../../../../config';
import {
  FULFILLED, PENDING
} from '../../../../../constants/ActionTypes';

import Container from './Container';
import Modal from './Modal';
import NewModal from './NewModal';
import EventAgenda from '../../dashboard/SchedulesAgenda';

import BigCalendar from '../../../../../utils/react-big-calendar';
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
// import '../../../../../utils/react-big-calendar/css/react-big-calendar.css';
// import '../../../../../utils/react-big-calendar/addons/dragAndDrop/styles.css';

import withDragAndDrop from '../../../../../utils/react-big-calendar/addons/dragAndDrop';
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const {format} = config;

/* eslint new-cap: 0 */
class DragAndDropClass extends Component {
  constructor(props) {
    super(props);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.handleMoveEvent = this.handleMoveEvent.bind(this);
    this.handleEventSelect = this.handleEventSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleResizeEvent = this.handleResizeEvent.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.findEvent = this.findEvent.bind(this);
    this.handleOnViewChange = this.handleOnViewChange.bind(this);
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    const {events} = props;
    const lastEvent = isNonEmptyArray(events.data) ? events.data.slice(-1).pop() : null;
    this.state = {
      sessions: [],
      events: {data: []},
      modalIsOpen: false,
      event: {
        session: {}
      },
      start: lastEvent ? new Date(lastEvent.start) : new Date(),
      showSessions: true
    };
  }
  componentDidMount() {
    if (this.props.sessions.status !== FULFILLED && this.props.sessions.status !== PENDING) {
      this.props.fetchSessions({profileID: this.props.userProfiles.selectedProfile.id, sportID: this.props.sport.id});
      // This.props.fetchSessions({profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
    }
    if (this.props.events.status !== FULFILLED && this.props.events.status !== PENDING) {
      this.props.fetchEvents();
    }
  }
  handleSave(event) {
    const {events} = this.state;
    const index = this.findEvent(event.id);
    events[index] = event;
    this.setState({events});

    this.closeModal();
  }
  findEvent(id) {
    return this.props.events.data.findIndex(event => event.id === id);
  }
  handleMoveEvent({event, start, end}) {
    console.log('event', event, 'start', start, 'end', end);
    if (event.id) {
      // This.props.updateEvent({...event, start, end});
      // this.props.postEvents({...event, start, end: moment(start).add(1, 'hour'), sessionID: event.session.id});
    } else {
      this.setState({
        modal: <NewModal events={this.props.events} event={event} start={start} end={end} modalIsOpen closeModal={this.closeModal} onSave={this.handleSave}/>
      });

      // Const e = {
      //   id: null,
      //   sessionID: event.session.id,
      //   userType: 'S',
      //   start,
      //   end: moment(start).add(1, 'hour'),
      //   recurRule: '0 0 1 1 *',
      //   notes: event.notes,
      //   overridePricing: 0,
      //   overrideSessionLength: 0,
      //   overrideBufferLength: 0
      // };
      // this.props.postEvents(e);
    }
    /* If (event.id) {
      this.props.updateEvent({...event, start, end});
    } else {
      this.props.addEvents([{id: null, ...event, start, end}]);
    } */
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({
      modal: <div/>
    });
  }
  handleContent(calendar) {
    this.calendar = calendar;
  }
  handleResizeEvent(resizeType, {event, start, end}) {

    // This.props.updateEvent({
    //   ...event,
    //   start: new moment(start).subtract(0, 'seconds')._d,
    //   end: new moment(end).subtract(0, 'seconds')._d
    // });
  }
  handleSearchSession(sessions, id) {
    return sessions.findIndex(session => session.id === id);
  }
  eventStyleGetter(event, start, end, isSelected) {
    console.log('start', start, 'end', end);
    const backgroundColor = event.session.color;
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    };
    return {
      style
    };
  }
  handleOnViewChange(e) {
    if (e === 'month' || e === 'week' || e === 'day') {
      this.setState({
        showSessions: true
      });
      this.props.onViewChange(true);
    } else {
      this.setState({
        showSessions: false
      });
      this.props.onViewChange(false);
    }
  }
  handleTitleAccessor(event) {
    return event && event.session && event.session.name ? event.session.name : '';
  }
  handleNavigate(start) {
    this.setState({start});
  }
  componentWillReceiveProps(nextProps) {
    const {events} = nextProps;
    const {start} = this.state;
    const lastEvent = isNonEmptyArray(events.data) ? events.data.slice(-1).pop() : null;
    this.setState({start: lastEvent ? new Date(lastEvent.start) : start});
  }
  render() {
    const {modal, start} = this.state;
    const min = new Date();
    min.setHours(config.schedulerDayWeekViewStartTime);
    min.setMinutes(0);
    min.setSeconds(0);
    min.setMilliseconds(0);
    return (
      <div>
        <div className="calHeight">
          <DragAndDropCalendar
            ref={this.handleContent}
            selectable
            formats={format}
            events={this.props.events.data}
            onEventDrop={this.handleMoveEvent}
            onEventResize={this.handleResizeEvent}
            defaultView="week"
            views={this.props.views}
            onNavigate={this.handleNavigate}
            resizable
            culture={config.cultures[0]}
            titleAccessor={this.handleTitleAccessor}
            // OnDoubleClickEvent={this.handleEventSelect}
            onSelectEvent={this.handleEventSelect}
            // DefaultDate={new Date(this.props.events && this.props.events.data && this.props.events.data.length ? this.props.events.data[this.props.events.data.length - 1].start : null)}
            min={min}
            deafultDate={new Date()}
            date={start}
            components={{
              toolbar: Container,
              agenda: {
                event: EventAgenda
              }
            }}
            editable
            eventPropGetter={(this.eventStyleGetter)}
            showMultiDayTimes
            length={30}
            onView={this.handleOnViewChange}
            showSessions={this.state.showSessions}
          />
        </div>
        {modal}
      </div>
    );
  }
  handleEventSelect(event) {
    this.setState({
      modal: <Modal event={event.id} modalIsOpen closeModal={this.closeModal} onSave={this.handleSave}/>
    });
  }
  handleOnDrop(event) {
    // Console.log(event);
  }
  static get propTypes() {
    return {
      sessions: PropTypes.object,
      events: PropTypes.object,
      fetchSessions: PropTypes.func,
      fetchEvents: PropTypes.func,
      // UserIDs: PropTypes.object,
      userProfiles: PropTypes.object,
      views: PropTypes.array,
      onViewChange: PropTypes.func,
      sport: PropTypes.object
    };
  }
}
/* eslint new-cap: 0 */

DragAndDropClass.defaultProps = {
  sport: {},
  sessions: {data: []},
  events: {data: []},
  // UserIDs: {data: []},
  userProfiles: {data: [], status: null, selectedProfile: {id: null}},
  fetchSessions: () => {},
  fetchEvents: () => {},
  views: ['week'],
  onViewChange: () => {}
};

const mapStateToProps = state => {
  const {profile, events, sessions, userIDs, sport} = state;
  return {
    profile,
    events,
    sessions,
    userIDs,
    sport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: profile => dispatch(updateProfile({profile})),
    clearProfile: () => dispatch(clearProfile()),
    addEvents: events => dispatch(addEvents(events)),
    setSessions: profile => dispatch(setSessions(profile)),
    updateEvent: profile => dispatch(updateEvent(profile)),
    fetchSessions: userID => dispatch(fetchSessions(userID)),
    fetchEvents: userID => dispatch(fetchEvents(userID)),
    postEvents: event => dispatch(postEvents(event))
  };
};

DragAndDropCalendar.defaultProps = {
  views: ['week']
};
const DragAndDropComponent = connect(mapStateToProps, mapDispatchToProps)(DragAndDropClass);
export default DragAndDropComponent;

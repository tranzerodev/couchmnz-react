import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import EventSlot from './EventSlot'
import moment from 'moment'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ispRescheduleSession } from '../../../actions';
import EventModal from './EventModal'
import CustomToolbar from './CustomToolbar'
import { DesktopScreen, MobileScreen } from 'react-responsive-redux'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class SessionCalendarDnD extends Component {
   constructor(props) {
    super(props)
    const events = Object.assign(props.scheduledSessions.upcomming, props.scheduledSessions.data)
    this.state = {
      events: events ? events : {},
      scheduledSession: {},
      currentView: 'week'
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.newEvent = this.newEvent.bind(this) 
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSelectEvent= this.handleSelectEvent.bind(this)
    
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    let updatedEvent = { ...event, start, end, allDay }
    updatedEvent.rescheduleStartTime = moment(start).format("YYYY-MM-DD HH:mm:ss")
    updatedEvent.rescheduleEndTime = moment(end).format("YYYY-MM-DD HH:mm:ss")
    updatedEvent.startTime = start
    updatedEvent.endTime = end
    updatedEvent
    const reschedule = { startTime: moment(start).format("YYYY-MM-DD HH:mm:ss") }
    
    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)
    if ( event.totalSlots - event.openSlots > 0 ) {
      this.setState({
          events: nextEvents,
          isModalOpen: true,
          scheduledSession: updatedEvent,
          modal: 'reSchedule'
        })
    } else {
      this.props.ispRescheduleSession(this.props.selectedProfile.id, event.id, reschedule)
      this.setState({
        events: nextEvents
      })      
    }
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    alert(`${event.sessionName} was resized to ${start}-${end}`)
  }

  newEvent(event) {
    let idList = this.state.events.map(a => a.id)
    let newId = Math.max(...idList) + 1
    let hour = {
      id: newId,
      sessionName: 'New Event',
      allDay: event.slots.length == 1,
      start: event.start,
      end: event.end,
    }
    this.setState({
      events: this.state.events.concat([hour]),
      isModalOpen: true,
      modal: 'schedule',
      startTime: event.start
    })
  }
  
  handleCancel() {
      this.setState({
          isModalOpen: false
      })    
  }
  
  handleSelectEvent(event) {
    console.log("handleSelectEvent's event="+event)
  }
  
  render() {
    let today = moment()
    let am8 = today.set('hour', 7).set('minutes', 0).toDate()
    let pm8 = today.set('hour', 21).set('minutes', 0).toDate()
    let formats = {
      eventTimeRangeFormat: ({ start, end }, culture, local) =>
        local.format(start, "h:mm A", culture) + ' to ' +
        local.format(end, "h:mm A", culture)
    }
    return (
      <div>
      <DesktopScreen>
        <DragAndDropCalendar
          // selectable
          events={this.state.events}
          startAccessor={(event) => { return moment(event.startTime).toDate() }}
          endAccessor={(event) => { return moment(event.endTime).toDate() }}
          formats={formats}
          components={{
            event: EventSlot,
            toolbar: CustomToolbar({
              handleView: this.props.handleView, 
              p: this.props.p,
              schedulerSettingModal: this.props.schedulerSettingModal
            })
          }}
          min={am8}
          max={pm8}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          onSelectSlot={this.newEvent}
          defaultView={BigCalendar.Views.MONTH}
          views={['week','month']}
          step={15}
          onNavigate={ (date) => { this.setState({ selectedDate: date }) } }
          onSelectEvent={(event) =>this.handleSelectEvent(event)}
          view={this.state.currentView}
          onView={(view) => {
            this.setState({currentView: view})
          }}
          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: event.color
              };
        
              return {
                style: newStyle
              }
            }
          }
        />
      </DesktopScreen>
      <MobileScreen>
        <DragAndDropCalendar
          // selectable
          events={this.state.events}
          startAccessor={(event) => { return moment(event.startTime).toDate() }}
          endAccessor={(event) => { return moment(event.endTime).toDate() }}
          formats={formats}
          components={{
            event: EventSlot,
            toolbar: CustomToolbar({
              handleView: this.props.handleView, 
              p: this.props.p,
              schedulerSettingModal: this.props.schedulerSettingModal
            })
          }}
          min={am8}
          max={pm8}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          onSelectSlot={this.newEvent}
          defaultView={BigCalendar.Views.DAY}
          views={['day']}
          step={15}
          onNavigate={ (date) => { this.setState({ selectedDate: date }) } }
          onSelectEvent={(event) =>this.handleSelectEvent(event)}
          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: event.color
              };
        
              return {
                style: newStyle
              }
            }
          }
        />
      </MobileScreen>
      <EventModal 
          isModalOpen={this.state.isModalOpen}
          modal={this.state.modal}
          onCancel={this.handleCancel}
          event={this.state.scheduledSession}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { scheduledSessions, userProfiles } = state;
  return {
    scheduledSessions,
    selectedProfile: userProfiles.selectedProfile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ispRescheduleSession: (profileID, sessionID, data) => dispatch(ispRescheduleSession(profileID, sessionID, data))
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SessionCalendarDnD))
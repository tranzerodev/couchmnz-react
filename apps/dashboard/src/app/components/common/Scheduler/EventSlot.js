import React, { Component } from 'react'
import EventDropdown from './EventDropdown'
import { groupIcon, getIcon, teamIcon, privateIcon, clincIcon } from '../../../utils/svg'

class EventSlot extends Component {
    constructor( props ) {
        super( props )
    }
    
    render() {
        return (
          <div className="booked-schedule">
            <div className="cl-cal-schedule-details">
                <div className="cl-cal-sc-left">
    		        <div className="cl-schedule-type">
    		            {getIcon(this.props.event.trainingType.description)}
    		        </div>
    		        <span className="cl-cal-status">
    		            {' '}{this.props.event.openSlots} open
    		        </span>
    		        <div className="cl-cal-event-name">
    		            {this.props.event && this.props.event.sessionName} 
    		            {' '}<span>{this.props.event && this.props.event.priceUnit}
    		            {this.props.event && this.props.event.sessionPrice}
    		            </span>
    		        </div>
    		        <div className="cl-cal-event-type">
    		            {this.props.event && this.props.event.trainingType && 
    		                this.props.event.trainingType.description}
    		        </div>
                </div>
                <div className="cl-cal-sc-right">
                    <EventDropdown {...this.props} />
                </div>
            </div>      
          </div>
        )
    }
}

export default EventSlot
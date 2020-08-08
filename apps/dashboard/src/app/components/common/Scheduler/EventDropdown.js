import React, { Component } from 'react'
import PropTypes from 'prop-types'
import translate from 'redux-polyglot/translate'
import { threeDots } from '../../../utils/svg'
import EventModal from './EventModal'
import appConstants from '../../../constants/appConstants'

const { apiBooleanFlags } = appConstants

class EventDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isModalOpen: false,
        }        
        this.handleClick = this.handleClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    
    componentWillMount() {
	}

	componentWillUnmount(){
	}
	
    handleClick(modal,event) {
        this.setState({
            isModalOpen: true,
            scheduledSession: event,
            modal: modal
        })
    }
    
    handleCancel() {
        this.setState({
            isModalOpen: false
        })    
    }

    render() {
        const { p, event } = this.props
        const {canReschedule, canInviteAthletes, canChangeLocation, canOverridePricing, canOverrideGroupSize, canChangeBuffer, canOverridePositions, canRepeatSession, canRemoveSession, canCancelSession} = event
        
        return (
            <div>
                <div className="cl-sd-action-btn" data-uk-dropdown="{mode:'click'}" >
                    <a className="dropdown-link">
                        {threeDots()}
                    </a>
                <div className="cl-coach-dropdown uk-dropdown">
                    <ul className="cl-sm-dropdown">
                        <li><a onClick={() => this.handleClick('reSchedule',event)}>{p.t('DashboardSchedules.itemOptinMenu.reSchedule')}</a></li>
                        {canInviteAthletes === apiBooleanFlags.TRUE && <li><a onClick={() => this.handleClick('inviteAthletes',event)}>{p.t('DashboardSchedules.itemOptinMenu.inviteAthletes')}</a></li>}
                        {canChangeLocation === apiBooleanFlags.TRUE && <li><a onClick={() => this.handleClick('changeLocation',event)}>{p.t('DashboardSchedules.itemOptinMenu.changeLocation')}</a></li>}
                        <li><a onClick={() => this.handleClick('addNotes',event)}>{p.t('DashboardSchedules.itemOptinMenu.addNotes')}</a></li>
                        {canOverridePricing === apiBooleanFlags.TRUE && <li><a onClick={() => this.handleClick('overidePricing',event)}>{p.t('DashboardSchedules.itemOptinMenu.overidePricing')}</a></li>}
                        {canOverrideGroupSize === apiBooleanFlags.TRUE && <li><a onClick={() => this.handleClick('overrideGroupSize',event)}>{p.t('DashboardSchedules.itemOptinMenu.overrideGroupSize')}</a></li>}
                        <li><a onClick={() => this.handleClick('buffer',event)}>{p.t('DashboardSchedules.itemOptinMenu.buffer')}</a></li>
                        {canOverridePositions === apiBooleanFlags.TRUE && <li><a onClick={() => this.handleClick('openPositions',event)}>{p.t('DashboardSchedules.itemOptinMenu.openPositions')}</a></li>}
                        {canRepeatSession === apiBooleanFlags.TRUE && <li><a onClick={() => this.handleClick('repeat',event)}>{p.t('DashboardSchedules.itemOptinMenu.repeat')}</a></li>}
                        {canRemoveSession === apiBooleanFlags.TRUE && <li><a onClick={() => this.handleClick('remove',event)}>{p.t('DashboardSchedules.itemOptinMenu.remove')}</a></li>}
                        {canCancelSession === apiBooleanFlags.TRUE && <li><a onClick={() => this.handleClick('cancel',event)}>{p.t('DashboardSchedules.itemOptinMenu.cancel')}</a></li>}
                    </ul>
                </div>
                </div>
                <EventModal 
                    isModalOpen={this.state.isModalOpen}
                    modal={this.state.modal}
                    onCancel={this.handleCancel}
                    event={this.props.event}/>
            </div>            
        )
    }
}

EventDropdown.propTypes = {
    p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired
}

EventDropdown.defaultProps = {
    showDate: false
}

export default translate(EventDropdown)

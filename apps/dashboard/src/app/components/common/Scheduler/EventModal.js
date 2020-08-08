import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import ReScheduleModal from '../../ssp/isp/dashboard/DashboardScheduleModals/ReScheduleModal'
import CancelSessionModal from '../../ssp/isp/dashboard/DashboardScheduleModals/CancelSessionModal'
import ChangeLocationModal from '../../ssp/isp/dashboard/DashboardScheduleModals/ChangeLocationModal'
import InviteAthleteModal from '../../ssp/isp/dashboard/DashboardScheduleModals/InviteAthleteModal'
import OveridePriceModal from '../../ssp/isp/dashboard/DashboardScheduleModals/OveridePriceModal'
import OveridePositionsModal from '../../ssp/isp/dashboard/DashboardScheduleModals/OveridePositionsModal'
import RemoveSessionModal from '../../ssp/isp/dashboard/DashboardScheduleModals/RemoveSessionModal'
import RepeatModal from '../../ssp/isp/dashboard/DashboardScheduleModals/RepeatModal'
import SessionBufferModal from '../../ssp/isp/dashboard/DashboardScheduleModals/SessionBufferModal'
import SessionNotesModal from '../../ssp/isp/dashboard/DashboardScheduleModals/SessionNotesModal'
import OverrideGroupSizeModal from '../../ssp/isp/dashboard/DashboardScheduleModals/OverrideGroupSizeModal'
import ScheduleASession from '../../ssp/isp/dashboard/DashboardScheduleModals/ScheduleASession'

/* eslint react/forbid-component-props:0 */
class EventModal extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { isModalOpen, modal } = this.props
        return (
          <ReactModal
            isOpen={isModalOpen}
            ariaHideApp={false}
            style={
              {
                overlay: {
                  display: 'block',
                  overflowY: 'scroll'
                }
              }
            }
            className={{
              base: '',
              afterOpen: '',
              beforeClose: ''
            }}
            overlayClassName={{
              base: 'uk-modal',
              afterOpen: 'uk-open',
              beforeClose: 'uk-close'
            }}
          >
            {modal == 'reSchedule' && <ReScheduleModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'inviteAthletes' && <InviteAthleteModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'changeLocation' && <ChangeLocationModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'addNotes' && <SessionNotesModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'overidePricing' && <OveridePriceModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'overrideGroupSize' && <OverrideGroupSizeModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'buffer' && <SessionBufferModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'openPositions' && <OveridePositionsModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'repeat' && <RepeatModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'remove' && <RemoveSessionModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'cancel' && <CancelSessionModal onCancel={this.props.onCancel}  scheduledSession={this.props.event} />}
            {modal == 'schedule' && <ScheduleASession onCancel={this.props.onCancel} scheduledSession={this.props.event} />}
          </ReactModal>
        )
  }
}
/* eslint react/forbid-component-props:0 */
EventModal.propTypes = {
  isModalOpen: PropTypes.bool,
  modal: PropTypes.string
}

export default EventModal
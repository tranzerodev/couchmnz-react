import React from 'react'
import Toolbar from 'react-big-calendar'
import { listIcon, gearIcon } from '../../../utils/svg'

export default props => {
  return class BaseToolbar extends Toolbar {
    
    render() {
      const {label} = this.props
      const {p, handleView, schedulerSettingModal} = props
      return (
        <div className="cl-schedule-date-selector">
        {/*<button onClick={() => this.view('day')} className="uk-button btn-turquoise-t2 uk-display-inline-block uk-vertical-align-top">
        Day
        </button>
        <button onClick={() => this.view('week')} className="uk-button btn-turquoise-t2 uk-display-inline-block uk-vertical-align-top">
        Week
        </button>
        <button onClick={() => this.view('month')} className="uk-button btn-turquoise-t2 uk-display-inline-block uk-vertical-align-top">
        Month
        </button> */}
			<div className="rbc-btn-group">
			</div>          
          <div className="uk-grid">
            <div className="uk-width-large-5-10">
              <button onClick={() => this.navigate('TODAY')} className="uk-button btn-turquoise-t2 uk-display-inline-block uk-vertical-align-top">
              {p.t('DashboardSchedules.today')}</button>
              <div className="calender-date-selector">
                <button onClick={() => this.navigate('PREV')} className="uk-button no-border-right selected-date-right-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5417.5 3450 17 32">
                    <path id="Path-2" className="cls-1" d="M5,12.5l15.682,15L35,12.5" transform="translate(-5389 3446) rotate(90)"/>
                  </svg>
                </button>
                <span className="calendar-date-label">{label}</span>
                <button onClick={() => this.navigate('NEXT')} className="uk-button no-border-left selected-date-left-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5417.5 3450 17 32">
                    <path id="Path-2" className="cls-1" d="M5,12.5l15.682,15L35,12.5" transform="translate(-5429 3486) rotate(-90)"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="uk-width-large-5-10">
              <div className="calender-cta">
                <ul>
                  <li><a onClick={() => handleView('list')}>{listIcon()}</a></li>
                </ul>
                <a onClick={schedulerSettingModal} data-uk-modal className="cl-sd-setting">
                  {gearIcon()}
                </a>
              </div>
            </div>          
          </div>
        </div>
      )
    }
  
    navigate = action => {
      this.props.onNavigate(action)
    }
    
    view = view => {
      this.props.onViewChange(view)
    }    
  }
}
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sspConfig from '../../config/sspConfig';
import translate from 'redux-polyglot/translate';
import VolumeDiscount from './volumeDiscount';
import Modal from './Modal';
import {FULFILLED, PENDING} from '../../constants/ActionTypes';
import moment from 'moment';
/* eslint react/no-deprecated:0 */

function isChecked(id, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].eventId === id) {
      return true;
    }
  }
}

class SmallListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSeeVolumeDiscount = this.handleSeeVolumeDiscount.bind(this);
  }
  static get propTypes() {
    return {
      sessionID: PropTypes.string,
      sessionTime: PropTypes.object,
      sessionColor: PropTypes.string,
      trainOpen: PropTypes.number,
      sessionPunch: PropTypes.string,
      sessionSport: PropTypes.string,
      sessionType: PropTypes.string,
      sessionGender: PropTypes.string,
      sessionAgeG: PropTypes.string,
      sessionSkillLevel: PropTypes.string,
      trainVenue: PropTypes.string,
      distAway: PropTypes.string,
      sessionRegRate: PropTypes.object,
      discountRate: PropTypes.array,
      selected: PropTypes.bool,
      onSelect: PropTypes.func,
      onSeeVolumeDiscount: PropTypes.func.isRequired,
      selectedScheduleList: PropTypes.array.isRequired,
      scheduleId: PropTypes.string.isRequired
    };
  }
  componentDidMount() {
    this.setState({checked: this.props.selected});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      if (nextProps.length > 0) {
        // This.props = nextProps;
        this.setState({checked: nextProps.selected});
      }
    }
  }

  handleClick(e) {
    const isChecked = e.target.checked;
    const {sessionTime, scheduleId} = this.props;
    this.props.onSelect(scheduleId, isChecked, sessionTime.start);
  }

  handleSeeVolumeDiscount() {
    const {discountRate, sessionRegRate, sessionTime, scheduleId} = this.props;
    this.props.onSeeVolumeDiscount(discountRate, sessionRegRate, scheduleId, sessionTime.start);
  }
  render() {
    const {sessionTime} = this.props;
    const selected = isChecked(this.props.scheduleId, this.props.selectedScheduleList);
    return (
      <div className="cal-grid-event-block">
        {/* <div className="uk-width-large-1-1">
          <div style={{background: this.props.sessionColor, height: '8px', width: '100%', borderBottom: '1px solid #cccccc'}}/>
        </div> */}
        <div className="uk-width-large-1-1">
          <div style={{background: '#eeb0ec', height: '8px', width: '100%', borderBottom: '1px solid #cccccc'}}/>
        </div>
        <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around" style={{background: '#ffffff'}}>
          <div className="uk-width-large-1-10 uk-width-medium-1-10 uk-width-small-1-10 uk-width-1-10">
            <label className="container-ck bold-font-family">
              <input type="checkbox" onClick={this.handleClick} checked={selected}/>
              <span className="checkmark"/>
            </label>
          </div>
          <div className="uk-width-large-9-10 uk-width-medium-9-10 uk-width-small-9-10 uk-width-9-10" style={{background: '#ffffff'}}>
            <div className="event-place">
              <span className="time-slot">{moment(sessionTime.start).format('hh:mm A') + ' - ' + moment(sessionTime.end).format('hh:mm A')}</span>
              <span className="open-pos">{this.props.trainOpen} open positions</span>
              <span className="event-name bold-font-family">{this.props.sessionSport} for {this.props.sessionPunch}</span>
              <span>
                {this.props.sessionRegRate.currency + this.props.sessionRegRate.rate} <a className="see-dis" style={{display: 'inline-block', paddingTop: '0'}} onClick={this.handleSeeVolumeDiscount}>See volume discount</a>
              </span>
              <div className="event-group">
                <span className="g-a ">
                  {
                    [this.props.sessionSport, this.props.sessionType, this.props.sessionGender, this.props.sessionAgeG, this.props.sessionSkillLevel].filter(item => item !== null && item !== '').join(', ')
                  }
                </span>
              </div>
              <div className="coach-place">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633" className="location-marker">
                  <defs>
                    <style/>
                  </defs>
                  <path id="Path_67" data-name="Path 67" className="cls-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
                </svg>
                <div className="destination">
                  <a href="#training-locations" data-uk-smooth-scroll="{offset: 90}">  {this.props.trainVenue}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SmallList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionList: [],
      selected: [],
      isVolumeDiscountModalOpen: false,
      volumeDiscounts: [],
      baseRate: {},
      sessionID: '',
      startTime: ''
    };
    this.handleSmallList = this.handleSmallList.bind(this);
    this.isThisSelected = this.isThisSelected.bind(this);
    this.handleVolumeDiscount = this.handleVolumeDiscount.bind(this);
  }
  static get propTypes() {
    return {
      sessionList: PropTypes.array,
      selected: PropTypes.array,
      onSelect: PropTypes.func,
      offerTerminology: PropTypes.string.isRequired,
      sessionFilterStatus: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onVolumeDiscountSelect: PropTypes.func.isRequired
    };
  }
  componentDidMount() {
    this.setState({sessionList: this.props.sessionList, selected: this.props.selected});
    // Console.log(this.props.sessionList);
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
  handleSmallList(sessionList, status) {
    let keyVal = 0;
    if (sessionList.length === 0 && status === PENDING) {
      return (
        <div key={keyVal++} className="cal-grid-event-block">
          <p className="cl-noresults-loading">{this.props.p.t('SSPProfile.findSession.searchMessage')}</p>
        </div>
      );
    }
    if (sessionList.length === 0 && status === FULFILLED) {
      return (
        <div key={keyVal++} className="cal-grid-event-block">
          <p className="cl-noresults-loading">{this.props.p.t('SSPProfile.findSession.errorMessage')}</p>
        </div>
      );
    }
    const dispArray = [];
    for (let count = 0; count < sessionList.length; count++) {
      dispArray.push(
        <SmallListItem
          key={keyVal++}
          sessionID={sessionList[count].sessionID}
          scheduleId={sessionList[count].scheduleId}
          sessionTime={sessionList[count].sessionTime}
          sessionColor={sessionList[count].sessionColor}
          trainOpen={sessionList[count].trainOpen}
          sessionPunch={sessionList[count].sessionPunch}
          sessionSport={sessionList[count].sessionSport}
          sessionType={sessionList[count].sessionType}
          sessionGender={sessionList[count].sessionGender}
          sessionAgeG={sessionList[count].sessionAgeG}
          sessionSkillLevel={sessionList[count].sessionSkillLevel}
          trainVenue={sessionList[count].trainVenue}
          distAway={sessionList[count].distAway}
          sessionRegRate={sessionList[count].sessionRegRate}
          discountRate={sessionList[count].discountRate}
          selected={this.isThisSelected(sessionList[count].sessionID)}
          onSelect={this.props.onSelect}
          onSeeVolumeDiscount={this.handleVolumeDiscount}
          selectedScheduleList={this.props.selected}
        />
      );
    }
    return (dispArray);
  }
  handleVolumeDiscount(discountRate, sessionRegRate, scheduleID, time) {
    const volumeDiscounts = discountRate && discountRate.length ? discountRate : [];
    const baseRate = sessionRegRate ? sessionRegRate : {};
    const sessionID = scheduleID ? scheduleID : '';
    const startTime = time ? time : '';
    this.setState({isVolumeDiscountModalOpen: !this.state.isVolumeDiscountModalOpen, volumeDiscounts, baseRate, sessionID, startTime});
  }
  render() {
    const {volumeDiscounts, baseRate, sessionID, startTime} = this.state;
    const status = this.props.sessionFilterStatus;
    return (
      <div>
        {this.handleSmallList(this.state.sessionList, status)}
        <Modal isModalOpen={this.state.isVolumeDiscountModalOpen}>
          <VolumeDiscount
            onClose={this.handleVolumeDiscount}
            volumeDiscounts={volumeDiscounts}
            baseRate={baseRate}
            offerTerminology={this.props.offerTerminology}
            onVolumeDiscountSelect={this.props.onVolumeDiscountSelect}
            sessionID={sessionID}
            startTime={startTime}
          />
        </Modal>
      </div>
    );
  }
}

SmallList.defaultProps = {
  sessionList: [],
  selected: [],
  sessionFilterStatus: ''
};

export default translate(SmallList);

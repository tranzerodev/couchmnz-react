import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sspConfig from '../../config/sspConfig';

class SessionLILHS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.handle24to12Time = this.handle24to12Time.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // This.handleNonScriptLink = this.handleNonScriptLink.bind(this);
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
      discountRate: PropTypes.object,
      selected: PropTypes.bool,
      onSelect: PropTypes.func
    };
  }
  componentDidMount() {
    this.setState({checked: this.props.selected});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({checked: nextProps.selected});
    }
  }
  handle24to12Time(time24) {
    let time12 = '';
    const hh = Math.round(time24 / 100);
    const mm = Math.round(time24 % 100);
    let HH = hh;
    if (hh > 9) {
      if (hh >= 13) {
        HH = hh - 12;
      }
      time12 = HH.toString() + ':';
    } else {
      time12 = '0' + HH.toString() + ':';
    }
    if (mm > 9) {
      time12 = time12.concat(mm.toString(), (hh >= 12 ? 'PM' : 'AM'));
    } else {
      time12 = time12.concat('0' + mm.toString(), (hh >= 12 ? 'PM' : 'AM'));
    }
    return (time12);
  }
  handleClick() {
    const toggleState = !this.state.checked;
    this.setState({checked: toggleState});
    // Console.log(toggleState);
    if (toggleState) {
      this.props.onSelect('add', this.props);
    } else {
      this.props.onSelect('del', this.props);
    }
  }
  render() {
    // Console.log(this.props);
    return (
      <div className="uk-width-large-6-10 uk-width-medium-7-10 uk-width-1-1 hourly-event">
        <div style={{background: this.props.sessionColor, width: '8px', display: 'table-cell'}}/>
        <div className="checkboxWrapper" style={{background: ((this.state.checked) ? this.props.sessionColor : '#ffffff')}}>
          <label className="container-ck bold-font-family">
            <input type="checkbox" checked={this.state.checked} onChange={this.handleClick}/>
            <span className="checkmark"/>
          </label>
        </div>
        <div className="event-holder">
          <span className="time-slot">{this.handle24to12Time(this.props.sessionTime.start) + ' - ' + this.handle24to12Time(this.props.sessionTime.end)}</span>
          <span className="open-pos">
            {this.props.trainOpen} open positions
          </span>
        </div>
        <div className="event-place">
          <span className="event-name bold-font-family">{this.props.sessionPunch}</span>
          <div className="event-group">
            <span className="e-n">
              {this.props.sessionSport}
            </span>
            <span className="t-t">
              <i className="fa fa-stop" aria-hidden="true"/>
              <svg className="team-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-17433 -18026 18.824 11.711">
                <path id="Mask" className="cls-1" d="M18.32,8.667a4.893,4.893,0,0,1-3.154.77V8.493a4.326,4.326,0,0,0-.724-2.463,3.122,3.122,0,0,0,2.8-.187,2.051,2.051,0,0,1,1.079,1.9ZM5.988,10a.48.48,0,0,0,.024-.148V8.493a3.685,3.685,0,0,1,.656-2.171,3.534,3.534,0,0,1,1.115-.855,4.039,4.039,0,0,0,4.434,0,3.522,3.522,0,0,1,1.188.952,3.708,3.708,0,0,1,.585,2.074V9.851a.484.484,0,0,0,.025.154A7.131,7.131,0,0,1,5.988,10ZM4.835,8.493v.946A4.953,4.953,0,0,1,1.68,8.666V7.74A2.022,2.022,0,0,1,2.761,5.849a3.126,3.126,0,0,0,2.781.186,4.329,4.329,0,0,0-.707,2.458ZM17.414,4.77h-.006a1.656,1.656,0,0,0,.144-.674,1.892,1.892,0,0,0-3.774,0,1.665,1.665,0,0,0,.144.675c-.005,0-.012,0-.017,0A3.887,3.887,0,0,0,13.455,5a5.092,5.092,0,0,0-1.06-.6,2.411,2.411,0,0,0,.37-1.265A2.731,2.731,0,0,0,9.31.633,2.645,2.645,0,0,0,7.351,2.4a2.45,2.45,0,0,0,.262,2A5.3,5.3,0,0,0,6.541,5a3.888,3.888,0,0,0-.448-.231h-.01a1.648,1.648,0,0,0,.145-.675A1.822,1.822,0,0,0,4.337,2.333a1.822,1.822,0,0,0-1.89,1.762,1.641,1.641,0,0,0,.148.681h-.01a3.086,3.086,0,0,0-2,2.963V8.769a.836.836,0,0,0,.407.7,6.089,6.089,0,0,0,3.9,1,.524.524,0,0,0,.174.188,8.973,8.973,0,0,0,4.942,1.61,8.918,8.918,0,0,0,4.922-1.6.524.524,0,0,0,.179-.2,6.165,6.165,0,0,0,3.894-.993.839.839,0,0,0,.406-.7V7.74a3.085,3.085,0,0,0-2-2.97Z" transform="translate(-17433.588 -18026.557)"/>
              </svg>
              {this.props.sessionType}
            </span>
            <span className="g-a">
              <i className="fa fa-stop" aria-hidden="true"/>
              {this.props.sessionGender + ', ' + this.props.sessionAgeG + ', ' + this.props.sessionSkillLevel}
            </span>
          </div>
          <div className="coach-place">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633" className="location-marker">
              <defs />
              <path id="Path_67" data-name="Path 67" className="cls-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
            </svg>
            {this.props.trainVenue.name}
          </div>
          <div className="destination">
            <span>{this.props.distAway}</span>
            <a href="#training-locations" data-uk-smooth-scroll="{offset: 110}">See on map</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionLILHS;

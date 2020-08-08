import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Accord from './custh2Accord';
import translate from 'redux-polyglot/translate';
// Import './marker.css';
// import axios from 'axios';
import config from '../../config';

const MarkerDescComponent = ({num, header, text, tgt, visible}) => <div id={num} style={{width: '100px', height: 'auto', backgroundColor: '#f15e23', color: '#fff', scroll: 'auto', border: '1px #f15e23 solid', position: 'relative', margin: '-70px', borderRadius: '5px', padding: '5px', display: 'none', boxShadow: '10px 10px 50px grey'}} ><b>{header}</b><br/>{text}<br/><a href={tgt} style={{color: '#fff', textDecoration: 'underline'}} target="_blank">Goto website</a></div>;

const PlainMarker = ({num}) => <span style={{display: 'inline'}}><i id={num} className="fa fa-map-marker fa-3x" style={{color: '#f15e23'}}/>{num + 1}</span>;

class RenderMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.calcCenter = this.calcCenter.bind(this);
    this.renderLocList = this.renderLocList.bind(this);
    this.showMarker = this.showMarker.bind(this);
    this.handleMarkersDisplay = this.handleMarkersDisplay.bind(this);
  }
  static get propTypes() {
    return {
      address: PropTypes.array.isRequired,
      showTrainLoc: PropTypes.bool.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
  componentWillMount() {
    this.setState({address: this.props.address});
  }
  componentDidMount() {
    this.setState({address: this.props.address});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.props = nextProps;
    }
  }
  calcCenter(locArray) {
    const totalCoord = {lat: 0, lng: 0};
    const avg = {};
    for (let count = 0; count < locArray.length; count++) {
      totalCoord.lat += parseFloat(locArray[count].lat);
      totalCoord.lng += parseFloat(locArray[count].lng);
    }
    avg.lat = totalCoord.lat / locArray.length;
    avg.lng = totalCoord.lng / locArray.length;
    return (avg);
  }

  /* Show Marker for respective list item */
  showMarker(index) {
    // MarkerDescComponent[index].visible = 'block';
  }

  /* Render the location list beside the Map */
  renderLocList(locations) {
    const LocArray = [];
    let keyVal = 0;
    for (let locCounter = 0; locCounter <= locations.length - 1; locCounter++) {
      LocArray.push(
        <li key={keyVal++}>
          <div key={keyVal++} className="location-number">{locCounter + 1}</div>
          <div key={keyVal++} className="location-info">
            <span key={keyVal++} className="location-name">{locations[locCounter].name}</span>
            <span key={keyVal++} className="location-address">
              {locations[locCounter].street + ', ' + locations[locCounter].city + ', ' + locations[locCounter].state}
            </span>
            {/* <span key={keyVal++} className="location-facility">
              Facility: {locations[locCounter].facility}
            </span> */}
            <a href="#find-a-session" data-uk-smooth-scroll="{offset: 90}" className="themeBlueText">{this.props.p.t('SSPProfile.location.schedule')}</a>
          </div>
        </li>);
    }
    return (LocArray);
  }

  handleMarkersDisplay(addrArray) {
    const returnArray = [];
    let keyVal = 0;
    for (let count = 0; count < addrArray.length; count++) {
      // ReturnArray.push(<MarkerDescComponent key={keyVal++} header={addrArray[count].name} id={'parker' + count} lat={addrArray[count].lat - 0.001} lng={addrArray[count].lng} num={'marker' + count} text={addrArray[count].street + ', ' + addrArray[count].state} tgt={addrArray[count].website} visible="none"/>);
      returnArray.push(<PlainMarker key={keyVal++} lat={addrArray[count].lat - 0.001} lng={addrArray[count].lng} num={count}/>);
    }
    return (returnArray);
  }
  render() {
    const bodyText = [];
    let keyVal = 0;
    bodyText.push(
      <div key={keyVal++} className="location-map">
        <div key={keyVal++} className="selected-location">
          <span key={keyVal++} className="bold-font-family">{this.props.p.t('SSPProfile.location.trainingLoc', {length: this.state.address.length})}</span>
          <ul key={keyVal++}>
            {this.renderLocList(this.state.address)}
          </ul>
        </div>
        <div key={keyVal++} className="map-right">
          <div key={keyVal++} className="mytooltip" style={{height: '460px', width: '100%', border: '0'}}>
            <GoogleMapReact
              bootstrapURLKeys={{
                language: 'en',
                key: config.googleApiKey
              }}
              center={this.calcCenter(this.state.address)}
              zoom={12}
            >
              {this.handleMarkersDisplay(this.state.address)}
            </GoogleMapReact>
          </div>
        </div>
      </div>);
    return (
      <Accord mainID="training-locations" mainClassName="training-location custom-accordian-con" header={this.props.p.t('SSPProfile.location.header')} headerState="" contentBody={bodyText} bodyClassName="location-map" showBody={this.props.showTrainLoc}/>
    );
  }
}

export default translate(RenderMap);

import React, {Component} from 'react';
import axios from 'axios';

class NearbyLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      city: ''
    };
  }
  render() {
    return (
      <div className="ft-links">
        <div className="uk-grid">
          <div className="uk-width-large-1-3 uk-width-medium-3-10 uk-width-1-1 sm-padding-bottom-20">
            <h6>{this.state.data} in {this.state.city}</h6>
            <ul>
              <li>
                <a href="">Individual {this.state.data} Trainers in {this.state.city}</a>
              </li>
              <li>
                <a href="">{this.state.data} Training Facilities in {this.state.city}</a>
              </li>
              <li>
                <a href="">{this.state.data} Camps & Clinics in {this.state.city}</a>
              </li>
            </ul>
          </div>
          <div className="uk-width-large-1-3 uk-width-medium-3-10 uk-width-1-1 sm-padding-bottom-20">
            <h6>Most Popular in {this.state.city}</h6>
            <ul>
              <li>
                <a href="">Top Individual Trainers in {this.state.city}</a>
              </li>
              <li>
                <a href="">Popular Training Facilities in {this.state.city}</a>
              </li>
              <li>
                <a href="">Top Camps & Clinics in {this.state.city}</a>
              </li>
            </ul>
          </div>
          <div className="uk-width-large-1-3 uk-width-medium-3-10 uk-width-1-1 sm-padding-bottom-20">
            <h6>Nearby</h6>
            <ul>
              <li>
                <a href="">{this.state.data} in San Jose</a>
              </li>
              <li>
                <a href="">{this.state.data} in San Jose</a>
              </li>
              <li>
                <a href="">{this.state.data} in San Jose</a>
              </li>
            </ul>
          </div>
        </div>
      </div>);
  }
}

export default NearbyLinks;

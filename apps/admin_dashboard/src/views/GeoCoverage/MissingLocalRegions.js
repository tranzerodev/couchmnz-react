import React, {Component} from 'react';
import {Row, Col, Card, CardHeader, CardBody, Input, Button, Table, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
const queryString = require('query-string');
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';
import {MISSING_LOCAL_REGIONS} from '../../constants/pathConstants';

/* eslint react/no-deprecated: 0 */
const header = getAuthHeader();
class MissingLocalRegions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      localRegions: [],
      header: getAuthHeader()
    };
    
    this.getMisingLocalRegions = this.getMisingLocalRegions.bind(this)
  }

  componentDidMount() {
    this.getMisingLocalRegions()
  }
  
  getMisingLocalRegions() {
    const url = config.GET_MISSING_LOCAL_REGIONS
    
    axios.get(url, {headers: header})
      .then(response => {
        if (response.data && response.data.responseCode === 0) {
          this.setState({localRegions: response.data.data, loaded: true}, () => {
            this.displayLayoutsArr(this.state.localRegions);
          });
        } else {
          this.setState({localRegions: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } 
      });
  }

  displayLayoutsArr(localRegions) {
    const regions = localRegions.map((r, key) => {
      console.log('r', r)
      return (
        <tr key={r.city_id} >
          <td>{r.geo.city}</td>
          <td>{r.geo.state}</td>
          <td>{r.geo.country}</td>
          <td>{r.locationCount}</td>
        </tr>
      );
    });

    this.setState({progList: regions});
  }

  render() {
    const {localRegions, loaded} = this.state;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"/> Missing Local Regions
          </CardHeader>
          <CardBody>
            {(localRegions.length === 0 && loaded === true) ?
              <Alert color="warning">
                    No data found
              </Alert> :
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>SSP Training Locations Count</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.progList}
                </tbody>

              </Table>}
          </CardBody>
        </Card>
        <Loader loaded={this.state.loaded} className="spinner"/>
      </div>
    );
  }
}

export default MissingLocalRegions;

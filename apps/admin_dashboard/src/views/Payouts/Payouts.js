import React, {Component} from 'react';
import {Row, Col, Card, CardHeader, CardBody, Input, Button, Table, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
const queryString = require('query-string');
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';
import {ADD_INSTITUTIONS_TO_payoutS, INSTITUTIONS, EDIT_payoutS, ADD_payoutS} from '../../constants/pathConstants';

/* eslint react/no-deprecated: 0 */
const header = getAuthHeader();
class Payouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parsed: queryString.parse(props.location.search),
      loaded: false,
      payoutsArr: [],
      header: getAuthHeader()
    };
    
    this.getPayoutList = this.getPayoutList.bind(this)
    this.onClickProcess = this.onClickProcess.bind(this)
    this.onClickPaid = this.onClickPaid.bind(this)
  }

  componentDidMount() {
    this.getPayoutList()
  }
  
  onClickProcess(id) {
    const url = config.PAYOUT.replace('{id}', id)
    axios.put(url, {}, {headers: header})
    .then(response => {
      console.log('response', response)
      if (response.data && response.data.responseCode === 0) {
        this.getPayoutList()
      }
    })
    .catch(error => {
      console.error('Error---', error);
      if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
        logout();
      } 
    })    
  }
  
  onClickPaid(id) {
    const url = config.PAYOUT_COMPLETE.replace('{id}', id)
    console.log('response', url)
    axios.post(url, {}, {headers: header})
    .then(response => {
      if (response.data && response.data.responseCode === 0) {
        this.getPayoutList()
      }
    })
    .catch(error => {
      console.error('Error---', error);
      if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
        logout();
      } 
    })
  }

  getPayoutList() {
    const url = config.GET_PAYOUTS
    
    axios.get(url, {headers: header})
      .then(response => {
        if (response.data && response.data.responseCode === 0) {
          this.setState({payoutsArr: response.data.data, loaded: true}, () => {
            this.displayPayouts(this.state.payoutsArr);
          });
        } else {
          this.setState({payoutsArr: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } 
      });
  }

  displayPayouts(payoutsArr) {
    const payout = payoutsArr.map((r, key) => {
      return (
        <tr key={r.id} >
          <td>{r.createdAt}</td>
          <td>{r.status}</td>
          <td>{r.profile.name}</td>
          <td>{r.destinationType}</td>
          <td>
            {r.destinationType == 'paypal' && r.destination.email}
            {r.destinationType == 'bank' && 
              <div>
                <p>Holder: {r.destination.firstName} {r.destination.lastName}</p>
                <p>Bank: {r.destination.bank}</p>
                <p>Account: {r.destination.number}</p>
                <p>Routing: {r.destination.routingNumber}</p>
              </div>
            }
          </td>
          <td>${r.amount}</td>
          <td>
            {r.status == 'pending' && <Button onClick={() => this.onClickProcess(r.id)}>Process</Button>}
            {r.status == 'processing' && <Button onClick={() => this.onClickPaid(r.id)}>Paid</Button>}
          </td>
        </tr>
      );
    });

    this.setState({progList: payout});
  }

  render() {
    const {payoutsArr, loaded} = this.state;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"/> Payout List
          </CardHeader>
          <CardBody>
            {(payoutsArr.length === 0 && loaded === true) ?
              <Alert color="warning">
                    No data found
              </Alert> :
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Payout Type</th>
                    <th>Payout Info</th>
                    <th>Payout Amount</th>
                    <th>Actions</th>
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

export default Payouts;

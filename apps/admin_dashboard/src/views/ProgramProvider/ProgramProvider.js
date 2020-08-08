import React, {Component} from 'react';
import {Card, CardHeader, CardBody, Button, Table, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import 'react-table/react-table.css';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';
import {EDIT_PROGRAM_PROVIDERS, PROGRAMS, ADD_PROGRAMS, ADD_PROGRAM_PROVIDERS} from '../../constants/pathConstants';

// Import AddInstitute from '../AddInstitute/';

// import SmartDataTable from 'react-smart-data-table';

/* eslint react/no-deprecated: 0 */

class ProgramProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgList: null,
      OrgArr: [],
      searchText: '',
      header: getAuthHeader(),
      loaded: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.getOrgList = this.getOrgList.bind(this);
    this.displayOrg = this.displayOrg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.getOrgList();
  }

  componentWillUnmount() {

  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
  handleSearch() {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.ORG_URL + '?term=' + (this.state.searchText ? this.state.searchText.trim() : ''), {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({OrgArr: response.data.payload, loaded: true}, () => {
            self.displayOrg(self.state.OrgArr);
          });
        } else {
          self.setState({loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        self.setState({loaded: true});
      });
  }

  getOrgList() {
    const self = this;
    const header = getAuthHeader();
    axios.get(config.ORG_URL, {headers: header})
      .then(response => {
        console.log('response :: ', response);
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({OrgArr: response.data.payload, loaded: true}, () => {
            self.displayOrg(self.state.OrgArr);
          });
        } else {
          self.setState({OrgArr: []});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({OrgArr: []});
        }
      });
  }

  displayOrg(OrgArr) {
    const org = OrgArr.map((org, key) => {
      return (
        <tr key={org._id} >
          <td>{key + 1}</td>
          <td>{org.organization_en}</td>
          <td>{org.type}</td>
          <td>{org.country}</td>
          <td>{org.status}</td>
          <td><Link to={PROGRAMS + '?org=' + org._id}>{org.programs ? org.programs.length : 0}</Link>
          </td>
          <td><Link to={ADD_PROGRAMS} value={org.id} > <Button color="success">Add Program</Button></Link>
            <Link to={EDIT_PROGRAM_PROVIDERS.replace(':id', org._id)} > <Button color="primary">Edit</Button></Link>
          </td>
        </tr>);
    });

    this.setState({orgList: org});
  }

  render() {
    const {OrgArr, loaded} = this.state;
    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" onChange={this.handleChange} onKeyDown={this.handleKeyPress} placeholder="Search for..." aria-label="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
              </span>
            </div>
          </div>

          <div className="col-lg-6" align="right">
            <Link to={ADD_PROGRAM_PROVIDERS} > <Button color="primary">Add Program Provider</Button></Link>
          </div>

        </div>
        <br/>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"/> Program Provider List
          </CardHeader>
          <CardBody>
            {(OrgArr.length === 0 && loaded === true) ?
              <Alert color="warning">
                    No data found
              </Alert> :
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Programs</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.orgList}
                </tbody>
              </Table>}
          </CardBody>
        </Card>
        <Loader loaded={this.state.loaded} className="spinner"/>
      </div>
    );
  }
}

export default ProgramProvider;

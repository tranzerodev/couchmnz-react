import React, {Component} from 'react';
import {Row, Col, Card, CardHeader, CardBody, Input, Button, Table, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
const queryString = require('query-string');
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';
import {ADD_INSTITUTIONS_TO_PROGRAMS, INSTITUTIONS, EDIT_PROGRAMS, ADD_PROGRAMS} from '../../constants/pathConstants';

/* eslint react/no-deprecated: 0 */

class Program extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parsed: queryString.parse(props.location.search),
      // ProgList: <tr><td colSpan="9">No data</td></tr>,
      programArr: [],
      programTypes: config.PROG_TYPE,
      orgTypes: [
      ],
      sportsTypes: [],
      searchText: '',
      orgOptions: [],
      programTypeOptions: [],
      sportsTypeOptions: [],
      orgTypeOptions: [],
      orgOptionItems: '',
      loaded: false,
      header: getAuthHeader()
    };

    this.getProgList = this.getProgList.bind(this);
    this.displayPrograms = this.displayPrograms.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.getOrgList = this.getOrgList.bind(this);
    this.createOrgOptions = this.createOrgOptions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getSports = this.getSports.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentWillMount() {
    this.getSports();
  }

  componentDidMount() {
    this.getOrgList();

    this.getProgList();
    const programTypeOption = this.state.programTypes.map(programType => {
      return <option key={programType.value} value={programType.key}>{programType.value}</option>;
    });
    this.setState({
      programTypeOptions: programTypeOption
    });
    const orgTypeOption = this.state.orgTypes.map(orgType => {
      return <option key={orgType.value} value={orgType.id}>{orgType.value}</option>;
    });
    this.setState({
      orgTypeOptions: orgTypeOption
    });
    /* Const sportTypeOption = this.state.sportsTypes.map(sportType => {
      return <option key={sportType.id} value={sportType.id}>{sportType.name}</option>;
    });
    this.setState({
      sportsTypeOptions: sportTypeOption
    }); */
  }

  componentWillUnmount() {

  }

  getSports() {
    const self = this;
    axios.get(config.GET_SPORTS, {headers: this.state.header})
      .then(response => {
        if (response.data.payload) {
          const sportsTypes = response.data.payload.sports;
          const sportsTypeOptions = sportsTypes.map(sportType => {
            if (sportType.isActive === 'Y') {
              return <option key={sportType.id} value={sportType.id}>{sportType.name}</option>;
            }
          });
          self.setState({sportsTypes, sportsTypeOptions});
        }
      })
      .catch(error => {
        console.error('Error---', error);
      });
  }

  getOrgList() {
    const self = this;
    const header = getAuthHeader();
    axios.get(config.ORG_URL, {
      headers: header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({orgOptions: response.data.payload});
          self.createOrgOptions();
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  createOrgOptions() {
    const orgOption = this.state.orgOptions.map(orgOpt => {
      return <option key={orgOpt._id} value={orgOpt._id}>{orgOpt.organization_en}</option>;
    });
    this.setState({
      orgOptionItems: orgOption
    });
  }

  getProgList() {
    let url;
    const header = getAuthHeader();
    if (this.state.parsed && this.state.parsed.org) {
      url = config.ORG_URL + '/' + this.state.parsed.org + '/programs';
    } else {
      url = config.PROG_URL;
    }
    const self = this;
    axios.get(url, {headers: header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({programArr: response.data.payload, loaded: true}, () => {
            self.displayPrograms(self.state.programArr);
          });
        } else {
          self.setState({programArr: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({programArr: [], loaded: true});
        }
      });
  }

  displayPrograms(programArr) {
    const program = programArr.map((prog, key) => {
      const progId = prog._id;
      return (
        <tr key={prog._id} >
          <td>{key + 1}</td>
          <td>{prog.program_en}</td>
          <td>{prog.type}</td>
          <td>{prog.organization_en}</td>
          <td>{prog.sport_en}</td>
          <td>{prog.status}</td>
          <td>{prog.institutes ? <Link to={INSTITUTIONS} value={progId._id} >{prog.institutes.length}</Link> : 'N/A'}</td>
          <td><Link to={ADD_INSTITUTIONS_TO_PROGRAMS.replace(':id', prog._id) + '?org=' + prog.organization_en + '&type=' + prog.type + '&prog=' + prog.program_en + '&orgid=' + prog.organization_id} value={progId.id} > <Button color="success">Add Institution</Button></Link>
            <Link to={EDIT_PROGRAMS.replace(':id', prog._id)} value={progId.id} > <Button color="primary">Edit</Button></Link>
          </td>
        </tr>
      );
    });

    this.setState({progList: program});
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
    axios.get(config.PROG_URL + '?term=' + (this.state.searchText ? this.state.searchText.trim() : ''), {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({programArr: response.data.payload, loaded: true});
          self.displayPrograms(self.state.programArr);
        } else {
          self.setState({programArr: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        self.setState({programArr: [], loaded: true});
      });
  }

  handleFilter() {
    const self = this;
    self.setState({loaded: false});
    axios.post(config.PROG_FILTER,
      {
        type: this.state.programTypeFilter ? this.state.programTypeFilter : null,
        organization_id: this.state.orgTypeFilter ? this.state.orgTypeFilter : null,
        sport_id: this.state.sportTypeFilter ? this.state.sportTypeFilter : null
      },
      {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({programArr: response.data.payload, loaded: true});
          self.displayPrograms(self.state.programArr);
        } else {
          self.setState({programArr: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({programArr: [], loaded: true});
        }
      });
  }

  render() {
    const {programArr, loaded} = this.state;
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" md="2">
            <Input type="select" name="programTypeFilter" id="serviceArea" onChange={this.handleChange} >
              <option value="">Type</option>
              {this.state.programTypeOptions}
            </Input>
          </Col>
          <Col xs="12" md="2">
            <Input type="select" name="orgTypeFilter" id="serviceArea" onChange={this.handleChange} >
              <option value="">Program Provider</option>
              {this.state.orgOptionItems}
            </Input>
          </Col>
          <Col xs="12" md="2">
            <Input type="select" name="sportTypeFilter" id="serviceArea" onChange={this.handleChange} >
              <option value="">Sport</option>
              {this.state.sportsTypeOptions}
            </Input>
          </Col>
          <Col xs="12" md="2">
            <button className="btn btn-secondary" type="button" onClick={this.handleFilter}>Search</button>
          </Col>
          <Col xs="12" md="4">
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" onChange={this.handleChange} onKeyDown={this.handleKeyPress} placeholder="Search for..." aria-label="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
              </span>
            </div>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md="10"/>
          <Col xs="12" md="2" align="right">
            <Link to={ADD_PROGRAMS} > <Button color="primary">Add Program</Button></Link>
          </Col>
        </Row>
        {/* <div className="row">
    <div className="col-lg-6">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..." />
          <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">Go!</button>
          </span>
          </div>
      </div>

      <div className="col-lg-6">
            <Link to={'/programs/add' } > <Button color="primary">Add Program</Button></Link>
      </div>

    </div> */}
        <br/>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"/> Program List
          </CardHeader>
          <CardBody>
            {(programArr.length === 0 && loaded === true) ?
              <Alert color="warning">
                    No data found
              </Alert> :
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Program Type</th>
                    <th>Program Provider</th>
                    <th>Sport</th>
                    <th>Status</th>
                    <th>Institutions</th>
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

export default Program;

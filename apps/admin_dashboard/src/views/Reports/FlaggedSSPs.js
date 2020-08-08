import React, {Component} from 'react';
import {Row, Col, Card, CardBody, Alert, Table, Input, CardHeader, UncontrolledTooltip} from 'reactstrap';
import config from '../../config';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader';
import {ToastContainer, toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {FLAGGED_SSP, APP_USER_PROFILE} from '../../constants/pathConstants';
import moment from 'moment';
import p from '../../locale/enUs.json';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class FlaggedSSPs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: getAuthHeader(),
      loaded: false,
      defaultPage: config.DEFAULT_PAGE,
      pageCount: config.DEFAULT_PAGE_COUNT,
      itemsPerPage: config.ITEMS_PER_PAGE,
      flaggedRecords: [],
      reasons: [],
      reasonOptions: [],
      filterId: '',
      searchText: ''
    };
    this.getFailedReports = this.getFailedReports.bind(this);
    this.getFilterReasons = this.getFilterReasons.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateReasonOptions = this.generateReasonOptions.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentWillMount() {
    this.getFailedReports(this.state.defaultPage);
    this.getFilterReasons();
  }
  handleChange(event) {
    const {value, name} = event.target;
    this.setState({
      [name]: value
    });
  }
  handlePageClick(event) {
    const page = event.selected + 1;
    this.getFailedReports(page);
  }
  handleFilter() {
    this.getFailedReports(this.state.defaultPage);
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.getFailedReports(this.state.defaultPage);
    }
  }
  getFilterReasons() {
    const self = this;
    axios.get(config.FILTER_REASONS, {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({reasons: response.data.payload}, () => {
            self.generateReasonOptions();
          });
        } else {
          self.setState({reasons: []});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({reasons: []});
        }
      });
  }
  generateReasonOptions() {
    const reasonOptions = this.state.reasons.map((reason, key) => {
      return <option key={key++} value={reason.id}>{reason.name}</option>;
    });
    this.setState({reasonOptions});
  }
  getFailedReports(pageNum) {
    const self = this;
    const {itemsPerPage, searchText, filterId} = this.state;
    self.setState({loaded: false});
    pageNum = pageNum ? pageNum : this.state.defaultPage;
    axios.get(config.FLAGGED_SSPS, {
      params: {
        page: pageNum,
        limit: itemsPerPage,
        searchText: searchText ? searchText.trim() : null,
        filterId: filterId ? filterId : null
      },
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({flaggedRecords: response.data.payload.ssps,
            totalRecords: response.data.payload.total,
            pageCount: Math.ceil(response.data.payload.total / itemsPerPage),
            loaded: true});
        } else {
          self.setState({flaggedRecords: [], loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({flaggedRecords: [], loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      });
  }
  render() {
    const {loaded, flaggedRecords, reasonOptions} = this.state;
    const records = flaggedRecords && flaggedRecords.map((record, key) => {
      return (
      /* eslint complexity: 0  */
        <tr key={key++}>
          <td>{moment(record.flaggedDate).format(p.Reports.flaggedSSPs.dateFormat)}</td>
          <td id={'email' + record.userId}>
            <Link to={APP_USER_PROFILE.replace(':id', record.userId).replace(':profileId', record.profileId)}>{record.username}</Link>
            <UncontrolledTooltip target={'email' + record.userId}>View Profile</UncontrolledTooltip>
          </td>
          <td id={'name' + record.userId}><Link to={APP_USER_PROFILE.replace(':id', record.userId).replace(':profileId', record.profileId)}>{record.name}</Link>
            <UncontrolledTooltip target={'name' + record.userId}>View Profile</UncontrolledTooltip>
          </td>
          <td>{record.sspType}</td>
          <td>
            {record.reasons.map((reason, key) => {
              return <li key={key++}> {reason.name}</li>;
            })}

          </td>
          <td><Link to={FLAGGED_SSP.replace(':id', record.profileId)}>{p.Reports.flaggedSSPs.actionLabel}</Link></td>
        </tr>);
    });
    return (
      <div className="animated fadeIn">
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        <Row>
          <Col lg="3">
            <Input type="select" name="filterId" onChange={this.handleChange} >
              <option value="">{p.Reports.flaggedSSPs.filterTitle}</option>
              {reasonOptions}
            </Input>
          </Col>
          <Col lg="1">
            <button className="btn btn-primary" type="button" onClick={this.handleFilter}>{p.Reports.flaggedSSPs.filter}</button>
          </Col>
          <Col lg="4"/>
          <Col lg="4" align="right">
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" onChange={this.handleChange} onKeyDown={this.handleKeyPress} placeholder="Search for..." aria-label="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.handleFilter}>{p.Reports.flaggedSSPs.searchGo}</button>
              </span>
            </div>
          </Col>

        </Row>
        <br/>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"/> {p.Reports.flaggedSSPs.title}
          </CardHeader>
          <CardBody>
            {(flaggedRecords && flaggedRecords.length === 0 && loaded === true) ?
              <Alert color="warning">
                {p.Reports.flaggedSSPs.notFound}
              </Alert> :
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>{p.Reports.flaggedSSPs.flaggedDate}</th>
                    <th>{p.Reports.flaggedSSPs.username}</th>
                    <th>{p.Reports.flaggedSSPs.name}</th>
                    <th>{p.Reports.flaggedSSPs.sspType}</th>
                    <th>{p.Reports.flaggedSSPs.reasons}</th>
                    <th>{p.Reports.flaggedSSPs.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {records}
                </tbody>
              </Table>}
            <br/>
            <Row>
              <Col>
                {this.state.flaggedRecords.length > 0 ?
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={this.state.limit}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  /> : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Loader loaded={this.state.loaded} className="spinner"/>
      </div>
    );
  }
}

export default FlaggedSSPs;

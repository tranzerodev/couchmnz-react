import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardBody, Alert, Table, Button, UncontrolledTooltip} from 'reactstrap';
import config from '../../config';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader';
import {ToastContainer, toast} from 'react-toastify';
import p from '../../locale/enUs.json';
import moment from 'moment';
import changeCase from 'change-case';
import {APP_USER_PROFILE} from '../../constants/pathConstants';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class FailedAuditReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: getAuthHeader(),
      loaded: false,
      failedRecords: [],
      totalRecords: 0,
      profileIds: [],
      listingId: '',
      isValid: true,
      defaultPage: config.DEFAULT_PAGE,
      pageCount: config.DEFAULT_PAGE_COUNT,
      limit: config.ITEMS_PER_PAGE,
      currentPage: config.DEFAULT_PAGE,
      data: null,
      downloadUrl: null,
      reportGeneratedOn: null,
      searchText: ''
    };
    this.getFailedReports = this.getFailedReports.bind(this);
    this.handleGenerateReport = this.handleGenerateReport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRegenerateReport = this.handleRegenerateReport.bind(this)
  }
  componentWillMount() {
    this.getFailedReports(this.state.defaultPage);
  }
  removeMessage() {
    const self = this;
    this.timerVar = setTimeout(() => {
      self.setState({isValid: true});
    }, 3000);
  }
  handlePageClick(event) {
    const page = event.selected + 1;
    this.setState({currentPage: page, loaded: false, profileIds: []});
    this.getFailedReports(page);
  }
  handleSearchTextChange(e) {
    e.preventDefault();
    this.setState({searchText: e.target.value});
  }
  handleSearch() {
    this.getFailedReports(this.state.defaultPage);
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
  handleChange(e) {
    const {value, checked} = e.target;
    const {profileIds} = this.state;
    if (checked) {
      if (!profileIds.includes(value)) {
        profileIds.push(e.target.value);
      }
    } else if (profileIds.includes(value)) {
      profileIds.splice(profileIds.indexOf(value), 1);
    }
    this.setState({profileIds});
  }
  handleRegenerateReport() {
    const self = this;
      axios.post(config.REGENERATE_FAILED_AUDIT, {}, {headers: this.state.header})
        .then(response => {
          if (response.data && response.data.responseCode === 0) {
            this.getFailedReports(this.state.defaultPage)
          } else {
            self.setState({failedRecords: [], profileIds: [], loaded: true});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        })
        .catch(error => {
          console.error('Error---', error);
          if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
            logout();
          } else {
            self.setState({failedRecords: [], profileIds: [], loaded: true});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        });    
  }
  handleGenerateReport() {
    if (this.state.profileIds.length === 0) {
      this.setState({isValid: false});
      this.removeMessage();
    } else {
      this.setState({loaded: false});
      const {currentPage, limit, profileIds} = this.state;
      const self = this;
      const payload = {
        page: currentPage ? currentPage : this.state.defaultPage,
        limit,
        profileIds
      };
      axios.post(config.FAILED_AUDIT, payload, {headers: this.state.header})
        .then(response => {
          if (response.data.payload && response.data.responseCode === 0) {
            self.setState({failedRecords: []});
            self.setState({failedRecords: response.data.payload.reports,
              totalRecords: response.data.payload.total,
              pageCount: Math.ceil(response.data.payload.total / this.state.limit),
              loaded: true,
              downloadUrl: response.data.payload.downloadUrl,
              reportGeneratedOn: response.data.payload.reportGeneratedOn,
              profileIds: []});
            /* Self.setState({pageCount: response.data.payload.last_page});
            self.setState({limit: response.data.payload.per_page});
            self.setState({itemStart: response.data.payload.from}); */
            toast.dismiss();
            toast.info(p.Reports.failedReports.successMsg);
          } else {
            self.setState({failedRecords: [], profileIds: [], loaded: true});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        })
        .catch(error => {
          console.error('Error---', error);
          if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
            logout();
          } else {
            self.setState({failedRecords: [], profileIds: [], loaded: true});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        });
    }
  }
  getFailedReports(pageNum) {
    const self = this;
    const {limit, searchText} = this.state;
    self.setState({loaded: false});
    pageNum = pageNum ? pageNum : this.state.defaultPage;
    axios.get(config.FAILED_AUDIT + '?limit=100&page=' + pageNum + '&limit=' + limit + (searchText ? '&searchText=' + searchText.trim() : ''), {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({failedRecords: response.data.payload.reports,
            totalRecords: response.data.payload.total,
            pageCount: Math.ceil(response.data.payload.total / self.state.limit),
            downloadUrl: response.data.payload.downloadUrl,
            reportGeneratedOn: response.data.payload.reportGeneratedOn,
            loaded: true});
          /* Self.setState({pageCount: response.data.payload.last_page});
          self.setState({limit: response.data.payload.per_page});
          self.setState({itemStart: response.data.payload.from}); */
        } else {
          self.setState({failedRecords: [], loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({failedRecords: [], loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      });
  }
  render() {
    const {loaded, failedRecords, reportGeneratedOn} = this.state;
    const records = failedRecords.map(record => {
      console.log('record', record)
      return (
      /* eslint complexity: 0  */
        <tr key={record.listingId}>
          <td><input type="checkbox" id={record.profileId} name={record.profileId} onChange={this.handleChange} value={record.profileId}/></td>
          <td id={'email' + record.listingId}>{changeCase.upperCase(record.sspType) === changeCase.upperCase(config.ISP) && record.userId ? <Link to={APP_USER_PROFILE.replace(':id', record.userId).replace(':profileId', record.profileId)}>{record.email}</Link> : record.email}
            <UncontrolledTooltip target={'email' + record.listingId}>  View Profile             </UncontrolledTooltip>
          </td>
          <td id={'name' + record.listingId}>{changeCase.upperCase(record.sspType) === changeCase.upperCase(config.ISP)  && record.userId ? <Link to={APP_USER_PROFILE.replace(':id', record.userId).replace(':profileId', record.profileId)}>{record.name}</Link> : record.name}
            <UncontrolledTooltip target={'name' + record.listingId}>  View Profile             </UncontrolledTooltip>
          </td>
          <td>{record && record.sspType ? record.sspType : '-'}</td>
          {/* <td>{record.profileId}</td> */}
          <td>{record && record.phoneNumber ? record.phoneNumber : '-'}</td>
          <td>{record && record.listingId ? record.listingId : '-'}</td>
          <td>{record && record.sportName ? record.sportName : '-'}</td>
          <td>{record && record.isActive ? record.isActive === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.trainingPreferences && record.trainingPreferences.trainingLocationCityLocalRegion ? record.trainingPreferences.trainingLocationCityLocalRegion === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.trainingPreferences && record.trainingPreferences.ages ? record.trainingPreferences.ages === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.trainingPreferences && record.trainingPreferences.skillLevels ? record.trainingPreferences.skillLevels === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.trainingPreferences && record.trainingPreferences.gender ? record.trainingPreferences.gender === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.trainingPreferences && record.trainingPreferences.subSSPTypes ? record.trainingPreferences.subSSPTypes === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>

          <td style={{textAlign: 'left'}}>
            { record && record.prices && record.prices.map((price, key) => (
              <span key={key++}> {price.name} :  {price.is_selected === 'NA' ? 'NA' : price.is_selected === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> } &nbsp;</span>
            ))}
          </td>
          <td>{record && record.trainingLocation ? record.trainingLocation === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.trainingLocationCityMapped ? record.trainingLocationCityMapped === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>

          <td>{record && record.sessionDetails ? record.sessionDetails === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.coachingExperience ? record.coachingExperience === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.playingExperience ? record.playingExperience === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>

          <td>{record && record.listingDetail && record.listingDetail.heading ? record.listingDetail.heading === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.listingDetail && record.listingDetail.description ? record.listingDetail.description === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.listingDetail && record.listingDetail.bio ? record.listingDetail.bio === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>

          <td>{record && record.actionPhoto ? record.actionPhoto === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.profilePhoto ? record.profilePhoto === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.bookingPreferences ? record.bookingPreferences === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>

          {/* <td>{record.businessDetails.name === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/>}</td>
          <td>{record.businessDetails.landlineNumber === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/>}</td> */}
          <td>{record && record.businessDetails && record.businessDetails.email ? record.businessDetails.email === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.businessDetails && record.businessDetails.street ? record.businessDetails.street === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.businessDetails && record.businessDetails.city ? record.businessDetails.city === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.businessDetails && record.businessDetails.cityMapped ? record.businessDetails.cityMapped === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.businessDetails && record.businessDetails.state ? record.businessDetails.state === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.businessDetails && record.businessDetails.country ? record.businessDetails.country === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.businessDetails && record.businessDetails.zipCode ? record.businessDetails.zipCode === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>

          <td>{record && record.personalDetails && record.personalDetails.name ? record.personalDetails.name === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.email ? record.personalDetails.email === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.gender ? record.personalDetails.gender === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.nickName ? record.personalDetails.nickName === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.street ? record.personalDetails.street === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.city ? record.personalDetails.city === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.cityMapped ? record.personalDetails.cityMapped === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.state ? record.personalDetails.state === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.country ? record.personalDetails.country === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.zipCode ? record.personalDetails.zipCode === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.timezone ? record.personalDetails.timezone === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.personalDetails && record.personalDetails.mobile ? record.personalDetails.mobile === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.payoutOption ? record.payoutOption === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
          <td>{record && record.schedulerSettings ? record.schedulerSettings === 'Y' ? <i className="fa fa-check fa-green"/> : <i className="fa fa-close fa-red"/> : '-'}</td>
        </tr>);
    });
    return (
      <div className="animated fadeIn">
        <Loader loaded={this.state.loaded} className="spinner"/>
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        {/* eslint react/forbid-component-props: 0 */}
        <div className="row">
          <div className="col-lg-4">
            <div className="input-group">
              <Button color="primary" onClick={this.handleRegenerateReport}>{p.Reports.failedReports.regenerateReport}</Button>
              {failedRecords.length > 0 ? <Button color="primary" onClick={this.handleGenerateReport}>{p.Reports.failedReports.regenerateReports}</Button> : null}
            </div>
          </div>
          <div className="col-lg-8" align="right">
            <Row>
              <div className="col-md-9" align="right">
                <label>{reportGeneratedOn ? p.Reports.failedReports.reportGeneratedOn + ' ' + moment(reportGeneratedOn).format(p.Reports.failedReports.dateFormat) + ' - ' : null} {this.state.totalRecords}  {p.Reports.failedReports.records} </label>
              </div>
              <div className="col-md-3">
                {(this.state.downloadUrl !== null || this.state.downloadUrl !== '' || this.state.downloadUrl !== undefined) ? <a href={this.state.downloadUrl}><i className="fa fa-file-excel-o"/> {p.Reports.failedReports.exportDetailedCSV}</a> : null}
              </div>
            </Row>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-8">
            {this.state.isValid === false ? <Alert color="danger">{p.Reports.failedReports.chooseRecord}</Alert> : null}
          </div>
          <div className="col-lg-4" align="right">
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" placeholder={p.Reports.failedReports.searchPlaceholder} aria-label={p.Reports.failedReports.searchPlaceholder} onKeyDown={this.handleKeyPress} onChange={this.handleSearchTextChange}/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
              </span>
            </div>
          </div>

        </div>
        <br/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="12">
            <Card>
              {/*  <CardHeader>
                <i className="fa fa-align-justify"/>Users
              </CardHeader> */}

              {failedRecords.length === 0 && loaded === true ?
                <CardBody>
                  <Alert color="warning">
                    {p.Reports.failedReports.notFound}
                  </Alert>
                </CardBody> :
                failedRecords.length > 0 ?
                  <CardBody>
                    <div className="failed-report">
                      <Table responsive bordered className="drag">
                        <thead>
                          <tr key="heading1">
                            <th rowSpan="2">{p.Reports.failedReports.serial}</th>
                            <th rowSpan="3">Email</th>
                            <th rowSpan="4">Name</th>
                            <th rowSpan="4">Type</th>
                            <th rowSpan="4">{p.Reports.failedReports.sspType}</th>
                            {/* <th rowSpan="4">{p.Reports.failedReports.profileId}</th> */}
                            <th rowSpan="4">{p.Reports.failedReports.PhoneNumber}</th>
                            <th rowSpan="4">{p.Reports.failedReports.listingId}</th>
                            <th rowSpan="4">{p.Reports.failedReports.sportName}</th>
                            <th rowSpan="4">{p.Reports.failedReports.isActive}</th>
                            <th colSpan="4">{p.Reports.failedReports.trainingPreferences.title}</th>
                            <th rowSpan="4">{p.Reports.failedReports.pricing}</th>
                            <th rowSpan="2">{p.Reports.failedReports.trainingLocation}</th>
                            <th rowSpan="2">{p.Reports.failedReports.trainingLocationCityMapped}</th>
                            <th rowSpan="4">{p.Reports.failedReports.session}</th>
                            <th rowSpan="4">{p.Reports.failedReports.coachingExp}</th>
                            <th rowSpan="4">{p.Reports.failedReports.playingExp}</th>
                            <th colSpan="3">{p.Reports.failedReports.listingDetails.title}</th>
                            <th rowSpan="4">{p.Reports.failedReports.actionPhoto}</th>
                            <th rowSpan="4">{p.Reports.failedReports.profilePhoto}</th>
                            <th rowSpan="4">{p.Reports.failedReports.bookingPreferences} </th>
                            <th colSpan="7">{p.Reports.failedReports.businessDetails.title}</th>
                            <th colSpan="12">{p.Reports.failedReports.personalDetails.title}</th>
                            <th rowSpan="4">{p.Reports.failedReports.payout}</th>
                            <th rowSpan="4">{p.Reports.failedReports.scheduler}</th>
                          </tr>
                          <tr key="heading2" style={{border: '0px solid'}}>
                            <th>Local Region</th>
                            <th>{p.Reports.failedReports.trainingPreferences.ages}</th>
                            <th>{p.Reports.failedReports.trainingPreferences.skillLevels}</th>
                            <th>{p.Reports.failedReports.trainingPreferences.gender}</th>
                            <th>{p.Reports.failedReports.trainingPreferences.serviceOffered}</th>

                            <th>{p.Reports.failedReports.listingDetails.heading}</th>
                            <th>{p.Reports.failedReports.listingDetails.description}</th>
                            <th>{p.Reports.failedReports.listingDetails.bio}</th>

                            <th>{p.Reports.failedReports.businessDetails.email}</th>
                            <th>{p.Reports.failedReports.businessDetails.street}</th>
                            <th>{p.Reports.failedReports.businessDetails.city}</th>
                            <th>{p.Reports.failedReports.businessDetails.cityMapped}</th>
                            <th>{p.Reports.failedReports.businessDetails.state}</th>
                            <th>{p.Reports.failedReports.businessDetails.country}</th>
                            <th>{p.Reports.failedReports.businessDetails.zip}</th>

                            <th>{p.Reports.failedReports.personalDetails.name}</th>
                            <th>{p.Reports.failedReports.personalDetails.email}</th>
                            <th>{p.Reports.failedReports.personalDetails.gender}</th>
                            <th>{p.Reports.failedReports.personalDetails.nickName}</th>
                            <th>{p.Reports.failedReports.personalDetails.street}</th>
                            <th>{p.Reports.failedReports.personalDetails.city}</th>
                            <th>{p.Reports.failedReports.personalDetails.cityMapped}</th>
                            <th>{p.Reports.failedReports.personalDetails.state}</th>
                            <th>{p.Reports.failedReports.personalDetails.country}</th>
                            <th>{p.Reports.failedReports.personalDetails.zip}</th>
                            <th>{p.Reports.failedReports.personalDetails.timezone}</th>
                            <th>{p.Reports.failedReports.personalDetails.mobile}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {records}
                        </tbody>
                      </Table>
                    </div>

                    <br/>
                    <Row>
                      <Col>
                        {failedRecords.length > 0 ?
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
                          /> :
                          null}
                      </Col>
                    </Row>
                  </CardBody> : null}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FailedAuditReport;

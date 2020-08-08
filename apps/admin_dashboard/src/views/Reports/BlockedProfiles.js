import React, {Component} from 'react';
import {Table, Row, Col, Card, CardHeader, CardBody, Alert} from 'reactstrap';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader, logout} from '../../auth';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom';
import Loader from 'react-loader';
import p from '../../locale/enUs.json';
import moment from 'moment';
import {APP_USER} from '../../constants/pathConstants';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class BlockedProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: getAuthHeader(),
      loaded: false,
      profiles: [],
      defaultPage: config.DEFAULT_PAGE,
      pageCount: config.DEFAULT_PAGE_COUNT,
      itemsPerPage: config.ITEMS_PER_PAGE,
      currentPage: config.DEFAULT_PAGE,
      searchText: ''
    };
    this.getBlockedProfileDetails = this.getBlockedProfileDetails.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    this.getBlockedProfileDetails();
  }
  handlePageClick(event) {
    const page = event.selected + 1;
    this.setState({currentPage: page, loaded: false});
    this.getBlockedProfileDetails(page);
  }

  handleSearch() {
    this.getBlockedProfileDetails(this.state.defaultPage);
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.getBlockedProfileDetails(this.state.defaultPage);
    }
  }
  handleChange(e) {
    this.setState({searchText: e.target.value});
  }
  getBlockedProfileDetails(pageNum) {
    this.setState({loaded: false});
    const self = this;
    const {itemsPerPage, searchText} = this.state;
    pageNum = pageNum ? pageNum : this.state.defaultPage;
    axios.get(config.BLOCKED_PROFILES,
      {
        params: {
          page: pageNum,
          limit: itemsPerPage,
          searchText: searchText ? searchText.trim() : null
        },
        headers: this.state.header
      })
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          self.setState({profiles: response.data.payload.records,
            pageCount: Math.ceil(response.data.payload.total / itemsPerPage),
            loaded: true});
        } else {
          self.setState({isError: true, loaded: true});
        }
      })
      .catch(error => {
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({isError: true, loaded: true});
        }
      });
  }

  render() {
    const profiles = this.state.profiles.map((profile, key) => {
      return (
        <tr key={key++}>
          <td>{moment(profile.actionDate).format(p.Reports.disabledProfiles.dateFormat)}</td>
          <td>{profile.username}</td>
          <td>{profile.name}</td>
          <td>{profile.profileType}</td>
          <td>{profile.status}</td>
          <td><Link to={APP_USER.replace(':id', profile.userId)} id={profile.id}> {p.Reports.disabledProfiles.goToManageProfile}</Link> </td>
        </tr>);
    });
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        <Row>
          <Col lg={{size: 4, offset: 8}} align="right">
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" onChange={this.handleChange} onKeyDown={this.handleKeyPress} placeholder="Search for..." aria-label="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>GO!</button>
              </span>
            </div>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/> {p.Reports.disabledProfiles.title}
              </CardHeader>
              <CardBody>
                {this.state.profiles && this.state.profiles.length === 0 && this.state.loaded === true ?
                  <Alert color="warning">
                    {p.Reports.disabledProfiles.notFound}
                  </Alert> :
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>{p.Reports.disabledProfiles.actionDate}</th>
                        <th>{p.Reports.disabledProfiles.username}</th>
                        <th>{p.Reports.disabledProfiles.name}</th>
                        <th>{p.Reports.disabledProfiles.profileType}</th>
                        <th>{p.Reports.disabledProfiles.status}</th>
                        <th>{p.Reports.disabledProfiles.action}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profiles}
                    </tbody>
                  </Table> }
                <br/>
                <Row>
                  <Col>
                    {this.state.profiles.length > 0 ?
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlockedProfiles;


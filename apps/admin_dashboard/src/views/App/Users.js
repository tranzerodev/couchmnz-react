import React, {Component} from 'react';
import {Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import config from '../../config';
import axios from 'axios';
import UserTable from './User';
import queryString from 'query-string';
import {getAuthHeader, logout} from '../../auth';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class AppUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      userArr: [],
      filter: 'all',
      filterString: '',
      header: getAuthHeader(),
      searchText: '',
      defaultPage: config.DEFAULT_PAGE,
      pageCount: config.DEFAULT_PAGE_COUNT,
      itemsPerPage: config.ITEMS_PER_PAGE,
      currentPage: 1,
      dataError: false,
      orderBy: 'desc',
      sortBy: 'regDate',
      loaded: false
    };
    this.getUserList = this.getUserList.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.filter = this.filter.bind(this);
  }
  componentWillMount() {
    const filter = location.hash.split('=')[1];
    if (filter) {
      this.filter(filter);
    } else {
      this.getUserList(this.state.defaultPage);
    }
  }
  handleToggle(e) {
    const {id, name} = e.target;
    if (this.state.activeTab !== id) {
      this.setState({
        activeTab: id,
        filter: name
      });
      this.props.history.push({
        pathname: '/users',
        search: '?filter=' + name
      });
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({searchText: e.target.value});
  }
  handleSearch() {
    /*  E.preventDefault();
    const filterString = '&searchText=' + this.state.searchText;
    this.setState({
      filterString,
      activeTab: 1
    }, () => {
      this.getUserList(this.state.defaultPage);
    }); */
    this.setState({currentPage: 1, loaded: false}, () =>
      this.getUserList(this.state.defaultPage));
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps);
    if (nextProps.location) {
      this.setFilter(nextProps.location);
    }
  }
  setFilter(location) {
    const parsed = queryString.parse(location.search);
    this.filter(parsed.filter);
  }
  filter(filter) {
    let tab;
    let filterString = '';
    switch (filter) {
      case config.ALL : tab = '1';
        filterString = '';
        break;
      case config.ATHLETE : tab = '2';
        filterString = '&profileType=' + config.ATHLETE + 'and' + config.PARENT;
        break;
      case config.ISP : tab = '3';
        filterString = '&sspType=' + config.ISP;
        break;
      case config.CAMPS : tab = '4';
        filterString = '&sspType=' + config.CAMPS;
        break;
      case config.BUSINESS : tab = '5';
        filterString = '&sspType=' + config.BUSINESS;
        break;
      case config.SPORTS : tab = '6';
        filterString = '&sspType=' + config.SPORTS;
        break;
      default : tab = '1';
        filterString = '';
        break;
    }
    /*  If (this.state.activeTab !== tab) { */
    this.setState({
      activeTab: tab,
      filter,
      filterString
    }, () => {
      this.getUserList(this.state.defaultPage);
    });
    /* } */
  }
  handlePageClick(event) {
    const page = event.selected + 1;
    this.setState({currentPage: page, loaded: false});
    this.getUserList(page);
  }
  handleSort(sortBy, orderBy) {
    this.setState({sortBy, orderBy, loaded: false}, () => {
      this.getUserList(this.state.defaultPage);
    });
  }
  getUserList(pageNum) {
    const self = this;
    self.setState({loaded: false});
    const {sortBy, orderBy} = this.state;
    pageNum = pageNum ? pageNum : this.state.defaultPage;
    axios.get(config.APP_USERS + '?limit=50&page=' + pageNum + this.state.filterString + (this.state.searchText ? '&searchText=' + this.state.searchText.trim() : '') + (sortBy ? '&sortBy=' + sortBy : '') + (orderBy ? '&orderBy=' + orderBy : ''), {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({userArr: response.data.payload.users,
            dataError: false,
            pageCount: Math.ceil(response.data.payload.total / this.state.itemsPerPage),
            loaded: true});
          /* Self.setState({pageCount: response.data.payload.last_page});
          self.setState({itemsPerPage: response.data.payload.per_page});
          self.setState({itemStart: response.data.payload.from}); */
        } else {
          self.setState({dataError: true, userArr: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({dataError: true, userArr: []});
        }
      });
  }
  render() {
    const {loaded} = this.state;
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        <div className="row">
          <Col xs="12" md="4"/>
          <div className="col-lg-4"/>
          <div className="col-lg-4" align="right">
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" placeholder="Search for..." aria-label="Search for..." onKeyDown={this.handleKeyPress} onChange={this.handleChange}/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
              </span>
            </div>
          </div>

        </div>
        {/*  <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8" align="right">
            <Link to={'/users/add'} > <Button color="primary">Add AppUsers</Button></Link>
          </Col>
        </Row> */}
        <br/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="12">
            <Card>
              {/*  <CardHeader>
                <i className="fa fa-align-justify"/>Users
              </CardHeader> */}
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '1'})}
                      id="1"
                      name={config.ALL}
                      onClick={this.handleToggle}
                    >
                    All
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '2'})}
                      id="2"
                      name={config.ATHLETE}
                      onClick={this.handleToggle}
                    >
                    Athletes/Parents
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '3'})}
                      id="3"
                      name={config.ISP}
                      onClick={this.handleToggle}
                    >
                    ISPs
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '4'})}
                      id="4"
                      name={config.CAMPS}
                      onClick={this.handleToggle}
                    >
                    Camps
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '5'})}
                      id="5"
                      name={config.BUSINESS}
                      onClick={this.handleToggle}
                    >
                    Business facilities
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '6'})}
                      id="6"
                      name={config.SPORTS}
                      onClick={this.handleToggle}
                    >
                    Athlete Sport Services
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <UserTable filter={config.ALL} users={this.state.userArr} currentPage={this.state.currentPage} dataError={this.state.dataError} onSort={this.handleSort} loaded={loaded}/>
                  </TabPane>
                  <TabPane tabId="2">
                    <UserTable filter={config.ATHLETE} users={this.state.userArr} currentPage={this.state.currentPage} dataError={this.state.dataError} onSort={this.handleSort} loaded={loaded}/>
                  </TabPane>
                  <TabPane tabId="3">
                    <UserTable filter={config.ISP} users={this.state.userArr} currentPage={this.state.currentPage} dataError={this.state.dataError} onSort={this.handleSort} loaded={loaded}/>
                  </TabPane>
                  <TabPane tabId="4">
                    <UserTable filter={config.CAMPS} users={this.state.userArr} currentPage={this.state.currentPage} dataError={this.state.dataError} onSort={this.handleSort} loaded={loaded}/>
                  </TabPane>
                  <TabPane tabId="5">
                    <UserTable filter={config.BUSINESS} users={this.state.userArr} currentPage={this.state.currentPage} dataError={this.state.dataError} onSort={this.handleSort} loaded={loaded}/>
                  </TabPane>
                  <TabPane tabId="6">
                    <UserTable filter={config.SPORTS} users={this.state.userArr} currentPage={this.state.currentPage} dataError={this.state.dataError} onSort={this.handleSort} loaded={loaded}/>
                  </TabPane>
                  <Loader loaded={this.state.loaded} className="spinner"/>
                </TabContent>
                <Row>
                  <Col>
                    {this.state.userArr.length > 0 ?
                      <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={this.state.itemsPerPage}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      /> : null}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AppUsers;

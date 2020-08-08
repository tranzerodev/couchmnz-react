import React, {Component} from 'react';
import {Table, Row, Col, Card, CardHeader, CardBody, Button} from 'reactstrap';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader, logout} from '../../auth';
import {ToastContainer, toast} from 'react-toastify';
import Modal from '../../components/Modal';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {ADD_SPORTS, EDIT_SPORTS} from '../../constants/pathConstants';
import Loader from 'react-loader';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class Sport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sports: [],
      header: getAuthHeader(),
      sportSearch: '',
      sportId: '',
      disabled: '',
      sportStatus: '',
      toggleStatusModal: false,
      defaultPage: config.DEFAULT_PAGE,
      pageCount: config.DEFAULT_PAGE_COUNT,
      itemsPerPage: config.ITEMS_PER_PAGE,
      itemStart: 0,
      currentPage: 1,
      loaded: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.getSports = this.getSports.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleStatusModal = this.handleToggleStatusModal.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentWillMount() {
    this.getSports(this.state.defaultPage);
  }
  handlePageClick(event) {
    const page = event.selected + 1;
    this.setState({currentPage: page});
    this.getSports(page);
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
  handleSearch() {
    /*  Const self = this;
    axios.get(config.GET_SPORTS + '?searchText=' + (this.state.sportSearch ? this.state.sportSearch.trim() : this.state.sportSearch) + '&page=' + this.state.defaultPage, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload && response.data.payload.sports) {
          self.setState({sports: response.data.payload.sports,
            pageCount: Math.ceil(response.data.payload.total / response.data.payload.sports.length)});
        }
      })
      .catch(error => {
        console.error('Error---', error);
      }); */
    this.setState({currentPage: 1}, () =>
      this.getSports(this.state.defaultPage));
  }
  handleUpdateStatus() {
    const self = this;
    axios.post(config.UPDATE_SPORT.replace('{sportId}', this.state.sportId),
      {isActive: this.state.sportStatus},
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          toast.dismiss();
          if (self.state.sportStatus === 'N') {
            toast.info(config.SUCCESS_SPORT_DISABLED);
          } else {
            toast.info(config.SUCCESS_SPORT_ENABLED);
          }
          self.setState({disabled: ''});
          self.getSports();
        } else {
          self.setState({disabled: ''});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        self.setState({disabled: ''});
        toast.dismiss();
        toast.warn(config.ERROR_MSG);
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
    this.setState({toggleStatusModal: !this.state.toggleStatusModal});
  }
  handleChange(e) {
    this.setState({sportSearch: e.target.value});
  }

  getSports(pageNum) {
    const self = this;
    self.setState({loaded: false});
    pageNum = pageNum ? pageNum : this.state.defaultPage;
    axios.get(config.GET_SPORTS + '?limit=50&page=' + pageNum + (this.state.sportSearch ? '&searchText=' + this.state.sportSearch.trim() : ''), {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload && response.data.payload.sports) {
          self.setState({
            sports: response.data.payload.sports,
            pageCount: Math.ceil(response.data.payload.total / this.state.itemsPerPage),
            loaded: true
            /* PageCount: response.data.payload.last_page,
            itemsPerPage: response.data.payload.per_page,
            itemStart: response.data.payload.from */
          });
        } else {
          toast.dismiss();
          toast.warn('ERROR!!!Something went wrong');
          self.setState({loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          toast.dismiss();
          toast.warn('ERROR!!!Something went wrong');
          self.setState({loaded: true});
        }
      });
  }
  handleEdit(e) {
    this.props.history.push(EDIT_SPORTS.replace(':sportId', e.target.id));
  }
  handleToggleStatusModal(e) {
    const {id} = e.target;
    const name = e.target.name === 'Y' ? 'N' : 'Y';
    this.setState({sportId: id, sportStatus: name, toggleStatusModal: !this.state.toggleStatusModal});
  }
  render() {
    const self = this;
    const {currentPage} = this.state;
    const sports = this.state.sports.map((sport, key) => {
      return (
        <tr key={sport.id}>
          <td>{((currentPage - 1) * 10) + (key + 1)}</td>
          <td>{sport.name}</td>
          <td>{sport.isActive === 'Y' ? 'Active' : 'Inactive'}</td>
          <td><Link to="#" id={sport.id} onClick={self.handleEdit}> Edit </Link> {' '} <Link to="#" id={sport.id} name={sport.isActive} onClick={self.handleToggleStatusModal}>{sport.isActive === 'Y' ? 'Disable' : 'Enable'} </Link></td>
        </tr>);
    });
    return (
      <div className="animated fadeIn">
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        {/* eslint react/forbid-component-props: 0 */}
        <div>
          <div className="row">
            <Col xs="12" md="2"/>
            <div className="col-lg-4">
              <div className="input-group">
                <input type="text" className="form-control" value={this.state.sportSearch} name="searchText" placeholder="Search for..." aria-label="Search for..." onKeyDown={this.handleKeyPress} onChange={this.handleChange}/>
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
                </span>
              </div>
            </div>

            <div className="col-lg-4" align="right">
              <Link to={ADD_SPORTS} > <Button color="primary">Add Sport / Fitness Category</Button></Link>
            </div>

          </div>
          <br/>
          <Row>
            <Col xs="12" md="2"/>
            <Col xs="12" md="8">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"/> Sport / Fitness Type
                </CardHeader>
                <CardBody>
                  <Table responsive striped className="drag">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Sports / Fitness Types</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sports}
                    </tbody>
                  </Table>
                  <Row>
                    <Col>
                      {this.state.sports.length > 0 ?
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
              <Loader loaded={this.state.loaded} className="spinner"/>
            </Col>
          </Row>
          <ToastContainer autoClose={config.TOASTTIMEOUT}/>
          <Modal
            isOpen={this.state.toggleStatusModal}
            className="modal-danger"
            onToggle={this.handleToggleStatusModal}
            onConfirm={this.handleUpdateStatus}
            onCancel={this.handleToggleStatusModal}
            content="Are you sure?"
            header="Enable/Disable Sport"
            cancelText="No"
            confirmText="Yes"
          />
        </div>
      </div>
    );
  }
}

export default Sport;

// Module.exports = DragDropContext(HTML5Backend)(Sport);

import React, {Component} from 'react';
import {Table, Row, Col, Card, CardHeader, CardBody, Button, Alert} from 'reactstrap';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader} from '../../auth';
import {ToastContainer, toast} from 'react-toastify';
import Modal from '../../components/Modal';
import {Link} from 'react-router-dom';
import Loader from 'react-loader';

/* eslint react/prop-types: 0 */

class Terminology extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terminologies: [],
      header: getAuthHeader(),
      terminology: '',
      terminologyId: '',
      disabled: '',
      isAdd: true,
      terminologyStatus: '',
      toggleStatusModal: false,
      isError: false,
      loaded: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.getTerminologies = this.getTerminologies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleStatusModal = this.handleToggleStatusModal.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
  }
  componentWillMount() {
    this.getTerminologies();
  }
  handleToggleStatusModal(e) {
    const {id} = e.target;
    const name = e.target.name === 'Y' ? 'N' : 'Y';
    this.setState({toggleStatusModal: !this.state.toggleStatusModal, terminologyId: id, terminologyStatus: name});
  }
  handleUpdateStatus() {
    const self = this;
    axios.put(config.EDIT_TERMINOLOGY.replace('{id}', this.state.terminologyId),
      {isActive: this.state.terminologyStatus},
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          if (self.state.terminologyStatus === 'N') {
            toast.info(config.SUCCESS_TERMINOLOGY_DISABLED);
          } else {
            toast.info(config.SUCCESS_TERMINOLOGY_ENABLED);
          }
          self.setState({disabled: '', loaded: true});
          self.getTerminologies();
        // Self.setState({terminologies: response.data.payload});
        } else {
          self.setState({disabled: '', loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        self.setState({disabled: '', loaded: true});
        toast.dismiss();
        toast.warn(config.ERROR_MSG);
        console.error('Error---', error);
      });
    this.setState({toggleStatusModal: !this.state.toggleStatusModal});
  }
  handleChange(e) {
    this.setState({terminology: e.target.value});
  }
  handleSubmit() {
    this.setState({disabled: 'disable', loaded: false});
    const self = this;
    if (this.state.isAdd === true) {
      axios.post(config.ADD_TERMINOLOGY, {name: this.state.terminology}, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.info('Offer Terminology Added!!');
            self.setState({terminology: '', disabled: '', loaded: true});
            self.getTerminologies();
          // Self.setState({terminologies: response.data.payload});
          } else {
            self.setState({disabled: '', loaded: true});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        })
        .catch(error => {
          self.setState({disabled: '', loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
          console.error('Error---', error);
        });
    } else {
      axios.put(config.EDIT_TERMINOLOGY.replace('{id}', this.state.terminologyId), {name: this.state.terminology}, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.info('Offer Terminology Edited!!');
            self.setState({terminology: '', disabled: '', terminologyId: '', isAdd: true, loaded: true});
            self.getTerminologies();
          // Self.setState({terminologies: response.data.payload});
          } else {
            self.setState({disabled: '', loaded: true});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        })
        .catch(error => {
          self.setState({disabled: '', loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
          console.error('Error---', error);
        });
    }
  }
  getTerminologies() {
    const self = this;
    axios.get(config.GET_TERMINOLOGIES, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          self.setState({terminologies: response.data.payload, loaded: true});
        } else {
          self.setState({isError: true, loaded: true});
        }
      })
      .catch(error => {
        self.setState({isError: true, loaded: true});
        console.error('Error---', error);
      });
  }
  handleEdit(e) {
    const {id} = e.target;
    this.setState({isAdd: false});
    let terminology;
    for (let i = 0; i < this.state.terminologies.length; i++) {
      if (this.state.terminologies[i].id === id) {
        terminology = this.state.terminologies[i];
      }
    }
    if (terminology) {
      this.setState({terminology: terminology.name, terminologyId: terminology.id});
    }
  }
  render() {
    const self = this;

    const terminologies = this.state.terminologies.map((terminology, key) => {
      return (
        <tr key={terminology.id}>
          <td>{key + 1}</td>
          <td>{terminology.name}</td>
          {/*  <td>{moment(terminology.lastModified).format('DD-MM-YYYY HH:mm')}</td>
          <td>{terminology.isActive === 'Y' ? 'Active' : 'Inactive'}</td> */}
          <td><Link to="#" id={terminology.id} onClick={self.handleEdit}> Edit </Link> </td>
          {/* {' '} <Link to="#" id={terminology.id} name={terminology.isActive} onClick={self.handleToggleStatusModal}>{terminology.isActive === 'Y' ? 'Disable' : 'Enable'} </Link> </td> */}
        </tr>);
    });
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        <div className="row">
          <Col xs="12" md="2"/>
          <div className="col-lg-4"/>
          <div className="col-lg-4" align="right">
            <div className="input-group">
              <input type="text" className="form-control" value={this.state.terminology} name="searchText" placeholder="" aria-label="" onChange={this.handleChange}/>
              <span className="input-group-btn">
                <Button color="primary" disabled={this.state.terminology.length === 0} onClick={this.handleSubmit}>{this.state.isAdd ? 'Add' : 'Save'}</Button>
              </span>
            </div>
          </div>

        </div>
        <br/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/> Offer Terminologies
              </CardHeader>
              <CardBody>
                {this.state.isError === true ?
                  <Alert color="warning">
                    Terminology Details Are Not Found !!!.
                  </Alert> :
                  <Table responsive striped className="drag">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        {/* <th>Last Modified</th>
                      <th>Status</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {terminologies}
                    </tbody>
                  </Table> }
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
          header="Enable/Disable Terminology"
          cancelText="No"
          confirmText="Yes"
        />
      </div>
    );
  }
}

export default Terminology;

// Module.exports = DragDropContext(HTML5Backend)(Terminology);

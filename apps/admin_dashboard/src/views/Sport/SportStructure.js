import React, {Component} from 'react';
import {Table, Row, Col, Card, CardHeader, CardBody, Button} from 'reactstrap';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader} from '../../auth';
import {ToastContainer, toast} from 'react-toastify';
import Modal from '../../components/Modal';
import {Link} from 'react-router-dom';
import moment from 'moment';

/* eslint react/prop-types: 0 */

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structures: [{id: '1', order: '1', name: 'aaa', lastModified: '2018-03-06T13:39:22.157Z', isActive: 'Y'},
        {id: '2', order: '2', name: 'bbbb', lastModified: '2018-03-06T13:39:22.157Z', isActive: 'N'},
        {id: '3', order: '3', name: 'cccc', lastModified: '2018-03-06T13:39:22.157Z', isActive: 'Y'},
        {id: '4', order: '4', name: 'dddd', lastModified: '2018-03-06T13:39:22.157Z', isActive: 'N'}],
      header: getAuthHeader(),
      structure: '',
      structureId: '',
      disabled: '',
      isAdd: true,
      structureStatus: '',
      toggleStatusModal: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.getStructures = this.getStructures.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleStatusModal = this.handleToggleStatusModal.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
  }
  componentWillMount() {
    this.getStructures();
  }
  handleToggleStatusModal(e) {
    const {id} = e.target;
    const name = e.target.name === 'Y' ? 'N' : 'Y';
    this.setState({toggleStatusModal: !this.state.toggleStatusModal, structureId: id, structureStatus: name});
  }
  handleUpdateStatus() {
    const self = this;
    axios.put(config.EDIT_STRUCTURE.replace('{id}', this.state.structureId),
      {isActive: this.state.structureStatus},
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          if (self.state.structureStatus === 'N') {
            toast.info(config.SUCCESS_STRUCTURE_DISABLED);
          } else {
            toast.info(config.SUCCESS_STRUCTURE_ENABLED);
          }
          self.setState({disabled: ''});
          self.getStructures();
        // Self.setState({structures: response.data.payload});
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
      });
    this.setState({toggleStatusModal: !this.state.toggleStatusModal});
  }
  handleChange(e) {
    this.setState({structure: e.target.value});
  }
  handleSubmit() {
    this.setState({disabled: 'disable'});
    const self = this;
    if (this.state.isAdd === true) {
      axios.post(config.ADD_STRUCTURE, {name: this.state.structure}, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.info('Structure Added!!');
            self.setState({structure: '', disabled: ''});
            self.getStructures();
          // Self.setState({structures: response.data.payload});
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
        });
    } else {
      axios.put(config.EDIT_STRUCTURE.replace('{id}', this.state.structureId), {name: this.state.structure}, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.info('Structure Edited!!');
            self.setState({structure: '', disabled: '', structureId: '', isAdd: true});
            self.getStructures();
          // Self.setState({structures: response.data.payload});
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
        });
    }
  }
  getStructures() {
    const self = this;
    axios.get(config.GET_STRUCTURES, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          /* Self.setState({structures: response.data.payload}); */
        }
      })
      .catch(error => {
        console.error('Error---', error);
      });
  }
  handleEdit(e) {
    const {id} = e.target;
    this.setState({isAdd: false});
    let structure;
    for (let i = 0; i < this.state.structures.length; i++) {
      if (this.state.structures[i].id === id) {
        structure = this.state.structures[i];
      }
    }
    if (structure) {
      this.setState({structure: structure.name, structureId: structure.id});
    }
  }
  render() {
    const self = this;

    const structures = this.state.structures.map(structure => {
      return (
        <tr key={structure.id}>
          <td>{structure.id}</td>
          <td>{structure.name}</td>
          <td>{moment(structure.lastModified).format('DD-MM-YYYY HH:mm')}</td>
          <td>{structure.isActive === 'Y' ? 'Active' : 'Inactive'}</td>
          <td><Link to="#" id={structure.id} onClick={self.handleEdit}> Edit </Link> {' '} <Link to="#" id={structure.id} name={structure.isActive} onClick={self.handleToggleStatusModal}>{structure.isActive === 'Y' ? 'Disable' : 'Enable'} </Link></td>
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
              <input type="text" className="form-control" value={this.state.structure} name="searchText" placeholder="" aria-label="" onChange={this.handleChange}/>
              <span className="input-group-btn">
                <Button color="primary" disabled={this.state.structure.length === 0} onClick={this.handleSubmit}>{this.state.isAdd ? 'Add' : 'Save'}</Button>
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
                <i className="fa fa-align-justify"/> Structure List
              </CardHeader>
              <CardBody>
                <Table responsive striped className="drag">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Name</th>
                      <th>Last Modified</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {structures}
                  </tbody>
                </Table>
                {this.state.moved ? <p><Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} color="primary" type="button" onClick={this.handleSaveOrder}>Save Order</Button> <Button color="secondary" onClick={this.handleRevert}>Revert</Button></p> : null}
              </CardBody>
            </Card>
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
          header="Enable/Disable Structure"
          cancelText="No"
          confirmText="Yes"
        />
      </div>
    );
  }
}

export default Structure;

// Module.exports = DragDropContext(HTML5Backend)(Structure);

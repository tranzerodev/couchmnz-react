import _ from 'lodash';
import React, {Component} from 'react';
import {Table, Row, Col, Card, CardHeader, CardBody, Button, Alert} from 'reactstrap';
import AgeRow from '../OrderRow';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader} from '../../auth';
import {ToastContainer, toast} from 'react-toastify';
import Modal from '../../components/Modal';
import withDragDropContext from '../OrderRow/withDragDropContext';
import Loader from 'react-loader';

/* eslint react/prop-types: 0 */

class Age extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ages: [],
      ageList: [],
      moved: false,
      header: getAuthHeader(),
      age: '',
      ageId: '',
      disabled: '',
      isAdd: true,
      ageStatus: '',
      toggleStatusModal: false,
      loaded: false,
      isError: false
    };
    this.moveRow = this.moveRow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getAges = this.getAges.bind(this);
    this.handleRevert = this.handleRevert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveOrder = this.handleSaveOrder.bind(this);
    this.handleToggleStatusModal = this.handleToggleStatusModal.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
  }
  componentWillMount() {
    // This.setState({ageList: this.state.ages});
    this.getAges();
  }
  handleToggleStatusModal() {
    this.setState({toggleStatusModal: !this.state.toggleStatusModal});
  }
  handleUpdateStatus() {
    const self = this;
    axios.put(config.EDIT_AGE.replace('{id}', this.state.ageId),
      {isActive: this.state.ageStatus},
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          if (self.state.ageStatus === 'N') {
            toast.info(config.SUCCESS_AGE_DISABLED);
          } else {
            toast.info(config.SUCCESS_AGE_ENABLED);
          }
          self.setState({disabled: '', loaded: true});
          self.getAges();
        // Self.setState({ages: response.data.payload});
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
    this.setState({age: e.target.value});
  }
  handleRevert() {
    console.log('OrginalRow ', this.state.ageList);
    this.setState({moved: false, ages: this.state.ageList});
  }
  handleSaveOrder() {
    this.setState({disabled: 'disable', loaded: false});
    console.log('ages ', this.state.ages);
    const ages = this.state.ages.map((r, key) => {
      r.order = key + 1;
      return r;
    });
    this.setState({ageList: ages});
    const self = this;
    axios.post(config.UPDATE_AGES, ages, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          toast.info('Age Order Saved!!');
          self.setState({age: '', disabled: '', moved: false, loaded: true});
          self.getAges();
          // Self.setState({ages: response.data.payload});
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
  handleSubmit() {
    this.setState({disabled: 'disable', loaded: false});
    const self = this;
    if (this.state.isAdd === true) {
      axios.post(config.ADD_AGE, {name: this.state.age}, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.info('Age Added!!');
            self.setState({age: '', disabled: '', loaded: true});
            self.getAges();
          // Self.setState({ages: response.data.payload});
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
      axios.put(config.EDIT_AGE.replace('{id}', this.state.ageId), {name: this.state.age}, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.info('Age Edited!!');
            self.setState({age: '', disabled: '', ageId: '', isAdd: true, loaded: true});
            self.getAges();
          // Self.setState({ages: response.data.payload});
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
  moveRow(id, afterId) {
    console.log('id afterId ', id, afterId);
    this.setState({moved: true});
    const self = this;
    const ages = _.clone(self.state.ages);

    const currentRow = _.filter(ages, r => {
      return r.order === id;
    })[0];
    const afterRow = _.filter(ages, r => {
      return r.order === afterId;
    })[0];

    const currentRowIndex = ages.indexOf(currentRow);
    const afterRowIndex = ages.indexOf(afterRow);

    /* Console.log('--------- currentRowIndex', ages[currentRowIndex]);
    console.log('--------- afterRowIndex', ages[afterRowIndex]);

    const order = ages[currentRowIndex].order;
    ages[currentRowIndex].order = ages[afterRowIndex].order;
    ages[afterRowIndex].order = order;

    console.log('+++++++ currentRowIndex', ages[currentRowIndex]);
    console.log('+++++++ afterRowIndex', ages[afterRowIndex]); */
    // Remove the current row
    ages.splice(currentRowIndex, 1);
    // Put it after
    ages.splice(afterRowIndex, 0, currentRow);

    this.setState({ages});
  }
  getAges() {
    const self = this;
    axios.get(config.GET_AGES, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          self.setState({ages: response.data.payload,
            ageList: response.data.payload, loaded: true});
        } else {
          self.setState({isError: true});
        }
      })
      .catch(error => {
        self.setState({isError: true});
        console.error('Error---', error);
      });
    /* Const response = [{id: '58ee4723db2529281d7b23e0', type: 'athlete', sections: [{name: 'Athlete Profile', isCompleted: 'Y'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'N'}], showDisable: 'Y', showDeactivate: 'Y'}, {id: '58ee4723db2529281d7b24e0', type: 'parent', dependents: [{type: 'child', name: 'Child 1', sections: [{name: 'Child Profile', isCompleted: 'Y'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'N'}], showDisable: 'Y'}, {type: 'child', name: 'Child 2', sections: [{name: 'Child Profile', isCompleted: 'N'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'Y'}], showDisable: 'Y'}], showDeactivate: 'Y'}, {id: '58ee4723db2529281d7b24e0', type: 'isp', sports: [{id: '58ee4723db2529281d7b24e0', name: 'Golf', sections: [{name: 'Services', isCompleted: 'Y'}, {name: 'Training Preferences', isCompleted: 'Y'}, {name: 'Biography', isCompleted: 'Y'}], showDisable: 'Y'}, {id: '58ee4723db2529281d7b29e0', name: 'Soccer', sections: [{name: 'Services', isCompleted: 'Y'}, {name: 'Training Preferences', isCompleted: 'Y'}, {name: 'Biography', isCompleted: 'Y'}], showDisable: 'Y'}], showDeactivate: 'N'}];
    this.setState({profiles: response}); */
  }
  handleEdit(_id) {
    console.log('id ', _id);
    this.setState({isAdd: false});
    let age;
    for (let i = 0; i < this.state.ages.length; i++) {
      if (this.state.ages[i].id === _id) {
        age = this.state.ages[i];
      }
    }
    if (age) {
      this.setState({age: age.name, ageId: age.id});
    }
  }
  handleStatusUpdate(id, status) {
    this.setState({ageId: id, ageStatus: status, toggleStatusModal: true});
  }
  render() {
    const self = this;

    const ages = this.state.ages.map(row => {
      return <AgeRow key={row.id} id={row.order} data={row} moveRow={self.moveRow} onStatusUpdate={this.handleStatusUpdate} onEdit={this.handleEdit}/>;
    });

    // Console.log('row ', this.state.ages);

    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        <div className="row">
          <Col xs="12"/>
          <div className="col-lg-4"/>
          <div className="col-lg-6" align="right">
            <div className="input-group">
              <input type="text" className="form-control" value={this.state.age} name="searchText" placeholder="" aria-label="" onChange={this.handleChange}/>
              <span className="input-group-btn">
                <Button color="primary" disabled={this.state.age.length === 0} onClick={this.handleSubmit}>{this.state.isAdd ? 'Add' : 'Save'}</Button>
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
                <i className="fa fa-align-justify"/> Age List
              </CardHeader>
              <CardBody>
                {this.state.isError === true ?
                  <Alert color="warning">
                    Ages Details Are Not Found !!!.
                  </Alert> :
                  <Table responsive striped className="drag">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Name</th>
                        {/*  <th>Last Modified</th>
                      <th>Status</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ages}
                    </tbody>
                  </Table>}
                {this.state.moved ? <p><Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} color="primary" type="button" onClick={this.handleSaveOrder}>Save Order</Button> <Button color="secondary" onClick={this.handleRevert}>Revert</Button></p> : null}
              </CardBody>
            </Card>
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.toggleStatusModal}
          className="modal-danger"
          onToggle={this.handleToggleStatusModal}
          onConfirm={this.handleUpdateStatus}
          onCancel={this.handleToggleStatusModal}
          content="Are you sure?"
          header="Enable/Disable Age"
          cancelText="No"
          confirmText="Yes"
        />
      </div>
    );
  }
}

export default withDragDropContext(Age);

// Module.exports = DragDropContext(HTML5Backend)(Age);

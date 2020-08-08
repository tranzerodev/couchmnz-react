import _ from 'lodash';
import React, {Component} from 'react';
import {Table, Row, Col, Card, CardHeader, CardBody, Button, Alert} from 'reactstrap';
import SkillRow from '../OrderRow';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader} from '../../auth';
import {ToastContainer, toast} from 'react-toastify';
import Modal from '../../components/Modal';
import withDragDropContext from '../OrderRow/withDragDropContext';
import Loader from 'react-loader';

/* eslint react/prop-types: 0 */

class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      skillList: [],
      moved: false,
      header: getAuthHeader(),
      skill: '',
      skillId: '',
      disabled: '',
      isAdd: true,
      skillStatus: '',
      toggleStatusModal: false,
      loaded: false,
      isError: false
    };
    this.moveRow = this.moveRow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getSkills = this.getSkills.bind(this);
    this.handleRevert = this.handleRevert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveOrder = this.handleSaveOrder.bind(this);
    this.handleToggleStatusModal = this.handleToggleStatusModal.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
  }
  componentWillMount() {
    // This.setState({skillList: this.state.skills});
    this.getSkills();
  }
  handleToggleStatusModal() {
    this.setState({toggleStatusModal: !this.state.toggleStatusModal});
  }
  handleUpdateStatus() {
    const self = this;
    axios.put(config.EDIT_SKILL.replace('{id}', this.state.skillId),
      {isActive: this.state.skillStatus},
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          if (self.state.skillStatus === 'N') {
            toast.info(config.SUCCESS_SKILL_DISABLED);
          } else {
            toast.info(config.SUCCESS_SKILL_ENABLED);
          }
          self.setState({disabled: '', loaded: true});
          self.getSkills();
        // Self.setState({skills: response.data.payload});
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
    this.setState({skill: e.target.value});
  }
  handleRevert() {
    console.log('OrginalRow ', this.state.skillList);
    this.setState({moved: false, skills: this.state.skillList});
  }
  handleSaveOrder() {
    this.setState({disabled: 'disable', loaded: false});
    console.log('skills ', this.state.skills);
    const skills = this.state.skills.map((r, key) => {
      r.order = key + 1;
      return r;
    });
    this.setState({skillList: skills});
    const self = this;
    axios.post(config.UPDATE_SKILLS, skills, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          toast.info('Skill Order Saved!!');
          self.setState({skill: '', disabled: '', moved: false, loaded: true});
          self.getSkills();
          // Self.setState({skills: response.data.payload});
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
      axios.post(config.ADD_SKILL, {name: this.state.skill}, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.info('Skill Added!!');
            self.setState({skill: '', disabled: '', loaded: true});
            self.getSkills();
          // Self.setState({skills: response.data.payload});
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
      axios.put(config.EDIT_SKILL.replace('{id}', this.state.skillId), {name: this.state.skill}, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.info('Skill Edited!!');
            self.setState({skill: '', disabled: '', skillId: '', isAdd: true, loaded: true});
            self.getSkills();
          // Self.setState({skills: response.data.payload});
          } else {
            self.setState({disabled: '', loaded: false});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        })
        .catch(error => {
          self.setState({disabled: '', loaded: false});
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
    const skills = _.clone(self.state.skills);

    const currentRow = _.filter(skills, r => {
      return r.order === id;
    })[0];
    const afterRow = _.filter(skills, r => {
      return r.order === afterId;
    })[0];

    const currentRowIndex = skills.indexOf(currentRow);
    const afterRowIndex = skills.indexOf(afterRow);

    /* Console.log('--------- currentRowIndex', skills[currentRowIndex]);
    console.log('--------- afterRowIndex', skills[afterRowIndex]);

    const order = skills[currentRowIndex].order;
    skills[currentRowIndex].order = skills[afterRowIndex].order;
    skills[afterRowIndex].order = order;

    console.log('+++++++ currentRowIndex', skills[currentRowIndex]);
    console.log('+++++++ afterRowIndex', skills[afterRowIndex]); */
    // Remove the current row
    skills.splice(currentRowIndex, 1);
    // Put it after
    skills.splice(afterRowIndex, 0, currentRow);

    this.setState({skills});
  }
  getSkills() {
    const self = this;
    axios.get(config.GET_SKILLS, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          self.setState({skills: response.data.payload,
            skillList: response.data.payload, loaded: true});
        } else {
          self.setState({loaded: true, isError: true});
        }
      })
      .catch(error => {
        self.setState({loaded: true, isError: true});
        console.error('Error---', error);
      });
    /* Const response = [{id: '58ee4723db2529281d7b23e0', type: 'athlete', sections: [{name: 'Athlete Profile', isCompleted: 'Y'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'N'}], showDisable: 'Y', showDeactivate: 'Y'}, {id: '58ee4723db2529281d7b24e0', type: 'parent', dependents: [{type: 'child', name: 'Child 1', sections: [{name: 'Child Profile', isCompleted: 'Y'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'N'}], showDisable: 'Y'}, {type: 'child', name: 'Child 2', sections: [{name: 'Child Profile', isCompleted: 'N'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'Y'}], showDisable: 'Y'}], showDeactivate: 'Y'}, {id: '58ee4723db2529281d7b24e0', type: 'isp', sports: [{id: '58ee4723db2529281d7b24e0', name: 'Golf', sections: [{name: 'Services', isCompleted: 'Y'}, {name: 'Training Preferences', isCompleted: 'Y'}, {name: 'Biography', isCompleted: 'Y'}], showDisable: 'Y'}, {id: '58ee4723db2529281d7b29e0', name: 'Soccer', sections: [{name: 'Services', isCompleted: 'Y'}, {name: 'Training Preferences', isCompleted: 'Y'}, {name: 'Biography', isCompleted: 'Y'}], showDisable: 'Y'}], showDeactivate: 'N'}];
    this.setState({profiles: response}); */
  }
  handleEdit(_id) {
    console.log('id ', _id);
    this.setState({isAdd: false});
    let skill;
    for (let i = 0; i < this.state.skills.length; i++) {
      if (this.state.skills[i].id === _id) {
        skill = this.state.skills[i];
      }
    }
    if (skill) {
      this.setState({skill: skill.name, skillId: skill.id});
    }
  }
  handleStatusUpdate(id, status) {
    this.setState({skillId: id, skillStatus: status, toggleStatusModal: true});
  }
  render() {
    const self = this;

    const skills = this.state.skills.map(row => {
      return <SkillRow key={row.id} id={row.order} data={row} moveRow={self.moveRow} onStatusUpdate={this.handleStatusUpdate} onEdit={this.handleEdit}/>;
    });

    // Console.log('row ', this.state.skills);

    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        <div className="row">
          <Col xs="12"/>
          <div className="col-lg-4"/>
          <div className="col-lg-6" align="right">
            <div className="input-group">
              <input type="text" className="form-control" value={this.state.skill} name="searchText" placeholder="" aria-label="" onChange={this.handleChange}/>
              <span className="input-group-btn">
                <Button color="primary" disabled={this.state.skill.length === 0} onClick={this.handleSubmit}>{this.state.isAdd ? 'Add' : 'Save'}</Button>
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
                <i className="fa fa-align-justify"/> Skills
              </CardHeader>
              <CardBody>
                {this.state.isError === true ?
                  <Alert color="warning">
                    Skills Details Are Not Found !!!.
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
                      {skills}
                    </tbody>
                  </Table>}
                {this.state.moved ? <p><Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} color="primary" type="button" onClick={this.handleSaveOrder}>Save Order</Button> <Button color="secondary" onClick={this.handleRevert}>Revert</Button></p> : null}
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
          header="Enable/Disable Skill"
          cancelText="No"
          confirmText="Yes"
        />
      </div>
    );
  }
}

export default withDragDropContext(Skill);

// Module.exports = DragDropContext(HTML5Backend)(Skill);

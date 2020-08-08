import React, {Component} from 'react';
import {Table, Row, Col, Card, CardHeader, CardBody, Button, Alert} from 'reactstrap';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader, logout} from '../../auth';
import {toast} from 'react-toastify';
import Modal from '../../components/Modal';
import Loader from 'react-loader';
import ReactDOM from 'react-dom';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class SpecialityEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialization: [],
      header: getAuthHeader(),
      speciality: '',
      specialityId: '',
      disabled: '',
      isAdd: true,
      specialiyStatus: '',
      toggleStatusModal: false,
      sport: {},
      sportId: '',
      loaded: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleStatusModal = this.handleToggleStatusModal.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
  }
  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }
  componentWillMount() {
    const {sport, sportId} = this.props;
    console.log('sport ', sport);
    this.setState({sport, sportId, specialization: sport.specialities || [], loaded: true});
  }
  componentWillReceiveProps(nextProps) {
    const {sport, sportId} = nextProps;
    if (this.props.sport !== this.state.sport) {
      this.setState({sport, sportId});
    }
  }
  handleToggleStatusModal(e) {
    const {value} = e.target;
    this.setState({toggleStatusModal: !this.state.toggleStatusModal, specialityId: value});
  }
  handleUpdateStatus() {
    this.setState({loaded: false});
    const self = this;
    const {sport} = self.state;
    const payload = sport;
    const specialityArr = payload.specialities;
    /*   Const specialities = specialityArr.filter(speciality => {
      return speciality.id === this.state.specialityId ?
    }); */

    const specialities = specialityArr.map((specialty, key) => {
      if (specialty.id === this.state.specialityId) {
        specialty.remove = true;
      }
      return specialty;
    });
    payload.specialities = specialities;
    payload.terminologyId = sport.offerTerminology ? sport.offerTerminology.id : sport.terminologyId;
    axios.put(config.EDIT_SPORT.replace('{sportId}', this.state.sportId), payload,
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          toast.dismiss();
          toast.info('Speciality Removed!!');
          self.setState({disabled: ''});
          const sport = response.data.payload;
          self.setState({specialization: sport.specialities, sport, sportId: sport.id, loaded: true});
          self.props.onSpecialityChange(sport.specialities);
        } else if (response.data.responseCode === 102 || response.data.responseCode === 104) {
          self.setState({loaded: true, disabled: ''});
          ReactDOM.render('Specialization is already assigned to other profile!', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-danger');
          self.removeMessage();
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
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
    this.setState({toggleStatusModal: !this.state.toggleStatusModal});
  }
  handleChange(e) {
    this.setState({speciality: e.target.value});
  }
  handleSubmit() {
    this.setState({disabled: 'disable', loaded: false});
    const self = this;
    const {sport} = self.state;
    const payload = sport;
    payload.specialities = sport.specialities ? sport.specialities : [];
    payload.terminologyId = sport.offerTerminology ? sport.offerTerminology.id : sport.terminologyId;
    if (this.state.isAdd === true) {
      const specialities = payload.specialities;
      let alreadyExist;
      for (let j = 0; j < payload.specialities.length; j++) {
        if (specialities[j].name === this.state.speciality.trim()) {
          alreadyExist = true;
        }
      }
      if (alreadyExist) {
        self.setState({loaded: true});
        ReactDOM.render('Speciality Already Added ', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger');
        this.removeMessage();
      } else {
        payload.specialities.push({name: this.state.speciality.trim()});
        axios.put(config.EDIT_SPORT.replace('{sportId}', this.state.sportId), payload, {headers: this.state.header})
          .then(response => {
            if (response.data.responseCode === 0 && response.data.payload) {
              toast.dismiss();
              toast.info('Speciality Added!!');
              self.setState({speciality: '', disabled: ''});
              const sport = response.data.payload;
              self.setState({specialization: sport.specialities, sport, sportId: sport.id, loaded: true});
              self.props.onSpecialityChange(sport.specialities);
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
            if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
              logout();
            }
          });
      }
    } else {
      const specialityArr = payload.specialities;
      const specialities = specialityArr.filter(speciality => {
        return speciality.id !== this.state.specialityId;
      });
      specialities.push({id: this.state.specialityId, name: this.state.speciality});
      payload.specialities = specialities;
      axios.put(config.EDIT_SPORT.replace('{sportId}', this.state.sportId), payload, {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0 && response.data.payload) {
            toast.dismiss();
            toast.info('Speciality Edited!!');
            self.setState({speciality: '', disabled: '', specialityId: '', isAdd: true, loaded: true});
            const sport = response.data.payload;
            self.setState({specialization: sport.specialities, sport, sportId: sport.id});
            self.props.onSpecialityChange(sport.specialities);
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
          if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
            logout();
          }
        });
    }
  }
  handleEdit(e) {
    const {id, name} = e.target;
    this.setState({isAdd: false, speciality: name, specialityId: id});
  }
  render() {
    const specialization = this.state.specialization.map((speciality, key) => {
      if (speciality.id) {
        return (
          <tr key={speciality.id}>
            <td>{key + 1}</td>
            <td>{speciality.name}</td>
            <td><Button color="primary" id={speciality.id} name={speciality.name} onClick={this.handleEdit}>Edit</Button> {' '} <Button color="danger" value={speciality.id} onClick={this.handleToggleStatusModal}>Remove</Button></td>
          </tr>);
      }
    });
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        {/* <ToastContainer autoClose={config.TOASTTIMEOUT}/> */}
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">

            <Card>
              <CardHeader>
                <strong>Specialities</strong>
              </CardHeader>
              <CardBody>
                <Alert color="white" id="validationMessage"/>
                <div className="row">
                  <Col xs="12" md="2"/>
                  <div className="col-lg-4"/>
                  <div className="col-lg-6" align="right">
                    <div className="input-group">
                      <input type="text" className="form-control" value={this.state.speciality} name="speciality" placeholder="" aria-label="" onChange={this.handleChange}/>
                      <span className="input-group-btn">
                        <Button color="primary" disabled={this.state.speciality.length === 0} onClick={this.handleSubmit}>{this.state.isAdd ? 'Add' : 'Save'}</Button>
                      </span>
                    </div>
                  </div>
                </div>
                <br/>
                {this.state.specialization.length > 0 ?
                  <Table responsive striped className="drag">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specialization}
                    </tbody>
                  </Table> : null}
                <Loader loaded={this.state.loaded} className="spinner"/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.toggleStatusModal}
          className="modal-danger"
          onToggle={this.handleToggleStatusModal}
          onConfirm={this.handleUpdateStatus}
          onCancel={this.handleToggleStatusModal}
          content="Are you sure?"
          header="Delete Speciality"
          cancelText="No"
          confirmText="Yes"
        />
      </div>
    );
  }
}

export default SpecialityEdit;

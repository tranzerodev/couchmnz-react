import React, {Component} from 'react';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
import {Row, Col, Button, Card, CardHeader, Alert, CardFooter, CardBody, Form, FormGroup, FormText, Label, Input} from 'reactstrap';
import Select from 'react-select';
import {ToastContainer, toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import config from '../../config';
import {SPORTS, EDIT_SPORTS} from '../../constants/pathConstants';
import Loader from 'react-loader';
import ReactDOM from 'react-dom';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class SportAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: '',
      header: getAuthHeader(),
      terminologies: [],
      options: [],
      alternateNames: ['', ''],
      selectedTerminology: '',
      loaded: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateSport = this.handleCreateSport.bind(this);
    this.getTerminologies = this.getTerminologies.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
    this.handleAddAlternate = this.handleAddAlternate.bind(this);
    this.createAlternate = this.createAlternate.bind(this);
    this.handleChangeAlternate = this.handleChangeAlternate.bind(this);
    this.handleChangeTerminology = this.handleChangeTerminology.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
  }
  componentWillMount() {
    this.getTerminologies();
  }
  getTerminologies() {
    const self = this;
    axios.get(config.GET_TERMINOLOGIES, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          self.setState({terminologies: response.data.payload}, () => {
            self.generateOptions();
          });
        }
      })
      .catch(error => {
        console.error('Error---', error);
      });
  }
  createAlternate() {
    return this.state.alternateNames.map((value, i) =>
      (
        <div key={i}>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="address">Alternate Name {i + 1}</Label>
            </Col>
            <Col xs="12" md="8">
              <input className="form-control" type="text" value={value || ''} id={i} onChange={this.handleChangeAlternate}/>
            </Col>
          </FormGroup>
        </div>)
    );
  }

  handleChangeAlternate(e) {
    const i = e.target.id;
    const alternateNames = [...this.state.alternateNames];
    alternateNames[i] = e.target.value;
    this.setState({alternateNames});
  }
  generateOptions() {
    const option = this.state.terminologies.map((terminology, key) => {
      return {value: terminology.id, label: terminology.name, key};
    });

    this.setState({options: option});
  }
  handleAddAlternate(e) {
    e.preventDefault();
    this.setState(prevState => ({alternateNames: [...prevState.alternateNames, '']}));
  }
  handleChange(event) {
    const {value, name} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleCreateSport(event) {
    this.setState({disabled: 'disable', loaded: false});
    event.preventDefault();
    const alternateNames = this.state.alternateNames.filter(x => {
      return (x !== (undefined || null || ''));
    });
    this.setState({alternateNames});
    const payload = {
      name: this.state.name,
      alternateNames,
      terminologyId: this.state.selectedTerminology.value
    };
    const self = this;
    // Post
    axios.post(config.ADD_SPORT,
      payload,
      {headers: this.state.header})
      .then(res => {
        if (res.data.responseCode === 0 && res.data.payload) {
          toast.dismiss();
          toast.info('Sport added Successfully');
          // Self.setState({name: '', alternateNames: ['', ''], selectedTerminology: ''});
          // Self.removeMessageAndRedirect();
          self.setState({disabled: '', loaded: true});
          this.props.history.push(EDIT_SPORTS.replace(':sportId', res.data.payload.id));
        } else if (res.data.responseCode === 102 || res.data.responseCode === 104) {
          self.setState({loaded: true, disabled: ''});
          ReactDOM.render('Sport is already created!', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-danger');
          self.removeMessage();
        } else {
          toast.dismiss();
          toast.warn('ERROR!!!Something went wrong');
          self.setState({disabled: '', loaded: true});
        }
      })
      .catch(err => {
        toast.dismiss();
        toast.warn('ERROR!!!Something went wrong');
        if (err && err.response && err.response.statusText === 'Unauthorized' && err.response.status === 401) {
          logout();
        } else {
          this.setState({disabled: '', loaded: true});
        }
        console.log('err -> ', err);
      });
  }
  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }

  handleChangeTerminology(selected) {
    this.setState({
      selectedTerminology: selected
    });
  }
  handleCancel() {
    this.props.history.push(SPORTS);
  }
  render() {
    console.log('alternateNames ', this.state.alternateNames);
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        <ToastContainer/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="9">
            <Card>
              <Form action="" method="post" onSubmit={this.handleCreateSport}>
                <CardHeader>
                  <strong>Add Sport / Fitness Category</strong>
                </CardHeader>
                <CardBody>
                  <Alert color="white" id="validationMessage"/>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="name">Sport / Fitness Category Name *</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" value={this.state.name} name="name" onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup>
                  {this.createAlternate()}
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="link"/>
                    </Col>
                    <Col xs="12" md="8">
                      <Link to="#" onClick={this.handleAddAlternate}>Add Alternate Name</Link>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="address">Terminologies for offerings * </Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Select
                        name="_id"
                        placeholder="Select Offer Terminology"
                        value={this.state.selectedTerminology}
                        onChange={this.handleChangeTerminology}
                        options={this.state.options}
                        searchable={false}
                        clearable={false}
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="link"/>
                    </Col>
                    <Col xs="12" md="8">
                      <Link to="/terminology" >Manage Offer Terminologies</Link>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" color="primary" ><i className="fa fa-dot-circle-o"/> Submit</Button> {''}
                  <Button type="reset" color="danger" onClick={this.handleCancel}><i className="fa fa-ban"/> Cancel</Button>
                </CardFooter>
              </Form>
            </Card>
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SportAdd;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getAuthHeader, logout} from '../../auth';
import axios from 'axios';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Alert,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap';

import config from '../../config';
import {ToastContainer, toast} from 'react-toastify';
import {INSTITUTIONS} from '../../constants/pathConstants';

class EditInstitute extends Component {
  constructor(props) {
    super(props);
    console.log('props ::', props);
    this.state = {
      insId: this.props.match.params.id,
      instituteData: {},
      header: getAuthHeader(),
      disabled: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateInstitute = this.handleCreateInstitute.bind(this);
    this.getDetails = this.getDetails.bind(this);
    this.removeMessageAndRedirect = this.removeMessageAndRedirect.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  getDetails() {
    const self = this;
    axios.get(config.INSTITUTE_URL + '/' + this.props.match.params.id, {
      headers: this.state.header
    })
      .then(response => {
        console.log('Program Provider Payload :: ', response.data.payload);
        if (response.data.payload) {
          // Self.instituteData = response.data.payload.institution;
          self.setState({instituteData: response.data.payload});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }
  removeMessageAndRedirect() {
    const self = this;
    self.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
      self.props.history.push(INSTITUTIONS);
    }, 3000);
  }

  componentDidMount() {
    this.getDetails();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const {instituteData} = this.state;
    const newInstituteData = Object.assign({}, instituteData, {
      [name]: value
    });

    this.setState({
      instituteData: newInstituteData
    });
  }
  handleCreateInstitute(event) {
    event.preventDefault();
    this.setState({disabled: 'disable'});
    const formData = new FormData();
    if (this.state.instituteData.institution_en) {
      formData.append('institution_en', this.state.instituteData.institution_en);
    }
    if (this.state.instituteData.address) {
      formData.append('address', this.state.instituteData.address);
    }
    if (this.state.instituteData.country) {
      formData.append('country', this.state.instituteData.country);
    }
    if (this.state.instituteData.contact_number) {
      formData.append('contact_number', this.state.instituteData.contact_number);
    }
    if (this.state.instituteData.site_url) {
      formData.append('site_url', this.state.instituteData.site_url);
    }
    if (this.state.instituteData.contact_email) {
      formData.append('contact_email', this.state.instituteData.contact_email);
    }
    if (this.state.instituteData.status) {
      formData.append('status', this.state.instituteData.status);
    }
    if (this.state.instituteData.notes) {
      formData.append('notes', this.state.instituteData.notes);
    }
    if (this.state.file) {
      formData.append('logo', this.state.file);
    }

    const self = this;
    // Post
    axios.post(config.INSTITUTE_URL + '/' + this.state.insId, formData, {
      headers: this.state.header
    })
      .then(res => {
        console.log('success :: ', res);
        if (res.status === 200 && res.data.responseCode === 0) {
          toast.info('Program Provider Edited Successfully');
          /*           ReactDOM.render('Institution Edited Successfully', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-success'); */
          self.removeMessageAndRedirect();
          this.setState({disabled: ''});
        } else {
          toast.warn('ERROR!!!Something went wrong');
          self.setState({disabled: ''});
        }
      })
      .catch(err => {
        toast.warn('ERROR!!!Something went wrong');
        /* ReactDOM.render('Something Went Wrong', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger'); */
        self.removeMessage();
        console.log('ERROR!!!Something went wrong', err);
        this.setState({disabled: ''});
      });
  }
  handleCancel() {
    this.props.history.push(INSTITUTIONS);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <ToastContainer/>
        <Row>
          <Col xs="12" md="3"/>
          <Col xs="12" md="6">
            <Card>
              <Form onSubmit={this.handleCreateInstitute} encType="multipart/form-data" >
                <CardHeader>
                  <strong>Edit Institution</strong>
                </CardHeader>
                <CardBody>
                  <Alert color="white" id="validationMessage"/>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id">ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="id" value={this.state.instituteData._id} readOnly/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" placeholder="" name="institution_en" value={this.state.instituteData.institution_en || ''} onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address">Address</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="address" name="address" value={this.state.instituteData.address || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="country">Country</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="country" name="country" value={this.state.instituteData.country || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="contact">Contact Number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="contact" name="contact_number" placeholder="" value={this.state.instituteData.contact_number || 0} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="siteUrl">Site Url</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="url" id="siteUrl" name="site_url" placeholder="" value={this.state.instituteData.site_url || ' '} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email">Contact Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email" name="contact_email" placeholder="" value={this.state.instituteData.contact_email || ' '} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Logo</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-input" name="file-input" onChange={this.handleChange}/>
                      <FormText >Preferred size 240px X 240px</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="notes">Notes</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="notes" name="notes" placeholder="" value={this.state.instituteData.notes || ' '} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                </CardBody>
                <CardFooter>
                  <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" color="primary" ><i className="fa fa-dot-circle-o"/> Submit</Button>{' '}
                  <Button type="reset" color="danger" onClick={this.handleCancel}><i className="fa fa-ban"/> Cancel</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditInstitute;

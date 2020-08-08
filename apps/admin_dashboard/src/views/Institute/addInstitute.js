import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {getAuthHeader} from '../../auth';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  Alert,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap';
import {ToastContainer, toast} from 'react-toastify';
import Loader from 'react-loader';
import config from '../../config';
import {INSTITUTIONS} from '../../constants/pathConstants';

class AddInstitute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: '',
      loaded: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateInstitute = this.handleCreateInstitute.bind(this);
    this.removeMessageAndRedirect = this.removeMessageAndRedirect.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'file-input') {
      this.setState({
        file: target.files[0]
      });
      return;
    }
    this.setState({
      [name]: value
    });
  }

  handleCreateInstitute(event) {
    event.preventDefault();
    //   Var institutePayload = {
    //     "institution_en": this.state.name,
    //     "address": this.state.address,
    //     "country" : this.state.country,
    //     "contact_number" : this.state.contact,
    //     "site_url" : this.state.siteUrl,
    //     "contact_email" : this.state.email,
    //     "notes" : this.state.notes
    // };
    this.setState({disabled: 'disable', loaded: false});
    const formData = new FormData();
    if (this.state.name) {
      formData.append('institution_en', this.state.name);
    }
    if (this.state.address) {
      formData.append('address', this.state.address);
    }
    if (this.state.country) {
      formData.append('country', this.state.country);
    }
    if (this.state.contact) {
      formData.append('contact_number', this.state.contact);
    }
    if (this.state.siteUrl) {
      formData.append('site_url', this.state.siteUrl);
    }
    if (this.state.email) {
      formData.append('contact_email', this.state.email);
    }
    if (this.state.status) {
      formData.append('status', this.state.status);
    }
    if (this.state.notes) {
      formData.append('notes', this.state.notes);
    }
    if (this.state.file) {
      formData.append('logo', this.state.file);
    }

    const self = this;
    const header = getAuthHeader();
    // Post
    axios.post(config.INSTITUTE_URL, formData, {
      headers: header
    })
      .then(res => {
        if (res.status === 200 && res.data.responseCode === 0) {
          toast.info('Program Provider added Successfully');
          /* ReactDOM.render('Program Provider added Successfully', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-success');
          self.removeMessageAndRedirect(); */
          self.setState({name: '', address: '', country: '', contact: '', siteUrl: '', email: '', status: '', notes: '', file: ''});
          self.removeMessageAndRedirect();
          this.setState({disabled: '', loaded: true});
        } else {
          toast.warn('ERROR!!!Something went wrong');
          this.setState({disabled: '', loaded: true});
        }
      })
      .catch(err => {
        toast.warn('ERROR!!!Something went wrong');
        /* ReactDOM.render('Something Went Wrong', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger');
        self.removeMessage(); */
        console.log('ERROR!!!Something went wrong', err);
        this.setState({disabled: '', loaded: true});
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

  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
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
              <Form action="" method="post" onSubmit={this.handleCreateInstitute} encType="multipart/form-data" >
                <CardHeader>
                  <strong>Add Institution</strong>
                </CardHeader>
                <CardBody>
                  <Alert color="white" id="validationMessage"/>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id">ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="id" onChange={this.handleChange} placeholder="" readOnly/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.name} placeholder="" name="name" onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address">Address</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="address" value={this.state.address} name="address" placeholder="" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="country">Country</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="country" value={this.state.country} name="country" onChange={this.handleChange} placeholder=""/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="contact">Contact Number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="contact" value={this.state.contact} name="contact" placeholder="" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="siteUrl">Site Url</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="url" id="siteUrl" value={this.state.siteUrl} name="siteUrl" placeholder="" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email">Contact Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email" value={this.state.email} name="email" placeholder="" onChange={this.handleChange}/>
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
                      <Input type="text" value={this.state.notes} id="notes" name="notes" placeholder="" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                </CardBody>
                <CardFooter>
                  <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" color="primary" ><i className="fa fa-dot-circle-o"/> Submit</Button> {''}
                  {/* <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Publish</Button> */}
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

export default AddInstitute;

import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {getAuthHeader} from '../../auth';
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
// Import SmartDataTable from 'react-smart-data-table';
import config from '../../config';
import {ToastContainer, toast} from 'react-toastify';
import {PROGRAM_PROVIDERS} from '../../constants/pathConstants';

class AddProgramProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      geographicCoverages: config.GEO_COVERAGES,
      serviceAreaOptions: config.SERVICE_AREA_OPTIONS,
      geographicOptionItems: '',
      serviceArea: 'Global/International',
      header: getAuthHeader(),
      geographicCoverage: 'Global'
    };
    this.OrgData = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateOrg = this.handleCreateOrg.bind(this);
    this.removeMessageAndRedirect = this.removeMessageAndRedirect.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    const geoOptionItems = this.state.geographicCoverages.map(opt => {
      return <option key={opt.value} value={opt.key}>{opt.value}</option>;
    }

    );
    this.setState({
      geographicOptionItems: geoOptionItems
    });

    const serviceAreaOption = this.state.serviceAreaOptions.map(serviceArea => {
      return <option key={serviceArea.value} value={serviceArea.key}>{serviceArea.value}</option>;
    });
    this.setState({
      serviceAreaOptionItems: serviceAreaOption
    });
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
  handleCreateOrg(event) {
    this.setState({disabled: 'disable'});
    event.preventDefault();
    const formData = new FormData();
    if (this.state.name) {
      formData.append('organization_en', this.state.name);
    }
    if (this.state.geographicCoverage) {
      formData.append('geo_coverage', this.state.geographicCoverage);
    }
    if (this.state.serviceArea) {
      formData.append('service_area', this.state.serviceArea);
    }
    if (this.state.subGeo) {
      formData.append('sub_geo_coverage', this.state.subGeo);
    }
    if (this.state.orgType) {
      formData.append('type', this.state.orgType);
    }
    if (this.state.country) {
      formData.append('country', this.state.country);
    }
    if (this.state.contactNum) {
      formData.append('contact_number', this.state.contactNum);
    }
    if (this.state.siteUrl) {
      formData.append('site_url', this.state.siteUrl);
    }
    if (this.state.address) {
      formData.append('address', this.state.address);
    }
    if (this.state.contactEmail) {
      formData.append('contact_email', this.state.contactEmail);
    }
    if (this.state.notes) {
      formData.append('notes', this.state.notes);
    }
    if (this.state.status) {
      formData.append('status', this.state.status);
    }
    if (this.state.file) {
      formData.append('logo', this.state.file);
    }

    const self = this;
    // Post
    axios.post(config.ORG_URL, formData, {headers: self.state.header})
      .then(res => {
        if (res.status === 200 && res.data.responseCode === 0) {
          toast.info('New Program Provider added');
          /* ReactDOM.render('New ProgramProvider added', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-success'); */
          self.setState({name: '', serviceArea: '', subGeographicCoverage: '', orgType: '', country: '', contactNum: '', siteUrl: '', address: '', contactEmail: '', notes: '', status: '', file: ''});
          self.removeMessageAndRedirect();
          self.setState({disabled: ''});
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
        self.setState({disabled: ''});
      });
  }

  removeMessageAndRedirect() {
    const self = this;
    self.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
      self.props.history.push(PROGRAM_PROVIDERS);
    }, 3000);
  }
  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }
  handleCancel() {
    this.props.history.push(PROGRAM_PROVIDERS);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <ToastContainer/>
        <Row>
          <Col xs="12" md="3"/>
          <Col xs="12" md="6">
            <Card>
              <Form method="post" onSubmit={this.handleCreateOrg} encType="multipart/form-data">
                <CardHeader>
                  <strong>Add Program Provider</strong>
                </CardHeader>
                <CardBody>
                  <Alert color="white" id="validationMessage"/>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id">ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="id" placeholder="" readOnly/>
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
                      <Label htmlFor="serviceArea">Service Area</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="serviceArea" id="serviceArea" onChange={this.handleChange} required >
                        {this.state.serviceAreaOptionItems}
                      </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="geographicCoverage">Geographic Coverage</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="geographicCoverage" id="geographicCoverage" onChange={this.handleChange} >
                        { this.state.geographicOptionItems }
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="subGeo">Sub Geographic Coverage</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="subGeo" value={this.state.subGeographicCoverage} name="subGeo" placeholder="" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="orgType">Program Provider Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="orgType" value={this.state.orgType} name="orgType" onChange={this.handleChange} placeholder=""/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="country">Country</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="country" value={this.state.country} name="country" placeholder="" onChange={this.handleChange}/>
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
                      <Label htmlFor="contactNum">Contact Number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="contactNum" value={this.state.contactNum} name="contactNum" placeholder="" onChange={this.handleChange}/>
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
                      <Label htmlFor="contactEmail">Contact Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="contactEmail" value={this.state.contactEmail} name="contactEmail" placeholder="" onChange={this.handleChange}/>
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
                </CardBody>
                <CardFooter>
                  <Button type="submit" disabled={this.state.disabled === 'disable'} className={this.state.disabled} color="primary"><i className="fa fa-dot-circle-o"/> Submit</Button>{' '}
                  {/* <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"/> Publish</Button> */}
                  <Button type="reset" onClick={this.handleCancel} color="danger"><i className="fa fa-ban"/> Cancel</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddProgramProvider;

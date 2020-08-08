import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {
  Row,
  Alert,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap';
// Import SmartDataTable from 'react-smart-data-table';
import config from '../../config';
import {getAuthHeader, logout} from '../../auth';
import {ToastContainer, toast} from 'react-toastify';
import {PROGRAM_PROVIDERS} from '../../constants/pathConstants';

/* eslint react/no-deprecated: 0 */

class EditProgramProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      disabled: '',
      geographicCoverage: config.GEO_COVERAGES,
      serviceAreaOptions: config.SERVICE_AREA_OPTIONS,
      geographicOptionItems: '',
      serviceAreaOptionItems: '',
      orgId: this.props.match.params.id,
      orgData: {},
      header: getAuthHeader()
    };
    //    This.OrgData = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateOrg = this.handleCreateOrg.bind(this);
    this.removeMessageAndRedirect = this.removeMessageAndRedirect.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.getDetails();
    const geoOptionItems = this.state.geographicCoverage.map(opt => {
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

  getDetails() {
    const self = this;
    axios.get(config.ORG_URL + '/' + this.state.orgId, {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          // Self.instituteData = response.data.payload.institution;
          self.setState({orgData: response.data.payload});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
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

    const {orgData} = this.state;
    const newOrgData = Object.assign({}, orgData, {
      [name]: value
    });

    this.setState({
      orgData: newOrgData
    });
  }

  handleCreateOrg(event) {
    event.preventDefault();
    this.setState({disabled: 'disable'});
    const formData = new FormData();
    if (this.state.orgData.organization_en) {
      formData.append('organization_en', this.state.orgData.organization_en);
    }
    if (this.state.orgData.geo_coverage) {
      formData.append('geo_coverage', this.state.orgData.geo_coverage);
    }
    // service_area is an required field
    if (this.state.orgData.service_area) {
      formData.append('service_area', this.state.orgData.service_area);
    } else {
      formData.append('service_area', 'Global/International');  
    }
    if (this.state.orgData.sub_geo_coverage) {
      formData.append('sub_geo_coverage', this.state.orgData.sub_geo_coverage);
    }
    if (this.state.orgData.type) {
      formData.append('type', this.state.orgData.type);
    }
    if (this.state.orgData.country) {
      formData.append('country', this.state.orgData.country);
    }
    if (this.state.orgData.contact_number) {
      formData.append('contact_number', this.state.orgData.contact_number);
    }
    if (this.state.orgData.site_url) {
      formData.append('site_url', this.state.orgData.site_url);
    }
    if (this.state.address) {
      formData.append('address', this.state.orgData.address);
    }
    if (this.state.orgData.contact_email) {
      formData.append('contact_email', this.state.orgData.contact_email);
    }
    if (this.state.orgData.notes) {
      formData.append('notes', this.state.orgData.notes);
    }
    if (this.state.orgData.status) {
      formData.append('status', this.state.orgData.status);
    }
    if (this.state.file) {
      formData.append('logo', this.state.file);
    }

    const self = this;
    axios.post(config.ORG_URL + '/' + this.props.match.params.id, formData, {headers: self.state.header})
      .then(res => {
        if (res.status === 200 && res.data.responseCode === 0) {
          toast.info('Program Provider edited');
          /* ReactDOM.render('ProgramProvider edited', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-success'); */
          self.removeMessageAndRedirect();
          self.setState({disabled: ''});
        } else {
          console.log(res)
          toast.warn('ERROR!!!Something went wrong');
          self.setState({disabled: ''});
        }
      })
      .catch(err => {
        console.log(err)
        toast.warn('ERROR!!!Something went wrong');
        /* ReactDOM.render('Something Went Wrong', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger'); */
        self.removeMessage();
        self.setState({disabled: ''});
        console.log('ERROR!!!Something went wrong', err);
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
                  <strong>Edit Program Provider</strong>
                </CardHeader>
                <CardBody>
                  <Alert color="white" id="validationMessage"/>
                  <div id="validationMessage"/>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id">ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="id" value={this.state.orgData._id} readOnly/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" placeholder="" name="organization_en" value={this.state.orgData.organization_en || ' '} onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="serviceArea">Service Area</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="service_area" id="service_area" value={this.state.orgData.service_area || ' '} onChange={this.handleChange} >
                        {this.state.serviceAreaOptionItems}
                      </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="geographicCoverage">Geographic Coverage</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="geo_coverage" id="geographicCoverage" value={this.state.orgData.geo_coverage || ' '} onChange={this.handleChange} >
                        { this.state.geographicOptionItems }
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="subGeo">Sub Geographic Coverage</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="subGeo" name="sub_geo_coverage" value={this.state.orgData.sub_geo_coverage || ' '} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="orgType">Program Provider Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="orgType" name="type" onChange={this.handleChange} value={this.state.orgData.type || ' '}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="country">Country</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="country" name="country" value={this.state.orgData.country || ' '} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address">Address</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="address" name="address" value={this.state.orgData.address || ' '} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="contactNum">Contact Number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="contactNum" name="contact_number" value={this.state.orgData.contact_number || 0} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="siteUrl">Site Url</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="url" id="siteUrl" name="site_url" value={this.state.orgData.site_url || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="contactEmail" name="contact_email" value={this.state.orgData.contact_email || ''} onChange={this.handleChange}/>
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
                  <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" color="primary"><i className="fa fa-dot-circle-o"/> Submit</Button>{' '}
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

export default EditProgramProvider;

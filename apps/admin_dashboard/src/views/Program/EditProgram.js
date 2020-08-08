import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FilteredMultiSelect from 'react-filtered-multiselect';
import axios from 'axios';
import Select from 'react-select';
import {
  Alert,
  Row,
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

const BOOTSTRAP_CLASSES = {
  filter: 'form-control',
  select: 'form-control',
  button: 'btn btn btn-block btn-default',
  buttonActive: 'btn btn btn-block btn-primary'
};
import {getAuthHeader, logout} from '../../auth';
import {ToastContainer, toast} from 'react-toastify';
import config from '../../config';
import {PROGRAMS} from '../../constants/pathConstants';
/* eslint react/no-deprecated: 0 */

class EditProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      institutions: [],
      programData: {},
      orgOptions: [],
      sportsOptions: [],
      programOptions: config.PROG_TYPE,
      sportsOptionItems: '',
      orgOptionItems: '',
      programOptionItems: '',
      header: getAuthHeader(),
      disabled: ''
    };
    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createProgram = this.createProgram.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.handleValidateAndSubmit = this.handleValidateAndSubmit.bind(this);
    this.getDetails = this.getDetails.bind(this);
    this.getOrgList = this.getOrgList.bind(this);
    this.createOrgOptions = this.createOrgOptions.bind(this);
    this.removeMessageAndRedirect = this.removeMessageAndRedirect.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.getInstitutes = this.getInstitutes.bind(this);
    //   This.createInstituteOptions = this.createInstituteOptions.bind(this);
    this.getSports = this.getSports.bind(this);
    this.handleChangeProgramProvider = this.handleChangeProgramProvider.bind(this);
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.getOrgList();
    // This.getInstitutes();
    this.getDetails();
    this.getSports();

    /* Const sportsOption = this.state.sportsOptions.map(opt => {
      if (this.state.programData.sport_id === opt.id) {
        return <option key={opt.id} value={opt.id} selected>{opt.name}</option>;
      }
      return <option key={opt.id} value={opt.id}>{opt.name}</option>;
    });
    this.setState({
      sportsOptionItems: sportsOption
    }); */

    const programOption = this.state.programOptions.map(progOpt => {
      if (this.state.programData.type === progOpt.value) {
        return <option key={progOpt.value} value={progOpt.key} selected>{progOpt.value}</option>;
      }
      return <option key={progOpt.value} value={progOpt.key}>{progOpt.value}</option>;
    });
    this.setState({
      programOptionItems: programOption
    });
  }
  getSports() {
    const self = this;
    axios.get(config.GET_SPORTS, {headers: this.state.header})
      .then(response => {
        if (response.data.payload) {
          const sportsOptions = response.data.payload.sports;
          const sportsOptionItems = sportsOptions.map(sportType => {
            if (sportType.isActive === 'Y') {
              return <option key={sportType.id} value={sportType.id}>{sportType.name}</option>;
            }
          });
          self.setState({sportsOptions, sportsOptionItems});
        }
      })
      .catch(error => {
        console.error('Error---', error);
      });
  }
  getOrgList() {
    const self = this;
    axios.get(config.ORG_URL, {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({orgOptions: response.data.payload});
          self.createOrgOptions();
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  getInstitutes() {
    const self = this;
    axios.get(config.INSTITUTE_URL, {headers: this.state.header})
      .then(response => {
        if (response.data.payload) {
          self.setState({institutions: response.data.payload});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  createOrgOptions() {
    const orgOptionItems = this.state.orgOptions.map((orgOpt, key) => {
      return {value: orgOpt._id, label: orgOpt.organization_en, key};
    });

    this.setState({options: orgOptionItems});
  }

  handleChangeProgramProvider(selected) {
    this.setState({
      selectedProgramProvider: selected
    });
  }
  getDetails() {
    const self = this;
    axios.get(config.PROG_URL + '/' + this.props.match.params.id, {headers: this.state.header})
      .then(response => {
        if (response.data.payload) {
          const programData = response.data.payload.program;
          self.setState({programData});
          if (programData) {
            this.setState({selectedProgramProvider: {label: programData.organization_en, value: programData.organization_id}});
          }
          self.setState({institutions: response.data.payload.institutions}, () =>
            self.setOptions(response.data.payload.institutions));
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  setOptions(options) {
    const selectedOptions = [];
    options.forEach(option => {
      if (this.state.programData.institutes && this.state.programData.institutes.includes(option._id)) {
        selectedOptions.push({_id: option._id, institution_en: option.institution_en});
      }
    });
    this.setState({selectedOptions});
  }

  handleDeselect(deselectedOptions) {
    const selectedOptions = this.state.selectedOptions.slice();
    deselectedOptions.forEach(option => {
      selectedOptions.splice(selectedOptions.indexOf(option), 1);
    });
    this.setState({selectedOptions});
  }
  handleSelect(selectedOptions) {
    selectedOptions.sort((a, b) => a.id - b.id);
    this.setState({selectedOptions});
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const {programData} = this.state;
    const newProgData = Object.assign({}, programData, {
      [name]: value
    });

    this.setState({
      programData: newProgData
    });
  }

  handleValidateAndSubmit(event) {
    event.preventDefault();
    this.setState({disabled: 'disable'});
    const isValid = true;
    /* If (this.state.selectedOptions.length === 0) {
      isValid = false;
      ReactDOM.render('Pleace select an Instite', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
      this.removeMessage();
      this.setState({disabled: ''});
    } */
    if (isValid) {
      this.createProgram();
    }
  }

  createProgram() {
    const formData = new FormData();
    for (let j = 0; j < this.state.selectedOptions.length; j++) {
      // Institutions.push(this.state.selectedOptions[j]._id);
      formData.append('institutes[]', this.state.selectedOptions[j]._id);
    }
    if (this.state.programData.program_en) {
      formData.append('program_en', this.state.programData.program_en);
    }
    if (this.state.selectedProgramProvider && this.state.selectedProgramProvider.value) {
      formData.append('organization_id', this.state.selectedProgramProvider.value);
    }
    if (this.state.programData.service_area) {
      formData.append('service_area', this.state.programData.service_area);
    }
    if (this.state.programData.type) {
      formData.append('type', this.state.programData.type);
    }
    if (this.state.programData.sport_id) {
      formData.append('sport_id', this.state.programData.sport_id);
    }
    if (this.state.programData.prerequisite) {
      formData.append('prerequisite', this.state.programData.prerequisite);
    }
    if (this.state.programData.eligibility_criteria) {
      formData.append('eligibility_criteria', this.state.programData.eligibility_criteria);
    }
    if (this.state.programData.age) {
      formData.append('age', this.state.programData.age);
    }
    if (this.state.programData.duration) {
      formData.append('duration', this.state.programData.duration);
    }
    if (this.state.programData.notes) {
      formData.append('notes', this.state.programData.notes);
    }
    if (this.state.programData.location) {
      formData.append('location', this.state.programData.location);
    }
    if (this.state.programData.site_url) {
      formData.append('site_url', this.state.programData.site_url);
    }
    if (this.state.file) {
      formData.append('logo', this.state.file);
    }

    const self = this;
    // Post

    axios.post(config.PROG_URL + '/' + this.props.match.params.id, formData, {headers: this.state.header})
      .then(res => {
        if (res.status === 200 && res.data.responseCode === 0) {
          toast.info('Program Edited Successfully');
          /* ReactDOM.render('Program Edited Successfully', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-success'); */
          self.removeMessageAndRedirect();
          self.setState({disabled: ''});
        } else {
          toast.warn('ERROR!!!Something went wrong');
          self.setState({disabled: ''});
        }
      })
      .catch(err => {
        /* ReactDOM.render('Something Went Wrong', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger'); */
        toast.warn('ERROR!!!Something went wrong');
        self.setState({disabled: ''});
        self.removeMessage();
        console.log('ERROR!!!Something went wrong', err);
      });
  }

  handleCancel() {
    this.props.history.push(PROGRAMS);
  }

  removeMessageAndRedirect() {
    const self = this;
    self.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
      self.props.history.push(PROGRAMS);
    }, 3000);
  }

  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <ToastContainer/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>

              <Form onSubmit={this.handleValidateAndSubmit} encType="multipart/form-data">

                <CardHeader>
                  <strong>Edit Program</strong>
                </CardHeader>
                <CardBody>
                  <Alert color="white" id="validationMessage"/>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="id">ID</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" name="id" value={this.state.programData._id} readOnly/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="program_en">Name</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" name="program_en" value={this.state.programData.program_en || ''} onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="organization_id">Program Provider</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Select
                        name="_id"
                        placeholder="Select Program Provider"
                        value={this.state.selectedProgramProvider}
                        onChange={this.handleChangeProgramProvider}
                        options={this.state.options}
                        searchable
                        clearable
                        required
                      />
                      {/*  <Input type="select" name="organization_id" id="organization_id" onChange={this.handleChange} required>
                        {this.state.orgOptionItems}
                      </Input> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label >Institution</Label>
                    </Col>
                    <Col xs="12" md="5">

                      <div>
                        <FilteredMultiSelect
                          buttonText="Add"
                          classNames={BOOTSTRAP_CLASSES}
                          onChange={this.handleSelect}
                          options={this.state.institutions}
                          selectedOptions={this.state.selectedOptions}
                          textProp="institution_en"
                          valueProp="_id"
                        />
                      </div>
                      <FormText >Press Ctrl to select multiple</FormText>
                    </Col>
                    <Col xs="12" md="5">
                      <div >
                        <FilteredMultiSelect
                          buttonText="Remove"
                          classNames={{
                            filter: 'form-control',
                            select: 'form-control',
                            button: 'btn btn btn-block btn-default',
                            buttonActive: 'btn btn btn-block btn-danger'
                          }}
                          onChange={this.handleDeselect}
                          options={this.state.selectedOptions}
                          textProp="institution_en"
                          valueProp="_id"
                        />
                      </div>

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="type">Program Type</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="select" name="type" id="progType" value={this.state.programData.type || ''}onChange={this.handleChange} required >
                        { this.state.programOptionItems }
                      </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="sport_id">Sport</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="select" name="sport_id" id="sport" value={this.state.programData.sport_id || ''} onChange={this.handleChange} >
                        { this.state.sportsOptionItems }
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="prerequisite" >Prerequisite</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="prerequisite" name="prerequisite" value={this.state.programData.prerequisite || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="eligibility">Eligibility Criteria</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="eligibility" name="eligibility" value={this.state.programData.eligibility || ''} onChange={this.handleChange} placeholder=""/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="age">Age</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="number" id="age" name="age" value={this.state.programData.age || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="duration">Duration</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="duration" name="duration" value={this.state.programData.duration || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="location">Location</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="location" name="location" value={this.state.programData.location || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="site_url">Site Url</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="url" id="site_url" name="site_url" value={this.state.programData.site_url || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="notes">Notes</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="notes" name="notes" value={this.state.programData.notes || ''} onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="file-input">Logo</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="file" id="file-input" name="file-input" onChange={this.handleChange}/>
                      <FormText >Preferred size 240px X 240px</FormText>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" color="success" > Submit</Button>{' '}
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

export default EditProgram;

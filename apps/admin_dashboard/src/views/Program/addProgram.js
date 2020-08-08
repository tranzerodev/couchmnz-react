import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FilteredMultiSelect from 'react-filtered-multiselect';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
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
import {ToastContainer, toast} from 'react-toastify';
import config from '../../config';
import {PROGRAMS} from '../../constants/pathConstants';

/* eslint react/no-deprecated: 0 */

class AddProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      institutions: [],
      orgOptions: [],
      sportsOptions: [],
      programOptions: config.PROG_TYPE,
      sportsOptionItems: '',
      orgOptionItems: '',
      programOptionItems: '',
      header: getAuthHeader(),
      disabled: '',
      progType: 'certificate'
    };
    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createProgram = this.createProgram.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.handleValidateAndSubmit = this.handleValidateAndSubmit.bind(this);
    this.removeMessageAndRedirect = this.removeMessageAndRedirect.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getOrgList = this.getOrgList.bind(this);
    this.createOrgOptions = this.createOrgOptions.bind(this);
    this.handleChangeProgramProvider = this.handleChangeProgramProvider.bind(this);

    this.getInstitutes = this.getInstitutes.bind(this);
    //   This.createInstituteOptions = this.createInstituteOptions.bind(this);
    this.getSports = this.getSports.bind(this);
  }

  componentWillMount() {
    this.getSports();
  }
  componentDidMount() {
    this.getOrgList();
    this.getInstitutes();

    /* Const sportsOption = this.state.sportsOptions.map(opt => {
      return <option key={opt.id} value={opt.id}>{opt.name}</option>;
    });
    this.setState({
      sportsOptionItems: sportsOption
    }); */

    const programOption = this.state.programOptions.map(progOpt => {
      return <option key={progOpt.value} value={progOpt.key} >{progOpt.value}</option>;
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
      headers: self.state.header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({orgOptions: response.data.payload});
          self.createOrgOptions();
        }
      })
      .catch(error => {
        console.error('Org Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  getInstitutes() {
    const self = this;
    axios.get(config.INSTITUTE_URL, {
      headers: self.state.header
    })
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
  handleChangeProgramProvider(selected) {
    this.setState({
      selectedProgramProvider: selected
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
  handleCancel() {
    this.props.history.push(PROGRAMS);
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
    const institutions = [];
    const formData = new FormData();
    for (let j = 0; j < this.state.selectedOptions.length; j++) {
      // Institutions.push(this.state.selectedOptions[j]._id);
      formData.append('institutes[]', this.state.selectedOptions[j]._id);
    }

    const programPayload = {
      id: this.state.id,
      name: this.state.name,
      org: this.state.orgType,
      institute: institutions,
      programType: this.state.progType,
      sport: this.state.sports,
      prerequisite: this.state.prerequisite,
      eligibility: this.state.eligibility,
      age: this.state.age,
      duration: this.state.duration,
      location: this.state.location,
      siteUrl: this.state.siteUrl,
      notes: this.state.notes
    };
    if (this.state.name) {
      formData.append('program_en', this.state.name);
    }
    if (this.state.selectedProgramProvider && this.state.selectedProgramProvider.value) {
      formData.append('organization_id', this.state.selectedProgramProvider.value);
    }
    // If(this.state.selectedOptions)
    //   formData.append('institutes[]', JSON.stringify(institutions));
    if (this.state.progType) {
      formData.append('type', this.state.progType);
    }
    if (this.state.sports) {
      formData.append('sport_id', this.state.sports);
    }
    if (this.state.prerequisite) {
      formData.append('prerequisite', this.state.prerequisite);
    }
    if (this.state.eligibility) {
      formData.append('eligibility_criteria', this.state.eligibility);
    }
    if (this.state.age) {
      formData.append('age', this.state.age);
    }
    if (this.state.duration) {
      formData.append('duration', this.state.duration);
    }
    if (this.state.notes) {
      formData.append('notes', this.state.notes);
    }
    if (this.state.location) {
      formData.append('location', this.state.location);
    }
    if (this.state.siteUrl) {
      formData.append('site_url', this.state.siteUrl);
    }
    if (this.state.file) {
      formData.append('logo', this.state.file);
    }

    const self = this;
    // Post
    //   const header = auth.
    axios.post(config.PROG_URL, formData, {headers: this.state.header})
      .then(res => {
        if (res.status === 200 && res.data.responseCode === 0) {
          self.setState({name: '', orgType: '', progType: '', sports: '', prerequisite: '', eligibility: '', age: '', duration: '', location: '', siteUrl: '', notes: ''});
          toast.info('Program added Successfully');
          /* ReactDOM.render('Program added Successfully', document.getElementById('validationMessage'));
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
        self.removeMessage();
        console.log('ERROR!!!Something went wrong', err);
        toast.warn('ERROR!!!Something went wrong');
        self.setState({disabled: ''});
      });
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
                  <strong>Add Program</strong>
                </CardHeader>
                <CardBody>
                  <Alert color="white" id="validationMessage"/>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="id">ID</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" name="id" placeholder="" readOnly/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" value={this.state.name} placeholder="" name="name" onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="orgType">Program Provider</Label>
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
                      />
                      {/*  <Input type="select" name="orgType" id="orgType" onChange={this.handleChange} required>
                        <option value=""/>
                        {this.state.orgOptionItems}
                      </Input> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label>Institution</Label>
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
                      <Label htmlFor="progType">Program Type</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="select" name="progType" id="progType" onChange={this.handleChange} required >
                        { this.state.programOptionItems }
                      </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="sports">Sport</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="select" value={this.state.sports} name="sports" id="sports" onChange={this.handleChange} >
                        <option value="">Select Sport </option>
                        { this.state.sportsOptionItems }
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="prerequisite" >Prerequisite</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="prerequisite" value={this.state.prerequisite} name="prerequisite" placeholder="" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="eligibility">Eligibility Criteria</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="eligibility" value={this.state.eligibility} name="eligibility" onChange={this.handleChange} placeholder=""/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="age">Age</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="number" id="age" value={this.state.age} name="age" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="duration">Duration</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="duration" value={this.state.duration} name="duration" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="location">Location</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="location" value={this.state.location} name="location" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="siteUrl">Site Url</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="url" id="siteUrl" value={this.state.siteUrl} name="siteUrl" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="notes">Notes</Label>
                    </Col>
                    <Col xs="12" md="5">
                      <Input type="text" id="notes" value={this.state.notes} name="notes" onChange={this.handleChange}/>
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

export default AddProgram;

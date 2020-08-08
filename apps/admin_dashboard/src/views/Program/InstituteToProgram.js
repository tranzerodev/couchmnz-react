import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FilteredMultiSelect from 'react-filtered-multiselect';
import axios from 'axios';
const queryString = require('query-string');
import {getAuthHeader, logout} from '../../auth';
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

class AddInstituteToProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parsed: queryString.parse(props.location.search),
      selectedOptions: [],
      programId: this.props.match.params.id,
      institutions: [],
      enrolledInstitutes: [],
      header: getAuthHeader(),
      disabled: ''
    };
    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAssignInstitute = this.handleAssignInstitute.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.getInstitutes = this.getInstitutes.bind(this);
    this.getProgList = this.getProgList.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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

  componentDidMount() {
    this.getInstitutes();
    this.getProgList();
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
  getProgList() {
    let url;
    const header = getAuthHeader();
    if (this.state.parsed && this.state.parsed.orgid) {
      url = config.PROG_URL + '/' + this.state.programId;
      const self = this;
      axios.get(url, {headers: header})
        .then(response => {
          if (response.data.payload) {
            self.setState({enrolledInstitutes: response.data.payload.institutions});
            self.getFilteredList();
          }
        })
        .catch(error => {
          console.error('Error---', error);
          if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
            logout();
          }
        });
    }
  }
  getFilteredList() {
    const {institutions} = this.state;
    const {enrolledInstitutes} = this.state;
    const filteredInstitutions = institutions.filter(val => enrolledInstitutes.find(arr => arr._id !== val._id));
    this.setState({institutions: filteredInstitutions});
  }
  handleAssignInstitute() {
    this.setState({disabled: 'disable'});

    const {enrolledInstitutes} = this.state;
    const newarr = enrolledInstitutes;
    if (this.state.selectedOptions.length) {
      for (let j = 0; j < this.state.selectedOptions.length; j++) {
        newarr.push(this.state.selectedOptions[j]);
      }
      const newFilteredArr = Array.from(new Set(newarr));
      this.setState({enrolledInstitutes: newFilteredArr});
      // Console.log("Called Create");
      const formData = new FormData();
      for (let j = 0; j < newFilteredArr.length; j++) {
      // Institutions.push(this.state.selectedOptions[j]._id);
        formData.append('institutes[]', newFilteredArr[j]._id);
      }
      formData.append('program_en', this.state.parsed.prog);
      formData.append('organization_id', this.state.parsed.orgid);
      formData.append('type', this.state.parsed.type);

      const self = this;
      // Post
      axios.post(config.PROG_URL + '/' + self.state.programId, formData, {headers: self.state.header})
        .then(res => {
          if (res.status === 200 && res.data.responseCode === 0) {
            toast.info('Program Added Successfully');
            console.log('Response :: ', res);
            /* ReactDOM.render('Program Added Successfully', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-success'); */
            self.removeMessage();
            self.setState({disabled: '', selectedOptions: ''});
            self.timerVar = setTimeout(() => {
              self.props.history.push(PROGRAMS);
            }, 3000);
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
    } else {
      ReactDOM.render('Please Select an Institution', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
      this.removeMessage();
      this.setState({disabled: ''});
    }
  }

  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }
  handleCancel() {
    this.props.history.push(PROGRAMS);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <ToastContainer/>
        <Row>
          <Col xs="12" md="3"/>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Institution</strong>
              </CardHeader>
              <CardBody>
                <Alert color="white" id="validationMessage"/>
                {/* <div id="validationMessage" > </div> */}
                <Form action="" method="post" encType="multipart/form-data">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id">ID</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="id" value={this.props.match.params.id} readOnly/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="progName">Program Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" placeholder="" name="progName" value={this.state.parsed.prog} readOnly/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="progType">Program Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="progType" id="progType" value={this.state.parsed.type} readOnly/>

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="orgType">Program Provider</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="orgType" id="orgType" value={this.state.parsed.org} readOnly/>

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label >Program Provider</Label>
                    </Col>
                    <Col xs="12" md="4">
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
                    <Col xs="12" md="4">
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

                </Form>
              </CardBody>
              <CardFooter>
                <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" color="primary" onClick={this.handleAssignInstitute} ><i className="fa fa-dot-circle-o"/> Save</Button> {' '}
                <Button type="reset" onClick={this.handleCancel} color="danger"><i className="fa fa-ban"/> Cancel</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddInstituteToProgram;

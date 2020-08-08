import React, {Component} from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import {getAuthHeader, logout} from '../../auth';

import axios from 'axios';
import {
  Alert,
  Table,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import config from '../../config';
import {ToastContainer, toast} from 'react-toastify';
import {INSTITUTIONS} from '../../constants/pathConstants';

class AddProgramToInstitute extends Component {
  constructor(props) {
    super(props);
    this.state = {

      options: [],
      selectedOption: '',
      progList: <tr><td colSpan="9">No data</td></tr>,
      programArr: [],
      AllprogramArr: [],
      header: getAuthHeader(),
      disabled: ''
    };

    this.HandleChange = this.HandleChange.bind(this);
    //    This.createInstitute = this.createInstitute.bind(this);
    this.getProgramList = this.getProgramList.bind(this);
    this.displayPrograms = this.displayPrograms.bind(this);
    this.handleRemoveProgram = this.handleRemoveProgram.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleAddProgram = this.handleAddProgram.bind(this);
    this.getAllProgramList = this.getAllProgramList.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.handleSubmitProgram = this.handleSubmitProgram.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.getProgramList();
    this.getAllProgramList();
  }

  getProgramList() {
    const self = this;
    const header = this.state.header;
    axios.get(config.INSTITUTE_URL + '/' + self.props.match.params.id + '/programs', {
      headers: header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({programArr: response.data.payload.programs});
          self.setState({institutionId: response.data.payload._id});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  getAllProgramList() {
  // Axios get for all programs. store it in state;

  // On success call generateOptions

    const self = this;

    axios.get(config.PROG_URL, {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({AllprogramArr: response.data.payload});
          self.generateOptions(self.state.AllprogramArr);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  generateOptions(progArr) {
    const {AllprogramArr} = this.state;
    const filteredProgramArray = AllprogramArr.filter(program => this.state.programArr.includes(program._id));
    this.setState({filteredProgramArray});

    const option = progArr.map((prog, key) => {
      return {value: prog._id, label: prog.program_en, key};
    });

    this.setState({options: option});
  }

  handleRemoveProgram(e) {
    const {programArr} = this.state;
    const filteredArray = programArr.filter(item => item._id !== e.target.value);
    this.setState({programArr: filteredArray});
  }

  handleSubmitProgram() {
    this.setState({disabled: 'disable'});
    if (this.state.programArr.length) {
      for (let i = 0; i < this.state.programArr.length; i++) {
        const programPayload = {
          program_en: this.state.programArr[i].program_en,
          organization_id: this.state.programArr[i].organization_id,
          institutes: [this.state.institutionId],
          type: this.state.programArr[i].type,
          _id: this.state.programArr[i]._id
        };
        const self = this;
        // Post
        axios.post(config.PROG_URL + '/' + programPayload._id, programPayload, {
          headers: this.state.header
        })
          .then(res => {
            console.log(res);
            toast.dismiss();
            toast.info('Successfully Institution added');
            this.setState({disabled: '', selectedOption: ''});
          })
          .catch(err => {
            /* ReactDOM.render('Something Went Wrong', document.getElementById('validationMessage'));
            document.getElementById('validationMessage').classList.add('alert-danger'); */
            self.removeMessage();
            toast.info('ERROR!!!Something went wrong');
            console.log('ERROR!!!Something went wrong', err);
            this.setState({disabled: ''});
          });
      }
    } else {
      ReactDOM.render('Please Select Program', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
      this.removeMessage();
      this.setState({disabled: ''});
    }
  }

  handleAddProgram() {
    const selectedId = this.state.selectedOption;
    if (selectedId && selectedId.value) {
      const arr = this.state.programArr;
      const AllPrograms = this.state.AllprogramArr;

      let value;
      let alreadyExist = false;
      // Check if program already Exists
      for (let j = 0; j < arr.length; j++) {
        if (arr[j]._id === selectedId.value) {
          alreadyExist = true;
        }
      }
      if (alreadyExist) {
        ReactDOM.render('Program Already Added ', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger');
        this.removeMessage();
      } else {
        for (let i = 0; i < AllPrograms.length; i++) {
          if (AllPrograms[i]._id === selectedId.value) {
            value = AllPrograms[i];
            break;
          }
        }
        if (value) {
          arr.push(value);
          this.setState({programArr: arr, selectedOption: ''});
          this.displayPrograms(this.state.programArr);
        }
      }
    }
  }

  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }

  HandleChange(event) {

  }

  displayPrograms() {
    const {programArr} = this.state;
    return (
      <tbody>
        {
          programArr.map((prog, key) =>
            (
              <tr key={prog._id} >
                <td>{key + 1}</td>
                <td>{prog.program_en}</td>
                <td>{prog.type}</td>
                <td>{prog.organization_en}</td>
                <td> <Button color="danger" value={prog._id} onClick={this.handleRemoveProgram}>Remove</Button></td>
              </tr>
            )
          )
        }
      </tbody>
    );
  }
  handleSelectChange(selected) {
    this.setState({
      selectedOption: selected
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
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Institution</strong>
              </CardHeader>
              <CardBody>
                <Alert color="white" id="validationMessage"/>
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
                      <Label htmlFor="name">Institution Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="name" value={this.props.match.params.name} readOnly/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address">Programs</Label>
                    </Col>
                    <Col xs="12" md="9"/>
                  </FormGroup>

                  <FormGroup row>
                    <Col xs="12" md="12">
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Program Name</th>
                            <th>Type</th>
                            <th>Program Provider</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        {
                          this.displayPrograms()
                        }
                      </Table>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="8">
                      <Select
                        name="selectedId"
                        value={this.state.selectedOption}
                        onChange={this.handleSelectChange}
                        options={this.state.options}
                      />
                    </Col>
                    <Col xs="12" md="4">
                      <Button color="success" onClick={this.handleAddProgram}>Add</Button>
                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" disabled={this.state.disabled === 'disable'} className={this.state.disabled} color="primary" onClick={this.handleSubmitProgram} ><i className="fa fa-dot-circle-o"/> Save</Button>{' '}
                <Button type="reset" color="danger" onClick={this.handleCancel}><i className="fa fa-ban"/> Cancel</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddProgramToInstitute;

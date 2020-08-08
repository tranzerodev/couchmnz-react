import React, {Component} from 'react';
import {Row, Col, Card, CardHeader, CardBody, Button, Table, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import 'react-select/dist/react-select.css';
import config from '../../config';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';
import {ADD_PROGRAM_TO_INSTITUTIONS, EDIT_INSTITUTIONS, ADD_INSTITUTIONS} from '../../constants/pathConstants';

class Institution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instituteList: null,
      instituteArr: [],
      header: getAuthHeader(),
      loaded: false
    };
    this.getInstituteList = this.getInstituteList.bind(this);
    this.displayInstitute = this.displayInstitute.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.getInstituteList();
  }

  componentWillUnmount() {

  }

  getInstituteList() {
    const self = this;
    const header = getAuthHeader();
    axios.get(config.INSTITUTE_URL, {headers: header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({instituteArr: response.data.payload, loaded: true}, () => {
            self.displayInstitute(self.state.instituteArr);
          });
        } else {
          self.setState({instituteArr: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({instituteArr: [], loaded: true});
        }
      });
  }

  displayInstitute(instituteArr) {
    const institute = instituteArr.map((ins, key) => {
      return (
        <tr key={ins._id} >
          <td>{key + 1}</td>
          <td>{ins.institution_en}</td>
          <td><Link to={ADD_PROGRAM_TO_INSTITUTIONS.replace(':id', ins._id).replace(':name', ins.institution_en)}>{ins.programs.length} </Link> </td>
          <td><Link to={ADD_PROGRAM_TO_INSTITUTIONS.replace(':id', ins._id).replace(':name', ins.institution_en)} value={{insId: ins._id}}> <Button color="success">Add Program</Button></Link>
            <Link to={EDIT_INSTITUTIONS.replace(':id', ins._id)} > <Button color="primary">Edit</Button></Link>
          </td>
        </tr>
      );
    });

    this.setState({instituteList: institute});
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
  handleSearch() {
    const self = this;
    this.setState({loaded: false});
    let url;
    if (this.state.searchText.trim()) {
      url = config.SEARCH_INSTITUTE_URL + this.state.searchText;
    } else {
      url = config.SEARCH_INSTITUTE_URL;
    }
    axios.get(url, {
      headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({instituteArr: response.data.payload, loaded: true});
          self.displayInstitute(self.state.instituteArr);
        } else {
          self.setState({instituteArr: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({instituteArr: [], loaded: true});
        }
      });
  }
  render() {
    const {instituteList, instituteArr, loaded} = this.state;
    return (
      <div className="animated fadeIn">

        <div className="row">
          <Col xs="12" md="2"/>
          <div className="col-lg-4">
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" placeholder="Search for..." aria-label="Search for..." onKeyDown={this.handleKeyPress} onChange={this.handleChange}/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
              </span>
            </div>
          </div>

          <div className="col-lg-4" align="right">
            <Link to={ADD_INSTITUTIONS} > <Button color="primary">Add Institution</Button></Link>
          </div>

        </div>
        <br/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/> Institution List
              </CardHeader>
              <CardBody>
                {(instituteArr.length === 0 && loaded === true) ?
                  <Alert color="warning">
                    No data found
                  </Alert> :
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Programs Offered</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instituteList}
                    </tbody>

                  </Table>
                }
              </CardBody>
            </Card>

            {/* <Card>
         <CardHeader>
                <i className="fa fa-align-justify"></i> Instiution List
        </CardHeader>
        <CardBody>
        <ReactTable
          data={this.state.instituteArr}
          noDataText="No data Available!"
          columns={[

                {
                  Header: "Id",
                  accessor: "_id",
                  Cell: ({ value }) => (<div className="alignCenter">{value}</div>),
                 // sortable: false
                },
                {
                    Header: "Name",
                    accessor: "program_en",
                    Cell: ({ value }) => (<div className="alignCenter">{value}</div>)
                  },
                  {
                    Header: "Programs Offered",
                    accessor: "type",
                    Cell: ({ value }) => (<div className="alignCenter">{value}</div>)
                  },
                  {
                    Header: "Actions",
                    accessor: "",
                    Cell: ({ value }) => (<td><Link to={'/institutions/addProgram/'+ data._id.value + '/' + data.program_en.value }  > <Button color="success">Add Program</Button></Link>
        <Link to={'/institution/edit/'+ data._id.value  }  > <Button color="primary">Edit</Button></Link>
    </td>)
                  }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        </CardBody>
        </Card> */}
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Institution;

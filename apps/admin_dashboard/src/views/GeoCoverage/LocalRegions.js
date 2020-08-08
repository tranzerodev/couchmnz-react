import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getAuthHeader, logout} from '../../auth';
import axios from 'axios';
import Select from 'react-select';
import FilteredMultiSelect from 'react-filtered-multiselect';
import {ToastContainer, toast} from 'react-toastify';
import Modal from '../../components/Modal';
import Loader from 'react-loader';

import {
  Alert,
  Table,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap';
import config from '../../config';

import ReactPaginate from 'react-paginate';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: '',
      options: [],
      selectedOptions: [],
      selectedOption: '',
      localregion_en: '',
      selectedCountryOption: '',
      selectedStateOption: '',
      stateOptions: [],
      stateArr: [],
      worldRegionArr: [],
      countryArr: [],
      cityArr: [],
      localRegArr: [],
      header: getAuthHeader(),
      city_en: '',
      countryId: null,
      regionId: null,
      stateId: null,
      cityId: null,
      localRegionId: null,
      defaultPage: config.DEFAULT_PAGE,
      pageCount: config.DEFAULT_PAGE_COUNT,
      itemsPerPage: config.ITEMS_PER_PAGE,
      itemStart: 0,
      value: [],
      selectedCities: [],
      removeSelected: false,
      currentPage: 0,
      toggleWorldModal: false,
      toggleCountryModal: false,
      selection: '',
      toggleRemoveConfirmModal: false,
      searchText: '',
      loaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRegionList = this.getRegionList.bind(this);
    this.displayLocalRegion = this.displayLocalRegion.bind(this);
    this.handleEditLocalRegion = this.handleEditLocalRegion.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCountrySelectChange = this.handleCountrySelectChange.bind(this);
    this.handleStateSelectChange = this.handleStateSelectChange.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
    this.getStateList = this.getStateList.bind(this);
    this.getLocalRegionList = this.getLocalRegionList.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.generateCoveredCityOptions = this.generateCoveredCityOptions.bind(this);
    this.getCityList = this.getCityList.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
    this.handleDelCoveredCities = this.handleDelCoveredCities.bind(this);
    this.handleToggleCountryModal = this.handleToggleCountryModal.bind(this);
    this.handleCountryConfirm = this.handleCountryConfirm.bind(this);
    this.handleToggleWorldModal = this.handleToggleWorldModal.bind(this);
    this.handleWorldConfirm = this.handleWorldConfirm.bind(this);
    this.handleToggleRemoveConfirmModal = this.handleToggleRemoveConfirmModal.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.getRegionList();
    this.getLocalRegionList(this.state.defaultPage);
    // Remove later
    // this.generateOptions();
    // this.generateCountryOptions();
    // this.generateStateOptions();
  }
  handleOnFocus(e) {
    this.setState({localRegionId: e.target.id});
  }
  handleMultiSelectChange(value) {
    this.setState({value});
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.getLocalRegionList(this.state.defaultPage);
    }
  }
  handleSearch() {
    this.getLocalRegionList(this.state.defaultPage);
  }
  getLocalRegionList(pageNum) {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.LOCAL_REGION_URL + '?limit=50&page=' + pageNum + (this.state.selectedOption && this.state.selectedOption.value ? '&worldRegionId=' + this.state.selectedOption.value : '') + (this.state.selectedCountryOption && this.state.selectedCountryOption.value ? '&countryId=' + this.state.selectedCountryOption.value : '') + (this.state.selectedStateOption && this.state.selectedStateOption.value ? '&stateId=' + this.state.selectedStateOption.value : '') + (this.state.searchText ? '&q=' + this.state.searchText.trim() : ''), {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({localRegArr: response.data.payload.data});
          self.setState({pageCount: response.data.payload.last_page});
          self.setState({itemsPerPage: response.data.payload.per_page});
          self.setState({itemStart: response.data.payload.from});
          self.setState({loaded: true});
        } else {
          self.setState({loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({loaded: true});
        }
      });
  }
  getRegionList() {
    const self = this;
    axios.get(config.WORLD_REGION_URL, {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({worldRegionArr: response.data.payload});
          self.generateOptions();
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }
  
  handleDelete(e) {
    const localRegionId = e.target.value
    const url = config.LOCAL_REGION_ID_URL.replace('{id}', localRegionId)
    console.log('url',url)
    axios.delete(url, {
      headers: this.state.header
    })
    this.getLocalRegionList(this.state.currentPage);

  }
  
  handleEditLocalRegion(e) {
    const {localRegArr} = this.state;
    const localRegionId = e.target.value;
    const localRegObj = localRegArr.find(item => item._id === localRegionId);
    this.getCountryList(localRegObj.worldregion_id);
    this.setState({
      localregion_en: localRegObj.localregion_en,
      localRegionId: localRegObj._id,
      countryId: localRegObj.countryid,
      selectedCities: localRegObj.covered_cityid,
      cityArr: [],
      stateArr: [],
      selectedOption: {value: localRegObj.worldregionid, label: localRegObj.worldregion_en},
      selectedCountryOption: {value: localRegObj.countryid, label: localRegObj.country_en}
    }, () => {
      this.getStateList(localRegObj.countryid);
      this.getLocalRegionList(this.state.defaultPage);
    });
    // This.createCityList(localRegObj.countryid, localRegObj.covered_cityid);
  }
  handleToggleRemoveConfirmModal(e) {
    if (this.state.value.length) {
      this.setState({
        toggleRemoveConfirmModal: !this.state.toggleRemoveConfirmModal,
        localRegionId: e.target.value ? e.target.value : this.state.localRegionId
      });
    }
  }
  handleDelCoveredCities() {
    if (this.state.value.length) {
      this.setState({disabled: 'disable', loaded: false});
      const {localRegArr} = this.state;
      const localRegionId = this.state.localRegionId;
      const localRegObj = localRegArr.find(item => item._id === localRegionId);

      const removedCity = this.state.value.split(',');
      let coveredCity = localRegObj.covered_cityid;
      const coveredCities = [];
      coveredCity = coveredCity.filter(val => !removedCity.includes(val.id));
      for (let i = 0; i < coveredCity.length; i++) {
        coveredCities.push(coveredCity[i].id);
      }
      const payload = {
        localregion_en: localRegObj.localregion_en,
        countryid: localRegObj.countryid,
        covered_cityid: coveredCities
      };
      const self = this;
      axios.put(config.LOCAL_REGION_URL + '/' + localRegObj._id, payload, {
        headers: self.state.header
      })
        .then(res => {
          console.log(res);
          if (res.data.responseCode === 0) {
            self.setState({localregion_en: '', localRegionId: null, value: '', disabled: '', loaded: true});
            self.getLocalRegionList();
            toast.dismiss();
            toast.info('Successfully Removed');
          } else {
            toast.dismiss();
            toast.warn('ERROR!!!Something went wrong');
          }
          self.setState({disabled: '', loaded: true});
        })
        .catch(err => {
          ReactDOM.render('Something Went Wrong. Please Try again', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-danger');
          self.setState({region_en: '', localRegionId: null, disabled: '', loaded: true});
          self.removeMessage();
          console.error('ERROR!!!Something went wrong', err);
        });
    }
    this.setState({
      toggleRemoveConfirmModal: !this.state.toggleRemoveConfirmModal
    });
  }

  createCityList(countryId, coveredArr) {
    const self = this;
    const header = self.state.header;
    // For Country
    const url = config.COUNTRY_URL + '/' + countryId + '/cities';
    axios.get(url, {
      headers: header
    })
      .then(response => {
        if (response.data.payload) {
          if (response.data.payload.length) {
            if (coveredArr.length) {
              const filteredArray = response.data.payload.filter(val => coveredArr.find(arr => arr.id !== val._id));
              self.setState({cityArr: filteredArray});
            } else {
              self.setState({cityArr: response.data.payload});
            }
          }
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  handlePageClick(event) {
    const page = event.selected + 1;
    this.setState({currentPage: page});
    this.getLocalRegionList(page);
  }

  handleSubmit(event) {
    this.setState({disabled: 'disable', loaded: false});
    event.preventDefault();
    const coveredCity = [];
    let url;

    if (this.state.localRegionId) {
      // Call edit
      url = config.LOCAL_REGION_URL + '/' + this.state.localRegionId;
      for (let i = 0; i < this.state.selectedCities.length; i++) {
        coveredCity.push(this.state.selectedCities[i].id);
      }
      if (this.state.selectedOptions) {
        for (let i = 0; i < this.state.selectedOptions.length; i++) {
          coveredCity.push(this.state.selectedOptions[i]._id);
        }
      }
      const arrUnique = Array.from(new Set(coveredCity));
      //  CoveredCity.filter((item, index, self) => self.indexOf(item) === index);
      const payload = {
        localregion_en: this.state.localregion_en,
        countryid: this.state.countryId,
        covered_cityid: arrUnique
      };
      const self = this;
      axios.put(url, payload, {
        headers: self.state.header
      })
        .then(res => {
          console.log(res);
          if (res.data.responseCode === 0) {
            self.setState({localregion_en: '', localRegionId: null, selectedOptions: '', selectedOption: '', countryId: '', arrUnique, selectedCountryOption: '', selectedStateOption: '', cityArr: '', localRegionId: ''});
            self.getLocalRegionList(self.state.currentPage);
            toast.info('Local Region edited!');
          } else {
            toast.warn('ERROR!!!Something went wrong');
          }
          self.setState({disabled: '', loaded: true});
        })
        .catch(err => {
          toast.warn('ERROR!!!Something went wrong');
          self.setState({localregion_en: '', localRegionId: null});
          console.error('ERROR!!!Something went wrong', err);
          self.setState({disabled: '', loaded: true});
        });
    } else if (this.state.selectedOptions.length) {
      url = config.LOCAL_REGION_URL;
      const countryId = this.state.selectedOptions[0].countryid;
      for (let i = 0; i < this.state.selectedOptions.length; i++) {
        coveredCity.push(this.state.selectedOptions[i]._id);
      }
      const arrUnique = Array.from(new Set(coveredCity));

      const payload = {
        localregion_en: this.state.localregion_en,
        countryid: countryId,
        covered_cityid: arrUnique
      };
      const self = this;
      axios.post(url, payload, {
        headers: self.state.header
      })
        .then(res => {
          console.log(res);
          if (res.data.responseCode === 0) {
            self.setState({localregion_en: '', localRegionId: null, selectedOptions: '', selectedOption: '', countryId: '', arrUnique, selectedCountryOption: '', selectedStateOption: '', cityArr: '', localRegionId: ''});
            self.getLocalRegionList(self.state.currentPage);
            toast.info('Local Region added!');
          } else {
            toast.warn('ERROR!!!Something went wrong');
          }
          self.setState({disabled: '', loaded: true});
        })
        .catch(err => {
          toast.warn('ERROR!!!Something went wrong');
          self.setState({localregion_en: '', localRegionId: null});
          console.error('ERROR!!!Something went wrong', err);
          self.setState({isDisabled: '', loaded: true});
        });
    } else {
      ReactDOM.render('Please Select atleast one city', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
      this.removeMessage();
      self.setState({isDisabled: '', loaded: true});
    }
  }

  generateOptions() {
    const option = this.state.worldRegionArr.map((region, key) => {
      return {value: region._id, label: region.worldregion_en, key};
    });

    this.setState({options: option});
  }
  generateCountryOptions() {
    const option = this.state.countryArr.map((country, key) => {
      return {value: country._id, label: country.country_en, key};
    });

    this.setState({countryOptions: option});
  }
  generateStateOptions() {
    const option = this.state.stateArr.map((state, key) => {
      return {value: state._id, label: state.state_en, key};
    });

    this.setState({stateOptions: option});
  }
  generateCoveredCityOptions(coveredArr) {
    return coveredArr.map((opt, key) => {
      return {value: opt.id, label: opt.city_en, key};
    });
  }
  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  displayLocalRegion() {
    const {localRegArr} = this.state;
    let start = this.state.itemStart;
    //  Const isDel = Boolean(this.state.value.length);
    return (
      <tbody>
        {

          localRegArr.map(region =>
            (
              <tr key={region._id} >
                <td>{start++}</td>
                <td>{region.country_en}</td>
                <td>{region.localregion_en}</td>
                <td>
                  {/* <Select
                    name="_id"
                    placeholder="View / Search"
                    options={this.generateCoveredCityOptions(region.covered_cityid)}
                  /> */}
                  <Select
                    multi
                    id={region._id}
                    onChange={this.handleMultiSelectChange}
                    options={this.generateCoveredCityOptions(region.covered_cityid)}
                    placeholder="view / Delete  "
                    removeSelected={this.state.removeSelected}
                    rtl={this.state.rtl}
                    simpleValue
                    value={this.state.value}
                    onFocus={this.handleOnFocus}
                  />
                  <Button disabled={this.state.disabled === 'disable' || (!this.state.value) || (this.state.value && this.state.value.length <= 0) || (region._id !== this.state.localRegionId)} className={this.state.disabled} color="danger" value={region._id} onClick={this.handleToggleRemoveConfirmModal}>Remove Selected from Covered Cities</Button>
                </td>
                <td>
                <Button color="primary" value={region._id} onClick={this.handleEditLocalRegion}>Edit Local Region Name</Button>
                <br />
                <Button color="primary" value={region._id} onClick={this.handleDelete}>Delete Local Region</Button>
                </td>
              </tr>
            )
          )
        }
      </tbody>
    );
  }

  handleSelectChange(selected) {
    // Const selectedOptions = this.state.selectedOptions.splice(0, this.state.selectedOptions.length);
    // const stateArr = this.state.stateArr.splice(0, this.state.stateArr.length);
    // const cityArr = this.state.cityArr.splice(0, this.state.cityArr.length);
    // const countryArr = this.state.countryArr.splice(0, this.state.countryArr.length);
    // this.setState({selectedOptions: []});
    if (selected && this.state.selectedOptions.length) {
      this.setState({toggleWorldModal: !this.state.toggleWorldModal, selection: selected});
    } else {
      this.setState({stateArr: [],
        countryArr: [],
        cityArr: [],
        selectedOption: selected,
        selectedCountryOption: '',
        selectedStateOption: ''}, () => {
        this.generateStateOptions();
        this.generateCountryOptions();
        this.getLocalRegionList(this.state.defaultPage);
      });

      if (selected) {
        this.getCountryList(selected.value);
      }
    }
  }
  handleToggleWorldModal() {
    this.setState({toggleWorldModal: !this.state.toggleWorldModal});
  }
  handleWorldConfirm() {
    const selected = this.state.selection;
    this.setState({stateArr: [],
      countryArr: [],
      cityArr: [],
      selectedOption: selected,
      selectedCountryOption: '',
      selectedOptions: [],
      selectedStateOption: ''}, () => {
      this.generateStateOptions();
      this.generateCountryOptions();
      this.getLocalRegionList(this.state.defaultPage);
    });
    if (selected) {
      this.getCountryList(selected.value);
    }
    this.setState({toggleWorldModal: !this.state.toggleWorldModal});
  }
  handleCountrySelectChange(selected) {
    // Const selectedOptions = this.state.selectedOptions.splice(0, this.state.selectedOptions.length);
    // const stateArr = this.state.stateArr.splice(0, this.state.stateArr.length);
    // const cityArr = this.state.cityArr.splice(0, this.state.cityArr.length);
    if (selected && this.state.selectedOptions.length) {
      this.setState({toggleCountryModal: !this.state.toggleCountryModal, selection: selected});
    } else {
      this.setState({
      // SelectedOptions: [],
        stateArr: [],
        cityArr: [],
        selectedCountryOption: selected,
        selectedStateOption: ''
      }, () => {
        this.generateStateOptions();
        this.getLocalRegionList(this.state.defaultPage);
      });
      if (selected) {
        this.setState({countryId: selected.value});
        this.getStateList(selected.value);
      }
    }
  }
  handleToggleCountryModal() {
    this.setState({toggleCountryModal: !this.state.toggleCountryModal});
  }
  handleCountryConfirm() {
    const selected = this.state.selection;
    this.setState({
      // SelectedOptions: [],
      stateArr: [],
      cityArr: [],
      selectedOptions: [],
      selectedCountryOption: selected,
      selectedStateOption: ''
    }, () => {
      this.generateStateOptions();
      this.getLocalRegionList(this.state.defaultPage);
    });
    if (selected) {
      this.setState({countryId: selected.value});
      this.getStateList(selected.value);
    }
    this.setState({toggleCountryModal: !this.state.toggleCountryModal});
  }
  handleStateSelectChange(selected) {
    // This.setState({selectedOptions: []});
    this.setState({cityArr: [],
      selectedStateOption: selected}, () => {
      this.getLocalRegionList(this.state.defaultPage);
    });
    if (selected) {
      this.getCityList(selected.value, true);
    }
  }
  getCountryList(regionId) {
    const self = this;
    axios.get(config.WORLD_REGION_URL + '/' + regionId + '/countries', {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({countryArr: response.data.payload});
          self.generateCountryOptions();
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }
  getStateList(countryId) {
    const self = this;
    axios.get(config.COUNTRY_URL + '/' + countryId + '/states', {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          if (response.data.payload.length) {
            self.setState({stateArr: response.data.payload});
            self.generateStateOptions();
          } else {
            self.setState({stateArr: []});
            self.getCityList(countryId, false);
          }
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }
  getCityList(id, isState) {
    let url;
    const header = this.state.header;
    const self = this;

    if (isState) {
      // For state
      url = config.STATE_URL + '/' + id + '/cities';
    } else {
      // For Country
      url = config.COUNTRY_URL + '/' + id + '/cities';
    }
    axios.get(url, {
      headers: header
    })
      .then(response => {
        if (response.data.payload) {
          if (response.data.payload.length) {
            self.setState({cityArr: response.data.payload});
          }
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }
  handleDeselect(deselectedOptions) {
    const selectedOptions = this.state.selectedOptions.slice();
    deselectedOptions.forEach(option => {
      selectedOptions.splice(selectedOptions.indexOf(option), 1);
    });
    this.setState({selectedOptions});
  }
  handleSelect(selectedOptions) {
    if (selectedOptions && selectedOptions.length) {
      selectedOptions.sort((a, b) => a.id - b.id);
      this.setState({selectedOptions});
    }
  }
  render() {
    const isAdd = !this.state.localRegionId;
    return (
      <div className="animated fadeIn">
        <ToastContainer/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Local Regions </strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="4"/>
                  <div className="col-lg-8">
                    <div className="input-group">
                      <input type="text" className="form-control" name="searchText" placeholder="Search for..." aria-label="Search for..." onKeyDown={this.handleKeyPress} onChange={this.handleChange}/>
                      <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
                      </span>
                    </div>
                  </div>
                </Row>
                <Alert color="white" id="validationMessage"/>
                <Form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                  <FormGroup row>
                    <Col md="4">
                      <Select
                        name="_id"
                        placeholder="Select world region"
                        value={this.state.selectedOption}
                        onChange={this.handleSelectChange}
                        options={this.state.options}
                      />
                    </Col>
                    <Col md="4">
                      <Select
                        name="_id"
                        placeholder="Select country"
                        value={this.state.selectedCountryOption}
                        onChange={this.handleCountrySelectChange}
                        options={this.state.countryOptions}
                      />
                    </Col>
                    <Col md="4">
                      <Select
                        name="_id"
                        placeholder="Select state"
                        value={this.state.selectedStateOption}
                        onChange={this.handleStateSelectChange}
                        options={this.state.stateOptions}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label >Assign Cities</Label>
                    </Col>
                    <Col xs="12" md="4">

                      <div>
                        <FilteredMultiSelect
                          buttonText="Add"
                          classNames={{
                            filter: 'form-control',
                            select: 'form-control',
                            button: 'btn btn btn-block btn-default',
                            buttonActive: 'btn btn btn-block btn-danger'
                          }}
                          onChange={this.handleSelect}
                          options={this.state.cityArr}
                          selectedOptions={this.state.selectedOptions}
                          textProp="city_en"
                          valueProp="_id"
                        />
                      </div>
                      <FormText>City List</FormText>
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
                          textProp="city_en"
                          valueProp="_id"
                        />
                      </div>
                      <FormText >Covered Cities</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="localregion_en">Local Region Name</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <Input type="text" placeholder="Local Region" name="localregion_en" value={this.state.localregion_en} onChange={this.handleChange} required/>
                    </Col>
                    <Col xs="12" md="3">
                      <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"/> {isAdd ? 'Add' : 'Save'}</Button>
                    </Col>
                  </FormGroup>
                </Form>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Country</th>
                      <th>Local Region</th>
                      <th>Covered Cities</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {
                    this.displayLocalRegion()
                  }
                </Table>
                {this.state.localRegArr.length > 0 ?
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={this.state.itemsPerPage}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  /> : null}
              </CardBody>
            </Card>
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.toggleWorldModal}
          className="modal-info"
          onToggle={this.handleToggleWorldModal}
          onConfirm={this.handleWorldConfirm}
          onCancel={this.handleToggleWorldModal}
          content="If you change the World region, Seleted City will be cleared!"
          header="Are you sure?"
          cancelText="No"
          confirmText="Yes"
        />
        <Modal
          isOpen={this.state.toggleCountryModal}
          className="modal-info"
          onToggle={this.handleToggleCountryModal}
          onConfirm={this.handleCountryConfirm}
          onCancel={this.handleToggleCountryModal}
          content="If you change the Country, Seleted City will be cleared!"
          header="Are you sure?"
          cancelText="No"
          confirmText="Yes"
        />
        <Modal
          isOpen={this.state.toggleRemoveConfirmModal}
          className="modal-danger"
          onToggle={this.handleToggleRemoveConfirmModal}
          onConfirm={this.handleDelCoveredCities}
          onCancel={this.handleToggleRemoveConfirmModal}
          content="Are you sure to remove selected covered cities?"
          header="Remove Covered City"
          cancelText="No"
          confirmText="Yes"
        />
      </div>
    );
  }
}
export default City;

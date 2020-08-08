import React, {Component} from 'react';
import {Row, Col, Card, CardBody, Table, Input, CardHeader, Label, FormGroup, Alert, Button, UncontrolledTooltip} from 'reactstrap';
import config from '../../config';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';
import {ToastContainer, toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import moment from 'moment';
import p from '../../locale/enUs.json';
import {APP_USER_PROFILE, APP_USER} from '../../constants/pathConstants';
/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class FlaggedSSP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: getAuthHeader(),
      loaded: false,
      profileId: '',
      historyList: [],
      sspDetail: {},
      isProfileActive: null,
      isAccountActive: null,
      notes: '',
      sports: [],
      isDisable: true
    };
    this.getFlaggedSSPDetails = this.getFlaggedSSPDetails.bind(this);
    this.getFlaggedHistory = this.getFlaggedHistory.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  componentWillMount() {
    this.setState({profileId: this.props.match.params.id});
  }
  componentDidMount() {
    this.getFlaggedSSPDetails();
    this.getFlaggedHistory();
  }
  handleRadioClick(e) {
    this.setState({sports: []});
    const {value} = e.target;
    if (value === 'account') {
      this.setState({isAccountActive: 'N', isProfileActive: 'Y', isDisable: false});
    } else if (value === 'profile') {
      this.setState({isAccountActive: 'Y', isProfileActive: 'N', isDisable: false});
    }
  }
  handleCheckChange(e) {
    this.setState({isAccountActive: 'Y', isProfileActive: 'Y'});
    const {value, checked} = e.target;
    const {sports} = this.state;
    if (checked) {
      this.setState({isDisable: false});
      if (!sports.includes(value)) {
        sports.push(value);
      }
    } else if (sports.includes(value)) {
      sports.splice(sports.indexOf(value), 1);
      if (sports.length === 0) {
        this.setState({isDisable: true});
      }
    }
    this.setState({sports});
  }
  handleChange(e) {
    this.setState({notes: e.target.value});
  }
  getFlaggedHistory() {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.FLAGGED_HISTORY.replace('{profileId}', this.state.profileId), {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({historyList: response.data.payload,
            loaded: true});
        } else {
          self.setState({historyList: [], loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({historyList: [], loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      });
  }
  getFlaggedSSPDetails() {
    const {profileId} = this.state;
    const self = this;
    self.setState({loaded: false});
    axios.get(config.FLAGGED_SSP.replace('{profileId}', profileId), {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          const sspDetail = response.data.payload;
          self.setState({sspDetail,
            userId: sspDetail.userId,
            isAccountActive: sspDetail.isAccountActive,
            isProfileActive: sspDetail.isProfileActive,
            loaded: true});
        } else {
          self.setState({sspDetail: {}, loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({sspDetail: {}, loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      });
  }
  handleConfirm() {
    const {profileId, isAccountActive, isProfileActive, sports, sspDetail, notes} = this.state;
    const self = this;
    const sportList = sspDetail && sspDetail.sports && sspDetail.sports.map(sport => {
      if (sports.includes(sport.id)) {
        return {id: sport.id,
          isActive: 'N'};
      }
      return {id: sport.id,
        isActive: 'Y'};
    });
    const payload = {
      isAccountActive,
      isProfileActive,
      sports: sportList,
      notes
    };
    self.setState({loaded: false, isDisable: true});
    axios.put(config.FLAGGED_SSP.replace('{profileId}', profileId), payload, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          self.setState({disabled: false, notes: '', sports: [], isDisable: true});
          self.getFlaggedSSPDetails();
          self.getFlaggedHistory();
          toast.dismiss();
          toast.info(p.Reports.flaggedSSP.disableSuccess);
        } else {
          self.setState({sspDetail: {}, loaded: true, isDisable: false});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
          self.getFlaggedSSPDetails();
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({sspDetail: {}, loaded: true, isDisable: false});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      });
  }
  render() {
    const {sspDetail, historyList, profileId, userId, loaded, isDisable} = this.state;
    const histories = historyList && historyList.map((history, key) => {
      return (
        <tr key={key++}>
          <td>{moment(history.date).format(p.Reports.flaggedSSP.dateFormat)}</td>
          <td>{history.actionTakenBy ? (<span>{p.Reports.flaggedSSP.actiontakenBy} <span className="profile-view-link"> {history.actionTakenBy} </span><br/></span>) : null} {history.reason}</td>
          <td>{history.actionTaken}</td>
        </tr>
      );
    });
    /*  Console.log(' isAccountActive', isAccountActive);
    console.log(' isProfileActive', isProfileActive);
    console.log(' sports.length', sports.length);
    const isDisable = (isAccountActive === 'Y' && isProfileActive === 'Y' && sports && sports.length === 0); */
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        {/* eslint complexity: 0  */}
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        <Loader loaded={this.state.loaded} className="spinner"/>
        <Card style={{borderRadius: '10px'}}>
          <CardBody>
            <Row>
              {sspDetail ?
                <Col lg="8">
                  <Row>
                    <Col style={{textAlign: 'center'}} >
                      <div className="profile-view">
                        <h4 id="name"><Link to={APP_USER_PROFILE.replace(':id', userId).replace(':profileId', profileId)}>{sspDetail.name}</Link></h4>
                        <UncontrolledTooltip target="name">View Profile</UncontrolledTooltip>
                        <img src={sspDetail.profileImgUrl} style={{maxHeight: '200px'}}/>
                        <br/>
                        <Row>
                          <Col>
                            {sspDetail.isAccountActive === 'Y' ? <b className="active"> Active </b> : <b className="inactive">Inactive</b>}<br/>
                            <span>account</span>
                          </Col>
                          <Col>
                            {sspDetail.isProfileActive === 'Y' ? <b className="active"> Active </b> : <b className="inactive">Inactive</b>}<br/>
                            <span>profile</span>
                          </Col>
                        </Row>
                        <Row>
                          {sspDetail && sspDetail.sports && sspDetail.sports.map((sport, key) => {
                            return (
                              <Col key={key++}>
                                {sport.isActive === 'Y' ? <b className="active"> Active </b> : <b className="inactive">Inactive</b>}<br/>
                                <span>{sport.name}</span>
                              </Col>
                            );
                          })}
                        </Row>
                      </div>
                    </Col>
                    <Col>
                      <div className="profile-ctrl">
                        <ul>
                          <li>
                            {sspDetail.canDisableAccount === 'Y' ?
                              <FormGroup check className="radio">
                                <Input className="form-check-input" type="radio" id="account" name="profile" checked={this.state.isAccountActive === 'N'} value="account" onClick={this.handleRadioClick}/>
                                <Label check className="form-check-label" htmlFor="account">{p.Reports.flaggedSSP.disableCompleteAccount}</Label>
                              </FormGroup> :
                              <FormGroup check className="radio">
                                <Input className="form-check-input" type="radio" id="profile" name="profile" value="account" disabled/>
                                <Label check className="form-check-label" htmlFor="account">{p.Reports.flaggedSSP.disableCompleteAccount}</Label>
                              </FormGroup>}
                          </li>
                          <li>
                            {sspDetail.canDisableProfile === 'Y' ?
                              <FormGroup check className="radio">
                                <Input className="form-check-input" type="radio" id="profile" name="profile" checked={this.state.isProfileActive === 'N'} value="profile" onClick={this.handleRadioClick}/>
                                <Label check className="form-check-label" htmlFor="profile">{p.Reports.flaggedSSP.disableISPProfile}</Label>
                              </FormGroup> :
                              <FormGroup check className="radio">
                                <Input className="form-check-input" type="radio" id="profile" name="profile" value="profile" disabled/>
                                <Label check className="form-check-label" htmlFor="profile">{p.Reports.flaggedSSP.disableISPProfile}</Label>
                              </FormGroup>}
                          </li>
                          <li>
                            <ul>
                              {sspDetail && sspDetail.sports && sspDetail.sports.map((sport, key) => {
                                return (
                                  <li key={key++}>
                                    {sport.canDisable === 'Y' ?
                                      <FormGroup check className="checkbox">
                                        <Input className="form-check-input" type="checkbox" id={sport.id} checked={this.state.sports.includes(sport.id)} name="sports" value={sport.id} onChange={this.handleCheckChange}/>
                                        <Label check className="form-check-label" htmlFor="checkbox1"> {sport.name}</Label>
                                      </FormGroup> :
                                      <FormGroup check className="checkbox">
                                        <Input className="form-check-input" type="checkbox" id={sport.id} name="sports" value={sport.id} disabled/>
                                        <Label check className="form-check-label" htmlFor="checkbox1"> {sport.name}</Label>
                                      </FormGroup>}
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                          <li>
                            <FormGroup >
                              <Label className="form-label" htmlFor="notes">{p.Reports.flaggedSSP.notes}</Label>
                              <Input className="form-input" type="textarea" id="notes" onChange={this.handleChange}/>
                            </FormGroup>
                          </li>
                          <li>
                            <FormGroup style={{textAlign: 'center'}}>
                              {isDisable === true ?
                                <Button color="primary" disabled className="disable" onClick={this.handleConfirm}>{p.Reports.flaggedSSP.confirm}</Button> :
                                <Button color="primary" onClick={this.handleConfirm}>{p.Reports.flaggedSSP.confirm}</Button>
                              }
                            </FormGroup>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Col> :
                loaded === true ?
                  <Col lg="8">
                    <Alert color="warning">
                      {p.Reports.flaggedSSP.notFound}
                    </Alert>
                  </Col> : null}
              <Col lg="4" style={{borderLeft: '1px solid', textAlign: 'center'}}>
                <div style={{marginTop: '30%'}}>
                  <h5>{p.Reports.flaggedSSP.moreAction}</h5>
                  <Link to={APP_USER.replace(':id', userId)}><button className="btn btn-primary">{p.Reports.flaggedSSP.goProfilePage}</button></Link>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <br/>
        {historyList && historyList.length > 0 ?
          <Row>
            <Col lg="1"/>
            <Col lg="10">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"/> {p.Reports.flaggedSSP.history.title}
                </CardHeader>
                <CardBody>

                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>{p.Reports.flaggedSSP.history.date}</th>
                        <th>{p.Reports.flaggedSSP.history.details}</th>
                        <th>{p.Reports.flaggedSSP.history.actionTaken}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {histories}
                    </tbody>
                  </Table>

                </CardBody>
              </Card>
            </Col>
            <Col lg="1"/>
          </Row> :
          null}
      </div>
    );
  }
}

export default FlaggedSSP;

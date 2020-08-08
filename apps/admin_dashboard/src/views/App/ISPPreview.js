import React, {Component} from 'react';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Alert} from 'reactstrap';
import classnames from 'classnames';
import Preview from './Preview';
import config from '../../config';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';
import p from '../../locale/enUs.json';

/* eslint react/no-deprecated: 0 */

class ISPPreview extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.getPreview = this.getPreview.bind(this);
    this.getTab = this.getTab.bind(this);
    this.getPrfileDetails = this.getPrfileDetails.bind(this);
    this.displayProfile = this.displayProfile.bind(this);
    this.state = {
      activeTab: '',
      userId: null,
      profileId: null,
      header: getAuthHeader(),
      loaded: false,
      sports: [],
      data: null
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.setState({userId: this.props.userId, profileId: this.props.profileId}, () => {
      this.getPrfileDetails();
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  getTab() {
    return (
      <TabPane tabId={this.state.activeTab}>
        {this.getPreview(this.state.activeTab)}
      </TabPane>
    );
  }

  getPreview(preview) {
    console.log('preview ', preview);
    if (this.state.activeTab === preview) {
      return <Preview sportId={this.state.activeTab} profile={this.state.data}/>;
    }
    return null;
  }

  displayProfile() {
    return <Preview sportId="profile" profile={this.state.data}/>;
  }

  getPrfileDetails() {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.APP_USER_ISP_PROFILE.replace('{userId}', this.state.userId).replace('{profileId}', this.state.profileId),
      {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({data: response.data.payload.profile,
            loaded: true,
            sports: response.data.payload.profile.sports});
          if (response.data.payload.profile.sports.length > 0) {
            this.setState({activeTab: response.data.payload.profile.sports[0].id}, () => {
              self.getTab();
            });
          }
        } else {
          self.setState({data: null, loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({data: null, loaded: true});
        }
      });
  }

  render() {
    const {data, loaded} = this.state;
    const {sports} = this.state;
    return (
      <div className="animated fadeIn sports">
        <Loader loaded={this.state.loaded} className="spinner"/>
        {/* eslint react/forbid-component-props: 0 */}
        {/* eslint react/jsx-no-bind: 0 */}
        <Row>
          {(loaded === true && data !== null && sports.length > 0) ?
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                {sports.map((sport, key) => {
                  return (
                    <NavItem key={key++}>
                      <NavLink
                        className={classnames({active: this.state.activeTab === sport.id})}
                        onClick={() => {
                          this.toggle(sport.id);
                        }}
                      >
                        {sport.name}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {this.getTab()}
              </TabContent>
            </Col> :
            loaded === true && data === null && sports.length === 0 ?
              <Alert color="warning">
                {p.DefaultMessages.ISPDetailsNotFound}
              </Alert> :
              loaded === true && sports && sports.length === 0 ?
                <Col xs="12" md="12" className="mb-4">
                  <TabContent>
                    <div className="tab-pane active">{this.displayProfile()}</div>
                  </TabContent>
                </Col> : null}
        </Row>
      </div>
    );
  }
}

export default ISPPreview;

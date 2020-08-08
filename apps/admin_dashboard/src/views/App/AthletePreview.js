import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, NavLink, TabPane, TabContent, Alert} from 'reactstrap';
import axios from 'axios';
import config from '../../config';
import {getAuthHeader, logout} from '../../auth';
import Preview from './View';
import p from '../../locale/enUs.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Loader from 'react-loader';
import classnames from 'classnames';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class AthletePreview extends Component {
  constructor(props) {
    super(props);
    this.handleScrollTo = this.handleScrollTo.bind(this);
    this.getAthletePrfileDetails = this.getAthletePrfileDetails.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getPreview = this.getPreview.bind(this);
    this.getTab = this.getTab.bind(this);
    this.displayProfile = this.displayProfile.bind(this);
    this.state = {
      userId: '',
      profileId: '',
      header: getAuthHeader(),
      activeTab: '',
      loaded: false,
      sports: [],
      data: null
    };
  }
  componentWillMount() {
    this.setState({userId: this.props.userId, profileId: this.props.profileId}, () => {
      this.getAthletePrfileDetails();
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleScrollTo() {
    window.scrollTo(0, 0);
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
  getAthletePrfileDetails() {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.APP_USER_ATHLETE_PROFILE.replace('{userId}', this.state.userId).replace('{profileId}', this.state.profileId),
      {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({data: response.data.payload,
            loaded: true,
            sports: response.data.payload.sports});
          if (response.data.payload.sports.length > 0) {
            this.setState({activeTab: response.data.payload.sports[0].id}, () => {
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
    /* eslint complexity: 0  */
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
                {p.DefaultMessages.AthleteDetailsNotFound}
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

export default AthletePreview;

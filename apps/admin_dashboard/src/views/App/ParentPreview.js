import React, {Component} from 'react';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Alert} from 'reactstrap';
import classnames from 'classnames';
import Children from './ParentChildren';
import config from '../../config';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';
import p from '../../locale/enUs.json';
import changeCase from 'change-case';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class ParentPreview extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.getPreview = this.getPreview.bind(this);
    this.getTab = this.getTab.bind(this);
    this.getParentDetails = this.getParentDetails.bind(this);
    this.state = {
      activeTab: '',
      userId: null,
      profileId: null,
      header: getAuthHeader(),
      loaded: false,
      children: [],
      data: null
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    this.setState({userId: this.props.userId, profileId: this.props.profileId}, () => {
      this.getParentDetails();
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({userId: nextProps.userId, profileId: nextProps.profileId});
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
    if (this.state.activeTab === preview) {
      return <Children childId={this.state.activeTab} data={this.state.data}/>;
    }
    return null;
  }

  getParentDetails() {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.APP_USER_PARENT_PROFILE.replace('{userId}', this.state.userId).replace('{profileId}', this.state.profileId),
      {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({data: response.data.payload,
            loaded: true,
            children: response.data.payload.dependents});
          if (response.data.payload.dependents.length > 0) {
            this.setState({activeTab: response.data.payload.dependents[0].id}, () => {
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
    const {children} = this.state;
    return (
      <div className="animated fadeIn children">
        <Loader loaded={this.state.loaded} className="spinner"/>
        {/* eslint react/forbid-component-props: 0 */}
        {/* eslint react/jsx-no-bind: 0 */}
        <Row>
          {(loaded === true && data !== null && children && children.length > 0) ?
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                {children.map((child, key) => {
                  return (
                    <NavItem key={key++}>
                      <NavLink
                        className={classnames({active: this.state.activeTab === child.id})}
                        onClick={() => {
                          this.toggle(child.id);
                        }}
                      >
                        {child.firstName === null && child.lastName === null ? p.Parent.child.unNamedChild : changeCase.titleCase(child.firstName) + ' ' + changeCase.titleCase(child.lastName)}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {this.getTab()}
              </TabContent>
            </Col> :
            loaded === true && data === null && children.length === 0 ?
              <Alert color="warning">
                {p.DefaultMessages.ParentDetailsNotFound}
              </Alert> :
              null}
        </Row>
      </div>
    );
  }
}

export default ParentPreview;

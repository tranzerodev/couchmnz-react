import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, NavLink, TabPane, TabContent, Alert} from 'reactstrap';
import Preview from './View';
import p from '../../locale/enUs.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classnames from 'classnames';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class ParentChildren extends Component {
  constructor(props) {
    super(props);
    this.handleScrollTo = this.handleScrollTo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getPreview = this.getPreview.bind(this);
    this.getTab = this.getTab.bind(this);
    this.displayProfile = this.displayProfile.bind(this);
    this.setChild = this.setChild.bind(this);
    this.state = {
      profileId: '',
      childId: '',
      activeTab: '',
      sports: [],
      profile: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.childId !== this.state.childId) {
      this.setState({childId: nextProps.childId}, () => {
        this.setChild();
      });
    }
    if (nextProps.data !== this.state.data) {
      this.setState({data: nextProps.data}, () => {
        this.setChild();
      });
    }
  }
  setChild() {
    const {data, childId} = this.state;
    const children = data ? data.dependents : [];
    let child;
    if (children && children.length) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].id === childId) {
          child = children[i];
        }
      }
    }
    if (child) {
      this.setState({sports: child.sports});
      const profile = child;
      profile.accountDetails = data.accountDetails;
      this.setState({profile});
      if (child.sports.length) {
        this.setState({activeTab: child.sports[0].id});
      }
    }
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
    if (this.state.activeTab === preview) {
      return <Preview sportId={this.state.activeTab} profile={this.state.profile}/>;
    }
    return null;
  }

  displayProfile() {
    return <Preview sportId={this.state.activeTab} profile={this.state.profile}/>;
  }

  render() {
    /* eslint complexity: 0  */
    const {profile, sports} = this.state;
    return (
      <div className="animated fadeIn sports">
        {/* eslint react/forbid-component-props: 0 */}
        {/* eslint react/jsx-no-bind: 0 */}
        <Row>
          {(profile !== null && sports.length > 0) ?
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
            profile === null && sports.length === 0 ?
              <Alert color="warning">
                {p.DefaultMessages.ChildDetailsNotFound}
              </Alert> :
              sports && sports.length === 0 ?
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

export default ParentChildren;

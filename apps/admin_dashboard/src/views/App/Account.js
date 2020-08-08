import React, {Component} from 'react';
import {Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import Actions from './Actions';
import Profiles from './Profiles';
import {getAuthHeader} from '../../auth';

/* eslint react/prop-types: 0 */

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      header: getAuthHeader()
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  componentWillMount() {
  }
  handleToggle(e) {
    const {id, name} = e.target;
    if (this.state.activeTab !== id) {
      this.setState({
        activeTab: id
      });
    }
  }
  componentDidMount() {
  }
  render() {
    console.log('users ', this.props.match.params.id);
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        {/* <div className="row">
          <Col xs="12" md="4"/>
          <div className="col-lg-4"/>
          <div className="col-lg-4" align="right">
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" placeholder="Search for..." aria-label="Search for..." onChange={this.handleChange}/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
              </span>
            </div>
          </div>

        </div> */}
        {/*  <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8" align="right">
            <Link to={'/users/add'} > <Button color="primary">Add Actions</Button></Link>
          </Col>
        </Row> */}
        <br/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="12">
            <Card>
              {/*  <CardHeader>
                <i className="fa fa-align-justify"/>Users
              </CardHeader> */}
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '1'})}
                      id="1"
                      name="profile"
                      onClick={this.handleToggle}
                    >
                    Profiles
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '2'})}
                      id="2"
                      name="action"
                      onClick={this.handleToggle}
                    >
                    Account Actions
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Profiles userId={this.props.match.params.id}/>
                  </TabPane>
                  <TabPane tabId="2">
                    <Actions userId={this.props.match.params.id}/>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Account;

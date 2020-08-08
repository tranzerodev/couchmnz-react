import React, {Component} from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import {logout} from '../../auth';
import config from '../../config';

class HeaderDropdown extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    logout();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropAccnt() {
    const self = this;
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img src={config.PROFILE_IMAGE_PATH} className="img-avatar" alt="img"/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={self.handleLogOut} ><i className="fa fa-lock"/> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const {...attributes} = this.props;
    return (
      this.dropAccnt()
    );
  }
}

export default HeaderDropdown;

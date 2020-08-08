import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
import nav from './_nav';
import SidebarFooter from './../SidebarFooter';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer';
import config from '../../config';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    // Return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show');
    }
  }

  // Todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    const props = this.props;

    // Badge addon to NavItem
    const badge = badge => {
      if (badge) {
        const classes = classNames(badge.class);
        return (<Badge className={classes} color={badge.variant}>{ badge.text }</Badge>);
      }
    };

    // Simple wrapper for nav-title item
    const wrapper = item => {
      return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name);
    };

    // Nav list section title
    const title = (title, key) => {
      const classes = classNames('nav-title', title.class);
      return (<li key={key} className={classes}>{wrapper(title)} </li>);
    };

    // Nav list divider
    const divider = (divider, key) => {
      const classes = classNames('divider', divider.class);
      return (<li key={key} className={classes}/>);
    };

    // Nav label with nav link
    const navLabel = (item, key) => {
      const classes = {
        item: classNames('hidden-cn', item.class),
        link: classNames('nav-label', item.class ? item.class : ''),
        icon: classNames(
          !item.icon ? 'fa fa-circle' : item.icon,
          item.label.variant ? `text-${item.label.variant}` : '',
          item.label.class ? item.label.class : ''
        )
      };
      return (
        navLink(item, key, classes)
      );
    };

    // Nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames(item.class),
        link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
        icon: classNames(item.icon)
      };
      return (
        navLink(item, key, classes)
      );
    };

    // Nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';
      return (
        <NavItem key={key} className={classes.item}>
          { isExternal(url) ?
            <RsNavLink href={url} className={classes.link} active>
              <i className={classes.icon}/>{item.name}{badge(item.badge)}
            </RsNavLink> :
            <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
              <i className={classes.icon}/>{item.name}{badge(item.badge)}
            </NavLink>
          }
        </NavItem>
      );
    };

    // Nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={this.activeRoute(item.url, props)}>
          <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}><i className={item.icon}/>{item.name}</a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>);
    };

    // Nav type
    const navType = (item, idx) =>
      item.title ? title(item, idx) :
        item.divider ? divider(item, idx) :
          item.label ? navLabel(item, idx) :
            item.children ? navDropdown(item, idx) :
              navItem(item, idx);

    // Nav list
    const role = localStorage.getItem('cl-adm-role');
    const navList = items => {
      return items.map((item, index) => {
        if (item.name === config.USER_ROUTE) {
          if (role === config.ROLE_TYPE.SUPERADMIN) {
            return navType(item, index);
          }
        } else {
          return navType(item, index);
        }
      });
    };

    const isExternal = url => {
      const link = url ? url.substring(0, 4) : '';
      return link === 'http';
    };

    // Sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader/>
        <SidebarForm/>
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
          </Nav>
        </nav>
        <SidebarFooter/>
        {/* <SidebarMinimizer/> */}
      </div>
    );
  }
}

export default Sidebar;

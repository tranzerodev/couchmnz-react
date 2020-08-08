import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import QueryString from 'query-string';
import {withRouter, matchPath} from 'react-router';

import config from '../../../../config';
import * as RouterPaths from '../../../../constants/RouterPaths';
const {messageThreadSorters} = config.messagingSystem;

class MessageThreadListSorter extends Component {
  constructor(props) {
    super(props);

    const {query} = this.props;
    const {sortby, orderby} = query;
    const defaultSortByValue = messageThreadSorters.sortby[0].value;
    const defaultOrderByValue = messageThreadSorters.orderBy[0].value;
    const threadSortBy = (sortby) ? sortby : defaultSortByValue;
    const threadOrderBy = (orderby) ? orderby : defaultOrderByValue;
    this.state = {
      sortby: threadSortBy,
      orderby: threadOrderBy
    };

    this.applyChangedSorters = this.applyChangedSorters.bind(this);
    this.renderSortByOptions = this.renderSortByOptions.bind(this);
    this.handleChangeSortByOption = this.handleChangeSortByOption.bind(this);
    this.handleChangeOrderByOption = this.handleChangeOrderByOption.bind(this);
    this.renderOrderByOptions = this.renderOrderByOptions.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {query} = newProps;
    const {sortby, orderby} = query;
    const defaultSortByValue = messageThreadSorters.sortby[0].value;
    const defaultOrderByValue = messageThreadSorters.orderBy[0].value;
    const threadSortBy = (sortby) ? sortby : defaultSortByValue;
    const threadOrderBy = (orderby) ? orderby : defaultOrderByValue;
    this.setState({
      sortby: threadSortBy,
      orderby: threadOrderBy
    });
  }

  getCurrentSubmenuURL(pathname) {
    let url = null;
    const subMenuMatch = matchPath(pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_URL, exact: false});
    if (subMenuMatch) {
      const {subMenu} = subMenuMatch.params;
      url = subMenuMatch.url;
      if (subMenu === RouterPaths.MENU_LABELS) {
        const labelsMenuMatch = matchPath(pathname, {path: RouterPaths.MESSAGES_LABEL_ROUTER_PATH, exact: false});
        if (labelsMenuMatch) {
          url = labelsMenuMatch.url;
        }
      }
    }
    return url;
  }

  applyChangedSorters(filterItem) {
    const {location, history, query} = this.props;
    const {pathname} = location;
    const updatedFilters = Object.assign({}, query, filterItem);
    const url = this.getCurrentSubmenuURL(pathname);
    if (url) {
      const search = QueryString.stringify(updatedFilters);
      history.push({
        pathname: url,
        search
      });
    }
  }

  handleChangeSortByOption(event) {
    const {dataset} = event.target;
    const sortby = dataset.value;
    this.applyChangedSorters({sortby});
  }

  handleChangeOrderByOption(event) {
    const {dataset} = event.target;
    const orderby = dataset.value;
    this.applyChangedSorters({orderby});
  }

  renderSortByOptions(sortByOption, index) {
    const {p} = this.props;
    const {displayTextKey, value} = sortByOption;
    const {sortby} = this.state;
    const className = (sortby && (sortby === value)) ? 'active' : '';
    return (
      <li key={index}><a className={className} data-value={value} onClick={this.handleChangeSortByOption}>{p.t(displayTextKey)}</a></li>
    );
  }

  renderOrderByOptions(orderByOption, index) {
    const {p} = this.props;
    const {displayTextKey, value} = orderByOption;
    const {orderby} = this.state;
    const className = (orderby && (orderby === value)) ? 'active' : '';
    return (
      <li key={index}><a className={className} data-value={value} onClick={this.handleChangeOrderByOption}>{p.t(displayTextKey)}</a></li>
    );
  }

  render() {
    const {p} = this.props;
    const sortbyOptions = messageThreadSorters.sortby;
    const orderbyOptions = messageThreadSorters.orderBy;
    const {sortby, orderby} = this.state;
    const selectedSortby = sortbyOptions.find(sortbyOption => (sortby === sortbyOption.value));
    const selectedOrderBy = orderbyOptions.find(orderbyOption => (orderby === orderbyOption.value));
    return (
      <div className="msg_messagesList-sort">
        <div className="msg_messagesList-sortLabel">{p.t('textSortBy')} </div>
        {/* <div className="msg_messagesList-dropdown uk-button-dropdown" data-uk-dropdown="{mode:'click'}">
          <a className="msg_messagesList-dropdownTrigger">{p.t(selectedSortby.displayTextKey)} <i className="cl-icon cl-icon-down"/></a>
          <div className="uk-dropdown cl-arrow-dropdown">
            <ul>
              {
                SortbyOptions.map(this.renderSortByOptions)
              }
            </ul>
          </div>
            </div> */}
        <div className="msg_messagesList-dropdown uk-float-right uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-right'}">
          {/* <!-- This is the element toggling the dropdown --> */}
          <a className="msg_messagesList-dropdownTrigger">{p.t(selectedOrderBy.value)} <i className="cl-icon cl-icon-down"/></a>
          {/* <!-- This is the dropdown --> */}
          <div className="uk-dropdown cl-arrow-dropdown cl-arrow-dropdown--right">
            <ul>
              {
                orderbyOptions.map(this.renderOrderByOptions)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

MessageThreadListSorter.defaultProps = {
  query: {}
};

MessageThreadListSorter.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  query: PropTypes.object,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};

const mapStateToProps = state => {
  const {router} = state;
  const {query} = router;

  return {
    query
  };
};

export default withRouter(translate('MessageThreadListSorter')(connect(mapStateToProps)(MessageThreadListSorter)));

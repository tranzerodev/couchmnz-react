import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, matchPath} from 'react-router-dom';
import pathToRegExp from 'path-to-regexp';
import {PATH_VARIABLE_SPORT, PATH_VARIABLE_LOCATION, SSP_SEARCH_ONLY_LOCATION, SSP_SEARCH_SPORT_LOCATION} from '../../../constants/RouterPaths';
import {getTrimmedQueryParam} from '../../../utils/sspSearchUtils';
import translate from 'redux-polyglot/translate';

export class BreadCrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleOnBreadCrumLinkClicked = this.handleOnBreadCrumLinkClicked.bind(this);
  }

  componentWillReceiveProps(newProps) {
    let fullAddress = [];
    if (newProps.address) {
      fullAddress = newProps.address.split(',').filter(item => (item.trim().length > 0));
      const locationName = fullAddress.length > 0 ? fullAddress[0] : '';
      this.props.onModifyMetaTitle(this.props.p.t('Metadata.title', {locationName}));
    }
  }

  handleOnBreadCrumLinkClicked(event) {
    const locName = event.target.dataset.value;
    const {history} = this.props;
    const {location} = history;
    const {pathname, search} = location;

    const locationName = getTrimmedQueryParam(locName);

    let changedPathname = null;
    const match = matchPath(pathname, {path: SSP_SEARCH_SPORT_LOCATION, strict: false, exact: true});
    console.log('Match location', match);
    let sportname = null;
    if (match) {
      sportname = match.params[PATH_VARIABLE_SPORT];
    }

    if (sportname) {
      const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_SPORT_LOCATION);
      changedPathname = sportLocationPath(
        {
          [PATH_VARIABLE_SPORT]: sportname,
          [PATH_VARIABLE_LOCATION]: locationName
        }
      );
    } else {
      const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_ONLY_LOCATION);
      changedPathname = sportLocationPath(
        {
          [PATH_VARIABLE_LOCATION]: locationName
        }
      );
    }
    if (changedPathname) {
      history.push({
        pathname: changedPathname,
        search
      });
    }
  }
  render() {
    let fullAddress = [];
    if (this.props.address) {
      fullAddress = this.props.address.split(',').filter(item => (item.trim().length > 0));
    }
    return (
      <ul>
        {fullAddress.reverse().map((element, index) => {
          const key = element + index;
          if (fullAddress.length === (index + 1)) {
            return <li key={key}><a data-value={element} onClick={this.handleOnBreadCrumLinkClicked}>{element}</a></li>;
          }
          return <li key={key}><a data-value={element} onClick={this.handleOnBreadCrumLinkClicked}>{element}</a><i className="fa fa-angle-right"/></li>;
        })}
      </ul>
    );
  }
}

BreadCrumbs.propTypes = {
  address: PropTypes.string,
  history: PropTypes.object.isRequired,
  onModifyMetaTitle: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};

BreadCrumbs.defaultProps = {
  address: null
};
export default translate(withRouter(BreadCrumbs));

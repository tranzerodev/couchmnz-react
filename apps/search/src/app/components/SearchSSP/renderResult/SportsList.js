import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SportsListItem from './SportsListItem';
import appConstants from '../../../constants/appConstants';
import translate from 'redux-polyglot/translate';
import {withRouter, Link} from 'react-router-dom';
import pathToRegExp from 'path-to-regexp';
import {matchPath} from 'react-router';
import {PATH_VARIABLE_SPORT, SSP_SEARCH_SPORT_LOCATION, PATH_VARIABLE_LOCATION, SSP_SEARCH_ONLY_LOCATION} from '../../../constants/RouterPaths';
import {urlPathToText, textToUrlPathString} from '../../../utils/sspSearchUtils';
import ReactPaginate from 'react-paginate';
import QueryString from 'query-string';
import {OVERLAY_NO_RESULT_FOUND} from '../../../constants/assetsPaths';
import {isJwtTokenExists} from '../../../../auth/auth';

const DROPDOWN_VALUE_SELECT = 'DROPDOWN_VALUE_SELECT';

class SportsList extends React.Component {
  constructor(props) {
    super(props);
    const query = QueryString.parse(this.props.location.search);
    const page = query && query.page ? query.page : 0;
    this.state = {
      params: {
        page
      }
    };
    this.renderSportsListItem = this.renderSportsListItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.reFilter = this.reFilter.bind(this);
    this.handleChangeSortingFilter = this.handleChangeSortingFilter.bind(this);
  }

  handlePageClick(data) {
    const page = data.selected + 1;
    const {params} = this.state;
    this.setState({
      params: {...params,
        page
      }
    }, () => this.reFilter());
  }

  reFilter() {
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    const {page} = appConstants.filterQueries;
    const pageVal = parseInt(this.state.params.page);

    const updatedFilters = Object.assign({}, query, {
      [page]: (pageVal) ? pageVal : undefined
    });

    const search = QueryString.stringify(updatedFilters);
    history.push({
      pathname,
      search
    });
  }

  handleChangeSortingFilter(event) {
    const {value} = event.target;
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    const {sortBy} = appConstants.filterQueries;

    const updatedFilters = Object.assign({}, query, {
      [sortBy]: (value === DROPDOWN_VALUE_SELECT) ? undefined : value
    });

    const search = QueryString.stringify(updatedFilters);
    history.push({
      pathname,
      search
    });
  }

  renderSportsListItem(sportItem) {
    const item = sportItem._source;
    let sportName = '';
    const sportHighlights = sportItem.highlight;
    if (sportHighlights) {
      const sportNameHighlight = sportHighlights[appConstants.searchQueryKeys.sportName];
      if (sportNameHighlight && sportNameHighlight.length > 0) {
        sportName = sportNameHighlight[0].replace(/<em>|<\/em>/g, '');
      }
    }

    return (
      <SportsListItem
        key={sportItem._id}
        id={sportItem._id}
        sportName={sportName}
        profile={item}
        sportItem={sportItem}
      />
    );
  }

  render() {
    const {searchData, p, query} = this.props;
    let totalSearchResult = 0;
    let totalPageCount = 0;
    let searchHits = [];
    if (searchData.data && searchData.data.hits && searchData.data.hits.hits) {
      searchHits = searchData.data.hits.hits;
      totalSearchResult = searchData.data.hits.total;
      totalPageCount = searchData.data.hits.total / appConstants.defaultLimit;
    }

    const sortBy = query[appConstants.filterQueries.sortBy];
    return (
      <div className="filter_content">
        <div >
          <div className="cl-sd-searchHeadingOuter">
            <div className="uk-grid">

              <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-1-1 uk-width-small-1-1 uk-width-xsmall-1 heading">
                <ul className="cl-sd-searchHeading">
                  <li><a className="active">{p.t('searchHeader.trainingFacility')}<span>{totalSearchResult}</span></a></li>
                  {/* <li><a href="#">Camps &amp; Clinics <span>12</span></a></li> */}
                </ul>
              </div>
              <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-1 uk-width-small-1-1 uk-width-xsmall-1">
                <div className="cl-results-sortbyOuter">
                  <select className="cl-results-sortby" onChange={this.handleChangeSortingFilter} value={(sortBy) ? sortBy : DROPDOWN_VALUE_SELECT}>
                    <option value={DROPDOWN_VALUE_SELECT}>{p.t('SportsList.sortBy')}</option>
                    <option value={appConstants.sortinFilterValues.priceHighToLow}>{p.t('SportsList.priceHighToLow')}</option>
                    <option value={appConstants.sortinFilterValues.priceLowToHigh}>{p.t('SportsList.priceLowToHigh')}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            {searchHits.map(this.renderSportsListItem)}
          </div>
        </div>
        {totalPageCount > 1 &&
        <div className="cl-pagination pad-t-30">
          <ReactPaginate
            forcePage={this.state.params.page - 1}
            breakLabel={<a>...</a>}
            breakClassName={'break-me'}
            pageCount={totalPageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            // ContainerClassName={'uk-pagination uk-pagination-lef'}
            activeClassName={'react-paginate-current'}
            // PageClassName={'uk-active'}
            previousClassName={this.state.params.page <= 1 ? 'react-paginate-disable' : ''}
            nextClassName={Math.ceil(totalPageCount) == this.state.params.page ? 'react-paginate-disable' : ''}
            // PreviousLinkClassName={'react-paginate-disable'}
            // nextLinkClassName={'react-paginate-disable'}
            disableInitialCallback
          />

        </div>
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      searchData: PropTypes.object.isRequired,
      discount: PropTypes.number,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      history: PropTypes.object.isRequired,
      query: PropTypes.object,
      availableSportsList: PropTypes.object
    };
  }
}
SportsList.defaultProps = {
  query: {},
  discount: 0
};

const mapStateToProps = state => {
  const {
    searchData, nearbylocation, locationLookupData,
    discounts, availableSportsList} = state;
  return {
    searchData,
    nearbylocation,
    locationLookupData,
    discount: discounts.discount,
    availableSportsList
  };
};

export default withRouter(translate(connect(mapStateToProps)(SportsList)));


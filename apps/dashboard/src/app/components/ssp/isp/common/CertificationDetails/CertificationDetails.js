import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';
import {CERTIFICATIONS, FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';
import {notNull} from '../../../../../validators/common/util';
import {fetchGenCertifications, fetchSportCertifications} from '../../../../../actions/index';

class CertificationDetails extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleType = this.handleType.bind(this);
    this.handleGenBiographyLoad = this.handleGenBiographyLoad.bind(this);
    this.handleDeleteGenCertifications = this.handleDeleteGenCertifications.bind(this);
    this.handleDeleteSportCertifications = this.handleDeleteSportCertifications.bind(this);
    this.handleSportBiographyLoad = this.handleSportBiographyLoad.bind(this);
    this.renderGenCertifications = this.renderGenCertifications.bind(this);
    this.renderSportCertifications = this.renderSportCertifications.bind(this);
  }
  handleType(e) {
    const {value} = e.target;
    console.log('handleType', 'value', value);
    this.setState({type: value});
  }

  componentDidMount() {
    if (this.props.currentSport.status === FULFILLED) {
      this.props.fetchSportCertifications({profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
    }
    if (this.props.genCertifications.status !== FULFILLED && this.props.genCertifications.status !== PENDING && this.props.genCertifications.status !== REJECTED) {
      if (this.props.profile.status === FULFILLED) {
        this.props.fetchGenCertifications({profileID: this.props.profile.data.profile.id});
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentSport.status === PENDING && nextProps.currentSport.status === FULFILLED) {
      this.props.fetchSportCertifications({profileID: this.props.profile.data.profile.id, sportID: nextProps.currentSport.data.id});
    }
  }

  handleDeleteGenCertifications(e) {
    const value = e.currentTarget.getAttribute('value');
    console.log('___ ID ___', value);
    this.props.onDeleteBiography(value, CERTIFICATIONS, CERTIFICATIONS, appConstants.no);
    // HandleDeleteBiography(id, type, subType, isSportRelated)
  }
  handleDeleteSportCertifications(e) {
    const value = e.currentTarget.getAttribute('value');
    console.log('___ ID ___', value);
    this.props.onDeleteBiography(value, CERTIFICATIONS, CERTIFICATIONS, appConstants.yes);
    // HandleDeleteBiography(id, type, subType, isSportRelated)
  }
  handleSportBiographyLoad(e) {
    const value = e.currentTarget.getAttribute('value');
    let biography = {};
    const index = this.props.certifications.data.findIndex(i => i.id === value);
    if (index >= 0) {
      biography = this.props.certifications.data[index];
    }
    if (notNull(biography)) {
      console.log(' ___ BIOGRAPHY ___ ', biography);
      this.props.onLoadBiography(biography, CERTIFICATIONS, CERTIFICATIONS, appConstants.yes);
    }
  }

  handleGenBiographyLoad(e) {
    const value = e.currentTarget.getAttribute('value');
    let biography = {};
    let index = this.props.genCertifications.data.findIndex(i => i.id === value);
    if (index >= 0) {
      biography = this.props.genCertifications.data[index];
    } else {
      index = this.props.certifications.data.findIndex(i => i.id === value);
      if (index >= 0) {
        biography = this.props.certifications.data[index];
      }
    }
    if (notNull(biography)) {
      console.log(' ___ BIOGRAPHY ___ ', biography);
      this.props.onLoadBiography(biography, CERTIFICATIONS, CERTIFICATIONS, appConstants.no);
    }
  }

  renderGenCertifications(element) {
    return (
      <div key={element.id} className="uk-grid">
        <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-8-10  uk-width-small-8-10 ">
          <div className="tableDiv">
            <div className="lCol">
              <p>
                <svg className="cl-icon-round-star" xmlns="http://www.w3.org/2000/svg" viewBox="-19369 -3075 14 14">
                  <g transform="translate(-19369 -3075)">
                    <g>
                      <circle className="cl-icon-round-star-1" cx={7} cy={7} r={7}/>
                      <path className="cl-icon-round-star-2" d="M7,9.333,4.257,10.775l.524-3.054L2.562,5.558l3.067-.446L7,2.333,8.372,5.112l3.067.446L9.219,7.721l.524,3.054Z"/>
                    </g>
                  </g>
                </svg>
              </p>
            </div>
            <div className="rCol">
              <p>{[element.year, element.name, element.institutionName]
                .filter(val => {
                  if (val) {
                    return true;
                  }
                  return false;
                })
                .join(', ')}
              </p>
            </div>
          </div>
        </div>
        <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10  uk-width-small-2-10 uk-text-right">
          <p>
            {element.id.length === 24 &&
            <a value={element.id}>
              &nbsp;
            </a>
            }
            {element.id.length !== 24 &&
            <a value={element.id} onClick={this.handleGenBiographyLoad}>
              <svg className="cl-icon-edit" xmlns="http://www.w3.org/2000/svg" viewBox="-18838 -2262 16 16">
                <g data-name="Group 4017" transform="translate(-20346 -3515)">
                  <path className="cl-icon-edit-1" d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM10.352,3.68,12.32,5.648,11.088,6.88,9.12,4.912Zm-5.9,5.9L8.64,5.392,10.608,7.36,6.416,11.552l-2.464.5Z" transform="translate(1508 1253)"/>
                </g>
              </svg>
            </a>
            }
            <a value={element.id} onClick={this.handleDeleteGenCertifications}>
              <svg className="cl-icon-del" xmlns="http://www.w3.org/2000/svg" viewBox="-18804 -3075 16 16">
                <path data-name="Path 322" className="cl-icon-del-1" d="M11.969-.646a.641.641,0,0,0-.2-.469L9.885-3l1.885-1.885a.641.641,0,0,0,.2-.469.653.653,0,0,0-.2-.479l-.937-.937a.653.653,0,0,0-.479-.2.641.641,0,0,0-.469.2L8-4.885,6.115-6.771a.641.641,0,0,0-.469-.2.653.653,0,0,0-.479.2l-.937.938a.653.653,0,0,0-.2.479.641.641,0,0,0,.2.469L6.115-3,4.229-1.115a.641.641,0,0,0-.2.469.653.653,0,0,0,.2.479l.938.937a.653.653,0,0,0,.479.2.641.641,0,0,0,.469-.2L8-1.115,9.885.771a.641.641,0,0,0,.469.2.653.653,0,0,0,.479-.2l.937-.937A.653.653,0,0,0,11.969-.646Zm2.958-6.37A7.826,7.826,0,0,1,16-3a7.826,7.826,0,0,1-1.073,4.016,7.964,7.964,0,0,1-2.911,2.911A7.826,7.826,0,0,1,8,5,7.826,7.826,0,0,1,3.984,3.927,7.964,7.964,0,0,1,1.073,1.016,7.826,7.826,0,0,1,0-3,7.826,7.826,0,0,1,1.073-7.016,7.964,7.964,0,0,1,3.984-9.927,7.826,7.826,0,0,1,8-11a7.826,7.826,0,0,1,4.016,1.073A7.964,7.964,0,0,1,14.927-7.016Z" transform="translate(-18804 -3064)"/>
              </svg>
            </a>
          </p>
        </div>
      </div>
    );
  }

  renderSportCertifications(element, sportName) {
    return (
      <div key={element.id} className="uk-grid">
        <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10  uk-width-small-8-10 ">
          <div className="tableDiv">
            <div className="lCol">
              <p>
                <svg className="cl-icon-round-star" xmlns="http://www.w3.org/2000/svg" viewBox="-19369 -3075 14 14">
                  <g transform="translate(-19369 -3075)">
                    <g>
                      <circle className="cl-icon-round-star-1" cx={7} cy={7} r={7}/>
                      <path className="cl-icon-round-star-2" d="M7,9.333,4.257,10.775l.524-3.054L2.562,5.558l3.067-.446L7,2.333,8.372,5.112l3.067.446L9.219,7.721l.524,3.054Z"/>
                    </g>
                  </g>
                </svg>
              </p>
            </div>
            <div className="rCol">
              <p>{[element.year, element.name, element.institutionName]
                .filter(val => {
                  if (val) {
                    return true;
                  }
                  return false;
                })
                .join(', ')} ({sportName})
              </p>
            </div>
          </div>
        </div>
        <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10  uk-width-small-2-10 uk-text-right">
          <p>
            {element.id.length === 24 &&
            <a value={element.id}>
              &nbsp;
            </a>
            }
            {element.id.length !== 24 &&
            <a value={element.id} onClick={this.handleSportBiographyLoad}>
              <svg className="cl-icon-edit" xmlns="http://www.w3.org/2000/svg" viewBox="-18838 -2262 16 16">
                <g data-name="Group 4017" transform="translate(-20346 -3515)">
                  <path className="cl-icon-edit-1" d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM10.352,3.68,12.32,5.648,11.088,6.88,9.12,4.912Zm-5.9,5.9L8.64,5.392,10.608,7.36,6.416,11.552l-2.464.5Z" transform="translate(1508 1253)"/>
                </g>
              </svg>
            </a>
            }
            <a value={element.id} onClick={this.handleDeleteSportCertifications}>
              <svg className="cl-icon-del" xmlns="http://www.w3.org/2000/svg" viewBox="-18804 -3075 16 16">
                <path data-name="Path 322" className="cl-icon-del-1" d="M11.969-.646a.641.641,0,0,0-.2-.469L9.885-3l1.885-1.885a.641.641,0,0,0,.2-.469.653.653,0,0,0-.2-.479l-.937-.937a.653.653,0,0,0-.479-.2.641.641,0,0,0-.469.2L8-4.885,6.115-6.771a.641.641,0,0,0-.469-.2.653.653,0,0,0-.479.2l-.937.938a.653.653,0,0,0-.2.479.641.641,0,0,0,.2.469L6.115-3,4.229-1.115a.641.641,0,0,0-.2.469.653.653,0,0,0,.2.479l.938.937a.653.653,0,0,0,.479.2.641.641,0,0,0,.469-.2L8-1.115,9.885.771a.641.641,0,0,0,.469.2.653.653,0,0,0,.479-.2l.937-.937A.653.653,0,0,0,11.969-.646Zm2.958-6.37A7.826,7.826,0,0,1,16-3a7.826,7.826,0,0,1-1.073,4.016,7.964,7.964,0,0,1-2.911,2.911A7.826,7.826,0,0,1,8,5,7.826,7.826,0,0,1,3.984,3.927,7.964,7.964,0,0,1,1.073,1.016,7.826,7.826,0,0,1,0-3,7.826,7.826,0,0,1,1.073-7.016,7.964,7.964,0,0,1,3.984-9.927,7.826,7.826,0,0,1,8-11a7.826,7.826,0,0,1,4.016,1.073A7.964,7.964,0,0,1,14.927-7.016Z" transform="translate(-18804 -3064)"/>
              </svg>
            </a>
          </p>
        </div>
      </div>
    );
  }
  render() {
    const {certifications, genCertifications, p, sportName} = this.props;
    const sportsSorted = this.props.sortByYear(certifications.data);
    const genSorted = this.props.sortByYear(genCertifications.data);
    return (
      <div className="cl-sd-BiographyListOuter">
        <div className="uk-grid">
          <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-4-10  uk-width-small-1-1 ">
            <h4>{p.t('Biography.captionCertifications')}</h4>
            <a value={CERTIFICATIONS} onClick={this.props.onSelectType} className="addBtn">
              <svg className="cl-icon-arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="-850.061 -5141.531 6.591 11.063">
                <g transform="translate(-1065.606 -5996.5)">
                  <path data-name="Path 150" className="cl-icon-arrow-left-1" d="M-17914.895-2197l5,5,5-5" transform="translate(-1975.395 18770.395) rotate(90)"/>
                </g>
              </svg>
              {p.t('Biography.add')}
            </a>
          </div>
          <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-6-10  uk-width-small-1-1 ">
            <div>
              {
                sportsSorted.map(i => this.renderSportCertifications(i, sportName))
              }
            </div>
            <div>
              {
                genSorted.map(this.renderGenCertifications)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectType: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired,
      fetchGenCertifications: PropTypes.func.isRequired,
      fetchSportCertifications: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      sportName: PropTypes.string.isRequired,
      sortByYear: PropTypes.func.isRequired,
      onLoadBiography: PropTypes.func.isRequired,
      onDeleteBiography: PropTypes.func.isRequired,
      certifications: PropTypes.object.isRequired,
      genCertifications: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {currentSport,
    genCertifications,
    certifications,
    profile
  } = state;
  return {
    currentSport,
    genCertifications,
    certifications,
    profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchGenCertifications: ({profileID}) => dispatch(fetchGenCertifications({profileID})),
    fetchSportCertifications: ({profileID, sportID}) => dispatch(fetchSportCertifications({profileID, sportID}))
  };
};
const CertificationDetailsComponent = connect(mapStateToProps, mapDispatchToProps)(translate(CertificationDetails));
export default CertificationDetailsComponent;

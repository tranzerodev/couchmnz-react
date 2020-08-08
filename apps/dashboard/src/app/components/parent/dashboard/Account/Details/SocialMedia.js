import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class SocialMedia extends Component {
  render() {
    const {t} = this.props.p;
    return (
      <div className="cl-sd-trainingLocationInner">
        <div className="accDetails">
          <h1 className="uk-padding-remove">{t('SocialMedia.title')}</h1>
          <p className="mb25">{t('SocialMedia.message')}</p>
          <ul className="cl-sd-socialshareOuter">
            <li>
              <div className="uk-grid">
                <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-6-10  uk-width-small-1-1 ">
                  <div className="tableDiv">
                    <div className="lCol">
                      <span className="facebook"><i className="fa fa-facebook-official"/></span>
                    </div>
                    <div className="rCol">
                      <h4>{t('SocialMedia.facebook')}</h4>
                      <p>{t('SocialMedia.connectFacebook')}</p>
                    </div>
                  </div>
                </div>
                <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-4-10  uk-width-small-1-1 ">
                  <div className="cl-sd-connectbtn">
                    <a className="general_btn">{t('SocialMedia.connect')}</a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="uk-grid">
                <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-6-10  uk-width-small-1-1 ">
                  <div className="tableDiv">
                    <div className="lCol">
                      <span className="linkedin"><i className="fa fa-linkedin-square"/></span>
                    </div>
                    <div className="rCol">
                      <h4>{t('SocialMedia.linkedIn')}</h4>
                      <p>{t('SocialMedia.connectLinkedIn')}</p>
                    </div>
                  </div>
                </div>
                <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-4-10  uk-width-small-1-1 ">
                  <div className="cl-sd-connectbtn">
                    <a className="general_btn">{t('SocialMedia.connect')}</a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="uk-grid">
                <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-6-10  uk-width-small-1-1 ">
                  <div className="tableDiv">
                    <div className="lCol">
                      <span className="twitter"><i className="fa fa-twitter"/></span>
                    </div>
                    <div className="rCol">
                      <h4>{t('SocialMedia.twitter')}</h4>
                      <p>{t('SocialMedia.connectTwitter')}</p>
                    </div>
                  </div>
                </div>
                <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-4-10  uk-width-small-1-1 ">
                  <div className="cl-sd-connectbtn">
                    <a className="general_btn reverse">{t('SocialMedia.remove')}</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

const mapDispatchToProps = () => {
  return {
  };
};

const mapStateToProps = () => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(SocialMedia)));

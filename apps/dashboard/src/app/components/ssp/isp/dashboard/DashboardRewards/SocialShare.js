import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {
  ShareButtons
} from 'react-share';
import {connect} from 'react-redux';
import {PENDING, FULFILLED} from '../../../../../constants/ActionTypes';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton
} = ShareButtons;

class SocialShare extends Component {
  constructor() {
    super();
    this.setUrl = this.setUrl.bind(this);
    this.state = {url: ''};
  }
  componentWillMount() {
    this.setUrl(this.props.profile);
  }
  componentWillReceiveProps(nextProps) {
    this.setUrl(nextProps.profile);
  }
  setUrl(profile) {
    if (profile && this.state.url === '' && profile.status === FULFILLED) {
      this.setState({url: profile.data.profile.url});
    }
  }

  render() {
    return (
      <ul className="sharing">
        <li className="urlCopy">
          <input type="text" name="url" disabled value={this.state.url}/>
          <span>
            <CopyToClipboard text={this.state.url}>
              <a className="urlCopyLink">{this.props.p.t('SocialShare.copy')}</a>
            </CopyToClipboard>
          </span>
        </li>
        <li>
          <FacebookShareButton url={this.state.url}><a className="facebook"><i className="fa fa-facebook"/></a></FacebookShareButton>
        </li>
        <li>
          <TwitterShareButton url={this.state.url}><a className="twitter"><i className="fa fa-twitter"/></a></TwitterShareButton>
        </li>
        <li>
          <GooglePlusShareButton url={this.state.url}> <a className="google"><i className="fa fa-google-plus"/></a></GooglePlusShareButton>
        </li>
      </ul>
    );
  }
  static get propTypes() {
    return {
      profile: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
SocialShare.defaultProps = {
  profile: {status: PENDING}
};
const mapStateToProps = state => {
  const {profile} = state;
  return {
    profile
  };
};
export default translate(connect(mapStateToProps)(SocialShare));

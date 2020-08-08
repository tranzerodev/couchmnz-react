import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {Editor} from 'react-draft-wysiwyg';

import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import NextLink from '../../../../common/RegistrationNextLink';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import RequiredNotFilledModal from '../RequiredNotFilledModal';
import validateListing from '../../../../../validators/ssp/isp/dashboard/listing';
import {
  updateListing
} from '../../../../../actions';
import appConstants from '../../../../../constants/appConstants';
import {REGISTRATION_ISP_MEDIA, REGISTRATION_ISP_TRAINING_PREFERENCE} from '../../../../../constants/pathConstants';
import {convertToHtml, convertFromHtml} from '../../../../common/messages/MessageComposer/ComposerUtils';
class ProfileListing extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.handleDescEditorStateChange = this.handleDescEditorStateChange.bind(this);
    this.handleBioEditorStateChange = this.handleBioEditorStateChange.bind(this);
    const {listing} = this.props;
    this.state = {
      listing: {
        bio: listing.bio ? listing.bio : '',
        description: listing.description ? listing.description : '',
        headline: listing.headline ? listing.headline : ''
      },
      notFilled: [],
      isNotFilledModalOpen: false,
      descEditorState: convertFromHtml(listing.description),
      bioEditorState: convertFromHtml(listing.bio)
    };
  }

  getNotFilled() {
    const {p} = this.props;
    const {listing} = this.state;
    const validation = validateListing(listing);
    const notFilled = [];
    if (validation.headline === false) {
      notFilled.push(p.t('RequiredNotFilledModal.listingHeadline'));
    }
    return notFilled;
  }

  onSubmitForm() {
    const {listing} = this.state;
    const validation = validateListing(listing);
    if (validation.valid) {
      return true;
    }
    this.setState({submit: true, notFilled: this.getNotFilled(), isNotFilledModalOpen: true});
    return false;
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleChange(e) {
    const {listing} = this.state;
    switch (e.target.name) {
      case 'description': {
        listing.description = e.target.value;
        break;
      }
      case 'bio': {
        listing.bio = e.target.value;
        break;
      }
      case 'headline': {
        listing.headline = e.target.value;
        break;
      }
      default: break;
    }
    this.setState({listing});
  }
  handleDescEditorStateChange(descEditorState) {
    const description = convertToHtml(descEditorState);
    const listing = Object.assign({}, this.state.listing, {description});
    this.setState({
      descEditorState,
      listing
    });
  }
  handleBioEditorStateChange(bioEditorState) {
    const bio = convertToHtml(bioEditorState);
    const listing = Object.assign({}, this.state.listing, {bio});
    this.setState({
      bioEditorState,
      listing
    });
  }

  render() {
    const {listing} = this.state;
    const {headline} = listing;
    const {p} = this.props;
    return (
      <div>
        <TopContent step={3}/>
        <BackButton back={REGISTRATION_ISP_TRAINING_PREFERENCE} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-3-4 uk-width-large-3-4 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className="createListing">
                  <h1>{p.t('SSPProfileListing.create')}  {this.props.p.t('SSPProfileListing.yourListing')} <span>{this.props.currentSport && this.props.currentSport.data && this.props.currentSport.data.name ? '(' + this.props.currentSport.data.name + ')' : ''}</span></h1>
                  <div className="uk-form-row">
                    <div className="dtls">
                      <h6>{p.t('SSPProfileListing.listingHeading')}</h6>
                      <p>{p.t('SSPProfileListing.headingMessage')}</p>
                      <div className="dtlsInfo">
                        <div className="field-holder">
                          <textarea rows={3} className="uk-form-controls " placeholder={p.t('SSPProfileListing.headlineExample')} name="headline" value={headline} maxLength={appConstants.listingHeadlineLength} onChange={this.handleChange}/>
                          <span className="countno">{headline.length}/{appConstants.listingHeadlineLength}</span>
                          <span className="error-text"/>
                        </div>
                      </div>
                    </div>
                    <div className="dtls">
                      <h6>{this.props.p.t('SSPProfileListing.describeCurriculum')}</h6>
                      <p>{this.props.p.t('SSPProfileListing.description')}</p>
                    
                      <p className="cl-only-mobile">{p.t('SSPProfileListing.mobileViewErrorMessage')}</p>
                      <div className="cl-richTextArea">
                        <div className="field-holder">
                          <Editor
                            editorState={this.state.descEditorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.handleDescEditorStateChange}
                            editorStyle={{
                              height: 200
                            }}
                            toolbar={{
                              options: ['inline', 'list'],
                              inline: {
                                options: ['bold', 'italic']
                              },
                              list: {
                                options: ['unordered', 'ordered']
                              }
                            }}
                          />
                          <span className="error-text"/>
                        </div>
                      </div>
                    </div>

                    <div className="dtls">
                      <h6>{this.props.p.t('SSPProfileListing.bioAndCredentials')}</h6>
                      <p>{this.props.p.t('SSPProfileListing.bioDescription')}</p>
                      <p className="cl-only-mobile">{p.t('SSPProfileListing.mobileViewErrorMessage')}</p>
                     
                      <div className="cl-richTextArea">
                        <div className="field-holder">
                          <Editor
                            editorState={this.state.bioEditorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.handleBioEditorStateChange}
                            editorStyle={{
                              height: 200
                            }}
                            toolbar={{
                              options: ['inline', 'list'],
                              inline: {
                                options: ['bold', 'italic']
                              },
                              list: {
                                options: ['unordered', 'ordered']
                              }
                            }}
                          />
                          <span className="error-text"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-2"/>
              <div className="uk-width-xlarge-2-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-2 ">
                <NextLink submitForm={this.onSubmitForm} saveData={this.props.updateListing} data={listing} saveType={appConstants.saveType.sportsSpecific} next={REGISTRATION_ISP_MEDIA}/>
              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 uk-text-right">
                <div className="finishDivSec">
                  <FinishLaterLink/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.updateListing}
          data={listing}
          saveType={appConstants.saveType.sportsSpecific}
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      updateListing: PropTypes.func.isRequired,
      listing: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      currentSport: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {listing, currentSport, sspValidation} = state;
  return {
    listing,
    currentSport,
    sspValidation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateListing: (listing, updateType) => dispatch(updateListing(listing, updateType))
  };
};

const Reg = connect(mapStateToProps, mapDispatchToProps)(ProfileListing);
export default translate(Reg);

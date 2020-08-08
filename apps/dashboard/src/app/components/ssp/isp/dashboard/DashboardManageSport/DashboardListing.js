import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import appConstants from '../../../../../constants/appConstants';
import config from '../../../../../config';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';

import {Editor} from 'react-draft-wysiwyg';

import DashboardSaveLink from '../DashboardSaveLink';
import validateListing from '../../../../../validators/ssp/isp/dashboard/listing';
import {
  updateListing
} from '../../../../../actions';
import {DASHBOARD_MANAGE_SPORT_MEDIA} from '../../../../../constants/pathConstants';
import NewSportRequiredNotFilledModal from '../NewSportRequiredNotFilledModal';
import {convertToHtml, convertFromHtml} from '../../../../common/messages/MessageComposer/ComposerUtils';
import ExampleModal from '../ExampleModal/ExampleModal';
import {SAMPLE_LISTING} from '../../../../../constants/assetsPaths';

class DashboardListing extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.handleDescEditorStateChange = this.handleDescEditorStateChange.bind(this);
    this.handleBioEditorStateChange = this.handleBioEditorStateChange.bind(this);
    this.handleSampleModal = this.handleSampleModal.bind(this);
    this.renderAccordionData = this.renderAccordionData.bind(this);
    this.handleTemplateDataChange = this.handleTemplateDataChange.bind(this);
    this.renderServiceAccordionData = this.renderServiceAccordionData.bind(this);
    this.handleServiceTemplateDataChange = this.handleServiceTemplateDataChange.bind(this);

    const {listing} = this.props;
    this.state = {
      listing: {
        bio: listing.bio ? listing.bio : '',
        description: listing.description ? listing.description : '',
        headline: listing.headline ? listing.headline : ''
      },
      validation: {
        headline: false,
        valid: false
      },
      submitted: false,
      isNotFilledModalOpen: false,
      notFilled: [],
      descEditorState: convertFromHtml(listing.description),
      bioEditorState: convertFromHtml(listing.bio),
      isModalOpen: false,
      selectedBioTemplateId: null,
      selectedServiceTemplateId: null
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange(e) {
    const {name, value} = e.target;
    let {listing, validation} = this.state;
    listing[name] = value;
    this.setState({listing});
    validation = validateListing(listing);
    this.setState({validation});
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

  onSubmitForm() {
    const {listing} = this.state;
    const validation = validateListing(listing);
    if (this.props.sportActivationStatus === false) {
      if (validation.valid) {
        return true;
      }
      this.setState({notFilled: this.getNotFilled(), isNotFilledModalOpen: true});
      return false;
    }
    this.setState({submitted: true});
    if (validation.valid) {
      return true;
    }
    return false;
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

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  handleSampleModal() {
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  }
  handleTemplateDataChange(event) {
    const {value} = event.target;
    const bioData = JSON.parse(value);
    this.setState({selectedBioTemplateId: bioData.id});
    this.handleDescEditorStateChange(convertFromHtml(bioData.data));
  }
  renderAccordionData(templateData, index) {
    const {selectedBioTemplateId} = this.state;
    const id = `bio${index}`;
    return (
      <div key={index} className="cl-sd-default-bank-acc">
        <input type="radio" name="bioTemplate" value={JSON.stringify(templateData)} id={id} onChange={this.handleTemplateDataChange} checked={selectedBioTemplateId ? (selectedBioTemplateId === templateData.id) : null}/>
        <label htmlFor={id}><span>{templateData.data}</span></label>
      </div>
    );
  }

  handleServiceTemplateDataChange(event) {
    const {value} = event.target;
    const serviceData = JSON.parse(value);
    this.setState({selectedServiceTemplateId: serviceData.id});
    this.handleBioEditorStateChange(convertFromHtml(serviceData.data));
  }
  renderServiceAccordionData(templateData, index) {
    const {selectedServiceTemplateId} = this.state;
    const id = `service${index}`;
    return (
      <div key={index} className="cl-sd-default-bank-acc">
        <input type="radio" name="serviceTemplate" value={JSON.stringify(templateData)} id={id} onChange={this.handleServiceTemplateDataChange} checked={selectedServiceTemplateId ? (selectedServiceTemplateId === templateData.id) : null}/>
        <label htmlFor={id}><span>{templateData.data}</span></label>
      </div>
    );
  }

  render() {
    const {p, sportActivationStatus, sportName} = this.props;
    const {listing, validation, submitted, isModalOpen} = this.state;
    const {headline} = listing;
    const saveType = appConstants.saveType.sportsSpecific;
    const buttonName = sportActivationStatus ? p.t('SaveButton.save') : p.t('RegistrationNextLink.save_and_continue');
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
            <div className="createListing cl-sd-trainingLocationInner">

              <div className="uk-grid">
                <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
                  <h1 className="uk-padding-remove">{p.t('DashboardListing.listingDetails')}</h1>
                </div>
                <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1">
                  <div className="viewExpOuter">
                    <a onClick={this.handleSampleModal} data-uk-modal>{this.props.p.t('ExampleModal.message')}</a>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <p>{p.t('DashboardListing.editYourSportListing', {sportName})}</p>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="dtls">
                    <h6>{p.t('DashboardListing.heading')}</h6>
                    <p>{p.t('DashboardListing.headingDesc')}</p>
                    <div className={(validation.headline === false && submitted) ? 'dtlsInfo field-holder error' : 'dtlsInfo field-holder'}>
                      <textarea rows={1} className="uk-form-controls field-required" placeholder={p.t('SSPProfileListing.headlineExample')} name="headline" value={headline} maxLength={appConstants.listingHeadlineLength} onChange={this.handleChange}/>
                      <span className="countno">{headline.length}/{appConstants.listingHeadlineLength}</span>
                      <span className="error-text">{p.t('DashboardListing.validation_messages.headline')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="dtls">
                    <h6>{p.t('DashboardListing.about')}</h6>
                    <p>{p.t('DashboardListing.aboutDesc')}</p>
                    <p className="cl-only-mobile">{p.t('DashboardListing.mobileViewErrorMessage')}</p>
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
                      </div>
                    </div>
                    <div className="accordionOuter">
                      <div className="uk-accordion pricingAccordion" data-uk-accordion="{showfirst: false}">
                        <h3 className="uk-accordion-title">See Example Templates</h3>
                        <div className="uk-accordion-content">
                          <div className="cl-sd-default-bank">
                            {
                              config.templateDataBio.map(this.renderAccordionData)
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="dtls">
                    <h6>{p.t('DashboardListing.service')}</h6>
                    <p>{p.t('DashboardListing.serviceDesc')}</p>
                    <p className="cl-only-mobile">{p.t('DashboardListing.mobileViewErrorMessage')}</p>
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
                      </div>
                    </div>
                    <div className="accordionOuter">
                      <div className="uk-accordion pricingAccordion" data-uk-accordion="{showfirst: false}">
                        <h3 className="uk-accordion-title">See Example Templates</h3>
                        <div className="uk-accordion-content">
                          <div className="cl-sd-default-bank">
                            {
                              config.templateDataService.map(this.renderServiceAccordionData)
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1">
            <DashboardSaveLink
              saveType={saveType}
              saveData={this.props.updateListing}
              data={listing}
              submitForm={this.onSubmitForm}
              buttonName={buttonName}
              isNewSports={sportActivationStatus}
              next={DASHBOARD_MANAGE_SPORT_MEDIA}
            />
          </div>
        </div>
        <NewSportRequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.updateListing}
          data={listing}
          saveType={saveType}
        />
        <ExampleModal title="ExampleModal.listing" isModalOpen={isModalOpen} scroll={appConstants.scroll.listing} image={SAMPLE_LISTING} onClose={this.handleSampleModal}/>
      </div>
    );
  }

  static get propTypes() {
    return {
      updateListing: PropTypes.func.isRequired,
      listing: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sportName: PropTypes.string.isRequired,
      sportActivationStatus: PropTypes.bool.isRequired
    };
  }
}

DashboardListing.defaultProps = {
  listing: {}
};

const mapStateToProps = state => {
  const {listing, currentSport} = state;
  return {
    listing,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active),
    sportName: currentSport.data && currentSport.data.name ? currentSport.data.name : ''
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateListing: (listing, updateType) => dispatch(updateListing(listing, updateType))
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(DashboardListing));

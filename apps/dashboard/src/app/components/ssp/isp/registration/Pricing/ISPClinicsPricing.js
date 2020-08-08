import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import Modal from './Modal';
import {isNonEmptyArray, isNumber} from '../../../../../validators/common/util';
import appConstants from '../../../../../constants/appConstants';

class ISPClinicsPricingClass extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
    this.handleSkilllevel = this.handleSkilllevel.bind(this);

    this.handleCreatePackage = this.handleCreatePackage.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAddGroupSize = this.handleAddGroupSize.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemoveGroupSize = this.handleRemoveGroupSize.bind(this);
    const {price} = props;
    this.state = {
      pricing: 'uk-active',
      discount: '',
      skillLevel: '',
      discountModal: <div/>,
      submitted: false,
      prices: isNonEmptyArray(price.prices) ? price.prices.map((p, i) => i) : [0]
    };
  }
  handleSave(discount) {
    this.closeModal();
    this.props.onSave(discount);
  }
  closeModal() {
    this.setState({
      discountModal: <div/>
    });
  }
  componentDidMount() {}
  handleToggle() {
    const {pricing} = this.state;
    this.setState({
      pricing: pricing === 'uk-active' ? '' : 'uk-active',
      discount: '',
      skillLevel: ''
    });
  }
  handleDiscount() {
    const {discount} = this.state;
    this.setState({
      pricing: '',
      discount: discount === 'uk-active' ? '' : 'uk-active',
      skillLevel: ''
    });
  }
  handleSkilllevel() {
    const {skillLevel} = this.state;
    this.setState({
      pricing: '',
      discount: '',
      skillLevel: skillLevel === 'uk-active' ? '' : 'uk-active'
    });
  }
  handlePriceSearch(prices, id) {
    const index = prices.findIndex(price => price.id === id);
    return index;
  }
  handleSkilllevelsSearch(skillLevels, id) {
    return skillLevels && typeof (skillLevels) === 'object' ? skillLevels.findIndex(skillLevel => skillLevel.skillID === id) : -1;
  }
  handleAgesSearch(ages, id) {
    return ages && typeof (ages) === 'object' ? ages.findIndex(age => age.ageID === id) : -1;
  }
  handleCreatePackage() {
    this.setState({
      discountModal: <Modal modalIsOpen closeModal={this.closeModal} onSave={this.handleSave}/>
    });
  }
  handleAddGroupSize() {
    const {prices} = this.state;
    this.setState({
      prices: [...prices, prices.length]
    });
  }
  handleRemoveGroupSize(e) {
    const index = parseInt(e.currentTarget.getAttribute('name'), 10);
    const {prices} = this.state;
    prices.pop();
    this.setState({
      prices
    });
    this.props.onRemovePrice(index);
  }
  handleskillLevelsSearch(skillLevels, id) {
    return skillLevels.findIndex(skillLevel => {
      return skillLevel.skillID === id;
    });
  }
  handleSkillObjectSearch(skillLevels, id) {
    return skillLevels && typeof (skillLevels) === 'object' ? skillLevels.findIndex(skillLevel => skillLevel.skillID === id) : -1;
  }
  handleAgeObjectSearch(ages, id) {
    return ages && typeof (ages) === 'object' ? ages.findIndex(age => age.ageID === id) : -1;
  }
  handleAlteredSkilllevelsPrice(price, skillLevelID, i) {
    const currentPrice = this.props.price;
    let {skillLevels} = currentPrice;
    if (!skillLevels) {
      skillLevels = [];
    }
    const skillLevel = skillLevelID === null ? skillLevels[i] : skillLevels[skillLevels.findIndex(skill => skill.skillID === skillLevelID)];
    let {operation, operand, isPercentage} = skillLevel ? skillLevel : {};
    operation = operation ? operation : 'A';
    isPercentage = isPercentage ? isPercentage : 'Y';
    operand = operand ? parseFloat(operand) : 0.0;
    price = isNaN(price) ? 0.0 : parseFloat(price);
    switch (isPercentage) {
      case 'Y': {
        switch (operation) {
          case 'A': {
            price += (price * operand / 100);
            break;
          }
          case 'S': {
            price -= (price * operand / 100);
            break;
          }
          default: return 0;
        }
        break;
      }
      case 'N': {
        switch (operation) {
          case 'A': {
            price += operand;
            break;
          }
          case 'S': {
            price -= operand;
            break;
          }
          default: return 0;
        }
        break;
      }
      default: return 0;
    }
    return price ? price.toFixed(2) : 0;
  }
  handleAlteredAgesPrice(price, ageGroupID, i) {
    const currentPrice = this.props.price;
    let {ages} = currentPrice;
    if (!ages) {
      ages = [];
    }
    const age = ageGroupID === null ? ages[i] : ages[ages.findIndex(age => age.ageID === ageGroupID)];
    let {operation, operand, isPercentage} = age ? age : {};
    operation = operation ? operation : 'A';
    isPercentage = isPercentage ? isPercentage : 'Y';
    operand = operand ? parseFloat(operand) : 0.0;
    price = isNaN(price) ? 0.0 : parseFloat(price);
    switch (isPercentage) {
      case 'Y': {
        switch (operation) {
          case 'A': {
            price += (price * operand / 100);
            break;
          }
          case 'S': {
            price -= (price * operand / 100);
            break;
          }
          default: return 0;
        }
        break;
      }
      case 'N': {
        switch (operation) {
          case 'A': {
            price += operand;
            break;
          }
          case 'S': {
            price -= operand;
            break;
          }
          default: return 0;
        }
        break;
      }
      default: return 0;
    }
    return price ? price.toFixed(2) : 0;
  }
  render() {
    const {discountModal, pricing, discount, skillLevel} = this.state;
    const {price, validation, submitted, type, showTitle, currentSport} = this.props;
    const {volumeDiscount, name} = price;
    const ages = price.ages && price.ages.length ? price.ages : [];
    const skillLevels = price.skillLevels && price.skillLevels.length ? price.skillLevels : [];
    const basePrice = price.prices && price.prices.length && price.prices[0].price >= 0 ? price.prices[0].price : '';
    const {offerTerminology/* , offerTerminologyPlural */} = currentSport.data;
    const singularSession = offerTerminology.singular;
    const pluralSession = offerTerminology.plural; // OfferTerminologyPlural
    const prices = price.prices.map(price => {
      return price.max;
    });
    const min = Math.max.apply(Math, prices) + 1;
    const max = min + 1;
    return (
      <div className="trainingPrice">
        {
          showTitle &&
          (
            <span>
              <h1 className="uk-padding-remove">{this.props.p.t('Pricing.title', {type: name})}</h1>
              <p className="pd20">{this.props.p.t('Pricing.message')}:</p>
            </span>
          )
        }

        <div className="accordionOuter trainingAccordian" style={{display: this.props.training && this.props.training.length ? 'block' : 'none'}}>
          {discountModal}
          <div className="uk-accordion pricingAccordion" data-uk-accordion="{showfirst: true}">
            <div className={'uk-accordion-title ' + price} onClick={this.handleToggle}>
              <h3> {this.props.p.t('ISPClinicsPricing.priceFor')} {name}<br/>
                {
                  price.prices && price.prices.length ? price.prices.map((p, i) => {
                    return (
                      <span key={i} className="lines">
                        <strong>${p.price ? p.price : 0.0}</strong> {this.props.p.t('ISPClinicsPricing.perAthletePerSession', {session: singularSession})} ({this.props.p.t('ISPClinicsPricing.perAthletePerSession', {session: singularSession})}: {p.min} to {p.max})
                      </span>);
                  }) : <span/>
                }
              </h3>
            </div>
            <div className="uk-accordion-content" style={{display: pricing === 'uk-active' ? 'block' : 'none'}}>
              <div className="accordianWrap">
                <p>{this.props.p.t('ISPClinicsPricing.perAthletePerSessionMessage', {session: singularSession})}</p>

                {
                  this.state.prices.map((p, i) => {
                    const isValidPrice = validation.prices && validation.prices.length && validation.prices[i] && validation.prices[i].price;
                    const isValidMin = validation.prices && validation.prices.length && validation.prices[i] && validation.prices[i].min;
                    const isValidMax = validation.prices && validation.prices.length && validation.prices[i] && validation.prices[i].max;
                    const isValidMinMax = validation.groupSizes && validation.groupSizes.length && validation.groupSizes[i];
                    return (
                      <div key={i} className={'uk-grid ' + (i ? 'mt20 marginSec' : '')}>
                        <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-4  uk-width-small-1-1">
                          <div className={isValidPrice === false && validation.valid === false && submitted ? 'field-holder error' : 'field-holder'}>
                            <label>{this.props.p.t('ISPClinicsPricing.priceForClinics')}</label>
                            <div className="dollardiv">
                              <span className="dollar">$</span>
                              <input type="number" min={0} name={p} placeholder={this.props.p.t('ISPIndividualPricing.singleSessionPrice', {session: singularSession})} className="uk-form-controls field-required" onChange={this.props.onPriceChange} value={price.prices && price.prices.length > p ? price.prices[p].price : 0}/>
                              <span className="error-text">{this.props.p.t('ISPClinicsPricing.validation_messages.pricing')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-4  uk-width-small-1-1">
                          <div className={(isValidMin === false) && validation.valid === false && submitted ? 'field-holder error' : 'field-holder'}>
                            <label>{this.props.p.t('ISPClinicsPricing.minGroupSize')}</label>
                            <input type="number" min={0} name={p} value={price.prices && price.prices.length > p ? price.prices[p].min : min} className="uk-form-controls field-required" onChange={this.props.onMin}/>
                            <span className="error-text">{this.props.p.t('ISPClinicsPricing.validation_messages.min')}</span>
                          </div>
                        </div>
                        <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-4  uk-width-small-1-1">
                          <div className={(isValidMax === false || isValidMinMax === false) && validation.valid === false && submitted ? 'field-holder error' : 'field-holder'}>
                            <label>{this.props.p.t('ISPClinicsPricing.maxGroupSize')}</label>
                            <input type="number" min={0} name={p} value={price.prices && price.prices.length > p ? price.prices[p].max : max} className="uk-form-controls field-required" onChange={this.props.onMax}/>
                            {
                              (isValidMax === false) ? <span className="error-text">{this.props.p.t('ISPClinicsPricing.validation_messages.max')}</span> : <span className="error-text">{this.props.p.t('ISPClinicsPricing.validation_messages.minMaxSize')}</span>
                            }
                          </div>
                        </div>
                        <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-4  uk-width-small-1-1">
                          <div className="field-holder">
                            <br/><br/>
                            <span>{price && price.prices && price.prices.length && price.prices[p] ? price.prices[p].id ? <a/> : <a name={i} onClick={this.handleRemoveGroupSize}><i className="fa fa-trash-o" style={{fontSize: 'larger'}}/></a> : <a/>}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }

                <div className="uk-grid mt20">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                    <div className="addCertification">
                      <a onClick={this.handleAddGroupSize}>{this.props.p.t('ISPClinicsPricing.addAnother')}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={'uk-accordion-title ' + discount} onClick={this.handleDiscount}>
              <h3> {this.props.p.t('ISPClinicsPricing.defineVolumeDiscounts')} <span>({this.props.p.t('ISPClinicsPricing.optional')})</span><br/>
                <span className="lines"><strong>{volumeDiscount && volumeDiscount.length ? volumeDiscount.length : 0} {name} {this.props.p.t('ISPClinicsPricing.packages')}</strong></span><br/>
                {
                  volumeDiscount.map((discount, i) => {
                    const currentPrice = basePrice;
                    return (
                      <span key={i} className="lines">
                        {discount.numberOfSessions} {isNumber(discount.numberOfSessions) && parseInt(discount.numberOfSessions, 10) === 1 ? singularSession : pluralSession} {this.props.p.t('ISPClinicsPricing.for')} ${(currentPrice - (currentPrice * discount.discount / 100.0)).toFixed(2)} {this.props.p.t('ISPClinicsPricing.perSession', {session: singularSession})} ({parseFloat(discount.discount).toFixed(0)}% {this.props.p.t('ISPClinicsPricing.discount')}; {this.props.p.t('ISPClinicsPricing.athletesSave')} ${(currentPrice * (parseFloat(discount.discount) ? (parseFloat(discount.discount) / 100.0) : 0.0) * parseInt(discount.numberOfSessions, 10)).toFixed(2)})
                      </span>
                    );
                  })
                }
              </h3>
            </div>

            <div className="uk-accordion-content" style={{display: discount === 'uk-active' ? 'block' : 'none'}}>
              <div className="accordianWrap">
                <h4>{this.props.p.t('ISPClinicsPricing.recommendedDiscountPoints')}</h4>
                <div className="uk-grid pt20">
                  {
                    volumeDiscount.map((discount, i) => {
                      const currentPrice = basePrice;
                      return (

                        <div key={i} className={this.props.packageItemClassName}>
                          <div className="packageItem" value={discount.id} name={i} onClick={this.props.onActivateDiscount}>
                            <h4><a>{discount.name}</a></h4>
                            <span><a value={discount.id} onClick={this.props.onRemoveDiscount}><i className="fa fa-trash-o"/></a></span>
                            <h2 className="number">{discount.numberOfSessions}</h2>
                            <p>{isNumber(discount.numberOfSessions) && parseInt(discount.numberOfSessions, 10) === 1 ? singularSession : pluralSession}</p>
                            <div className="emptyBorder">
                              <p><a>{discount.discount}%</a> {this.props.p.t('ISPClinicsPricing.discount')}<br/> {this.props.p.t('ISPClinicsPricing.athletesSave')} ${((currentPrice * discount.discount / 100) * discount.numberOfSessions).toFixed(2)}</p>
                            </div>
                            <p className="sessionPrice"><a >${(currentPrice - (currentPrice * discount.discount / 100)).toFixed(2)}</a> {this.props.p.t('ISPClinicsPricing.perSession', {session: singularSession})}</p>
                          </div>
                          <div className="activate">
                            <a value={discount.id} name={i} onClick={this.props.onActivateDiscount}>{this.props.p.t(discount.isActive && typeof discount.isActive === 'string' && discount.isActive.toUpperCase() === 'Y' ? 'ISPIndividualPricing.deactivate' : 'ISPIndividualPricing.activate')}</a>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>

                <h4 className="pdnone"><a onClick={this.handleCreatePackage}>{this.props.p.t('ISPClinicsPricing.createAnotherPackage')} <span>{this.props.p.t('ISPClinicsPricing.createPackagesMessage')}</span></a></h4>
                <p className="pdnone"><a/></p>
              </div>
            </div>

            <div className={'uk-accordion-title ' + skillLevel} onClick={this.handleSkilllevel}>
              <h3> {this.props.p.t('ISPClinicsPricing.specificPricingMessage')} <span>({this.props.p.t('ISPClinicsPricing.optional')})</span><br/> <span className="lines">{this.props.p.t('ISPClinicsPricing.forExample')}: <strong>{this.props.p.t('ISPClinicsPricing.specificPricingExample')}</strong></span></h3>
            </div>
            <div className="uk-accordion-content" style={{display: skillLevel === 'uk-active' ? 'block' : 'none'}}>
              <div className="accordianWrap">
                <p>{this.props.p.t('ISPIndividualPricing.specificPricingDescription')}:</p>
                <h4>{this.props.p.t('ISPIndividualPricing.skillLevelPricingDescription')}</h4>
                {
                  this.props.skillLevels.map((skillLevel, i) => {
                    const currentSkillIndex = this.handleSkillObjectSearch(skillLevels, skillLevel.id);
                    const currentSkill = skillLevels && skillLevels.length && currentSkillIndex >= 0 ? skillLevels[currentSkillIndex] : {id: null};
                    const alteredPrice = this.handleAlteredSkilllevelsPrice(basePrice, skillLevel.id, i);
                    return (
                      <div key={i} className={'pricingDtlsForm borderClass ' + (i === this.props.skillLevels.length - 1 ? 'mb30 bdnone' : '')}>
                        <div className="uk-grid ">
                          <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10  uk-width-small-1-1">
                            <label>{skillLevel.name}</label>
                          </div>
                          <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-3-10  uk-width-small-1-1">
                            <p>{this.props.p.t('ISPIndividualPricing.amount')} ${basePrice}</p>
                          </div>
                          <div className="uk-width-xlarge-1-10 uk-width-large-1-10 uk-width-medium-2-10  uk-width-small-1-1">
                            <div className="field-holder">
                              <select title={currentSkill.id} name={skillLevel.id} value={currentSkill.operation} className="uk-form-controls" required onChange={this.props.onSkillLevelOperation}>
                                <option value="A">+</option>
                                <option value="S">-</option>
                              </select>
                              <span className="error-text">{this.props.p.t('ISPIndividualPricing.validation_messages.operation')}</span>
                            </div>
                          </div>
                          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-3-10  uk-width-small-1-1">
                            <div className={validation.skillLevels && validation.skillLevels.length && validation.skillLevels[currentSkillIndex] === false && submitted ? 'field-holder error' : 'field-holder'}>
                              <input type="number" title={currentSkill.id} name={skillLevel.id} placeholder={this.props.p.t('ISPIndividualPricing.enterAmount')} value={currentSkill.operand ? currentSkill.operand : ''} onChange={this.props.onSkillLevelOperand}/>
                              <select title={currentSkill.id} name={skillLevel.id} value={currentSkill.isPercentage} className="uk-form-controls uk-form-width-small addon" placeholder onChange={this.props.onSkilllevelIsPercentage}>
                                <option value="Y">%</option>
                                <option value="N">$</option>
                              </select>
                              <span className="error-text">{currentSkill.isPercentage === appConstants.yes ? this.props.p.t('ISPIndividualPricing.validation_messages.operandIsPercentage') : this.props.p.t('ISPIndividualPricing.validation_messages.operand', {value: appConstants.maxSpecificPricing})}</span>
                            </div>
                          </div>
                          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
                            <p><span>=</span> {alteredPrice}</p>
                          </div>
                        </div>
                      </div>

                    );
                  })
                }

                <h4>{this.props.p.t('ISPIndividualPricing.agePricingDescription')}</h4>
                {
                  this.props.ages.map((age, i) => {
                    const currentAgeIndex = this.handleAgeObjectSearch(ages, age.id);
                    const currentAge = ages && ages.length && currentAgeIndex >= 0 ? ages[currentAgeIndex] : {id: null};
                    const alteredPrice = this.handleAlteredAgesPrice(basePrice, age.id, i);
                    // Console.log('i', i, 'ageIndex', ageIndex, 'currentAge', currentAge, 'ages', ages);
                    return (
                      <div key={i} className={'pricingDtlsForm borderClass ' + (i === this.props.ages.length - 1 ? 'bdnone' : '')}>
                        <div className="uk-grid ">
                          <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10  uk-width-small-1-1">
                            <label>{age.name}</label>
                          </div>
                          <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-3-10  uk-width-small-1-1">
                            <p>{this.props.p.t('ISPIndividualPricing.amount')} ${basePrice}</p>
                          </div>
                          <div className="uk-width-xlarge-1-10 uk-width-large-1-10 uk-width-medium-2-10  uk-width-small-1-1">
                            <div className="field-holder">
                              <select title={currentAge.id} name={age.id} value={currentAge.operation} className="uk-form-controls" required onChange={this.props.onAgesOperation}>
                                <option value="A">+</option>
                                <option value="S">-</option>
                              </select>
                              <span className="error-text">{this.props.p.t('ISPIndividualPricing.validation_messages.operation')}</span>
                            </div>
                          </div>
                          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-3-10  uk-width-small-1-1">
                            <div className={validation.ages && validation.ages.length && validation.ages[currentAgeIndex] === false && submitted ? 'field-holder error' : 'field-holder'}>
                              <input title={currentAge.id} type="number" name={age.id} placeholder={this.props.p.t('ISPIndividualPricing.enterAmount')} onChange={this.props.onAgesOperand} value={currentAge.operand === undefined ? '' : currentAge.operand}/>
                              <select title={currentAge.id} name={age.id} value={currentAge.isPercentage} className="uk-form-controls uk-form-width-small addon" placeholder onChange={this.props.onAgesIsPercentage}>
                                <option value="Y">%</option>
                                <option value="N">$</option>
                              </select>
                              <span className="error-text">{currentAge.isPercentage === appConstants.yes ? this.props.p.t('ISPIndividualPricing.validation_messages.operandIsPercentage') : this.props.p.t('ISPIndividualPricing.validation_messages.operand', {value: appConstants.maxSpecificPricing})}</span>
                            </div>
                          </div>
                          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
                            <p><span>=</span> {alteredPrice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
  static get propTypes() {
    return {
      training: PropTypes.array,
      packageItemClassName: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      skillLevels: PropTypes.array.isRequired,
      ages: PropTypes.array.isRequired,
      type: PropTypes.object.isRequired,
      price: PropTypes.object.isRequired,
      submitted: PropTypes.bool.isRequired,
      validation: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      onPriceChange: PropTypes.func.isRequired,
      onActivateDiscount: PropTypes.func.isRequired,
      onSkillLevelOperand: PropTypes.func.isRequired,
      onAgesOperand: PropTypes.func.isRequired,
      onAgesOperation: PropTypes.func.isRequired,
      onAgesIsPercentage: PropTypes.func.isRequired,
      onSkillLevelOperation: PropTypes.func.isRequired,
      onSkilllevelIsPercentage: PropTypes.func.isRequired,
      onRemovePrice: PropTypes.func.isRequired,
      showTitle: PropTypes.bool.isRequired,
      onMin: PropTypes.func.isRequired,
      onMax: PropTypes.func.isRequired,
      onSave: PropTypes.func.isRequired,
      onRemoveDiscount: PropTypes.func.isRequired
    };
  }
}

ISPClinicsPricingClass.defaultProps = {
  training: [],
  packageItemClassName: 'uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1'
};

const mapStateToProps = state => {
  const {ages, skillLevels, training, prices, currentSport} = state;
  return {
    training,
    prices,
    ages,
    skillLevels,
    currentSport
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

const ISPClinicsPricing = connect(mapStateToProps, mapDispatchToProps)(ISPClinicsPricingClass);
export default translate(ISPClinicsPricing);

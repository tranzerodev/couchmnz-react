import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {
  updatePrice,
  addDiscount,
  addAgesPricing,
  addSkilllevelsPricing,
  updateSkilllevelsPricing,
  updateAgesPricing,
  clearPrices,
  removeDiscount,
  activateDiscount,
  resetDiscount,
  postCurrentSport,
  sspPricingSubmit
} from '../../../../../actions';

class SpecificPricing extends Component {
  constructor() {
    super();
    this.handleAgesOperand = this.handleAgesOperand.bind(this);
    this.handleAgesOperation = this.handleAgesOperation.bind(this);
    this.handleAgesIsPercentage = this.handleAgesIsPercentage.bind(this);
    this.handleSkillLevelOperation = this.handleSkillLevelOperation.bind(this);
    this.handleSkillLevelOperand = this.handleSkillLevelOperand.bind(this);
    this.handleSkilllevelIsPercentage = this.handleSkilllevelIsPercentage.bind(this);
    this.handleAlteredSkilllevelsPrice = this.handleAlteredSkilllevelsPrice.bind(this);
    this.handleAlteredAgesPrice = this.handleAlteredAgesPrice.bind(this);
    this.handleSubmitSkillLevels = this.handleSubmitSkillLevels.bind(this);
    this.handleSubmitAges = this.handleSubmitAges.bind(this);
    this.state = {
      price: 'uk-active',
      discount: '',
      skillLevel: '',
      discountModal: <div/>
    };
  }
  componentDidMount() {}
  handlePriceSearch(prices, id) {
    const index = prices.findIndex(price => price.id === id);
    return index;
  }
  handleSkillLevelOperand(e) {
    const {id, name} = this.props.type;
    this.props.updateSkilllevelsPricing({
      id,
      name,
      skillLevel: {
        id: e.currentTarget.getAttribute('title'),
        skillID: e.currentTarget.getAttribute('name'),
        operand: parseFloat(e.target.value, 10)
      }
    });
  }
  handleAgesOperand(e) {
    const {id, name} = this.props.type;
    this.props.updateAgesPricing({
      id,
      name,
      age: {
        id: e.currentTarget.getAttribute('title'),
        ageID: e.currentTarget.getAttribute('name'),
        operand: parseFloat(e.target.value, 10)
      }
    });
  }
  handleAgesOperation(e) {
    const {id, name} = this.props.type;
    this.props.updateAgesPricing({
      id,
      name,
      age: {
        id: e.currentTarget.getAttribute('title'),
        ageID: e.currentTarget.getAttribute('name'),
        operation: e.target.value
      }
    });
  }
  handleAgesIsPercentage(e) {
    const {id, name} = this.props.type;
    this.props.updateAgesPricing({
      id,
      name,
      age: {
        id: e.currentTarget.getAttribute('title'),
        ageID: e.currentTarget.getAttribute('name'),
        isPercentage: e.target.value
      }
    });
  }
  handleSkillObjectSearch(skillLevels, id) {
    return skillLevels && typeof (skillLevels) === 'object' ? skillLevels.findIndex(skillLevel => skillLevel.skillID === id) : -1;
  }
  handleAgeObjectSearch(ages, id) {
    return ages && typeof (ages) === 'object' ? ages.findIndex(age => age.ageID === id) : -1;
  }
  handleSkillLevelOperation(e) {
    const {id, name} = this.props.type;
    const skillLevelID = e.currentTarget.getAttribute('name');
    const objectID = e.currentTarget.getAttribute('title');
    this.props.updateSkilllevelsPricing({
      id,
      name,
      skillLevel: {
        id: objectID,
        skillID: skillLevelID,
        operation: e.target.value
      }
    });
  }
  handleSkilllevelIsPercentage(e) {
    const {id, name} = this.props.type;
    const skillLevelID = e.currentTarget.getAttribute('name');
    const objectID = e.currentTarget.getAttribute('title');
    this.props.updateSkilllevelsPricing({
      id,
      name,
      skillLevel: {
        id: objectID,
        skillID: skillLevelID,
        isPercentage: e.target.value
      }
    });
  }
  handleAlteredSkilllevelsPrice(price, skillLevelID) {
    const index = this.handlePriceSearch(this.props.prices, this.props.type.id);
    const currentPrice = Object.assign([], this.props.prices[index >= 0 ? index : 0]);
    let {skillLevels} = currentPrice;
    if (!skillLevels) {
      skillLevels = [];
    }
    let skillLevel = skillLevels[skillLevels.findIndex(skill => skill.id === skillLevelID)];
    if (!skillLevel) {
      skillLevel = {};
    }
    let {operation, operand, isPercentage} = skillLevel;
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
  handleAlteredAgesPrice(price, ageGroupID) {
    const index = this.handlePriceSearch(this.props.prices, this.props.type.id);
    const currentPrice = Object.assign({}, this.props.prices[index >= 0 ? index : 0]);
    let {ages} = currentPrice;
    if (!ages) {
      ages = [];
    }
    let age = ages[ages.findIndex(age => age.id === ageGroupID)];
    if (!age) {
      age = {};
    }
    let {operation, operand, isPercentage} = age;
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
    const priceIndex = this.handlePriceSearch(this.props.prices, this.props.type ? this.props.type.id : '');
    const priceObject = priceIndex >= 0 && this.props.prices && this.props.prices.length && this.props.prices[priceIndex] ? this.props.prices[priceIndex] : {};
    const ages = priceObject.ages && priceObject.ages.length ? priceObject.ages : [];
    const skillLevels = priceObject.skillLevels && priceObject.skillLevels.length ? priceObject.skillLevels : [];
    // Const basePrice = priceObject.prices && priceObject.prices.length && priceObject.prices[0].price ? parseFloat(priceObject.prices[0].price) : 0.0;
    const {basePrice} = this.props;
    return (
      <div className="uk-accordion-content" style={{display: this.props.visible === '' ? 'none' : 'block'}}>
        <div className="accordianWrap">
          <p>{this.props.p.t('ISPIndividualPricing.specificPricingDescription')}:</p>
          <h4>{this.props.p.t('ISPIndividualPricing.skillLevelPricingDescription')}</h4>
          {
            this.props.skillLevels.map((skillLevel, i) => {
              const currentSkillIndex = this.handleSkillObjectSearch(skillLevels, skillLevel.id);
              const currentSkill = skillLevels && skillLevels.length && currentSkillIndex >= 0 ? skillLevels[currentSkillIndex] : {id: null};
              const alteredPrice = this.handleAlteredSkilllevelsPrice(basePrice, currentSkill.id);
              console.log('currentSkill', currentSkill);
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
                        <select title={currentSkill.id} name={skillLevel.id} value={currentSkill.operation} className="uk-form-controls" required onChange={this.handleSkillLevelOperation}>
                          <option value="A">+</option>
                          <option value="S">-</option>
                        </select>
                        <span className="error-text">{this.props.p.t('ISPIndividualPricing.validation_messages.operation')}</span>
                      </div>
                    </div>
                    <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-3-10  uk-width-small-1-1">
                      <div className="field-holder">
                        <input type="number" title={currentSkill.id} name={skillLevel.id} placeholder={this.props.p.t('ISPIndividualPricing.enterAmount')} value={currentSkill.operand ? currentSkill.operand : 0} onChange={this.handleSkillLevelOperand}/>
                        <select title={currentSkill.id} name={skillLevel.id} value={currentSkill.isPercentage} className="uk-form-controls uk-form-width-small addon" placeholder onChange={this.handleSkilllevelIsPercentage}>
                          <option value="Y">%</option>
                          <option value="N">$</option>
                        </select>
                        <span className="error-text">{this.props.p.t('ISPIndividualPricing.validation_messages.isPercentage')}</span>
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
              const alteredPrice = this.handleAlteredAgesPrice(basePrice, currentAge.id);
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
                        <select title={currentAge.id} name={age.id} value={currentAge.operation} className="uk-form-controls" required onChange={this.handleAgesOperation}>
                          <option value="A">+</option>
                          <option value="S">-</option>
                        </select>
                        <span className="error-text">{this.props.p.t('ISPIndividualPricing.validation_messages.operation')}</span>
                      </div>
                    </div>
                    <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-3-10  uk-width-small-1-1">
                      <div className="field-holder">
                        <input title={currentAge.id} type="number" name={age.id} placeholder={this.props.p.t('ISPIndividualPricing.enterAmount')} onChange={this.handleAgesOperand} value={currentAge.operand === undefined ? 0 : currentAge.operand}/>
                        <select title={currentAge.id} name={age.id} value={currentAge.isPercentage} className="uk-form-controls uk-form-width-small addon" placeholder onChange={this.handleAgesIsPercentage}>
                          <option value="Y">%</option>
                          <option value="N">$</option>
                        </select>
                        <span className="error-text">{this.props.p.t('ISPIndividualPricing.validation_messages.isPercentage')}</span>
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
    );
  }
  static get propTypes() {
    return {
      prices: PropTypes.array,
      ages: PropTypes.array,
      skillLevels: PropTypes.array,
      type: PropTypes.object.isRequired,
      updateAgesPricing: PropTypes.func,
      updateSkilllevelsPricing: PropTypes.func,
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

SpecificPricing.defaultProps = {
  prices: [],
  ages: [],
  skillLevels: [],
  updateAgesPricing: () => {},
  updateSkilllevelsPricing: () => {}
};

const mapStateToProps = state => {
  const {ages, skillLevels, training, prices, sspValidation, userIDs, currentSport} = state;
  return {
    training,
    prices,
    ages,
    skillLevels,
    sspValidation,
    userIDs,
    currentSport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePrice: profile => dispatch(updatePrice(profile)),
    updateSkilllevelsPricing: profile => dispatch(updateSkilllevelsPricing(profile)),
    addAgesPricing: profile => dispatch(addAgesPricing(profile)),
    addSkilllevelsPricing: profile => dispatch(addSkilllevelsPricing(profile)),
    updateAgesPricing: profile => dispatch(updateAgesPricing(profile)),
    addDiscount: profile => dispatch(addDiscount(profile)),
    clearPrices: () => dispatch(clearPrices()),
    removeDiscount: profile => dispatch(removeDiscount(profile)),
    activateDiscount: profile => dispatch(activateDiscount(profile)),
    resetDiscount: () => dispatch(resetDiscount()),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params)),
    sspPricingSubmit: data => dispatch(sspPricingSubmit(data))
  };
};

const ISPIndividualPricing = connect(mapStateToProps, mapDispatchToProps)(SpecificPricing);
export default translate(ISPIndividualPricing);

import React, {Component} from 'react';
import {Col, Form, FormGroup, Label} from 'reactstrap';
import p from '../../locale/enUs.json';
import changeCase from 'change-case';

/* eslint react/prop-types: 0 */

class PricingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const {pricing} = this.props;
    const {prices, volumeDiscount, ages, skillLevels} = pricing;
    const basePrice = prices && prices.length ? prices[0].price : '';
    return (
      <div>
        {/* eslint react/forbid-component-props: 0 */}
        <div><b>{changeCase.upperCase(pricing.name)}</b></div><hr/>
        <Form action="" className="form-horizontal">
          {prices.map((price, key) => {
            return (
              <FormGroup key={key++} row>
                <Col md="3">
                  <Label><b>{p.Pricing.singleSession} {price.min !== null && price.max !== null && price.min > 0 && price.max > 0 ? '(' + price.min + '-' + price.max + ') ' + p.Pricing.members : null } <span className="required"> {p.requiredFieldLabel} </span> </b></Label>
                </Col>
                <Col xs="12" md="9">
                  <Label>{price.price} </Label><br/>
                </Col>
              </FormGroup>);
          })}
          {volumeDiscount && volumeDiscount.length ?
            <FormGroup row>
              <Col md="3">
                <Label><b>{p.Pricing.volumeDiscount} </b></Label>
              </Col>
              <Col md="9" xs="12">
                {volumeDiscount.map((volDiscount, key) => {
                  const discount = (basePrice - (basePrice * volDiscount.discount / 100)).toFixed(2);
                  const save = (discount * volDiscount.numberOfSessions).toFixed(2);
                  return (
                    <p key={key++}>{volDiscount.numberOfSessions + ' ' + p.Pricing.sessionFor + ' ' + p.Pricing.unit + discount + ' ' + p.Pricing.perSession + ' (' + volDiscount.discount + p.Pricing.percent + ' ' + p.Pricing.discount + ',' + p.Pricing.athleteSaves + ' ' + p.Pricing.unit + save + ')' }</p>
                  );
                })}
              </Col>
            </FormGroup> : null}
          {skillLevels && skillLevels.length ?
            <FormGroup row>
              <Col md="3">
                <Label><b>{p.Pricing.skillLevel}</b></Label>
              </Col>
              <Col md="9" xs="12">
                {skillLevels.map((skill, key) => {
                  return (
                    <p key={key++}> {skill.operation === 'A' ? p.Pricing.add : p.Pricing.subtract}  {skill.operand}{skill.isPercentage === 'Y' ? '%' : '$ '} {p.Pricing.toTrain} {skill.name} {p.Pricing.athletes}</p>
                  );
                })}
              </Col>
            </FormGroup> : null}

          {ages && ages.length ?
            <FormGroup row>
              <Col md="3">
                <Label><b>{p.Pricing.agesGroups}</b></Label>
              </Col>
              <Col md="9" xs="12">
                {ages.map((age, key) => {
                  return (
                    <p key={key++}> {age.operation === 'A' ? p.Pricing.add : p.Pricing.substract}  {age.operand}{age.isPercentage === 'Y' ? '%' : '$ '} {p.Pricing.toTrain} {age.name} {p.Pricing.athletes}</p>
                  );
                })}
              </Col>
            </FormGroup> : null}
        </Form>
      </div>
    );
  }
}

export default PricingCard;

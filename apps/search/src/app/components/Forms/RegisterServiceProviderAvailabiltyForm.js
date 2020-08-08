// Rgistered Form to subscribe Sport Service Provider availability
import React from 'react';
import {
  Field, reduxForm, change
} from 'redux-form';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  renderInputField,
  required, email, phoneNumber,
  renderSelect
} from '../../utils/formHelper';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {
  registerServiceProviderAvailabilty
} from '../../actions/coachlistApi';

let RegisterServiceProviderAvailabiltyForm = props => {
  const {
    handleSubmit, p,
    availableSportsList, locationLookupData
  } = props;
  return (
    <div>
      {availableSportsList.data.responseCode === 0 &&
        locationLookupData.data &&
        <form
          onSubmit={handleSubmit(values => props.onSubmit(values))}
        >
          <div className="field-holder-row">
            <div className="field-holder-col">
              <Field
                name="firstName"
                fieldClass="field-required"
                componentClass="field-holder"
                component={renderInputField}
                validate={[required]}
                type="text"
                placeholder={p.t('Form.firstName')}
              />
            </div>
            <div className="field-holder-col">
              <Field
                name="lastName"
                fieldClass="field-required"
                componentClass="field-holder"
                component={renderInputField}
                validate={[required]}
                type="text"
                placeholder={p.t('Form.lastName')}
              />
            </div>
          </div>
          <div className="field-holder-row">
            <div className="field-holder-col">
              <Field
                name="email"
                fieldClass="field-required"
                componentClass="field-holder"
                component={renderInputField}
                validate={[required, email]}
                type="text"
                placeholder={p.t('Form.email')}
              />
            </div>
            <div className="field-holder-col">
              <Field
                name="mobile"
                fieldClass="field-required"
                componentClass="field-holder"
                component={renderInputField}
                validate={[required, phoneNumber]}
                type="text"
                placeholder={p.t('Form.mobile')}
              />
            </div>
          </div>
          <div className="field-holder-row">
            <div className="field-holder-col">
              <Field
                name="sportID"
                fieldClass="field-required"
                componentClass=""
                component={renderSelect}
                validate={[required]}
                placeholder="Select Your Sport"
                selectOptions={availableSportsList}
              />
            </div>
            <div className="field-holder-col">
              <Field
                name="zip"
                componentClass="field-holder"
                fieldClass="field-required"
                component={renderInputField}
                validate={[required]}
                type="text"
                placeholder={p.t('Form.postalCode')}
              />
            </div>
          </div>
          {props.setLat(locationLookupData.data.latitude)}
          <Field
            name="lat"
            type="text"
            component={renderInputField}
            style={{display: 'none'}}
          />
          {props.setLon(locationLookupData.data.longitude)}
          <Field
            name="lng"
            type="text"
            component={renderInputField}
            style={{display: 'none'}}
          />
          {props.registerServiceProvidersAvailability.data &&
           props.registerServiceProvidersAvailability.data.responseCode > 0 &&
           <div className="field-holder-row mt10"><span style={{color: '#ed485b'}}>{p.t('SportsList.regMessage.couponExisted')}</span></div>
          }
          <div className="field-holder-row mt10">
            <div className="field-holder-col field-col-auto">
              <button
                type="submit"
                className="general_Btn"
              >
                    Register Now
              </button>
            </div>

            <div className="field-holder-col field-col-auto">
              <span>I already have an account</span>
              {/* Todo: Need to update it to constants */}
              <Link
                to="https://dev2.coachlist.com/user/select-role"
              >
                {p.t('Login.sign_in')}
              </Link>
            </div>
          </div>
        </form>}
      <p className="privacy">
        {p.t('SignUp.agreement_message.no_search_result_register')}{' '}
        <Link
          to="https://www.coachlist.com/static/privacy"
          target="_blank"
        >
          {p.t('SignUp.privacy_policy')}
        </Link>
        {p.t('and')}
        <Link
          to="https://www.coachlist.com/static/terms"
          target="_blank"
        >
          {p.t('SignUp.terms_of_use')}.
        </Link>
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    availableSportsList, locationLookupData,
    registerServiceProvidersAvailability
  } = state;
  return {
    availableSportsList,
    locationLookupData,
    registerServiceProvidersAvailability
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data =>
      dispatch(registerServiceProviderAvailabilty(data)),
    // Redux-From Change Value
    setLat: lat =>
      dispatch(
        change('register-service-provider-availability',
          'lat', lat)
      ),
    // Redux-From Change Value
    setLon: lon =>
      dispatch(
        change('register-service-provider-availability',
          'lng', lon)
      ),
    // Redux-From Change Value
    selectedOption: id =>
      dispatch(
        change('register-service-provider-availability',
          'sportId', id)
      )
  };
};

RegisterServiceProviderAvailabiltyForm.propTypes = {
  p: PropTypes.shape({t: PropTypes.func}).isRequired
};
RegisterServiceProviderAvailabiltyForm = reduxForm({
  form: 'register-service-provider-availability',
  initialValues: {
  }
})(RegisterServiceProviderAvailabiltyForm);

export default connect(mapStateToProps, mapDispatchToProps)(translate(RegisterServiceProviderAvailabiltyForm));

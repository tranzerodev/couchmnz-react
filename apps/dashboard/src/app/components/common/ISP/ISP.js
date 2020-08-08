import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import ISPRegistration from '../../ssp/isp/registration/ISPRegistration';
import ISPRegistration1 from '../../ssp/isp/registration/ISPRegistration1';
import ISPRegistration2 from '../../ssp/isp/registration/ISPRegistration2';
import ISPRegistration3 from '../../ssp/isp/registration/SSPProfileListing';
import ISPRegistration4 from '../../ssp/isp/registration/PhotosAndVideos';
import ISPRegistration5 from '../../ssp/isp/registration/ISPRegistration5';
import ISPRegistration6 from '../../ssp/isp/registration/ISPRegistration6';
import ISPRegistration7 from '../../ssp/isp/registration/ISPRegistration7';
import ISPRegistration8 from '../../ssp/isp/registration/ISPRegistration8';
import ISPRegistration9 from '../../ssp/isp/registration/ISPRegistration9';
import ISPRegistration10 from '../../ssp/isp/registration/ISPRegistration10';
import ISPRegistration11 from '../../ssp/isp/registration/ISPRegistration11';
import ISPRegistration12 from '../../ssp/isp/registration/ISPRegistration12';
import ISPRegistration13 from '../../ssp/isp/registration/ISPRegistration13';
import ISPRegistration14 from '../../ssp/isp/registration/ISPRegistration14';
import ISPRegistration15 from '../../ssp/isp/registration/ISPRegistration15';

import Welcome from '../../ssp/isp/registration/Welcome';
import {
  buildProfile
} from '../../../routeMiddlewares/routeMiddlewares';

import {pricingPreValidation, sportsSpecific, sessionsPreValidation, schedulerPreValidation} from '../../../routeMiddlewares/ssp/isp/preValidations/preValidation.js';
import {WELCOME, REGISTRATION_ISP_SPORTS, REGISTRATION_ISP_BIOGRAPHY, REGISTRATION_ISP_TRAINING_PREFERENCE, REGISTRATION_ISP_LISTING, REGISTRATION_ISP_MEDIA, REGISTRATION_ISP_PRICING, REGISTRATION_ISP_TRAINING_LOCATIONS, REGISTRATION_ISP_SESSIONS, REGISTRATION_ISP_SCHEDULE, REGISTRATION_ISP_BUSINESS_MODAL, REGISTRATION_ISP_BOOKING_PREFERENCES, REGISTRATION_ISP_ACCOUNT_DETAILS, REGISTRATION_ISP_PROFILE_READY_MESSAGE, REGISTRATION_ISP_PAYOUT_DETAILS, REGISTRATION_ISP_PAYPAL_SETTINGS, REGISTRATION_ISP_BANK_PAYOUT, ISP} from '../../../constants/pathConstants';

const BuildProfile = buildProfile(ISPRegistration);
class ISPClass extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route path={WELCOME} name="Welcome" component={Welcome}/>
        <Route path={REGISTRATION_ISP_SPORTS} name="ISPRegistrationSports" component={BuildProfile}/>
        <Route path={REGISTRATION_ISP_BIOGRAPHY} name="ISPRegistrationBiography" component={ISPRegistration1}/>
        <Route path={REGISTRATION_ISP_TRAINING_PREFERENCE} name="ISPRegistration2" component={sportsSpecific(ISPRegistration2)}/>
        <Route path={REGISTRATION_ISP_LISTING} name="ISPRegistration3" component={sportsSpecific(ISPRegistration3)}/>
        <Route path={REGISTRATION_ISP_MEDIA} name="ISPRegistration4" component={ISPRegistration4}/>
        <Route path={REGISTRATION_ISP_PRICING} name="ISPRegistration5" component={pricingPreValidation(ISPRegistration5)}/>
        <Route path={REGISTRATION_ISP_TRAINING_LOCATIONS} name="ISPRegistration6" component={ISPRegistration6}/>
        <Route path={REGISTRATION_ISP_SESSIONS} name="ISPRegistration7" component={sessionsPreValidation(ISPRegistration7)}/>
        <Route path={REGISTRATION_ISP_SCHEDULE} name="ISPRegistration8" component={schedulerPreValidation(ISPRegistration8)}/>
        <Route path={REGISTRATION_ISP_BUSINESS_MODAL} name="ISPRegistration9" component={ISPRegistration9}/>
        <Route path={REGISTRATION_ISP_BOOKING_PREFERENCES} name="ISPRegistration10" component={ISPRegistration10}/>
        <Route path={REGISTRATION_ISP_ACCOUNT_DETAILS} name="ISPRegistration11" component={ISPRegistration11}/>
        <Route path={REGISTRATION_ISP_PROFILE_READY_MESSAGE} name="ISPRegistration12" component={ISPRegistration12}/>
        <Route path={REGISTRATION_ISP_PAYOUT_DETAILS} name="ISPRegistration13" component={ISPRegistration13}/>
        <Route path={REGISTRATION_ISP_PAYPAL_SETTINGS} name="ISPRegistration14" component={ISPRegistration14}/>
        <Route path={REGISTRATION_ISP_BANK_PAYOUT} name="ISPRegistration15" component={ISPRegistration15}/>
        <Redirect exact from={ISP} to={WELCOME}/>
      </Switch>
    );
  }
}

export default ISPClass;

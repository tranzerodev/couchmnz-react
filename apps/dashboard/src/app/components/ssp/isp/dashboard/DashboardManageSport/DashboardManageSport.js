import React, {Component} from 'react';
import {Redirect, Switch, Route, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';

import DashboardManageSportSideNav from '../DashboardManageSportSideNav';

import BuildProfile from './DashboardBuildProfile';
import TrainingPreference from './DashboardTrainingPreference';
import ProfileListing from './DashboardListing';
import Media from '../DashboardProfileMedia';
import Biography from './DashboardBiography';

import SetPricing from '../DashboardSession/Pricing';
import SessionList from '../DashboardSession/Sessions';
import DashboardLocationList from '../DashboardLocationList';
import DashboardLocationAdd from '../DashboardLocationAdd';
import TravelPreferences from '../TravelPreference';
import CompleteService from '../CompleteService';
import BookingPreferences from '../DashboardAccount/DashboardBookingPreferences';
import AccountDetails from '../DashboardAccount/DashboardAccountDetails';
import PayoutDetails from '../DashboardAccount/DashboardPayoutDetails';
import SchedulerSettings from '../SchedulerSettings';
import PaypalSettings from '../DashboardAccount/DashboardPaypalSettings';
import BankPayoutDetails from '../DashboardAccount/DashboardBankPayoutDetails';

import EditSession from '../DashboardSession/EditSession';
import {DASHBOARD_MANAGE_SPORT_SPECIALITY, DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES, DASHBOARD_MANAGE_SPORT_PRICING, DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS, DASHBOARD_MANAGE_SPORT_SESSIONS, DASHBOARD_MANAGE_SPORT_BIOGRAPHY, DASHBOARD_MANAGE_SPORT_LISTING, DASHBOARD_MANAGE_SPORT_MEDIA, DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_ADD, DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_EDIT, DASHBOARD_MANAGE_SPORT_SESSIONS_ADD, DASHBOARD_MANAGE_SPORT_SESSIONS_EDIT, DASHBOARD_MANAGE_SPORT_TRAVEL_PREFRENCES, DASHBOARD_MANAGE_COMPLETE_SERVICE, DASHBOARD_MANAGE_COMPLETE_BOOKING_PREFERENCE, DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS, DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS, DASHBOARD_MANAGE_COMPLETE_PAYPAL_SETTINGS, DASHBOARD_MANAGE_COMPLETE_BANK_PAYOUT, DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS} from '../../../../../constants/pathConstants';
import {
  pricingPreValidation,
  sportsSpecific,
  sessionsPreValidation,
  completeServicePrevalidation,
  locationListPrevalidation
} from '../../../../..//routeMiddlewares/ssp/isp/preValidations/preValidation.js';

class DashboardManageSport extends Component {
  render() {
    return (
      <div className="dashboardSection">

        <div className="uk-grid">
          <DashboardManageSportSideNav/>
          <Switch>
            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_SPECIALITY}
              name="Sports"
              component={BuildProfile}
            />
            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES}
              name="TrainingPreference"
              component={sportsSpecific(TrainingPreference)}
            />
            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_PRICING}
              name="Pricing"
              component={pricingPreValidation(SetPricing)}
            />
            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS}
              name="TrainingLocations"
              component={sportsSpecific(locationListPrevalidation(DashboardLocationList))}
            />
            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_TRAVEL_PREFRENCES}
              name="TravelPreference"
              component={sportsSpecific(TravelPreferences)}
            />
            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_ADD}
              name="TrainingLocationsAdd"
              component={sportsSpecific(DashboardLocationAdd)}
            />
            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_EDIT}
              name="TrainingLocationsEdit"
              component={sportsSpecific(DashboardLocationAdd)}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_SESSIONS}
              name="Sessions"
              component={sessionsPreValidation(SessionList)}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_SESSIONS_ADD}
              name="SessionsAdd"
              component={sessionsPreValidation(EditSession)}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_SESSIONS_EDIT}
              name="SessionsEdit"
              component={sessionsPreValidation(EditSession)}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_BIOGRAPHY}
              name="Biography"
              component={Biography}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_LISTING}
              name="Listing"
              component={sportsSpecific(ProfileListing)}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_SPORT_MEDIA}
              name="Media"
              component={sportsSpecific(Media)}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_COMPLETE_SERVICE}
              name="CompleteService"
              component={completeServicePrevalidation(CompleteService)}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_COMPLETE_BOOKING_PREFERENCE}
              name="CompleteBookingPreference"
              component={BookingPreferences}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS}
              name="CompleteAccountDetails"
              component={AccountDetails}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS}
              name="CompletePayoutDetails"
              component={PayoutDetails}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_COMPLETE_PAYPAL_SETTINGS}
              component={PaypalSettings}
            />

            <Route
              exact
              path={DASHBOARD_MANAGE_COMPLETE_BANK_PAYOUT}
              component={BankPayoutDetails}
            />

            {/* <Route
              exact
              path={DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS}
              component={SchedulerSettings}
            /> */}

            <Redirect from="/" to={DASHBOARD_MANAGE_SPORT_SPECIALITY}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(translate(DashboardManageSport));

import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Institution from '../../views/Institute/';
import Program from '../../views/Program/';
import ProgramProvider from '../../views/ProgramProvider/';
import AddProgramProvider from '../../views/ProgramProvider/AddProgramProvider';
import AddProgram from '../../views/Program/addProgram';
import AddInstitute from '../../views/Institute/addInstitute';
import ProgToIns from '../../views/Institute/addProgramtoIns';
import InsToProg from '../../views/Program/InstituteToProgram';
import EditInstitute from '../../views/Institute/EditInstitute';
import EditProgramProvider from '../../views/ProgramProvider/EditProgramProvider';
import EditProgram from '../../views/Program/EditProgram';
import MissingLocalRegions from '../../views/GeoCoverage/MissingLocalRegions';
import GeoRegions from '../../views/GeoCoverage/WorldRegion';
import GeoCountry from '../../views/GeoCoverage/Country';
import GeoState from '../../views/GeoCoverage/State';
import GeoCity from '../../views/GeoCoverage/City';
import GeoLocal from '../../views/GeoCoverage/LocalRegions';
import Login from '../../views/Pages/Login/';
import Users from '../../views/User';
import AddUser from '../../views/User/AddUser';
import AppUsers from '../../views/App/Users';
import Account from '../../views/App/Account';
import Sport from '../../views/Sport';
import SportAdd from '../../views/Sport/SportAdd';
import SportEdit from '../../views/Sport/SportEdit';
import Terminology from '../../views/Sport/Terminology';
import SportStructure from '../../views/Sport/SportStructure';
import Skills from '../../views/SkillsAge/Skills';
import Age from '../../views/SkillsAge/Age';
import FailedAuditReport from '../../views/Reports/FailedAudit';
import View from '../../views/App/Views';
import FlaggedSSPs from '../../views/Reports/FlaggedSSPs';
import FlaggedSSP from '../../views/Reports/FlaggedSSP';
import BlockedProfiles from '../../views/Reports/BlockedProfiles';
import Payouts from '../../views/Payouts/Payouts';
import {auth} from '../../auth';
import {
  LOGIN, DASHBOARD, INSTITUTIONS, ADD_INSTITUTIONS, EDIT_INSTITUTIONS, 
  ADD_PROGRAM_TO_INSTITUTIONS, PROGRAM_PROVIDERS, ADD_PROGRAM_PROVIDERS, 
  EDIT_PROGRAM_PROVIDERS, PROGRAMS, ADD_PROGRAMS, EDIT_PROGRAMS, 
  ADD_INSTITUTIONS_TO_PROGRAMS, GEO_WORLD_REGIONS, GEO_COUNTRIES, 
  GEO_STATES, GEO_CITIES, GEO_LOCAL_REGIONS, USERS, ADD_USERS, 
  APP_USERS, APP_USER, ROOT, SPORTS, ADD_SPORTS, EDIT_SPORTS, 
  TERMINOLOGY, SPORT_STRUCTURE, SKILLS, AGE, FAILED_AUDIT, 
  APP_USER_PROFILE, FLAGGED_SSPS, FLAGGED_SSP, BLOCKED_PROFILES, 
  PAYOUTS, MISSING_LOCAL_REGIONS
} from '../../constants/pathConstants';

/* eslint react/no-deprecated: 0 */

class Full extends Component {
  componentWillMount() {
    auth();
  }
  render() {
    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb/>
            <Container fluid>
              <Switch>
                <Route path={LOGIN} component={Login}/>
                <Route path={DASHBOARD} name="dashboard" component={Dashboard}/>
                <Route exact path={INSTITUTIONS} name="institutions" component={Institution}/>
                <Route path={ADD_INSTITUTIONS} name="addInstitute" component={AddInstitute}/>
                <Route path={EDIT_INSTITUTIONS} name="editInstitute" component={EditInstitute}/>
                <Route path={ADD_PROGRAM_TO_INSTITUTIONS} name="addProgToIns" component={ProgToIns}/>

                <Route exact path={PROGRAM_PROVIDERS} name="organization" component={ProgramProvider}/>
                <Route exact path={ADD_PROGRAM_PROVIDERS} name="addProgramProvider" component={AddProgramProvider}/>
                <Route exact path={EDIT_PROGRAM_PROVIDERS} name="editProgramProvider" component={EditProgramProvider}/>

                <Route exact path={PROGRAMS} name="programs" component={Program}/>
                <Route path={ADD_PROGRAMS} name="addProgram" component={AddProgram}/>
                <Route path={EDIT_PROGRAMS} name="editProgram" component={EditProgram}/>
                <Route path={ADD_INSTITUTIONS_TO_PROGRAMS} name="addProgToIns" component={InsToProg}/>

                <Route exact path={MISSING_LOCAL_REGIONS} name="missingLocalRegions" component={MissingLocalRegions}/>
                <Route exact path={GEO_WORLD_REGIONS} name="geoRegions" component={GeoRegions}/>
                <Route exact path={GEO_COUNTRIES} name="countries" component={GeoCountry}/>
                <Route exact path={GEO_STATES} name="states" component={GeoState}/>
                <Route exact path={GEO_CITIES} name="cities" component={GeoCity}/>
                <Route exact path={GEO_LOCAL_REGIONS} name="localRegions" component={GeoLocal}/>
                <Route exact path={USERS} name="users" component={Users}/>
                <Route exact path={ADD_USERS} name="user" component={AddUser}/>
                <Route exact path={APP_USERS} name="appUsers" component={AppUsers}/>
                <Route exact path={APP_USER} name="appUser" component={Account}/>

                <Route exact path={SPORTS} name="sport" component={Sport}/>
                <Route exact path={ADD_SPORTS} name="sport" component={SportAdd}/>
                <Route exact path={EDIT_SPORTS} name="sport" component={SportEdit}/>
                <Route exact path={TERMINOLOGY} name="sport" component={Terminology}/>
                <Route exact path={SPORT_STRUCTURE} name="sport" component={SportStructure}/>
                <Route exact path={SKILLS} name="skills" component={Skills}/>
                <Route exact path={AGE} name="skills" component={Age}/>
                <Route exact path={APP_USER_PROFILE} name="ISPProfile" component={View}/>

                <Route exact path={FAILED_AUDIT} name="failedAudit" component={FailedAuditReport}/>
                <Route exact path={FLAGGED_SSPS} name="flaggedSSPs" component={FlaggedSSPs}/>
                <Route exact path={FLAGGED_SSP} name="flaggedSSP" component={FlaggedSSP}/>
                <Route exact path={BLOCKED_PROFILES} name="blockedProfiles" component={BlockedProfiles}/>
                <Route exact path={PAYOUTS} name="payouts" component={Payouts}/>
                {/* <Redirect from="/programs" to="/institutes" component={ProgToIns} /> */}
                {/* <Route path="/Insprg/:id/:org/:type/:name" name="addProgToIns" component={InsToProg}/>                                                                                                             */}

                <Redirect from={ROOT} to={LOGIN}/>
              </Switch>
            </Container>
          </main>
          <Aside/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Full;

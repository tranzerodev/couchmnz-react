import {INSTITUTIONS, ADD_INSTITUTIONS, EDIT_INSTITUTIONS, ADD_PROGRAM_TO_INSTITUTION, ADD_INSTITUTION_TO_PROGRAM, PROGRAM_PROVIDERS, ADD_PROGRAM_PROVIDERS, EDIT_PROGRAM_PROVIDERS, PROGRAMS, ADD_PROGRAMS, EDIT_PROGRAMS, GEO_WORLD_REGIONS, GEO_COUNTRIES, GEO_STATES, GEO_CITIES, GEO_LOCAL_REGIONS, USERS, ADD_USERS, APP_USERS, APP_USER, SPORTS, ADD_SPORTS, EDIT_SPORTS, TERMINOLOGY, SPORT_STRUCTURE, SKILLS, AGE, FAILED_AUDIT, FLAGGED_SSPS, BLOCKED_PROFILES} from './constants/pathConstants';

const routes = {};

routes[USERS] = 'Administrators';
routes[ADD_USERS] = 'Add User';
routes[APP_USERS] = 'Manage Users';
routes[APP_USER] = 'Manage User Profiles';
routes[INSTITUTIONS] = 'Institutions';
routes[ADD_INSTITUTIONS] = 'Add Institution';
routes[ADD_INSTITUTION_TO_PROGRAM] = 'Add Program';
routes[EDIT_INSTITUTIONS] = 'Edit Institution';
routes[PROGRAMS] = 'Programs';
routes[ADD_PROGRAMS] = 'Add Program';
routes[EDIT_PROGRAMS] = 'Edit Program';
routes[ADD_PROGRAM_TO_INSTITUTION] = 'Add Institution';
routes[PROGRAM_PROVIDERS] = 'Program Providers';
routes[ADD_PROGRAM_PROVIDERS] = 'Add Program Provider';
routes[EDIT_PROGRAM_PROVIDERS] = 'Edit Program Provider';
routes[GEO_WORLD_REGIONS] = 'World Regions';
routes[GEO_COUNTRIES] = 'Countries';
routes[GEO_STATES] = 'States';
routes[GEO_CITIES] = 'Cities';
routes[GEO_LOCAL_REGIONS] = 'Local Regions';
routes[SPORTS] = 'Manage Sports / Fitness Types';
routes[ADD_SPORTS] = 'Add Sport / Fitness Category';
routes[EDIT_SPORTS] = 'Edit';
routes[SPORT_STRUCTURE] = 'Manage Hierarchy or Structure';
routes[TERMINOLOGY] = 'Manage Offer Terminologies';
routes[SKILLS] = 'Manage Skills';
routes[AGE] = 'Manage Ages';
routes[FAILED_AUDIT] = 'Failed Audit Reports';
routes[FLAGGED_SSPS] = 'Flagged SSPs';
routes[BLOCKED_PROFILES] = 'Disabled Profiles/Accounts';

export default routes;

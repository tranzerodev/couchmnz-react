import {
  ROOT, DASHBOARD, PROGRAM_PROVIDERS, INSTITUTIONS, PROGRAMS, GEO, 
  GEO_WORLD_REGIONS, GEO_COUNTRIES, GEO_STATES, GEO_LOCAL_REGIONS, 
  GEO_CITIES, USERS, APP_USERS, APP_USER_FILTER_ALL, APP_USER_FILTER_ATHLETE, 
  APP_USER_FILTER_ISP, APP_USER_FILTER_CAMPS, APP_USER_FILTER_BUSINESS, 
  APP_USER_FILTER_SPORTS, SPORTS, ADD_SPORTS, TERMINOLOGY, SKILLS, AGE, 
  FAILED_AUDIT, FLAGGED_SSPS, BLOCKED_PROFILES, PAYOUTS, MISSING_LOCAL_REGIONS,
  LOYALTY_PROGRAMS, LOYALTY_TIERS
} from '../../constants/pathConstants';

export default {
  items: [
    {
      name: 'Dashboard',
      url: DASHBOARD
      // Icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW'
      // }
    },
    {
      name: 'Manage Programs',
      url: ROOT,
      children: [
        {
          name: 'Program Providers',
          url: PROGRAM_PROVIDERS
        },
        {
          name: 'Institutions',
          url: INSTITUTIONS
          //      Icon: 'icon-speedometer'
        },
        {
          name: 'Programs',
          url: PROGRAMS
          // Icon: 'icon-speedometer'
        }
      ]},
    {
      name: 'Manage Geographies',
      url: GEO,
      children: [
        {
          name: 'World Regions',
          url: GEO_WORLD_REGIONS
        },
        {
          name: 'Countries',
          url: GEO_COUNTRIES
        },
        {
          name: 'States',
          url: GEO_STATES
        },
        {
          name: 'Local Regions',
          url: GEO_LOCAL_REGIONS
        },
        {
          name: 'Cities',
          url: GEO_CITIES
        },
        {
          name: 'Missing Local Region',
          url: MISSING_LOCAL_REGIONS
        }
      ]},
    {
      name: 'Manage Admins',
      url: USERS
    },
    {
      name: 'Manage Users',
      url: APP_USERS,
      children: [
        {
          name: 'All',
          url: APP_USER_FILTER_ALL,
          search: 'all'
        },
        {
          name: 'Consumers',
          url: APP_USER_FILTER_ATHLETE,
          query: 'athlete'
        },
        {
          name: 'ISPs',
          url: APP_USER_FILTER_ISP
        },
        {
          name: 'Camp Operators',
          url: APP_USER_FILTER_CAMPS
        },
        {
          name: 'Business Facilities',
          url: APP_USER_FILTER_BUSINESS
        },
        {
          name: 'Supporting Services',
          url: APP_USER_FILTER_SPORTS
        }]
    },
    {
      name: 'Manage Sports / Fitness Types',
      url: SPORTS,
      children: [
        {
          name: 'Sports & Fitness Categories',
          url: SPORTS
        },
        {
          name: 'Add Sport / Fitness Category',
          url: ADD_SPORTS
        },
        /*  {
          name: 'Sport Structure',
          url: '/sport-structure'
        }, */
        {
          name: 'Offer Terminologies',
          url: TERMINOLOGY
        }]
    },
    {
      name: 'Manage Skills & Ages',
      url: SKILLS,
      children: [
        {
          name: 'Skills',
          url: SKILLS
        },
        {
          name: 'Ages',
          url: AGE
        }
      ]
    },
    {
      name: 'Manage Reports',
      url: FAILED_AUDIT,
      children: [
        {
          name: 'Failed Audit Reports',
          url: FAILED_AUDIT
        },
        {
          name: 'Flagged SSPs',
          url: FLAGGED_SSPS
        },
        {
          name: 'Blocked Profiles',
          url: BLOCKED_PROFILES
        }
      ]
    },
    {
      name: 'Loyalty Progras',
      url: LOYALTY_TIERS,
      children: [
        {
          name: 'Tiers',
          url: LOYALTY_TIERS
        }
      ]
    }    
    /*,
    {
      name: 'Payouts',
      url: PAYOUTS,
      children: [
        {
          name: 'All',
          url: PAYOUTS
        }
      ]
    } */
  ]
};

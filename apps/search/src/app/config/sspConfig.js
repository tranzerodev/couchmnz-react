const sspConfig = {
  baseURL: 'https://www.apimint.com:443/mock/COACHLIST/v1',
  // BaseURL: 'https://dev.coachlist.com/api/v1',
  translations: {
    enUs: require('../locale/enUs.json'),
    es: require('../locale/es.json')
  },
  days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  days3L: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  monthEndsSY: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  monthEndsLY: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  monthBrief: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  monthDesc: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  googleApiKey: 'AIzaSyA2XWZCytP62VtWafK91j480sxnDa8CZnc',
  selectedSessionColor: '#caf39c',
  normalSessionColor: '#eeb0ec'
};

export default sspConfig;


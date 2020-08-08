import appConstants from '../constants/appConstants';
import moment from 'moment';

const fromMonthSub = appConstants.defaultFromMonthSub;
const itemPerPage = appConstants.orderHistoryItemPerPage;
export const getDefaultOrderHistoryFilters = () => {
  return {
    from: moment().subtract(fromMonthSub, 'months').format(),
    to: moment().format(),
    filter: appConstants.defaultOrderStatus,
    page: appConstants.defaultPage,
    limit: itemPerPage
  };
};

export const getSportsNames = sports => {
  return sports.map(sport => sport.name);
};
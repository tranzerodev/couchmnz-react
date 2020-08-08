import appConstants from '../../../../constants/appConstants';
const {sportsActiveFlages} = appConstants;
export const isFirstSport = sports => {
  const sport = sports.find(sport => sport.isActive === sportsActiveFlages.active);
  if (sport) {
    return false;
  }
  return true;
};



export function constructCurrentSportData(storeState) {
  const {ages, certifications, sportsDegrees, gender, listing, locations, prices, skillLevels, sport,
    training, travelPreferences, services, sportsAwards, sportsAffiliation, sportsTools} = storeState;
  return {
    id: sport.id,
    name: sport.name,
    headline: listing.headline,
    description: listing.description,
    aboutMe: listing.bio,
    offerTerminology: sport.offerTerminology,
    coachingExperience: sport.coachingExperience,
    playingExperience: sport.playingExperience,
    specializations: sport.specializations,
    subSSPTypes: training,
    prerequisites: {
      ages,
      skillLevels,
      gender,
      otherServices: services
    },
    pricePerSession: {
      subSSPTypes: prices
    },
    travelPreferences,
    trainingLocations: locations.data,
    certifications,
    univDegrees: sportsDegrees,
    awards: sportsAwards,
    affiliations: sportsAffiliation,
    tools: sportsTools,
    notes: {
      meetNotes: null,
      firstPrepNotes: null,
      gearNotes: null
    }
  };
}

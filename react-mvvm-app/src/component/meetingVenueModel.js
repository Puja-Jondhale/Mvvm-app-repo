
const initialVenues = [
  {
    id: 1,
    venueName: "Conference I",
    extensionNumber: "123",
    sittingCapacity: 12
  },
  {
    id: 2,
    venueName: "Conference II",
    extensionNumber: "115",
    sittingCapacity: 4
  }
];

const MeetingVenueModel = {

  getVenues() {
    return initialVenues.map(venue => ({ ...venue }));
  },

  addVenue(venues, venue) {
    return [
      ...venues,
      {
        ...venue,
        id: Date.now()
      }
    ];
  },

  updateVenue(venues, id, updatedVenue) {
    return venues.map(venue =>
      venue.id === id
        ? { ...venue, ...updatedVenue }
        : venue
    );
  },

  deleteVenue(venues, id) {
    return venues.filter(venue => venue.id !== id);
  }

};

export default MeetingVenueModel;
